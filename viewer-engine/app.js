/* app.js — generic Markdown viewer engine (VS Code-style replica).
 * Content root and defaults come from ../viewer.config.json; the file tree
 * comes from tree.json generated ahead of time by build-tree.mjs so this
 * works on static hosting (GitHub Pages). All URLs are relative so the
 * viewer works under a subpath (/repo/). */
(function () {
'use strict';

// ---------- state ----------
let CONFIG = null;          // parsed viewer.config.json
let MANIFEST = null;        // parsed tree.json
let openTabs = [];          // open file paths (repo-root-relative)
let activeFile = null;
const cache = {};           // path -> raw text
let previewEl = null;       // image preview overlay

// ---------- helpers ----------
function el(id) { return document.getElementById(id); }

function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function pathJoin(base, rel) {
    const parts = base ? base.split('/') : [];
    for (const seg of rel.split('/')) {
        if (seg === '' || seg === '.') continue;
        if (seg === '..') { if (parts.length) parts.pop(); continue; }
        parts.push(seg);
    }
    return parts.join('/');
}

function dirOf(path) {
    const i = path.lastIndexOf('/');
    return i === -1 ? '' : path.slice(0, i);
}

const isMd = (p) => /\.md$/i.test(p);
const isImg = (p) => /\.(png|jpe?g|gif|svg|webp|ico)$/i.test(p);

// ---------- theme ----------
function toggleTheme() {
    document.body.classList.toggle('light');
    localStorage.setItem('viewer-theme', document.body.classList.contains('light') ? 'light' : 'dark');
}
window.toggleTheme = toggleTheme;   // titlebar/status-bar use inline onclick

function applyStoredTheme() {
    if (localStorage.getItem('viewer-theme') === 'light') document.body.classList.add('light');
}

// ---------- sidebar resizer ----------
(function initResizer() {
    const resizer = document.getElementById('sidebar-resizer');
    if (!resizer) return;
    const sidebar = resizer.previousElementSibling;
    const DEFAULT_W = 300, MIN_W = 180, MAX_W = 520;
    let dragging = false;

    // restore saved width
    const saved = parseInt(localStorage.getItem('viewer-sidebar-w'), 10);
    if (saved >= MIN_W && saved <= MAX_W) sidebar.style.width = saved + 'px';

    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        dragging = true;
        resizer.classList.add('dragging');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    });
    window.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        const w = Math.min(MAX_W, Math.max(MIN_W, e.clientX));
        sidebar.style.width = w + 'px';
    });
    window.addEventListener('mouseup', () => {
        if (!dragging) return;
        dragging = false;
        resizer.classList.remove('dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        localStorage.setItem('viewer-sidebar-w', sidebar.style.width);
    });
    resizer.addEventListener('dblclick', () => {
        sidebar.style.width = DEFAULT_W + 'px';
        localStorage.removeItem('viewer-sidebar-w');
    });
})();

// ---------- tree ----------
function countFiles(n) { return n.type === 'file' ? 1 : n.children.reduce((a, c) => a + countFiles(c), 0); }

function renderTree() {
    const host = el('tree-files');
    host.innerHTML = '';
    buildTreeNodes(MANIFEST.tree, host, 0);
    el('sf-root').textContent = MANIFEST.root;
    el('sf-files').textContent = countFiles(MANIFEST.tree) + ' files';
}

function buildTreeNodes(node, parentEl, depth) {
    if (node.type === 'dir') {
        const folder = document.createElement('div');
        folder.className = 'tree-folder' + (node.open ? ' open' : '');
        folder.style.paddingLeft = (0.4 + depth * 1.1) + 'rem';
        folder.innerHTML = '<span class="chev">▶</span><span class="icon">📁</span><span>' + escapeHtml(node.name) + '</span>';
        const files = document.createElement('div');
        files.className = 'tree-files' + (node.open ? ' show' : '');
        folder.onclick = () => { folder.classList.toggle('open'); files.classList.toggle('show'); };
        parentEl.appendChild(folder);
        for (const child of node.children) {
            if (child.name.startsWith('.')) continue; // never render dot files/dirs
            buildTreeNodes(child, files, depth + 1);
        }
        parentEl.appendChild(files);
        // keep the active file's ancestors expanded
        if (activeFile && node.path && activeFile.startsWith(node.path + '/')) {
            folder.classList.add('open'); files.classList.add('show');
        }
    } else {
        const f = document.createElement('div');
        f.className = 'tree-file' + (node.path === activeFile ? ' active' : '');
        f.dataset.file = node.path;
        f.style.paddingLeft = (1.5 + depth * 1.1) + 'rem';
        f.innerHTML = '<span class="ficon">' + (isMd(node.name) ? 'M' : (isImg(node.name) ? 'I' : 'F')) + '</span><span>' + escapeHtml(node.name) + '</span>';
        f.onclick = () => openFile(node.path);
        parentEl.appendChild(f);
    }
}

// ---------- tabs ----------
function renderTabs() {
    const bar = el('tabs-bar');
    bar.innerHTML = '';
    // close-all pinned at the far left of the tab strip
    const closeAll = document.createElement('button');
    closeAll.className = 'close-all-btn';
    closeAll.id = 'close-all-btn';
    closeAll.title = openTabs.length ? 'Close all open tabs' : 'No open tabs';
    closeAll.textContent = '✕ Close All';
    closeAll.disabled = !openTabs.length;
    closeAll.onclick = closeAllTabs;
    bar.appendChild(closeAll);
    openTabs.forEach(f => {
        const t = document.createElement('div');
        t.className = 'tab' + (f === activeFile ? ' active' : '');
        t.innerHTML = '<span class="ficon">M</span>' + escapeHtml(f.split('/').pop()) + '<span class="close-x" title="Close">×</span>';
        t.onclick = (e) => { if (e.target.classList.contains('close-x')) closeTab(f, e); else activateFile(f); };
        bar.appendChild(t);
    });
}
// ---------- gutter / status ----------
function renderGutter(lineCount) {
    let html = '';
    for (let i = 1; i <= lineCount; i++) html += i + '<br>';
    el('gutter').innerHTML = html;
}

function updateStatus(text) {
    el('sb-lines').textContent = (text ? text.split('\n').length : 0) + ' lines';
    el('sb-cursor').textContent = 'Ln 1, Col 1';
    el('title-file').textContent = activeFile ? activeFile.split('/').pop() : '—';
    const parts = activeFile ? activeFile.split('/') : [];
    el('breadcrumb').innerHTML = parts.length
        ? parts.map((p, i) => (i === parts.length - 1)
            ? '<span class="cur">' + escapeHtml(p) + '</span>'
            : '<a href="#" data-nav="' + escapeHtml(parts.slice(0, i + 1).join('/')) + '">' + escapeHtml(p) + '</a>').join('<span class="sep">›</span>')
        : '<span class="cur">—</span>';
}

// ---------- markdown pipeline ----------
async function fetchText(path) {
    if (cache[path]) return cache[path];
    const res = await fetch(path);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    cache[path] = await res.text();
    return cache[path];
}

/* Strip the page's identity chrome (top nav lines, H1, subtitle
 * blockquote) so it doesn't duplicate the tab/breadcrumb UI. Handles all
 * nav shapes used in the content; top-of-page only — bottom nav links
 * remain and still navigate inside the viewer. */
function stripPageIdentity(md) {
    const lines = md.split('\n');
    let i = 0;
    // skip leading chrome: blank, ---, comments, nav lines (←… / [←…)
    while (i < lines.length) {
        const t = lines[i].trim();
        if (t === '' || t === '---' || t.startsWith('<!--') || t.startsWith('←') || t.startsWith('[←')) { i++; continue; }
        break;
    }
    // consume the page H1
    if (i < lines.length && /^#\s/.test(lines[i])) {
        i++;
        // optional subtitle blockquote (separated by blanks)
        let j = i;
        while (j < lines.length && lines[j].trim() === '') j++;
        if (j < lines.length && lines[j].trimStart().startsWith('>')) {
            while (j < lines.length && lines[j].trimStart().startsWith('>')) j++;
            i = j;
            // swallow the separator hr that follows the subtitle, if any
            while (i < lines.length && lines[i].trim() === '') i++;
            if (i < lines.length && lines[i].trim() === '---') {
                i++;
                while (i < lines.length && lines[i].trim() === '') i++;
            }
        }
    }
    return lines.slice(i).join('\n');
}

/* GitHub-style heading slug so in-page `#...` anchors keep working
 * (marked v12 emits no heading ids). */
function slugify(text) {
    return text.trim().toLowerCase()
        .replace(/[\u2000-\u206f\u2190-\u21ff\u2b00-\u2bff\ufe0f]/g, '')
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

function addHeadingAnchors(contentEl) {
    const used = {};
    contentEl.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h => {
        let slug = slugify(h.textContent);
        if (!slug) slug = 'section';
        if (used[slug] !== undefined) { used[slug]++; slug = slug + '-' + used[slug]; }
        else used[slug] = 0;
        h.id = slug;
    });
}

/* Resolve relative links/images after rendering: .md links open in the
 * viewer, images get repo-relative URLs, external links open in new tab. */
function processLinks(container, baseDir) {
    container.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href');
        if (!href) return;
        if (/^(https?:|mailto:)/i.test(href)) { a.target = '_blank'; a.rel = 'noopener'; return; }
        if (href.startsWith('#')) return;                       // in-page anchor
        const raw = href.split('#')[0];
        const frag = href.includes('#') ? href.split('#').slice(1).join('#') : '';
        const resolved = pathJoin(baseDir, raw);
        if (isMd(resolved)) {
            a.dataset.nav = resolved;
            a.dataset.frag = frag;
            a.setAttribute('href', '#');
        }
        // non-md relative links (rare) fall through unchanged
    });
    container.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (!src || /^(https?:|data:)/i.test(src)) return;
        img.src = pathJoin(baseDir, src);
    });
}

// ---------- file activation ----------
async function activateFile(file) {
    activeFile = file;
    renderTabs();
    document.querySelectorAll('.tree-file').forEach(f => f.classList.toggle('active', f.dataset.file === file));
    const content = el('content');
    content.innerHTML = '<div class="loading-pane">Loading ' + escapeHtml(file) + '…</div>';
    try {
        const md = await fetchText(file);
        const cleaned = stripPageIdentity(md);
        content.innerHTML = marked.parse(cleaned);
        addHeadingAnchors(content);
        processLinks(content, dirOf(file));
        updateStatus(md);
        renderGutter(Math.min(md.split('\n').length, 400));
        el('editor-scroll').scrollTop = 0;
    } catch (err) {
        content.innerHTML = '<div class="loading-pane" style="color:#f48771;">Could not load ' + escapeHtml(file) + ': ' + escapeHtml(err.message) + '</div>';
    }
}

function openFile(file, frag) {
    if (!openTabs.includes(file)) openTabs.push(file);
    const done = activateFile(file);
    if (frag) done.then(() => {
        const target = document.getElementById(frag);
        if (target) target.scrollIntoView();
    });
    return done;
}

function closeTab(file, e) {
    if (e) e.stopPropagation();
    openTabs = openTabs.filter(f => f !== file);
    if (activeFile === file) {
        if (openTabs.length) activateFile(openTabs[openTabs.length - 1]);
        else { activeFile = null; renderTabs(); el('content').innerHTML = '<div class="loading-pane">No files open. Click one in the Explorer.</div>'; updateStatus(''); }
    } else renderTabs();
}

function closeAllTabs() {
    openTabs = [];
    activeFile = null;
    renderTabs();
    el('content').innerHTML = '<div class="loading-pane">No files open. Click one in the Explorer.</div>';
    updateStatus('');
}
window.closeAllTabs = closeAllTabs;

// ---------- image preview ----------
function closePreview() {
    if (previewEl) { previewEl.remove(); previewEl = null; }
}

function showPreview(img) {
    closePreview();
    previewEl = document.createElement('div');
    previewEl.className = 'img-preview';
    const box = document.createElement('div');
    box.className = 'img-preview-box';
    const clone = document.createElement('img');
    clone.src = img.src;
    clone.className = 'img-preview-img';
    const caption = document.createElement('div');
    caption.className = 'img-preview-caption';
    const name = img.currentSrc ? decodeURIComponent(img.currentSrc.split('/').pop()) : '';
    caption.textContent = (img.alt || '') + (name ? ' — ' + name : '');
    box.appendChild(clone);
    box.appendChild(caption);
    previewEl.appendChild(box);
    previewEl.onclick = closePreview;
    document.body.appendChild(previewEl);
}

// ---------- boot ----------
document.addEventListener('DOMContentLoaded', async () => {
    applyStoredTheme();
    try {
        const [configRes, manifestRes] = await Promise.all([
            fetch('viewer.config.json'),
            fetch('viewer-engine/tree.json'),
        ]);
        CONFIG = await configRes.json();
        MANIFEST = await manifestRes.json();
    } catch (err) {
        el('content').innerHTML = '<div class="loading-pane" style="color:#f48771;">Failed to load viewer config/tree: ' + escapeHtml(err.message) + '</div>';
        return;
    }
    renderTree();
    if (CONFIG.title) document.title = CONFIG.title;

    // Global click delegation: nav links, then image previews.
    document.addEventListener('click', (e) => {
        const nav = e.target.closest('[data-nav]');
        if (nav) {
            e.preventDefault();
            const target = nav.getAttribute('data-nav');
            if (target) openFile(target, nav.dataset.frag || '');
            return;
        }
        const img = e.target.closest('.md img');
        if (img) showPreview(img);
    });

    // Esc closes the image preview.
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePreview(); });

    openFile(CONFIG.defaultFile || 'learning-path/00-index.md');
});
})();

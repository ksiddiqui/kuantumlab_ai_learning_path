#!/usr/bin/env node
/**
 * build-tree.mjs — generates viewer-engine/tree.json for the Markdown viewer.
 *
 * Usage:  node viewer-engine/build-tree.mjs
 * Run from the repo root (or from viewer-engine/; the script resolves the
 * config from the repo root one level up).
 *
 * Reads viewer.config.json, walks `contentRoot`, skips `exclude` entries
 * (exact names or glob patterns like *.png), and writes the manifest
 * consumed by viewer-engine/app.js. Zero dependencies, Node >= 18.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const CONFIG_PATH = join(root, 'viewer.config.json');
const OUT_PATH = join(here, 'tree.json');

function globToRegExp(pattern) {
    const esc = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.');
    return new RegExp('^' + esc + '$');
}

function isExcluded(name, exclude) {
    return exclude.some(rule => (rule.includes('*') || rule.includes('?')) ? globToRegExp(rule).test(name) : rule === name);
}

async function walk(dir, base) {
    const entries = await readdir(dir, { withFileTypes: true });
    const dirs = entries.filter(e => e.isDirectory() && !e.name.startsWith('.') && !isExcluded(e.name, exclude));
    const files = entries.filter(e => e.isFile() && !e.name.startsWith('.') && !isExcluded(e.name, exclude));
    dirs.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));
    const children = [];
    for (const d of dirs) {
        children.push(await walk(join(dir, d.name), base ? base + '/' + d.name : d.name));
    }
    for (const f of files) {
        children.push({ type: 'file', name: f.name, path: (base ? base + '/' : '') + f.name });
    }
    return { type: 'dir', name: basename(dir), path: base, open: base === '', children };
}

const config = JSON.parse(await readFile(CONFIG_PATH, 'utf8'));
const exclude = config.exclude || [];
const contentRoot = resolve(root, config.contentRoot || '.');

const tree = await walk(contentRoot, '');
tree.name = basename(contentRoot) || basename(root);

const manifest = { root: tree.name, tree };
await writeFile(OUT_PATH, JSON.stringify(manifest, null, 2) + '\n');

const count = (n) => n.type === 'file' ? 1 : n.children.reduce((a, c) => a + count(c), 0);
console.log('tree.json written: ' + relative(root, OUT_PATH) + ' (' + count(tree) + ' files)');

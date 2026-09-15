<!-- Navigation: Top -->
← [Back to Section Index](00-index.md) | ← [Previous Topic](01-online-platform.md) | [Next Topic →](03-local-tool.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../00-index.md) → [Section 12: Project Ideas](00-index.md) → **Personal Knowledge Assistant**

# Personal Knowledge Assistant + Study Buddy AI

> Build a mobile app where you record a voice memo, it auto-transcribes and summarizes it, and surfaces relevant past notes when you speak a new topic (local embedding + RAG). Then add a spaced-repetition flashcard engine that generates cards from your lecture notes or YouTube transcripts and adapts to your mistakes.

This track is two apps in one repo — both share the same pattern: **voice/text in → local embedding → semantic search over your own knowledge → personalized output.** One makes your memories searchable; the other makes your study life efficient. Build the Knowledge Assistant first, then bolt on Study Buddy.

## 📺 Recommended Videos

1. [Ollama Tutorial for Beginners | Run LLMs Locally on Your Computer](https://www.youtube.com/watch?v=qwdFfEc7wME) — running summarisation/embedding models on your laptop (Section 11)
2. [How to Run Local LLMs with Llama.cpp: Complete Guide](https://www.youtube.com/watch?v=EPYsP-l6z2s) — quantization so models fit on a phone-class device (Section 11)
3. [Learn 80% of Claude Code in 10 Minutes (2026 Tutorial)](https://www.youtube.com/watch?v=3aKVArutiIU) — scaffolding the React Native project (Section 9)

## Understanding the Two Apps

### Personal Knowledge Assistant
- **Problem it solves:** You have dozens of voice memos, meeting notes, and articles scattered across apps. Finding anything requires remembering exactly *where* you stored it.
- **How it works:** You speak a new thought → the app transcribes it → embeds it → stores both transcript and embedding → next time you ask about a related topic, it surfaces past notes by semantic similarity (not keyword match).

### Study Buddy AI
- **Problem it solves:** Traditional flashcards don't adapt to what you actually forget. You waste time reviewing things you already know.
- **How it works:** Feed in lecture notes or a YouTube transcript → the AI generates question/answer cards → you rate each recall → a spaced-repetition scheduler (SM-2 algorithm) shows you the ones you're close to forgetting more often.

> 💡 **Why local embeddings?** Cloud APIs (OpenAI, Cohere) charge per call and send your data to their servers. Running `sentence-transformers/all-MiniLM-L6-v2` locally via ONNX/llama.cpp costs nothing per query and keeps your notes private. The quality trade-off is acceptable for personal use.

## Project Breakdown

| Phase | Deliverable | Key Skills |
|---|---|---|
| A | Voice-to-note pipeline | Speech-to-text, audio recording, local embedding |
| B | Semantic search over notes | Vector DB (local), RAG retrieval |
| C | Flashcard generation | LLM prompt design (summarise → Q/A), SQLite storage |
| D | Spaced-repetition scheduler | SM-2 algorithm, review state tracking |
| E | Mobile UI + polish | Expo, React Navigation, dark mode |

## Step-by-Step Guide

### Step 1: Scaffold with Expo

Expo lets you build real iOS/Android apps with just JavaScript/TypeScript — no Xcode or Android Studio needed to start:

```bash
npm install -g expo-cli
npx create-expo-app knowledge-assistant --template expo-template-blank-typescript
cd knowledge-assistant
```

Install the audio and vector-store libraries:

```bash
npx expo install expo-av expo-speech @react-native-async-storage/async-storage
npm install @pinecone-database/pinecone llama-index node-html-markdown
```

> 📱 **Local-first choice:** For the vector store, you can use **Supabase with `pgvector`** (cloud, easy) or **`llama-index` with SQLite + a local index file** (fully offline). Start with Supabase for speed; swap to local later if privacy is the goal.

### Step 2: Record and transcribe voice memos

Use `expo-av` to record, then transcribe. For on-device transcription, run Whisper locally via [llama.cpp](https://github.com/ggerganov/llama.cpp) or the Whisper.cpp server; for faster dev, use a free cloud endpoint:

```ts
import { Audio } from 'expo-av';

// Record
const { uri } = await Audio.Recording.createAsync(
  Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
);

// Transcribe (local or cloud)
const transcript = await transcribe(uri); // your function
```

> 🛠 **Whisper locally:** `pip install openai-whisper` then `whisper path/to/memo.m4a --model base.en`. It runs on CPU in ~2x realtime. Good enough for personal notes.

### Step 3: Embed and store notes

Generate an embedding for the transcript and store it with the full text so you can do semantic search:

```ts
import { pipeline } from '@xenova/transformers'; // works in React Native

const embedder = await pipeline('feature-extraction', 'sentence-transformers/all-MiniLM-L6-v2');
const embedding = await embedder(transcript, { pooling: 'mean' });

// Store in Supabase
await supabase.from('notes').insert({
  user_id: userId,
  transcript: transcript,
  embedding: embedding,  // vector column
  created_at: new Date(),
});
```

> 🔁 **Alternative local path:** Use `llama-index` to build a local vector index stored in the app's document directory. Zero cloud dependency, but slower first run as it downloads the model.

### Step 4: Semantic search ("surface relevant past notes")

When the user speaks a *new* topic, embed the new query and find the top-3 most similar past notes:

```ts
const queryEmbedding = await embedder(newTranscript);
const { data: matches } = await supabase.rpc('match_notes', {
  query_embedding: queryEmbedding,
  match_threshold: 0.7,
  match_count: 3,
});
// matches = [{ transcript, similarity, created_at }, ...]
```

You'll need a Postgres RPC for `match_notes` (cosine similarity). Supabase's quickstart has a template — adapt the column name to `embedding` (type `vector(384)`).

### Step 5: Flashcard generation (Study Buddy)

Take a note (transcript, lecture, or YouTube transcript) and turn it into Q/A cards. The key prompt pattern:

```xml
<task>
You are a study assistant. Turn the provided transcript into flashcards.
</task>
<instructions>
1. Read the transcript and identify the core concepts (not trivia).
2. For each concept, write one question on the front and a concise answer on the back (1-2 sentences).
3. Do NOT include dates, names, or examples unless they're essential to the concept.
4. Output in this format:

Q: [Question]
A: [Answer]

Q: [Question]
A: [Answer]
</instructions>
<transcript>{{TRANSCRIPT}}</transcript>
```

Export as JSON and store in SQLite (or Supabase for cross-device sync).

### Step 6: Spaced-repetition scheduler (SM-2)

The [SM-2 algorithm](https://www.supermemo.com/en/blog/application-of-a-computer-to-improve-the-results-obtained-in-working-with-the-supermemo-method) decides when to show each card again based on how well you recalled it:

```ts
function sm2(card, quality /* 0-5 */) {
  if (quality >= 3) {
    card.ease += (0.14 - (5 - quality) * (0.1 + (5 - quality) * 0.01));
    if (card.ease < 0.1) card.ease = 0.1;  // clamp
    card.interval = card.rep <= 0 ? 1 :
                    card.rep === 1 ? 6 :
                    Math.round(card.interval * card.ease);
    card.rep += 1;
  } else {
    card.rep = 0;
    card.interval = 1;  // wrong answer → show again soon
  }
  card.nextReview = Date.now() + card.interval * 86400000;
  return card;
}
```

Store `rep`, `ease`, `interval`, and `nextReview` per card. Each review, query for cards where `nextReview <= NOW`.

### Step 7: Polish and deploy

- Add **dark/light mode** (Expo supports system theming via `useColorScheme()`).
- Add a **review queue** screen that pulls due cards and lets you rate recall (1-4 buttons: "Again / Hard / Good / Easy").
- Export the Knowledge Assistant's notes as a **web dashboard** (reuses the Privacy-First Data Dashboard pattern from [Track 3](03-local-tool.md)) so you can search from a browser too.

Deploy the standalone app with Expo Application Services (EAS) or stick to the Expo Go dev client for the portfolio build. A working `.apk`/`.ipa` is the strongest evidence you can show.

## Common Pitfalls

- ❌ **The embedding model is too big for the phone** — `all-MiniLM-L6-v2` (384-dim) runs fine on mobile; `all-mpnet-base-v2` (768-dim) is overkill. Stick to 384-dim models.
- ❌ **Voice transcription eats battery / data** — run Whisper locally only when the device is charging; otherwise queue transcriptions.
- ❌ **SM-2 intervals explode (or never increase)** — test the scheduler with a fake clock; wrong answers must reset `interval` to 1 and `rep` to 0.
- ❌ **Cards are just copied text** — the LLM prompt must ask for *concepts*, not quotes. Require exactly one Q/A pair per "core idea."
- ❌ **App crashes on low storage** — audio files grow fast. Delete the recorded `.m4a` after transcription succeeds.

## Quick Reference

| Task | Command / Code |
|---|---|
| Create Expo app | `npx create-expo-app my-app --template expo-template-blank-typescript` |
| Record audio | `Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)` |
| Local embed model | `sentence-transformers/all-MiniLM-L6-v2` (384-dim, ~90MB) |
| Local Whisper | `pip install openai-whisper && whisper memo.m4a --model base.en` |
| Supabase cosine RPC | `create extension if not exists vector;` then `rpc('match_notes', {...})` |
| SM-2 reference | [SuperMemo SM-2](https://www.supermemo.com/en/blog/application-of-a-computer-to-improve-the-results-obtained-in-working-with-the-supermega-method) |
| Build Android APK | `eas build --platform android` |

## Key Takeaways

- **Two apps, one pattern:** embedding + semantic search + personalization. Build the Knowledge Assistant's "search my notes" feature first — it's the foundation for the flashcard generator.
- **Privacy by default:** local embeddings (`@xenova/transformers`) and SQLite beat sending your notes to a cloud API. This is the #1 thing hiring managers notice on a resume project.
- **Spaced repetition is a 20-line algorithm.** Don't over-engineer the scheduler — the SM-2 logic above is battle-tested and interview-ready.
- **Ship an APK**, not just a Expo Go link. `eas build` is free and gives you a real file to install.

## 📚 Recommended Reading (Platform Docs)

1. [Expo Documentation](https://docs.expo.dev/) — project setup, audio recording, and EAS builds
2. [React Native Docs](https://reactnative.dev/) — core components, AsyncStorage, and performance
3. [Supabase Vector Docs](https://supabase.com/docs/guides/database/postgres/vector) — pgvector setup and cosine similarity queries
4. [sentence-transformers Documentation](https://www.sbert.net/) — embedding models and local inference
5. [Whisper.cpp](https://github.com/ggerganov/whisper.cpp) — run Whisper on-device or locally
6. [SuperMemo / SM-2 Algorithm](https://www.supermemo.com/en/blog/application-of-a-computer-to-improve-the-results-obtained-in-working-with-the-supermemo-method) — the original spaced-repetition paper

---

<!-- Navigation: Bottom -->
← [Back to Section Index](00-index.md) | ← [Previous Topic](01-online-platform.md) | [Next Topic →](03-local-tool.md)

[← Main Index](../00-index.md) | [Section Index](00-index.md)

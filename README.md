# TOTman — Token Optimization Tool

> **Reduce your AI prompt costs by 25%+ before you hit send.**

TOTman is a free, open-source, client-side tool that helps you optimize prompts before sending them to any AI model. It works with **ChatGPT, Claude, Gemini, Grok, Mistral, Llama, DeepSeek, Cohere, Amazon Nova, DALL·E, Sora, Midjourney, Whisper, ElevenLabs, Copilot, Cursor**, and 50+ models.

**🔒 100% Private** — Everything runs in your browser. No data is sent anywhere. No API keys needed.

🌐 **Live:** [https://www.totman.online](https://www.totman.online)

---

## Features

### ⚡ Real-Time Token Counter
Instant token estimates across all major AI model families as you type.

### 🔧 Rule-Based Optimizer
100+ optimization rules across 6 categories, targeting **25%+ token reduction**:
- **Verbose Phrase Replacement** — "in order to" → "to", "due to the fact that" → "because"
- **Filler Word Removal** — strips "basically", "essentially", "just", "really", etc.
- **Prompt Pattern Optimization** — concise labels instead of wordy setups
- **Structural Cleanup** — excess whitespace, duplicates, repeated punctuation
- **Smart Suggestions** — context-aware tips (reduce examples, structured format, etc.)
- **Redundancy Detection** — finds duplicate sentences and repeated context

### 💰 Cost Comparison Across 50+ Models
See exactly what your prompt costs on every major AI model, ranked cheapest to most expensive.

### 📖 Multi-Modality Style Guide (9 Categories)
Covers **every type of AI**: Text, Code, Image Gen, Video Gen, Audio/Speech, Agentic AI, Productivity Tools, and Cross-Model Cost Strategies.

### 🗂️ Model Reference Database
50+ models from 18 providers — including image (DALL·E 3, Midjourney, Stable Diffusion, FLUX), video (Sora 2, Veo 2, Runway), audio (Whisper, TTS, ElevenLabs), and productivity (Copilot, Cursor, Gemini Code Assist).

---

## Getting Started

### Option 1: Use Online (Free)
Visit [https://puneetkhamborkar.github.io/totman](https://puneetkhamborkar.github.io/totman) — no install needed.

### Option 2: Run Locally
```bash
git clone https://github.com/PuneetKhamborkar/totman.git
cd totman
open index.html
```

### Option 3: Deploy Your Own (Free)
Fork this repo → Go to Settings → Pages → Deploy from main branch. Done.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Build Tools | None (zero dependencies!) |
| Hosting | GitHub Pages (free) |
| Privacy | 100% client-side processing |

---

## Contributing

We welcome contributions! Here's how:

### Update Model Pricing
1. Edit `js/models.js`
2. Update `inputPrice`/`outputPrice` (per 1M tokens)
3. Submit a PR

### Add New Models
Add a new entry to `AI_MODELS` in `js/models.js`.

### Add Optimization Rules
Add patterns to `js/optimizer.js` — verbose phrases, filler words, or prompt patterns.

### Report Bugs
Open an issue with a sample prompt.

---

## License

MIT License — see [LICENSE](./LICENSE)

---

**Built with ❤️ for the AI community. Stop wasting tokens.**

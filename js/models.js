/**
 * TOTman — Token Optimization Tool
 * AI Model Database — ALL Modalities
 *
 * Covers: Text, Code, Image, Video, Audio, Multimodal, Agentic AI, Productivity
 * Prices: USD per 1 million tokens (text/code), per image, per second (video/audio)
 * Last updated: 2026-05-07
 *
 * Community contributions welcome — submit a PR to add/update models!
 */

const AI_MODELS = {

  // ═════════════════════════════════════════════
  //  TEXT & CODE MODELS
  // ═════════════════════════════════════════════

  // ── OpenAI ──
  "gpt-4.1":       { name: "GPT-4.1",       provider: "OpenAI", inputPrice: 2.00, outputPrice: 8.00,  contextWindow: 1048576, maxOutput: 32768,  tokenizerFamily: "o200k", category: "flagship",  modality: "text" },
  "gpt-4.1-mini":  { name: "GPT-4.1 Mini",  provider: "OpenAI", inputPrice: 0.40, outputPrice: 1.60,  contextWindow: 1048576, maxOutput: 32768,  tokenizerFamily: "o200k", category: "efficient", modality: "text" },
  "gpt-4.1-nano":  { name: "GPT-4.1 Nano",  provider: "OpenAI", inputPrice: 0.10, outputPrice: 0.40,  contextWindow: 1048576, maxOutput: 32768,  tokenizerFamily: "o200k", category: "efficient", modality: "text" },
  "gpt-4o":        { name: "GPT-4o",         provider: "OpenAI", inputPrice: 2.50, outputPrice: 10.00, contextWindow: 128000,  maxOutput: 16384,  tokenizerFamily: "o200k", category: "flagship",  modality: "multimodal" },
  "gpt-4o-mini":   { name: "GPT-4o Mini",    provider: "OpenAI", inputPrice: 0.15, outputPrice: 0.60,  contextWindow: 128000,  maxOutput: 16384,  tokenizerFamily: "o200k", category: "efficient", modality: "multimodal" },
  "o3":            { name: "o3",             provider: "OpenAI", inputPrice: 10.00, outputPrice: 40.00, contextWindow: 200000, maxOutput: 100000, tokenizerFamily: "o200k", category: "reasoning", modality: "text" },
  "o3-mini":       { name: "o3 Mini",        provider: "OpenAI", inputPrice: 1.10,  outputPrice: 4.40,  contextWindow: 200000, maxOutput: 100000, tokenizerFamily: "o200k", category: "reasoning", modality: "text" },
  "o4-mini":       { name: "o4 Mini",        provider: "OpenAI", inputPrice: 1.10,  outputPrice: 4.40,  contextWindow: 200000, maxOutput: 100000, tokenizerFamily: "o200k", category: "reasoning", modality: "text" },
  "gpt-4-turbo":   { name: "GPT-4 Turbo",   provider: "OpenAI", inputPrice: 10.00, outputPrice: 30.00, contextWindow: 128000, maxOutput: 4096,   tokenizerFamily: "cl100k", category: "flagship", modality: "multimodal" },
  "codex-mini":    { name: "Codex Mini",     provider: "OpenAI", inputPrice: 1.50,  outputPrice: 6.00,  contextWindow: 200000, maxOutput: 100000, tokenizerFamily: "o200k", category: "code",      modality: "code" },

  // ── Anthropic ──
  "claude-opus-4":    { name: "Claude Opus 4",     provider: "Anthropic", inputPrice: 15.00, outputPrice: 75.00, contextWindow: 200000, maxOutput: 32000, tokenizerFamily: "claude", category: "flagship",  modality: "multimodal" },
  "claude-sonnet-4":  { name: "Claude Sonnet 4",   provider: "Anthropic", inputPrice: 3.00,  outputPrice: 15.00, contextWindow: 200000, maxOutput: 64000, tokenizerFamily: "claude", category: "flagship",  modality: "multimodal" },
  "claude-3.5-sonnet":{ name: "Claude 3.5 Sonnet", provider: "Anthropic", inputPrice: 3.00,  outputPrice: 15.00, contextWindow: 200000, maxOutput: 8192,  tokenizerFamily: "claude", category: "flagship",  modality: "multimodal" },
  "claude-3.5-haiku": { name: "Claude 3.5 Haiku",  provider: "Anthropic", inputPrice: 0.80,  outputPrice: 4.00,  contextWindow: 200000, maxOutput: 8192,  tokenizerFamily: "claude", category: "efficient", modality: "multimodal" },
  "claude-3-haiku":   { name: "Claude 3 Haiku",    provider: "Anthropic", inputPrice: 0.25,  outputPrice: 1.25,  contextWindow: 200000, maxOutput: 4096,  tokenizerFamily: "claude", category: "efficient", modality: "text" },

  // ── Google ──
  "gemini-2.5-pro":   { name: "Gemini 2.5 Pro",   provider: "Google", inputPrice: 1.25, outputPrice: 10.00, contextWindow: 1048576, maxOutput: 65536, tokenizerFamily: "gemini", category: "flagship",  modality: "multimodal", note: "$2.50/$15 above 200K tokens" },
  "gemini-2.5-flash": { name: "Gemini 2.5 Flash",  provider: "Google", inputPrice: 0.15, outputPrice: 0.60,  contextWindow: 1048576, maxOutput: 65536, tokenizerFamily: "gemini", category: "efficient", modality: "multimodal", note: "Thinking tokens: $0.70/$3.50" },
  "gemini-2.0-flash": { name: "Gemini 2.0 Flash",  provider: "Google", inputPrice: 0.10, outputPrice: 0.40,  contextWindow: 1048576, maxOutput: 8192,  tokenizerFamily: "gemini", category: "efficient", modality: "multimodal" },
  "gemini-1.5-pro":   { name: "Gemini 1.5 Pro",    provider: "Google", inputPrice: 1.25, outputPrice: 5.00,  contextWindow: 2097152, maxOutput: 8192,  tokenizerFamily: "gemini", category: "flagship",  modality: "multimodal" },

  // ── Mistral ──
  "mistral-large":  { name: "Mistral Large",  provider: "Mistral", inputPrice: 2.00, outputPrice: 6.00, contextWindow: 128000, maxOutput: 8192, tokenizerFamily: "mistral", category: "flagship",  modality: "text" },
  "mistral-small":  { name: "Mistral Small",  provider: "Mistral", inputPrice: 0.20, outputPrice: 0.60, contextWindow: 128000, maxOutput: 8192, tokenizerFamily: "mistral", category: "efficient", modality: "text" },
  "codestral":      { name: "Codestral",       provider: "Mistral", inputPrice: 0.30, outputPrice: 0.90, contextWindow: 256000, maxOutput: 8192, tokenizerFamily: "mistral", category: "code",      modality: "code" },
  "mistral-nemo":   { name: "Mistral Nemo",    provider: "Mistral", inputPrice: 0.15, outputPrice: 0.15, contextWindow: 128000, maxOutput: 8192, tokenizerFamily: "mistral", category: "efficient", modality: "text" },
  "pixtral-large":  { name: "Pixtral Large",   provider: "Mistral", inputPrice: 2.00, outputPrice: 6.00, contextWindow: 128000, maxOutput: 8192, tokenizerFamily: "mistral", category: "flagship",  modality: "multimodal" },

  // ── xAI ──
  "grok-3":      { name: "Grok 3",      provider: "xAI", inputPrice: 3.00, outputPrice: 15.00, contextWindow: 131072, maxOutput: 8192, tokenizerFamily: "grok", category: "flagship",  modality: "multimodal" },
  "grok-3-mini": { name: "Grok 3 Mini", provider: "xAI", inputPrice: 0.30, outputPrice: 0.50,  contextWindow: 131072, maxOutput: 8192, tokenizerFamily: "grok", category: "efficient", modality: "text" },

  // ── Meta ──
  "llama-4-maverick": { name: "Llama 4 Maverick", provider: "Meta", inputPrice: 0.27, outputPrice: 0.85, contextWindow: 1048576, maxOutput: 8192, tokenizerFamily: "llama", category: "flagship",  modality: "multimodal", note: "Via Together AI" },
  "llama-4-scout":    { name: "Llama 4 Scout",    provider: "Meta", inputPrice: 0.18, outputPrice: 0.50, contextWindow: 524288,  maxOutput: 8192, tokenizerFamily: "llama", category: "efficient", modality: "multimodal", note: "Via Together AI" },
  "llama-3.3-70b":    { name: "Llama 3.3 70B",    provider: "Meta", inputPrice: 0.88, outputPrice: 0.88, contextWindow: 128000,  maxOutput: 8192, tokenizerFamily: "llama", category: "flagship",  modality: "text", note: "Via Together AI" },
  "llama-code-70b":   { name: "Code Llama 70B",   provider: "Meta", inputPrice: 0.90, outputPrice: 0.90, contextWindow: 100000,  maxOutput: 8192, tokenizerFamily: "llama", category: "code",      modality: "code", note: "Via Together AI" },

  // ── Cohere ──
  "command-r-plus": { name: "Command R+", provider: "Cohere", inputPrice: 2.50, outputPrice: 10.00, contextWindow: 128000, maxOutput: 4096, tokenizerFamily: "cohere", category: "flagship",  modality: "text" },
  "command-r":      { name: "Command R",  provider: "Cohere", inputPrice: 0.15, outputPrice: 0.60,  contextWindow: 128000, maxOutput: 4096, tokenizerFamily: "cohere", category: "efficient", modality: "text" },

  // ── DeepSeek ──
  "deepseek-v3": { name: "DeepSeek V3", provider: "DeepSeek", inputPrice: 0.27, outputPrice: 1.10, contextWindow: 65536, maxOutput: 8192, tokenizerFamily: "deepseek", category: "flagship",  modality: "text" },
  "deepseek-r1":  { name: "DeepSeek R1", provider: "DeepSeek", inputPrice: 0.55, outputPrice: 2.19, contextWindow: 65536, maxOutput: 8192, tokenizerFamily: "deepseek", category: "reasoning", modality: "text" },

  // ── Amazon ──
  "nova-pro":  { name: "Nova Pro",  provider: "Amazon", inputPrice: 0.80, outputPrice: 3.20, contextWindow: 300000, maxOutput: 5120, tokenizerFamily: "nova", category: "flagship",  modality: "multimodal" },
  "nova-lite": { name: "Nova Lite", provider: "Amazon", inputPrice: 0.06, outputPrice: 0.24, contextWindow: 300000, maxOutput: 5120, tokenizerFamily: "nova", category: "efficient", modality: "multimodal" },

  // ── Alibaba ──
  "qwen-2.5-72b": { name: "Qwen 2.5 72B",  provider: "Alibaba", inputPrice: 0.90, outputPrice: 0.90, contextWindow: 131072, maxOutput: 8192, tokenizerFamily: "qwen", category: "flagship",  modality: "text", note: "Via Together AI" },
  "qwen-vl-max":  { name: "Qwen VL Max",    provider: "Alibaba", inputPrice: 2.00, outputPrice: 5.60, contextWindow: 32768,  maxOutput: 8192, tokenizerFamily: "qwen", category: "flagship",  modality: "multimodal" },

  // ═════════════════════════════════════════════
  //  IMAGE GENERATION MODELS
  // ═════════════════════════════════════════════

  "dall-e-3": {
    name: "DALL·E 3", provider: "OpenAI", modality: "image",
    category: "image", tokenizerFamily: "none",
    pricingModel: "per-image",
    pricing: { "1024x1024-std": 0.04, "1024x1024-hd": 0.08, "1792x1024-std": 0.08, "1792x1024-hd": 0.12 },
    note: "Prompt optimization reduces regeneration; shorter prompts = same quality",
  },
  "gpt-image-1": {
    name: "GPT Image 1", provider: "OpenAI", modality: "image",
    category: "image", tokenizerFamily: "o200k",
    pricingModel: "per-token",
    inputPrice: 10.00, outputPrice: 40.00,
    note: "Token-based image gen; prompt length directly affects cost",
  },
  "midjourney-v6": {
    name: "Midjourney v6", provider: "Midjourney", modality: "image",
    category: "image", tokenizerFamily: "none",
    pricingModel: "subscription",
    pricing: { basic: 10, standard: 30, pro: 60, mega: 120 },
    note: "Monthly subscription; shorter prompts = faster GPU time usage",
  },
  "stable-diffusion-3.5": {
    name: "Stable Diffusion 3.5", provider: "Stability AI", modality: "image",
    category: "image", tokenizerFamily: "none",
    pricingModel: "per-image",
    pricing: { ultra: 0.08, core: 0.03 },
    note: "Open-weight available for self-hosting (free)",
  },
  "imagen-3": {
    name: "Imagen 3", provider: "Google", modality: "image",
    category: "image", tokenizerFamily: "none",
    pricingModel: "per-image",
    pricing: { standard: 0.03, premium: 0.06 },
    note: "Via Vertex AI",
  },
  "flux-1.1-pro": {
    name: "FLUX 1.1 Pro", provider: "Black Forest Labs", modality: "image",
    category: "image", tokenizerFamily: "none",
    pricingModel: "per-image",
    pricing: { standard: 0.04 },
    note: "Via Replicate/BFL API",
  },

  // ═════════════════════════════════════════════
  //  VIDEO GENERATION MODELS
  // ═════════════════════════════════════════════

  "sora-2": {
    name: "Sora 2", provider: "OpenAI", modality: "video",
    category: "video", tokenizerFamily: "none",
    pricingModel: "per-second",
    pricing: { base: 0.10, pro: 0.40 },
    note: "~$0.10/sec base, $0.30-0.50/sec pro quality",
  },
  "veo-2": {
    name: "Veo 2", provider: "Google", modality: "video",
    category: "video", tokenizerFamily: "none",
    pricingModel: "per-second",
    pricing: { standard: 0.15, premium: 0.60 },
    note: "Via Vertex AI",
  },
  "runway-gen3": {
    name: "Runway Gen-3 Alpha", provider: "Runway", modality: "video",
    category: "video", tokenizerFamily: "none",
    pricingModel: "credits",
    pricing: { standard: 15, pro: 35, unlimited: 95 },
    note: "Credit-based; 1 credit = $0.01",
  },
  "kling-1.5": {
    name: "Kling 1.5", provider: "Kuaishou", modality: "video",
    category: "video", tokenizerFamily: "none",
    pricingModel: "credits",
    pricing: { perGeneration: 0.30 },
    note: "API access; ~$0.30 per 5-sec clip",
  },

  // ═════════════════════════════════════════════
  //  AUDIO / SPEECH MODELS
  // ═════════════════════════════════════════════

  "whisper-1": {
    name: "Whisper", provider: "OpenAI", modality: "audio",
    category: "audio", tokenizerFamily: "none",
    pricingModel: "per-minute",
    pricing: { perMinute: 0.006 },
    note: "Speech-to-text: $0.006/minute",
  },
  "tts-1": {
    name: "TTS-1", provider: "OpenAI", modality: "audio",
    category: "audio", tokenizerFamily: "none",
    pricingModel: "per-char",
    pricing: { perMillion: 15.00 },
    note: "Text-to-speech: $15/1M characters",
  },
  "tts-1-hd": {
    name: "TTS-1 HD", provider: "OpenAI", modality: "audio",
    category: "audio", tokenizerFamily: "none",
    pricingModel: "per-char",
    pricing: { perMillion: 30.00 },
    note: "Higher quality TTS: $30/1M characters",
  },
  "elevenlabs-multilingual": {
    name: "ElevenLabs Multilingual v2", provider: "ElevenLabs", modality: "audio",
    category: "audio", tokenizerFamily: "none",
    pricingModel: "subscription",
    pricing: { starter: 5, creator: 22, pro: 99, scale: 299 },
    note: "30K-600K chars/mo depending on plan",
  },
  "gemini-audio-input": {
    name: "Gemini (Audio Input)", provider: "Google", modality: "audio",
    category: "audio", tokenizerFamily: "gemini",
    pricingModel: "per-token",
    inputPrice: 0.70, outputPrice: 0.60,
    note: "Audio input costs ~3x text input for Gemini models",
  },

  // ═════════════════════════════════════════════
  //  AGENTIC / PRODUCTIVITY AI
  // ═════════════════════════════════════════════

  "computer-use-sonnet": {
    name: "Claude Computer Use", provider: "Anthropic", modality: "agentic",
    category: "agentic", tokenizerFamily: "claude",
    inputPrice: 3.00, outputPrice: 15.00,
    contextWindow: 200000, maxOutput: 64000,
    note: "Agentic computer control; screenshot tokens add up fast",
  },
  "openai-agents": {
    name: "OpenAI Agents SDK", provider: "OpenAI", modality: "agentic",
    category: "agentic", tokenizerFamily: "o200k",
    inputPrice: 2.50, outputPrice: 10.00,
    contextWindow: 128000, maxOutput: 16384,
    note: "Multi-tool orchestration; each tool call adds tokens",
  },
  "copilot-gpt4": {
    name: "GitHub Copilot (GPT-4)", provider: "Microsoft", modality: "code",
    category: "productivity", tokenizerFamily: "o200k",
    pricingModel: "subscription",
    pricing: { individual: 10, business: 19, enterprise: 39 },
    note: "Per user/month; context window optimization reduces latency",
  },
  "cursor-pro": {
    name: "Cursor Pro", provider: "Cursor", modality: "code",
    category: "productivity", tokenizerFamily: "o200k",
    pricingModel: "subscription",
    pricing: { pro: 20, business: 40 },
    note: "Fast requests limited; optimized prompts = more completions",
  },
  "gemini-code-assist": {
    name: "Gemini Code Assist", provider: "Google", modality: "code",
    category: "productivity", tokenizerFamily: "gemini",
    pricingModel: "subscription",
    pricing: { standard: 19, enterprise: 45 },
    note: "Per user/month; context file optimization crucial",
  },
};

// Provider brand colors for UI
const PROVIDER_COLORS = {
  OpenAI:            { primary: "#10a37f", bg: "rgba(16,163,127,0.12)",  text: "#10a37f" },
  Anthropic:         { primary: "#d4a574", bg: "rgba(212,165,116,0.12)", text: "#d4a574" },
  Google:            { primary: "#4285f4", bg: "rgba(66,133,244,0.12)",  text: "#669df7" },
  Mistral:           { primary: "#ff7000", bg: "rgba(255,112,0,0.12)",   text: "#ff8c33" },
  xAI:               { primary: "#ffffff", bg: "rgba(255,255,255,0.08)", text: "#e0e0e0" },
  Meta:              { primary: "#0668E1", bg: "rgba(6,104,225,0.12)",   text: "#4d96f0" },
  Cohere:            { primary: "#39594d", bg: "rgba(57,89,77,0.12)",    text: "#5fad8e" },
  DeepSeek:          { primary: "#4d6bfe", bg: "rgba(77,107,254,0.12)",  text: "#7d95fe" },
  Amazon:            { primary: "#ff9900", bg: "rgba(255,153,0,0.12)",   text: "#ffad33" },
  Alibaba:           { primary: "#ff6a00", bg: "rgba(255,106,0,0.12)",   text: "#ff8533" },
  Midjourney:        { primary: "#fff",    bg: "rgba(255,255,255,0.06)", text: "#ccc" },
  "Stability AI":    { primary: "#a855f7", bg: "rgba(168,85,247,0.12)", text: "#c084fc" },
  "Black Forest Labs":{ primary: "#22d3ee", bg: "rgba(34,211,238,0.12)", text: "#22d3ee" },
  Runway:            { primary: "#6366f1", bg: "rgba(99,102,241,0.12)", text: "#818cf8" },
  Kuaishou:          { primary: "#ff3b5c", bg: "rgba(255,59,92,0.12)",  text: "#ff6b84" },
  ElevenLabs:        { primary: "#f0f0f0", bg: "rgba(240,240,240,0.08)", text: "#d0d0d0" },
  Microsoft:         { primary: "#00bcf2", bg: "rgba(0,188,242,0.12)",  text: "#33ccff" },
  Cursor:            { primary: "#7c3aed", bg: "rgba(124,58,237,0.12)", text: "#a78bfa" },
};

// Category labels and icons
const CATEGORY_META = {
  flagship:     { label: "Flagship",     icon: "⚡", color: "#f59e0b" },
  efficient:    { label: "Efficient",    icon: "💨", color: "#22c55e" },
  reasoning:    { label: "Reasoning",    icon: "🧠", color: "#a78bfa" },
  code:         { label: "Code",         icon: "💻", color: "#06b6d4" },
  image:        { label: "Image Gen",    icon: "🎨", color: "#ec4899" },
  video:        { label: "Video Gen",    icon: "🎬", color: "#f43f5e" },
  audio:        { label: "Audio/Speech", icon: "🎙️", color: "#8b5cf6" },
  agentic:      { label: "Agentic AI",   icon: "🤖", color: "#14b8a6" },
  productivity: { label: "Productivity", icon: "🛠️", color: "#64748b" },
};

// Helper: get all unique providers
function getProviders() {
  const providers = new Set();
  Object.values(AI_MODELS).forEach(m => providers.add(m.provider));
  return [...providers];
}

// Helper: get models by provider
function getModelsByProvider(provider) {
  return Object.entries(AI_MODELS)
    .filter(([, m]) => m.provider === provider)
    .map(([id, m]) => ({ id, ...m }));
}

// Helper: get models that use per-token pricing (for cost comparison)
function getTokenPricedModels() {
  return Object.entries(AI_MODELS)
    .filter(([, m]) => m.inputPrice !== undefined && m.outputPrice !== undefined)
    .map(([id, m]) => ({ id, ...m }));
}

// Helper: format context window
function formatContextWindow(tokens) {
  if (!tokens) return "N/A";
  if (tokens >= 1048576) return `${(tokens / 1048576).toFixed(1)}M`;
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(0)}K`;
  return tokens.toString();
}

// Helper: format pricing for non-token models
function formatPricing(model) {
  if (model.inputPrice !== undefined) {
    return `$${model.inputPrice.toFixed(2)}/$${model.outputPrice.toFixed(2)} per 1M tokens`;
  }
  if (model.pricingModel === "per-image") {
    const prices = Object.values(model.pricing);
    return `$${Math.min(...prices).toFixed(2)}-$${Math.max(...prices).toFixed(2)}/image`;
  }
  if (model.pricingModel === "per-second") {
    const prices = Object.values(model.pricing);
    return `$${Math.min(...prices).toFixed(2)}-$${Math.max(...prices).toFixed(2)}/sec`;
  }
  if (model.pricingModel === "subscription") {
    const prices = Object.values(model.pricing);
    return `$${Math.min(...prices)}-$${Math.max(...prices)}/mo`;
  }
  if (model.pricingModel === "per-minute") {
    return `$${model.pricing.perMinute}/min`;
  }
  if (model.pricingModel === "per-char") {
    return `$${model.pricing.perMillion}/1M chars`;
  }
  if (model.pricingModel === "credits") {
    const prices = Object.values(model.pricing);
    return `from $${Math.min(...prices)}`;
  }
  return "See note";
}

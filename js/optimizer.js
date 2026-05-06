/**
 * TOTman — Token Optimization Tool
 * Rule-Based Prompt Optimizer & Multi-Modality Style Guide
 *
 * Targets 25%+ token reduction through 6 optimization categories.
 * Covers: Text, Code, Image, Video, Audio, Agentic AI, Productivity tools.
 */

const Optimizer = (() => {

  // ═══════════════════════════════════════════════
  // CATEGORY 1: Verbose Phrase Replacement (8-12%)
  // ═══════════════════════════════════════════════
  const VERBOSE_PHRASES = [
    { find: /\bI would like you to\b/gi, replace: "", rule: "Remove unnecessary preamble" },
    { find: /\bI want you to\b/gi, replace: "", rule: "Remove unnecessary preamble" },
    { find: /\bI need you to\b/gi, replace: "", rule: "Remove unnecessary preamble" },
    { find: /\bI'd like you to\b/gi, replace: "", rule: "Remove unnecessary preamble" },
    { find: /\bCould you please\b/gi, replace: "Please", rule: "Simplify polite phrasing" },
    { find: /\bCan you please\b/gi, replace: "Please", rule: "Simplify polite phrasing" },
    { find: /\bWould you be able to\b/gi, replace: "Please", rule: "Simplify polite phrasing" },
    { find: /\bWould you mind\b/gi, replace: "Please", rule: "Simplify polite phrasing" },
    { find: /\bPlease make sure to\b/gi, replace: "", rule: "Implied by instruction" },
    { find: /\bPlease ensure that\b/gi, replace: "Ensure", rule: "Trim excess politeness" },
    { find: /\bPlease go ahead and\b/gi, replace: "", rule: "Remove unnecessary preamble" },
    { find: /\bI was wondering if you could\b/gi, replace: "Please", rule: "Simplify polite phrasing" },
    { find: /\bin order to\b/gi, replace: "to", rule: "Concise connector" },
    { find: /\bdue to the fact that\b/gi, replace: "because", rule: "Concise connector" },
    { find: /\bfor the purpose of\b/gi, replace: "to", rule: "Concise connector" },
    { find: /\bin the event that\b/gi, replace: "if", rule: "Concise connector" },
    { find: /\bwith regard to\b/gi, replace: "about", rule: "Concise connector" },
    { find: /\bwith respect to\b/gi, replace: "about", rule: "Concise connector" },
    { find: /\bin spite of the fact that\b/gi, replace: "despite", rule: "Concise connector" },
    { find: /\bregardless of the fact that\b/gi, replace: "although", rule: "Concise connector" },
    { find: /\bat this point in time\b/gi, replace: "now", rule: "Concise connector" },
    { find: /\bat the present time\b/gi, replace: "now", rule: "Concise connector" },
    { find: /\bin the near future\b/gi, replace: "soon", rule: "Concise connector" },
    { find: /\ba large number of\b/gi, replace: "many", rule: "Concise connector" },
    { find: /\ba small number of\b/gi, replace: "few", rule: "Concise connector" },
    { find: /\bin addition to that\b/gi, replace: "also", rule: "Concise connector" },
    { find: /\bin addition to\b/gi, replace: "besides", rule: "Concise connector" },
    { find: /\bon the other hand\b/gi, replace: "alternatively", rule: "Concise connector" },
    { find: /\bas a result of\b/gi, replace: "because of", rule: "Concise connector" },
    { find: /\bas a matter of fact\b/gi, replace: "", rule: "Remove filler phrase" },
    { find: /\bthe reason why is because\b/gi, replace: "because", rule: "Concise connector" },
    { find: /\beach and every\b/gi, replace: "every", rule: "Remove redundancy" },
    { find: /\bfirst and foremost\b/gi, replace: "first", rule: "Remove redundancy" },
    { find: /\bany and all\b/gi, replace: "all", rule: "Remove redundancy" },
    { find: /\bif and when\b/gi, replace: "when", rule: "Remove redundancy" },
    { find: /\bvarious different\b/gi, replace: "various", rule: "Remove redundancy" },
    { find: /\bbasic fundamentals\b/gi, replace: "fundamentals", rule: "Remove redundancy" },
    { find: /\bpast history\b/gi, replace: "history", rule: "Remove redundancy" },
    { find: /\bend result\b/gi, replace: "result", rule: "Remove redundancy" },
    { find: /\bfuture plans\b/gi, replace: "plans", rule: "Remove redundancy" },
    { find: /\bis able to\b/gi, replace: "can", rule: "Concise verb" },
    { find: /\bare able to\b/gi, replace: "can", rule: "Concise verb" },
    { find: /\bhas the ability to\b/gi, replace: "can", rule: "Concise verb" },
    { find: /\bin a way that\b/gi, replace: "so that", rule: "Concise connector" },
    { find: /\bby means of\b/gi, replace: "using", rule: "Concise connector" },
    { find: /\bwith the exception of\b/gi, replace: "except", rule: "Concise connector" },
    { find: /\bit is important to note that\b/gi, replace: "Note:", rule: "Use label format" },
    { find: /\bit should be noted that\b/gi, replace: "Note:", rule: "Use label format" },
    { find: /\bplease note that\b/gi, replace: "Note:", rule: "Use label format" },
    { find: /\bkeep in mind that\b/gi, replace: "Note:", rule: "Use label format" },
    { find: /\bit is worth mentioning that\b/gi, replace: "", rule: "Remove meta-commentary" },
    { find: /\bas mentioned earlier\b/gi, replace: "", rule: "Remove back-references" },
    { find: /\bas I said before\b/gi, replace: "", rule: "Remove back-references" },
    { find: /\bas previously mentioned\b/gi, replace: "", rule: "Remove back-references" },
    { find: /\bas I mentioned above\b/gi, replace: "", rule: "Remove back-references" },
    { find: /\bthe fact that\b/gi, replace: "that", rule: "Concise connector" },
    { find: /\bthere is a need to\b/gi, replace: "must", rule: "Concise verb" },
    { find: /\bit is necessary to\b/gi, replace: "must", rule: "Concise verb" },
    { find: /\bit is possible that\b/gi, replace: "possibly", rule: "Concise phrasing" },
  ];

  // ═══════════════════════════════════════════════
  // CATEGORY 2: Filler Word Removal (3-5%)
  // ═══════════════════════════════════════════════
  const FILLER_WORDS = [
    "basically", "essentially", "actually", "literally", "honestly",
    "obviously", "clearly", "definitely", "certainly", "absolutely",
    "really", "very", "quite", "rather", "somewhat", "just",
    "simply", "totally", "completely", "entirely", "utterly",
    "perhaps", "maybe", "probably", "seemingly", "apparently",
    "kind of", "sort of", "type of", "more or less",
  ];

  // ═══════════════════════════════════════════════
  // CATEGORY 3: Prompt Engineering Patterns (5-8%)
  // ═══════════════════════════════════════════════
  const PROMPT_PATTERNS = [
    {
      find: /You are an? (?:expert|skilled|experienced|professional|knowledgeable) (?:in|at|with|on) (.+?)[\.\n]/gi,
      replace: "Role: $1 expert.\n",
      rule: "Use role labels instead of verbose role-play",
    },
    {
      find: /I need you to act as an? (.+?)[\.\n]/gi,
      replace: "Role: $1.\n",
      rule: "Use role labels",
    },
    {
      find: /(?:Please )?(?:provide|give|write|create) (?:a |an )?(?:very )?(?:detailed|comprehensive|thorough|in-depth|extensive) /gi,
      replace: "Provide detailed ",
      rule: "Simplify instruction prefix",
    },
    {
      find: /(?:Make sure|Ensure) (?:that )?the (?:output|response|answer|result) (?:is |should be )(?:in |formatted as )?/gi,
      replace: "Output format: ",
      rule: "Use output format label",
    },
    {
      find: /(?:Here is|Here's|Below is|The following is) (?:the |some |my )?(?:context|background|information|data)(?::| about| for| regarding)/gi,
      replace: "Context:",
      rule: "Use context label",
    },
  ];

  // ═══════════════════════════════════════════════
  // CATEGORY 4: Structural Optimization (3-5%)
  // ═══════════════════════════════════════════════
  function optimizeStructure(text) {
    const changes = [];
    let optimized = text;

    const excessNewlines = (optimized.match(/\n{3,}/g) || []).length;
    if (excessNewlines > 0) {
      optimized = optimized.replace(/\n{3,}/g, "\n\n");
      changes.push({ rule: "Collapse excess blank lines", category: "Structure", savings: excessNewlines * 2 });
    }
    const trailingSpaces = (optimized.match(/[ \t]+$/gm) || []).join("").length;
    if (trailingSpaces > 0) {
      optimized = optimized.replace(/[ \t]+$/gm, "");
      changes.push({ rule: "Remove trailing whitespace", category: "Structure", savings: Math.round(trailingSpaces / 4) });
    }
    const multiSpaces = (optimized.match(/ {2,}/g) || []).length;
    if (multiSpaces > 0) {
      optimized = optimized.replace(/ {2,}/g, " ");
      changes.push({ rule: "Collapse multiple spaces", category: "Structure", savings: multiSpaces });
    }
    const excessPunct = (optimized.match(/([!?.]){2,}/g) || []).length;
    if (excessPunct > 0) {
      optimized = optimized.replace(/([!?])\1+/g, "$1");
      changes.push({ rule: "Remove repeated punctuation", category: "Structure", savings: excessPunct });
    }
    return { text: optimized, changes };
  }

  // ═══════════════════════════════════════════════
  // CATEGORY 5: Smart Suggestions (context-aware)
  // ═══════════════════════════════════════════════
  function getSmartSuggestions(text) {
    const suggestions = [];
    const words = text.split(/\s+/).length;

    const codeBlocks = text.match(/```[\s\S]*?```/g) || [];
    if (codeBlocks.length >= 3) {
      suggestions.push({ type: "warning", title: "Multiple code blocks detected", description: `${codeBlocks.length} code blocks found. Keep 1-2 representative examples. Models generalize from fewer examples.`, potentialSavings: "10-20%", category: "Examples" });
    }
    if (words > 500) {
      suggestions.push({ type: "warning", title: "Long prompt detected", description: "Prompts over 500 words often have redundant context. Use structured format (headers, bullets) for conciseness.", potentialSavings: "15-30%", category: "Length" });
    }
    const sentences = text.split(/[.!?]+/).map(s => s.trim().toLowerCase()).filter(s => s.length > 20);
    const sentenceSet = new Set();
    let duplicates = 0;
    sentences.forEach(s => { if (sentenceSet.has(s)) duplicates++; sentenceSet.add(s); });
    if (duplicates > 0) {
      suggestions.push({ type: "error", title: `${duplicates} duplicate sentence(s) found`, description: "Remove repeated sentences — they waste tokens.", potentialSavings: `${Math.round((duplicates / sentences.length) * 100)}%`, category: "Redundancy" });
    }
    const bulletPoints = (text.match(/^[\s]*[-*•]\s/gm) || []).length;
    const lines = text.split("\n").filter(l => l.trim().length > 0).length;
    if (lines > 10 && bulletPoints < 2) {
      suggestions.push({ type: "tip", title: "Consider structured format", description: "Convert prose instructions to bullet points or numbered lists — typically saves 15-25% tokens.", potentialSavings: "15-25%", category: "Format" });
    }
    if (/you are|act as|pretend to be|imagine you/i.test(text) && words > 100) {
      suggestions.push({ type: "tip", title: "Simplify role assignment", description: 'Use "Role: Senior engineer. Specialty: ..." instead of verbose role-play setups.', potentialSavings: "5-10%", category: "Prompt Pattern" });
    }
    const constraintWords = (text.match(/\b(must|should|always|never|don't|do not|make sure|ensure|important|remember|note that)\b/gi) || []).length;
    if (constraintWords > 8) {
      suggestions.push({ type: "tip", title: "Too many constraints", description: `${constraintWords} constraint keywords found. Group related constraints; AI follows concise rules better.`, potentialSavings: "5-15%", category: "Constraints" });
    }

    // Image-specific suggestions
    if (/\b(generate|create|draw|design|make)\b.{0,20}\b(image|picture|illustration|photo|artwork|logo)\b/i.test(text)) {
      suggestions.push({ type: "tip", title: "Image prompt detected", description: "For image gen: use comma-separated keywords instead of full sentences. 'cyberpunk cityscape, neon rain, 4K, cinematic' works better than describing a scene in prose.", potentialSavings: "30-50%", category: "Image Gen" });
    }
    // Video-specific suggestions
    if (/\b(generate|create|make)\b.{0,20}\b(video|clip|animation|footage)\b/i.test(text)) {
      suggestions.push({ type: "tip", title: "Video prompt detected", description: "For video gen (Sora, Veo, Runway): focus on scene, motion, and style keywords. Remove narrative. Each second costs $0.10-0.60.", potentialSavings: "20-40%", category: "Video Gen" });
    }
    // Code-specific suggestions
    if (codeBlocks.length > 0 || /\b(function|class|const|let|var|import|def |return )\b/.test(text)) {
      suggestions.push({ type: "tip", title: "Code context detected", description: "For code tasks: provide only relevant code snippets, not entire files. Use function signatures instead of full implementations when asking for refactoring.", potentialSavings: "20-40%", category: "Code" });
    }

    return suggestions;
  }

  // ═══════════════════════════════════════════════
  // MAIN OPTIMIZE FUNCTION
  // ═══════════════════════════════════════════════
  function optimize(text) {
    if (!text || text.trim().length === 0) {
      return { original: text, optimized: text, changes: [], suggestions: [], stats: null };
    }
    let optimized = text;
    const changes = [];

    VERBOSE_PHRASES.forEach(({ find, replace, rule }) => {
      const matches = optimized.match(find);
      if (matches) {
        matches.forEach(match => {
          changes.push({ category: "Verbose Phrases", rule, original: match, replacement: replace || "(removed)", savings: Math.round((match.length - (replace || "").length) / 4) });
        });
        optimized = optimized.replace(find, replace);
      }
    });

    FILLER_WORDS.forEach(filler => {
      const regex = new RegExp(`\\b${filler}\\b[,]?\\s*`, "gi");
      const matches = optimized.match(regex);
      if (matches) {
        matches.forEach(match => {
          changes.push({ category: "Filler Words", rule: `Remove filler: "${filler}"`, original: match.trim(), replacement: "(removed)", savings: Math.round(match.length / 4) });
        });
        optimized = optimized.replace(regex, "");
      }
    });

    PROMPT_PATTERNS.forEach(({ find, replace, rule }) => {
      const matches = optimized.match(find);
      if (matches) {
        matches.forEach(match => {
          const replaced = match.replace(find, replace);
          changes.push({ category: "Prompt Patterns", rule, original: match, replacement: replaced, savings: Math.round((match.length - replaced.length) / 4) });
        });
        optimized = optimized.replace(find, replace);
      }
    });

    const structResult = optimizeStructure(optimized);
    optimized = structResult.text;
    structResult.changes.forEach(c => changes.push(c));

    optimized = optimized.replace(/ {2,}/g, " ");

    const suggestions = getSmartSuggestions(text);
    const originalTokens = Tokenizer.countTokens(text, "o200k");
    const optimizedTokens = Tokenizer.countTokens(optimized, "o200k");
    const tokensSaved = originalTokens - optimizedTokens;
    const percentSaved = originalTokens > 0 ? ((tokensSaved / originalTokens) * 100).toFixed(1) : 0;

    return {
      original: text,
      optimized: optimized.trim(),
      changes,
      suggestions,
      stats: { originalTokens, optimizedTokens, tokensSaved, percentSaved: parseFloat(percentSaved) },
    };
  }

  // ═══════════════════════════════════════════════
  // MODEL RECOMMENDATION ENGINE
  // ═══════════════════════════════════════════════
  function recommendModels(text, taskType = "general") {
    const tokens = Tokenizer.countTokens(text, "o200k");
    const results = [];

    for (const [id, model] of Object.entries(AI_MODELS)) {
      // Only include token-priced models in cost comparison
      if (model.inputPrice === undefined || model.outputPrice === undefined) continue;
      if (model.contextWindow && tokens > model.contextWindow) continue;

      const inputCost = (tokens / 1_000_000) * model.inputPrice;
      const outputMultiplier = taskType === "classification" ? 0.1 : taskType === "code" ? 2.0 : 1.5;
      const estOutputTokens = Math.round(tokens * outputMultiplier);
      const outputCost = (estOutputTokens / 1_000_000) * model.outputPrice;
      const totalCost = inputCost + outputCost;

      results.push({ id, ...model, tokens, inputCost, outputCost, totalCost, estOutputTokens });
    }
    results.sort((a, b) => a.totalCost - b.totalCost);

    return {
      cheapest: results.slice(0, 5),
      flagship: results.filter(r => r.category === "flagship").slice(0, 5),
      bestValue: results.filter(r => r.category === "flagship")[0] || results[0],
      all: results,
    };
  }

  // ═══════════════════════════════════════════════
  // COMPREHENSIVE MULTI-MODALITY STYLE GUIDE
  // ═══════════════════════════════════════════════
  const STYLE_GUIDE = {
    name: "TOTman Prompt Style Guide",
    version: "2.0",
    categories: [
      {
        name: "🔤 Text — Be Direct",
        rules: [
          "Remove preambles: 'I would like you to' → just state the instruction.",
          "Replace 'Could you please' with direct verbs or 'Please'.",
          "Don't narrate your request. Say what you need, not what you're thinking.",
          "Use labels: Role:, Task:, Context:, Output:, Constraints: — saves 15-25%.",
        ],
      },
      {
        name: "🔤 Text — Cut Filler & Redundancy",
        rules: [
          "Remove: basically, essentially, actually, literally, really, very, just, simply.",
          "Remove hedging: perhaps, maybe, somewhat, kind of — be decisive in instructions.",
          "'in order to' → 'to' | 'due to the fact that' → 'because' | 'at this point in time' → 'now'.",
          "Remove 'as mentioned earlier' — the model already sees your full context.",
          "Remove duplicate sentences. Each repeated sentence wastes 100% of its tokens.",
        ],
      },
      {
        name: "💻 Code — Context Optimization",
        rules: [
          "Send only relevant code snippets, not entire files. A 500-line file = ~2000 tokens wasted.",
          "Use function signatures + docstrings instead of full implementations when asking for refactoring.",
          "For Copilot/Cursor: keep open files relevant. Each open tab adds to context window cost.",
          "Specify language and framework upfront: 'Python 3.12, FastAPI' saves the model from guessing.",
          "For code reviews: send the diff, not the full file. Diffs are 60-80% smaller.",
          "Use .cursorignore / .copilotignore to exclude node_modules, build dirs, generated files.",
        ],
      },
      {
        name: "🎨 Image Generation — Keyword Economy",
        rules: [
          "Use comma-separated keywords, not full sentences: 'cyberpunk city, neon rain, 4K, cinematic lighting'.",
          "Front-load the subject. Modifiers after: 'red sports car, sunset highway, motion blur, photorealistic'.",
          "DALL·E 3: standard quality at 1024×1024 ($0.04) is 3x cheaper than HD at 1792×1024 ($0.12).",
          "Midjourney: prompts under 60 words work best. Longer ≠ better for image models.",
          "Stable Diffusion: use negative prompts to exclude, not describe. 'no blur, no text' not 'make it sharp and without text'.",
          "Batch similar images in one session — avoids re-establishing style context.",
          "Self-host open models (FLUX, SD 3.5) for unlimited free generations.",
        ],
      },
      {
        name: "🎬 Video Generation — Cost Per Second",
        rules: [
          "Sora 2: ~$0.10/sec base → a 10-sec clip = $1.00. Keep clips short, iterate.",
          "Veo 2: $0.15-0.60/sec. Use standard tier first, upgrade only final renders.",
          "Runway Gen-3: credit-based — use 'relaxed rate' on Unlimited plan for non-urgent work (free).",
          "Describe the scene, motion, and camera in 1-2 sentences. Prose wastes tokens and confuses the model.",
          "Specify duration (e.g., '5 seconds') to avoid generating more than needed.",
          "Use image-to-video instead of text-to-video when possible — more control, fewer iterations.",
        ],
      },
      {
        name: "🎙️ Audio & Speech — Character Economy",
        rules: [
          "OpenAI TTS: $15/1M chars (standard) vs $30/1M (HD). Use standard for drafts.",
          "ElevenLabs: chars are the currency. Remove filler words, shorten sentences, cut pauses.",
          "Whisper STT: $0.006/min. Pre-trim silence from audio files before transcription.",
          "Gemini audio input: 3x more expensive than text. Transcribe audio → send text when possible.",
          "For long narrations: script editing saves more money than any technical optimization.",
          "Use SSML tags (pauses, emphasis) instead of typing '...' or 'EMPHASIS' in scripts.",
        ],
      },
      {
        name: "🤖 Agentic AI — Loop Cost Control",
        rules: [
          "Every tool call = more tokens. Design agent workflows with minimal tool-call chains.",
          "Claude Computer Use: each screenshot = ~1000 tokens. Reduce screenshot frequency.",
          "Cache system prompts. Anthropic prompt caching saves up to 90% on repeated system content.",
          "Use batch APIs (50% discount on Anthropic) for non-real-time agent tasks.",
          "Set max_tokens and stop sequences to prevent runaway token usage.",
          "For multi-step agents: summarize intermediate results instead of passing raw output forward.",
        ],
      },
      {
        name: "🛠️ Productivity Tools — Hidden Token Costs",
        rules: [
          "Copilot/Cursor: each completion reads your open files. Close irrelevant tabs to reduce context.",
          "Cursor Pro: 500 fast requests/mo. Optimized prompts = more completions from your quota.",
          "Use .gitignore patterns in AI ignore files to exclude: build/, dist/, node_modules/, *.min.js.",
          "For chat-based coding: paste error messages + relevant code only, not full stack traces.",
          "Gemini Code Assist: workspace indexing costs tokens. Keep workspace lean.",
          "All tools: prefer explicit instructions over open-ended 'improve this code' requests.",
        ],
      },
      {
        name: "💰 Cross-Model Cost Strategies",
        rules: [
          "Use efficient models (GPT-4.1 Nano, Gemini 2.0 Flash, Claude 3 Haiku) for simple tasks.",
          "Reserve flagship models for complex reasoning, creative writing, nuanced analysis.",
          "DeepSeek V3 ($0.27/$1.10) and Llama 4 Scout ($0.18/$0.50) are best value for general tasks.",
          "For classification/extraction: efficient models at 1/10th the cost perform equally well.",
          "Use prompt caching (Anthropic, Google) for apps that send the same system prompt repeatedly.",
          "Batch API (Anthropic, OpenAI) gives 50% off for async workloads.",
          "Track your spend: $1 of tokens on Claude Opus 4 = same work as $0.05 on Gemini 2.0 Flash for simple tasks.",
          "Open-source self-hosting (Llama, Mistral, FLUX, SD) = $0 marginal cost after hardware.",
        ],
      },
    ],
  };

  return {
    optimize,
    recommendModels,
    getSmartSuggestions,
    STYLE_GUIDE,
    VERBOSE_PHRASES,
    FILLER_WORDS,
    PROMPT_PATTERNS,
  };
})();

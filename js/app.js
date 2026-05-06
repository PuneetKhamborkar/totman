/**
 * TOTman — Token Optimization Tool
 * Main Application Controller
 */

const App = (() => {
  let debounceTimer = null;
  let currentResults = null;
  let selectedTab = "optimize";
  let theme = "dark";

  function init() {
    bindEvents();
    updateStats();
    renderModelGrid();
    renderStyleGuide();
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("tot-theme");
    if (savedTheme) setTheme(savedTheme);
  }

  function bindEvents() {
    const input = document.getElementById("prompt-input");
    input.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => analyze(), 150);
    });

    document.getElementById("btn-optimize").addEventListener("click", applyOptimization);
    document.getElementById("btn-copy").addEventListener("click", copyOptimized);
    document.getElementById("btn-clear").addEventListener("click", clearAll);
    document.getElementById("btn-paste").addEventListener("click", pasteFromClipboard);
    document.getElementById("btn-theme").addEventListener("click", toggleTheme);

    // Tab switching
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });

    // Trigger initial analysis if there's placeholder text
    if (input.value.trim().length > 0) analyze();
  }

  // ─────────────────────────────────────────────
  // Core Analysis
  // ─────────────────────────────────────────────
  function analyze() {
    const text = document.getElementById("prompt-input").value;
    if (!text.trim()) {
      clearResults();
      updateStats();
      return;
    }

    // Get optimization results
    currentResults = Optimizer.optimize(text);

    // Get model recommendations
    const recommendations = Optimizer.recommendModels(
      currentResults.optimized || text
    );

    // Update UI
    updateStats(text);
    renderOptimizationPreview(currentResults);
    renderChanges(currentResults.changes);
    renderSuggestions(currentResults.suggestions);
    renderCostComparison(recommendations);
    renderSavingsBadge(currentResults.stats);

    // Animate the savings counter
    animateSavings(currentResults.stats);
  }

  function updateStats(text) {
    const el = (id) => document.getElementById(id);
    if (!text || !text.trim()) {
      el("stat-tokens").textContent = "0";
      el("stat-words").textContent = "0";
      el("stat-chars").textContent = "0";
      el("stat-cost").textContent = "$0.00";
      return;
    }
    const stats = Tokenizer.getTextStats(text);
    const tokens = Tokenizer.countTokens(text, "o200k");
    // Show cost for GPT-4o as reference
    const cost = (tokens / 1_000_000) * 2.5;
    el("stat-tokens").textContent = tokens.toLocaleString();
    el("stat-words").textContent = stats.words.toLocaleString();
    el("stat-chars").textContent = stats.characters.toLocaleString();
    el("stat-cost").textContent = `$${cost.toFixed(4)}`;
  }

  // ─────────────────────────────────────────────
  // Optimization Preview
  // ─────────────────────────────────────────────
  function renderOptimizationPreview(results) {
    const container = document.getElementById("optimized-preview");
    if (!results || !results.optimized) {
      container.innerHTML = '<p class="empty-state">Paste a prompt to see optimizations</p>';
      return;
    }
    container.innerHTML = `<pre class="optimized-text">${escapeHtml(results.optimized)}</pre>`;
  }

  function renderChanges(changes) {
    const container = document.getElementById("changes-list");
    if (!changes || changes.length === 0) {
      container.innerHTML = '<p class="empty-state">No optimizations found — your prompt is already lean! 🎯</p>';
      return;
    }

    // Group by category
    const grouped = {};
    changes.forEach(c => {
      if (!grouped[c.category]) grouped[c.category] = [];
      grouped[c.category].push(c);
    });

    let html = "";
    for (const [category, items] of Object.entries(grouped)) {
      const totalSavings = items.reduce((sum, i) => sum + (i.savings || 0), 0);
      html += `
        <div class="change-group">
          <div class="change-group-header">
            <span class="change-category">${category}</span>
            <span class="change-savings">~${totalSavings} tokens saved</span>
          </div>
          <div class="change-items">
            ${items.map(item => `
              <div class="change-item">
                <span class="change-rule">${item.rule}</span>
                <div class="change-diff">
                  <span class="diff-old">${escapeHtml(item.original || "")}</span>
                  <span class="diff-arrow">→</span>
                  <span class="diff-new">${escapeHtml(item.replacement || "(removed)")}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }
    container.innerHTML = html;
  }

  function renderSuggestions(suggestions) {
    const container = document.getElementById("suggestions-list");
    if (!suggestions || suggestions.length === 0) {
      container.innerHTML = "";
      return;
    }

    const iconMap = { error: "🔴", warning: "🟡", tip: "🟢" };
    container.innerHTML = suggestions.map(s => `
      <div class="suggestion-card suggestion-${s.type}">
        <div class="suggestion-header">
          <span class="suggestion-icon">${iconMap[s.type] || "💡"}</span>
          <span class="suggestion-title">${s.title}</span>
          <span class="suggestion-savings">${s.potentialSavings} potential savings</span>
        </div>
        <p class="suggestion-desc">${s.description}</p>
      </div>
    `).join("");
  }

  // ─────────────────────────────────────────────
  // Savings Badge Animation
  // ─────────────────────────────────────────────
  function renderSavingsBadge(stats) {
    const badge = document.getElementById("savings-badge");
    if (!stats || stats.tokensSaved <= 0) {
      badge.classList.remove("visible");
      return;
    }
    badge.classList.add("visible");
    document.getElementById("savings-percent").textContent = stats.percentSaved;
    document.getElementById("savings-tokens").textContent = stats.tokensSaved.toLocaleString();
  }

  function animateSavings(stats) {
    if (!stats || stats.percentSaved <= 0) return;
    const el = document.getElementById("savings-percent");
    let current = 0;
    const target = stats.percentSaved;
    const step = target / 20;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current.toFixed(1);
    }, 25);
  }

  // ─────────────────────────────────────────────
  // Cost Comparison / Model Recommendations
  // ─────────────────────────────────────────────
  function renderCostComparison(recommendations) {
    const container = document.getElementById("cost-comparison");
    if (!recommendations || !recommendations.all.length) {
      container.innerHTML = '<p class="empty-state">Enter a prompt to see cost comparisons</p>';
      return;
    }

    const all = recommendations.all;
    const cheapest = all[0];
    const mostExpensive = all[all.length - 1];

    let html = `
      <div class="recommendation-highlight">
        <div class="rec-card rec-best">
          <div class="rec-label">💰 Cheapest Option</div>
          <div class="rec-model">${cheapest.name}</div>
          <div class="rec-provider">${cheapest.provider}</div>
          <div class="rec-cost">$${cheapest.totalCost.toFixed(6)}</div>
          <div class="rec-detail">${cheapest.tokens.toLocaleString()} input tokens</div>
        </div>
        ${recommendations.bestValue && recommendations.bestValue.id !== cheapest.id ? `
        <div class="rec-card rec-value">
          <div class="rec-label">⚡ Best Value Flagship</div>
          <div class="rec-model">${recommendations.bestValue.name}</div>
          <div class="rec-provider">${recommendations.bestValue.provider}</div>
          <div class="rec-cost">$${recommendations.bestValue.totalCost.toFixed(6)}</div>
          <div class="rec-detail">${recommendations.bestValue.tokens.toLocaleString()} input tokens</div>
        </div>` : ""}
      </div>
      <div class="cost-table-wrap">
        <table class="cost-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Provider</th>
              <th>Type</th>
              <th>Input Cost</th>
              <th>Est. Output</th>
              <th>Est. Total</th>
              <th>Savings vs Max</th>
            </tr>
          </thead>
          <tbody>
            ${all.map(m => {
              const savingsVsMax = mostExpensive.totalCost > 0
                ? (((mostExpensive.totalCost - m.totalCost) / mostExpensive.totalCost) * 100).toFixed(0)
                : 0;
              const colors = PROVIDER_COLORS[m.provider] || { bg: "transparent", text: "#fff" };
              const catMeta = CATEGORY_META[m.category] || { icon: "", label: m.category };
              return `
                <tr>
                  <td><strong>${m.name}</strong></td>
                  <td><span class="provider-badge" style="background:${colors.bg};color:${colors.text}">${m.provider}</span></td>
                  <td><span class="type-badge">${catMeta.icon} ${catMeta.label}</span></td>
                  <td>$${m.inputCost.toFixed(6)}</td>
                  <td>$${m.outputCost.toFixed(6)}</td>
                  <td class="cost-total">$${m.totalCost.toFixed(6)}</td>
                  <td><span class="savings-cell">${savingsVsMax}%</span></td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
    container.innerHTML = html;
  }

  // ─────────────────────────────────────────────
  // Model Grid (Reference)
  // ─────────────────────────────────────────────
  function renderModelGrid() {
    const container = document.getElementById("model-grid");
    if (!container) return;

    const providers = getProviders();
    let html = "";
    providers.forEach(provider => {
      const models = getModelsByProvider(provider);
      const colors = PROVIDER_COLORS[provider] || {};
      html += `
        <div class="provider-section">
          <h3 class="provider-name" style="color:${colors.text || '#fff'}">${provider}</h3>
          <div class="model-cards">
            ${models.map(m => {
              const cat = CATEGORY_META[m.category] || {};
              const hasTokenPricing = m.inputPrice !== undefined && m.outputPrice !== undefined;
              const priceHtml = hasTokenPricing ? `
                <div class="model-card-prices">
                  <div class="price-row"><span>Input</span><span>$${m.inputPrice.toFixed(2)}/1M</span></div>
                  <div class="price-row"><span>Output</span><span>$${m.outputPrice.toFixed(2)}/1M</span></div>
                </div>
              ` : `
                <div class="model-card-prices">
                  <div class="price-row"><span>Pricing</span><span>${formatPricing(m)}</span></div>
                </div>
              `;
              return `
                <div class="model-card" style="border-color:${colors.primary || '#333'}22">
                  <div class="model-card-header">
                    <span class="model-card-name">${m.name}</span>
                    <span class="model-card-type">${cat.icon || ""} ${cat.label || ""}</span>
                  </div>
                  ${priceHtml}
                  ${m.contextWindow ? `<div class="model-card-ctx">Context: ${formatContextWindow(m.contextWindow)}</div>` : ""}
                  ${m.modality ? `<div class="model-card-ctx">Modality: ${m.modality}</div>` : ""}
                  ${m.note ? `<div class="model-card-note">${m.note}</div>` : ""}
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  // ─────────────────────────────────────────────
  // Style Guide Renderer
  // ─────────────────────────────────────────────
  function renderStyleGuide() {
    const container = document.getElementById("style-guide-content");
    if (!container) return;

    const guide = Optimizer.STYLE_GUIDE;
    container.innerHTML = `
      <div class="guide-header">
        <h3>${guide.name}</h3>
        <span class="guide-version">v${guide.version}</span>
      </div>
      ${guide.categories.map(cat => `
        <div class="guide-category">
          <h4>${cat.name}</h4>
          <ul>
            ${cat.rules.map(r => `<li>${r}</li>`).join("")}
          </ul>
        </div>
      `).join("")}
    `;
  }

  // ─────────────────────────────────────────────
  // Actions
  // ─────────────────────────────────────────────
  function applyOptimization() {
    if (!currentResults || !currentResults.optimized) return;
    const input = document.getElementById("prompt-input");
    input.value = currentResults.optimized;
    analyze();
    showToast("Optimizations applied! ✨");
  }

  function copyOptimized() {
    const text = currentResults?.optimized || document.getElementById("prompt-input").value;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => showToast("Copied to clipboard! 📋"));
  }

  function clearAll() {
    document.getElementById("prompt-input").value = "";
    clearResults();
    updateStats();
    showToast("Cleared 🗑️");
  }

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      document.getElementById("prompt-input").value = text;
      analyze();
      showToast("Pasted from clipboard! 📥");
    } catch {
      showToast("Clipboard access denied ❌");
    }
  }

  function clearResults() {
    currentResults = null;
    document.getElementById("optimized-preview").innerHTML = '<p class="empty-state">Paste a prompt to see optimizations</p>';
    document.getElementById("changes-list").innerHTML = "";
    document.getElementById("suggestions-list").innerHTML = "";
    document.getElementById("cost-comparison").innerHTML = '<p class="empty-state">Enter a prompt to see cost comparisons</p>';
    document.getElementById("savings-badge").classList.remove("visible");
  }

  // ─────────────────────────────────────────────
  // Tab Switching
  // ─────────────────────────────────────────────
  function switchTab(tab) {
    selectedTab = tab;
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.toggle("active", p.id === `panel-${tab}`));
  }

  // ─────────────────────────────────────────────
  // Theme
  // ─────────────────────────────────────────────
  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function setTheme(t) {
    theme = t;
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("tot-theme", t);
    const btn = document.getElementById("btn-theme");
    btn.textContent = t === "dark" ? "☀️" : "🌙";
  }

  // ─────────────────────────────────────────────
  // Utilities
  // ─────────────────────────────────────────────
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("visible");
    setTimeout(() => toast.classList.remove("visible"), 2000);
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", App.init);

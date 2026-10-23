/**
 * Yixin Zhang (张益新) — Academic Homepage Interactive Controller
 * Supports:
 * 1. Instant Bilingual Toggle (EN / 中文) with localStorage & URL param support
 * 2. Light / Dark Mode Theme Switcher
 * 3. Canonical BibTeX Modal & One-Click Clipboard Copy
 */

(function () {
  "use strict";

  const BIBTEX_ENTRIES = {
    xie2025cureagent: `@article{xie2025cureagent,
  title     = {CureAgent: A Training-Free Executor-Analyst Framework for Clinical Reasoning},
  author    = {Xie, Ting-Ting and Zhang, Yixin},
  journal   = {arXiv preprint arXiv:2512.05576},
  year      = {2025},
  month     = {dec},
  doi       = {10.48550/arXiv.2512.05576},
  url       = {https://arxiv.org/abs/2512.05576},
  note      = {2nd Place Winner in CURE-Bench Competition Track 2 at NeurIPS 2025}
}`,
    zhang2025selfevolving: `@book{zhang2025selfevolving,
  title     = {Self-Evolving Intelligent Agents (自进化智能体)},
  author    = {Zhang, Yixin},
  publisher = {Publishing House of Electronics Industry (电子工业出版社)},
  year      = {2025},
  isbn      = {978-7-121-51835-5},
  url       = {https://isbnsearch.org/isbn/9787121518355}
}`,
    zhang2026proactive: `@software{zhang2026proactive,
  title     = {Proactive-Turn-Taking-Bench-200: A Full-Duplex Conversational Turn-Taking \\& Interruption Benchmark and State-Machine Evaluation Suite},
  author    = {Zhang, Yixin},
  year      = {2026},
  month     = {oct},
  publisher = {Zenodo},
  version   = {1.0.0},
  doi       = {10.5281/zenodo.23605760},
  url       = {https://doi.org/10.5281/zenodo.23605760}
}`,
    zhang2026robotics: `@software{zhang2026robotics,
  title     = {Embodied Sim2Real Harness: A Four-Layer Root-Cause Attribution \\& Telemetry Evaluation Suite for Humanoid Robotics (Unitree G1)},
  author    = {Zhang, Yixin},
  year      = {2026},
  month     = {oct},
  publisher = {Zenodo},
  version   = {1.0.0},
  doi       = {10.5281/zenodo.23605772},
  url       = {https://doi.org/10.5281/zenodo.23605772}
}`
  };

  const htmlEl = document.documentElement;
  const langToggleBtn = document.getElementById("lang-toggle");
  const langIndicatorText = document.getElementById("lang-indicator-text");
  const themeToggleBtn = document.getElementById("theme-toggle");

  const modalEl = document.getElementById("bibtex-modal");
  const modalCodeEl = document.getElementById("bibtex-modal-code");
  const modalCloseBtn = document.getElementById("modal-close");
  const modalCancelBtn = document.getElementById("modal-cancel-btn");
  const copyBibtexBtn = document.getElementById("copy-bibtex-btn");
  const toastEl = document.getElementById("toast-notification");

  let toastTimeout = null;

  function showToast(msgEn, msgZh) {
    if (!toastEl) return;
    const currentLang = htmlEl.getAttribute("lang") === "zh" ? "zh" : "en";
    toastEl.textContent = currentLang === "zh" ? msgZh : msgEn;
    toastEl.hidden = false;
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.hidden = true;
    }, 2400);
  }

  // -------------------------------------------------------------------------
  // 1. Language Toggle (EN / ZH)
  // -------------------------------------------------------------------------
  function applyLanguage(lang) {
    const normalized = lang === "zh" ? "zh" : "en";
    htmlEl.setAttribute("lang", normalized);
    if (langIndicatorText) {
      langIndicatorText.textContent = normalized === "en" ? "中文" : "EN";
    }
    try {
      localStorage.setItem("yz_academic_lang", normalized);
    } catch (_) {
      // Ignore storage errors in restricted environments
    }
  }

  function initLanguage() {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang === "zh" || urlLang === "en") {
      applyLanguage(urlLang);
      return;
    }
    try {
      const savedLang = localStorage.getItem("yz_academic_lang");
      if (savedLang === "zh" || savedLang === "en") {
        applyLanguage(savedLang);
        return;
      }
    } catch (_) {}
    applyLanguage("en");
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      const current = htmlEl.getAttribute("lang") === "zh" ? "zh" : "en";
      const next = current === "en" ? "zh" : "en";
      applyLanguage(next);
      showToast("Switched to English", "已切换为中文视图");
    });
  }

  // -------------------------------------------------------------------------
  // 2. Theme Toggle (Light / Dark)
  // -------------------------------------------------------------------------
  function applyTheme(theme) {
    const normalized = theme === "dark" ? "dark" : "light";
    htmlEl.setAttribute("data-theme", normalized);
    try {
      localStorage.setItem("yz_academic_theme", normalized);
    } catch (_) {}
  }

  function initTheme() {
    try {
      const savedTheme = localStorage.getItem("yz_academic_theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        applyTheme(savedTheme);
        return;
      }
    } catch (_) {}
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  // -------------------------------------------------------------------------
  // 3. BibTeX Modal & Clipboard
  // -------------------------------------------------------------------------
  function openBibtexModal(key) {
    const entry = BIBTEX_ENTRIES[key] || BIBTEX_ENTRIES.xie2025cureagent;
    if (modalCodeEl) {
      modalCodeEl.textContent = entry;
    }
    if (modalEl) {
      modalEl.hidden = false;
    }
  }

  function closeBibtexModal() {
    if (modalEl) {
      modalEl.hidden = true;
    }
  }

  document.querySelectorAll(".btn-bibtex").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-bibtex-key") || "xie2025cureagent";
      openBibtexModal(key);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeBibtexModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener("click", closeBibtexModal);

  if (modalEl) {
    modalEl.addEventListener("click", (e) => {
      if (e.target === modalEl) {
        closeBibtexModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl && !modalEl.hidden) {
      closeBibtexModal();
    }
  });

  async function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    return true;
  }

  if (copyBibtexBtn && modalCodeEl) {
    copyBibtexBtn.addEventListener("click", async () => {
      try {
        await copyTextToClipboard(modalCodeEl.textContent || "");
        showToast("BibTeX copied to clipboard!", "BibTeX 已复制到剪贴板！");
      } catch (_) {
        showToast("Unable to copy automatically.", "自动复制失败，请手动全选复制。");
      }
    });
  }

  document.querySelectorAll(".copy-inline-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy");
      if (!value) return;
      try {
        await copyTextToClipboard(value);
        showToast(`Copied: ${value}`, `已复制：${value}`);
      } catch (_) {}
    });
  });

  initTheme();
  initLanguage();
})();

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
  url       = {https://orcid.org/0009-0004-7641-4450},
  note      = {ORCID Verified Monograph (Work #231090763) | Publisher: https://www.phei.com.cn/}
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
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (_) {
        // Fall through to textarea + execCommand("copy") in restricted WebViews (e.g. WeChat)
      }
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    let copied = false;
    try {
      textarea.select();
      copied = Boolean(document.execCommand("copy"));
    } finally {
      document.body.removeChild(textarea);
    }
    if (!copied) {
      throw new Error("Clipboard copy rejected");
    }
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

  const turnkeyModalEl = document.getElementById("turnkey-modal");
  const turnkeyModalCodeEl = document.getElementById("turnkey-modal-code");
  const openTurnkeyBriefBtn = document.getElementById("open-turnkey-brief-btn");
  const turnkeyModalCloseBtn = document.getElementById("turnkey-modal-close");
  const turnkeyModalCancelBtn = document.getElementById("turnkey-modal-cancel-btn");
  const copyTurnkeyBriefBtn = document.getElementById("copy-turnkey-brief-btn");
  const copyPartnerCardBtn = document.getElementById("copy-partner-card-btn");

  const TURNKEY_DECISION_BRIEF = {
    zh: `【一页纸会议决策卡｜500万 · 60–90天上市公司具身真机交钥匙联研】
项目总师：张益新 (Yixin Zhang) | ORCID: 0009-0004-7641-4450 | NeurIPS 2025 CURE-Bench 全球亚军 | Google ML GDE

一、一个主决策（15分钟闭门拍板）
是否启动「60–90天客户自有核心部件（电机/减速器/激光雷达/传感器）原位上车 + 双足/四足真机总装 + AgentOS 大脑发布会级闭环联研」（标准总预算 500 万元，按 30% / 40% / 30% 三阶段里程碑硬验收付款）。

二、三个现场填空项
1. [填空 1｜拟上车自有硬件]：[ ] 关节电机/减速器  [ ] 激光雷达/3D视觉  [ ] 六维力/触觉传感器  [ ] 控制器/电池包（T+3日移交2套样件与通信协议起算工期，样件延迟则同日顺延）
2. [填空 2｜整机形态与节点]：[ ] 四足行业级真机 (60天)  [ ] 双足人形真机 (75–90天) | 目标发布会/展会日：2027-__-__
3. [填空 3｜商业与资本结构]：[ ] 模式A：500万委托研发交钥匙合同  [ ] 模式B：联合设立具身智能独立新主体 (SPV/合资公司)

三、500万预算与 60–90天三阶段确定性验收
• M1 (Day 1–25 | 首款 30% = 150万)：自有部件机电接口契约(ICD)冻结 + 动力学辨识 + Isaac/MuJoCo 数字孪生跑通
• M2 (Day 26–60 | 中期 40% = 200万)：工程样机总装点亮 + 自有部件实机闭环驱动 + 五重HIL安全门(Kp/Kd<=35, 15ms急停)台架验收
• M3 (Day 61–90 | 尾款 30% = 150万)：AgentOS全双工语音与自主任务融合 + 72h连续烤机 + 连续10次零故障彩排(pass^10)与独立《验收证据包》移交

四、技术公信力与既有已验证基线（公开可查）
• 顶会与专著：NeurIPS 2025 CURE-Bench Track 2 全球第2名 (arXiv:2512.05576)；《自进化智能体》(ISBN 978-7-121-51835-5)
• 永久开源基准：全双工主动交互 DOI 10.5281/zenodo.23605760；具身 Sim-to-Real 安全门 DOI 10.5281/zenodo.23605772
• 量产与真机基线：8年车规异构工程底盘（量产交付100+台边缘设备），20组宇树 G1 真机轨迹 100% 通过四层无责与五重安全门审计 + 宇树 Go2 5小时长续航实机基线
• 合作直联：zyxcambridge@gmail.com | https://yixinzhangagent.github.io/?lang=zh`,
    en: `[1-Page Executive Decision Card | RMB 5.0M · 60-90 Day Listed-OEM Embodied Turnkey Co-Build]
Lead Architect: Yixin Zhang | ORCID: 0009-0004-7641-4450 | NeurIPS 2025 CURE-Bench 2nd Place | Google ML GDE

1. Primary Executive Decision
Approve the 60-90 day turnkey co-development integrating partner-owned hardware (actuators/reducers, LiDARs, 6-axis force/tactile sensors, or controllers) into a launch-ready quadruped or bipedal robot powered by AgentOS & 5-gate HIL safety harnesses (Standard budget: RMB 5.0M / ~$700K, milestone-gated 30% / 40% / 30%).

2. Three Fill-in-the-Blank Scoping Items
[1] Partner Hardware to Embed: [ ] Joint Motors/Reducers  [ ] LiDAR/3D Vision  [ ] Force/Tactile Sensors  [ ] Controller/Battery (Clock starts upon down payment + 2 engineering samples & ICD docs at T+3d; sample delays extend schedule day-for-day)
[2] Target Form Factor & Date: [ ] Quadruped (60d)  [ ] Bipedal Humanoid (75-90d) | Target Launch/Expo Date: 2027-__-__
[3] Deal & Entity Structure:   [ ] Track A: RMB 5.0M Turnkey R&D Contract  [ ] Track B: Co-Founded Independent Embodied SPV / JV

3. 60-90 Day Deterministic Milestone Schedule
* M1 (Day 1-25 | 30%): Electro-mechanical ICD freeze + system ID + Isaac/MuJoCo digital twin sign-off
* M2 (Day 26-60 | 40%): Physical prototype bring-up + proprietary component closed-loop + 5 HIL safety gates (Kp/Kd<=35, 15ms e-stop)
* M3 (Day 61-90 | 30%): AgentOS full-duplex voice/task fusion + 72h burn-in + pass^10 launch rehearsal & independent Evidence Bundle handoff

4. Verifiable Prior Baseline
* NeurIPS 2025 CURE-Bench Track 2 #2 (arXiv:2512.05576) | Monograph ISBN 978-7-121-51835-5
* Zenodo DOIs: 10.5281/zenodo.23605760 (Full-Duplex TRP) & 10.5281/zenodo.23605772 (Humanoid Sim-to-Real Safety Harness)
* 8+ yrs automotive-grade heterogeneous systems (100+ MEC edge units shipped), 20/20 audited Unitree G1 Sim-to-Real traces (4-layer blameless & 5-gate HIL) + Unitree Go2 5h continuous endurance baseline
* Contact: zyxcambridge@gmail.com | https://yixinzhangagent.github.io/`
  };

  const PARTNER_REFERRAL_CARD = {
    zh: `【具身智能整机联研引荐卡】推荐张益新（NeurIPS 2025全球亚军、Google机器学习专家、8年车规异构与具身真机全建制班底负责人）。针对拥有自有电机/减速器、激光雷达或传感器的制造上市公司，其团队可在500万预算、60~90天内完成“客户自有核心部件原位上车 + 双足/四足真机总装 + AgentOS认知大脑与强化学习运控”交钥匙闭环，支撑新品发布与具身智能第二增长曲线落地（可纯委托研发或合资新主体）。学术与工程背书主页：https://yixinzhangagent.github.io/?lang=zh （邮箱：zyxcambridge@gmail.com）`,
    en: `[Embodied AI Turnkey Co-Build Intro] Introducing Yixin Zhang (NeurIPS 2025 CURE-Bench 2nd Place, Google ML GDE, 8+ yrs automotive-grade heterogeneous & humanoid systems lead). For listed hardware OEMs owning proprietary motors, LiDARs, or sensors, his full-stack team delivers a launch-ready quadruped or bipedal robot embedding the partner's hardware + AgentOS cognitive brain + 5-gate HIL RL locomotion in 60-90 days on a standard RMB 5.0M budget (Turnkey R&D or JV Spin-Off). Verified dossier: https://yixinzhangagent.github.io/ (zyxcambridge@gmail.com)`
  };

  function renderTurnkeyModalContent() {
    if (!turnkeyModalCodeEl) return;
    const currentLang = htmlEl.getAttribute("lang") === "zh" ? "zh" : "en";
    turnkeyModalCodeEl.textContent = TURNKEY_DECISION_BRIEF[currentLang];
  }

  function openTurnkeyModal() {
    renderTurnkeyModalContent();
    if (turnkeyModalEl) {
      turnkeyModalEl.hidden = false;
    }
  }

  function closeTurnkeyModal() {
    if (turnkeyModalEl) {
      turnkeyModalEl.hidden = true;
    }
  }

  if (openTurnkeyBriefBtn) {
    openTurnkeyBriefBtn.addEventListener("click", openTurnkeyModal);
  }
  if (turnkeyModalCloseBtn) {
    turnkeyModalCloseBtn.addEventListener("click", closeTurnkeyModal);
  }
  if (turnkeyModalCancelBtn) {
    turnkeyModalCancelBtn.addEventListener("click", closeTurnkeyModal);
  }
  if (turnkeyModalEl) {
    turnkeyModalEl.addEventListener("click", (e) => {
      if (e.target === turnkeyModalEl) {
        closeTurnkeyModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && turnkeyModalEl && !turnkeyModalEl.hidden) {
      closeTurnkeyModal();
    }
  });

  if (copyTurnkeyBriefBtn && turnkeyModalCodeEl) {
    copyTurnkeyBriefBtn.addEventListener("click", async () => {
      try {
        await copyTextToClipboard(turnkeyModalCodeEl.textContent || "");
        showToast("1-Page Decision Card copied!", "一页纸会议决策卡已复制到剪贴板！");
      } catch (_) {
        showToast("Unable to copy automatically.", "自动复制失败，请手动全选复制。");
      }
    });
  }

  if (copyPartnerCardBtn) {
    copyPartnerCardBtn.addEventListener("click", async () => {
      const currentLang = htmlEl.getAttribute("lang") === "zh" ? "zh" : "en";
      try {
        await copyTextToClipboard(PARTNER_REFERRAL_CARD[currentLang]);
        showToast("Referral card copied to clipboard!", "给上市公司老板/FA的引荐名片已复制！");
      } catch (_) {
        showToast("Unable to copy automatically.", "自动复制失败，请手动复制。");
      }
    });
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      if (turnkeyModalEl && !turnkeyModalEl.hidden) {
        renderTurnkeyModalContent();
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
      } catch (_) {
        showToast("Unable to copy automatically.", "自动复制失败，请手动复制。");
      }
    });
  });

  initTheme();
  initLanguage();
})();

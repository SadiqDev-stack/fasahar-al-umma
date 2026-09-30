/* ============================================================
   Fasahar Al'umma — app.js
   Shared behavior loaded on every page.
   ============================================================

   WHAT THIS FILE OWNS:
   ------------------------------------------------------------
   • Injects the navbar + bottom tab bar on every page
   • Handles the HA / EN language toggle
   • Plays UI sounds (correct, incorrect, tap, unlock, etc.)
   • Registers the service worker
   • Applies translations to any element with data-i18n
   • Runs the scroll-reveal animation
   • Provides small helpers pages can call (APP.t, APP.playSound)

   ICONS:
   ------------------------------------------------------------
   All icons are Font Awesome 6 Free. Every page must load the
   Font Awesome stylesheet in <head>. This file only outputs
   <i class="fa-solid ..."></i> markup — no SVG, no inline paths.
   ============================================================ */

const APP = (() => {

  /* ---------- Sound paths ---------- */
  const SOUNDS = {
    tap: "/audio/tap.mp3",
    correct: "/audio/correct.mp3",
    incorrect: "/audio/incorrect.mp3",
    unlock: "/audio/unlock.mp3",
    success: "/audio/success.mp3",
    levelup: "/audio/levelup.mp3",
    page: "/audio/page.mp3",
    notify: "/audio/notify.mp3",
    offline: "/audio/offline.mp3"
  };

  const audioCache = {};

   /* ---------- 1. PLAY SOUND ---------- */
  let soundLock = 0;

  function playSound(name) {
    if (!STORAGE.getSoundEnabled()) return;
    const src = SOUNDS[name];
    if (!src) return;

    /* Debounce: avoid stacking the same sound within 120ms */
    const now = Date.now();
    if (now - soundLock < 120 && name === "tap") return;
    soundLock = now;

    try {
      if (!audioCache[name]) {
        audioCache[name] = new Audio(src);
        audioCache[name].preload = "auto";
        audioCache[name].volume = 0.6;
      }
      const audio = audioCache[name];
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch (e) {}
  }

  /* ---------- GLOBAL TAP SOUND ----------
     Catches taps on any button, link, card, or element marked as clickable.
     Skips elements that handle their own sound (marked data-no-tap). */
  function wireGlobalTap() {
    const SELECTOR = [
      "button",
      "a",
      "[role='button']",
      "[role='tab']",
      ".module-card",
      ".lesson-row",
      ".option",
      ".opp-card",
      ".tab",
      ".choice"
    ].join(",");

    function handle(e) {
      const el = e.target.closest(SELECTOR);
      if (!el) return;
      if (el.hasAttribute("data-no-tap")) return;
      if (el.disabled) return;
      if (el.closest("#langToggle") || el.closest("#mobileLang") || el.closest("#drawerLang")) return;
      playSound("tap");
    }

    /* pointerdown fires instantly on both touch + mouse */
    document.addEventListener("pointerdown", handle, true);
    /* click as a fallback for older browsers */
    document.addEventListener("click", handle, true);
  }

  /* ---------- 2. TRANSLATION LOOKUP ---------- */
  function t(path) {
    const lang = STORAGE.getLanguage();
    const parts = path.split(".");
    let node = DATA.ui;
    for (const p of parts) {
      if (node === undefined || node === null) return path;
      node = node[p];
    }
    if (typeof node === "object" && node !== null) {
      return node["_" + lang] || node[lang] || path;
    }
    return node;
  }

  /* ---------- 3. APPLY TRANSLATIONS ---------- */
  function applyTranslations() {
    const lang = STORAGE.getLanguage();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const parts = key.split(".");
      let node = DATA.ui;
      for (const p of parts) {
        if (node === undefined || node === null) return;
        node = node[p];
      }
      if (node === undefined || node === null) return;

      let value = null;
      if (typeof node === "object") {
        value = node["_" + lang] || node[lang] || null;
      } else {
        value = node;
      }
      if (value === null) return;

      const attr = el.getAttribute("data-i18n-attr");
      if (attr) el.setAttribute(attr, value);
      else if (value.includes("<")) el.innerHTML = value;
      else el.textContent = value;
    });

    document.documentElement.lang = lang;
  }

  /* ---------- 4. LANGUAGE TOGGLE ---------- */
  function setLanguage(lang) {
    STORAGE.setLanguage(lang);
    applyTranslations();
    updateLangToggleUI();
    document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));

    /* Remove AI widget on language change so it re-injects with the new language */
    const existingFab = document.getElementById("aiFab");
    if (existingFab) existingFab.remove();
    const existingPanel = document.getElementById("aiPanel");
    if (existingPanel) existingPanel.remove();
    const existingBackdrop = document.getElementById("aiBackdrop");
    if (existingBackdrop) existingBackdrop.remove();
    setTimeout(injectAIWidget, 50);
  }

  function updateLangToggleUI() {
    const current = STORAGE.getLanguage();
    document.querySelectorAll(".lang-option").forEach((opt) => {
      opt.classList.toggle("active", opt.dataset.lang === current);
    });
  }

  function wireLangToggle() {
    const toggle = document.getElementById("langToggle");
    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      const target = e.target.closest(".lang-option");
      if (target && target.dataset.lang !== STORAGE.getLanguage()) {
        setLanguage(target.dataset.lang);
        playSound("tap");
      } else {
        setLanguage(STORAGE.getLanguage() === "ha" ? "en" : "ha");
        playSound("tap");
      }
    });

    toggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setLanguage(STORAGE.getLanguage() === "ha" ? "en" : "ha");
      }
    });
  }

  /* ---------- 5. FONT AWESOME ICONS ---------- */
  /* All icons are FA6 Free solid. Every page must load the FA stylesheet. */
  const ICONS = {
    // Bottom tab bar
    home:          '<i class="fa-solid fa-house"></i>',
    modules:       '<i class="fa-solid fa-book-open"></i>',
    opportunities: '<i class="fa-solid fa-hand-holding-heart"></i>',
    profile:       '<i class="fa-solid fa-user"></i>',

    // Status
    check:         '<i class="fa-solid fa-check"></i>',
    xmark:         '<i class="fa-solid fa-xmark"></i>',
    lock:          '<i class="fa-solid fa-lock"></i>',
    complete:      '<i class="fa-solid fa-circle-check"></i>',

    // Actions
    play:          '<i class="fa-solid fa-circle-play"></i>',
    back:          '<i class="fa-solid fa-chevron-left"></i>',
    next:          '<i class="fa-solid fa-chevron-right"></i>',
    external:      '<i class="fa-solid fa-arrow-up-right-from-square"></i>',

    // Module icons
    phone:         '<i class="fa-solid fa-mobile-screen"></i>',
    email:         '<i class="fa-solid fa-envelope"></i>',
    chat:          '<i class="fa-solid fa-comment-dots"></i>',
    safety:        '<i class="fa-solid fa-shield-halved"></i>',
    ai:            '<i class="fa-solid fa-robot"></i>',
    business:      '<i class="fa-solid fa-coins"></i>',

    // Misc
    globe:         '<i class="fa-solid fa-globe"></i>',
    soundOn:       '<i class="fa-solid fa-volume-high"></i>',
    soundOff:      '<i class="fa-solid fa-volume-xmark"></i>',
    award:         '<i class="fa-solid fa-award"></i>',
    wifi:          '<i class="fa-solid fa-wifi"></i>'
  };

  function icon(name) {
    return ICONS[name] || "";
  }

  /* ---------- 6. RENDER NAVBAR ---------- */
  function renderNavbar() {
    const mount = document.getElementById("navbar");
    if (!mount) return;

    const lang = STORAGE.getLanguage();

    mount.outerHTML = `
      <nav class="navbar" role="navigation" aria-label="Main">
        <div class="container navbar-inner">

          <a href="/home.html" class="navbar-brand" aria-label="Fasahar Al'umma home">
            <span class="navbar-logo" aria-hidden="true">F</span>
            <span>Fasahar Al'umma</span>
          </a>

          <div class="navbar-actions">
            <div class="lang-toggle" id="langToggle" role="button" tabindex="0"
                 aria-label="Switch language">
              <span class="lang-option ${lang === "ha" ? "active" : ""}" data-lang="ha">HA</span>
              <span class="lang-option ${lang === "en" ? "active" : ""}" data-lang="en">EN</span>
            </div>
          </div>

        </div>
      </nav>
    `;

    wireLangToggle();
  }

    function renderTabbar() {
    const mount = document.getElementById("tabbar");
    if (!mount) return;

    const path = window.location.pathname;
    const isHome = path.endsWith("home.html") || path === "/" || path === "/index.html";
    const isOpps = path.includes("opportunities.html");
    const isProfile = path.includes("profile.html");
    const isAbout = path.includes("about.html");

    mount.outerHTML = `
      <nav class="tabbar" role="navigation" aria-label="Bottom">
        <a href="/home.html" class="tab ${isHome ? "active" : ""}" data-tab="home">
          ${icon("home")}
          <span>${labelFor("home")}</span>
        </a>
        <a href="/opportunities.html" class="tab ${isOpps ? "active" : ""}" data-tab="opportunities">
          ${icon("opportunities")}
          <span>${labelFor("opportunities")}</span>
        </a>
        <a href="/profile.html" class="tab ${isProfile ? "active" : ""}" data-tab="profile">
          ${icon("profile")}
          <span>${labelFor("profile")}</span>
        </a>
        <a href="/about.html" class="tab ${isAbout ? "active" : ""}" data-tab="about">
          <i class="fa-solid fa-circle-info"></i>
          <span>${labelFor("about")}</span>
        </a>
      </nav>
    `;
  }
  function labelFor(tab) {
    const lang = STORAGE.getLanguage();
    const labels = {
      home: { ha: "Gida", en: "Home" },
      opportunities: { ha: "Dama", en: "Opportunities" },
      profile: { ha: "Bayani", en: "Profile" },
      about: { ha: "Game da Mu", en: "About" }
    };
    return labels[tab][lang];
  }

  /* ---------- 8. TAB TAP HANDLER ---------- */
  function wireTabbar() {
    document.querySelectorAll(".tabbar .tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        playSound("tap");

        if (window.location.pathname.includes("lesson.html")) {
          const params = new URLSearchParams(window.location.search);
          const moduleId = params.get("module");
          const lessonId = params.get("lesson");
          const step = params.get("step") || (window.__currentStep || "watch");

          if (moduleId && lessonId) {
            STORAGE.saveSession(moduleId, lessonId, step);
          }
        }
      });
    });
  }

  /* ---------- 9. SERVICE WORKER ---------- */
  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  }

  /* ---------- 10. SCROLL REVEAL ---------- */
  function initReveal() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  /* ---------- 11. ONLINE / OFFLINE ---------- */
  function wireOnlineOffline() {
    window.addEventListener("offline", () => {
      playSound("offline");
    });
  }

   function init() {
    renderNavbar();
    renderTabbar();
    wireTabbar();
    wireGlobalTap();
    applyTranslations();
    initReveal();
    wireOnlineOffline();
    registerServiceWorker();

    if (STORAGE.isFirstVisit()) STORAGE.markVisited();

    /* Inject the AI assistant on every page that supports it */
    injectAIWidget();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* ============================================================
     AI ASSISTANT — floating button + chat panel
     Injected globally. Hidden on index.html and offline.html.
     ============================================================ */
  const AI_ENDPOINT = "https://fasahar-alumma-server-eosin.vercel.app/api/ai";
  const AI_SECRET = "b7392d8c799d7c0c93c9c8c9f9db4a09e114e21151f5a797961db4fe299a0e3d";

  function shouldShowAI() {
    const path = window.location.pathname;
    if (path.includes("index.html")) return false;
    if (path === "/" || path === "") return false;
    if (path.includes("offline.html")) return false;
    if (path.includes("download-ios.html")) return false;
    return true;
  }

  function injectAIStyles() {
    if (document.getElementById("aiStyles")) return;
    const style = document.createElement("style");
    style.id = "aiStyles";
    style.textContent = `
      .ai-fab {
        position: fixed;
        right: 16px;
        bottom: calc(84px + env(safe-area-inset-bottom, 0px));
        z-index: 200;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--primary, #176b4d);
        color: #fff;
        display: grid;
        place-items: center;
        font-size: 20px;
        box-shadow: 0 10px 28px rgba(23, 107, 77, 0.32);
        cursor: pointer;
        transition: transform 0.15s ease, background 0.2s ease;
        -webkit-tap-highlight-color: transparent;
        border: none;
        padding: 0;
      }
      .ai-fab:hover {
        background: var(--primary-dark, #0f4d38);
        transform: translateY(-2px) scale(1.04);
      }
      .ai-fab:active { transform: scale(0.94); }
      .ai-fab .ai-fab-pulse {
        position: absolute;
        inset: -6px;
        border-radius: 50%;
        border: 2px solid var(--primary, #176b4d);
        opacity: 0;
        animation: aiPulse 2.4s ease-out infinite;
        pointer-events: none;
      }
      @keyframes aiPulse {
        0%   { opacity: 0.6; transform: scale(0.85); }
        100% { opacity: 0;   transform: scale(1.35); }
      }
      @media (min-width: 901px) {
        .ai-fab { bottom: 32px; right: 32px; width: 60px; height: 60px; font-size: 22px; }
      }

      /* Backdrop */
      .ai-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(23, 35, 30, 0.4);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.25s ease, visibility 0.25s ease;
      }
      .ai-backdrop.open { opacity: 1; visibility: visible; }

      /* Panel */
      .ai-panel {
        position: fixed;
        left: 0; right: 0; bottom: 0;
        height: 78dvh;
        max-height: 720px;
        background: #fff;
        border-radius: 24px 24px 0 0;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        transform: translateY(100%);
        transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 -20px 60px rgba(20, 50, 38, 0.22);
        overflow: hidden;
      }
      .ai-panel.open { transform: translateY(0); }
      @media (min-width: 901px) {
        .ai-panel {
          left: auto; right: 32px; bottom: 32px;
          width: 420px; height: 620px;
          border-radius: 24px;
          transform: translateY(20px);
          opacity: 0; visibility: hidden;
          transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
        }
        .ai-panel.open { transform: translateY(0); opacity: 1; visibility: visible; }
      }

      .ai-head {
        display: flex; align-items: center; gap: 12px;
        padding: 16px 18px;
        border-bottom: 1px solid var(--border, #e6ebe7);
        background: #fff;
        flex-shrink: 0;
      }
      .ai-head-icon {
        width: 40px; height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary, #176b4d), var(--primary-dark, #0f4d38));
        color: #fff;
        display: grid; place-items: center;
        font-size: 16px; flex-shrink: 0;
      }
      .ai-head-body { flex: 1; min-width: 0; }
      .ai-head-title {
        font-size: 15px; font-weight: 800;
        color: var(--dark, #17231e);
        letter-spacing: -0.2px; line-height: 1.2;
      }
      .ai-head-sub {
        font-size: 11.5px; color: var(--muted, #68756f);
        font-weight: 600; display: flex; align-items: center;
        gap: 6px; margin-top: 2px;
      }
      .ai-head-sub .dot {
        width: 6px; height: 6px; border-radius: 50%;
        background: var(--primary, #176b4d); flex-shrink: 0;
      }
      .ai-close {
        width: 36px; height: 36px; border-radius: 10px;
        background: var(--soft, #f2f7f3);
        color: var(--dark, #17231e);
        display: grid; place-items: center;
        border: none; cursor: pointer;
        font-size: 14px; transition: background 0.15s;
        flex-shrink: 0;
      }
      .ai-close:hover { background: var(--border, #e6ebe7); }

      .ai-messages {
        flex: 1; overflow-y: auto;
        padding: 18px;
        display: flex; flex-direction: column;
        gap: 12px;
        background: #fafcfb;
      }
      .ai-messages::-webkit-scrollbar { width: 6px; }
      .ai-messages::-webkit-scrollbar-thumb {
        background: var(--border, #e6ebe7); border-radius: 100px;
      }

      .ai-msg {
        max-width: 84%;
        padding: 12px 14px;
        border-radius: 16px;
        font-size: 14px; line-height: 1.55;
        word-wrap: break-word;
        white-space: pre-wrap;
      }
      .ai-msg-user {
        align-self: flex-end;
        background: var(--primary, #176b4d);
        color: #fff;
        border-bottom-right-radius: 4px;
      }
      .ai-msg-ai {
        align-self: flex-start;
        background: #fff;
        color: var(--dark, #17231e);
        border: 1px solid var(--border, #e6ebe7);
        border-bottom-left-radius: 4px;
      }
      .ai-msg-error {
        align-self: center;
        background: #fdf1f1;
        color: #8b2020;
        border: 1px solid #e8b4b4;
        font-size: 12.5px; font-weight: 600;
        padding: 10px 14px; text-align: center;
        max-width: 90%; border-radius: 12px;
      }
      .ai-msg-typing {
        align-self: flex-start;
        background: #fff;
        border: 1px solid var(--border, #e6ebe7);
        border-bottom-left-radius: 4px;
        padding: 14px 18px;
        display: inline-flex; gap: 5px; align-items: center;
      }
      .ai-msg-typing span {
        width: 7px; height: 7px; border-radius: 50%;
        background: var(--muted, #68756f);
        opacity: 0.4;
        animation: aiBounce 1.2s infinite ease-in-out both;
      }
      .ai-msg-typing span:nth-child(2) { animation-delay: 0.15s; }
      .ai-msg-typing span:nth-child(3) { animation-delay: 0.3s; }
      @keyframes aiBounce {
        0%, 80%, 100% { opacity: 0.35; transform: scale(0.9); }
        40% { opacity: 1; transform: scale(1.1); }
      }

      .ai-suggestions {
        display: flex; flex-wrap: wrap;
        gap: 8px; margin-top: 8px;
      }
      .ai-suggestion {
        padding: 8px 14px;
        background: #fff;
        border: 1px solid var(--border, #e6ebe7);
        border-radius: 100px;
        font-size: 12.5px; font-weight: 600;
        color: var(--primary, #176b4d);
        cursor: pointer; transition: all 0.15s;
        font-family: inherit;
      }
      .ai-suggestion:hover {
        border-color: var(--primary, #176b4d);
        background: #e8f3ed;
      }

      .ai-input-wrap {
        padding: 12px 14px calc(12px + env(safe-area-inset-bottom, 0px));
        border-top: 1px solid var(--border, #e6ebe7);
        background: #fff;
        display: flex; gap: 8px; align-items: flex-end;
        flex-shrink: 0;
      }
      .ai-input {
        flex: 1; min-height: 46px; max-height: 120px;
        padding: 12px 14px;
        border: 1.5px solid var(--border, #e6ebe7);
        border-radius: 14px;
        font-size: 15px; font-family: inherit;
        color: var(--dark, #17231e);
        background: #fff; resize: none;
        outline: none; transition: border-color 0.2s;
        line-height: 1.4;
      }
      .ai-input:focus { border-color: var(--primary, #176b4d); }
      .ai-input::placeholder { color: var(--muted, #68756f); }

      .ai-send {
        width: 46px; height: 46px;
        border-radius: 14px;
        background: var(--primary, #176b4d);
        color: #fff; border: none; cursor: pointer;
        display: grid; place-items: center;
        font-size: 15px;
        transition: background 0.15s, transform 0.15s;
        flex-shrink: 0;
      }
      .ai-send:hover:not(:disabled) { background: var(--primary-dark, #0f4d38); }
      .ai-send:active:not(:disabled) { transform: scale(0.95); }
      .ai-send:disabled { opacity: 0.45; cursor: not-allowed; }
    `;
    document.head.appendChild(style);
  }

  function injectAIWidget() {
    if (!shouldShowAI()) return;
    if (document.getElementById("aiFab")) return;

    injectAIStyles();

    const lang = STORAGE.getLanguage();
    const isHa = lang === "ha";

    /* Floating button */
    const fab = document.createElement("button");
    fab.className = "ai-fab";
    fab.id = "aiFab";
    fab.setAttribute("aria-label", isHa ? "Tambaya AI" : "Ask AI");
    fab.innerHTML = '<span class="ai-fab-pulse"></span><i class="fa-solid fa-robot"></i>';
    document.body.appendChild(fab);

    /* Backdrop */
    const backdrop = document.createElement("div");
    backdrop.className = "ai-backdrop";
    backdrop.id = "aiBackdrop";
    document.body.appendChild(backdrop);

    /* Panel */
    const panel = document.createElement("div");
    panel.className = "ai-panel";
    panel.id = "aiPanel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.innerHTML = `
      <div class="ai-head">
        <div class="ai-head-icon"><i class="fa-solid fa-robot"></i></div>
        <div class="ai-head-body">
          <div class="ai-head-title">${isHa ? "Mataimakin AI" : "AI Assistant"}</div>
          <div class="ai-head-sub">
            <span class="dot"></span>
            <span>${isHa ? "Yana amsa tambayoyinka" : "Answers your questions"}</span>
          </div>
        </div>
        <button class="ai-close" id="aiClose" aria-label="${isHa ? "Rufe" : "Close"}">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="ai-messages" id="aiMessages"></div>
      <div class="ai-input-wrap">
        <textarea class="ai-input" id="aiInput"
          placeholder="${isHa ? "Rubuta tambayarka..." : "Ask a question..."}"
          rows="1" maxlength="500"></textarea>
        <button class="ai-send" id="aiSend" disabled aria-label="${isHa ? "Aika" : "Send"}">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    `;
    document.body.appendChild(panel);

    wireAIAssistant({ fab, panel, backdrop, isHa });
  }

  function wireAIAssistant({ fab, panel, backdrop, isHa }) {
    const closeBtn = document.getElementById("aiClose");
    const messagesEl = document.getElementById("aiMessages");
    const inputEl = document.getElementById("aiInput");
    const sendBtn = document.getElementById("aiSend");

    const history = [];
    let sending = false;

    /* Context from URL */
    const context = (() => {
      const params = new URLSearchParams(window.location.search);
      const moduleId = params.get("module");
      const lessonId = params.get("lesson");
      const ctx = {};
      try {
        const mod = DATA.modules.find((m) => m.id === moduleId);
        if (mod) {
          ctx.module = isHa ? mod.title_ha : mod.title_en;
          if (lessonId) {
            const lesson = mod.lessons.find((l) => l.id === lessonId);
            if (lesson) ctx.lesson = isHa ? lesson.title_ha : lesson.title_en;
          }
        }
      } catch (e) {}
      return ctx;
    })();

    /* ---------- Open / close ---------- */
    function open() {
      backdrop.classList.add("open");
      panel.classList.add("open");
      document.body.style.overflow = "hidden";
      if (messagesEl.children.length === 0) renderWelcome();
      setTimeout(() => inputEl.focus(), 200);
    }
    function close() {
      backdrop.classList.remove("open");
      panel.classList.remove("open");
      document.body.style.overflow = "";
    }

    fab.addEventListener("click", () => {
      playSound("tap");
      open();
    });
    closeBtn.addEventListener("click", close);
    backdrop.addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("open")) close();
    });

    /* ---------- Welcome + suggestions ---------- */
    function renderWelcome() {
      const helloText = context.lesson
        ? (isHa
            ? `Sannu! Ni ne mataimakin Fasahar Al'umma. Ina nan don in taimake ka fahimci darasin "${context.lesson}". Tambaye ni komai.`
            : `Hi! I'm the Fasahar Al'umma helper. I'm here to help you understand "${context.lesson}". Ask me anything.`)
        : (isHa
            ? "Sannu! Ni ne mataimakin Fasahar Al'umma. Tambaye ni komai game da fasahar zamani."
            : "Hi! I'm the Fasahar Al'umma helper. Ask me anything about digital skills.");

      appendBubble("ai", helloText);

      const suggestions = isHa
        ? ["Menene wannan darasi ke koya?", "Ka ba ni misali", "Me ya sa yake da muhimmanci?"]
        : ["What does this lesson teach?", "Give me an example", "Why does this matter?"];

      const chips = document.createElement("div");
      chips.className = "ai-suggestions";
      suggestions.forEach((text) => {
        const chip = document.createElement("button");
        chip.className = "ai-suggestion";
        chip.textContent = text;
        chip.addEventListener("click", () => {
          inputEl.value = text;
          updateSendState();
          send();
        });
        chips.appendChild(chip);
      });
      messagesEl.appendChild(chips);
      scrollBottom();
    }

    function appendBubble(role, text, isError) {
      const el = document.createElement("div");
      el.className = "ai-msg " + (isError ? "ai-msg-error" : (role === "user" ? "ai-msg-user" : "ai-msg-ai"));
      el.textContent = text;
      messagesEl.appendChild(el);
      scrollBottom();
      return el;
    }

    function appendTyping() {
      const el = document.createElement("div");
      el.className = "ai-msg-typing";
      el.innerHTML = "<span></span><span></span><span></span>";
      messagesEl.appendChild(el);
      scrollBottom();
      return el;
    }

    function scrollBottom() {
      requestAnimationFrame(() => {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      });
    }

    /* ---------- Input handling ---------- */
    function updateSendState() {
      sendBtn.disabled = sending || inputEl.value.trim().length === 0;
    }
    inputEl.addEventListener("input", () => {
      inputEl.style.height = "auto";
      inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + "px";
      updateSendState();
    });
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    });
    sendBtn.addEventListener("click", send);

    /* ---------- Send ---------- */
    async function send() {
      const text = inputEl.value.trim();
      if (!text || sending) return;

      sending = true;
      updateSendState();

      /* Clear suggestion chips on first user message */
      const chips = messagesEl.querySelector(".ai-suggestions");
      if (chips) chips.remove();

      appendBubble("user", text);
      history.push({ role: "user", content: text });

      inputEl.value = "";
      inputEl.style.height = "auto";

      const typing = appendTyping();
      playSound("tap");

      try {
        const res = await fetch(AI_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Fasahar-Auth": AI_SECRET
          },
          body: JSON.stringify({
            messages: history.slice(-10),
            context
          })
        });

        typing.remove();

        if (!res.ok) {
          if (res.status === 401) {
            appendBubble("ai", isHa
              ? "An kasa tabbatar da ni. Sake gwadawa daga baya."
              : "Could not verify. Try again later.", true);
          } else {
            appendBubble("ai", isHa
              ? "An sami matsala. Sake gwadawa."
              : "Something went wrong. Try again.", true);
          }
          playSound("incorrect");
          return;
        }

        const data = await res.json();
        const reply = (data && data.reply) ? data.reply : "";

        if (!reply) {
          appendBubble("ai", isHa
            ? "Ba ni da amsa a yanzu. Sake tambaya."
            : "No answer right now. Try again.", true);
          playSound("incorrect");
          return;
        }

        appendBubble("ai", reply);
        history.push({ role: "assistant", content: reply });
        playSound("notify");
      } catch (err) {
        typing.remove();
        appendBubble("ai", isHa
          ? "Ba a haɗa ka da intanet ba. Duba haɗin ka."
          : "You're not connected. Check your internet.", true);
        playSound("offline");
      } finally {
        sending = false;
        updateSendState();
      }
    }
  }

  /* ---------- PUBLIC API ---------- */
  return {
    playSound,
    applyTranslations,
    setLanguage,
    getLanguage: STORAGE.getLanguage,
    icon,
    t
  };
  
})();

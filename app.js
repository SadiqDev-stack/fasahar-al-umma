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
  function playSound(name) {
    if (!STORAGE.getSoundEnabled()) return;
    const src = SOUNDS[name];
    if (!src) return;

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

  /* ---------- 7. RENDER BOTTOM TAB BAR ---------- */
  function renderTabbar() {
    const mount = document.getElementById("tabbar");
    if (!mount) return;

    const path = window.location.pathname;
    const isHome = path.endsWith("home.html") || path === "/";
    const isModule = path.includes("module.html") || path.includes("lesson.html") || path.includes("exam.html");
    const isOpps = path.includes("opportunities.html");
    const isProfile = path.includes("profile.html");

    mount.outerHTML = `
      <nav class="tabbar" role="navigation" aria-label="Bottom">
        <a href="/home.html" class="tab ${isHome ? "active" : ""}" data-tab="home">
          ${icon("home")}
          <span>${labelFor("home")}</span>
        </a>
        <a href="/home.html#modules" class="tab ${isModule ? "active" : ""}" data-tab="modules">
          ${icon("modules")}
          <span>${labelFor("modules")}</span>
        </a>
        <a href="/opportunities.html" class="tab ${isOpps ? "active" : ""}" data-tab="opportunities">
          ${icon("opportunities")}
          <span>${labelFor("opportunities")}</span>
        </a>
        <a href="/profile.html" class="tab ${isProfile ? "active" : ""}" data-tab="profile">
          ${icon("profile")}
          <span>${labelFor("profile")}</span>
        </a>
      </nav>
    `;
  }

  function labelFor(tab) {
    const lang = STORAGE.getLanguage();
    const labels = {
      home: { ha: "Gida", en: "Home" },
      modules: { ha: "Darussa", en: "Modules" },
      opportunities: { ha: "Dama", en: "Opportunities" },
      profile: { ha: "Bayani", en: "Profile" }
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

  /* ---------- 12. INIT ---------- */
  function init() {
    renderNavbar();
    renderTabbar();
    wireTabbar();
    applyTranslations();
    initReveal();
    wireOnlineOffline();
    registerServiceWorker();

    if (STORAGE.isFirstVisit()) STORAGE.markVisited();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
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

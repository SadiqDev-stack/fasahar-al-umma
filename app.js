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

   HOW TO USE ON A PAGE:
   ------------------------------------------------------------
   1. Include this script last, after data.js and storage.js.
   2. In the HTML add: <div id="navbar"></div> and <div id="tabbar"></div>
      at the top of <body> — the script fills them in.
   3. Anywhere on the page, add data-i18n="ui.buttons.start_ha"
      and the correct translation appears automatically.
   4. Call APP.playSound("correct") to play a sound.
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

  /* Cache audio instances so we don't re-fetch */
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
      audio.play().catch(() => {
        /* Browsers block autoplay until first user gesture — ignore */
      });
    } catch (e) {
      /* Silent fail — sound is a nice-to-have */
    }
  }

  /* ---------- 2. TRANSLATION LOOKUP ---------- */
  /* Returns the string for a ui key based on the current language.
     Example: APP.t("buttons.start") returns either ui.buttons.start_ha
     or ui.buttons.start_en automatically. */
  function t(path) {
    const lang = STORAGE.getLanguage();
    const parts = path.split(".");
    let node = DATA.ui;

    for (const part of parts) {
      if (node[part] === undefined) node = null;
      else node = node[part];
      if (node === null) break;
    }

    if (node === null) {
      return path;
    }

    /* If we landed on an object with _ha / _en keys, pick the right one */
    if (typeof node === "object") {
      const key = lang === "ha" ? "_ha" : "_en";
      if (node[part + key]) return node[part + key];
      if (node["_" + lang]) return node["_" + lang];
      /* Fallback: try to find a matching key */
      return node[lang] || Object.values(node)[0] || path;
    }

    return node;
  }

  /* ---------- 3. APPLY TRANSLATIONS ---------- */
  /* Walks the page and replaces textContent for every data-i18n element.
     Supports two forms:
       data-i18n="ui.buttons.start"        → reads DATA.ui.buttons.start_ha / _en
       data-i18n-attr="placeholder"        → sets an attribute instead of text */
  function applyTranslations() {
    const lang = STORAGE.getLanguage();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = resolveKey(key, lang);

      if (value === null) return;

      const attr = el.getAttribute("data-i18n-attr");
      if (attr) {
        el.setAttribute(attr, value);
      } else if (value.includes("<")) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    /* Update html lang attribute */
    document.documentElement.lang = lang;
  }

  /* Resolve a dotted key like "ui.buttons.start" to the right language string */
  function resolveKey(path, lang) {
    const parts = path.split(".");
    let node = DATA;

    for (const part of parts) {
      if (node === undefined || node === null) return null;
      node = node[part];
    }

    /* node is now the final object like { start_ha: "...", start_en: "..." } */
    if (typeof node === "object" && node !== null) {
      if (node[part_last(parts) + "_" + lang]) return node[part_last(parts) + "_" + lang];
      if (node["_" + lang] !== undefined) return node["_" + lang];
      if (node[lang] !== undefined) return node[lang];
      return null;
    }

    return node;
  }

  function part_last(arr) { return arr[arr.length - 1]; }

  /* ---------- 4. LANGUAGE TOGGLE ---------- */
  function setLanguage(lang) {
    STORAGE.setLanguage(lang);
    applyTranslations();
    updateLangToggleUI();
    /* Let the current page know language changed */
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
        const next = STORAGE.getLanguage() === "ha" ? "en" : "ha";
        setLanguage(next);
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

  /* ---------- 5. RENDER NAVBAR ---------- */
  function renderNavbar() {
    const mount = document.getElementById("navbar");
    if (!mount) return;

    const lang = STORAGE.getLanguage();
    const progress = STORAGE.getOverallProgress();

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

  /* ---------- 6. RENDER BOTTOM TAB BAR ---------- */
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

  function icon(name) {
    const icons = {
      home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
      modules: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="16" width="18" height="4" rx="1"/></svg>',
      opportunities: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
      profile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>'
    };
    return icons[name] || "";
  }

  /* ---------- 7. TAB TAP HANDLER ---------- */
  /* When user taps a tab from inside a lesson or exam, we save the session
     first so they can resume from Home. */
  function wireTabbar() {
    document.querySelectorAll(".tabbar .tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        playSound("tap");

        /* If we're on lesson.html, save the current step before leaving */
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

  /* ---------- 8. SERVICE WORKER ---------- */
  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* Silent fail — offline still works after first successful registration */
      });
    });
  }

  /* ---------- 9. SCROLL REVEAL ---------- */
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

  /* ---------- 10. ONLINE / OFFLINE ---------- */
  function wireOnlineOffline() {
    window.addEventListener("offline", () => {
      playSound("offline");
    });
  }

  /* ---------- 11. INIT ---------- */
  function init() {
    /* Inject shared chrome */
    renderNavbar();
    renderTabbar();

    /* Wire behavior */
    wireTabbar();
    applyTranslations();
    initReveal();
    wireOnlineOffline();
    registerServiceWorker();

    /* Mark first visit */
    if (STORAGE.isFirstVisit()) {
      STORAGE.markVisited();
    }
  }

  /* Run when DOM is ready */
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
    t: (path) => {
      const lang = STORAGE.getLanguage();
      const parts = path.split(".");
      let node = DATA.ui;
      for (const p of parts) {
        if (node === undefined) return path;
        node = node[p];
      }
      if (typeof node === "object" && node !== null) {
        return node["_" + lang] || node[lang] || path;
      }
      return node;
    }
  };

})();

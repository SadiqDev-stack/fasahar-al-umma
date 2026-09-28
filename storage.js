/* ============================================================
   Fasahar Al'umma — storage.js
   Everything that persists. Language, sound, progress, session.
   ============================================================

   WHAT THIS FILE OWNS:
   ------------------------------------------------------------
   • Language preference (ha / en)
   • Sound on/off preference
   • Which lessons are complete
   • Which module exams are passed
   • Current in-progress session (module + lesson + step)
   • Overall progress percentage

   HOW IT WORKS:
   ------------------------------------------------------------
   All data lives in localStorage under the "fasahar." prefix.
   Every read is safe — returns a sane default if nothing exists.
   Every write is safe — wraps in try/catch for private mode.
   ============================================================ */

const STORAGE = (() => {

  const PREFIX = "fasahar.";

  /* ---------- Safe localStorage wrapper ---------- */
  function get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(PREFIX + key);
    } catch (e) {}
  }

  /* ============================================================
     LANGUAGE
     ============================================================ */

  function getLanguage() {
    const lang = get("language", null);
    if (lang && DATA.meta.supportedLangs.includes(lang)) return lang;
    return DATA.meta.defaultLang;
  }

  function setLanguage(lang) {
    if (!DATA.meta.supportedLangs.includes(lang)) return false;
    return set("language", lang);
  }

  /* ============================================================
     SOUND
     ============================================================ */

  function getSoundEnabled() {
    return get("sound", true) === true;
  }

  function setSoundEnabled(enabled) {
    return set("sound", enabled === true);
  }

  /* ============================================================
     LESSON PROGRESS
     ============================================================ */

  function getCompletedLessons() {
    return get("completedLessons", []) || [];
  }

  function isLessonComplete(lessonId) {
    return getCompletedLessons().includes(lessonId);
  }

  function markLessonComplete(lessonId) {
    const done = getCompletedLessons();
    if (!done.includes(lessonId)) {
      done.push(lessonId);
      set("completedLessons", done);
    }
    return true;
  }

  /* ============================================================
     UNLOCK LOGIC
     A lesson is unlocked if:
       • It is the first lesson of its module, OR
       • The previous lesson in the same module is complete
     ============================================================ */

  function isLessonUnlocked(moduleId, lessonId) {
    const mod = DATA.modules.find((m) => m.id === moduleId);
    if (!mod) return false;

    const idx = mod.lessons.findIndex((l) => l.id === lessonId);
    if (idx === -1) return false;
    if (idx === 0) return true;

    const previous = mod.lessons[idx - 1];
    return isLessonComplete(previous.id);
  }

  /* ============================================================
     MODULE PROGRESS
     ============================================================ */

  function getModuleProgress(moduleId) {
    const mod = DATA.modules.find((m) => m.id === moduleId);
    if (!mod) return { completed: 0, total: 0, percent: 0 };

    const total = mod.lessons.length;
    const completed = mod.lessons.filter((l) => isLessonComplete(l.id)).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { completed, total, percent };
  }

  function isModuleComplete(moduleId) {
    return getModuleProgress(moduleId).percent === 100;
  }

  /* ============================================================
     MODULE EXAMS
     ============================================================ */

  function getPassedExams() {
    return get("passedExams", []) || [];
  }

  function isExamPassed(moduleId) {
    return getPassedExams().includes(moduleId);
  }

  function markExamPassed(moduleId) {
    const passed = getPassedExams();
    if (!passed.includes(moduleId)) {
      passed.push(moduleId);
      set("passedExams", passed);
    }
    return true;
  }

  /* ============================================================
     SESSION (RESUME)
     Saves where the user was when they tapped a bottom tab.
     ============================================================ */

  function saveSession(moduleId, lessonId, step) {
    return set("session", {
      moduleId,
      lessonId,
      step: step || "watch",
      savedAt: Date.now()
    });
  }

  function getSession() {
    const session = get("session", null);
    if (!session) return null;
    if (!session.moduleId || !session.lessonId) return null;

    // Validate the module and lesson still exist
    const mod = DATA.modules.find((m) => m.id === session.moduleId);
    if (!mod) {
      clearSession();
      return null;
    }
    const lesson = mod.lessons.find((l) => l.id === session.lessonId);
    if (!lesson) {
      clearSession();
      return null;
    }

    // If already complete, no need to resume
    if (isLessonComplete(session.lessonId)) {
      clearSession();
      return null;
    }

    return session;
  }

  function clearSession() {
    remove("session");
  }

  /* ============================================================
     OVERALL PROGRESS
     Counts every lesson across every module.
     ============================================================ */

  function getOverallProgress() {
    let total = 0;
    let completed = 0;

    DATA.modules.forEach((mod) => {
      total += mod.lessons.length;
      completed += mod.lessons.filter((l) => isLessonComplete(l.id)).length;
    });

    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, percent };
  }

  /* ============================================================
     OPPORTUNITIES VIEWED (used on the profile screen stats)
     ============================================================ */

  function getViewedOpportunities() {
    return get("viewedOpportunities", []) || [];
  }

  function markOpportunityViewed(opportunityId) {
    const viewed = getViewedOpportunities();
    if (!viewed.includes(opportunityId)) {
      viewed.push(opportunityId);
      set("viewedOpportunities", viewed);
    }
    return true;
  }

  /* ============================================================
     FIRST VISIT FLAG
     Lets the app know if it's the user's first time.
     ============================================================ */

  function isFirstVisit() {
    return get("visited", false) === false;
  }

  function markVisited() {
    return set("visited", true);
  }

  /* ============================================================
     RESET
     Wipes all Fasahar Al'umma data. Does not touch other apps.
     ============================================================ */

  function resetAll() {
    const keys = [
      "language",
      "sound",
      "completedLessons",
      "passedExams",
      "session",
      "viewedOpportunities",
      "visited"
    ];
    keys.forEach((k) => remove(k));
    return true;
  }

  /* ============================================================
     PUBLIC API
     ============================================================ */

  return {
    // Language
    getLanguage,
    setLanguage,

    // Sound
    getSoundEnabled,
    setSoundEnabled,

    // Lessons
    getCompletedLessons,
    isLessonComplete,
    markLessonComplete,
    isLessonUnlocked,

    // Modules
    getModuleProgress,
    isModuleComplete,

    // Exams
    isExamPassed,
    markExamPassed,

    // Session
    saveSession,
    getSession,
    clearSession,

    // Overall
    getOverallProgress,

    // Opportunities
    getViewedOpportunities,
    markOpportunityViewed,

    // First visit
    isFirstVisit,
    markVisited,

    // Reset
    resetAll
  };

})();

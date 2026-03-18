(() => {
  const STORAGE_KEY = "axento_theme";
  const THEMES = { DARK: "dark", LIGHT: "light" };
  const root = document.documentElement;

  function getStoredTheme() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === THEMES.DARK || v === THEMES.LIGHT ? v : null;
    } catch {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }

  function applyTheme(theme, persist = false) {
    const next = theme === THEMES.LIGHT ? THEMES.LIGHT : THEMES.DARK;
    root.setAttribute("data-theme", next);
    if (persist) setStoredTheme(next);

    // update aria + optional icon
    const isLight = next === THEMES.LIGHT;
    document.querySelectorAll("[data-theme-toggle]").forEach((el) => {
      el.setAttribute("aria-checked", String(isLight));
      el.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
      if (el.dataset.themeToggleIcon === "1") el.textContent = isLight ? "☀" : "☾";
    });
  }

  function toggleTheme() {
    const current = root.getAttribute("data-theme") || THEMES.DARK;
    applyTheme(current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK, true);
  }

  // initial theme
  const initial = getStoredTheme() || (window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? THEMES.DARK : THEMES.LIGHT);
  applyTheme(initial, false);

  // one click handler for all toggles
  document.addEventListener("click", (e) => {
    const btn = e.target.closest?.("[data-theme-toggle]");
    if (!btn) return;
    e.preventDefault();
    toggleTheme();
  });

  // keyboard support
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const btn = document.activeElement?.closest?.("[data-theme-toggle]");
    if (!btn) return;
    e.preventDefault();
    toggleTheme();
  });
})();

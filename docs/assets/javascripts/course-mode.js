(function () {
  const STORAGE_KEY = "courseMode";
  const DEFAULT_MODE = "base";

  function getMode() {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "professional" ? "professional" : DEFAULT_MODE;
  }

  function setMode(mode) {
    window.localStorage.setItem(STORAGE_KEY, mode);
    applyMode(mode);
  }

  function applyMode(mode) {
    const current = mode === "professional" ? "professional" : "base";
    document.documentElement.setAttribute("data-course-mode", current);
    document.body.setAttribute("data-course-mode", current);

    document.querySelectorAll(".course-mode-toggle").forEach((button) => {
      button.dataset.mode = current;
      button.setAttribute("aria-pressed", String(current === "professional"));
      button.setAttribute(
        "title",
        current === "professional"
          ? "Modalità attiva: Professional"
          : "Modalità attiva: Base"
      );

      const icon = button.querySelector(".course-mode-toggle__icon");
      const label = button.querySelector(".course-mode-toggle__label");
      if (icon) icon.textContent = current === "professional" ? "P" : "B";
      if (label) label.textContent = current === "professional" ? "PRO" : "BASE";
    });
  }

  function ensureToggle() {
    const headerInner = document.querySelector(".md-header__inner");
    if (!headerInner || headerInner.querySelector(".course-mode-toggle-wrap")) return;

    const wrap = document.createElement("div");
    wrap.className = "course-mode-toggle-wrap";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "course-mode-toggle";
    button.innerHTML = '<span class="course-mode-toggle__icon" aria-hidden="true">B</span><span class="course-mode-toggle__label">BASE</span>';
    button.addEventListener("click", function () {
      const next = getMode() === "base" ? "professional" : "base";
      setMode(next);
    });

    wrap.appendChild(button);
    headerInner.appendChild(wrap);
  }

  function initCourseMode() {
    ensureToggle();
    applyMode(getMode());
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(initCourseMode);
  } else {
    document.addEventListener("DOMContentLoaded", initCourseMode);
  }
})();

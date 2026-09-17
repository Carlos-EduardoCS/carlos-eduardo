"use strict";

(() => {
  const button = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("primary-navigation");
  const header = document.querySelector(".site-header");
  if (!button || !navigation || !header) return;

  const label = button.querySelector(".menu-label");
  const icon = button.querySelector(".menu-icon");
  const wideViewport = window.matchMedia("(min-width: 48rem)");

  function setOpen(open) {
    button.setAttribute("aria-expanded", String(open));
    navigation.hidden = !open;
    label.textContent = open ? "Fechar" : "Menu";
    icon.textContent = open ? "×" : "☰";
  }

  function syncViewport() {
    const focusedElement = document.activeElement;
    if (wideViewport.matches) {
      setOpen(true);
      button.hidden = true;
      if (focusedElement === button) navigation.querySelector("a").focus();
    } else {
      button.hidden = false;
      setOpen(false);
      if (navigation.contains(focusedElement)) button.focus();
    }
  }

  button.addEventListener("click", () => {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  // Preserva a navegacao nativa por ancora, incluindo hash e historico.
  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || wideViewport.matches) return;
    setOpen(false);
    button.focus({ preventScroll: true });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || wideViewport.matches || navigation.hidden) return;
    setOpen(false);
    button.focus({ preventScroll: true });
  });

  document.addEventListener("click", (event) => {
    if (wideViewport.matches || navigation.hidden || header.contains(event.target)) return;
    const focusWasInside = navigation.contains(document.activeElement);
    setOpen(false);
    if (focusWasInside) button.focus({ preventScroll: true });
  });

  wideViewport.addEventListener("change", syncViewport);
  syncViewport();
})();

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.querySelector('.menu-toggle');
  const drawer = document.getElementById('mobileMenu');
  const closeBtn = document.querySelector('.menu-close');
  const overlay = document.querySelector('.menu-overlay');

  function openMenu() {
    drawer.classList.add('open');
    overlay.classList.add('show'); overlay.hidden = false;
    body.classList.add('menu-open');
    toggle?.setAttribute('aria-expanded', 'true');
    drawer?.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('show'); overlay.hidden = true;
    body.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
    drawer?.setAttribute('aria-hidden', 'true');
  }

  toggle?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
});

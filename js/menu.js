// assets/js/menu.js
document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const body = document.body;
  const toggle = document.querySelector('.menu-toggle');
  const drawer = document.getElementById('mobileMenu');
  const closeBtn = document.querySelector('.menu-close');
  const overlay = document.querySelector('.menu-overlay');
  const links = drawer?.querySelectorAll('a') || [];
  let savedScrollY = 0;

  const openMenu = () => {
    savedScrollY = window.scrollY || window.pageYOffset || 0;

    drawer.classList.add('open');
    overlay.classList.add('show'); overlay.hidden = false;

    // robust scroll lock for mobile
    html.classList.add('menu-open');
    body.classList.add('menu-open');
    body.style.position = 'fixed';
    body.style.top = `-${savedScrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';

    toggle?.setAttribute('aria-expanded','true');
    drawer?.setAttribute('aria-hidden','false');
  };

  const closeMenu = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('show'); overlay.hidden = true;

    html.classList.remove('menu-open');
    body.classList.remove('menu-open');
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.width = '';
    window.scrollTo(0, savedScrollY);

    toggle?.setAttribute('aria-expanded','false');
    drawer?.setAttribute('aria-hidden','true');
  };

  toggle?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  links.forEach(a => a.addEventListener('click', closeMenu));
});

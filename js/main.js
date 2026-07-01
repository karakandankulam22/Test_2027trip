// Dark mode toggle (persisted) + mobile nav + active link highlight
(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem('trip-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    const updateIcon = () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (toggle) toggle.textContent = isDark ? '☀️' : '🌙';
    };
    updateIcon();

    if (toggle) {
      toggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('trip-theme', next);
        updateIcon();
      });
    }

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
      navLinks.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => navLinks.classList.remove('open'))
      );
    }

    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      if (a.getAttribute('href') === path) a.classList.add('active');
    });

    const dropdown = document.querySelector('.nav-dropdown');
    const dropToggle = document.querySelector('.nav-drop-toggle');
    if (dropdown && dropToggle) {
      dropToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
      });
      dropdown.querySelectorAll('.nav-drop-menu a').forEach(a => {
        if (a.getAttribute('href') === path) a.classList.add('active');
      });
    }
  });
})();

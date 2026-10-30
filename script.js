/* =========================================================
   JMMP — Juan / Visual Designer
   Interactions: smooth scroll, mouse parallax, mobile menu
========================================================= */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Smooth scroll for in-page links ---------- */
  document.querySelectorAll('[data-scroll]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var targetSel = el.getAttribute('data-target') || el.getAttribute('href');
      if (!targetSel || targetSel.charAt(0) !== '#') return;
      var target = document.querySelector(targetSel);
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  /* ---------- Mobile menu toggle ---------- */
  var burgerBtn = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (burgerBtn) {
    burgerBtn.addEventListener('click', function () {
      var isOpen = burgerBtn.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });

  /* ---------- Mouse parallax on decorative glass shapes ---------- */
  if (!reduceMotion) {
    var groups = [
      { root: document.getElementById('hero'), imgs: document.querySelectorAll('.hero__bg .parallax') },
      { root: document.getElementById('about'), imgs: document.querySelectorAll('.about__bg .parallax') }
    ];

    groups.forEach(function (group) {
      if (!group.root || !group.imgs.length) return;

      var current = { x: 0, y: 0 };
      var target = { x: 0, y: 0 };
      var raf = null;

      group.root.addEventListener('mousemove', function (e) {
        var rect = group.root.getBoundingClientRect();
        var nx = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 .. 0.5
        var ny = (e.clientY - rect.top) / rect.height - 0.5;
        target.x = nx;
        target.y = ny;
        if (!raf) raf = requestAnimationFrame(tick);
      });

      group.root.addEventListener('mouseleave', function () {
        target.x = 0;
        target.y = 0;
        if (!raf) raf = requestAnimationFrame(tick);
      });

      function tick() {
        current.x += (target.x - current.x) * 0.045;
        current.y += (target.y - current.y) * 0.045;

        group.imgs.forEach(function (img) {
          var depth = parseFloat(img.getAttribute('data-depth')) || 12;
          var tx = current.x * depth;
          var ty = current.y * depth;
          img.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
        });

        if (Math.abs(target.x - current.x) > 0.001 || Math.abs(target.y - current.y) > 0.001) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = null;
        }
      }
    });
  }

  /* ---------- Project row hover preview follows the mouse ---------- */
  document.querySelectorAll('.project-row').forEach(function (row) {
    var preview = row.querySelector('.project-row__preview');
    if (!preview) return;
    row.addEventListener('mousemove', function (e) {
      var rect = row.getBoundingClientRect();
      preview.style.left = (e.clientX - rect.left) + 'px';
      preview.style.top = (e.clientY - rect.top) + 'px';
    });
  });

  /* ---------- Scroll reveal for whole section blocks (about / experience / projects) ---------- */
  (function () {
    var blocks = [
      document.querySelector('#about .section-inner'),
      document.querySelector('#experience .section-inner'),
      document.querySelector('#projects .section-inner')
    ].filter(Boolean);

    blocks.forEach(function (el) { el.classList.add('reveal'); });

    if (reduceMotion) {
      blocks.forEach(function (el) { el.classList.add('is-visible'); });
    } else if ('IntersectionObserver' in window && blocks.length) {
      var revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

      blocks.forEach(function (el) { revealObserver.observe(el); });
    } else {
      blocks.forEach(function (el) { el.classList.add('is-visible'); });
    }
  })();

  /* ---------- Active nav link on scroll ---------- */
  var sections = ['about', 'experience', 'projects', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = document.querySelectorAll('.nav__links a');

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.style.opacity = link.getAttribute('href') === '#' + entry.target.id ? '1' : '';
        });
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

})();

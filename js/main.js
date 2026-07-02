/* ============================================================
   BVDLC // TERMINAL PORTFOLIO — interactions
   Vanilla JS, no dependencies. GitHub Pages compatible.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Fake session ID for HUD flavor ---------- */
  var sid = document.getElementById('sessionId');
  if (sid) {
    var n = Math.floor(1000 + Math.random() * 8999);
    sid.textContent = '#' + n + '/24';
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add('header--scrolled');
    else header.classList.remove('header--scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Skill bars fill when in view ---------- */
  var bars = document.querySelectorAll('.skill-bar span[data-pct]');
  if ('IntersectionObserver' in window && bars.length) {
    var bo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.style.width = el.getAttribute('data-pct') + '%';
          bo.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(function (el) { bo.observe(el); });
  } else {
    bars.forEach(function (el) { el.style.width = el.getAttribute('data-pct') + '%'; });
  }

  /* ---------- Active nav link on scroll (in-page anchors) ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navAnchors = navLinks ? navLinks.querySelectorAll('a[href^="#"]') : [];
  if ('IntersectionObserver' in window && sections.length && navAnchors.length) {
    var map = {};
    navAnchors.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) { a.classList.remove('active'); });
          var active = map[entry.target.id];
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { so.observe(s); });
  }

  /* ============================================================
     GALLERY LIGHTBOX (only runs if gallery present)
     ============================================================ */
  var plates = document.querySelectorAll('.plate');
  var modal = document.getElementById('lightbox');
  if (plates.length && modal) {
    var mImg = modal.querySelector('.m-img img');
    var mCap = modal.querySelector('.m-cap');
    var mTitle = modal.querySelector('.m-title');
    var mIndex = modal.querySelector('.m-index');
    var closeBtn = modal.querySelector('.modal-close');
    var prevBtn = modal.querySelector('.modal-nav.prev');
    var nextBtn = modal.querySelector('.modal-nav.next');
    var current = 0;
    var items = Array.prototype.map.call(plates, function (p) {
      return {
        src: p.getAttribute('data-full'),
        title: p.getAttribute('data-title'),
        cap: p.getAttribute('data-cap'),
        id: p.getAttribute('data-id')
      };
    });

    function render(i) {
      var it = items[i];
      mImg.src = it.src;
      mImg.alt = it.title + ' — graphic design poster by Bernardo Vazquez';
      if (mTitle) mTitle.textContent = it.title;
      if (mCap) mCap.textContent = it.cap;
      if (mIndex) mIndex.textContent = 'PLATE ' + (i + 1) + ' / ' + items.length + '  •  ' + it.id;
      current = i;
    }
    function open(i) {
      render(i);
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }
    function close() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    function next() { render((current + 1) % items.length); }
    function prev() { render((current - 1 + items.length) % items.length); }

    plates.forEach(function (p, i) {
      p.addEventListener('click', function () { open(i); });
      p.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    });
  }
})();

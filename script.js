(function () {
  var root = document.getElementById('root');
  var nav = document.getElementById('site-nav');
  if (!root) return;

  // Scroll-reveal
  var els = root.querySelectorAll('[data-reveal]');
  var vh = window.innerHeight || 800;

  els.forEach(function (el, idx) {
    var top = el.getBoundingClientRect().top;
    if (top < vh * 0.9) return; // déjà visible : on laisse
    el.classList.add('reveal-hidden');
    var delay = (idx % 3) * 0.06;
    el.style.transitionDelay = delay + 's';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-hidden');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -7% 0px' });

  els.forEach(function (el) {
    if (el.classList.contains('reveal-hidden')) io.observe(el);
  });

  // Filet de sécurité : tout révéler après 2.2s
  setTimeout(function () {
    els.forEach(function (el) { el.classList.remove('reveal-hidden'); });
  }, 2200);

  // Ombre de la nav au scroll
  if (nav) {
    var onScroll = function () {
      nav.style.boxShadow = window.scrollY > 12
        ? '0 1px 0 var(--line), 0 14px 34px -24px rgba(16,24,45,.45)'
        : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Menu mobile
  var burger = document.getElementById('nav-burger');
  var panel = document.getElementById('mobile-panel');
  var backdrop = document.getElementById('panel-backdrop');
  var panelClose = document.getElementById('panel-close');
  if (burger && panel && backdrop) {
    var openPanel = function () {
      panel.classList.add('is-open');
      backdrop.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    var closePanel = function () {
      panel.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    burger.addEventListener('click', openPanel);
    backdrop.addEventListener('click', closePanel);
    if (panelClose) panelClose.addEventListener('click', closePanel);
    panel.querySelectorAll('[data-panel-link]').forEach(function (a) {
      a.addEventListener('click', closePanel);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePanel();
    });
  }
})();

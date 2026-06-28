(function () {
  'use strict';

  // ===== Config =====
  // Set this to your real form endpoint (e.g., Formspree: https://formspree.io/f/xxxx).
  // While it still contains "your-form-id", the form falls back to a mailto: link.
  var CONTACT_EMAIL = 'contato@clixdata.com.br';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {
    setCurrentYear();
    initMobileNav();
    initReveal();
    initSkillBars();
    initContactForm();
    initScrollTop();
    initActiveNav();
  });

  // ===== Footer year =====
  function setCurrentYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ===== Mobile navigation toggle =====
  function initMobileNav() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });

    // Close menu when a link is clicked (mobile)
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  // ===== Scroll-reveal animations =====
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }

  // ===== Animate skill bars when in view =====
  function initSkillBars() {
    var bars = document.querySelectorAll('.skill-bar');
    if (!bars.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      bars.forEach(function (b) { b.classList.add('in'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    bars.forEach(function (b) { observer.observe(b); });
  }

  // ===== Scroll-to-top button =====
  function initScrollTop() {
    var btn = document.getElementById('toTop');
    if (!btn) return;
    var onScroll = function () {
      if (window.scrollY > 500) btn.classList.add('show');
      else btn.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  // ===== Active nav link highlighting =====
  function initActiveNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-menu a[href^="#"]'));
    var sections = links
      .map(function (l) { return document.querySelector(l.getAttribute('href')); })
      .filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  // ===== Contact form: validation + submission =====
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var status = document.getElementById('formStatus');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors(form);

      // Honeypot: if filled, silently ignore (likely bot)
      var honey = form.querySelector('input[name="_gotcha"]');
      if (honey && honey.value) return;

      var name = form.elements['name'];
      var email = form.elements['email'];
      var message = form.elements['message'];
      var valid = true;

      if (!name.value.trim()) { setError(name, 'Informe seu nome.'); valid = false; }
      if (!email.value.trim()) {
        setError(email, 'Informe seu e-mail.'); valid = false;
      } else if (!isValidEmail(email.value.trim())) {
        setError(email, 'Digite um e-mail válido.'); valid = false;
      }
      if (!message.value.trim()) { setError(message, 'Escreva sua mensagem.'); valid = false; }

      if (!valid) {
        setStatus(status, 'Por favor, corrija os campos destacados.', 'fail');
        return;
      }

      submitForm(form, status);
    });

    // Clear error on input
    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        var field = input.closest('.field');
        if (field) field.classList.remove('invalid');
        var err = form.querySelector('.error[data-for="' + input.name + '"]');
        if (err) err.textContent = '';
      });
    });
  }

  function submitForm(form, status) {
    var action = form.getAttribute('action') || '';
    var btn = form.querySelector('button[type="submit"]');

    // Fallback to mailto when no real endpoint is configured
    if (!action || action.indexOf('your-form-id') !== -1) {
      var subject = encodeURIComponent('Contato pelo site — ' + form.elements['name'].value.trim());
      var body = encodeURIComponent(
        'Nome: ' + form.elements['name'].value.trim() + '\n' +
        'E-mail: ' + form.elements['email'].value.trim() + '\n\n' +
        form.elements['message'].value.trim()
      );
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
      setStatus(status, 'Abrindo seu aplicativo de e-mail para enviar a mensagem…', 'success');
      return;
    }

    if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }

    fetch(action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus(status, 'Mensagem enviada com sucesso! Em breve entraremos em contato.', 'success');
        } else {
          setStatus(status, 'Não foi possível enviar agora. Tente novamente ou escreva para ' + CONTACT_EMAIL + '.', 'fail');
        }
      })
      .catch(function () {
        setStatus(status, 'Erro de conexão. Escreva para ' + CONTACT_EMAIL + '.', 'fail');
      })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Enviar mensagem'; }
      });
  }

  // ===== Helpers =====
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  function setError(input, msg) {
    var field = input.closest('.field');
    if (field) field.classList.add('invalid');
    var err = input.form.querySelector('.error[data-for="' + input.name + '"]');
    if (err) err.textContent = msg;
  }
  function clearErrors(form) {
    form.querySelectorAll('.field').forEach(function (f) { f.classList.remove('invalid'); });
    form.querySelectorAll('.error').forEach(function (e) { e.textContent = ''; });
  }
  function setStatus(el, msg, type) {
    if (!el) return;
    el.textContent = msg;
    el.className = 'form-status ' + (type || '');
  }
})();

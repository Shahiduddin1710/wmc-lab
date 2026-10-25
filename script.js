function copyCode(button) {
  var box = button.nextElementSibling;
  var text = box.innerText;
  navigator.clipboard.writeText(text).then(function () {
    button.textContent = 'Copied!';
    button.classList.add('copied');
    setTimeout(function () {
      button.textContent = 'Copy';
      button.classList.remove('copied');
    }, 2000);
  }).catch(function () {
    var ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    button.textContent = 'Copied!';
    button.classList.add('copied');
    setTimeout(function () {
      button.textContent = 'Copy';
      button.classList.remove('copied');
    }, 2000);
  });
}

(function () {
  var navToggle = document.getElementById('navToggle');
  var navClose  = document.getElementById('navClose');
  var navOverlay = document.getElementById('navOverlay');

  function openMenu() {
    navOverlay.classList.add('open');
    navToggle.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navOverlay.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      if (navOverlay.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (navClose) {
    navClose.addEventListener('click', closeMenu);
  }

  if (navOverlay) {
    var overlayLinks = navOverlay.querySelectorAll('.nav-overlay-links a');
    overlayLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });
  }

  var sections   = document.querySelectorAll('.module-heading[id], .question-block[id]');
  var navAnchors = document.querySelectorAll('.navbar-links a');

  function setActive() {
    var current = '';
    sections.forEach(function (sec) {
      if (sec.getBoundingClientRect().top <= 80) {
        current = sec.id;
      }
    });
    navAnchors.forEach(function (a) {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  var navLinks = document.querySelectorAll('.navbar-links a, .nav-overlay-links a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  var scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
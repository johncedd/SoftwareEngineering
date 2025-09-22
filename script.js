document.addEventListener('DOMContentLoaded', () => {
    const bars = document.querySelectorAll('.progress-bar');
    function fillBars() {
        bars.forEach(bar => {
            const value = parseInt(bar.getAttribute('data-value') || 0, 10);
            bar.style.width = value + '%';
            bar.textContent = value + '%';
        });
    }

    const skillsSection = document.querySelector('.skills');
    if (skillsSection && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    fillBars();
                    o.disconnect();
                }
            });
        }, { threshold: 0.25 });
        obs.observe(skillsSection);
    } else {
        fillBars();
    }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const targetId = a.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('show');
            hamburger.classList.remove('active');
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('show');
        hamburger.classList.remove('active');
    }
});

function smoothScroll(targetElement, duration = 1000) {
  const startPosition = window.scrollY;
  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const easeInOutQuad = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startPosition + distance * easeInOutQuad);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) smoothScroll(targetElement, 1200);

    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.remove('show');
    hamburger.classList.remove('active');
  });
});

const navbarBrand = document.querySelector('.navbar-brand');
if (navbarBrand) {
  navbarBrand.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScroll(document.body, 1200);
  });
}

const scrollToTopBtn = document.getElementById('scrollToTop') || (() => {
  const btn = document.createElement('button');
  btn.id = 'scrollToTop';
  btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  btn.setAttribute('aria-label', 'Scroll to Top');
  document.body.appendChild(btn);
  return btn;
})();

function toggleScrollButton() {
  if (window.scrollY > 100) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
}

window.addEventListener('load', toggleScrollButton);
window.addEventListener('scroll', toggleScrollButton);

scrollToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  smoothScroll(document.body, 1000);
});





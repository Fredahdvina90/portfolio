/**
 * Kansiime Fredah — Data Analyst Portfolio Script
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Dynamic typing role in hero
  const typingRoleEl = document.getElementById('typingRole');
  if (typingRoleEl) {
    const roles = [
      "Data Analytics",
      "Python Scripting",
      "Analytical Thinking",
      "Data Handling",
      "Data Entry & Integrity"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typingRoleEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingRoleEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1600;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // 2. Mobile navigation toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 3. Active link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccessBox = document.getElementById('formSuccessBox');
  const sendAnotherBtn = document.getElementById('sendAnotherBtn');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  }

  function setErr(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  function clearErrs() {
    ['nameError', 'emailError', 'subjectError', 'messageError'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrs();

      const name = document.getElementById('userName').value.trim();
      const email = document.getElementById('userEmail').value.trim();
      const subject = document.getElementById('userSubject').value.trim();
      const message = document.getElementById('userMessage').value.trim();

      let valid = true;

      if (!name) { setErr('nameError', 'Please enter your name'); valid = false; }
      if (!email) { setErr('emailError', 'Please enter your email'); valid = false; }
      else if (!validateEmail(email)) { setErr('emailError', 'Please enter a valid email'); valid = false; }
      if (!subject) { setErr('subjectError', 'Please enter a subject'); valid = false; }
      if (!message) { setErr('messageError', 'Please enter your message'); valid = false; }

      if (!valid) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        contactForm.style.display = 'none';
        formSuccessBox.style.display = 'block';
        showToast('Message sent successfully! Kansiime will reply soon.');
      }, 1000);
    });
  }

  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener('click', () => {
      contactForm.reset();
      formSuccessBox.style.display = 'none';
      contactForm.style.display = 'block';
    });
  }

  // 5. Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('kf_theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.body.setAttribute('data-theme', next);
      localStorage.setItem('kf_theme', next);
      updateThemeIcon(next);
      showToast(next === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  // 6. Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Toast notification helper
  function showToast(msg) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  // Footer year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});

/* ==========================================================================
   Kiran Kuruvila — Portfolio JS
   "Blue Phosphor" CRT Theme & Apple-Style Scroll Animations
   ========================================================================== */

function initPortfolio() {
  // ========================================
  // 1. THEME MANAGEMENT (Dark default + Light)
  // ========================================
  const stored = localStorage.getItem('theme');
  const initial = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', initial);

  const themeToggle = document.querySelector('#theme-toggle');
  const themeToggleLabel = document.querySelector('#theme-toggle-label');

  function updateToggleUI(theme) {
    if (themeToggleLabel) {
      themeToggleLabel.textContent = theme === 'dark' ? 'Light' : 'Dark';
    }
    if (themeToggle) {
      themeToggle.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  updateToggleUI(initial);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateToggleUI(next);
    });
  }

  // ========================================
  // 2. SCROLL PROGRESS BAR & ACTIVE NAV
  // ========================================
  const scrollProgress = document.getElementById('scroll-progress');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  const statusSectionName = document.getElementById('status-section-name');
  const statusScrollPct = document.getElementById('status-scroll-pct');
  const statusTime = document.getElementById('status-time');

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100))) : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }
    if (statusScrollPct) {
      statusScrollPct.textContent = `${scrollPercent}%`;
    }

    // Determine current active section
    let currentSection = 'hero';
    const scrollPos = scrollTop + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    if (statusSectionName) {
      statusSectionName.textContent = currentSection;
    }

    navLinks.forEach(link => {
      const target = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', target === currentSection);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Status clock
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    if (statusTime) {
      statusTime.textContent = `${h}:${m}`;
    }
  }
  updateClock();
  setInterval(updateClock, 30000);

  // ========================================
  // 3. APPLE-STYLE MULTI-DIRECTIONAL SCROLL REVEALS
  // ========================================
  const revealSelectors = [
    '.prompt',
    '#hero-name',
    '#hero .coder-status-bar',
    '#hero .subtitle',
    '#hero .philosophy',
    '#hero .hero-actions',
    '#about p',
    '#about ul',
    '.edu-entry',
    '.project-card',
    '#teaching p',
    '#teaching ul',
    '.skill-group',
    '.contact-row'
  ];

  const revealElements = document.querySelectorAll(revealSelectors.join(', '));

  revealElements.forEach(el => {
    el.classList.add('reveal-init');
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // If user prefers reduced motion, reveal immediately
    revealElements.forEach(el => el.classList.add('in-view'));
  }

  // ========================================
  // 4. INTERACTIVE 3D CARD TILT & GLOW (Apple Pro style)
  // ========================================
  if (!prefersReducedMotion && window.innerWidth > 768) {
    document.querySelectorAll('.project-card').forEach(card => {
      let isHovered = false;

      card.addEventListener('mouseenter', () => {
        isHovered = true;
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
        const rotateY = ((x - centerX) / centerX) * 6;  // max 6deg

        card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale(1.01)`;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transform = '';
      });
    });
  }

  // ========================================
  // 5. PROJECT MODAL SYSTEM
  // ========================================
  const projectData = window.projectData || {};
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');

  if (modal && modalBody && modalTitle && modalClose) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const key = card.dataset.project;
        const data = projectData[key];
        if (!data) return;

        modalTitle.textContent = data.name.toLowerCase();

        modalBody.innerHTML = `
          <div class="modal-project-name">${data.name}</div>
          <div class="modal-tagline">${data.tagline}</div>
          <p>${data.description}</p>
          <h4>Key Highlights</h4>
          <ul>
            ${data.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
          <h4>Technologies</h4>
          <div class="modal-tech-tags">
            ${data.tech.map(t => `<span class="modal-tech-tag">${t}</span>`).join('')}
          </div>
        `;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeModal();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }

  // ========================================
  // 6. PERSISTENT VISITOR COUNTER
  // ========================================
  const countKey = 'kirank0304_github_io_visits';
  const hasVisited = sessionStorage.getItem('portfolio_counted');
  const counterEndpoint = hasVisited
    ? `https://countapi.mileshilliard.com/api/v1/get/${countKey}`
    : `https://countapi.mileshilliard.com/api/v1/hit/${countKey}`;

  fetch(counterEndpoint)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (!hasVisited) {
        sessionStorage.setItem('portfolio_counted', 'true');
      }
      if (data && typeof data.value === 'number') {
        const formatted = data.value.toLocaleString();
        const bottomCounter = document.getElementById('visitor-count');
        const heroCounter = document.getElementById('hero-visitor-count');
        if (bottomCounter) bottomCounter.textContent = formatted;
        if (heroCounter) heroCounter.textContent = formatted;
      }
    })
    .catch(err => {
      console.debug('Visitor counter sync notice:', err.message);
      const bottomCounter = document.getElementById('visitor-count');
      const heroCounter = document.getElementById('hero-visitor-count');
      if (bottomCounter && bottomCounter.textContent === '...') bottomCounter.textContent = 'online';
      if (heroCounter && heroCounter.textContent === '...') heroCounter.textContent = 'online';
    });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}

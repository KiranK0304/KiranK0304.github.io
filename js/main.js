/* ==========================================================================
   Kiran Kuruvila — Portfolio JS
   "Blue Phosphor" CRT Theme & Interactions
   ========================================================================== */

function initPortfolio() {
  // ========================================
  // THEME MANAGEMENT (Dark default + Light)
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
  // SCROLL PROGRESS BAR & ACTIVE NAV HIGHLIGHT
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
    const scrollPos = scrollTop + 140;

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
  // QUICK SHORTCUT BUTTONS
  // ========================================
  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Element)) return;
    const commandButton = e.target.closest('[data-run-command]');
    if (!commandButton) return;
    e.preventDefault();

    const cmd = (commandButton.dataset.runCommand || '').trim().toLowerCase();
    const targetMap = {
      whoami: '#hero',
      about: '#about',
      education: '#education',
      projects: '#projects',
      skills: '#skills',
      teaching: '#teaching',
      contact: '#contact',
      github: 'https://github.com/KiranK0304',
      resume: 'assets/kiran-kuruvila-resume.pdf',
      help: '#projects'
    };

    const dest = targetMap[cmd];
    if (dest) {
      if (dest.startsWith('http') || dest.endsWith('.pdf')) {
        window.open(dest, '_blank', 'noopener,noreferrer');
      } else {
        const el = document.querySelector(dest);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });

  // ========================================
  // PROJECT MODAL SYSTEM
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}

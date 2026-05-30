/* ==========================================================================
   Kiran Kuruvila — Portfolio JS
   Phase 2: All futuristic enhancements
   ========================================================================== */

function initPortfolio() {
  document.body.classList.add('portfolio-view-mode');

  // ========================================
  // THEME TOGGLE
  // ========================================
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme');
  let activeTheme = savedTheme || 'dark';

  function applyTheme(theme) {
    activeTheme = theme;
    document.body.classList.toggle('dark-mode', theme === 'dark');
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
      themeToggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      themeToggle.setAttribute('aria-label', themeToggle.title);
    }
    localStorage.setItem('portfolio-theme', theme);
  }

  applyTheme(activeTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      applyTheme(activeTheme === 'dark' ? 'light' : 'dark');
    });
  }

  // ========================================
  // ENHANCEMENT #1: DOT-GRID PARALLAX
  // ========================================
  const bodyBefore = document.body;
  let dotOffsetX = 0, dotOffsetY = 0;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    dotOffsetX = x;
    dotOffsetY = y;
    document.body.style.setProperty('--dot-x', `${x}px`);
    document.body.style.setProperty('--dot-y', `${y}px`);
    // Update the body::before via a CSS custom property trick
    document.documentElement.style.setProperty(
      '--dot-bg-pos-1', `${x}px ${y}px`
    );
    document.documentElement.style.setProperty(
      '--dot-bg-pos-2', `${14 + x}px ${14 + y}px`
    );
  });

  // Apply the CSS custom properties to the body::before via a style injection
  const dotStyle = document.createElement('style');
  dotStyle.textContent = `
    body::before {
      background-position: var(--dot-bg-pos-1, 0 0), var(--dot-bg-pos-2, 14px 14px) !important;
    }
  `;
  document.head.appendChild(dotStyle);

  // ========================================
  // FLOATING TERMINAL TOGGLE
  // ========================================
  const floatingTerminal = document.getElementById('floating-terminal');
  const toggleBtn = document.getElementById('toggle-terminal');
  const terminalCloseBtn = document.getElementById('terminal-close-btn');
  const terminalBackdrop = document.getElementById('terminal-backdrop');

  function openTerminal() {
    floatingTerminal.classList.add('open');
    if (terminalBackdrop) terminalBackdrop.classList.add('open');
    const inp = document.getElementById('terminal-input');
    if (inp) setTimeout(() => inp.focus(), 100);
  }

  function closeTerminal() {
    floatingTerminal.classList.remove('open');
    if (terminalBackdrop) terminalBackdrop.classList.remove('open');
  }

  if (toggleBtn && floatingTerminal) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (floatingTerminal.classList.contains('open')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    });
  }
  if (terminalCloseBtn && floatingTerminal) {
    terminalCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeTerminal();
    });
  }
  if (terminalBackdrop) {
    terminalBackdrop.addEventListener('click', closeTerminal);
  }
  // Close on Escape too (if modal isn't open)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && floatingTerminal && floatingTerminal.classList.contains('open')) {
      closeTerminal();
    }
  });

  // ========================================
  // ENHANCEMENT #2: SCROLL PROGRESS BAR
  // ========================================
  const scrollProgress = document.getElementById('scroll-progress');
  const pageShell = document.getElementById('page-shell');

  function updateScrollProgress() {
    if (!pageShell || !scrollProgress) return;
    const shellRect = pageShell.getBoundingClientRect();
    const shellTop = pageShell.offsetTop;
    const shellHeight = pageShell.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // Calculate how much of the shell has been scrolled through
    const start = shellTop;
    const end = shellTop + shellHeight - viewportHeight;
    const progress = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
    scrollProgress.style.height = (progress * 100) + '%';
  }

  // ========================================
  // ENHANCEMENT #3: STATUS BAR
  // ========================================
  const statusSectionName = document.getElementById('status-section-name');
  const statusScrollPct = document.getElementById('status-scroll-pct');
  const statusTime = document.getElementById('status-time');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');
  let activeViewId = 'hero';

  function updateStatusBar() {
    if (statusScrollPct) statusScrollPct.textContent = 'view';
    if (statusSectionName) statusSectionName.textContent = activeViewId;

    // Nav scroll spy
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + activeViewId) {
        link.classList.add('active');
      }
    });
  }

  function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    if (statusTime) statusTime.textContent = h + ':' + m;
  }

  updateTime();
  setInterval(updateTime, 30000);

  // Combined scroll handler
  function onScroll() {
    updateScrollProgress();
    updateStatusBar();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ========================================
  // ENHANCEMENT #4: SECTION TYPING ANIMATION
  // ========================================
  // Skip hero section (it has its own typing), animate other sections
  const typingSections = document.querySelectorAll('section:not(#hero)');

  typingSections.forEach(section => {
    const prompts = section.querySelectorAll('.prompt .cmd');
    const outputs = section.querySelectorAll('.output');

    // Prepare: hide prompts and outputs
    prompts.forEach(cmd => {
      cmd.setAttribute('data-original', cmd.textContent);
      cmd.textContent = '';
      cmd.classList.add('typing-pending');
    });
    outputs.forEach(out => {
      out.classList.add('reveal-pending');
    });
  });

  const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSection(entry.target);
        typingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

  typingSections.forEach(s => typingObserver.observe(s));

  function animateSection(section) {
    if (section.dataset.animated === 'true') return;
    section.dataset.animated = 'true';
    section.classList.add('visible');
    const prompts = section.querySelectorAll('.prompt .cmd');
    const outputs = section.querySelectorAll('.output');

    let delay = 0;

    prompts.forEach((cmd, i) => {
      const text = cmd.getAttribute('data-original') || cmd.getAttribute('data-cmd') || '';
      const correspondingOutput = outputs[i];

      setTimeout(() => {
        cmd.classList.remove('typing-pending');
        cmd.classList.add('typing-active');

        let charIdx = 0;
        const typeInterval = setInterval(() => {
          if (charIdx < text.length) {
            cmd.textContent += text.charAt(charIdx);
            charIdx++;
          } else {
            clearInterval(typeInterval);
            cmd.classList.remove('typing-active');
            cmd.classList.add('typing-done');
            // Reveal the corresponding output
            if (correspondingOutput) {
              correspondingOutput.classList.remove('reveal-pending');
              correspondingOutput.classList.add('reveal-show');
            }
          }
        }, 35);
      }, delay);

      delay += text.length * 35 + 200;
    });
  }

  // ---- Hero section: immediate reveal + hero name typing ----
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.classList.add('visible');
    heroSection.classList.add('active-view');
    heroSection.dataset.animated = 'true';
  }

  const heroName = document.getElementById('hero-name');
  if (heroName) {
    const fullText = heroName.dataset.text || heroName.textContent;
    heroName.textContent = '';
    heroName.style.visibility = 'visible';

    let charIndex = 0;
    const typingSpeed = 55;

    function typeHeroChar() {
      if (charIndex < fullText.length) {
        heroName.textContent += fullText.charAt(charIndex);
        charIndex++;
        setTimeout(typeHeroChar, typingSpeed);
      }
    }

    setTimeout(typeHeroChar, 400);
  }

  // ---- Smooth scroll for nav links ----
  function showView(viewId, options = {}) {
    const normalizedId = viewId.replace(/^#/, '') || 'hero';
    const target = document.getElementById(normalizedId);
    if (!target) return;

    activeViewId = normalizedId;
    sections.forEach(section => {
      section.classList.toggle('active-view', section === target);
    });

    if (target.id === 'hero') {
      target.classList.add('visible');
    } else {
      animateSection(target);
    }

    updateStatusBar();

    if (!options.skipHistory) {
      history.pushState({ view: normalizedId }, '', `#${normalizedId}`);
    }

    if (!options.skipScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        showView(href);
      }
    });
  });

  window.addEventListener('popstate', () => {
    showView(window.location.hash || '#hero', { skipHistory: true });
  });

  showView(window.location.hash || '#hero', { skipHistory: true, skipScroll: true });

  // ========================================
  // ENHANCEMENT #5: INTERACTIVE TERMINAL INPUT
  // ========================================
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalResponse = document.getElementById('terminal-response');

  const commands = {
    help: `<span class="response-label">Available commands:</span><br>
      &nbsp;&nbsp;<button type="button" class="terminal-command-link" data-run-command="whoami">whoami</button> &nbsp;&nbsp;— jump to hero<br>
      &nbsp;&nbsp;<button type="button" class="terminal-command-link" data-run-command="about">about</button> &nbsp;&nbsp;&nbsp;— jump to about<br>
      &nbsp;&nbsp;<button type="button" class="terminal-command-link" data-run-command="education">education</button> — jump to education<br>
      &nbsp;&nbsp;<button type="button" class="terminal-command-link" data-run-command="projects">projects</button> — jump to projects<br>
      &nbsp;&nbsp;<button type="button" class="terminal-command-link" data-run-command="skills">skills</button> &nbsp;&nbsp;— jump to skills<br>
      &nbsp;&nbsp;<button type="button" class="terminal-command-link" data-run-command="contact">contact</button> &nbsp;— jump to contact<br>
      &nbsp;&nbsp;<button type="button" class="terminal-command-link" data-run-command="github">github</button> &nbsp;&nbsp;— open GitHub profile<br>
      &nbsp;&nbsp;<button type="button" class="terminal-command-link" data-run-command="resume">resume</button> &nbsp;— open resume PDF<br>
      &nbsp;&nbsp;<button type="button" class="terminal-command-link" data-run-command="clear">clear</button> &nbsp;&nbsp;&nbsp;— clear output<br>
      &nbsp;&nbsp;<button type="button" class="terminal-command-link" data-run-command="hello">hello</button> &nbsp;&nbsp;&nbsp;— say hi`,
    whoami: 'nav:#hero',
    about: 'nav:#about',
    education: 'nav:#education',
    projects: 'nav:#projects',
    teaching: 'nav:#teaching',
    skills: 'nav:#skills',
    contact: 'nav:#contact',
    github: 'open:https://github.com/KiranK0304',
    email: 'open:mailto:kirankuruvila03@gmail.com',
    resume: 'open:assets/kiran-kuruvila-resume.pdf',
    cv: 'open:assets/kiran-kuruvila-resume.pdf',
    clear: 'clear',
    hello: `<span class="response-label">Hey there!</span> Thanks for visiting. Try typing "projects" or "skills".`,
    hi: `<span class="response-label">Hello!</span> Type "help" to see what you can do.`,
    ls: `<span class="response-label">~/</span> about/ &nbsp;projects/ &nbsp;skills/ &nbsp;teaching/ &nbsp;contact/`,
    pwd: `<span class="response-label">/home/kiran/portfolio</span>`,
    date: function() {
      return `<span class="response-label">${new Date().toLocaleString()}</span>`;
    },
    sudo: `<span class="response-label">Nice try.</span> 😄`
  };

  function runTerminalCommand(rawInput, options = {}) {
    const input = rawInput.trim().toLowerCase();
    if (!input) return;

    if (options.openTerminalFirst) {
      openTerminal();
    }

    if (terminalInput) {
      terminalInput.value = '';
    }

    const cmd = commands[input];

    if (cmd === 'clear') {
      terminalOutput.classList.remove('show');
      terminalResponse.innerHTML = '';
      return;
    }

    if (typeof cmd === 'string' && cmd.startsWith('nav:')) {
      terminalResponse.innerHTML = `<span class="response-label">→</span> running <strong>${input}</strong>...`;
      terminalOutput.classList.add('show');
      setTimeout(() => {
        closeTerminal();
        showView(cmd.slice(5));
      }, 500);
      return;
    }

    if (typeof cmd === 'string' && cmd.startsWith('open:')) {
      const url = cmd.slice(5);
      terminalResponse.innerHTML = `<span class="response-label">→</span> opening ${input}...`;
      window.open(url, '_blank', 'noopener,noreferrer');
      terminalOutput.classList.add('show');
      return;
    }

    if (typeof cmd === 'function') {
      terminalResponse.innerHTML = cmd();
    } else if (cmd) {
      terminalResponse.innerHTML = cmd;
    } else {
      terminalResponse.innerHTML = `<span class="response-label">command not found:</span> ${input}. Try "help".`;
    }

    terminalOutput.classList.add('show');
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runTerminalCommand(terminalInput.value);
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Element)) return;
    const commandButton = e.target.closest('[data-run-command]');
    if (!commandButton) return;
    e.preventDefault();
    runTerminalCommand(commandButton.dataset.runCommand || '', { openTerminalFirst: true });
  });

  // ========================================
  // PROJECT MODAL SYSTEM
  // ========================================
  const projectData = window.projectData || {};

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');

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
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}

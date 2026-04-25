/* ==========================================================================
   Kiran Kuruvila — Portfolio JS
   Phase 2: All futuristic enhancements
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

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

  function updateStatusBar() {
    // Update scroll percentage
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.round((scrollY / docHeight) * 100) : 0;
    if (statusScrollPct) statusScrollPct.textContent = pct + '%';

    // Update current section
    let currentSection = 'hero';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (scrollY >= top) {
        currentSection = section.getAttribute('id');
      }
    });
    if (statusSectionName) statusSectionName.textContent = currentSection;

    // Nav scroll spy
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
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
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ========================================
  // ENHANCEMENT #5: INTERACTIVE TERMINAL INPUT
  // ========================================
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalResponse = document.getElementById('terminal-response');

  const commands = {
    help: `<span class="response-label">Available commands:</span><br>
      &nbsp;&nbsp;whoami &nbsp;&nbsp;— jump to hero<br>
      &nbsp;&nbsp;about &nbsp;&nbsp;&nbsp;— jump to about<br>
      &nbsp;&nbsp;education — jump to education<br>
      &nbsp;&nbsp;projects — jump to projects<br>
      &nbsp;&nbsp;teaching — jump to teaching<br>
      &nbsp;&nbsp;skills &nbsp;&nbsp;— jump to skills<br>
      &nbsp;&nbsp;contact &nbsp;— jump to contact<br>
      &nbsp;&nbsp;clear &nbsp;&nbsp;&nbsp;— clear output<br>
      &nbsp;&nbsp;hello &nbsp;&nbsp;&nbsp;— say hi`,
    whoami: 'nav:#hero',
    about: 'nav:#about',
    education: 'nav:#education',
    projects: 'nav:#projects',
    teaching: 'nav:#teaching',
    skills: 'nav:#skills',
    contact: 'nav:#contact',
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

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const input = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        if (!input) return;

        const cmd = commands[input];

        if (cmd === 'clear') {
          terminalOutput.classList.remove('show');
          terminalResponse.innerHTML = '';
          return;
        }

        if (typeof cmd === 'string' && cmd.startsWith('nav:')) {
          const target = document.querySelector(cmd.slice(4));
          terminalResponse.innerHTML = `<span class="response-label">→</span> navigating to ${input}...`;
          terminalOutput.classList.add('show');
          // Close terminal after a short delay, then scroll
          setTimeout(() => {
            closeTerminal();
            if (target) {
              setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 250);
            }
          }, 500);
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
    });
  }

  // ========================================
  // PROJECT MODAL SYSTEM
  // ========================================
  const projectData = {
    trading: {
      name: 'Agentic Trading System',
      tagline: 'Multi-agent intelligence for financial markets',
      description: 'A sophisticated multi-agent system built on LangGraph that orchestrates multiple specialized AI agents for stock market analysis. The system features separate agents for technical analysis, fundamental analysis, news sentiment, and social signals — all coordinated through a central decision-making graph.',
      highlights: [
        'Built with LangGraph for complex agent orchestration',
        'Pydantic-based validation ensures deterministic, structured outputs',
        'ReAct-style reasoning loops for iterative decision making',
        'Simulated broker data layer for safe backtesting',
        'Designed for future integration with real-world broker APIs'
      ],
      tech: ['Python', 'LangGraph', 'Pydantic', 'LangChain', 'Groq']
    },
    gpt: {
      name: 'GPT-style Transformer',
      tagline: 'Teaching transformers to do math',
      description: 'A from-scratch implementation of a GPT-style transformer architecture trained to perform arithmetic operations. Instead of language, this model learns to predict mathematical results as sequences — demonstrating that transformer attention mechanisms can capture structured, rule-based patterns.',
      highlights: [
        'Custom tokenizer and dataset generation for arithmetic expressions',
        'Multi-head self-attention with positional encoding',
        'Full training pipeline with loss visualization',
        'Explored sequence length generalization limits',
        'Built to deeply understand the transformer architecture'
      ],
      tech: ['Python', 'PyTorch', 'NumPy', 'Matplotlib']
    },
    nanogpt: {
      name: 'NanoGPT',
      tagline: 'Character-level language generation',
      description: 'A compact character-level transformer model inspired by Andrej Karpathy\'s nanoGPT. Focused on understanding the core mechanics of attention, layer normalization, and training dynamics at a fundamental level.',
      highlights: [
        'Minimal, readable implementation of the transformer architecture',
        'Character-level tokenization for fine-grained text generation',
        'Focus on training stability — learning rate scheduling, gradient clipping',
        'Experimented with model scaling and its effects on output quality',
        'Deep dive into attention patterns and what the model learns'
      ],
      tech: ['Python', 'PyTorch']
    },
    aws: {
      name: 'AWS Deployment',
      tagline: 'Cloud infrastructure and system design',
      description: 'End-to-end backend deployment on AWS involving multiple services orchestrated together. Designed and implemented production-grade infrastructure including load-balanced compute, managed databases, shared file systems, and container orchestration.',
      highlights: [
        'EC2 instances with Nginx reverse proxy configuration',
        'RDS for managed relational database',
        'EFS for shared persistent storage across instances',
        'EKS for container orchestration with Kubernetes',
        'Security groups, IAM roles, and VPC networking'
      ],
      tech: ['AWS', 'EC2', 'RDS', 'EFS', 'EKS', 'Nginx', 'Docker']
    },
    pong: {
      name: 'RL Pong Agent',
      tagline: 'Learning to play from pixels',
      description: 'A reinforcement learning agent trained to play Pong using policy gradient methods. The agent learns directly from raw pixel observations — receiving only the game score as reward signal.',
      highlights: [
        'Policy gradient (REINFORCE) algorithm implementation',
        'Raw pixel preprocessing pipeline',
        'Reward discounting and baseline subtraction',
        'Training visualization and performance tracking',
        'Foundation for more complex RL experiments'
      ],
      tech: ['Python', 'PyTorch', 'OpenAI Gym']
    },
    nn: {
      name: 'Neural Network Foundations',
      tagline: 'Understanding learning dynamics from scratch',
      description: 'A series of from-scratch implementations covering the building blocks of neural networks. Built a Micrograd autograd engine implementing backpropagation, and implemented RNNs, GRUs, CNNs, and sequence models to deeply understand learning dynamics and gradient flow.',
      highlights: [
        'Micrograd autograd engine with full backpropagation support',
        'RNN and GRU implementations for sequence modeling',
        'CNN implementation for spatial feature extraction',
        'Focus on understanding gradient flow and training dynamics',
        'Foundational understanding that informs all other ML projects'
      ],
      tech: ['Python', 'PyTorch']
    }
  };

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

});

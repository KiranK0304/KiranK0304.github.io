  window.projectData = {
    recruitment: {
      name: 'Recruitment Platform & AI Screening Service',
      tagline: 'Automated candidate screening & RAG Recruiter Copilot',
      description: 'A production-grade recruitment platform and candidate screening engine. Engineered a decoupled Django backend with PostgreSQL persistence and JWT authentication for candidate profiles, job postings, and application lifecycle tracking. Built an automated candidate screening pipeline converting unstructured PDF/DOCX resumes into schema-validated JSON, executing rubric match scoring in under 5 seconds end-to-end. Integrated a Recruiter Copilot powered by RAG and semantic vector search over candidate embeddings with calibrated token bounds (800–1500 tokens); containerized across 3 microservices via multi-stage Docker builds on AWS EC2 behind an Nginx reverse proxy with SSL/TLS.',
      highlights: [
        'Engineered a decoupled Django backend with PostgreSQL persistence and JWT authentication for candidate profiles, job postings, and application lifecycle tracking',
        'Built an automated candidate screening pipeline converting unstructured PDF/DOCX resumes into schema-validated JSON, executing rubric match scoring in under 5 seconds end-to-end',
        'Integrated a Recruiter Copilot powered by RAG and semantic vector search over candidate embeddings with calibrated token bounds (800–1500 tokens)',
        'Containerized 3 microservices via multi-stage Docker builds deployed on AWS EC2 behind an Nginx reverse proxy with SSL/TLS',
        'Configured production cloud persistence with AWS RDS PostgreSQL, Docker Compose, and environment isolation'
      ],
      tech: ['Django', 'PostgreSQL', 'Docker', 'AWS EC2', 'Nginx', 'RAG', 'Embeddings', 'JWT', 'Python']
    },
    multiagent: {
      name: 'Multi-Agent Decision Backend & Visual Pattern Analysis',
      tagline: 'Cyclical 4-agent decision workflow & vision-based chart analysis',
      description: 'An advanced quantitative trading and visual pattern analysis architecture. Features a FastAPI backend orchestrating a 4-agent cyclical decision workflow (orchestration, risk assessment, and thesis re-evaluation) with Pydantic-validated state schemas and dynamic tool/function calling. Automated headless chart extraction using Playwright with retry logic feeds computer vision models that detect technical price action chart patterns from rendered charts in real time. Streams multi-agent reasoning traces directly to frontend clients using Server-Sent Events (SSE).',
      highlights: [
        'Architected a FastAPI backend orchestrating a 4-agent cyclical decision workflow (orchestration, risk assessment, and thesis re-evaluation) with Pydantic-validated state schemas and function calling',
        'Built an automated headless chart extraction pipeline using Playwright with retry logic for zero-disk in-memory vision inference',
        'Served computer vision models to detect technical price action chart patterns from rendered charts in real time',
        'Implemented Server-Sent Events (SSE) to stream multi-agent reasoning traces to frontend clients',
        'Containerized inference services with Docker for scalable AWS deployment'
      ],
      tech: ['FastAPI', 'LangGraph', 'Vision Models', 'Playwright', 'Docker', 'SSE', 'Python', 'Pydantic']
    },
    marketpipeline: {
      name: 'Real-Time Market Data & Quantitative ML Pipeline',
      tagline: 'Asynchronous live tick ingestion, fault-tolerant streaming, and FinBERT signals',
      description: 'An asynchronous live tick-ingestion pipeline via WebSockets, aggregating high-frequency trade feeds into 5-minute OHLC candles with boundary validation and sealed-state management. Engineered with a fault-tolerant streaming architecture featuring heartbeat monitoring, tick-starvation anomaly detection, automated socket reconnection, and REST backfill for continuous data integrity. Computes real-time technical indicators (rolling RSI, EMA) in-memory alongside an applied FinBERT sentiment model to generate composite risk-on/risk-off momentum signals.',
      highlights: [
        'Engineered an asynchronous live tick-ingestion pipeline via WebSockets, aggregating high-frequency trade feeds into 5-minute OHLC candles with boundary validation and sealed-state management',
        'Built a fault-tolerant streaming architecture featuring heartbeat monitoring, tick-starvation anomaly detection, automated socket reconnection, and REST backfill for continuous data integrity',
        'Computed real-time technical indicators (rolling RSI, EMA) in-memory alongside an applied FinBERT sentiment model to generate composite risk-on/risk-off momentum signals',
        'Engineered PostgreSQL persistence with background sweeper processes auditing bar integrity and backfilling gaps'
      ],
      tech: ['Python', 'WebSockets', 'FinBERT', 'NumPy', 'Pandas', 'PostgreSQL', 'REST APIs', 'Transformers']
    },
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
    quantaire: {
      name: 'Quantaire: Stock Market Pattern Detection',
      tagline: 'Computer vision for automated stock-chart analysis',
      description: 'A computer-vision pipeline for automated detection of technical stock-chart patterns using a custom YOLOv8 model. The system captures TradingView charts with Playwright, runs low-latency in-memory inference, and emits structured logs for scanner reliability and monitoring.',
      highlights: [
        'Built a custom YOLOv8 workflow for technical chart-pattern detection',
        'Automated TradingView chart capture with Playwright headless browser orchestration',
        'Designed in-memory single-stock inference without intermediate disk writes',
        'Implemented retry-based browser recovery for scanner reliability',
        'Containerized inference services with Docker and published images through AWS ECR'
      ],
      tech: ['Python', 'YOLOv8', 'Playwright', 'NumPy', 'Docker', 'AWS ECR']
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
    gapbot: {
      name: 'Gap Scanner Telegram Bot',
      tagline: 'Scheduled market scans delivered through Telegram',
      description: 'An automated market gap scanner that fetches live stock data on a daily schedule, identifies stocks exceeding opening gap thresholds, and sends structured reports to a private Telegram group.',
      highlights: [
        'Scheduled daily scans at market open using cron',
        'Fetched stock data with yfinance for gap analysis',
        'Implemented threshold logic for stocks exceeding +/-1% opening gaps',
        'Delivered structured reports through Telegram Bot API workflows',
        'Designed for lightweight daily automation and private group reporting'
      ],
      tech: ['Python', 'yfinance', 'python-telegram-bot', 'Cron', 'Telegram Bot API']
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
    },
    marketdata: {
      name: 'Real-time Indian Market Data System',
      tagline: 'Live ticks → reliable candles + indicator validation',
      description: 'A modular backend system for real-time Indian stock market ingestion and analysis. Streams live market ticks via Upstox WebSockets, aggregates them into 5-minute OHLC candles, and persists the time series into PostgreSQL. The reliability design combines streaming with REST-based recovery/backfill so candle continuity is preserved even across disconnects or missed events.',
      highlights: [
        'Real-time WebSocket ingestion pipeline for market ticks (Upstox APIs)',
        '5-minute OHLC aggregation with consistency and continuity checks',
        'Hybrid reliability: streaming + REST recovery/backfill mechanisms',
        'Background sweeper process that audits and repairs missing candles',
        'Experimental RSI implementations to match broker/TradingView smoothing and rounding'
      ],
      tech: ['Python', 'WebSockets', 'PostgreSQL', 'REST APIs', 'Upstox API', 'AWS EC2', 'Git/GitHub']
    },
    sentiment: {
      name: 'Market Sentiment Risk Score',
      tagline: 'News sentiment + macro signals → interpretable risk score',
      description: 'A market sentiment pipeline that unifies financial news sentiment and live macro/market indicators into a single global risk score. Fetches macro and market-related news via the Event Registry API, filters high-signal articles, and scores sentiment using the FinBERT transformer. In parallel, market signals (NIFTY 50, S&P 500, crude oil, gold, USD/INR) are normalized into comparable condition scores and fused through a configurable weighting engine for transparent, robust scoring.',
      highlights: [
        'News ingestion + filtering via Event Registry API for high-signal finance articles',
        'FinBERT-based sentiment scoring with noise filtering and diagnostics',
        'Normalized market-condition scoring across multiple macro instruments',
        'Weighted fusion engine with clipping safeguards and score normalization',
        'Interpretable output from risk-off → risk-on with tracking for reliability'
      ],
      tech: ['Python', 'Transformers', 'FinBERT', 'Event Registry API', 'REST APIs', 'Time-series Scoring']
    }
  };

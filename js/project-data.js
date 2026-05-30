  window.projectData = {
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

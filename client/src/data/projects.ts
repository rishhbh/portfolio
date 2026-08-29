export interface CategorizedTags {
  ai?: string[];
  backend?: string[];
  devops?: string[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: 'AI Infrastructure' | 'Full-Stack AI' | 'Offline AI' | 'Fintech & Tooling';
  badgeText?: string;
  problem: string;
  howItWorks: string;
  keyFeatures: string[];
  techStack: string[];
  categorizedTags: CategorizedTags;
  homeTags: string[];
  result?: string;
  githubUrl?: string; // If undefined or empty, means private repository
  liveUrl?: string;   // If undefined or empty, means not deployed
  images: string[];   // The screenshot filenames in the public/ folder
}

export const projects: Project[] = [
  {
    slug: 'layerzero',
    name: 'LayerZero',
    tagline: 'AI-powered content summarization platform with a hybrid LLM architecture',
    category: 'AI Infrastructure',
    badgeText: 'FLAGSHIP SYSTEM // ~98% LATENCY REDUCTION',
    problem: 'Most content summarization tools force users into a single AI provider and rely entirely on cloud-hosted AI. LayerZero takes a different approach with a hybrid cloud and local LLM architecture. Users can choose between Gemini 3.5 Flash, GPT OSS 120B (via Cerebras), Sarvam 30B (for Hinglish & multilingual workflows), or Gemma 4 (via Ollama for local, privacy-focused processing). Whether summarizing PDFs, DOCX files, or web content, LayerZero extracts content and generates concise summaries within seconds.',
    howItWorks: 'The platform unifies content ingestion, intelligent caching, and multi-model AI routing across several distinct phases:\n1. Content Ingestion & Parsing: Robustly scrapes web URLs using Axios, JSDOM, and Mozilla Readability. Parses uploaded documents (PDFs via pdfjs-dist, DOCX via mammoth) through a unified mimetype-based routing pipeline.\n2. Intelligent Redis Caching: Generates a SHA-256 fingerprint for ingested content and queries Upstash Redis (@upstash/redis). This cache-first strategy with 1-day TTL expiration reduces repeated summary latency from ~8.5s to ~150ms (~98% improvement).\n3. Hybrid AI Inference & Streaming: Supports real-time token streaming via Server-Sent Events (SSE) across four selectable models: Gemini 3.5 Flash, GPT OSS 120B via Cerebras, Sarvam 30B (multilingual & Hinglish workflows), and local Gemma 4 via Ollama.\n4. Hardened Security & Rate Limiting: Built on Express.js v5 with JWT httpOnly cookie authentication, Nodemailer email verification, strict Zod schema validation, bcrypt password hashing, and custom Upstash Redis sliding window rate limiting (@upstash/ratelimit).\n5. Client-Side Summary Export: Converts markdown summaries into clean plain text and exports to formatted PDF files in-browser via jsPDF.\n6. Testing & Automated Infrastructure: Features automated unit and integration tests using Jest, Supertest, and mongodb-memory-server. Containerized via Docker Compose and deployed on AWS EC2 with GitHub Actions CI/CD.',
    keyFeatures: [
      'Multi-Format Ingestion: Scrapes URLs via JSDOM/Readability, parses PDFs using pdfjs-dist, and DOCX using mammoth.',
      'Intelligent Caching: Upstash Redis-powered caching (@upstash/redis) with SHA-256 fingerprinting (~98% latency reduction).',
      'Real-Time Token Streaming: SSE token streaming (text/event-stream) across Gemini 3.5 Flash, GPT OSS 120B, Gemma 4, and Sarvam 30B.',
      'Multilingual & Hinglish: Natural code-switched summarization and conversational workflows powered by Sarvam 30B.',
      'Hardened Security: Express.js v5 protected by JWT httpOnly cookies, Zod validation, bcrypt, and Upstash ratelimiting.',
      'Infrastructure & Export: jsPDF summary export, Docker Compose setup, AWS EC2 backend deployment, and GitHub Actions CI/CD.'
    ],
    techStack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'jsPDF',
      'remark-gfm',
      'rehype-raw',
      'Node.js',
      'Express.js v5',
      'MongoDB (Mongoose)',
      'Upstash Redis (@upstash/redis)',
      'Upstash Ratelimit (@upstash/ratelimit)',
      'JWT',
      'bcrypt',
      'Zod',
      'Nodemailer',
      'Axios',
      'JSDOM',
      'Mozilla Readability',
      'Multer',
      'pdfjs-dist',
      'mammoth',
      'Jest',
      'Supertest',
      'mongodb-memory-server',
      'Gemini 3.5 Flash',
      'GPT OSS 120B (Cerebras)',
      'Gemma 4 (Ollama)',
      'Sarvam 30B',
      'Docker',
      'Docker Compose',
      'AWS EC2',
      'GitHub Actions'
    ],
    categorizedTags: {
      ai: ['Gemini 3.5 Flash', 'GPT OSS 120B', 'Gemma 4', 'Sarvam 30B'],
      backend: ['Express.js v5', 'Upstash Redis', 'MongoDB', 'Zod / JWT'],
      devops: ['AWS EC2', 'Docker Compose', 'GitHub Actions']
    },
    homeTags: ['TypeScript', 'Express.js', 'AWS EC2', 'GitHub Actions', 'Docker'],
    githubUrl: 'https://github.com/rishhbh/layerzero',
    liveUrl: 'https://layerzero.rishhbh.workers.dev',
    images: ['homepage.webp', 'about.webp', 'register.webp', 'login.webp', 'doc.webp', 'response.webp']
  },
  {
    slug: 'deepsynth',
    name: 'DeepSynth',
    tagline: 'Offline-first AI chat app',
    category: 'Offline AI',
    badgeText: 'OFFLINE LOCAL LLM // 4-BIT QUANTIZED',
    problem: 'People want private, local LLM chat without cloud dependency or per-token cost.',
    howItWorks: 'The chat flow functions entirely on-device and is containerized as follows:\n1. Local Inference: Runs Gemma 3 4B (4-bit quantized) completely offline through Ollama.\n2. System Prompting: Injects a custom sarcastic, humorous personality layer directly into the system prompt settings.\n3. Backend Security: Wraps the local agent in an Express.js server secured with Auth0 JWT token authentication.\n4. Container Dev: Orchestrates frontend, backend, and LLM services in Docker Compose, mapping Vite using host flags for container routing.',
    keyFeatures: [
      'Offline LLM: Local 4-bit quantized inference executing Gemma 3 4B via Ollama.',
      'Secured Endpoints: Orchestrated Express.js backend protected with Auth0 JWT tokens.',
      'Custom Persona: Humor and sarcasm layers embedded natively inside the agent rules.',
      'Container Routing: Optimized Docker Compose setup mapping Vite network ports.'
    ],
    techStack: [
      'React',
      'Tailwind CSS',
      'Express.js',
      'Ollama',
      'Gemma 3 4B',
      'Auth0',
      'Docker'
    ],
    categorizedTags: {
      ai: ['Gemma 3 4B', 'Ollama Offline'],
      backend: ['Express.js', 'Auth0 JWT'],
      devops: ['Docker Compose', 'Local Container Host']
    },
    homeTags: ['React', 'Tailwind CSS', 'Ollama', 'Gemma 3 4B', 'Docker'],
    githubUrl: 'https://github.com/rishhbh/deepsynth',
    liveUrl: undefined, // Not deployed
    images: ['deepsynth-one.webp', 'deepsynth-two.webp']
  },
  {
    slug: 'calculator',
    name: 'Calculator',
    tagline: 'A full-stack calculator that behaves completely normally... until the answer equals 67',
    category: 'Fintech & Tooling',
    badgeText: 'CUSTOM PAYMENT GATEWAY TRIGGER',
    problem: 'A joke project — looks and works like a normal React calculator until the result hits exactly 67, at which point it triggers a Stripe checkout flow that charges $67. Because mathematics should have consequences.',
    howItWorks: 'The payment integration coordinates the calculator state across standard math and custom triggers:\n1. Frontend Math: User performs standard mathematical calculations on the frontend React interface.\n2. State Monitoring: The system monitors the calculation result state.\n3. Gateway Redirection: When the answer evaluates to exactly 67, the frontend calls the Node/Express backend.\n4. Stripe Checkout: The backend initializes a Stripe checkout process (Stripe Elements & Stripe Payment Intents) securely keeping Stripe secret keys hidden.\n5. Payment Wall: The user is redirected to pay $67 to continue using the calculator.',
    keyFeatures: [
      'Fully Functioning Calculator: Operates with standard arithmetic logic.',
      'Magic State Trigger: Watches calculation output for the value 67.',
      'Stripe Integration: Employs Stripe Elements and Payment Intents for secure processing.',
      'DevOps Containerization: Fully containerized with Docker and Docker Compose.'
    ],
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Stripe Elements',
      'Stripe Payment Intents',
      'Docker',
      'Docker Compose'
    ],
    categorizedTags: {
      ai: [],
      backend: ['Node.js / Express', 'Stripe Payments'],
      devops: ['Vercel', 'Docker Compose']
    },
    homeTags: ['React', 'TypeScript', 'Stripe', 'Node.js', 'Docker'],
    githubUrl: 'https://github.com/rishhbh/calculator',
    liveUrl: 'https://calculator-67.vercel.app/',
    images: ['calculator-one.webp', 'calculator-two.webp']
  },
  {
    slug: 'kaushal-ai',
    name: 'KaushalAI',
    tagline: 'AI-powered job marketplace for India\'s informal workforce',
    category: 'Full-Stack AI',
    badgeText: '🏆 1ST PLACE WINNER // IDEAS TO IMPACT 2026',
    problem: 'Informal-sector workers lack digital tools to prove their skills or get matched to employers, especially across language barriers.',
    howItWorks: 'The marketplace coordinates roles and assessments through three primary steps:\n1. Adaptive Assessments: Gemini 2.5 Flash runs conversational skill evaluations tailored to individual workers.\n2. Credentials & Tracking: Passing assessments generates QR-verifiable PDF certificates using jsPDF and html2canvas. Employers manage applicants via a Kanban tracker.\n3. Accessible UX: The interface is fully localized in Hindi, Marathi, and English via i18next, utilizing a mobile-first rural-optimized layout, plus an AI resume builder.',
    keyFeatures: [
      'Conversational Skill Assessments: Powered by Gemini 2.5 Flash with custom adaptive questioning.',
      'Verifiable Credentials: Dynamic PDF certificates generated client-side using jsPDF and html2canvas.',
      'Two-Sided RBAC: Dedicated dashboard workflows optimized for both workers and employer roles.',
      'Localized Interface: Full multi-lingual support in Hindi, Marathi, and English using i18next.'
    ],
    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Gemini API',
      'i18next',
      'JWT',
      'RBAC',
      'jsPDF',
      'html2canvas'
    ],
    categorizedTags: {
      ai: ['Gemini 2.5 Flash', 'Adaptive Prompts'],
      backend: ['Node / Express', 'MongoDB', 'JWT / RBAC'],
      devops: ['Cloudflare Pages', 'i18next Multilingual']
    },
    homeTags: ['React', 'Node/Express', 'MongoDB', 'Gemini API', 'i18next'],
    result: '1st place, Ideas to Impact 2026 Innovation Hackathon (Awadh Incubation Foundation, KMCLU Lucknow) — beat 50+ teams from 14+ institutions',
    githubUrl: 'https://github.com/rishhbh/kaushal-ai',
    liveUrl: 'https://kaushal-ai.pages.dev/',
    images: ['kaushal.webp']
  }
];

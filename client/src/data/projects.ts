export interface Project {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  howItWorks: string;
  keyFeatures: string[];
  techStack: string[];
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
    problem: 'Most content summarization tools force users into a single AI provider and rely entirely on cloud-hosted AI. LayerZero takes a different approach with a hybrid cloud and local LLM architecture. Users can choose between Gemini 3.5 Flash, GPT OSS 120B (via Cerebras), Sarvam 30B (for Hinglish & multilingual workflows), or Gemma 4 (via Ollama for local, privacy-focused processing). Whether summarizing PDFs, DOCX files, or web content, LayerZero extracts content and generates concise summaries within seconds.',
    howItWorks: 'The platform unifies content ingestion, intelligent caching, and multi-model AI routing across several distinct phases:\n1. Content Ingestion & Parsing: Robustly scrapes web URLs using Axios, JSDOM, and Mozilla Readability. Parses uploaded documents (PDFs via pdfjs-dist, DOCX via mammoth) through a unified mimetype-based routing pipeline.\n2. Intelligent Redis Caching: Generates a SHA-256 fingerprint for ingested content and queries Upstash Redis (@upstash/redis). This cache-first strategy with 1-day TTL expiration reduces repeated summary latency from ~8.5s to ~150ms (~98% improvement).\n3. Hybrid AI Inference & Streaming: Supports real-time token streaming via Server-Sent Events (SSE) across four selectable models: Gemini 3.5 Flash, GPT OSS 120B via Cerebras, Sarvam 30B (multilingual & Hinglish workflows), and local Gemma 4 via Ollama.\n4. Hardened Security & Rate Limiting: Built on Express.js v5 with JWT httpOnly cookie authentication, Nodemailer email verification, strict Zod schema validation, bcrypt password hashing, and custom Upstash Redis sliding window rate limiting (@upstash/ratelimit).\n5. Client-Side Summary Export: Converts markdown summaries into clean plain text and exports to formatted PDF files in-browser via jsPDF.\n6. Testing & Automated Infrastructure: Features automated unit and integration tests using Jest, Supertest, and mongodb-memory-server. Containerized via Docker Compose and deployed on AWS EC2 with GitHub Actions CI/CD.',
    keyFeatures: [
      'Multi-Format Ingestion: Scrapes URLs via JSDOM/Readability, parses PDFs using pdfjs-dist, and DOCX using mammoth with mimetype-based routing.',
      'Intelligent Caching: Upstash Redis-powered caching (@upstash/redis) with SHA-256 fingerprinting, 1-day TTLs, and cache-first retrieval (~98% latency reduction).',
      'Real-Time Token Streaming: SSE token streaming (text/event-stream) across Gemini 3.5 Flash, GPT OSS 120B, Gemma 4, and Sarvam 30B.',
      'Multilingual & Hinglish: Natural code-switched summarization and conversational workflows powered by Sarvam 30B.',
      'Hardened Security & Rate Limiting: Express.js v5 protected by JWT httpOnly cookies, Nodemailer email verification, Zod payload validation, bcrypt, and Upstash Redis sliding window rate limiting (@upstash/ratelimit).',
      'Automated Testing Suite: Integration and unit testing with Jest, Supertest, and in-memory MongoDB (mongodb-memory-server).',
      'Infrastructure & Export: jsPDF summary export, Docker Compose setup, AWS EC2 backend deployment, and automated GitHub Actions CI/CD pipeline.'
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
    homeTags: ['TypeScript', 'Express.js', 'AWS EC2', 'GitHub Actions', 'Docker'],
    githubUrl: 'https://github.com/rishhbh/layerzero',
    liveUrl: 'https://layerzero.rishhbh.workers.dev',
    images: ['homepage.png', 'about.png', 'register.png', 'login.png', 'doc.png', 'response.png']
  },
  {
    slug: 'kaushal-ai',
    name: 'KaushalAI',
    tagline: 'AI-powered job marketplace for India\'s informal workforce',
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
    homeTags: ['React', 'Node/Express', 'MongoDB', 'Gemini API', 'i18next'],
    result: '1st place, Ideas to Impact 2026 Innovation Hackathon (Awadh Incubation Foundation, KMCLU Lucknow) — beat 50+ teams from 14+ institutions',
    githubUrl: 'https://github.com/rishhbh/kaushal-ai',
    liveUrl: 'https://kaushal-ai.pages.dev/',
    images: ['kaushal.png']
  },
  {
    slug: 'deepsynth',
    name: 'DeepSynth',
    tagline: 'Offline-first AI chat app',
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
    homeTags: ['React', 'Tailwind CSS', 'Ollama', 'Gemma 3 4B', 'Docker'],
    githubUrl: 'https://github.com/rishhbh/deepsynth',
    liveUrl: undefined, // Not deployed
    images: ['deepsynth-one.png', 'deepsynth-two.png']
  },
  {
    slug: 'calculator',
    name: 'Calculator',
    tagline: 'A full-stack calculator that behaves completely normally... until the answer equals 67',
    problem: 'A joke project — looks and works like a normal React calculator until the result hits exactly 67, at which point it triggers a Stripe checkout flow that charges $67. Because mathematics should have consequences.',
    howItWorks: 'The payment integration coordinates the calculator state across standard math and custom triggers:\n1. Frontend Math: User performs standard mathematical calculations on the frontend React interface.\n2. State Monitoring: The system monitors the calculation result state.\n3. Gateway Redirection: When the answer evaluates to exactly 67, the frontend calls the Node/Express backend.\n4. Stripe Checkout: The backend initializes a Stripe checkout process (Stripe Elements & Stripe Payment Intents) securely keeping Stripe secret keys hidden.\n5. Payment Wall: The user is redirected to pay $67 to continue using the calculator.',
    keyFeatures: [
      'Fully Functioning Calculator: Operates with standard arithmetic logic.',
      'Magic State Trigger: Watches calculation output for the value 67.',
      'Stripe Integration: Employs Stripe Elements on the frontend and Stripe Payment Intents on the backend for secure processing.',
      'DevOps Containerization: Fully containerized with Docker and Docker Compose for fast local setup.'
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
    homeTags: ['React', 'TypeScript', 'Stripe', 'Node.js', 'Docker'],
    githubUrl: 'https://github.com/rishhbh/calculator',
    liveUrl: 'https://calculator-67.vercel.app/',
    images: ['calculator-one.png', 'calculator-two.png']
  }
];

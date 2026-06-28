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
    problem: 'LayerZero allows users to summarize PDFs, DOCX files, and web content using cloud-based or locally hosted language models. It provides a secure authentication layer and a clean content-processing pipeline to avoid vendor lock-in.',
    howItWorks: 'The platform normalizes content ingestion across three sources:\n1. Website URL Flow: Scrapes page content with Axios, builds a virtual DOM with JSDOM, and extracts clean article text with Mozilla Readability.\n2. Document Flow: Uploads documents via Multer and routes to appropriate parsers based on mimetype — pdf-parse for PDFs and mammoth for DOCX files.\n\nThe extracted clean text is then forwarded to a selected AI model for summarization:\n- Gemini 2.5 Flash (Cloud)\n- GPT OSS 120B via Cerebras (Cloud)\n- Gemma 4 via Ollama (Local/Private)\n- Sarvam 30B (Cloud Multilingual & Hinglish)\n\nSecurity features include JWT auth stored in httpOnly cookies, bcrypt password hashing, and express-rate-limit middleware on auth and LLM routes. The system is orchestrating client, server, and Redis caching services via Docker Compose.',
    keyFeatures: [
      'Multi-Format Ingestion: Scrapes URLs using JSDOM/Readability, parses PDFs using pdf-parse, and DOCX using mammoth.',
      'Hybrid Cloud/Local AI: Routes inference to Gemini, Cerebras (GPT OSS 120B), Sarvam, or local Gemma 4 via Ollama.',
      'Hinglish & Multilingual: Seamless translation and summarization workflows using Sarvam 30B for code-switched inputs.',
      'Hardened Security: JWT-based authorization in httpOnly cookies, bcrypt hashing, and express-rate-limit middleware.',
      'Export Options: Generates cleanly formatted PDFs from generated summaries using jsPDF after converting markdown to plain text.',
      'Infrastructure: Orchestrated multi-container Docker Compose configuration supporting React frontend, Node/Express backend, and Redis.'
    ],
    techStack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'jsPDF',
      'Node.js',
      'Express.js (ESM)',
      'MongoDB',
      'Redis',
      'JWT',
      'bcrypt',
      'express-rate-limit',
      'Axios',
      'JSDOM',
      'Mozilla Readability',
      'Multer',
      'pdf-parse',
      'mammoth',
      'Gemini 2.5 Flash',
      'GPT OSS 120B (Cerebras)',
      'Gemma 4 (Ollama)',
      'Sarvam 30B',
      'Docker',
      'Docker Compose'
    ],
    homeTags: ['TypeScript', 'Express.js', 'MongoDB', 'Docker', 'Gemini API'],
    githubUrl: 'https://github.com/rishhbh/layerzero',
    liveUrl: 'https://layerzero.uchihamadara3472.workers.dev/',
    images: ['layerzero-one.png', 'layerzero-two.png']
  },
  {
    slug: 'kaushalai',
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
    liveUrl: 'https://thekaushal-ai.vercel.app/',
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

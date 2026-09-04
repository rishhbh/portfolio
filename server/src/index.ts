import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import contactRouter from './routes/contact';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const FRONTEND_URL = process.env.FRONTEND_URL;
const CLIENT_URLS_ENV = process.env.CLIENT_URL;

// --- Dynamic CORS Configuration ---
let allowedOrigins: string[] = [];

if (CLIENT_URLS_ENV) {
  // Split, trim, and filter out any empty strings resulting from the split
  allowedOrigins = CLIENT_URLS_ENV.split(',').map(url => url.trim()).filter(url => url.length > 0);
  console.log(`CORS allowed origins loaded from environment variable: ${allowedOrigins.join(', ')}`);
} else {
  console.log(`CLIENT_URL not set. CORS origins are empty; no origins will be allowed by default.`);
}

// Security and Performance Middlewares
app.use(helmet());
app.use(compression());

// Rate limiting specifically for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply CORS with dynamically configured origins
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/contact', contactLimiter, contactRouter);

app.get('/', (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API is running properly",
    uptime: Math.floor(process.uptime()) + " seconds"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
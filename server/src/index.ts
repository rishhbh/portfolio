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

app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/contact', contactLimiter, contactRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

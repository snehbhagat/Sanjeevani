import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';
import errorHandler from './middleware/errorHandler.js';
import requestContext from './middleware/requestContext.js';
import authRoutes from './routes/auth.routes.js';
import chatbotRoutes from './routes/chatbot.routes.js';
import donorRoutes from './routes/donor.routes.js';
import gamificationRoutes from './routes/gamification.routes.js';
import predictionRoutes from './routes/prediction.routes.js';
import requestRoutes from './routes/request.routes.js';
import { sendError } from './utils/response.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Global middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(hpp());
app.use(express.json());
app.use(morgan('dev'));
app.use(requestContext());

app.get('/health', (req, res) => res.json({ ok: true }));
// Serve static frontend
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/prediction', predictionRoutes);

// 404 handler
app.use((req, res, _next) => {
  return sendError(res, 404, 'Resource not found', { code: 'NOT_FOUND', details: { path: req.originalUrl } }, req);
});

// Error handler
app.use(errorHandler);

export default app;

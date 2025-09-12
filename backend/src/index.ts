import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pino from 'pino-http';
import { PORT } from './env.js';
import donorPrediction from './routes/donorPrediction.js';
import donorsRoute from './routes/donors.js';
import bloodInventoryRoute from './routes/bloodInventory.js';
import gamificationRoutes from './routes/gamification.js';
import chatbotRoutes from './routes/chatbot.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(pino());

app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(donorPrediction);
app.use(donorsRoute);
app.use(bloodInventoryRoute);
app.use(gamificationRoutes);
app.use(chatbotRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});
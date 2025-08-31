import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 5000;

// Start server only after DB connects
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Sanjeevani AI API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

start();

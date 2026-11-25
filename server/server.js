import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import toolsRoutes from './routes/toolsRoutes.js';
import usageRoutes from './routes/usageRoutes.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '11mb' }));
app.get('/api/health', (_req, res) => res.json({ success: true, message: 'AI Chatbot API is running.' }));
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/usage', usageRoutes);
app.use((req, res) => res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` }));

const port = Number(process.env.PORT) || 5001;
try {
  await connectDB();
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
} catch (error) {
  console.error('Server startup failed:', error.message);
  process.exit(1);
}

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/categories.js';
import wordRoutes from './routes/words.js';
import gameRoutes from './routes/game.js'; // <-- ADD THIS LINE

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

const corsOptions = {
  origin: 'https://word-scramble-frontend.vercel.app', // <-- PASTE YOUR VERCEL URL HERE
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// A simple test route
app.get('/', (req, res) => {
  res.send('Word Scramble API is running...');
});

// --- MOUNT ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/words', wordRoutes);
app.use('/api/game', gameRoutes); // <-- ADD THIS LINE

// --- ERROR HANDLERS ---
// Not Found Handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// General Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

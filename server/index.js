import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

import authRoutes from './routes/authRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import User from './models/User.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/one7')
  .then(async () => {
    console.log('Connected to MongoDB');
    // Seed admin user
    try {
      const adminExists = await User.findOne({ email: 'admin@one7.com' });
      if (!adminExists) {
        await User.create({
          name: 'Admin',
          email: 'admin@one7.com',
          password: 'admin123',
          role: 'admin'
        });
        console.log('Admin user seeded.');
      }
    } catch (err) {
      console.error('Failed to seed admin:', err);
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'One7 API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

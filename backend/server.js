require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://vercel-frontend-kmbf.vercel.app',
    ],
    credentials: true,
  })
);
app.use(express.json());

// Basic root + health endpoints for Render checks
app.get('/', (req, res) => {
  res.type('text').send('Backend is running');
});

app.get('/health', (req, res) => {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const state = require('mongoose').connection.readyState;
  const ok = state === 1;
  res.status(ok ? 200 : 503).json({ ok, mongoReadyState: state });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Start Mongo connection retries after server starts
connectDB();

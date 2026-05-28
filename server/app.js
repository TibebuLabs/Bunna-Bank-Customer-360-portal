require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth routes — always load (no DB needed for validation)
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

// Customer & branch routes — load separately so auth still works if DB is down
try {
  const customerRoutes = require('./src/routes/customerRoutes');
  const branchRoutes   = require('./src/routes/branchRoutes');
  app.use('/api/customers', customerRoutes);
  app.use('/api/branches',  branchRoutes);
  console.log('Customer and branch routes loaded');
} catch (err) {
  console.warn('Could not load customer/branch routes:', err.message);
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Bunna Bank API is running', timestamp: new Date() });
});

// 404
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;

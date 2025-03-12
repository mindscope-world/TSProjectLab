// src/app.ts
import express, { Application } from 'express';
import learnerRoutes from './routes/learnerRoutes';

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/learners', learnerRoutes);

// Basic error handling
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

export default app;

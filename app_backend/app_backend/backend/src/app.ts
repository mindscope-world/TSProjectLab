/**
 * src/app.ts
 * 
 * This is the main application file that configures the Express application.
 * It sets up middleware, routes, and error handling for the API.
 */

import express, { Application, Request, Response } from 'express';
import learnerRoutes from './routes/learnerRoutes';

/**
 * Initialize Express application
 */
const app: Application = express();

/**
 * Middleware Configuration
 * 
 * express.json() - Parses incoming requests with JSON payloads
 */
app.use(express.json());

/**
 * API Routes
 * 
 * Mount the learner routes under the /api/learners path
 */
app.use('/api/learners', learnerRoutes);

/**
 * Error Handling Middleware
 * 
 * Catch-all for undefined routes
 * Returns a 404 status with a standardized error response
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

export default app;

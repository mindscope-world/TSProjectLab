/**
 * routes/learnerRoutes.ts
 * 
 * This file defines the API routes for learner-related operations.
 * It maps HTTP endpoints to their corresponding controller functions.
 */

import { Router } from 'express';
import { 
  getAllLearners, 
  getLearnerById,
  createLearner
} from '../controllers/learnerController';

// Initialize Express Router
const router = Router();

/**
 * Learner Routes
 * 
 * GET / - Retrieve all learners
 * GET /:id - Retrieve a specific learner by ID
 * POST / - Create a new learner
 */

// Route to get all learners
router.get('/', getAllLearners);

// Route to get a specific learner by ID
router.get('/:id', getLearnerById);

// Route to create a new learner
router.post('/', createLearner);

export default router;

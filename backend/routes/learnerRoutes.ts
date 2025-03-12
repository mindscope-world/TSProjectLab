// src/routes/learnerRoutes.ts
import { Router } from 'express';
import { 
  getAllLearners, 
  getLearnerById,
  createLearner
} from '../controllers/learnerController';

const router = Router();

router.get('/', getAllLearners);
router.get('/:id', getLearnerById);
router.post('/', createLearner);

export default router;

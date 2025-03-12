// src/controllers/learnerController.ts
import { Request, Response } from 'express';
import { learners } from '../data/learners';
import { Learner } from '../models/learner';

// Get all learners
export const getAllLearners = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    count: learners.length,
    data: learners
  });
};

// Get single learner by ID
export const getLearnerById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const learner = learners.find((l) => l.id === id);

  if (!learner) {
    res.status(404).json({
      success: false,
      message: `Learner with id ${id} not found`
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: learner
  });
};

// Add new learner
export const createLearner = (req: Request, res: Response): void => {
  const newLearner: Learner = req.body;
  
  // Simple validation
  if (!newLearner.name || !newLearner.email) {
    res.status(400).json({
      success: false,
      message: 'Please provide name and email'
    });
    return;
  }

  // Generate new ID
  const newId = learners.length > 0 ? Math.max(...learners.map(l => l.id)) + 1 : 1;
  newLearner.id = newId;
  
  learners.push(newLearner);
  
  res.status(201).json({
    success: true,
    data: newLearner
  });
};

/**
 * controllers/learnerController.ts
 * 
 * This file contains controller functions for handling learner-related HTTP requests.
 * Each function corresponds to a specific API endpoint and implements the business logic
 * for processing requests and returning appropriate responses.
 */

import { Request, Response } from 'express';
import { learners } from '../data/learners';
import { Learner } from '../models/learner';

/**
 * Get all learners
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns void - Sends JSON response with all learners
 * 
 * Retrieves all learners from the data source and returns them in a standardized
 * response format with success status, count, and data.
 */
export const getAllLearners = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    count: learners.length,
    data: learners
  });
};

/**
 * Get single learner by ID
 * 
 * @param req - Express Request object containing the learner ID in params
 * @param res - Express Response object
 * @returns void - Sends JSON response with learner data or error message
 * 
 * Retrieves a specific learner by their ID. Returns a 404 error if the
 * learner is not found in the data source.
 */
export const getLearnerById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const learner = learners.find((l) => l.id === id);

  // Return 404 if learner not found
  if (!learner) {
    res.status(404).json({
      success: false,
      message: `Learner with id ${id} not found`
    });
    return;
  }

  // Return learner data if found
  res.status(200).json({
    success: true,
    data: learner
  });
};

/**
 * Add new learner
 * 
 * @param req - Express Request object containing the new learner data in body
 * @param res - Express Response object
 * @returns void - Sends JSON response with created learner or error message
 * 
 * Creates a new learner record based on the request body data.
 * Performs basic validation to ensure required fields are provided.
 * Automatically generates a new unique ID for the learner.
 */
export const createLearner = (req: Request, res: Response): void => {
  const newLearner: Learner = req.body;
  
  // Validate required fields
  if (!newLearner.name || !newLearner.email) {
    res.status(400).json({
      success: false,
      message: 'Please provide name and email'
    });
    return;
  }

  // Generate new unique ID
  const newId = learners.length > 0 ? Math.max(...learners.map(l => l.id)) + 1 : 1;
  newLearner.id = newId;
  
  // Add to data source
  learners.push(newLearner);
  
  // Return success response with created learner
  res.status(201).json({
    success: true,
    data: newLearner
  });
};

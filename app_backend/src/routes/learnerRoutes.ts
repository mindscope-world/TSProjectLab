import express, { Request, Response, Router, RequestHandler } from 'express';
import { Learner } from '../interfaces/Learner';

const router: Router = express.Router();

// In-memory storage for learners (replace with database in production)
let learners: Learner[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    course: "TypeScript Fundamentals",
    enrollmentDate: "2024-01-15",
    status: "active",
    progress: 75,
    lastAccessed: "2024-03-20T10:30:00Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    course: "Advanced TypeScript",
    enrollmentDate: "2024-02-01",
    status: "completed",
    grade: "A",
    progress: 100,
    lastAccessed: "2024-03-19T15:45:00Z"
  }
];

/**
 * @swagger
 * /api/learners:
 *   get:
 *     summary: Get all learners
 *     description: Retrieve a list of all learners
 *     responses:
 *       200:
 *         description: A list of learners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Learner'
 */
const getAllLearners: RequestHandler = (req, res): void => {
  res.json(learners);
};

/**
 * @swagger
 * /api/learners/{id}:
 *   get:
 *     summary: Get a learner by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Learner ID
 *     responses:
 *       200:
 *         description: Learner details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Learner'
 *       404:
 *         description: Learner not found
 */
const getLearnerById: RequestHandler<{ id: string }> = (req, res): void => {
  const learner = learners.find(l => l.id === parseInt(req.params.id, 10));
  if (!learner) {
    res.status(404).json({ error: 'Learner not found' });
    return;
  }
  res.json(learner);
};

/**
 * @swagger
 * /api/learners:
 *   post:
 *     summary: Create a new learner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Learner'
 *     responses:
 *       201:
 *         description: Learner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Learner'
 *       400:
 *         description: Invalid input
 */
const createLearner: RequestHandler = (req, res): void => {
  const newLearner: Learner = {
    id: learners.length + 1,
    ...req.body,
    enrollmentDate: new Date().toISOString(),
    lastAccessed: new Date().toISOString(),
    progress: 0
  };
  
  learners.push(newLearner);
  res.status(201).json(newLearner);
};

/**
 * @swagger
 * /api/learners/{id}:
 *   put:
 *     summary: Update a learner
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Learner ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Learner'
 *     responses:
 *       200:
 *         description: Learner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Learner'
 *       404:
 *         description: Learner not found
 */
const updateLearner: RequestHandler<{ id: string }> = (req, res): void => {
  const index = learners.findIndex(l => l.id === parseInt(req.params.id, 10));
  if (index === -1) {
    res.status(404).json({ error: 'Learner not found' });
    return;
  }
  
  learners[index] = {
    ...learners[index],
    ...req.body,
    lastAccessed: new Date().toISOString()
  };
  
  res.json(learners[index]);
};

/**
 * @swagger
 * /api/learners/{id}:
 *   delete:
 *     summary: Delete a learner
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Learner ID
 *     responses:
 *       200:
 *         description: Learner deleted successfully
 *       404:
 *         description: Learner not found
 */
const deleteLearner: RequestHandler<{ id: string }> = (req, res): void => {
  const index = learners.findIndex(l => l.id === parseInt(req.params.id, 10));
  if (index === -1) {
    res.status(404).json({ error: 'Learner not found' });
    return;
  }
  
  learners.splice(index, 1);
  res.json({ message: 'Learner deleted successfully' });
};

router.get('/', getAllLearners);
router.get('/:id', getLearnerById);
router.post('/', createLearner);
router.put('/:id', updateLearner);
router.delete('/:id', deleteLearner);

export default router; 
import express, { Request, Response, Router, RequestHandler } from 'express';
import { Learner } from '../interfaces/Learner';
import { saveLearners, loadLearners } from '../utils/fileUtils';

const router: Router = express.Router();

// Initial learners data
const initialLearners: Learner[] = [
  {
    "id": 1,
    "name": "Christine Mcguire",
    "email": "scott60@example.org",
    "course": "away",
    "enrollmentDate": "2025-03-05T16:57:09.364295Z",
    "status": "active",
    "grade": "A",
    "progress": 21,
    "lastAccessed": "2025-03-04T14:41:58.257733Z"
  },
  {
    "id": 2,
    "name": "Dr. Kendra Hunt",
    "email": "michaelbates@example.org",
    "course": "decision",
    "enrollmentDate": "2025-02-18T23:43:42.127360Z",
    "status": "active",
    "grade": "A",
    "progress": 70,
    "lastAccessed": "2025-03-03T14:41:58.258853Z"
  },
  {
    "id": 3,
    "name": "Jason Meadows",
    "email": "steven54@example.net",
    "course": "house",
    "enrollmentDate": "2025-03-11T01:57:09.099616Z",
    "status": "active",
    "grade": "A",
    "progress": 28,
    "lastAccessed": "2025-02-21T14:41:58.259561Z"
  },
  {
    "id": 4,
    "name": "Jason Young",
    "email": "nmorales@example.net",
    "course": "impact",
    "enrollmentDate": "2025-03-11T20:30:07.869440Z",
    "status": "active",
    "grade": "D",
    "progress": 68,
    "lastAccessed": "2025-03-12T14:41:58.260321Z"
  },
  {
    "id": 5,
    "name": "Sean Vasquez",
    "email": "emily13@example.com",
    "course": "analysis",
    "enrollmentDate": "2025-02-04T06:24:24.730617Z",
    "status": "active",
    "grade": "A",
    "progress": 78,
    "lastAccessed": "2025-03-13T14:41:58.261152Z"
  }
];

// Load learners from file or use initial data if file doesn't exist
let learners: Learner[] = loadLearners();
if (learners.length === 0) {
  learners = initialLearners;
  saveLearners(learners);
}

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
  saveLearners(learners);
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
  
  saveLearners(learners);
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
  saveLearners(learners);
  res.json({ message: 'Learner deleted successfully' });
};

router.get('/', getAllLearners);
router.get('/:id', getLearnerById);
router.post('/', createLearner);
router.put('/:id', updateLearner);
router.delete('/:id', deleteLearner);

export default router; 
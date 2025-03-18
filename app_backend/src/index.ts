import express, { Request, Response, Router, RequestHandler } from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import learnerRoutes from './routes/learnerRoutes';

const app = express();
const router = Router();
const port = 3000;

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

// Define parameter interfaces
interface UserIdParam {
  id: string;
}

interface CreateUsersRequest {
  users: Array<{
    name: string;
    email: string;
  }>;
}

interface DeleteUsersRequest {
  ids: number[];
}

let users: User[] = [];

// Add CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
    ],
    // Add CORS configuration to Swagger
    security: [],
    components: {
      securitySchemes: {},
      schemas: {
        Learner: {
          type: 'object',
          required: ['name', 'email', 'course'],
          properties: {
            id: {
              type: 'integer',
              description: 'Auto-generated learner ID'
            },
            name: {
              type: 'string',
              description: 'Learner\'s full name'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Learner\'s email address'
            },
            course: {
              type: 'string',
              description: 'Course the learner is enrolled in'
            },
            enrollmentDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the learner enrolled'
            },
            status: {
              type: 'string',
              enum: ['active', 'completed', 'dropped'],
              description: 'Current status of the learner'
            },
            grade: {
              type: 'string',
              description: 'Final grade (if course is completed)'
            },
            progress: {
              type: 'number',
              minimum: 0,
              maximum: 100,
              description: 'Percentage of course completion'
            },
            lastAccessed: {
              type: 'string',
              format: 'date-time',
              description: 'Last time the learner accessed the course'
            }
          }
        }
      }
    }
  },
  apis: ['./src/index.ts', './src/routes/learnerRoutes.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a hello message
 *     responses:
 *       200:
 *         description: A hello message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Test endpoint
 *     description: Returns a test message with timestamp
 *     responses:
 *       200:
 *         description: A test object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
app.get('/api/test', (req: Request, res: Response) => {
  res.json({
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated user ID
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

// Get all users
const getAllUsers: RequestHandler = (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(users);
};

// Get user by ID
const getUserById: RequestHandler<UserIdParam> = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json(user);
};

// Create user
const createUser: RequestHandler = (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required' });
    return;
  }
  
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
};

// Update user
const updateUser: RequestHandler<UserIdParam> = (req, res) => {
  const { name, email } = req.body;
  const userId = parseInt(req.params.id);
  
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  
  if (!name && !email) {
    res.status(400).json({ error: 'At least one field (name or email) is required' });
    return;
  }
  
  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email
  };
  
  res.json(users[userIndex]);
};

// Delete user
const deleteUser: RequestHandler<UserIdParam> = (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  
  users.splice(userIndex, 1);
  res.json({ message: 'User deleted successfully' });
};

// Add these new handlers
/**
 * @swagger
 * /api/users/bulk:
 *   post:
 *     summary: Create multiple users
 *     description: Creates multiple users in a single request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - users
 *             properties:
 *               users:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - email
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *     responses:
 *       201:
 *         description: Users created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 */
const createManyUsers: RequestHandler = (req, res) => {
  const { users: newUsers } = req.body as CreateUsersRequest;

  if (!Array.isArray(newUsers) || newUsers.length === 0) {
    res.status(400).json({ error: 'Users array is required and must not be empty' });
    return;
  }

  // Validate all users first
  const invalidUsers = newUsers.filter(user => !user.name || !user.email);
  if (invalidUsers.length > 0) {
    res.status(400).json({ 
      error: 'All users must have name and email',
      invalidUsers 
    });
    return;
  }

  // Create all users
  const createdUsers = newUsers.map((user, index) => ({
    id: users.length + index + 1,
    name: user.name,
    email: user.email,
    createdAt: new Date().toISOString()
  }));

  users.push(...createdUsers);
  res.setHeader('Content-Type', 'application/json');
  res.status(201).json({ users: createdUsers });
};

/**
 * @swagger
 * /api/users/bulk:
 *   delete:
 *     summary: Delete multiple users
 *     description: Deletes multiple users by their IDs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Users deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedCount:
 *                   type: integer
 *                 deletedIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *       400:
 *         description: Invalid input
 *       404:
 *         description: One or more users not found
 */
const deleteManyUsers: RequestHandler = (req, res) => {
  const { ids } = req.body as DeleteUsersRequest;

  if (!Array.isArray(ids) || ids.length === 0) {
    res.status(400).json({ error: 'User IDs array is required and must not be empty' });
    return;
  }

  // Validate all IDs exist
  const notFoundIds = ids.filter(id => !users.some(user => user.id === id));
  if (notFoundIds.length > 0) {
    res.status(404).json({ 
      error: 'Some users not found',
      notFoundIds 
    });
    return;
  }

  // Delete users
  const initialLength = users.length;
  users = users.filter(user => !ids.includes(user.id));
  const deletedCount = initialLength - users.length;

  res.json({ 
    message: 'Users deleted successfully',
    deletedCount,
    deletedIds: ids
  });
};

// Route definitions
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/bulk', createManyUsers);
router.delete('/users/bulk', deleteManyUsers);

// Mount the router
app.use('/api', router);

// Routes
app.use('/api/learners', learnerRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/docs`);
}); 
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const learnerRoutes_1 = __importDefault(require("./routes/learnerRoutes"));
const app = (0, express_1.default)();
const router = (0, express_1.Router)();
const port = 3000;
let users = [];
// Add CORS middleware
app.use((0, cors_1.default)());
// Middleware to parse JSON bodies
app.use(express_1.default.json());
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
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
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
app.get('/', (req, res) => {
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
app.get('/api/test', (req, res) => {
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
const getAllUsers = (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
};
// Get user by ID
const getUserById = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.json(user);
};
// Create user
const createUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        res.status(400).json({ error: 'Name and email are required' });
        return;
    }
    const newUser = {
        id: users.length + 1,
        name,
        email,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    res.status(201).json(newUser);
};
// Update user
const updateUser = (req, res) => {
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
    users[userIndex] = Object.assign(Object.assign({}, users[userIndex]), { name: name || users[userIndex].name, email: email || users[userIndex].email });
    res.json(users[userIndex]);
};
// Delete user
const deleteUser = (req, res) => {
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
const createManyUsers = (req, res) => {
    const { users: newUsers } = req.body;
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
const deleteManyUsers = (req, res) => {
    const { ids } = req.body;
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
app.use('/api/learners', learnerRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/docs`);
});

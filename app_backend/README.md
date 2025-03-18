<<<<<<< HEAD
# TypeScript Express API with Swagger Documentation

This project is a TypeScript-based Express API that includes Swagger documentation for easy API exploration and testing.

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation with Swagger](#api-documentation-with-swagger)
- [Available Endpoints](#available-endpoints)
- [Development](#development)

## Getting Started

This is a RESTful API built with Express.js and TypeScript, featuring automatic API documentation using Swagger/OpenAPI.

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Application

To start the development server:

```bash
npm run start:dev
```

To build and run in production:

```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## API Documentation with Swagger

The API documentation is available through Swagger UI at:

```
http://localhost:3000/docs
```

### Using Swagger UI

1. Navigate to `http://localhost:3000/docs` in your web browser
2. You'll see the Swagger UI interface with all available endpoints
3. Each endpoint includes:
   - HTTP method (GET, POST, PUT, DELETE)
   - Path parameters
   - Request body schema (for POST/PUT requests)
   - Response schemas
   - Example requests and responses

### Testing Endpoints via Swagger UI

1. Click on any endpoint to expand it
2. Click the "Try it out" button
3. Fill in any required parameters or request body
4. Click "Execute" to send the request
5. View the response below

## Available Endpoints

The API includes the following endpoints:

### Base Endpoint
- `GET /` - Returns a hello message

### Test Endpoint
- `GET /api/test` - Returns a test message with timestamp

### Learner Management
- `GET /api/learners` - Get all learners
- `GET /api/learners/{id}` - Get a specific learner by ID
- `POST /api/learners` - Create a new learner
- `PUT /api/learners/{id}` - Update a learner's information
- `DELETE /api/learners/{id}` - Delete a learner

#### Learner Data Structure
```typescript
{
  id: number;              // Auto-generated learner ID
  name: string;           // Learner's full name
  email: string;          // Learner's email address
  course: string;         // Course the learner is enrolled in
  enrollmentDate: string; // Date when the learner enrolled
  status: 'active' | 'completed' | 'dropped'; // Current status
  grade?: string;         // Final grade (if completed)
  progress: number;       // Course completion percentage (0-100)
  lastAccessed: string;   // Last access timestamp
}
```

Each endpoint is documented in detail in the Swagger UI.

## Development

### Adding New Endpoints

When adding new endpoints, use Swagger JSDoc comments to document them. Example:

```typescript
/**
 * @swagger
 * /api/endpoint:
 *   get:
 *     summary: Brief description
 *     description: Detailed description
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 property:
 *                   type: string
 */
```

### Swagger Configuration

The Swagger configuration is located in `src/index.ts`. To modify the Swagger settings, update the `swaggerOptions` object:

```typescript
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
  },
  apis: ['./src/index.ts'], // Path to the API docs
};
```

## Author
> Paul Ndirangu

## License

This project is licensed under the MIT License. 
=======
# TSProjectLab

## Features
1. [FRONTEND] Fetch and Display learners via rest API.
2. [BACKEND] Have an API endpoint that returns learners details in JSON format
>>>>>>> origin/dev

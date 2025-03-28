/**
 * data/learners.ts
 * 
 * This file contains mock data for learners in the application.
 * In a production environment, this would typically be replaced with a database connection.
 */

import { Learner } from '../models/learner';

/**
 * Sample learner data array
 * 
 * This array contains mock data for testing and development purposes.
 * Each object follows the Learner interface structure.
 */
export const learners: Learner[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    coursesEnrolled: ["TypeScript Basics", "Node.js Fundamentals"],
    joinDate: "2024-01-15",
    progress: {
      completedModules: 8,
      totalModules: 12,
      averageScore: 85.5
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    coursesEnrolled: ["API Development", "Database Design"],
    joinDate: "2024-02-20",
    progress: {
      completedModules: 5,
      totalModules: 10,
      averageScore: 92.0
    }
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    coursesEnrolled: ["TypeScript Advanced", "Express Framework"],
    joinDate: "2024-03-05",
    progress: {
      completedModules: 3,
      totalModules: 15,
      averageScore: 78.3
    }
  }
];
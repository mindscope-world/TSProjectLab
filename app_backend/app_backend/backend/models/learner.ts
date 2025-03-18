/**
 * models/learner.ts
 * 
 * This file defines the Learner interface which represents the data structure
 * for learner information in the application.
 */

/**
 * Learner Interface
 * 
 * Defines the structure and data types for learner objects throughout the application.
 * This ensures type safety and consistent data structure when working with learner data.
 */
export interface Learner {
    /** Unique identifier for the learner */
    id: number;
    /** Full name of the learner */
    name: string;
    /** Email address of the learner, used for communication and as a unique identifier */
    email: string;
    /** Array of course names that the learner is currently enrolled in */
    coursesEnrolled: string[];
    /** Date when the learner joined the platform (ISO format string) */
    joinDate: string;
    /** Object containing the learner's progress metrics */
    progress: {
        /** Number of modules the learner has completed */
        completedModules: number;
        /** Total number of modules in the learner's enrolled courses */
        totalModules: number;
        /** The learner's average score across all completed assessments */
        averageScore: number;
    };
}


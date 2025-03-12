// src/models/learner.ts
export interface Learner {
    id: string;
    name: string;
    email: string;
    coursesEnrolled: string[];
    joinDate: string;
    progress: {
        completedModules: number;
        totalModules: number;
        averageScore: number;
    };
}


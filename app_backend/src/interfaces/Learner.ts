export interface Learner {
  id: number;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'dropped';
  grade?: string;
  progress: number; // percentage of course completion
  lastAccessed: string;
} 
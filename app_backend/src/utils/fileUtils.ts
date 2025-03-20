import fs from 'fs';
import path from 'path';
import { Learner } from '../interfaces/Learner';

// Resolve the path to the data directory
// Using process.cwd() ensures we get the project root directory
const LEARNERS_FILE_PATH = path.join(process.cwd(), 'data', 'learners.json');

// Exported for debugging
export const getDataDirectoryPath = (): string => {
  return path.dirname(LEARNERS_FILE_PATH);
};

// Check if data directory exists and output its path
export const checkDataDirectory = (): void => {
  const dataDir = getDataDirectoryPath();
  console.log(`Data directory path: ${dataDir}`);
  console.log(`Data directory exists: ${fs.existsSync(dataDir)}`);
  
  // Check if we have write permissions
  try {
    const testFile = path.join(dataDir, '.test-write-permission');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    console.log('Write permissions: Yes');
  } catch (error) {
    console.error('Write permissions: No', error);
  }
};

// Ensure the data directory exists
const ensureDataDirectory = (): void => {
  console.log(`Creating data directory at: ${path.dirname(LEARNERS_FILE_PATH)}`);
  
  try {
    const dataDir = path.dirname(LEARNERS_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
      console.log('Data directory created successfully');
    } else {
      console.log('Data directory already exists');
    }
  } catch (error) {
    console.error('Error creating data directory:', error);
    throw error;
  }
};

// Save learners to file
export const saveLearners = (learners: Learner[]): void => {
  try {
    ensureDataDirectory();
    fs.writeFileSync(LEARNERS_FILE_PATH, JSON.stringify(learners, null, 2));
    console.log(`Saved ${learners.length} learners to ${LEARNERS_FILE_PATH}`);
  } catch (error) {
    console.error('Error saving learners:', error);
    throw error;
  }
};

// Load learners from file
export const loadLearners = (): Learner[] => {
  try {
    ensureDataDirectory();
    
    if (!fs.existsSync(LEARNERS_FILE_PATH)) {
      console.log(`Learners file not found at ${LEARNERS_FILE_PATH}`);
      return [];
    }

    console.log(`Loading learners from ${LEARNERS_FILE_PATH}`);
    const fileContent = fs.readFileSync(LEARNERS_FILE_PATH, 'utf-8');
    const learners = JSON.parse(fileContent);
    console.log(`Loaded ${learners.length} learners`);
    return learners;
  } catch (error) {
    console.error('Error loading learners:', error);
    return [];
  }
}; 
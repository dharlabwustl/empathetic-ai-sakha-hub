
import { TestQuestion, TestDescription } from '../../types';

// Test descriptions for stress test
export const stressTestDescriptions: TestDescription = {
  title: "Stress Level Test",
  description: "Measure how well you perform under time pressure",
  instructions: [
    "Face 8 pattern recognition challenges",
    "Each question has a 15-second time limit",
    "Try to maintain focus despite distractions",
    "Answer as quickly and accurately as possible"
  ],
  duration: "2-3 minutes",
  questionCount: 8
};

// Function to get questions based on exam type
export const getStressTestQuestions = (examType: string): TestQuestion[] => {
  try {
    // Dynamic import based on exam type
    switch (examType) {
      case 'default':
        return require('./defaultStressQuestions').defaultStressQuestions;
      case 'iit':
        return require('./iitStressQuestions').iitStressQuestions;
      case 'neet':
        return require('./neetStressQuestions').neetStressQuestions;
      case 'upsc':
        return require('./upscStressQuestions').upscStressQuestions;
      case 'bank':
        return require('./bankStressQuestions').bankStressQuestions;
      case 'cat':
        return require('./catStressQuestions').catStressQuestions;
      default:
        return require('./defaultStressQuestions').defaultStressQuestions;
    }
  } catch (error) {
    console.error(`Error loading stress test questions for ${examType}:`, error);
    return require('./defaultStressQuestions').defaultStressQuestions;
  }
};

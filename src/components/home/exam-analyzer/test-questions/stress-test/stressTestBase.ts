
import { TestQuestion } from '../../types';
import { defaultStressQuestions } from './defaultStressQuestions';
import { iitStressQuestions } from './iitStressQuestions';
import { neetStressQuestions } from './neetStressQuestions';
import { upscStressQuestions } from './upscStressQuestions';
import { catStressQuestions } from './catStressQuestions';
import { bankStressQuestions } from './bankStressQuestions';

/**
 * Helper function to get stress test questions based on the selected exam
 */
export const getStressTestQuestions = (selectedExam: string): TestQuestion[] => {
  try {
    let questions: TestQuestion[] = [];
    
    switch (selectedExam) {
      case 'iit-jee':
        questions = iitStressQuestions;
        break;
      case 'neet':
        questions = neetStressQuestions;
        break;
      case 'upsc':
        questions = upscStressQuestions;
        break;
      case 'cat':
        questions = catStressQuestions;
        break;
      case 'bank-po':
        questions = bankStressQuestions;
        break;
      default:
        questions = defaultStressQuestions;
    }
    
    return questions;
  } catch (error) {
    console.error(`Error loading stress test questions for ${selectedExam}:`, error);
    // Fallback to default questions in case of error
    return defaultStressQuestions;
  }
};

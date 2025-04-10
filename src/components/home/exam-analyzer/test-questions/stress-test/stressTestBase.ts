
import { TestQuestion } from '../../types';
import { defaultStressQuestions } from './defaultStressQuestions';
import { iitStressQuestions } from './iitStressQuestions';
import { neetStressQuestions } from './neetStressQuestions';
import { upscStressQuestions } from './upscStressQuestions';
import { catStressQuestions } from './catStressQuestions';
import { bankStressQuestions } from './bankStressQuestions';

// Visual questions that will be added to all exam types
const visualQuestions: TestQuestion[] = [
  {
    id: "visual-pattern-1",
    question: "Which image continues the pattern?",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    timeLimit: 15,
    explanation: "The pattern shows rotation and color change in a predictable sequence.",
    type: "pattern-recognition",
    imageUrl: "https://placehold.co/600x400/e2e8f0/1e293b?text=Visual+Pattern+1",
    complexityLevel: 2
  },
  {
    id: "visual-memory-1",
    question: "Study this image for 5 seconds, then answer: How many circles were in the image?",
    options: ["3", "5", "7", "9"],
    correctAnswer: "7",
    timeLimit: 15,
    explanation: "The image contained 7 circles of varying sizes.",
    type: "memory-recall",
    imageUrl: "https://placehold.co/600x400/e2e8f0/1e293b?text=Visual+Memory+Test",
    complexityLevel: 3
  },
  {
    id: "visual-analysis-1",
    question: "Which element doesn't belong in this group?",
    options: ["Top left", "Top right", "Bottom left", "Bottom right"],
    correctAnswer: "Bottom right",
    timeLimit: 20,
    explanation: "All elements share a similar pattern except the bottom right, which breaks the sequence.",
    type: "pattern-recognition",
    imageUrl: "https://placehold.co/600x400/e2e8f0/1e293b?text=Visual+Analysis+Test",
    complexityLevel: 4
  }
];

/**
 * Helper function to get stress test questions based on the selected exam
 */
export const getStressTestQuestions = (selectedExam: string): TestQuestion[] => {
  try {
    let questions: TestQuestion[] = [];
    
    switch (selectedExam) {
      case 'iit-jee':
        questions = [...iitStressQuestions, ...visualQuestions];
        break;
      case 'neet':
        questions = [...neetStressQuestions, ...visualQuestions];
        break;
      case 'upsc':
        questions = [...upscStressQuestions, ...visualQuestions];
        break;
      case 'cat':
        questions = [...catStressQuestions, ...visualQuestions];
        break;
      case 'bank-po':
        questions = [...bankStressQuestions, ...visualQuestions];
        break;
      default:
        questions = [...defaultStressQuestions, ...visualQuestions];
    }
    
    // Sort questions by complexity level if available
    questions.sort((a, b) => {
      const levelA = a.complexityLevel || 1;
      const levelB = b.complexityLevel || 1;
      return levelA - levelB;
    });
    
    return questions;
  } catch (error) {
    console.error(`Error loading stress test questions for ${selectedExam}:`, error);
    // Fallback to default questions in case of error
    return [...defaultStressQuestions, ...visualQuestions];
  }
};

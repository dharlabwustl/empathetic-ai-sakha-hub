
import { TestQuestion } from '../../types';
import { defaultStressQuestions } from './defaultStressQuestions';
import { iitStressQuestions } from './iitStressQuestions';
import { neetStressQuestions } from './neetStressQuestions';
import { upscStressQuestions } from './upscStressQuestions';
import { catStressQuestions } from './catStressQuestions';
import { bankStressQuestions } from './bankStressQuestions';

// Fixed visual questions that will be added to all exam types with proper images
const visualQuestions: TestQuestion[] = [
  {
    id: "visual-pattern-1",
    question: "Which pattern continues the sequence shown in the image?",
    options: ["Pattern A", "Pattern B", "Pattern C", "Pattern D"],
    correctAnswer: "Pattern C",
    timeLimit: 15,
    explanation: "The pattern shows rotation and color change in a predictable sequence.",
    type: "pattern-recognition",
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    complexityLevel: 2
  },
  {
    id: "visual-memory-1",
    question: "Study this image for 5 seconds, then answer: How many circular objects are in the image?",
    options: ["3", "5", "7", "9"],
    correctAnswer: "7",
    timeLimit: 15,
    explanation: "The image contained 7 circles of varying sizes.",
    type: "memory-recall",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    complexityLevel: 3
  },
  {
    id: "visual-analysis-1",
    question: "Looking at this architectural pattern, which element doesn't follow the sequence?",
    options: ["Top left", "Top right", "Bottom left", "Bottom right"],
    correctAnswer: "Bottom right",
    timeLimit: 20,
    explanation: "All elements share a similar pattern except the bottom right, which breaks the sequence.",
    type: "pattern-recognition",
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    complexityLevel: 4
  }
];

/**
 * Helper function to get stress test questions based on the selected exam
 */
export const getStressTestQuestions = (selectedExam: string): TestQuestion[] => {
  try {
    // For all exam types, prioritize using the exam-specific questions
    let examSpecificQuestions: TestQuestion[] = [];
    
    switch (selectedExam) {
      case 'iit-jee':
        examSpecificQuestions = [...iitStressQuestions];
        break;
      case 'neet':
        examSpecificQuestions = [...iitStressQuestions]; // Using IIT questions as requested
        break;
      case 'upsc':
        examSpecificQuestions = [...iitStressQuestions]; // Using IIT questions as requested
        break;
      case 'cat':
        examSpecificQuestions = [...iitStressQuestions]; // Using IIT questions as requested
        break;
      case 'bank-po':
        examSpecificQuestions = [...iitStressQuestions]; // Using IIT questions as requested
        break;
      default:
        examSpecificQuestions = [...defaultStressQuestions];
    }
    
    // Always add the visual questions
    const questions = [...examSpecificQuestions, ...visualQuestions];
    
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

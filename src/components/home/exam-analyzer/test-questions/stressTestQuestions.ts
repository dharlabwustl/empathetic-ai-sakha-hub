
import { getStressTestQuestions as getBaseStressQuestions } from './stress-test/stressTestBase';
import { TestQuestion } from '../types';
import { ExamGoal } from '@/types/user/exam';

// Function to get all cognitive test sets for a specific exam
export const getCognitiveTestSets = (examType: string): number[] => {
  // For each exam, we provide 3 cognitive test sets
  return [1, 2, 3];
};

// Modified function to get stress test questions with set number
export const getStressTestQuestions = (examType: string, setNumber: number = 1): TestQuestion[] => {
  const baseQuestions = getBaseStressQuestions(examType);
  
  // Modify questions based on set number to create variety
  const modifiedQuestions = baseQuestions.map(q => {
    // Deep clone the question to avoid mutation
    const newQuestion = JSON.parse(JSON.stringify(q));
    
    // Adjust question based on the set number
    if (setNumber === 2) {
      newQuestion.id = `set2_${newQuestion.id}`;
      // Slight modifications to make it different from set 1
      newQuestion.question = newQuestion.question.replace('?', ` for ${examType}?`);
      if (newQuestion.timeLimit) {
        // Make set 2 slightly more challenging with less time
        newQuestion.timeLimit = Math.max(5, newQuestion.timeLimit - 2);
      }
    } else if (setNumber === 3) {
      newQuestion.id = `set3_${newQuestion.id}`;
      // More substantial modifications for set 3
      newQuestion.question = `Advanced ${examType} question: ${newQuestion.question}`;
      if (newQuestion.timeLimit) {
        // Make set 3 even more challenging
        newQuestion.timeLimit = Math.max(5, newQuestion.timeLimit - 3);
      }
      if (newQuestion.complexityLevel) {
        // Increase complexity for set 3
        newQuestion.complexityLevel = Math.min(5, newQuestion.complexityLevel + 1);
      }
    }
    
    return newQuestion;
  });
  
  return modifiedQuestions;
};

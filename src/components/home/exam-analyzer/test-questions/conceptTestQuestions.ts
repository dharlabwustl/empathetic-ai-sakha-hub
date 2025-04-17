
import { TestQuestion, SubjectTopic } from '../types';

// Function to get concept test questions for a specific exam and subject
export const getConceptTestQuestions = (examType: string, subject: string): TestQuestion[] => {
  // Default questions if exam/subject specific ones are not available
  const defaultQuestions: TestQuestion[] = [
    {
      id: `default1-${subject.substring(0, 3).toLowerCase()}`,
      question: `This is a sample question for ${subject} under ${examType}`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
      timeLimit: 60,
      explanation: 'This is an explanation for the sample question',
      difficulty: 'medium',
      complexityLevel: 2,
    },
    // Add more default questions here
  ];

  // Return default questions - in a real implementation, you'd return specific questions
  return defaultQuestions;
};

// Function to get concept test questions with specific set number
export const getConceptTestQuestionsByExam = (
  examType: string, 
  subject: string,
  setNumber: number = 1
): TestQuestion[] => {
  // Add logic here to return different question sets based on the setNumber
  const defaultQuestions = getConceptTestQuestions(examType, subject);
  
  // Just return the default questions for now, but in a real implementation
  // you'd have different sets of questions for each set number
  return defaultQuestions.map(q => ({
    ...q,
    id: `${q.id}-set${setNumber}`
  }));
};

// Function to get available subjects for a specific exam
export const getAvailableSubjects = (examType: string): string[] => {
  // Define subjects by exam type
  const examSubjects: Record<string, string[]> = {
    'UPSC': ['History', 'Geography', 'Political Science', 'Economics', 'Environment'],
    'JEE': ['Physics', 'Chemistry', 'Mathematics'],
    'NEET': ['Physics', 'Chemistry', 'Biology'],
    'CAT': ['Quantitative Aptitude', 'Verbal Ability', 'Data Interpretation', 'Logical Reasoning'],
    'Bank Exams': ['Reasoning', 'Quantitative Aptitude', 'English', 'General Awareness', 'Computer Knowledge'],
    'GATE': ['Engineering Mathematics', 'General Aptitude', 'Subject Specific'],
  };
  
  return examSubjects[examType] || ['General Knowledge', 'Aptitude'];
};

// Function to get concept topics
export const getConceptTopics = (examType: string): SubjectTopic[] => {
  const subjects = getAvailableSubjects(examType);
  
  // Convert subjects to SubjectTopic format
  return subjects.map((subject, index) => ({
    id: `topic-${index}`,
    subject,
    topics: 5, // 5 questions per subject
  }));
};

// Export other functions as needed

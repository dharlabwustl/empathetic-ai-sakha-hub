
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

  // In a real implementation, we'd have specific questions per exam and subject
  // For now, we'll generate unique questions based on the exam and subject
  const specificQuestions: TestQuestion[] = [
    {
      id: `${examType}-${subject}-q1`,
      question: `${subject} concept question 1 for ${examType} exam`,
      options: [`${subject} Option A`, `${subject} Option B`, `${subject} Option C`, `${subject} Option D`],
      correctAnswer: `${subject} Option A`,
      timeLimit: 60,
      explanation: `Explanation for ${subject} question in ${examType}`,
      difficulty: 'medium',
      complexityLevel: 2,
      imageUrl: subject === 'Biology' || subject === 'Geography' ? '/placeholder.svg' : undefined
    },
    {
      id: `${examType}-${subject}-q2`,
      question: `${subject} concept question 2 for ${examType} exam`,
      options: [`${subject} Option W`, `${subject} Option X`, `${subject} Option Y`, `${subject} Option Z`],
      correctAnswer: `${subject} Option X`,
      timeLimit: 60,
      explanation: `Explanation for second ${subject} question in ${examType}`,
      difficulty: 'hard',
      complexityLevel: 3,
      imageUrl: subject === 'Biology' || subject === 'Chemistry' ? '/placeholder.svg' : undefined
    }
  ];

  return specificQuestions.length > 0 ? specificQuestions : defaultQuestions;
};

// Function to get concept test questions with specific set number
export const getConceptTestQuestionsByExam = (
  examType: string, 
  subject: string,
  setNumber: number = 1
): TestQuestion[] => {
  // Get base questions
  const baseQuestions = getConceptTestQuestions(examType, subject);
  
  // Create different question sets based on the set number
  if (setNumber === 1) {
    return baseQuestions.map(q => ({
      ...q,
      id: `${q.id}-set1`,
      question: `Set 1: ${q.question}`
    }));
  } else if (setNumber === 2) {
    return baseQuestions.map(q => ({
      ...q,
      id: `${q.id}-set2`,
      question: `Set 2: ${q.question}`,
      options: q.options.map(opt => `Alt: ${opt}`),
      correctAnswer: `Alt: ${q.correctAnswer}`,
      difficulty: q.difficulty === 'medium' ? 'hard' : 'medium'
    }));
  } else {
    return baseQuestions.map(q => ({
      ...q,
      id: `${q.id}-set3`,
      question: `Set 3: ${q.question}`,
      options: q.options.map(opt => `Adv: ${opt}`),
      correctAnswer: `Adv: ${q.correctAnswer}`,
      complexityLevel: Math.min(5, (q.complexityLevel || 1) + 1)
    }));
  }
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
    'CLAT': ['Legal Reasoning', 'Logical Reasoning', 'English', 'General Knowledge', 'Mathematics'],
    'MBA': ['Quantitative Analysis', 'Data Interpretation', 'Logical Reasoning', 'Verbal Ability'],
    'CUET': ['Domain Subject', 'General Test', 'Language Proficiency']
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


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

  // Generate subject-specific questions (5 per subject)
  const specificQuestions: TestQuestion[] = [];
  
  // Create 5 questions per subject with unique content
  for (let i = 1; i <= 5; i++) {
    specificQuestions.push({
      id: `${examType}-${subject}-q${i}`,
      question: `${subject} concept question ${i} for ${examType} exam: What is the correct approach to solve this problem?`,
      options: [
        `${subject} Answer Option A for Q${i}`, 
        `${subject} Answer Option B for Q${i}`, 
        `${subject} Answer Option C for Q${i}`, 
        `${subject} Answer Option D for Q${i}`
      ],
      correctAnswer: `${subject} Answer Option ${i % 2 === 0 ? 'A' : 'B'} for Q${i}`,
      timeLimit: 60,
      explanation: `Explanation for ${subject} question ${i} in ${examType}: This is the correct approach because...`,
      difficulty: i > 3 ? 'hard' : 'medium',
      complexityLevel: i > 3 ? 3 : 2,
      imageUrl: (subject === 'Biology' || subject === 'Chemistry' || subject === 'Physics') && i % 2 === 0 ? '/placeholder.svg' : undefined
    });
  }

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
      question: `${q.question}`
    }));
  } else if (setNumber === 2) {
    return baseQuestions.map(q => ({
      ...q,
      id: `${q.id}-set2`,
      question: `Intermediate: ${q.question}`,
      options: q.options.map(opt => `${opt.split(' for ')[0]} alt for Q${q.id.slice(-1)}`),
      correctAnswer: q.correctAnswer.replace(/for Q\d+/g, `alt for Q${q.id.slice(-1)}`),
      difficulty: q.difficulty === 'medium' ? 'hard' : 'medium'
    }));
  } else {
    return baseQuestions.map(q => ({
      ...q,
      id: `${q.id}-set3`,
      question: `Advanced: ${q.question}`,
      options: q.options.map(opt => `${opt.split(' for ')[0]} adv for Q${q.id.slice(-1)}`),
      correctAnswer: q.correctAnswer.replace(/for Q\d+/g, `adv for Q${q.id.slice(-1)}`),
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

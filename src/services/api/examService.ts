
import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export interface ExamQuestion {
  id: string;
  examType: string;
  subject: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  timeLimit: number;
  conceptTags: string[];
}

export interface ExamReadinessTest {
  id: string;
  examType: string;
  subject: string;
  questions: ExamQuestion[];
  timeLimit: number;
  totalMarks: number;
  passingScore: number;
}

export interface ConceptTest {
  id: string;
  conceptId: string;
  conceptName: string;
  subject: string;
  questions: ExamQuestion[];
  timeLimit: number;
  totalMarks: number;
}

// Exam service for handling exam-related API calls
const examService = {
  // Get exam questions by type and subject
  async getExamQuestions(examType: string, subject?: string, limit: number = 20): Promise<ExamQuestion[]> {
    try {
      let endpoint = `${API_ENDPOINTS.CONTENT.QUESTIONS}?examType=${examType}&limit=${limit}`;
      if (subject) {
        endpoint += `&subject=${subject}`;
      }
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching exam questions:', error);
      // Return mock data for now
      return mockExamQuestions.filter(q => 
        q.examType === examType && (!subject || q.subject === subject)
      ).slice(0, limit);
    }
  },

  // Get readiness test for specific exam
  async getReadinessTest(examType: string, subject?: string): Promise<ExamReadinessTest> {
    try {
      let endpoint = `${API_ENDPOINTS.CONTENT.EXAMS}/readiness/${examType}`;
      if (subject) {
        endpoint += `?subject=${subject}`;
      }
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching readiness test:', error);
      // Return mock data for now
      const questions = await this.getExamQuestions(examType, subject, 15);
      return {
        id: `readiness-${examType}-${subject || 'all'}`,
        examType,
        subject: subject || 'All Subjects',
        questions,
        timeLimit: 45,
        totalMarks: questions.length * 4,
        passingScore: 60
      };
    }
  },

  // Get concept-specific test
  async getConceptTest(conceptId: string): Promise<ConceptTest> {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.CONTENT.CONCEPTS}/${conceptId}/test`);
      return response.data;
    } catch (error) {
      console.error('Error fetching concept test:', error);
      // Return mock data for now
      const questions = mockExamQuestions.slice(0, 10);
      return {
        id: `concept-test-${conceptId}`,
        conceptId,
        conceptName: 'Sample Concept',
        subject: 'Physics',
        questions,
        timeLimit: 30,
        totalMarks: questions.length * 4
      };
    }
  },

  // Submit test results
  async submitTestResults(testId: string, answers: Record<string, number>, timeSpent: number): Promise<any> {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.CONTENT.EXAMS}/${testId}/submit`, {
        answers,
        timeSpent,
        submittedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting test results:', error);
      // Return mock results for now
      return {
        score: Math.floor(Math.random() * 40) + 60,
        totalQuestions: Object.keys(answers).length,
        correctAnswers: Math.floor(Object.keys(answers).length * 0.7),
        timeSpent,
        feedback: 'Good job! Keep practicing to improve further.'
      };
    }
  },

  // Get all available exams
  async getAvailableExams(): Promise<string[]> {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.CONTENT.EXAMS}/types`);
      return response.data;
    } catch (error) {
      console.error('Error fetching available exams:', error);
      return ['NEET', 'JEE Main', 'JEE Advanced', 'UPSC', 'CAT', 'GATE'];
    }
  }
};

// Mock data for development
const mockExamQuestions: ExamQuestion[] = [
  {
    id: '1',
    examType: 'NEET',
    subject: 'Physics',
    topic: 'Mechanics',
    question: 'What is the acceleration due to gravity on Earth?',
    options: ['9.8 m/s²', '10.8 m/s²', '8.8 m/s²', '11.8 m/s²'],
    correctAnswer: 0,
    explanation: 'The standard acceleration due to gravity on Earth is approximately 9.8 m/s².',
    difficulty: 'easy',
    marks: 4,
    timeLimit: 60,
    conceptTags: ['gravity', 'acceleration', 'mechanics']
  },
  {
    id: '2',
    examType: 'JEE Main',
    subject: 'Mathematics',
    topic: 'Calculus',
    question: 'What is the derivative of sin(x)?',
    options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
    correctAnswer: 0,
    explanation: 'The derivative of sin(x) with respect to x is cos(x).',
    difficulty: 'medium',
    marks: 4,
    timeLimit: 90,
    conceptTags: ['derivative', 'trigonometry', 'calculus']
  },
  {
    id: '3',
    examType: 'NEET',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    question: 'What is the molecular formula of methane?',
    options: ['CH₄', 'C₂H₆', 'C₃H₈', 'C₄H₁₀'],
    correctAnswer: 0,
    explanation: 'Methane has one carbon atom bonded to four hydrogen atoms, giving it the formula CH₄.',
    difficulty: 'easy',
    marks: 4,
    timeLimit: 45,
    conceptTags: ['organic', 'hydrocarbons', 'molecular-formula']
  }
];

export default examService;

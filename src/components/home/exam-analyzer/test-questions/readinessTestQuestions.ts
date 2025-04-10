
import { TestQuestion } from '../types';

export const readinessTestQuestions: Record<string, TestQuestion[]> = {
  default: [
    {
      id: 'rt1',
      question: 'How many hours do you study per day on average?',
      options: ['Less than 1 hour', '1-2 hours', '3-4 hours', 'More than 4 hours'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt2',
      question: 'Have you completed going through the entire syllabus at least once?',
      options: ['Not started yet', 'Less than 25% complete', '25-75% complete', 'More than 75% complete'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt3',
      question: 'How many practice tests have you taken so far?',
      options: ['None', '1-3 tests', '4-10 tests', 'More than 10 tests'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt4',
      question: 'How do you track your progress and identify weak areas?',
      options: ['I don\'t track systematically', 'I keep mental notes', 'I use a simple diary/spreadsheet', 'I use specialized apps/tools'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt5',
      question: 'How often do you revise previously studied topics?',
      options: ['Rarely or never', 'Only before tests', 'Weekly', 'Daily spaced repetition'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt6',
      question: 'How do you manage your time during practice tests?',
      options: ['I don\'t time myself', 'I often run out of time', 'I sometimes finish just in time', 'I consistently finish with time to spare'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt7',
      question: 'What is your current study plan structure?',
      options: ['No specific plan', 'Basic outline of topics', 'Weekly schedule with goals', 'Comprehensive daily plan with prioritized topics'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt8',
      question: 'How familiar are you with the exam pattern and marking scheme?',
      options: ['Not familiar', 'Somewhat familiar', 'Familiar with basics', 'Very familiar with all details'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt9',
      question: 'When you encounter difficult topics, what do you typically do?',
      options: ['Skip them', 'Try briefly and move on if difficult', 'Spend extra time but move on eventually', 'Work until mastered before moving on'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt10',
      question: 'What resources do you use for your exam preparation?',
      options: ['Basic textbooks only', 'Textbooks and some online content', 'Various books, online courses, and practice tests', 'Comprehensive resources including coaching, specialized materials, and expert guidance'],
      timeLimit: 30,
      type: 'self-assessment'
    },
  ],
  
  // IIT-JEE specific questions
  iit: [
    {
      id: 'rt-iit1',
      question: 'How confident are you in solving JEE Advanced level problems in Physics?',
      options: ['Not confident at all', 'Somewhat confident with basic concepts', 'Confident with most topics', 'Very confident across all topics'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-iit2',
      question: 'How many previous years\' JEE papers have you solved completely?',
      options: ['None', '1-5 papers', '6-15 papers', 'More than 15 papers'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-iit3',
      question: 'Have you completed NCERT books thoroughly for all three subjects?',
      options: ['Not started yet', 'Completed for 1 subject', 'Completed for 2 subjects', 'Completed for all 3 subjects'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-iit4',
      question: 'How well can you solve numerical problems without using a calculator?',
      options: ['Struggle with most calculations', 'Can solve basic calculations', 'Comfortable with most calculations', 'Highly proficient with complex calculations'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-iit5',
      question: 'How regularly do you attempt mock JEE tests under timed conditions?',
      options: ['Never tried', 'Once a month or less', '2-3 times a month', 'Weekly or more frequently'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-iit6',
      question: 'How well do you understand the integration between different chapters in Mathematics?',
      options: ['I study chapters in isolation', 'Basic understanding of connections', 'Good grasp of most relationships', 'Deep understanding of how concepts interconnect'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-iit7',
      question: 'How familiar are you with organic chemistry reaction mechanisms?',
      options: ['Barely familiar', 'Know the basics', 'Comfortable with most mechanisms', 'Expert level understanding'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-iit8',
      question: 'How often do you practice multi-concept problems that combine different topics?',
      options: ['Rarely or never', 'Occasionally', 'Regularly', 'As a primary focus of my studies'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-iit9',
      question: 'How well can you identify shortcuts and efficient approaches to solve problems quickly?',
      options: ['I usually follow standard methods', 'Sometimes find shortcuts', 'Often identify efficient approaches', 'Consistently find optimal solution methods'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-iit10',
      question: 'How effectively do you manage negative marking strategy in your test attempts?',
      options: ['I guess frequently', 'I avoid questions I\'m unsure about', 'I have a basic strategy for uncertain questions', 'I have a sophisticated risk assessment approach'],
      timeLimit: 30,
      type: 'self-assessment'
    },
  ],
  
  // NEET specific questions
  neet: [
    {
      id: 'rt-neet1',
      question: 'How thoroughly have you studied NCERT Biology textbooks?',
      options: ['Partially covered', 'Read once but not in detail', 'Studied thoroughly once', 'Multiple thorough revisions with notes'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-neet2',
      question: 'How comfortable are you with memorizing biological terminology and classifications?',
      options: ['Find it very difficult', 'Can memorize but often forget', 'Reasonably good retention', 'Excellent memorization and recall'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-neet3',
      question: 'How well can you interpret and analyze diagrams and visual information in Biology?',
      options: ['Struggle with most diagrams', 'Understand basic diagrams', 'Comfortable with most diagrams', 'Can analyze complex diagrams easily'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-neet4',
      question: 'How regularly do you practice NEET-style MCQs?',
      options: ['Rarely', 'Once a week', 'Several times a week', 'Daily practice sessions'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-neet5',
      question: 'How comfortable are you with organic chemistry reaction mechanisms?',
      options: ['Very uncomfortable', 'Know the basics', 'Comfortable with most', 'Very comfortable with all'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-neet6',
      question: 'How well do you understand and remember physiological processes in human biology?',
      options: ['Basic understanding', 'Understand but forget details', 'Good understanding of most processes', 'Comprehensive understanding with details'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-neet7',
      question: 'How many full-length NEET mock tests have you completed?',
      options: ['None', '1-5 tests', '6-15 tests', 'More than 15 tests'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-neet8',
      question: 'How confident are you in solving numerical problems in Physics and Chemistry?',
      options: ['Not confident', 'Somewhat confident', 'Confident in most cases', 'Very confident'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-neet9',
      question: 'How do you approach previous years\' NEET questions?',
      options: ['Haven\'t tried many', 'Try randomly as practice', 'Solve systematically by topic', 'Analyze patterns and create focused practice sets'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-neet10',
      question: 'How effective is your time management strategy for the NEET exam?',
      options: ['No specific strategy', 'Basic allocation by subject', 'Detailed section-wise planning', 'Optimized strategy based on strengths and question difficulty'],
      timeLimit: 30,
      type: 'self-assessment'
    },
  ],
  
  // Add more exam-specific question sets as needed
};

export const getReadinessTestQuestions = (examType: string): TestQuestion[] => {
  return readinessTestQuestions[examType] || readinessTestQuestions.default;
};

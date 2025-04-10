
import { TestResults, ExamType, UserAnswer } from './types';

export const examTypes: ExamType[] = [
  { value: 'iit', label: 'IIT-JEE' },
  { value: 'neet', label: 'NEET' },
  { value: 'upsc', label: 'UPSC' },
  { value: 'bank', label: 'Bank PO' },
  { value: 'cat', label: 'MBA/CAT' },
  { value: 'cuet', label: 'CUET' },
  { value: 'clat', label: 'CLAT' },
];

export function calculateStressTestResults(answers: UserAnswer[]): TestResults {
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const score = Math.round((correctAnswers / answers.length) * 100);
  
  let level = '';
  let analysis = '';
  const strengths = [];
  const improvements = [];
  
  if (score >= 80) {
    level = 'Excellent';
    analysis = 'You handle pressure extremely well. Your ability to focus and solve problems quickly is excellent.';
    strengths.push('Outstanding focus under pressure', 'Excellent pattern recognition');
    improvements.push('Maintain this level through regular practice');
  } else if (score >= 60) {
    level = 'Good';
    analysis = 'You handle stress reasonably well, but there\'s room for improvement in maintaining focus under pressure.';
    strengths.push('Good focus under time constraints', 'Effective problem-solving');
    improvements.push('Work on reaction speed', 'Practice memory recall techniques');
  } else {
    level = 'Needs Improvement';
    analysis = 'You may find it challenging to maintain focus under pressure. Regular practice can help improve this skill.';
    strengths.push('Basic pattern recognition abilities');
    improvements.push('Practice timed exercises regularly', 'Work on stress management techniques');
  }
  
  return {
    score,
    level,
    analysis,
    strengths,
    improvements,
  };
}

export function calculateReadinessTestResults(answers: UserAnswer[]): TestResults {
  let score = 0;
  answers.forEach((answer) => {
    if (answer.answer.includes('More than')) score += 10;
    else if (answer.answer.includes('detailed') || answer.answer.includes('comprehensive')) score += 10;
    else if (answer.answer.includes('Daily') || answer.answer.includes('Frequently')) score += 10;
    else if (answer.answer.includes('75%') || answer.answer.includes('Very')) score += 10;
    else if (answer.answer.includes('3-4') || answer.answer.includes('6-15')) score += 7;
    else if (answer.answer.includes('Confident')) score += 7;
    else score += 5;
  });
  
  score = Math.min(Math.round(score / answers.length * 10), 100);
  
  let level = '';
  let analysis = '';
  const strengths = [];
  const improvements = [];
  
  if (score >= 80) {
    level = 'Excellent';
    analysis = 'Your study habits and preparation level are excellent. You have a structured approach to learning.';
    strengths.push('Strong preparation routine', 'Consistent study habits');
    improvements.push('Focus on targeted revision of weak areas');
  } else if (score >= 60) {
    level = 'Good';
    analysis = 'Your preparation level is good, but some areas need attention to optimize your study effectiveness.';
    strengths.push('Good content coverage', 'Regular study habits');
    improvements.push('Increase practice test frequency', 'Develop a more structured study plan');
  } else {
    level = 'Needs Improvement';
    analysis = 'Your preparation requires a more structured approach. Focus on developing consistent study habits.';
    strengths.push('Awareness of preparation needs');
    improvements.push('Create a detailed study schedule', 'Increase daily study hours');
  }
  
  return {
    score,
    level,
    analysis,
    strengths,
    improvements,
  };
}

export function calculateConceptTestResults(answers: UserAnswer[]): TestResults {
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const score = Math.round((correctAnswers / answers.length) * 100);
  
  let level = '';
  let analysis = '';
  const strengths = [];
  const improvements = [];
  
  if (score >= 80) {
    level = 'Excellent';
    analysis = 'You have excellent mastery of the key concepts. Your understanding is clear and comprehensive.';
    strengths.push('Strong conceptual understanding', 'Excellent application of concepts');
    improvements.push('Challenge yourself with advanced problems');
  } else if (score >= 60) {
    level = 'Good';
    analysis = 'You have good concept mastery with some areas needing reinforcement.';
    strengths.push('Good theoretical understanding', 'Solid application of concepts');
    improvements.push('Focus on specific weak areas', 'Practice more application questions');
  } else {
    level = 'Needs Improvement';
    analysis = 'Your concept mastery needs improvement. Focus on strengthening your understanding of fundamental principles.';
    strengths.push('Basic conceptual awareness');
    improvements.push('Revisit fundamental concepts', 'Increase practice with guided examples');
  }
  
  return {
    score,
    level,
    analysis,
    strengths,
    improvements,
  };
}

export function calculateOverallResults(stressResults: TestResults, readinessResults: TestResults, conceptResults: TestResults, selectedExam: string): TestResults {
  const overallScore = Math.floor((stressResults.score + readinessResults.score + conceptResults.score) / 3);
  
  const level = overallScore >= 80 ? 'Excellent' : overallScore >= 70 ? 'Good' : overallScore >= 60 ? 'Average' : 'Needs Improvement';
  const analysis = `Your overall preparation is ${overallScore >= 80 ? 'excellent' : overallScore >= 70 ? 'good' : overallScore >= 60 ? 'average' : 'below average'} for ${examTypes.find(e => e.value === selectedExam)?.label} preparation.`;
  
  return {
    score: overallScore,
    level,
    analysis,
    strengths: [
      ...new Set([...stressResults.strengths, ...readinessResults.strengths, ...conceptResults.strengths].slice(0, 3))
    ],
    improvements: [
      ...new Set([...stressResults.improvements, ...readinessResults.improvements, ...conceptResults.improvements].slice(0, 3))
    ],
  };
}

export function getDialogTitle(currentTest: string): string {
  switch (currentTest) {
    case 'intro':
      return 'Exam Readiness Analyzer';
    case 'stress':
      return 'Stress Level Test';
    case 'readiness':
      return 'Exam Readiness Test';
    case 'concept':
      return 'Concept Mastery Test';
    case 'report':
      return 'Your Comprehensive Analysis';
    default:
      return 'Exam Readiness Analyzer';
  }
}

export function getDialogDescription(currentTest: string): string | undefined {
  switch (currentTest) {
    case 'intro':
      return 'Complete these tests to assess your exam preparation level';
    case 'stress':
      return 'Test your ability to focus under pressure with time-limited questions';
    case 'readiness':
      return 'Evaluate your current study habits and preparation strategy';
    case 'concept':
      return 'Check your mastery of key concepts required for your exam';
    case 'report':
      return undefined;
    default:
      return 'Complete these tests to assess your preparation level';
  }
}

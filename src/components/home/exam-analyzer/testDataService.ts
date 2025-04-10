
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
  // Filter only answers that were answered (not timed out)
  const answeredQuestions = answers.filter(a => a.answer !== "TIMEOUT");
  const correctAnswers = answeredQuestions.filter(a => a.isCorrect).length;
  const totalAnswered = answeredQuestions.length;
  
  // Calculate score based on correct answers and response time
  let score = Math.round((correctAnswers / answers.length) * 100);
  
  // Adjust score based on average response time (faster responses get higher scores)
  const avgResponseTime = answeredQuestions.length > 0 ? 
    answeredQuestions.reduce((sum, a) => sum + a.timeToAnswer, 0) / answeredQuestions.length : 15;
  
  // Calculate time efficiency - higher score for faster responses
  const timeEfficiency = Math.max(0, Math.min(20, 20 * (1 - (avgResponseTime / 15))));
  
  // Adjust score by time efficiency (up to 20% boost for very fast responses)
  score = Math.min(100, Math.round(score * (1 + timeEfficiency / 100)));
  
  let level = '';
  let analysis = '';
  const strengths = [];
  const improvements = [];
  
  if (score >= 80) {
    level = 'Excellent';
    analysis = 'You handle pressure extremely well. Your ability to focus and solve problems quickly under time constraints is outstanding.';
    strengths.push('Outstanding focus under time pressure', 'Excellent pattern recognition', 'Quick and accurate decision making');
    improvements.push('Maintain this level through regular practice', 'Continue challenging yourself with increasingly difficult problems');
  } else if (score >= 60) {
    level = 'Good';
    analysis = 'You handle stress reasonably well, but there\'s room for improvement in maintaining focus and speed under pressure.';
    strengths.push('Good focus under time constraints', 'Effective problem-solving abilities');
    improvements.push('Work on reaction speed', 'Practice more timed exercises', 'Develop faster pattern recognition techniques');
  } else {
    level = 'Needs Improvement';
    analysis = 'You may find it challenging to maintain focus and accuracy under time pressure. Regular timed practice can help improve this skill.';
    strengths.push('Basic problem-solving abilities');
    improvements.push('Practice timed exercises daily', 'Work on stress management techniques', 'Focus on improving pattern recognition speed');
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
  
  // Calculate score based on answer quality (higher values = better preparation)
  answers.forEach((answer) => {
    if (answer.answer.includes('More than') || answer.answer.includes('thorough') || 
        answer.answer.includes('Very familiar') || answer.answer.includes('multiple') || 
        answer.answer.includes('Expert')) {
      score += 10;
    }
    else if (answer.answer.includes('detailed') || answer.answer.includes('comprehensive') || 
             answer.answer.includes('Weekly') || answer.answer.includes('Confident') || 
             answer.answer.includes('75%')) {
      score += 8;
    }
    else if (answer.answer.includes('3-4') || answer.answer.includes('6-15') || 
             answer.answer.includes('basic strategy') || answer.answer.includes('familiar') || 
             answer.answer.includes('spreadsheet')) {
      score += 6;
    }
    else if (answer.answer.includes('1-2') || answer.answer.includes('Sometimes') || 
             answer.answer.includes('occasionally') || answer.answer.includes('1-5')) {
      score += 4;
    }
    else {
      score += 2;
    }
  });
  
  score = Math.min(Math.round(score / answers.length * 10), 100);
  
  let level = '';
  let analysis = '';
  const strengths = [];
  const improvements = [];
  
  if (score >= 80) {
    level = 'Excellent';
    analysis = 'Your study habits and preparation level are excellent. You have a structured approach to learning and consistent revision practices.';
    strengths.push('Strong preparation routine', 'Consistent study habits', 'Effective use of resources');
    improvements.push('Focus on targeted revision of specific weak areas', 'Consider advanced problem-solving techniques', 'Maintain current study momentum');
  } else if (score >= 60) {
    level = 'Good';
    analysis = 'Your preparation level is good, but some areas need attention to optimize your study effectiveness and content coverage.';
    strengths.push('Good content coverage', 'Regular study habits', 'Basic preparation structure');
    improvements.push('Increase practice test frequency', 'Develop a more structured study plan', 'Track progress more systematically');
  } else {
    level = 'Needs Improvement';
    analysis = 'Your preparation requires a more structured and consistent approach. Focus on developing regular study habits and a comprehensive plan.';
    strengths.push('Awareness of preparation needs', 'Some basic content knowledge');
    improvements.push('Create a detailed daily study schedule', 'Increase study hours consistently', 'Use more diverse study resources and tools');
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
  // Calculate percentage of correct answers
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const baseScore = Math.round((correctAnswers / answers.length) * 100);
  
  // Calculate the confidence accuracy - how well confidence matched performance
  let confidenceScore = 0;
  let confidenceMismatch = 0;
  
  answers.forEach(answer => {
    if (answer.confidenceLevel) {
      // Convert confidence level 1-5 to percentage (0-100)
      const confidencePercent = (answer.confidenceLevel / 5) * 100;
      
      // Calculate mismatch between confidence and correctness
      if (answer.isCorrect) {
        // If correct, high confidence is good
        confidenceScore += answer.confidenceLevel;
      } else {
        // If incorrect but high confidence, larger penalty
        confidenceMismatch += answer.confidenceLevel > 3 ? 2 : 1;
      }
    }
  });
  
  // Calculate confidence accuracy score (higher is better)
  const confidenceAccuracy = confidenceScore - confidenceMismatch;
  
  // Adjust base score by confidence accuracy
  let score = baseScore;
  if (confidenceAccuracy > 0) {
    // Boost score for good confidence alignment (max 10% boost)
    score = Math.min(100, score + Math.min(10, confidenceAccuracy * 2));
  } else if (confidenceAccuracy < 0) {
    // Penalty for poor confidence alignment (max 15% penalty)
    score = Math.max(0, score - Math.min(15, Math.abs(confidenceAccuracy) * 3));
  }
  
  score = Math.round(score);
  
  let level = '';
  let analysis = '';
  const strengths = [];
  const improvements = [];
  
  if (score >= 80) {
    level = 'Excellent';
    analysis = 'You have excellent mastery of key concepts and an accurate understanding of your knowledge level. Your confidence aligns well with your performance.';
    strengths.push('Strong conceptual understanding', 'Excellent knowledge accuracy', 'Good self-assessment ability');
    improvements.push('Challenge yourself with advanced application problems', 'Explore interdisciplinary connections of concepts');
  } else if (score >= 60) {
    level = 'Good';
    analysis = 'You have good concept mastery with some areas needing reinforcement. There are some gaps between your perceived and actual knowledge.';
    strengths.push('Good theoretical understanding', 'Solid grasp of fundamentals');
    improvements.push('Focus on specific weak conceptual areas', 'Practice more application questions', 'Adjust study focus based on performance');
  } else {
    level = 'Needs Improvement';
    analysis = 'Your concept mastery needs significant improvement. There appears to be a significant mismatch between your confidence and actual performance.';
    strengths.push('Basic conceptual awareness', 'Recognition of core principles');
    improvements.push('Revisit fundamental concepts thoroughly', 'Increase practice with guided examples', 'Develop better self-assessment techniques');
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
  // Weighted average: Concept knowledge (50%), Readiness (30%), Stress handling (20%)
  const overallScore = Math.floor(
    (conceptResults.score * 0.5) + 
    (readinessResults.score * 0.3) + 
    (stressResults.score * 0.2)
  );
  
  let level = '';
  let analysis = '';
  
  if (overallScore >= 80) {
    level = 'Excellent';
  } else if (overallScore >= 70) {
    level = 'Good';
  } else if (overallScore >= 60) {
    level = 'Average';
  } else {
    level = 'Needs Improvement';
  }
  
  const examLabel = examTypes.find(e => e.value === selectedExam)?.label || selectedExam.toUpperCase();
  
  analysis = `Your overall preparation for ${examLabel} is ${level.toLowerCase()}. `;
  
  if (conceptResults.score < readinessResults.score && conceptResults.score < stressResults.score) {
    analysis += 'Focus on strengthening your conceptual understanding of key topics. ';
  } else if (readinessResults.score < conceptResults.score && readinessResults.score < stressResults.score) {
    analysis += 'Improve your study habits and preparation strategy. ';
  } else if (stressResults.score < conceptResults.score && stressResults.score < readinessResults.score) {
    analysis += 'Work on your performance under time pressure. ';
  }
  
  // Get all strengths and prioritize by importance
  let combinedStrengths = [
    ...conceptResults.strengths.map(s => ({ text: s, weight: 3 })),
    ...readinessResults.strengths.map(s => ({ text: s, weight: 2 })),
    ...stressResults.strengths.map(s => ({ text: s, weight: 1 }))
  ];
  
  // Get all improvements and prioritize by importance
  let combinedImprovements = [
    ...conceptResults.improvements.map(s => ({ text: s, weight: 3 })),
    ...readinessResults.improvements.map(s => ({ text: s, weight: 2 })),
    ...stressResults.improvements.map(s => ({ text: s, weight: 1 }))
  ];
  
  // Sort by weight and remove duplicates
  const uniqueStrengths = Array.from(new Set(
    combinedStrengths.sort((a, b) => b.weight - a.weight).map(item => item.text)
  )).slice(0, 4);
  
  const uniqueImprovements = Array.from(new Set(
    combinedImprovements.sort((a, b) => b.weight - a.weight).map(item => item.text)
  )).slice(0, 4);
  
  return {
    score: overallScore,
    level,
    analysis,
    strengths: uniqueStrengths,
    improvements: uniqueImprovements,
  };
}

export function getDialogTitle(currentTest: string): string {
  switch (currentTest) {
    case 'intro':
      return 'Exam Readiness Analyzer';
    case 'stress':
      return 'Cognitive Stress Test';
    case 'readiness':
      return 'Exam Readiness Assessment';
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
      return 'Complete these three assessments to evaluate your exam preparation level';
    case 'stress':
      return 'Test your ability to focus and solve problems under time pressure';
    case 'readiness':
      return 'Evaluate your current study habits and preparation strategy';
    case 'concept':
      return 'Check your mastery of key concepts and identify knowledge gaps';
    case 'report':
      return undefined;
    default:
      return 'Complete these assessments to evaluate your exam preparation level';
  }
}


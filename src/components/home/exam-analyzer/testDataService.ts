
import { TestResults, ExamType, UserAnswer, ReadinessScoreComponents } from './types';

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
  let baseAccuracy = Math.round((correctAnswers / answers.length) * 100);
  
  // Calculate time-based metrics
  const avgResponseTime = answeredQuestions.length > 0 ? 
    answeredQuestions.reduce((sum, a) => sum + a.timeToAnswer, 0) / answeredQuestions.length : 15;
  
  // Calculate time efficiency - higher score for faster responses
  const timeEfficiency = Math.max(0, Math.min(20, 20 * (1 - (avgResponseTime / 15))));
  
  // Calculate error rate under pressure
  const errorRate = totalAnswered > 0 ? 
    (totalAnswered - correctAnswers) / totalAnswered : 1;
  
  // Calculate timeout rate (measure of severe stress impact)
  const timeoutRate = (answers.length - totalAnswered) / answers.length;
  
  // Scientific formula for cognitive stress score:
  // BaseAccuracy + TimeEfficiency - (ErrorRate * 10) - (TimeoutRate * 15)
  let score = Math.max(0, Math.min(100, Math.round(
    baseAccuracy + 
    timeEfficiency - 
    (errorRate * 10) - 
    (timeoutRate * 15)
  )));
  
  let level = '';
  let analysis = '';
  const strengths = [];
  const improvements = [];
  
  if (score >= 80) {
    level = 'Excellent';
    analysis = 'Your cognitive performance under stress is exceptional. You maintain focus and accuracy even with time constraints and increasing complexity.';
    strengths.push('Excellent focus under time pressure', 'Superior pattern recognition ability', 'Quick and accurate decision making');
    improvements.push('Challenge yourself with even more complex problems', 'Try integrating additional stressors to build resilience');
  } else if (score >= 65) {
    level = 'Good';
    analysis = 'You handle cognitive stress well, maintaining reasonable focus and accuracy under pressure. Some minor improvements in reaction time could boost your performance.';
    strengths.push('Good focus under time constraints', 'Effective problem-solving abilities', 'Decent pattern recognition');
    improvements.push('Work on improving reaction speed', 'Practice with more varied pattern recognition tasks', 'Develop strategies for managing time pressure');
  } else if (score >= 50) {
    level = 'Average';
    analysis = 'Your performance under cognitive stress is adequate but inconsistent. You show capability but may struggle with time pressure and complex patterns.';
    strengths.push('Basic problem-solving abilities', 'Some resilience under pressure');
    improvements.push('Practice timed exercises regularly', 'Focus on pattern recognition training', 'Work on maintaining focus under pressure');
  } else {
    level = 'Needs Improvement';
    analysis = 'Cognitive stress significantly impacts your performance. You may find it challenging to maintain focus and accuracy under time constraints.';
    strengths.push('Awareness of areas for improvement');
    improvements.push('Begin with simple timed exercises daily', 'Practice basic pattern recognition without time limits first', 'Gradually introduce time constraints to build tolerance');
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
  // Calculate component scores for the scientific formula
  let conceptCompletionScore = 0;
  let practicePerformanceScore = 0;
  let studyHabitsScore = 0;
  
  let conceptQuestions = 0;
  let practiceQuestions = 0;
  let habitsQuestions = 0;
  
  // Process each answer based on the question category
  answers.forEach((answer) => {
    const value = getAnswerValue(answer.answer);
    
    // Sort into components based on the questionId prefix
    if (answer.questionId.startsWith('cc-')) {
      conceptCompletionScore += value;
      conceptQuestions++;
    }
    else if (answer.questionId.startsWith('pp-')) {
      practicePerformanceScore += value;
      practiceQuestions++;
    }
    else {
      studyHabitsScore += value;
      habitsQuestions++;
    }
  });
  
  // Calculate average for each component (normalized to 0-100)
  const conceptScore = conceptQuestions > 0 ? (conceptCompletionScore / conceptQuestions) * 20 : 0;
  const practiceScore = practiceQuestions > 0 ? (practicePerformanceScore / practiceQuestions) * 20 : 0;
  const habitsScore = habitsQuestions > 0 ? (studyHabitsScore / habitsQuestions) * 20 : 0;
  
  // Final weighted formula:
  // Readiness = (Concept Completion x 0.3) + (Practice Performance x 0.5) + (Study Habits x 0.2)
  const score = Math.round(
    (conceptScore * 0.3) +
    (practiceScore * 0.5) +
    (habitsScore * 0.2)
  );
  
  // Generate analysis and recommendations
  let level = '';
  let analysis = '';
  const strengths = [];
  const improvements = [];
  
  // Component-specific feedback
  if (conceptScore < 50) {
    improvements.push('Increase syllabus coverage through systematic topic review');
    improvements.push('Use concept mapping to identify knowledge gaps');
  } else {
    strengths.push('Good coverage of syllabus content');
  }
  
  if (practiceScore < 50) {
    improvements.push('Increase frequency of mock tests and practice questions');
    improvements.push('Review mistakes after each practice session');
  } else {
    strengths.push('Effective practice routines');
  }
  
  if (habitsScore < 50) {
    improvements.push('Develop a more structured study schedule');
    improvements.push('Adopt better time management techniques');
  } else {
    strengths.push('Productive study habits');
  }
  
  if (score >= 80) {
    level = 'Excellent';
    analysis = 'Your exam preparation is highly effective. You have excellent syllabus coverage, strong practice performance, and effective study habits.';
    strengths.push('Comprehensive exam preparation strategy', 'Excellent balance of theory and practice');
  } else if (score >= 65) {
    level = 'Good';
    analysis = 'Your preparation level is good with a solid foundation. Some targeted improvements in specific areas will help optimize your readiness.';
    strengths.push('Good overall preparation approach');
    improvements.push('Focus on optimizing your study efficiency');
  } else if (score >= 50) {
    level = 'Average';
    analysis = 'Your preparation has a basic foundation but needs more structure and consistency to reach optimal readiness.';
    improvements.push('Create a more systematic study plan', 'Increase consistency in your practice routine');
  } else {
    level = 'Needs Improvement';
    analysis = 'Your preparation needs significant enhancement across multiple areas. A structured approach to syllabus coverage and regular practice is essential.';
    improvements.push('Create a comprehensive study plan with daily goals', 'Dramatically increase practice frequency and coverage');
  }
  
  return {
    score,
    level,
    analysis,
    strengths,
    improvements,
  };
}

// Helper function to convert text answers to numerical values
function getAnswerValue(answer: string): number {
  if (answer.includes('More than') || answer.includes('thorough') || 
      answer.includes('Very familiar') || answer.includes('multiple') || 
      answer.includes('Expert') || answer.includes('100%') || 
      answer.includes('Always')) {
    return 5;
  }
  else if (answer.includes('detailed') || answer.includes('comprehensive') || 
           answer.includes('Weekly') || answer.includes('Confident') || 
           answer.includes('75%') || answer.includes('Often')) {
    return 4;
  }
  else if (answer.includes('3-4') || answer.includes('6-15') || 
           answer.includes('basic strategy') || answer.includes('familiar') || 
           answer.includes('50%') || answer.includes('Sometimes')) {
    return 3;
  }
  else if (answer.includes('1-2') || answer.includes('occasionally') || 
           answer.includes('25%') || answer.includes('Rarely')) {
    return 2;
  }
  else {
    return 1;
  }
}

export function calculateConceptTestResults(answers: UserAnswer[]): TestResults {
  // Calculate confidence-accuracy alignment
  let totalConfidenceScore = 0;
  let totalAccuracyScore = 0;
  let confidenceMisalignment = 0;
  let answersWithConfidence = 0;
  
  answers.forEach(answer => {
    if (answer.confidenceLevel !== undefined) {
      // Convert confidence level 1-5 to percentage (0-100)
      const confidencePercent = (answer.confidenceLevel / 5) * 100;
      totalConfidenceScore += confidencePercent;
      
      // Track accuracy (100 for correct, 0 for incorrect)
      const accuracyScore = answer.isCorrect ? 100 : 0;
      totalAccuracyScore += accuracyScore;
      
      // Calculate misalignment (penalty for overconfidence, smaller penalty for underconfidence)
      if (answer.isCorrect) {
        // If correct, minor penalty for underconfidence
        confidenceMisalignment += Math.max(0, (accuracyScore - confidencePercent) * 0.5);
      } else {
        // If incorrect, larger penalty for overconfidence
        confidenceMisalignment += Math.max(0, (confidencePercent - accuracyScore) * 1.0);
      }
      
      answersWithConfidence++;
    }
  });
  
  // Calculate average confidence and accuracy
  const avgConfidence = answersWithConfidence > 0 ? totalConfidenceScore / answersWithConfidence : 0;
  const avgAccuracy = answersWithConfidence > 0 ? totalAccuracyScore / answersWithConfidence : 0;
  
  // Calculate confidence alignment score (higher is better)
  // 100 - (average misalignment) gives a 0-100 score where 100 is perfect alignment
  const confidenceAlignment = Math.max(0, 100 - (confidenceMisalignment / answersWithConfidence));
  
  // Base score is the average of accuracy and confidence alignment
  let score = Math.round((avgAccuracy * 0.6) + (confidenceAlignment * 0.4));
  
  // Add slight bonus for well-calibrated confidence (when confidence ≈ accuracy)
  const calibrationBonus = Math.max(0, 10 - Math.abs(avgConfidence - avgAccuracy) / 10);
  score = Math.min(100, score + calibrationBonus);
  
  let level = '';
  let analysis = '';
  const strengths = [];
  const improvements = [];
  
  // Determine confidence calibration status
  const isOverconfident = avgConfidence > avgAccuracy + 15;
  const isUnderconfident = avgAccuracy > avgConfidence + 15;
  const isWellCalibrated = !isOverconfident && !isUnderconfident;
  
  if (score >= 80) {
    level = 'Excellent';
    analysis = `Your concept mastery is excellent with ${Math.round(avgAccuracy)}% accuracy. `;
    strengths.push('Strong grasp of key concepts', 'Excellent subject knowledge');
    
    if (isWellCalibrated) {
      analysis += 'You have a realistic assessment of your knowledge level.';
      strengths.push('Well-calibrated confidence level');
    } else if (isOverconfident) {
      analysis += 'However, you tend to overestimate your knowledge in some areas.';
      improvements.push('Be more careful with topics where you feel very confident');
    } else {
      analysis += 'However, you tend to underestimate your knowledge level.';
      improvements.push('Trust your knowledge more on familiar topics');
    }
  } else if (score >= 60) {
    level = 'Good';
    analysis = `Your concept mastery is good with ${Math.round(avgAccuracy)}% accuracy. `;
    strengths.push('Good understanding of most concepts');
    improvements.push('Focus on strengthening specific weak areas');
    
    if (isWellCalibrated) {
      analysis += 'You generally have a realistic assessment of your knowledge.';
      strengths.push('Balanced self-assessment');
    } else if (isOverconfident) {
      analysis += 'However, you often overestimate your knowledge on topics you need to review.';
      improvements.push('Double-check topics where you feel very confident');
    } else {
      analysis += 'However, you often underestimate your abilities on topics you know well.';
      improvements.push('Build more confidence in your knowledge');
    }
  } else {
    level = 'Needs Improvement';
    analysis = `Your concept mastery needs improvement with ${Math.round(avgAccuracy)}% accuracy. `;
    improvements.push('Review fundamental concepts thoroughly', 'Increase practice with guided examples');
    
    if (isOverconfident) {
      analysis += 'You significantly overestimate your knowledge on most topics.';
      improvements.push('Focus on testing your knowledge objectively', 'Use spaced repetition to reinforce concepts');
    } else if (isUnderconfident) {
      analysis += 'You significantly underestimate your knowledge on most topics.';
      improvements.push('Build confidence through practice tests', 'Focus on areas where you perform better than expected');
    } else {
      analysis += 'Your confidence level is reasonable, but your overall knowledge needs improvement.';
      improvements.push('Create a systematic plan to cover all topics');
    }
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
  // Apply the scientific formula:
  // Readiness = (Concept Mastery × 0.3) + (Stress Performance × 0.5) + (Confidence Alignment × 0.2)
  
  // For confidence alignment, we'll use concept score as proxy
  const conceptScore = conceptResults.score;
  const stressScore = stressResults.score;
  const readinessScore = readinessResults.score;
  
  const overallScore = Math.round(
    (conceptScore * 0.3) + 
    (stressScore * 0.5) + 
    (readinessScore * 0.2)
  );
  
  let level = '';
  let analysis = '';
  
  if (overallScore >= 80) {
    level = 'Excellent';
  } else if (overallScore >= 65) {
    level = 'Good';
  } else if (overallScore >= 50) {
    level = 'Average';
  } else {
    level = 'Needs Improvement';
  }
  
  const examLabel = examTypes.find(e => e.value === selectedExam)?.label || selectedExam.toUpperCase();
  
  // Generate personalized analysis based on score components
  analysis = `Your overall preparation for ${examLabel} is ${level.toLowerCase()} with a score of ${overallScore}%. `;
  
  // Identify weakest area for targeted advice
  const scores = [
    { name: 'concept mastery', score: conceptScore },
    { name: 'cognitive performance under stress', score: stressScore },
    { name: 'overall study readiness', score: readinessScore }
  ];
  
  scores.sort((a, b) => a.score - b.score);
  const weakestArea = scores[0];
  const strongestArea = scores[2];
  
  if (weakestArea.score < 60) {
    analysis += `Your ${weakestArea.name} needs the most attention, while your ${strongestArea.name} is your strongest area. `;
    
    if (weakestArea.name === 'cognitive performance under stress') {
      analysis += 'Focus on improving your performance under time pressure through regular timed practice sessions.';
    } else if (weakestArea.name === 'concept mastery') {
      analysis += 'Prioritize strengthening your understanding of fundamental concepts before moving to advanced topics.';
    } else {
      analysis += 'Improve your study habits and preparation strategy with a more structured approach.';
    }
  } else {
    analysis += `You demonstrate balanced performance across all assessment areas, with particular strength in ${strongestArea.name}. `;
    analysis += 'Continue your current approach while refining specific areas to reach your peak potential.';
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
      return 'Complete these three scientific assessments to evaluate your exam preparation level';
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

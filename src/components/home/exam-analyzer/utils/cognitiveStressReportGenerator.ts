
import { UserAnswer, TestResults, StressTestMetrics } from '../types';

export const generateCognitiveStressReport = (answers: UserAnswer[], examType: string): TestResults => {
  // Calculate metrics based on user answers
  const metrics = calculateStressMetrics(answers);
  
  // Calculate score based on metrics (weighted average)
  const score = Math.floor(
    (metrics.correctRate * 70) + 
    ((1 - metrics.timeoutRate) * 20) + 
    ((1 - Math.min(metrics.avgResponseTime / 20, 1)) * 10)
  );
  
  // Determine level based on score
  let level = '';
  if (score >= 80) {
    level = 'High Performance Under Pressure';
  } else if (score >= 60) {
    level = 'Moderate Stress Resilience';
  } else if (score >= 40) {
    level = 'Basic Stress Management';
  } else {
    level = 'Needs Stress Management Training';
  }
  
  // Generate analysis based on score
  let analysis = '';
  if (score >= 80) {
    analysis = `Your cognitive performance under stress for ${examType} is excellent! You maintain accuracy and speed even when under pressure.`;
  } else if (score >= 60) {
    analysis = `You show good cognitive resilience under stress for ${examType}, but there's room for improvement in managing time pressure.`;
  } else if (score >= 40) {
    analysis = `Your performance in ${examType} is notably affected by stress. Focus on developing coping mechanisms for exam anxiety.`;
  } else {
    analysis = `Stress significantly impacts your ${examType} performance. Prioritize stress management techniques alongside content mastery.`;
  }
  
  // Generate strengths based on metrics
  const strengths = [];
  if (metrics.correctRate >= 0.7) strengths.push('Strong accuracy even under pressure');
  if (metrics.timeoutRate <= 0.2) strengths.push('Good time management');
  if (metrics.avgResponseTime <= 15) strengths.push('Quick decision making');
  
  // Always add at least one strength
  if (strengths.length === 0) {
    strengths.push('Some ability to handle stress');
    strengths.push('Awareness of areas for improvement');
  }
  
  // Generate improvements based on metrics
  const improvements = [];
  if (metrics.correctRate < 0.7) improvements.push('Practice maintaining accuracy under time constraints');
  if (metrics.timeoutRate > 0.2) improvements.push('Work on time management strategies');
  if (metrics.avgResponseTime > 15) improvements.push('Practice quick decision making in exam conditions');
  
  // Always add improvement suggestions
  improvements.push('Practice meditation or breathing techniques before exams');
  improvements.push('Take regular timed practice tests to build stress resilience');
  
  return {
    score,
    level,
    analysis,
    strengths,
    improvements
  };
};

// Calculate metrics from answers
const calculateStressMetrics = (answers: UserAnswer[]): StressTestMetrics => {
  if (!answers || answers.length === 0) {
    return {
      correctRate: 0,
      incorrectRate: 0,
      avgResponseTime: 0,
      timeoutRate: 0
    };
  }
  
  // Count correct, incorrect, and timeout answers
  const totalAnswers = answers.length;
  const correctAnswers = answers.filter(a => a.isCorrect === true).length;
  const timeoutAnswers = answers.filter(a => a.timeToAnswer && a.timeToAnswer <= 0).length;
  
  // Calculate average response time (excluding timeouts)
  const validTimeAnswers = answers.filter(a => a.timeToAnswer && a.timeToAnswer > 0);
  const totalResponseTime = validTimeAnswers.reduce((sum, a) => sum + (a.timeToAnswer || 0), 0);
  const avgResponseTime = validTimeAnswers.length > 0 ? totalResponseTime / validTimeAnswers.length : 0;
  
  return {
    correctRate: correctAnswers / totalAnswers,
    incorrectRate: (totalAnswers - correctAnswers) / totalAnswers,
    avgResponseTime,
    timeoutRate: timeoutAnswers / totalAnswers
  };
};

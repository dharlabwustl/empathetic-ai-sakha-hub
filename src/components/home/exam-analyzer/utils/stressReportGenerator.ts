
import { UserAnswer, TestResults } from '../types';

export const generateStressReport = (answers: UserAnswer[], examType: string): TestResults => {
  // Calculate metrics
  let totalCorrect = 0;
  let totalAnswered = answers.length;
  let totalTimeouts = 0;
  let avgTimeToAnswer = 0;
  let totalTimeToAnswer = 0;
  
  answers.forEach(answer => {
    if (answer.isCorrect) {
      totalCorrect++;
    }
    
    if (answer.answer === "TIMEOUT") {
      totalTimeouts++;
    } else {
      totalTimeToAnswer += answer.timeToAnswer;
    }
  });
  
  // Calculate average time excluding timeouts
  avgTimeToAnswer = (totalAnswered - totalTimeouts) > 0 
    ? totalTimeToAnswer / (totalAnswered - totalTimeouts) 
    : 0;
  
  // Calculate stress test score
  // Score formula: (% correct × 0.6) + (time management × 0.4)
  // Time management = 100 - ((avgTimeToAnswer / 15) × 100)
  const correctPercentage = totalAnswered > 0 ? (totalCorrect / totalAnswered) * 100 : 0;
  const timeManagementScore = 100 - Math.min(100, (avgTimeToAnswer / 15) * 100);
  
  const score = Math.round((correctPercentage * 0.6) + (timeManagementScore * 0.4));
  
  // Determine level based on score
  let level = '';
  if (score >= 85) {
    level = 'Excellent';
  } else if (score >= 70) {
    level = 'Good';
  } else if (score >= 50) {
    level = 'Average';
  } else {
    level = 'Needs Improvement';
  }
  
  // Generate analysis based on score and metrics
  let analysis = '';
  if (score >= 85) {
    analysis = `You handle cognitive stress exceptionally well, maintaining accuracy of ${Math.round(correctPercentage)}% even under time pressure. Your ability to manage distractions and perform complex tasks quickly is excellent.`;
  } else if (score >= 70) {
    analysis = `You handle cognitive stress well, achieving ${Math.round(correctPercentage)}% accuracy under pressure. You occasionally get affected by time constraints but generally maintain good performance.`;
  } else if (score >= 50) {
    analysis = `You show average performance under cognitive stress with ${Math.round(correctPercentage)}% accuracy. Time pressure significantly impacts your performance, and you may benefit from strategies to manage exam anxiety.`;
  } else {
    analysis = `You face significant challenges under cognitive stress, achieving ${Math.round(correctPercentage)}% accuracy. Time pressure and distractions heavily impact your performance. Focused practice on exam techniques would be beneficial.`;
  }
  
  // Generate strengths and areas of improvement
  let strengths: string[] = [];
  let improvements: string[] = [];
  
  // Based on accuracy
  if (correctPercentage >= 75) {
    strengths.push("Strong accuracy even under stress conditions");
  } else if (correctPercentage >= 50) {
    improvements.push("Work on maintaining accuracy when under pressure");
  } else {
    improvements.push("Focus on fundamentals before speed - accuracy needs significant improvement");
  }
  
  // Based on time management
  if (timeManagementScore >= 75) {
    strengths.push("Excellent time management during challenging questions");
  } else if (timeManagementScore >= 50) {
    improvements.push("Practice answering questions more efficiently within time constraints");
  } else {
    improvements.push("Develop strategies to make decisions faster during timed exams");
  }
  
  // Based on timeouts
  if (totalTimeouts === 0) {
    strengths.push("Successfully completed all questions without timeouts");
  } else if (totalTimeouts <= 2) {
    improvements.push(`Reduce timeouts (${totalTimeouts} questions not answered in time)`);
  } else {
    improvements.push(`Significant issue with timeouts (${totalTimeouts} questions not answered in time)`);
  }
  
  // Exam-specific analysis for NEET
  if (examType.toLowerCase().includes('neet')) {
    if (score >= 70) {
      strengths.push("Well-prepared for NEET's time pressure and question complexity");
    } else {
      improvements.push("Practice with NEET-style questions under timed conditions");
    }
  }
  
  return {
    score,
    level,
    analysis,
    strengths,
    improvements
  };
};


import { UserAnswer, TestResults } from '../types';

export const generateConceptReport = (answers: UserAnswer[], examType: string): TestResults => {
  // Calculate score based on correct answers
  const correctAnswers = answers.filter(answer => answer.isCorrect);
  const score = Math.floor((correctAnswers.length / answers.length) * 100);
  
  // Determine level based on score
  let level = '';
  if (score >= 80) {
    level = 'Excellent';
  } else if (score >= 60) {
    level = 'Good';
  } else if (score >= 40) {
    level = 'Average';
  } else {
    level = 'Needs Improvement';
  }
  
  // Generate analysis based on score
  let analysis = '';
  if (score >= 80) {
    analysis = 'Your concept mastery is excellent! You demonstrate a strong understanding of key NEET concepts across Physics, Chemistry, and Biology.';
  } else if (score >= 60) {
    analysis = 'You have a good grasp of many NEET concepts, but there\'s room for improvement in some areas.';
  } else if (score >= 40) {
    analysis = 'Your concept understanding is average. Focus on strengthening your foundation in core NEET topics.';
  } else {
    analysis = 'You need significant improvement in your concept understanding for NEET. Consider focused concept-based learning.';
  }
  
  // Strengths based on score
  const strengths = [];
  if (score >= 80) {
    strengths.push('Strong conceptual understanding across subjects');
    strengths.push('Excellent recall of scientific principles and formulas');
    strengths.push('Good application of concepts to complex problems');
  } else if (score >= 60) {
    strengths.push('Good understanding of fundamental concepts');
    strengths.push('Able to apply knowledge to standard problems');
    strengths.push('Consistent performance across easier topics');
  } else if (score >= 40) {
    strengths.push('Basic familiarity with key concepts');
    strengths.push('Good performance on fundamental questions');
    strengths.push('Some areas of strength identified');
  } else {
    strengths.push('Some basic concepts are understood');
    strengths.push('Potential in simpler topics that can be built upon');
    strengths.push('Identifying knowledge gaps (which is the first step to improvement)');
  }
  
  // Improvements based on score
  const improvements = [];
  if (score >= 80) {
    improvements.push('Focus on advanced application of concepts in unfamiliar contexts');
    improvements.push('Practice more complex numerical problems');
    improvements.push('Refine your understanding of less common topics');
  } else if (score >= 60) {
    improvements.push('Strengthen conceptual clarity in difficult topics');
    improvements.push('Practice more application-based questions');
    improvements.push('Focus on connecting related concepts across chapters');
  } else if (score >= 40) {
    improvements.push('Significant revision of fundamental concepts is needed');
    improvements.push('Increase practice with varied question types');
    improvements.push('Focus on building concept clarity before moving to advanced topics');
  } else {
    improvements.push('Start with building strong fundamentals in all subjects');
    improvements.push('Create a structured study plan focusing on key concepts first');
    improvements.push('Seek guidance for topics that are particularly challenging');
    improvements.push('Use visual aids and simplified explanations to grasp difficult concepts');
  }
  
  return {
    score,
    level,
    analysis,
    strengths,
    improvements
  };
};

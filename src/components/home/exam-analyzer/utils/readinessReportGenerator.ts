
import { UserAnswer, TestResults } from '../types';

export const generateReadinessReport = (answers: UserAnswer[], examType: string): TestResults => {
  // Subject-wise tracking with proper weightages
  const subjectScores = {
    biology: { total: 0, correct: 0, incorrect: 0, score: 0, percentage: 0, weight: 0.5 }, // 50% weightage
    physics: { total: 0, correct: 0, incorrect: 0, score: 0, percentage: 0, weight: 0.25 }, // 25% weightage
    chemistry: { total: 0, correct: 0, incorrect: 0, score: 0, percentage: 0, weight: 0.25 } // 25% weightage
  };
  
  // Points system: +4 for correct, -1 for incorrect
  const CORRECT_POINTS = 4;
  const INCORRECT_POINTS = -1;
  
  answers.forEach(answer => {
    // Get the question categories and weight differently
    if (answer.questionId.includes('rt-')) {
      // Extract subject from question ID (assuming format like rt-bio-1, rt-phy-1, rt-chem-1)
      let subject = 'biology'; // default subject
      
      if (answer.questionId.includes('-bio-')) {
        subject = 'biology';
      } else if (answer.questionId.includes('-phy-')) {
        subject = 'physics';
      } else if (answer.questionId.includes('-chem-')) {
        subject = 'chemistry';
      }
      
      // Track question count for each subject
      subjectScores[subject].total++;
      
      // Add points based on correctness
      if (answer.isCorrect) {
        subjectScores[subject].correct++;
        subjectScores[subject].score += CORRECT_POINTS;
      } else {
        subjectScores[subject].incorrect++;
        subjectScores[subject].score += INCORRECT_POINTS;
      }
    }
  });
  
  // Calculate subject-wise percentages
  let totalWeightedScore = 0;
  
  Object.keys(subjectScores).forEach(subject => {
    const subjectData = subjectScores[subject];
    const maxPossibleScore = subjectData.total * CORRECT_POINTS;
    
    // Avoid division by zero
    if (maxPossibleScore > 0) {
      // Convert raw score to percentage (capped at 0-100)
      const rawPercentage = (subjectData.score / maxPossibleScore) * 100;
      subjectScores[subject].percentage = Math.max(0, Math.min(100, rawPercentage));
    } else {
      subjectScores[subject].percentage = 0;
    }
    
    // Add weighted score to total
    const weightedScore = subjectScores[subject].percentage * subjectScores[subject].weight;
    totalWeightedScore += weightedScore;
  });
  
  // Round the final score
  const score = Math.round(totalWeightedScore);
  
  // Determine level based on score
  let level = '';
  if (score >= 80) {
    level = 'Well Prepared';
  } else if (score >= 60) {
    level = 'Moderately Prepared';
  } else if (score >= 40) {
    level = 'Partially Prepared';
  } else {
    level = 'Just Beginning';
  }
  
  // Generate analysis based on score
  let analysis = '';
  if (score >= 80) {
    analysis = 'You\'re on track for NEET! Your preparation level is strong with good study habits and coverage of material.';
  } else if (score >= 60) {
    analysis = 'Your NEET preparation is progressing well, but needs more consistency and deeper coverage in some areas.';
  } else if (score >= 40) {
    analysis = 'You\'ve begun your NEET preparation but need to significantly increase your coverage and strengthen your study routine.';
  } else {
    analysis = 'You\'re in the early stages of NEET preparation. A structured study plan and consistent effort will help you improve.';
  }
  
  // Generate strengths and improvements based on score
  let strengths = [];
  let improvements = [];
  
  if (score >= 80) {
    strengths = [
      'Strong study routine and time management',
      'Comprehensive coverage of the NEET syllabus',
      'Regular practice with mock tests',
      'Good balance between subjects'
    ];
    improvements = [
      'Focus on any remaining weak areas',
      'Increase practice with previous years\' questions',
      'Refine test-taking strategies for optimal performance',
      'Maintain consistent revision schedule'
    ];
  } else if (score >= 60) {
    strengths = [
      'Good study habits established',
      'Reasonable coverage of most subjects',
      'Some experience with practice tests'
    ];
    improvements = [
      'Increase consistency in daily study hours',
      'Complete full syllabus coverage',
      'Take more full-length mock tests',
      'Implement a more structured revision plan'
    ];
  } else if (score >= 40) {
    strengths = [
      'Basic understanding of NEET requirements',
      'Some study routine established',
      'Covered fundamental topics'
    ];
    improvements = [
      'Significantly increase study hours',
      'Create a comprehensive study schedule',
      'Begin regular mock test practice',
      'Focus on completing syllabus coverage',
      'Implement spaced repetition techniques'
    ];
  } else {
    strengths = [
      'Awareness of NEET exam pattern',
      'Identified learning needs',
      'Beginning to develop study habits'
    ];
    improvements = [
      'Establish a consistent daily study routine',
      'Create a detailed study plan covering all subjects',
      'Begin with NCERT textbooks as your foundation',
      'Gradually introduce practice questions',
      'Consider joining a structured preparation program'
    ];
  }
  
  return {
    score,
    level,
    analysis,
    strengths,
    improvements,
    subjectScores // Include subject-wise scores in the results
  };
};


import { TestResults } from '../types';

interface PartialExamResults {
  readiness: TestResults | null;
  concept: TestResults | null;
}

export const generateOverallReport = (results: PartialExamResults, examType: string): TestResults => {
  // Check if we have all the required test results
  if (!results.readiness || !results.concept) {
    return {
      score: 0,
      level: 'Incomplete',
      analysis: 'Not all tests have been completed yet.',
      strengths: [],
      improvements: []
    };
  }
  
  // Calculate overall score - weighted average
  // 40% from readiness assessment, 60% from concept test
  const readinessWeight = 0.4;
  const conceptWeight = 0.6;
  
  const overallScore = Math.round(
    (results.readiness.score * readinessWeight) +
    (results.concept.score * conceptWeight)
  );

  // Determine overall level based on score
  let level = '';
  if (overallScore >= 85) {
    level = 'Outstanding';
  } else if (overallScore >= 70) {
    level = 'Strong';
  } else if (overallScore >= 55) {
    level = 'Good';
  } else if (overallScore >= 40) {
    level = 'Average';
  } else {
    level = 'Needs Improvement';
  }

  // Generate overall analysis text based on score and exam type
  let analysis = '';
  if (examType.toLowerCase().includes('neet')) {
    if (overallScore >= 85) {
      analysis = `Your NEET preparation is excellent. With a score of ${overallScore}%, you demonstrate outstanding readiness in both self-assessment and conceptual understanding. Continue your current strategy while focusing on periodic revision.`;
    } else if (overallScore >= 70) {
      analysis = `Your NEET preparation is strong with a ${overallScore}% readiness score. You have good conceptual understanding and study habits. Some targeted improvement in specific areas will help you excel further.`;
    } else if (overallScore >= 55) {
      analysis = `With a readiness score of ${overallScore}%, your NEET preparation is on the right track. Your foundation is good, but requires more consistent study habits and deeper understanding of key concepts.`;
    } else if (overallScore >= 40) {
      analysis = `Your NEET preparation indicates an average readiness level of ${overallScore}%. There are significant gaps in your conceptual understanding and study approach that need to be addressed systematically.`;
    } else {
      analysis = `With a readiness score of ${overallScore}%, your NEET preparation needs substantial improvement. We recommend restructuring your study plan with focus on fundamentals and consistent practice.`;
    }
  } else {
    // Generic analysis for other exams
    if (overallScore >= 70) {
      analysis = `Your overall exam preparation is strong with a ${overallScore}% score. Continue with your current approach while addressing the specific areas for improvement identified.`;
    } else if (overallScore >= 50) {
      analysis = `With a ${overallScore}% overall score, your exam preparation is progressing but has room for improvement. Focus on the suggested areas to enhance your readiness.`;
    } else {
      analysis = `Your exam readiness score of ${overallScore}% suggests that a significant change in your preparation approach may be beneficial. Consider the recommendations carefully.`;
    }
  }

  // Combine strengths from both tests, removing duplicates
  const allStrengths = [
    ...(results.readiness.strengths || []), 
    ...(results.concept.strengths || [])
  ];
  const strengths = Array.from(new Set(allStrengths)).slice(0, 4);
  
  // Combine areas for improvement, removing duplicates
  const allImprovements = [
    ...(results.readiness.improvements || []), 
    ...(results.concept.improvements || [])
  ];
  const improvements = Array.from(new Set(allImprovements)).slice(0, 4);

  return {
    score: overallScore,
    level,
    analysis,
    strengths,
    improvements
  };
};

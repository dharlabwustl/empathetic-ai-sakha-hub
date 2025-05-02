
import React from 'react';
import { UserAnswer, TestResults, ResultsStrengthWeakness } from '../types';

/**
 * Custom hook for calculating test results
 * @returns Functions for analyzing test results
 */
export const useTestResults = () => {

  /**
   * Generate results for the self-assessment readiness test
   * @param answers - Array of user answers
   * @param examType - Type of exam (jee, neet, etc.)
   */
  const generateReadinessResults = (
    answers: UserAnswer[],
    examType: string
  ): TestResults => {
    // Calculate average score based on answer choices
    // (assuming each answer has a 0-3 value, with 3 being the best)
    const totalQuestions = answers.length;
    if (totalQuestions === 0) return getDefaultResults();
    
    const totalScore = answers.reduce((acc, answer) => {
      // Get answer index (0-3) from string
      const answerValue = parseInt(answer.answer.split("-")[1], 10);
      return acc + answerValue;
    }, 0);
    
    // Calculate percentage (0-100)
    const score = Math.round((totalScore / (totalQuestions * 3)) * 100);
    
    // Generate categorized results
    let strengths: string[] = [];
    let weaknesses: string[] = [];
    let recommendations: string[] = [];
    
    // Group answers by category
    const categoryScores: Record<string, { total: number, count: number }> = {};
    
    answers.forEach(answer => {
      if (answer.category) {
        if (!categoryScores[answer.category]) {
          categoryScores[answer.category] = { total: 0, count: 0 };
        }
        
        const answerValue = parseInt(answer.answer.split("-")[1], 10);
        categoryScores[answer.category].total += answerValue;
        categoryScores[answer.category].count += 1;
      }
    });
    
    // Identify strengths and weaknesses based on category scores
    Object.entries(categoryScores).forEach(([category, data]) => {
      const categoryScore = (data.total / (data.count * 3)) * 100;
      
      if (categoryScore >= 75) {
        strengths.push(category);
      } else if (categoryScore <= 40) {
        weaknesses.push(category);
      }
    });
    
    // Generate exam-specific recommendations
    if (examType === 'neet') {
      if (weaknesses.includes('Concept Completion')) {
        recommendations.push('Focus on completing NCERT Biology textbooks thoroughly');
        recommendations.push('Create comprehensive notes for Biology, Chemistry and Physics');
      }
      
      if (weaknesses.includes('Practice Performance')) {
        recommendations.push('Take more NEET practice tests under timed conditions');
        recommendations.push('Practice questions with the NEET marking scheme (4 marks for correct, -1 for incorrect)');
      }
      
      if (weaknesses.includes('Time Management')) {
        recommendations.push('Practice solving questions within 1.06 minutes per question');
        recommendations.push('Develop a strategic approach for handling all 180 questions in 3 hours');
      }
      
      // General recommendations
      recommendations.push('Focus on high-yield topics in NEET syllabus');
    } else {
      // Default recommendations
      if (weaknesses.includes('Concept Completion')) {
        recommendations.push('Complete your study materials for all subjects');
      }
      
      if (weaknesses.includes('Practice Performance')) {
        recommendations.push('Take more practice tests under exam conditions');
      }
      
      if (weaknesses.includes('Time Management')) {
        recommendations.push('Develop a consistent study schedule');
      }
    }
    
    // Add specific advice based on score ranges
    if (score < 30) {
      recommendations.unshift('Begin with fundamentals before advanced topics');
    } else if (score < 60) {
      recommendations.unshift('Strengthen your weak areas while maintaining momentum');
    } else if (score < 85) {
      recommendations.unshift('Focus on fine-tuning your knowledge and test strategies');
    } else {
      recommendations.unshift('Continue your current preparation strategy');
    }
    
    // Generate analysis text based on score
    let analysis = '';
    if (score < 30) {
      analysis = `You're in the early stages of your ${examType.toUpperCase()} preparation. Focus on building fundamentals.`;
    } else if (score < 60) {
      analysis = `You've made progress in your ${examType.toUpperCase()} preparation, but there's room for improvement.`;
    } else if (score < 85) {
      analysis = `You're well on your way to being ready for the ${examType.toUpperCase()} exam. Keep refining your knowledge.`;
    } else {
      analysis = `You're showing excellent preparation for the ${examType.toUpperCase()} exam. Focus on maintaining and perfecting.`;
    }

    // Add exam-specific analysis
    if (examType === 'neet') {
      analysis += ` Remember that NEET requires not only conceptual understanding but also speed and accuracy (4 marks for correct answers, -1 for incorrect). With 180 questions in 3 hours, you need to average about 1 minute per question.`;
    }
    
    const categorizedResults = getCategorizedResults(strengths, weaknesses, recommendations);
    
    return {
      score,
      analysis,
      strengths: categorizedResults.strengths,
      weaknesses: categorizedResults.weaknesses,
      recommendations: categorizedResults.recommendations,
      detailedScores: Object.entries(categoryScores).map(([category, data]) => ({
        category,
        score: Math.round((data.total / (data.count * 3)) * 100)
      }))
    };
  };
  
  /**
   * Generate results for the concept test
   * @param answers - Array of user answers
   * @param examType - Type of exam (jee, neet, etc.)
   */
  const generateConceptResults = (
    answers: UserAnswer[],
    examType: string
  ): TestResults => {
    const totalQuestions = answers.length;
    if (totalQuestions === 0) return getDefaultResults();
    
    // Calculate score based on correct answers
    const correctAnswers = answers.filter(answer => answer.isCorrect);
    const score = Math.round((correctAnswers.length / totalQuestions) * 100);
    
    // Categorize questions by topic/subject
    const topicScores: Record<string, { correct: number, total: number }> = {};
    
    answers.forEach(answer => {
      if (answer.category) {
        if (!topicScores[answer.category]) {
          topicScores[answer.category] = { correct: 0, total: 0 };
        }
        
        if (answer.isCorrect) {
          topicScores[answer.category].correct += 1;
        }
        topicScores[answer.category].total += 1;
      }
    });
    
    // Identify strengths and weaknesses
    let strengths: string[] = [];
    let weaknesses: string[] = [];
    
    Object.entries(topicScores).forEach(([topic, data]) => {
      const topicScore = (data.correct / data.total) * 100;
      
      if (topicScore >= 80) {
        strengths.push(topic);
      } else if (topicScore <= 50) {
        weaknesses.push(topic);
      }
    });
    
    // Generate recommendations based on weaknesses
    let recommendations: string[] = [];
    
    if (examType === 'neet') {
      weaknesses.forEach(topic => {
        recommendations.push(`Review core concepts in ${topic} using NCERT materials`);
        recommendations.push(`Practice more ${topic} questions with the NEET marking scheme in mind`);
      });
      
      if (score < 60) {
        recommendations.push(`Focus on strengthening basic biology concepts which form 50% of the NEET paper`);
        recommendations.push(`Practice questions regularly with NEET's 4/-1 marking scheme to maximize your score`);
      } else if (score >= 80) {
        recommendations.push(`Continue focusing on accuracy since each incorrect answer deducts 1 mark in NEET`);
      }
    } else {
      weaknesses.forEach(topic => {
        recommendations.push(`Review core concepts in ${topic}`);
        recommendations.push(`Practice more ${topic} questions`);
      });
    }
    
    // Add general recommendations based on score range
    if (score < 50) {
      recommendations.push('Focus on understanding fundamental concepts before advanced topics');
    } else if (score < 75) {
      recommendations.push('Work on connecting related concepts for better understanding');
    } else {
      recommendations.push('Continue your current study approach with more challenging problems');
    }
    
    // Generate analysis text
    let analysis = '';
    if (score < 30) {
      analysis = `You're still developing your conceptual understanding for ${examType.toUpperCase()}.`;
    } else if (score < 60) {
      analysis = `You have a basic understanding of ${examType.toUpperCase()} concepts, but need more depth.`;
    } else if (score < 80) {
      analysis = `You have a good grasp of most ${examType.toUpperCase()} concepts. Focus on the weaker areas.`;
    } else {
      analysis = `You have an excellent conceptual foundation for ${examType.toUpperCase()}.`;
    }

    // Add exam-specific analysis
    if (examType === 'neet') {
      analysis += ` Remember that NEET rewards both knowledge and strategic answering. With 4 marks for correct and -1 for incorrect answers, avoid guessing when uncertain.`;
    }
    
    const categorizedResults = getCategorizedResults(strengths, weaknesses, recommendations);
    
    return {
      score,
      analysis,
      strengths: categorizedResults.strengths,
      weaknesses: categorizedResults.weaknesses,
      recommendations: categorizedResults.recommendations,
      detailedScores: Object.entries(topicScores).map(([category, data]) => ({
        category,
        score: Math.round((data.correct / data.total) * 100)
      }))
    };
  };
  
  /**
   * Generate results for the stress test
   * @param answers - Array of user answers
   * @param examType - Type of exam (jee, neet, etc.)
   */
  const generateStressResults = (
    answers: UserAnswer[],
    examType: string
  ): TestResults => {
    const totalQuestions = answers.length;
    if (totalQuestions === 0) return getDefaultResults();
    
    // Calculate metrics
    const correctAnswers = answers.filter(answer => answer.isCorrect);
    const timeouts = answers.filter(answer => answer.answer === "TIMEOUT").length;
    const answeredQuestions = answers.filter(answer => answer.answer !== "TIMEOUT");
    
    // Calculate average response time (excluding timeouts)
    let avgResponseTime = 0;
    if (answeredQuestions.length > 0) {
      avgResponseTime = answeredQuestions.reduce((acc, answer) => 
        acc + answer.timeToAnswer, 0) / answeredQuestions.length;
    }
    
    // Components of the score:
    // 1. Accuracy: 60% weight
    // 2. Response time: 30% weight
    // 3. Completion (not timing out): 10% weight
    
    const accuracyScore = totalQuestions > 0 
      ? (correctAnswers.length / totalQuestions) * 60 
      : 0;
    
    // For response time, lower is better. We'll use a baseline of 15 seconds per question
    // as the target, with diminishing scores as average time increases
    const timeScore = Math.min(30, avgResponseTime > 0 
      ? 30 * (15 / avgResponseTime) 
      : 0);
    
    // For completion, higher percentage of non-timeouts is better
    const completionScore = totalQuestions > 0 
      ? ((totalQuestions - timeouts) / totalQuestions) * 10 
      : 0;
    
    // Calculate total score
    const score = Math.round(accuracyScore + timeScore + completionScore);
    
    // Generate strengths, weaknesses, and recommendations
    let strengths: string[] = [];
    let weaknesses: string[] = [];
    let recommendations: string[] = [];
    
    // Analyze accuracy
    if (accuracyScore >= 45) {
      strengths.push('Strong conceptual knowledge even under pressure');
    } else if (accuracyScore <= 30) {
      weaknesses.push('Difficulty maintaining accuracy under pressure');
      recommendations.push('Practice more timed tests to build confidence');
    }
    
    // Analyze response time
    if (timeScore >= 25) {
      strengths.push('Quick decision-making skills');
    } else if (timeScore <= 15) {
      weaknesses.push('Slow response time under pressure');
      recommendations.push('Work on quick problem-solving techniques');
    }
    
    // Analyze completion rate
    if (timeouts === 0) {
      strengths.push('Good at completing questions within time limits');
    } else if (timeouts >= 3) {
      weaknesses.push('Tendency to spend too much time on difficult questions');
      recommendations.push('Practice time management and knowing when to move on');
    }
    
    // Add exam-specific recommendations
    if (examType === 'neet') {
      recommendations.push('Practice with NEET\'s 4/-1 marking scheme in mind (4 marks for correct, -1 for incorrect)');
      recommendations.push('Train to solve questions in approximately 1 minute each to complete all 180 questions');
      recommendations.push('For NEET, develop a strategy for when to skip questions to avoid negative marking');
    } else if (examType === 'jee') {
      recommendations.push('Practice with JEE\'s marking scheme in mind');
      recommendations.push('Work on quick calculation techniques for JEE Math problems');
    }
    
    // Generate analysis text
    let analysis = '';
    if (score < 40) {
      analysis = `Your performance under exam conditions needs significant improvement for ${examType.toUpperCase()}.`;
    } else if (score < 60) {
      analysis = `You handle some aspects of ${examType.toUpperCase()} pressure well, but need to work on your exam temperament.`;
    } else if (score < 80) {
      analysis = `You perform fairly well under ${examType.toUpperCase()} exam conditions. Fine-tune your test strategy.`;
    } else {
      analysis = `You excel under pressure and are well-prepared for ${examType.toUpperCase()} exam conditions.`;
    }

    // Add exam-specific analysis
    if (examType === 'neet') {
      analysis += ` Remember that in NEET, you'll need to maintain both speed (1.06 minutes per question) and accuracy (considering the 4/-1 marking scheme) throughout the 3-hour exam with 180 questions.`;
    }
    
    const categorizedResults = getCategorizedResults(strengths, weaknesses, recommendations);
    
    return {
      score,
      analysis,
      strengths: categorizedResults.strengths,
      weaknesses: categorizedResults.weaknesses,
      recommendations: categorizedResults.recommendations,
      detailedScores: [
        { category: 'Accuracy', score: Math.round(accuracyScore / 0.6) },
        { category: 'Speed', score: Math.round(timeScore / 0.3) },
        { category: 'Completion', score: Math.round(completionScore / 0.1) }
      ]
    };
  };
  
  // Helper function to format results into UI-friendly categories
  const getCategorizedResults = (
    strengths: string[],
    weaknesses: string[],
    recommendations: string[]
  ): ResultsStrengthWeakness => {
    return {
      strengths: strengths.map(text => ({
        icon: '✓',
        text
      })),
      weaknesses: weaknesses.map(text => ({
        icon: '!',
        text
      })),
      recommendations: recommendations.map(text => ({
        icon: '→',
        text
      }))
    };
  };
  
  // Default results when no data is available
  const getDefaultResults = (): TestResults => {
    return {
      score: 0,
      analysis: 'Not enough data to provide an analysis.',
      strengths: [],
      weaknesses: [],
      recommendations: [],
      detailedScores: []
    };
  };
  
  return {
    generateReadinessResults,
    generateConceptResults,
    generateStressResults
  };
};

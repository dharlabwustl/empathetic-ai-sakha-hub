
import React from 'react';
import { BookOpen, Brain, FileText } from 'lucide-react';

export const getFeatures = () => {
  // Try to get user data from localStorage to see if they have a study plan
  const userData = localStorage.getItem('userData');
  let initialStudyPlan = null;
  
  if (userData) {
    try {
      const parsedData = JSON.parse(userData);
      // Check if there's study plan data from onboarding
      if (parsedData.examGoal) {
        // Create an initial study plan based on the onboarding data
        initialStudyPlan = {
          id: "initial-plan",
          title: `${parsedData.examGoal || 'Exam'} Study Plan`,
          description: `Your personalized study plan for ${parsedData.examGoal || 'your exam'}.`,
          examDate: parsedData.targetExamDate || new Date().toISOString(),
          createdAt: parsedData.createdAt || new Date().toISOString(),
          status: "active",
          subjects: [
            {
              id: "subject-1",
              name: "Physics",
              difficulty: "medium",
              priority: "high",
              completed: false,
              color: "blue",
              hoursPerWeek: 6
            },
            {
              id: "subject-2",
              name: "Chemistry",
              difficulty: "medium",
              priority: "medium", 
              completed: false,
              color: "green",
              hoursPerWeek: 5
            },
            {
              id: "subject-3",
              name: "Mathematics",
              difficulty: "medium",
              priority: "high",
              completed: false,
              color: "purple",
              hoursPerWeek: 7
            }
          ],
          progress: 0
        };
      }
    } catch (error) {
      console.error("Error parsing user data for study plan:", error);
    }
  }

  return [
    {
      id: "concept-cards",
      title: "Concept Cards",
      description: "Understand complex topics through visual learning cards",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      action: "Explore",
      path: "/dashboard/student/concepts",
      comingSoon: false
    },
    {
      id: "flashcards",
      title: "Smart Flashcards",
      description: "Master your recall with AI-powered flashcards",
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      action: "Practice",
      path: "/dashboard/student/flashcards",
      comingSoon: false
    },
    {
      id: "practice-exams",
      title: "Practice Exams",
      description: "Test your knowledge with realistic exam questions",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      action: "Take Test",
      path: "/dashboard/student/practice-exam",
      comingSoon: false
    },
    // Include initial study plan if available
    ...(initialStudyPlan ? [{
      id: "initial-study-plan",
      title: initialStudyPlan.title,
      description: initialStudyPlan.description,
      icon: <BookOpen className="h-6 w-6 text-indigo-500" />,
      action: "View Plan",
      path: "/dashboard/student/academic",
      data: initialStudyPlan,
      comingSoon: false
    }] : [])
  ];
};

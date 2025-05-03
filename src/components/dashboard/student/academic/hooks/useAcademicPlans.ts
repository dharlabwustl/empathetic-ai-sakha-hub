
import { useState, useEffect } from "react";
import { StudyPlan, StudyPlanSubject } from "@/types/user/studyPlan";
import { v4 as uuidv4 } from "uuid";

export const useAcademicPlans = () => {
  const [activePlans, setActivePlans] = useState<StudyPlan[]>([]);
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Load initial study plans
  useEffect(() => {
    // For demo purposes, we're loading some sample study plans
    loadSampleStudyPlans();
  }, []);

  const loadSampleStudyPlans = () => {
    // Sample active plans
    const sampleActivePlans: StudyPlan[] = [
      {
        id: uuidv4(),
        userId: "user-123",
        goal: "IIT-JEE Preparation",
        examGoal: "Achieve 95+ percentile in JEE Mains",
        examDate: "2023-05-15",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        subjects: getSampleActiveSubjects(),
        weeklyHours: 30,
        status: "active",
        studyHoursPerDay: 6,
        preferredStudyTime: "morning",
        learningPace: "moderate",
        progressPercentage: 45,
        daysLeft: 30
      }
    ];

    // Sample completed plans
    const sampleCompletedPlans: StudyPlan[] = [
      {
        id: uuidv4(),
        userId: "user-123",
        goal: "NEET Foundation",
        examGoal: "Complete biology fundamentals",
        examDate: "2023-01-10",
        createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        subjects: getSampleCompletedSubjects(),
        weeklyHours: 25,
        status: "completed",
        studyHoursPerDay: 5,
        preferredStudyTime: "evening",
        learningPace: "moderate",
        progressPercentage: 100,
        daysLeft: 0
      }
    ];

    setActivePlans(sampleActivePlans);
    setCompletedPlans(sampleCompletedPlans);
  };

  // Function to load study plan created during signup
  const loadSignupStudyPlan = () => {
    try {
      // Try to get study plan from localStorage
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (parsedData.studyPlan) {
          // Create a proper study plan object from the data
          const signupStudyPlan: StudyPlan = {
            id: uuidv4(),
            userId: "user-123",
            goal: parsedData.goals?.[0]?.title || "Academic Excellence",
            examGoal: parsedData.examGoal || "Pass with distinction",
            examDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            subjects: parsedData.studyPlan.subjects || getSampleSignupSubjects(),
            weeklyHours: parsedData.studyPlan.weeklyHours || 20,
            status: "active",
            studyHoursPerDay: parsedData.studyPlan.studyHoursPerDay || 4,
            preferredStudyTime: parsedData.studyPlan.preferredStudyTime || "afternoon",
            learningPace: parsedData.studyPlan.learningPace || "moderate",
            progressPercentage: 0,
            daysLeft: 60
          };

          // Add the signup study plan to active plans
          setActivePlans(prev => [signupStudyPlan, ...prev]);
          console.log("Loaded signup study plan:", signupStudyPlan);
        }
      }
    } catch (error) {
      console.error("Error loading signup study plan:", error);
    }
  };

  // Sample subjects for active plans
  const getSampleActiveSubjects = (): StudyPlanSubject[] => {
    return [
      {
        id: uuidv4(),
        name: "Physics",
        color: "#4361ee",
        hoursPerWeek: 10,
        priority: "high",
        proficiency: "medium",
        difficulty: "hard",
        completed: false
      },
      {
        id: uuidv4(),
        name: "Chemistry",
        color: "#3a86ff",
        hoursPerWeek: 8,
        priority: "medium",
        proficiency: "medium",
        difficulty: "medium",
        completed: false
      },
      {
        id: uuidv4(),
        name: "Mathematics",
        color: "#4cc9f0",
        hoursPerWeek: 12,
        priority: "high",
        proficiency: "weak",
        difficulty: "hard",
        completed: false
      }
    ];
  };

  // Sample subjects for signup study plan
  const getSampleSignupSubjects = (): StudyPlanSubject[] => {
    return [
      {
        id: uuidv4(),
        name: "Physics",
        color: "#4361ee",
        hoursPerWeek: 8,
        priority: "high",
        proficiency: "medium",
        difficulty: "medium",
        completed: false
      },
      {
        id: uuidv4(),
        name: "Chemistry",
        color: "#3a86ff",
        hoursPerWeek: 6,
        priority: "medium",
        proficiency: "weak",
        difficulty: "hard",
        completed: false
      },
      {
        id: uuidv4(),
        name: "Biology",
        color: "#4cc9f0",
        hoursPerWeek: 10,
        priority: "high",
        proficiency: "strong",
        difficulty: "medium",
        completed: false
      }
    ];
  };

  // Sample subjects for completed plans
  const getSampleCompletedSubjects = (): StudyPlanSubject[] => {
    return [
      {
        id: uuidv4(),
        name: "Biology",
        color: "#06d6a0",
        hoursPerWeek: 10,
        priority: "high",
        proficiency: "strong",
        difficulty: "medium",
        completed: true
      },
      {
        id: uuidv4(),
        name: "Chemistry",
        color: "#118ab2",
        hoursPerWeek: 8,
        priority: "high",
        proficiency: "medium",
        difficulty: "easy",
        completed: true
      },
      {
        id: uuidv4(),
        name: "Physics",
        color: "#073b4c",
        hoursPerWeek: 7,
        priority: "medium",
        proficiency: "weak",
        difficulty: "hard",
        completed: true
      }
    ];
  };

  const handleCreatePlan = () => {
    setShowCreateDialog(true);
  };

  const handleViewPlanDetails = (planId: string) => {
    const plan = [...activePlans, ...completedPlans].find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const handleNewPlanCreated = (plan: StudyPlan) => {
    setActivePlans(prev => [plan, ...prev]);
    setShowCreateDialog(false);
  };

  return {
    activePlans,
    completedPlans,
    selectedPlan,
    showCreateDialog,
    setShowCreateDialog,
    setSelectedPlan,
    handleCreatePlan,
    handleViewPlanDetails,
    handleNewPlanCreated,
    loadSignupStudyPlan
  };
};

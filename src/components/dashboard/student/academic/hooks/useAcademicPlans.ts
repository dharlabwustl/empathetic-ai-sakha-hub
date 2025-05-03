
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StudyPlan, StudyPlanStatus, StudyPlanSubject } from '@/types/student/academic';

export const useAcademicPlans = () => {
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<StudyPlanStatus | 'all'>('all');
  
  useEffect(() => {
    // Fetch initial plans and any plans from signup
    const fetchPlans = async () => {
      try {
        setLoading(true);
        
        // Get user data to see if there's a study plan from onboarding
        const userData = localStorage.getItem("userData");
        let onboardingPlan: StudyPlan | null = null;
        
        if (userData) {
          try {
            const parsedData = JSON.parse(userData);
            
            // If we have onboarding data, create an initial study plan
            if (parsedData.examGoal) {
              onboardingPlan = {
                id: uuidv4(),
                name: `${parsedData.examGoal || 'Exam'} Study Plan`,
                description: `Your personalized study plan for ${parsedData.examGoal || 'your exam'}.`,
                examDate: parsedData.targetExamDate || new Date().toISOString(),
                createdAt: parsedData.createdAt || new Date().toISOString(),
                status: "active" as StudyPlanStatus,
                subjects: [
                  {
                    id: uuidv4(),
                    name: "Physics",
                    difficulty: "medium",
                    priority: "high",
                    completed: false,
                    color: "blue",
                    hoursPerWeek: 6
                  },
                  {
                    id: uuidv4(),
                    name: "Chemistry",
                    difficulty: "medium",
                    priority: "medium", 
                    completed: false,
                    color: "green",
                    hoursPerWeek: 5
                  },
                  {
                    id: uuidv4(),
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
        
        // Simulate API call for demo plans
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock plans - if we have an onboarding plan, add it first
        const mockPlans: StudyPlan[] = [
          ...(onboardingPlan ? [onboardingPlan] : []),
          {
            id: uuidv4(),
            name: "Physics Intensive",
            description: "Focused study plan for mastering physics concepts and problems",
            examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            status: "active",
            subjects: [
              {
                id: uuidv4(),
                name: "Mechanics",
                difficulty: "medium",
                priority: "high",
                completed: true,
                color: "blue",
                hoursPerWeek: 6
              },
              {
                id: uuidv4(),
                name: "Thermodynamics",
                difficulty: "medium",
                priority: "medium",
                completed: false,
                color: "red",
                hoursPerWeek: 4
              }
            ],
            progress: 50
          },
          {
            id: uuidv4(),
            name: "Chemistry Revision",
            description: "Recap of important chemistry topics",
            examDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: "completed",
            subjects: [
              {
                id: uuidv4(),
                name: "Organic Chemistry",
                difficulty: "high",
                priority: "high",
                completed: true,
                color: "green",
                hoursPerWeek: 8
              }
            ],
            progress: 100
          }
        ];
        
        setPlans(mockPlans);
        
        // If we have plans, select the first one by default
        if (mockPlans.length > 0) {
          setSelectedPlanId(mockPlans[0].id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching study plans:", error);
        setLoading(false);
      }
    };
    
    fetchPlans();
  }, []);
  
  // Filter plans based on active filter
  const filteredPlans = activeFilter === 'all' 
    ? plans 
    : plans.filter(plan => plan.status === activeFilter);
  
  const selectedPlan = plans.find(plan => plan.id === selectedPlanId) || null;
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
  };
  
  const handleChangeFilter = (filter: StudyPlanStatus | 'all') => {
    setActiveFilter(filter);
  };
  
  return {
    plans,
    filteredPlans,
    selectedPlan,
    selectedPlanId,
    loading,
    activeFilter,
    handleSelectPlan,
    handleChangeFilter
  };
};


import { useState, useEffect } from 'react';
import { StudyPlan, NewStudyPlan, StudyPlanSubject } from '@/types/user/studyPlan';
import { useToast } from '@/hooks/use-toast';

// This is a mock function to generate a unique ID
const generateId = () => `plan-${Math.random().toString(36).substr(2, 9)}`;

// This is a mock function to get random colors
const getRandomColor = (): string => {
  const colors = [
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#2563EB', // Blue
    '#EF4444', // Red
    '#6366F1', // Indigo
    '#14B8A6', // Teal
    '#F97316', // Orange
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
};

export const useAcademicPlans = (initialExamGoal?: string) => {
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [activePlans, setActivePlans] = useState<StudyPlan[]>([]);
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([]);
  
  // Handler for creating a new study plan
  const handleCreatePlan = () => {
    setShowCreateDialog(true);
  };
  
  // Handler for viewing plan details
  const handleViewPlanDetails = (planId: string) => {
    const plan = [...activePlans, ...completedPlans].find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };
  
  // Handler for when a new plan is created
  const handleNewPlanCreated = (newPlan: NewStudyPlan) => {
    // Convert the new plan data to a full StudyPlan
    const plan: StudyPlan = {
      id: generateId(),
      title: newPlan.examGoal || 'Study Plan',
      examGoal: newPlan.examGoal || '',
      examDate: typeof newPlan.examDate === 'string' 
        ? newPlan.examDate 
        : newPlan.examDate.toISOString(),
      status: 'active',
      progress: 0,
      subjects: newPlan.subjects.map(subject => ({
        ...subject,
        color: subject.color || getRandomColor(),
        priority: subject.priority || 'medium'
      })),
      learningPace: newPlan.learningPace || 'moderate',
      preferredStudyTime: newPlan.preferredStudyTime || 'morning',
      studyHoursPerDay: newPlan.studyHoursPerDay || 4,
      createdAt: new Date().toISOString(),
    };
    
    // Add the new plan to active plans
    setActivePlans(prev => [plan, ...prev]);
    
    // Show success message
    toast({
      title: "Study Plan Created",
      description: `Your ${plan.title} study plan has been created successfully.`,
    });
  };
  
  // Load study plan created during signup
  const loadSignupStudyPlan = () => {
    try {
      // Check if we have a study plan from signup stored in localStorage
      const signupPlanData = localStorage.getItem('study_plan_created');
      const userData = localStorage.getItem('userData');
      
      if ((signupPlanData === 'true' || userData) && activePlans.length === 0) {
        // Create a default study plan based on user profile if none exists yet
        const userProfile = userData ? JSON.parse(userData) : {};
        const examGoal = userProfile.examGoal || initialExamGoal || 'NEET';
        
        const subjects: StudyPlanSubject[] = [
          {
            id: 'subject-1',
            name: 'Physics',
            color: '#8B5CF6',
            proficiency: 'medium',
            priority: 'high',
            hoursPerWeek: 6,
            completed: false
          },
          {
            id: 'subject-2',
            name: 'Chemistry',
            color: '#10B981',
            proficiency: 'medium',
            priority: 'medium',
            hoursPerWeek: 5,
            completed: false
          },
          {
            id: 'subject-3',
            name: 'Biology',
            color: '#EF4444',
            proficiency: 'medium',
            priority: 'high',
            hoursPerWeek: 7,
            completed: false
          }
        ];
        
        const defaultPlan: StudyPlan = {
          id: 'auto-generated-plan',
          title: `${examGoal} Preparation`,
          examGoal: examGoal,
          examDate: userProfile.targetExamDate || new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString(),
          status: 'active',
          progress: 5,
          subjects,
          learningPace: userProfile.studyPace === 'Aggressive' ? 'fast' 
                        : userProfile.studyPace === 'Relaxed' ? 'slow'
                        : 'moderate',
          preferredStudyTime: (userProfile.studyTime || 'morning').toLowerCase(),
          studyHoursPerDay: userProfile.dailyStudyHours || 4,
          createdAt: new Date().toISOString(),
        };
        
        setActivePlans([defaultPlan]);
        
        toast({
          title: "Study Plan Loaded",
          description: "Your initial study plan has been loaded successfully.",
        });
      }
    } catch (error) {
      console.error('Error loading signup study plan:', error);
    }
  };
  
  // Initialize with demo data if needed
  useEffect(() => {
    // Leave this empty as we'll use loadSignupStudyPlan instead
  }, []);
  
  return {
    showCreateDialog,
    selectedPlan,
    activePlans,
    completedPlans,
    handleCreatePlan,
    handleViewPlanDetails,
    handleNewPlanCreated,
    setShowCreateDialog,
    setSelectedPlan,
    loadSignupStudyPlan
  };
};

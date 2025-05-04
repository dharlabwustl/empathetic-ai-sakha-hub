
import { useState, useEffect, useCallback } from 'react';
import { StudyPlan, NewStudyPlan, StudyPlanSubject } from '@/types/user/studyPlan';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { differenceInCalendarDays, format } from 'date-fns';

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

// Function to generate topics based on subject
const generateTopicsForSubject = (subject: string, proficiency: 'weak' | 'medium' | 'strong') => {
  let topics = [];
  const priorities = ['high', 'medium', 'low'];
  const statuses = ['pending', 'in-progress'];
  
  // Generate topics based on subject
  switch(subject.toLowerCase()) {
    case 'physics':
      topics = [
        { id: `phys-${Date.now()}-1`, name: "Mechanics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false },
        { id: `phys-${Date.now()}-2`, name: "Thermodynamics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'hard' as const, completed: false },
        { id: `phys-${Date.now()}-3`, name: "Electrostatics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false }
      ];
      break;
    case 'chemistry':
      topics = [
        { id: `chem-${Date.now()}-1`, name: "Organic Chemistry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'hard' as const, completed: false },
        { id: `chem-${Date.now()}-2`, name: "Inorganic Chemistry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false },
        { id: `chem-${Date.now()}-3`, name: "Physical Chemistry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'easy' as const, completed: false }
      ];
      break;
    case 'mathematics':
    case 'maths':
      topics = [
        { id: `math-${Date.now()}-1`, name: "Calculus", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'hard' as const, completed: false },
        { id: `math-${Date.now()}-2`, name: "Algebra", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false },
        { id: `math-${Date.now()}-3`, name: "Geometry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false }
      ];
      break;
    case 'biology':
      topics = [
        { id: `bio-${Date.now()}-1`, name: "Zoology", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false },
        { id: `bio-${Date.now()}-2`, name: "Botany", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false },
        { id: `bio-${Date.now()}-3`, name: "Human Physiology", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'hard' as const, completed: false }
      ];
      break;
    default:
      topics = [
        { id: `gen-${Date.now()}-1`, name: "Fundamentals", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false },
        { id: `gen-${Date.now()}-2`, name: "Advanced Topics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'hard' as const, completed: false }
      ];
  }
  
  return topics;
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
  
  // Function to calculate days left
  const calculateDaysLeft = (examDate: string | Date): number => {
    try {
      const date = typeof examDate === 'string' ? new Date(examDate) : examDate;
      return Math.max(0, differenceInCalendarDays(date, new Date()));
    } catch (e) {
      return 0;
    }
  };

  // Function to calculate progress percentage
  const calculateProgressPercentage = (subjects: StudyPlanSubject[]): number => {
    if (subjects.length === 0) return 0;
    
    let completedTopics = 0;
    let totalTopics = 0;
    
    subjects.forEach(subject => {
      if (subject.topics && subject.topics.length > 0) {
        totalTopics += subject.topics.length;
        completedTopics += subject.topics.filter(topic => topic.completed).length;
      } else {
        totalTopics += 1;
        if (subject.completed) completedTopics += 1;
      }
    });
    
    return Math.round((completedTopics / totalTopics) * 100);
  };
  
  // Handler for when a new plan is created
  const handleNewPlanCreated = (newPlan: NewStudyPlan) => {
    // Convert the new plan data to a full StudyPlan
    const now = new Date().toISOString();
    const subjects = newPlan.subjects.map(subject => {
      return {
        ...subject,
        topics: generateTopicsForSubject(subject.name, subject.proficiency)
      };
    });

    const progressPercentage = calculateProgressPercentage(subjects);
    
    const plan: StudyPlan = {
      id: uuidv4(),
      examGoal: newPlan.examGoal,
      examDate: typeof newPlan.examDate === 'string' ? 
        newPlan.examDate : 
        format(newPlan.examDate, 'yyyy-MM-dd'),
      status: 'active',
      subjects,
      learningPace: newPlan.learningPace || 'moderate',
      preferredStudyTime: newPlan.preferredStudyTime || 'morning',
      studyHoursPerDay: newPlan.studyHoursPerDay || 4,
      weeklyHours: newPlan.weeklyHours,
      goal: newPlan.goal,
      progressPercentage,
      daysLeft: calculateDaysLeft(newPlan.examDate),
      createdAt: now,
      updatedAt: now
    };
    
    // If there's already an active plan, move it to completed plans
    if (activePlans.length > 0) {
      const archivedPlans = activePlans.map(plan => ({
        ...plan,
        status: 'archived' as const
      }));
      
      setCompletedPlans(prev => [...archivedPlans, ...prev]);
    }
    
    // Add the new plan as the active one
    setActivePlans([plan]);
    
    // Save to localStorage
    try {
      localStorage.setItem('study_plan_created', 'true');
      const userData = localStorage.getItem('userData') ? 
        JSON.parse(localStorage.getItem('userData') || '{}') : {};
      
      localStorage.setItem('userData', JSON.stringify({
        ...userData,
        hasStudyPlan: true,
        lastStudyPlanCreated: now,
      }));
    } catch (e) {
      console.error("Error saving study plan to localStorage:", e);
    }
    
    // Show success message
    toast({
      title: "Study Plan Created",
      description: `Your ${plan.examGoal} study plan has been created successfully.`,
    });
  };
  
  // Load study plan created during signup
  const loadSignupStudyPlan = useCallback(() => {
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
            completed: false,
            topics: generateTopicsForSubject('Physics', 'medium')
          },
          {
            id: 'subject-2',
            name: 'Chemistry',
            color: '#10B981',
            proficiency: 'medium',
            priority: 'medium',
            hoursPerWeek: 5,
            completed: false,
            topics: generateTopicsForSubject('Chemistry', 'medium')
          },
          {
            id: 'subject-3',
            name: 'Biology',
            color: '#EF4444',
            proficiency: 'medium',
            priority: 'high',
            hoursPerWeek: 7,
            completed: false,
            topics: generateTopicsForSubject('Biology', 'medium')
          }
        ];
        
        // Calculate days left to exam
        const examDate = userProfile.targetExamDate || 
          new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString();
        const daysLeft = calculateDaysLeft(examDate);
        
        const defaultPlan: StudyPlan = {
          id: 'auto-generated-plan',
          examGoal: examGoal,
          examDate: examDate,
          status: 'active',
          subjects,
          learningPace: userProfile.studyPace === 'Aggressive' ? 'fast' 
                        : userProfile.studyPace === 'Relaxed' ? 'slow'
                        : 'moderate',
          preferredStudyTime: (userProfile.studyTime || 'morning').toLowerCase() as
                              'morning' | 'afternoon' | 'evening' | 'night',
          studyHoursPerDay: userProfile.dailyStudyHours || 4,
          weeklyHours: (userProfile.dailyStudyHours || 4) * 7,
          progressPercentage: 5,
          daysLeft,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setActivePlans([defaultPlan]);
        
        toast({
          title: "Study Plan Loaded",
          description: "Your study plan has been loaded successfully.",
        });
      }
    } catch (error) {
      console.error('Error loading signup study plan:', error);
    }
  }, [activePlans.length, initialExamGoal, toast]);
  
  // Initialize with demo data if needed
  useEffect(() => {
    loadSignupStudyPlan();
  }, [loadSignupStudyPlan]);
  
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

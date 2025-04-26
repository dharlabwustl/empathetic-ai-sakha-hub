
import { useState, useEffect } from 'react';
import { TodaysPlanData, TimelineView, LearningTask } from '@/types/student/todaysPlan';
import { useToast } from '@/hooks/use-toast';

export const useTodaysPlan = (examGoal: string, userName: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [planData, setPlanData] = useState<TodaysPlanData | null>(null);
  const [activeView, setActiveView] = useState<TimelineView>('daily');
  const { toast } = useToast();

  const fetchPlanData = async () => {
    try {
      setLoading(true);
      setError(null);

      // In a real app, this would be an API call to fetch data from the backend
      // For now, we'll simulate with mock data that would come from an admin-managed backend
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data that would come from backend
      const mockData: TodaysPlanData = generateMockData(examGoal, userName);
      
      setPlanData(mockData);
    } catch (err) {
      console.error("Error fetching today's plan:", err);
      setError("Failed to load your study plan. Please try again.");
      toast({
        title: "Error loading study plan",
        description: "We couldn't load your daily plan. Please refresh or try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Mark a task as completed
  const markTaskCompleted = (taskId: string, taskType: LearningTask['type']) => {
    if (!planData) return;
    
    setPlanData(prev => {
      if (!prev) return prev;
      
      const updateTask = (task: LearningTask): LearningTask => {
        if (task.id === taskId) {
          return { 
            ...task, 
            status: '✅ completed', 
            completionPercent: 100,
            dateCompleted: new Date().toISOString()
          };
        }
        return task;
      };
      
      const updatedTasks = {
        concepts: taskType === 'concept' 
          ? prev.tasks.concepts.map(updateTask) 
          : prev.tasks.concepts,
        flashcards: taskType === 'flashcard' 
          ? prev.tasks.flashcards.map(updateTask) 
          : prev.tasks.flashcards,
        practiceExams: taskType === 'practice-exam' 
          ? prev.tasks.practiceExams.map(updateTask) 
          : prev.tasks.practiceExams,
      };
      
      // Also update in subject breakdown
      const updatedSubjects = { ...prev.subjectBreakdown };
      Object.keys(updatedSubjects).forEach(subject => {
        if (taskType === 'concept') {
          updatedSubjects[subject].concepts = updatedSubjects[subject].concepts.map(updateTask);
        } else if (taskType === 'flashcard') {
          updatedSubjects[subject].flashcards = updatedSubjects[subject].flashcards.map(updateTask);
        } else if (taskType === 'practice-exam') {
          updatedSubjects[subject].practiceExams = updatedSubjects[subject].practiceExams.map(updateTask);
        }
      });
      
      toast({
        title: "Task completed!",
        description: "Your progress has been saved successfully.",
      });
      
      return {
        ...prev,
        tasks: updatedTasks,
        subjectBreakdown: updatedSubjects
      };
    });
  };
  
  // Add a bookmark
  const addBookmark = (taskId: string) => {
    if (!planData) return;
    
    setPlanData(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        smartExtras: {
          ...prev.smartExtras,
          bookmarks: [...prev.smartExtras.bookmarks, taskId]
        }
      };
    });
    
    toast({
      title: "Bookmark added",
      description: "You can find this task in your bookmarks.",
    });
  };
  
  // Add a journal note
  const addNote = (content: string) => {
    if (!planData) return;
    
    const newNote = {
      id: `note-${Date.now()}`,
      date: new Date().toISOString(),
      content
    };
    
    setPlanData(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        smartExtras: {
          ...prev.smartExtras,
          notes: [...prev.smartExtras.notes, newNote]
        }
      };
    });
    
    toast({
      title: "Note saved",
      description: "Your journal entry has been saved.",
    });
  };
  
  // Mark "I'm done for today"
  const markDayComplete = () => {
    toast({
      title: "Day completed!",
      description: "Great job! Your progress has been saved and tomorrow's plan is now available.",
    });
    
    // In a real app, this would update the backend and possibly unlock tomorrow's plan early
  };
  
  useEffect(() => {
    fetchPlanData();
  }, [examGoal, activeView]);
  
  return {
    loading,
    error,
    planData,
    activeView,
    setActiveView,
    refreshData: fetchPlanData,
    markTaskCompleted,
    addBookmark,
    addNote,
    markDayComplete
  };
};

// Helper function to generate mock data (in a real app, this would come from backend API)
function generateMockData(examGoal: string, userName: string): TodaysPlanData {
  const currentDate = new Date().toISOString();
  
  // Generate mock concept tasks
  const concepts = [
    {
      id: 'c1',
      title: 'Photosynthesis Explained',
      type: 'concept' as const,
      subject: 'Biology',
      chapter: 'Plant Biology',
      status: '✅ completed' as const,
      timeEstimate: 20,
      difficulty: 'medium' as const,
      completionPercent: 100,
      priority: 'high' as const,
      dateAssigned: currentDate,
      dateCompleted: currentDate,
      content: 'Detailed explanation of photosynthesis process...',
      resourceType: 'video' as const,
      resourceUrl: '#'
    },
    {
      id: 'c2',
      title: 'Cell Structure & Function',
      type: 'concept' as const,
      subject: 'Biology',
      chapter: 'Cell Biology',
      status: '✅ completed' as const,
      timeEstimate: 15,
      difficulty: 'medium' as const,
      completionPercent: 100,
      priority: 'high' as const,
      dateAssigned: currentDate,
      dateCompleted: currentDate,
      content: 'Comprehensive overview of cell structures...',
      resourceType: 'text' as const
    },
    {
      id: 'c3',
      title: 'Quadratic Equations',
      type: 'concept' as const,
      subject: 'Mathematics',
      chapter: 'Algebra',
      status: '🔄 in-progress' as const,
      timeEstimate: 25,
      difficulty: 'hard' as const,
      completionPercent: 60,
      priority: 'medium' as const,
      dateAssigned: currentDate
    },
    {
      id: 'c4',
      title: 'Periodic Table Elements',
      type: 'concept' as const,
      subject: 'Chemistry',
      chapter: 'Elements',
      status: '🔴 pending' as const,
      timeEstimate: 20,
      difficulty: 'medium' as const,
      completionPercent: 0,
      priority: 'medium' as const,
      dateAssigned: currentDate
    }
  ];
  
  // Generate mock flashcard tasks
  const flashcards = [
    {
      id: 'f1',
      title: 'Chapter 2 Quick Recap',
      type: 'flashcard' as const,
      subject: 'Biology',
      chapter: 'Plant Biology',
      status: '✅ completed' as const,
      timeEstimate: 10,
      difficulty: 'easy' as const,
      completionPercent: 100,
      priority: 'medium' as const,
      dateAssigned: currentDate,
      dateCompleted: currentDate,
      cardCount: 15,
      recallAccuracy: 85
    },
    {
      id: 'f2',
      title: 'Chemical Reactions',
      type: 'flashcard' as const,
      subject: 'Chemistry',
      status: '🕒 viewed' as const,
      timeEstimate: 15,
      difficulty: 'medium' as const,
      completionPercent: 30,
      priority: 'low' as const,
      dateAssigned: currentDate,
      cardCount: 20
    }
  ];
  
  // Generate mock practice exam tasks
  const practiceExams = [
    {
      id: 'p1',
      title: 'Quiz: Plant Biology Basics',
      type: 'practice-exam' as const,
      subject: 'Biology',
      chapter: 'Plant Biology',
      status: '✅ completed' as const,
      timeEstimate: 20,
      difficulty: 'medium' as const,
      completionPercent: 100,
      priority: 'high' as const,
      dateAssigned: currentDate,
      dateCompleted: currentDate,
      questionCount: 10,
      timeLimit: 20,
      lastScore: 85,
      attempts: 1
    },
    {
      id: 'p2',
      title: 'Linear Equations Test',
      type: 'practice-exam' as const,
      subject: 'Mathematics',
      status: '🔴 pending' as const,
      timeEstimate: 30,
      difficulty: 'hard' as const,
      completionPercent: 0,
      priority: 'medium' as const,
      dateAssigned: currentDate,
      questionCount: 15,
      timeLimit: 30
    }
  ];
  
  // Organize tasks by subject
  const biologyTasks = {
    concepts: concepts.filter(c => c.subject === 'Biology'),
    flashcards: flashcards.filter(f => f.subject === 'Biology'),
    practiceExams: practiceExams.filter(p => p.subject === 'Biology')
  };
  
  const mathematicsTasks = {
    concepts: concepts.filter(c => c.subject === 'Mathematics'),
    flashcards: flashcards.filter(f => f.subject === 'Mathematics'),
    practiceExams: practiceExams.filter(p => p.subject === 'Mathematics')
  };
  
  const chemistryTasks = {
    concepts: concepts.filter(c => c.subject === 'Chemistry'),
    flashcards: flashcards.filter(f => f.subject === 'Chemistry'),
    practiceExams: practiceExams.filter(p => p.subject === 'Chemistry')
  };
  
  // Generate history records
  const today = new Date();
  
  const pastDays: PastDayRecord[] = [
    {
      date: new Date(today.setDate(today.getDate() - 1)).toISOString(),
      conceptsCompleted: 4,
      conceptsTotal: 5,
      flashcardsCompleted: 1,
      flashcardsTotal: 1,
      practiceCompleted: 1,
      practiceTotal: 1,
      status: 'incomplete'
    },
    {
      date: new Date(today.setDate(today.getDate() - 1)).toISOString(),
      conceptsCompleted: 3,
      conceptsTotal: 4,
      flashcardsCompleted: 0,
      flashcardsTotal: 1,
      practiceCompleted: 1,
      practiceTotal: 1,
      status: 'pending'
    },
    {
      date: new Date(today.setDate(today.getDate() - 1)).toISOString(),
      conceptsCompleted: 5,
      conceptsTotal: 5,
      flashcardsCompleted: 2,
      flashcardsTotal: 2,
      practiceCompleted: 1,
      practiceTotal: 1,
      status: 'completed'
    }
  ];
  
  return {
    userName,
    examGoal,
    currentDate,
    timeAllocation: {
      conceptCards: 60,
      flashcards: 30,
      practiceTests: 20,
      total: 110
    },
    tasks: {
      concepts,
      flashcards,
      practiceExams
    },
    subjectBreakdown: {
      'Biology': biologyTasks,
      'Mathematics': mathematicsTasks,
      'Chemistry': chemistryTasks
    },
    pastDays,
    tomorrowPreview: {
      concepts: 3,
      flashcards: 2,
      practiceExams: 1
    },
    smartExtras: {
      bookmarks: ['c1', 'p1'],
      notes: [
        {
          id: 'note-1',
          date: currentDate,
          content: 'I need to review photosynthesis concepts again before the quiz next week.'
        }
      ]
    }
  };
}

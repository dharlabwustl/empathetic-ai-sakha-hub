
import { useState, useEffect } from 'react';
import { TimelineView, TodaysPlanData } from '@/types/student/todaysPlan';
import { useToast } from '@/hooks/use-toast';

export const useTodaysPlan = (examGoal: string, userName: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [planData, setPlanData] = useState<TodaysPlanData | null>(null);
  const [activeView, setActiveView] = useState<TimelineView>('daily');
  const { toast } = useToast();

  // Mock data generation
  const generateMockPlanData = (): TodaysPlanData => {
    const subjects = ['Physics', 'Chemistry', 'Mathematics'];
    const statuses = ['⏳ pending', '✅ completed', '⏱️ in progress'];
    
    const subjectBreakdown = {};
    subjects.forEach(subject => {
      subjectBreakdown[subject] = {
        concepts: Array(Math.floor(Math.random() * 4) + 1).fill(0).map((_, i) => ({
          id: `concept-${subject.toLowerCase()}-${i}`,
          title: `${subject} Concept ${i + 1}`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          timeEstimate: Math.floor(Math.random() * 30) + 15
        })),
        flashcards: Array(Math.floor(Math.random() * 3) + 1).fill(0).map((_, i) => ({
          id: `flashcard-${subject.toLowerCase()}-${i}`,
          title: `${subject} Flashcard Deck ${i + 1}`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          timeEstimate: Math.floor(Math.random() * 20) + 10,
          cardCount: Math.floor(Math.random() * 20) + 5
        })),
        practiceExams: Array(Math.floor(Math.random() * 2) + 1).fill(0).map((_, i) => ({
          id: `exam-${subject.toLowerCase()}-${i}`,
          title: `${subject} Practice Test ${i + 1}`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          timeEstimate: Math.floor(Math.random() * 60) + 30,
          questionCount: Math.floor(Math.random() * 50) + 10
        }))
      };
    });
    
    // Flatten tasks for easier access
    const tasks = [];
    subjects.forEach(subject => {
      const subjectData = subjectBreakdown[subject];
      
      subjectData.concepts.forEach(concept => {
        tasks.push({
          id: concept.id,
          title: concept.title,
          subject,
          type: 'concept' as const,
          status: concept.status,
          timeEstimate: concept.timeEstimate
        });
      });
      
      subjectData.flashcards.forEach(flashcard => {
        tasks.push({
          id: flashcard.id,
          title: flashcard.title,
          subject,
          type: 'flashcard' as const,
          status: flashcard.status,
          timeEstimate: flashcard.timeEstimate
        });
      });
      
      subjectData.practiceExams.forEach(exam => {
        tasks.push({
          id: exam.id,
          title: exam.title,
          subject,
          type: 'practice-exam' as const,
          status: exam.status,
          timeEstimate: exam.timeEstimate
        });
      });
    });
    
    // Calculate time allocations
    const conceptTime = tasks
      .filter(task => task.type === 'concept')
      .reduce((acc, task) => acc + task.timeEstimate, 0);
    
    const flashcardTime = tasks
      .filter(task => task.type === 'flashcard')
      .reduce((acc, task) => acc + task.timeEstimate, 0);
    
    const practiceTime = tasks
      .filter(task => task.type === 'practice-exam')
      .reduce((acc, task) => acc + task.timeEstimate, 0);
    
    // Past days data
    const pastDays = Array(7).fill(0).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (i + 1));
      
      const completedTasks = Math.floor(Math.random() * 10) + 1;
      const totalTasks = completedTasks + Math.floor(Math.random() * 5);
      
      return {
        date: date.toISOString().split('T')[0],
        status: Math.random() > 0.3 ? 'completed' : 'incomplete',
        completedTasks,
        totalTasks,
        conceptsCompleted: Math.floor(Math.random() * 5),
        conceptsTotal: Math.floor(Math.random() * 5) + 5,
        flashcardsCompleted: Math.floor(Math.random() * 10),
        flashcardsTotal: Math.floor(Math.random() * 10) + 10,
        practiceCompleted: Math.floor(Math.random() * 3),
        practiceTotal: Math.floor(Math.random() * 3) + 3
      };
    });
    
    return {
      userName,
      examGoal,
      subjectBreakdown,
      pastDays,
      tasks,
      timeAllocation: {
        conceptCards: conceptTime,
        flashcards: flashcardTime,
        practiceTests: practiceTime,
        total: conceptTime + flashcardTime + practiceTime
      },
      tomorrowPreview: {
        concepts: Math.floor(Math.random() * 5) + 1,
        flashcards: Math.floor(Math.random() * 3) + 1,
        practiceExams: Math.floor(Math.random() * 2) + 1
      },
      smartExtras: {
        bookmarks: [
          'Optics - Light Reflection chapter',
          'Trigonometric Formulas',
          'Chemical Bonding concepts'
        ],
        notes: [
          {
            id: 'note-1',
            date: new Date().toISOString(),
            content: 'Remember to review the periodic table tonight'
          },
          {
            id: 'note-2',
            date: new Date(Date.now() - 86400000).toISOString(),
            content: 'Focus on calculus problems tomorrow'
          }
        ]
      }
    };
  };

  // Load or refresh data
  const refreshData = () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call with setTimeout
      setTimeout(() => {
        const mockData = generateMockPlanData();
        setPlanData(mockData);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load your study plan. Please try again later.');
      setLoading(false);
    }
  };

  // Initial load on component mount
  useEffect(() => {
    refreshData();
  }, []);

  // Task actions
  const markTaskCompleted = (id: string, type: 'concept' | 'flashcard' | 'practice-exam') => {
    if (!planData) return;
    
    // Create a deep clone of the plan data
    const updatedPlanData = JSON.parse(JSON.stringify(planData)) as TodaysPlanData;
    
    // Update the task in the tasks array
    if (updatedPlanData.tasks) {
      const taskIndex = updatedPlanData.tasks.findIndex(task => task.id === id && task.type === type);
      if (taskIndex !== -1) {
        updatedPlanData.tasks[taskIndex].status = '✅ completed';
      }
    }
    
    // Also update in the subject breakdown
    if (updatedPlanData.subjectBreakdown) {
      Object.keys(updatedPlanData.subjectBreakdown).forEach(subject => {
        const subjectData = updatedPlanData.subjectBreakdown[subject];
        
        if (type === 'concept' && subjectData.concepts) {
          const conceptIndex = subjectData.concepts.findIndex(c => c.id === id);
          if (conceptIndex !== -1) {
            subjectData.concepts[conceptIndex].status = '✅ completed';
          }
        }
        
        if (type === 'flashcard' && subjectData.flashcards) {
          const flashcardIndex = subjectData.flashcards.findIndex(f => f.id === id);
          if (flashcardIndex !== -1) {
            subjectData.flashcards[flashcardIndex].status = '✅ completed';
          }
        }
        
        if (type === 'practice-exam' && subjectData.practiceExams) {
          const examIndex = subjectData.practiceExams.findIndex(e => e.id === id);
          if (examIndex !== -1) {
            subjectData.practiceExams[examIndex].status = '✅ completed';
          }
        }
      });
    }
    
    // Update state with the modified data
    setPlanData(updatedPlanData);
    
    // Show success toast
    toast({
      title: "Task completed!",
      description: `You've completed a ${type.replace('-', ' ')}. Great work!`,
    });
  };

  // Bookmark actions
  const addBookmark = (content: string) => {
    if (!planData) return;
    
    // Create a deep clone of the plan data
    const updatedPlanData = JSON.parse(JSON.stringify(planData)) as TodaysPlanData;
    
    // Initialize smartExtras if it doesn't exist
    if (!updatedPlanData.smartExtras) {
      updatedPlanData.smartExtras = { bookmarks: [], notes: [] };
    }
    
    // Add the new bookmark
    updatedPlanData.smartExtras.bookmarks = [
      ...updatedPlanData.smartExtras.bookmarks,
      content
    ];
    
    // Update state
    setPlanData(updatedPlanData);
    
    // Show success toast
    toast({
      title: "Bookmark added",
      description: "The bookmark has been saved to your collection.",
    });
  };

  // Note actions
  const addNote = (content: string) => {
    if (!planData) return;
    
    // Create a deep clone of the plan data
    const updatedPlanData = JSON.parse(JSON.stringify(planData)) as TodaysPlanData;
    
    // Initialize smartExtras if it doesn't exist
    if (!updatedPlanData.smartExtras) {
      updatedPlanData.smartExtras = { bookmarks: [], notes: [] };
    }
    
    // Add the new note
    updatedPlanData.smartExtras.notes = [
      {
        id: `note-${Date.now()}`,
        date: new Date().toISOString(),
        content
      },
      ...updatedPlanData.smartExtras.notes
    ];
    
    // Update state
    setPlanData(updatedPlanData);
    
    // Show success toast
    toast({
      title: "Note added",
      description: "Your study note has been saved.",
    });
  };

  // Mark day complete
  const markDayComplete = () => {
    // Show success toast
    toast({
      title: "Day completed!",
      description: "Great job! Your progress has been saved for today.",
    });
  };

  return {
    loading,
    error,
    planData,
    activeView,
    setActiveView,
    refreshData,
    markTaskCompleted,
    addBookmark,
    addNote,
    markDayComplete
  };
};

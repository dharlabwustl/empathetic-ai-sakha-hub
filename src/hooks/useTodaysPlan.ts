
import { useState, useEffect } from 'react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

// Mock data for today's plan
const mockTodayPlan: TodaysPlanData = {
  userName: "Student",
  examGoal: "IIT-JEE",
  date: new Date().toISOString(),
  streak: 4,
  completedTasks: 3,
  totalTasks: 7,
  subjectBreakdown: {
    "Physics": {
      concepts: [
        {
          id: "c1",
          title: "Newton's Laws",
          status: "pending",
          timeEstimate: "25"
        },
        {
          id: "c2",
          title: "Motion Kinematics",
          status: "pending",
          timeEstimate: "20"
        }
      ],
      flashcards: [
        {
          id: "f1",
          deckName: "Force & Motion",
          status: "pending",
          timeEstimate: "15"
        }
      ],
      practiceExams: [
        {
          id: "p1",
          examName: "Mini Test",
          status: "pending",
          timeEstimate: "30"
        }
      ]
    },
    "Chemistry": {
      concepts: [
        {
          id: "c3",
          title: "Periodic Table",
          status: "pending",
          timeEstimate: "25"
        }
      ],
      flashcards: [
        {
          id: "f2",
          deckName: "Chemical Elements",
          status: "pending",
          timeEstimate: "10"
        }
      ],
      practiceExams: [
        {
          id: "p2",
          examName: "Quick Quiz",
          status: "pending",
          timeEstimate: "15"
        }
      ]
    }
  },
  timeAllocation: {
    concepts: 70,
    flashcards: 25,
    practiceExams: 45,
    revision: 20,
    total: 160
  },
  tomorrowPreview: {
    totalTasks: 5,
    focusArea: "Mathematics",
    difficulty: "moderate",
    concepts: 2,
    flashcards: 2,
    practiceExams: 1
  },
  smartExtras: {
    bookmarks: [
      {
        id: "b1",
        title: "Wave Optics",
        type: "concept",
        addedOn: new Date().toISOString()
      }
    ],
    notes: [
      {
        id: "n1",
        content: "Remember to review the formulas for kinematics before the mini-test",
        createdAt: new Date().toISOString()
      }
    ]
  },
  tasks: {
    concepts: [],
    flashcards: [],
    practiceExams: [],
    revision: []
  },
  backlogTasks: [
    {
      id: "bl1",
      subject: "History",
      title: "Revolt of 1857 Flashcards",
      type: "flashcard",
      timeEstimate: 15,
      status: "overdue",
      daysOverdue: 1
    },
    {
      id: "bl2",
      subject: "Math",
      title: "Quadratic Equations Concept",
      type: "concept",
      timeEstimate: 30,
      status: "overdue",
      daysOverdue: 2
    }
  ]
};

export const useTodaysPlan = (examGoal: string, userName: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [planData, setPlanData] = useState<TodaysPlanData | null>(null);

  // Fetch today's plan data
  useEffect(() => {
    const fetchPlanData = () => {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      setTimeout(() => {
        try {
          // Simulate API response
          const data = { ...mockTodayPlan, userName: userName || "Student", examGoal: examGoal || "IIT-JEE" };
          setPlanData(data);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch today's plan. Please try again later.");
          setLoading(false);
        }
      }, 800);
    };

    fetchPlanData();
  }, [examGoal, userName]);

  // Refresh data
  const refreshData = () => {
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      try {
        // Simulate API response with slightly different data
        const updatedData = { ...mockTodayPlan, userName: userName || "Student", examGoal: examGoal || "IIT-JEE" };
        setPlanData(updatedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to refresh data. Please try again later.");
        setLoading(false);
      }
    }, 800);
  };

  // Mark task as completed
  const markTaskCompleted = (id: string, type: 'concept' | 'flashcard' | 'practice-exam') => {
    if (!planData) return;
    
    setPlanData(prev => {
      if (!prev) return null;
      
      const updated = {...prev};
      let found = false;
      
      // Update in subject breakdown
      Object.keys(updated.subjectBreakdown).forEach(subject => {
        if (type === 'concept') {
          updated.subjectBreakdown[subject].concepts = updated.subjectBreakdown[subject].concepts.map(c => {
            if (c.id === id) {
              found = true;
              return {...c, status: '✅ completed'};
            }
            return c;
          });
        } else if (type === 'flashcard') {
          updated.subjectBreakdown[subject].flashcards = updated.subjectBreakdown[subject].flashcards.map(f => {
            if (f.id === id) {
              found = true;
              return {...f, status: '✅ completed'};
            }
            return f;
          });
        } else if (type === 'practice-exam') {
          updated.subjectBreakdown[subject].practiceExams = updated.subjectBreakdown[subject].practiceExams.map(p => {
            if (p.id === id) {
              found = true;
              return {...p, status: '✅ completed'};
            }
            return p;
          });
        }
      });
      
      // Update in backlogs if not found in main tasks
      if (!found) {
        updated.backlogTasks = updated.backlogTasks.map(task => {
          if (task.id === id) {
            return {...task, status: '✅ completed'};
          }
          return task;
        });
      }
      
      // Update completion count
      let completedCount = 0;
      Object.keys(updated.subjectBreakdown).forEach(subject => {
        completedCount += updated.subjectBreakdown[subject].concepts.filter(c => c.status === '✅ completed').length;
        completedCount += updated.subjectBreakdown[subject].flashcards.filter(f => f.status === '✅ completed').length;
        completedCount += updated.subjectBreakdown[subject].practiceExams.filter(p => p.status === '✅ completed').length;
      });
      
      completedCount += updated.backlogTasks.filter(t => t.status === '✅ completed').length;
      
      updated.completedTasks = completedCount;
      
      return updated;
    });
  };

  // Add bookmark
  const addBookmark = (title: string, type: 'concept' | 'flashcard' | 'exam') => {
    if (!planData) return;
    
    setPlanData(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        smartExtras: {
          ...prev.smartExtras,
          bookmarks: [
            ...prev.smartExtras.bookmarks,
            {
              id: `b${prev.smartExtras.bookmarks.length + 1}`,
              title,
              type,
              addedOn: new Date().toISOString()
            }
          ]
        }
      };
    });
  };

  // Add note
  const addNote = (content: string) => {
    if (!planData) return;
    
    setPlanData(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        smartExtras: {
          ...prev.smartExtras,
          notes: [
            ...prev.smartExtras.notes,
            {
              id: `n${prev.smartExtras.notes.length + 1}`,
              content,
              createdAt: new Date().toISOString()
            }
          ]
        }
      };
    });
  };

  // Mark day as complete
  const markDayComplete = () => {
    if (!planData) return;
    
    setPlanData(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        streak: prev.streak + 1,
        completedTasks: prev.totalTasks
      };
    });
  };

  return {
    loading,
    error,
    planData,
    refreshData,
    markTaskCompleted,
    addBookmark,
    addNote,
    markDayComplete
  };
};

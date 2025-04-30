
import React, { useEffect, useState } from 'react';
import { TodaysPlanData, TaskType, TimeAllocation, SubjectProgress, PastDayRecord } from '@/types/student/todaysPlan';
import { useToast } from '@/hooks/use-toast';
import { MoodType } from '@/types/user/base';
import NewTodaysPlanView from './NewTodaysPlanView';

const mockData: TodaysPlanData = {
  date: new Date().toISOString(),
  currentBlock: {
    startTime: "9:00 AM",
    endTime: "10:30 AM",
    mood: MoodType.Motivated,
    tasks: [
      {
        id: "task1",
        subject: "Physics",
        type: TaskType.Concept,
        title: "Newton's Laws of Motion",
        status: "in-progress",
        timeEstimate: "45 min"
      },
      {
        id: "task2",
        subject: "Physics",
        type: TaskType.Flashcard,
        deckName: "Forces & Motion",
        status: "not-started",
        timeEstimate: "20 min",
        cardCount: 15
      }
    ]
  },
  upcomingBlocks: [
    {
      startTime: "11:00 AM",
      endTime: "12:30 PM",
      tasks: [
        {
          id: "task3",
          subject: "Chemistry",
          type: TaskType.Concept,
          title: "Chemical Bonding",
          status: "not-started",
          timeEstimate: "50 min"
        },
        {
          id: "task4",
          subject: "Chemistry",
          type: "practice-exam",
          examName: "Chemical Equations Quiz",
          status: "not-started",
          timeEstimate: "30 min",
          questionCount: 10
        } as any
      ]
    },
    {
      startTime: "2:00 PM",
      endTime: "3:30 PM",
      tasks: [
        {
          id: "task5",
          subject: "Mathematics",
          type: TaskType.Concept,
          title: "Calculus: Derivatives",
          status: "not-started",
          timeEstimate: "60 min"
        },
        {
          id: "task6",
          subject: "Mathematics",
          type: TaskType.Flashcard,
          deckName: "Calculus Formulas",
          status: "not-started",
          timeEstimate: "25 min",
          cardCount: 20
        }
      ]
    }
  ],
  completedBlocks: [
    {
      startTime: "Yesterday 8:00 AM",
      endTime: "Yesterday 9:30 AM",
      mood: MoodType.Focused,
      completed: true,
      tasks: [
        {
          id: "old-task1",
          subject: "Physics",
          type: TaskType.Concept,
          title: "Kinematics",
          status: "completed",
          timeEstimate: "45 min"
        },
        {
          id: "old-task2",
          subject: "Physics",
          type: TaskType.Flashcard,
          deckName: "Kinematics Equations",
          status: "completed",
          timeEstimate: "20 min",
          cardCount: 12
        }
      ]
    }
  ],
  timeAllocations: [
    { subject: "Physics", percentage: 35, color: "#3B82F6" },
    { subject: "Chemistry", percentage: 30, color: "#10B981" },
    { subject: "Mathematics", percentage: 25, color: "#F59E0B" },
    { subject: "Biology", percentage: 10, color: "#EC4899" }
  ],
  subjects: [
    { name: "Physics", progress: 65, color: "#3B82F6", tasksCompleted: 12, totalTasks: 25 },
    { name: "Chemistry", progress: 40, color: "#10B981", tasksCompleted: 8, totalTasks: 22 },
    { name: "Mathematics", progress: 75, color: "#F59E0B", tasksCompleted: 15, totalTasks: 20 },
    { name: "Biology", progress: 25, color: "#EC4899", tasksCompleted: 5, totalTasks: 18 }
  ],
  backlog: [
    {
      id: "backlog1",
      subject: "Physics",
      type: TaskType.Concept,
      title: "Circular Motion",
      status: "pending",
      timeEstimate: "40 min"
    },
    {
      id: "backlog2",
      subject: "Mathematics",
      type: "practice-exam",
      examName: "Trigonometry Quiz",
      status: "pending",
      timeEstimate: "30 min",
      questionCount: 10
    } as any
  ],
  pastDays: [
    { date: "2023-04-29", tasksCompleted: 6, totalTasks: 8, mood: MoodType.Happy, studyHours: 4.5 },
    { date: "2023-04-28", tasksCompleted: 5, totalTasks: 7, mood: MoodType.Motivated, studyHours: 3.8 },
    { date: "2023-04-27", tasksCompleted: 4, totalTasks: 6, mood: MoodType.Tired, studyHours: 2.5 },
    { date: "2023-04-26", tasksCompleted: 7, totalTasks: 7, mood: MoodType.Focused, studyHours: 5.2 },
    { date: "2023-04-25", tasksCompleted: 3, totalTasks: 8, mood: MoodType.Anxious, studyHours: 2.0 },
  ]
};

export default function RedesignedTodaysPlan() {
  const { toast } = useToast();
  const [planData, setPlanData] = useState<TodaysPlanData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);

  // Simulate loading data
  useEffect(() => {
    // Get mood from localStorage if available
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.mood) {
        setCurrentMood(parsedData.mood);
      }
    }
    
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      // Adjust plan based on mood if needed
      let adjustedData = {...mockData};
      
      if (currentMood === MoodType.Tired) {
        // Add more breaks for tired students
        adjustedData.upcomingBlocks = adjustedData.upcomingBlocks.map(block => ({
          ...block,
          tasks: block.tasks.slice(0, Math.min(2, block.tasks.length)) // Reduce tasks per block
        }));
      } else if (currentMood === MoodType.Motivated) {
        // Add more challenging content for motivated students
        if (adjustedData.upcomingBlocks.length > 0) {
          adjustedData.upcomingBlocks[0].tasks.push({
            id: "extra-task1",
            subject: "Physics",
            type: "practice-exam",
            examName: "Advanced Mechanics Challenge",
            status: "not-started",
            timeEstimate: "45 min",
            questionCount: 15
          } as any);
        }
      }
      
      setPlanData(adjustedData);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [currentMood]);

  return (
    <>
      {planData ? (
        <NewTodaysPlanView 
          planData={planData}
          isLoading={isLoading}
          currentMood={currentMood}
        />
      ) : (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </>
  );
}

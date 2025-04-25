import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookCheck, CheckCircle } from "lucide-react";
import { TimeAllocation } from "./study-plan/TimeAllocation";
import { TaskItem } from "./study-plan/TaskItem";
import { StudyHistory } from "./study-plan/StudyHistory";
import { SubjectPlan, HistoryEntry } from "@/types/user/base";

// Mock data interface
interface SubjectTask {
  id: string;
  type: 'concept' | 'flashcard' | 'practice';
  title: string;
  status: 'completed' | 'pending' | 'in-progress';
  timeEstimate?: number; // in minutes
  details?: {
    questionCount?: number;
    duration?: number;
  };
}

interface SubjectPlan {
  subject: string;
  tasks: SubjectTask[];
}

interface HistoryEntry {
  date: string;
  concepts: { completed: number; total: number };
  flashcards: { completed: number; total: number };
  practice: { completed: number; total: number };
  status: 'done' | 'incomplete' | 'pending';
}

const mockTodayPlan: SubjectPlan[] = [
  {
    subject: "Biology",
    tasks: [
      {
        id: "bio1",
        type: "concept",
        title: "Photosynthesis Explained",
        status: "completed"
      },
      {
        id: "bio2",
        type: "concept",
        title: "Cell Structure & Function",
        status: "completed"
      },
      {
        id: "bio3",
        type: "flashcard",
        title: "Chapter 2 Quick Recap",
        status: "completed"
      },
      {
        id: "bio4",
        type: "practice",
        title: "Quiz: Plant Biology Basics",
        status: "completed",
        details: {
          questionCount: 10,
          duration: 20
        }
      }
    ]
  },
  {
    subject: "Mathematics",
    tasks: [
      {
        id: "math1",
        type: "concept",
        title: "Algebraic Identities",
        status: "completed"
      },
      {
        id: "math2",
        type: "concept",
        title: "Linear Equations",
        status: "pending"
      },
      {
        id: "math3",
        type: "flashcard",
        title: "Equations & Practice",
        status: "in-progress"
      },
      {
        id: "math4",
        type: "practice",
        title: "Mini Test: Algebra Level 1",
        status: "pending",
        details: {
          questionCount: 15,
          duration: 30
        }
      }
    ]
  }
];

const mockHistory: HistoryEntry[] = [
  {
    date: "Apr 24",
    concepts: { completed: 4, total: 5 },
    flashcards: { completed: 1, total: 1 },
    practice: { completed: 1, total: 1 },
    status: "incomplete"
  },
  {
    date: "Apr 23",
    concepts: { completed: 3, total: 4 },
    flashcards: { completed: 0, total: 1 },
    practice: { completed: 1, total: 1 },
    status: "pending"
  },
  {
    date: "Apr 22",
    concepts: { completed: 5, total: 5 },
    flashcards: { completed: 2, total: 2 },
    practice: { completed: 1, total: 1 },
    status: "done"
  }
];

export default function TodayStudyPlan() {
  const [showHistory, setShowHistory] = useState(false);
  
  const timeAllocation = [
    { task: "Concept Cards", time: 60 },
    { task: "Flashcards", time: 30 },
    { task: "Practice Tests", time: 20 }
  ];
  
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <Card className="border-t-4 border-t-indigo-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <BookCheck className="h-5 w-5 text-indigo-500" />
            Your Smart Study Agenda
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Welcome back! Here's your personalized learning list for today.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <TimeAllocation timeAllocation={timeAllocation} />

          {mockTodayPlan.map((subject, index) => (
            <div key={index} className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <BookCheck className="h-4 w-4 text-indigo-600" />
                {subject.subject}
              </h3>
              <div className="pl-4 space-y-1">
                {subject.tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          ))}

          <StudyHistory 
            history={mockHistory}
            showHistory={showHistory}
            onToggleHistory={() => setShowHistory(!showHistory)}
          />

          <Button 
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            I'm Done for Today!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

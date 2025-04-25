
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Calendar,
  CheckCircle, 
  Circle,
  BookCheck,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

const TaskItem = ({ task }: { task: SubjectTask }) => (
  <div className="flex items-center gap-3 py-2">
    {task.status === "completed" ? (
      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
    ) : task.status === "in-progress" ? (
      <Circle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
    ) : (
      <Circle className="h-5 w-5 text-gray-300 flex-shrink-0" />
    )}
    <div className="flex-1">
      <p className={cn(
        "text-sm font-medium",
        task.status === "completed" ? "text-gray-600 dark:text-gray-300" : "text-gray-900 dark:text-gray-100"
      )}>
        {task.title}
      </p>
      {task.details && (
        <p className="text-xs text-gray-500">
          {task.details.questionCount} Questions · ⏱ {task.details.duration} mins
        </p>
      )}
    </div>
  </div>
);

export default function TodayStudyPlan() {
  const [showHistory, setShowHistory] = useState(false);
  
  const timeAllocation = [
    { task: "Concept Cards", time: 60 },
    { task: "Flashcards", time: 30 },
    { task: "Practice Tests", time: 20 }
  ];
  
  const totalTime = timeAllocation.reduce((acc, curr) => acc + curr.time, 0);
  
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
          {/* Time Allocation */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
              <Timer className="h-4 w-4 text-indigo-600" />
              Time Guidance & Allocation
            </h3>
            <div className="space-y-3">
              {timeAllocation.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">{item.task}</span>
                  <span className="font-medium">{item.time} mins</span>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>Total Time</span>
                  <span>~{Math.floor(totalTime / 60)} hr {totalTime % 60} mins</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subject Breakdown */}
          {mockTodayPlan.map((subject, index) => (
            <div key={index} className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <BookOpen className="h-4 w-4 text-indigo-600" />
                {subject.subject}
              </h3>
              <div className="pl-4 space-y-1">
                {subject.tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          ))}

          {/* History Section */}
          <div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? "Hide History" : "Show History"}
            </Button>
            
            {showHistory && (
              <div className="mt-4 space-y-4">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  Past Progress
                </h4>
                <div className="space-y-3">
                  {mockHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between text-sm p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <span className="font-medium">{entry.date}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-xs">
                          {entry.concepts.completed}/{entry.concepts.total}
                        </span>
                        <span className="text-xs">
                          {entry.flashcards.completed}/{entry.flashcards.total}
                        </span>
                        <span className="text-xs">
                          {entry.practice.completed}/{entry.practice.total}
                        </span>
                        <span>
                          {entry.status === 'done' ? '✅' : 
                           entry.status === 'incomplete' ? '🟡' : '🔴'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Done Button */}
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

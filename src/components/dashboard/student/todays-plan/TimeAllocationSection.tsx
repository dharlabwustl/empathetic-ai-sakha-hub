
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TodaysPlanData } from "@/types/student/todaysPlan";
import { BookOpen, FileText, Clock, Timer, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TimeAllocationSectionProps {
  planData: TodaysPlanData | null;
  isLoading: boolean;
}

export default function TimeAllocationSection({
  planData,
  isLoading
}: TimeAllocationSectionProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-2/3" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="grid grid-cols-12 gap-2">
                <Skeleton className="col-span-3 h-5" />
                <Skeleton className="col-span-2 h-5" />
                <Skeleton className="col-span-7 h-5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!planData) return null;

  const { timeAllocation } = planData;
  const totalTime = timeAllocation.total;
  
  // Calculate percentages for progress bars
  const conceptsPercentage = Math.round((timeAllocation.conceptCards / totalTime) * 100);
  const flashcardsPercentage = Math.round((timeAllocation.flashcards / totalTime) * 100);
  const practiceTestsPercentage = Math.round((timeAllocation.practiceTests / totalTime) * 100);
  
  // Format time helper
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;
  };
  
  const allocationItems = [
    {
      type: "Concept Cards",
      minutes: timeAllocation.conceptCards,
      icon: <BookOpen className="h-4 w-4 text-blue-500" />,
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      progressColor: "bg-blue-500"
    },
    {
      type: "Flashcards",
      minutes: timeAllocation.flashcards,
      icon: <FileText className="h-4 w-4 text-amber-500" />,
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
      progressColor: "bg-amber-500"
    },
    {
      type: "Practice Tests",
      minutes: timeAllocation.practiceTests,
      icon: <AlertCircle className="h-4 w-4 text-violet-500" />,
      bgColor: "bg-violet-100 dark:bg-violet-900/30",
      progressColor: "bg-violet-500"
    },
    {
      type: "Total",
      minutes: totalTime,
      icon: <Clock className="h-4 w-4 text-gray-500" />,
      bgColor: "bg-gray-100 dark:bg-gray-800/50",
      progressColor: "bg-gray-500",
      isTotal: true
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Timer className="h-5 w-5 mr-2 text-indigo-600" />
          Time Allocation & Study Flow
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {allocationItems.map((item) => (
            <div key={item.type} className={`p-2 rounded-md ${item.isTotal ? 'mt-6 border' : item.bgColor}`}>
              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-4 sm:col-span-3 flex items-center">
                  {item.icon}
                  <span className="ml-2 text-sm font-medium">{item.type}</span>
                </div>
                <div className="col-span-2 text-center text-sm font-medium">
                  {formatTime(item.minutes)}
                </div>
                <div className="col-span-6 sm:col-span-7">
                  {!item.isTotal ? (
                    <Progress 
                      value={100} 
                      className="h-2" 
                      indicatorClassName={item.progressColor} 
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground text-center sm:text-right">
                      Total Study Time
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-sm text-muted-foreground mt-2 flex items-center">
            <Clock className="h-4 w-4 mr-1 text-green-500" />
            AI-recommended breaks: Every 25 mins (5 min break)
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TaskItem } from "./SubjectTaskItem";
import { TodaysPlanData } from "@/types/student/todaysPlan";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

interface SubjectBreakdownProps {
  planData: TodaysPlanData | null;
  isLoading: boolean;
  onMarkCompleted: (taskId: string, taskType: 'concept' | 'flashcard' | 'practice-exam') => void;
  onBookmark: (taskId: string) => void;
}

export default function SubjectBreakdown({
  planData,
  isLoading,
  onMarkCompleted,
  onBookmark
}: SubjectBreakdownProps) {
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  
  const toggleSubject = (subject: string) => {
    setExpandedSubjects(prev => {
      if (prev.includes(subject)) {
        return prev.filter(s => s !== subject);
      } else {
        return [...prev, subject];
      }
    });
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3 mb-2" />
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="py-3">
              <Skeleton className="h-5 w-1/4" />
            </CardHeader>
            <CardContent className="py-2">
              <div className="space-y-2">
                {[1, 2].map((j) => (
                  <Skeleton key={j} className="h-16 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (!planData) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Subject-Wise Breakdown</h3>
      
      <Accordion type="multiple" value={expandedSubjects} className="space-y-3">
        {planData && Object.entries(planData.subjectBreakdown).map(([subject, tasks]) => {
          // Calculate total tasks and completed tasks for this subject
          const totalTasks = 
            tasks.concepts.length + 
            tasks.flashcards.length + 
            tasks.practiceExams.length;
          
          const completedTasks = 
            tasks.concepts.filter(t => t.status === '✅ completed').length +
            tasks.flashcards.filter(t => t.status === '✅ completed').length +
            tasks.practiceExams.filter(t => t.status === '✅ completed').length;
          
          // Skip rendering empty subjects
          if (totalTasks === 0) return null;
          
          const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
          
          // Determine overall subject status
          let statusIndicator = '';
          if (completionPercentage === 100) statusIndicator = '✅';
          else if (completionPercentage >= 75) statusIndicator = '🟡';
          else if (completionPercentage >= 50) statusIndicator = '🟠';
          else statusIndicator = '🔴';
          
          return (
            <AccordionItem 
              key={subject} 
              value={subject}
              className="border rounded-lg shadow-sm"
            >
              <AccordionTrigger className="px-4 py-2 hover:no-underline">
                <div className="flex items-center">
                  <div className="text-lg mr-2">{statusIndicator}</div>
                  <div>
                    <div className="font-semibold">{subject}</div>
                    <div className="text-sm text-muted-foreground">
                      {completedTasks} of {totalTasks} tasks completed ({completionPercentage}%)
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {/* Concept Cards Section */}
                {tasks.concepts.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium mb-2">Concept Cards:</h4>
                    <div className="space-y-2">
                      {tasks.concepts.map(concept => (
                        <TaskItem 
                          key={concept.id} 
                          task={concept}
                          onComplete={onMarkCompleted}
                          onBookmark={onBookmark}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Flashcards Section */}
                {tasks.flashcards.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium mb-2">Flashcards:</h4>
                    <div className="space-y-2">
                      {tasks.flashcards.map(flashcard => (
                        <TaskItem 
                          key={flashcard.id} 
                          task={flashcard}
                          onComplete={onMarkCompleted}
                          onBookmark={onBookmark}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Practice Exams Section */}
                {tasks.practiceExams.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium mb-2">Practice Exams:</h4>
                    <div className="space-y-2">
                      {tasks.practiceExams.map(exam => (
                        <TaskItem 
                          key={exam.id} 
                          task={exam}
                          onComplete={onMarkCompleted}
                          onBookmark={onBookmark}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                <Button variant="ghost" size="sm" className="mt-2">
                  <span>View All {subject} Tasks</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

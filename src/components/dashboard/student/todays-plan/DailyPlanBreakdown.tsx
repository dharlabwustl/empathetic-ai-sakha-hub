
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Book, BookOpen, FileText, ArrowRight } from "lucide-react";
import { TodaysPlanData } from "@/types/student/todaysPlan";
import { Link } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";

interface DailyPlanBreakdownProps {
  planData: TodaysPlanData | null;
  isLoading: boolean;
  onMarkCompleted: (taskId: string, taskType: 'concept' | 'flashcard' | 'practice-exam') => void;
  onBookmark: (taskId: string) => void;
}

export function DailyPlanBreakdown({
  planData,
  isLoading,
  onMarkCompleted,
  onBookmark
}: DailyPlanBreakdownProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!planData) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Subject-Wise Tasks</h3>
      
      {Object.entries(planData.subjectBreakdown).map(([subject, tasks]) => {
        const totalTasks = tasks.concepts.length + tasks.flashcards.length + tasks.practiceExams.length;
        const completedTasks = tasks.concepts.filter(t => t.status === '✅ completed').length +
          tasks.flashcards.filter(t => t.status === '✅ completed').length +
          tasks.practiceExams.filter(t => t.status === '✅ completed').length;
        
        return (
          <Card key={subject} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{subject}</CardTitle>
                <Badge variant="outline">
                  {completedTasks}/{totalTasks} Tasks Completed
                </Badge>
              </div>
              <Progress 
                value={(completedTasks / totalTasks) * 100} 
                className="h-2"
              />
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Concepts Section */}
              {tasks.concepts.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Book className="h-4 w-4 text-blue-500 mr-2" />
                    Concepts
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tasks.concepts.map(concept => (
                      <Link 
                        key={concept.id}
                        to={`/dashboard/student/concepts/${encodeURIComponent(concept.title)}`}
                        className="group"
                      >
                        <div className="p-2 rounded-lg border bg-card hover:bg-accent transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{concept.title}</span>
                            <Badge variant={concept.status === '✅ completed' ? 'default' : 'outline'}>
                              {concept.timeEstimate}m
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Flashcards Section */}
              {tasks.flashcards.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 text-amber-500 mr-2" />
                    Flashcards
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tasks.flashcards.map(flashcard => (
                      <Link 
                        key={flashcard.id}
                        to={`/dashboard/student/flashcards/${encodeURIComponent(flashcard.title)}`}
                        className="group"
                      >
                        <div className="p-2 rounded-lg border bg-card hover:bg-accent transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{flashcard.title}</span>
                            <Badge variant={flashcard.status === '✅ completed' ? 'default' : 'outline'}>
                              {flashcard.cardCount} cards
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Practice Tests Section */}
              {tasks.practiceExams.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <FileText className="h-4 w-4 text-purple-500 mr-2" />
                    Practice Tests
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tasks.practiceExams.map(exam => (
                      <Link 
                        key={exam.id}
                        to={`/dashboard/student/practice/${encodeURIComponent(exam.title)}`}
                        className="group"
                      >
                        <div className="p-2 rounded-lg border bg-card hover:bg-accent transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{exam.title}</span>
                            <Badge variant={exam.status === '✅ completed' ? 'default' : 'outline'}>
                              {exam.questionCount} Qs
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Link 
                to={`/dashboard/student/subjects/${encodeURIComponent(subject.toLowerCase())}`}
                className="inline-flex items-center text-sm text-primary hover:text-primary/90"
              >
                View All {subject} Tasks
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

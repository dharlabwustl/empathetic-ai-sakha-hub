
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, BookOpen, FileText, BookCheck } from "lucide-react";
import { TodaysPlanData } from "@/types/student/todaysPlan";

interface DailyPlanBreakdownProps {
  planData?: TodaysPlanData;
  isLoading: boolean;
  onMarkCompleted: (id: string, type: 'concept' | 'flashcard' | 'practice-exam') => void;
  onBookmark: (content: string) => void;
}

const DailyPlanBreakdown: React.FC<DailyPlanBreakdownProps> = ({
  planData,
  isLoading,
  onMarkCompleted,
  onBookmark
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today's Study Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-24 bg-gray-100 rounded animate-pulse"></div>
            <div className="h-24 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!planData || !planData.subjectBreakdown) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today's Study Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No study plan available for today.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {Object.keys(planData.subjectBreakdown).map((subject) => (
        <Card key={subject}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookCheck className="h-5 w-5 text-primary" />
              {subject}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Tasks Breakdown Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Task Type</th>
                      <th className="text-left py-2">Assigned</th>
                      <th className="text-left py-2">Pending</th>
                      <th className="text-right py-2">Time</th>
                      <th className="text-right py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Concepts Row */}
                    {planData.subjectBreakdown[subject].concepts && planData.subjectBreakdown[subject].concepts.length > 0 && (
                      <tr className="border-b">
                        <td className="py-2 flex items-center gap-2">
                          <Book className="h-4 w-4 text-blue-500" />
                          <span>Concepts</span>
                        </td>
                        <td className="py-2">
                          {planData.subjectBreakdown[subject].concepts.length} {planData.subjectBreakdown[subject].concepts.length === 1 ? 'concept' : 'concepts'}
                        </td>
                        <td className="py-2">
                          {planData.subjectBreakdown[subject].concepts.filter(c => c.status !== '✅ completed').length > 0 ? (
                            <Badge variant="destructive">
                              {planData.subjectBreakdown[subject].concepts.filter(c => c.status !== '✅ completed').length} pending
                            </Badge>
                          ) : (
                            <Badge variant="outline">None</Badge>
                          )}
                        </td>
                        <td className="py-2 text-right">
                          {planData.subjectBreakdown[subject].concepts.reduce((acc, c) => acc + c.timeEstimate, 0)} min
                        </td>
                        <td className="py-2 text-right">
                          <Link to={`/dashboard/student/concepts/${subject.toLowerCase()}`}>
                            <Button size="sm" variant="ghost">Start</Button>
                          </Link>
                        </td>
                      </tr>
                    )}
                    
                    {/* Flashcards Row */}
                    {planData.subjectBreakdown[subject].flashcards && planData.subjectBreakdown[subject].flashcards.length > 0 && (
                      <tr className="border-b">
                        <td className="py-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-amber-500" />
                          <span>Flashcards</span>
                        </td>
                        <td className="py-2">
                          {planData.subjectBreakdown[subject].flashcards.reduce((acc, f) => acc + (f.cardCount || 0), 0)} cards
                        </td>
                        <td className="py-2">
                          {planData.subjectBreakdown[subject].flashcards.filter(f => f.status !== '✅ completed').length > 0 ? (
                            <Badge variant="destructive">
                              {planData.subjectBreakdown[subject].flashcards.filter(f => f.status !== '✅ completed').length} pending
                            </Badge>
                          ) : (
                            <Badge variant="outline">None</Badge>
                          )}
                        </td>
                        <td className="py-2 text-right">
                          {planData.subjectBreakdown[subject].flashcards.reduce((acc, f) => acc + f.timeEstimate, 0)} min
                        </td>
                        <td className="py-2 text-right">
                          <Link to={`/dashboard/student/flashcards/${subject.toLowerCase()}`}>
                            <Button size="sm" variant="ghost">Review</Button>
                          </Link>
                        </td>
                      </tr>
                    )}
                    
                    {/* Practice Exams Row */}
                    {planData.subjectBreakdown[subject].practiceExams && planData.subjectBreakdown[subject].practiceExams.length > 0 && (
                      <tr className="border-b last:border-0">
                        <td className="py-2 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                          <span>Practice Test</span>
                        </td>
                        <td className="py-2">
                          {planData.subjectBreakdown[subject].practiceExams.length} {planData.subjectBreakdown[subject].practiceExams.length === 1 ? 'test' : 'tests'}
                        </td>
                        <td className="py-2">
                          {planData.subjectBreakdown[subject].practiceExams.filter(p => p.status !== '✅ completed').length > 0 ? (
                            <Badge variant="destructive">
                              {planData.subjectBreakdown[subject].practiceExams.filter(p => p.status !== '✅ completed').length} pending
                            </Badge>
                          ) : (
                            <Badge variant="outline">None</Badge>
                          )}
                        </td>
                        <td className="py-2 text-right">
                          {planData.subjectBreakdown[subject].practiceExams.reduce((acc, p) => acc + p.timeEstimate, 0)} min
                        </td>
                        <td className="py-2 text-right">
                          <Link to={`/dashboard/student/practice-exam/${subject.toLowerCase()}`}>
                            <Button size="sm" variant="ghost">Take Test</Button>
                          </Link>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DailyPlanBreakdown;

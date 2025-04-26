import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Book, BookOpen, FileText } from 'lucide-react';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import { MoodType } from '@/types/student/todaysPlan';

interface SubjectTasksBreakdownProps {
  currentMood?: MoodType;
}

export const SubjectTasksBreakdown: React.FC<SubjectTasksBreakdownProps> = ({ currentMood }) => {
  const { planData, loading, markTaskCompleted } = useTodaysPlan(
    "IIT-JEE", // This should come from context in a real app
    "Student" // This should come from context in a real app
  );

  const getMoodBasedTip = () => {
    switch (currentMood) {
      case 'happy':
        return "Perfect day to tackle a challenging concept! Try completing an extra task.";
      case 'focused':
        return "Great focus! Consider tackling some backlog items today.";
      case 'tired':
        return "Take it easy today. Focus on review tasks first.";
      case 'anxious':
        return "Start with something familiar to build confidence.";
      case 'stressed':
        return "Let's keep it light. Pick your most comfortable subject.";
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Subject Breakdown</h3>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="mb-4">
            <CardHeader>
              <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3"></div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
                    <div className="h-8 bg-gray-200 animate-pulse rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 animate-pulse rounded w-full"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!planData) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No subject data available.</p>
      </div>
    );
  }

  // Mood-based adjustments to tasks
  const adjustTasksForMood = (subject: any) => {
    if (!currentMood) return subject;

    let adjustedSubject = { ...subject };

    switch (currentMood) {
      case 'tired':
      case 'stressed':
        // Reduce concepts to just the essential ones
        adjustedSubject.concepts = subject.concepts.slice(0, Math.max(1, Math.floor(subject.concepts.length / 2)));
        break;
      case 'focused':
        // No reduction, keep all tasks
        break;
      case 'happy':
        // Maybe add a bonus task if we had that capability
        break;
      default:
        // No adjustments for other moods
        break;
    }

    return adjustedSubject;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Subject Breakdown</h3>

      {/* Mood-based Tip */}
      {currentMood && getMoodBasedTip() && (
        <div className={`p-3 rounded-lg mb-4 ${
          currentMood === 'happy' ? "bg-green-50 border border-green-200 text-green-800" :
          currentMood === 'focused' ? "bg-blue-50 border border-blue-200 text-blue-800" :
          currentMood === 'tired' ? "bg-amber-50 border border-amber-200 text-amber-800" :
          currentMood === 'anxious' ? "bg-purple-50 border border-purple-200 text-purple-800" :
          currentMood === 'stressed' ? "bg-red-50 border border-red-200 text-red-800" :
          "bg-gray-50 border border-gray-200 text-gray-800"
        }`}>
          <p className="text-sm">{getMoodBasedTip()}</p>
        </div>
      )}

      {Object.keys(planData.subjectBreakdown).map((subject) => {
        const subjectData = adjustTasksForMood(planData.subjectBreakdown[subject]);
        
        return (
          <Card key={subject} className="mb-4">
            <CardHeader>
              <CardTitle className="text-md">{subject}</CardTitle>
            </CardHeader>
            <CardContent>
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
                    {subjectData.concepts.length > 0 && (
                      <tr className="border-b">
                        <td className="py-2 flex items-center gap-2">
                          <Book className="h-4 w-4 text-blue-500" />
                          <span>Concepts</span>
                        </td>
                        <td className="py-2">
                          {subjectData.concepts.length} {subjectData.concepts.length === 1 ? 'concept' : 'concepts'}
                        </td>
                        <td className="py-2">
                          {subjectData.concepts.filter(c => c.status !== '✅ completed').length > 0 ? (
                            <Badge variant="destructive">
                              {subjectData.concepts.filter(c => c.status !== '✅ completed').length} pending
                            </Badge>
                          ) : (
                            <Badge variant="outline">None</Badge>
                          )}
                        </td>
                        <td className="py-2 text-right">
                          {subjectData.concepts.reduce((acc, c) => acc + c.timeEstimate, 0)} min
                        </td>
                        <td className="py-2 text-right">
                          <Link to={`/dashboard/student/concepts/${subject.toLowerCase()}`}>
                            <Button size="sm" variant="ghost">Go to Concepts</Button>
                          </Link>
                        </td>
                      </tr>
                    )}
                    
                    {/* Flashcards Row */}
                    {subjectData.flashcards.length > 0 && (
                      <tr className="border-b">
                        <td className="py-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-amber-500" />
                          <span>Flashcards</span>
                        </td>
                        <td className="py-2">
                          {subjectData.flashcards.reduce((acc, f) => acc + (f.cardCount || 0), 0)} cards
                        </td>
                        <td className="py-2">
                          {subjectData.flashcards.filter(f => f.status !== '✅ completed').length > 0 ? (
                            <Badge variant="destructive">
                              {subjectData.flashcards.filter(f => f.status !== '✅ completed').length} pending
                            </Badge>
                          ) : (
                            <Badge variant="outline">None</Badge>
                          )}
                        </td>
                        <td className="py-2 text-right">
                          {subjectData.flashcards.reduce((acc, f) => acc + f.timeEstimate, 0)} min
                        </td>
                        <td className="py-2 text-right">
                          <Link to={`/dashboard/student/flashcards/${subject.toLowerCase()}`}>
                            <Button size="sm" variant="ghost">Review</Button>
                          </Link>
                        </td>
                      </tr>
                    )}
                    
                    {/* Practice Exams Row */}
                    {subjectData.practiceExams.length > 0 && (
                      <tr className="border-b last:border-0">
                        <td className="py-2 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                          <span>Practice Test</span>
                        </td>
                        <td className="py-2">
                          {subjectData.practiceExams.length} {subjectData.practiceExams.length === 1 ? 'test' : 'tests'}
                        </td>
                        <td className="py-2">
                          {subjectData.practiceExams.filter(p => p.status !== '✅ completed').length > 0 ? (
                            <Badge variant="destructive">
                              {subjectData.practiceExams.filter(p => p.status !== '✅ completed').length} pending
                            </Badge>
                          ) : (
                            <Badge variant="outline">None</Badge>
                          )}
                        </td>
                        <td className="py-2 text-right">
                          {subjectData.practiceExams.reduce((acc, p) => acc + p.timeEstimate, 0)} min
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
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

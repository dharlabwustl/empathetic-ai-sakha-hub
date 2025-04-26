
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Book, BookOpen, CheckCircle } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  progress: number;
  proficiency: 'weak' | 'moderate' | 'strong';
  chapters: { id: string; name: string; progress: number }[];
  quizzes: { id: string; title: string; score?: number }[];
  flashcards: { total: number; mastered: number };
  recommendedStudyHours: number;
  priority?: 'high' | 'medium' | 'low';
}

interface SubjectBreakdownSectionProps {
  subjects: Subject[];
  showHeading?: boolean;
  compact?: boolean;
}

const SubjectBreakdownSection: React.FC<SubjectBreakdownSectionProps> = ({ 
  subjects, 
  showHeading = true,
  compact = false
}) => {
  if (subjects.length === 0) {
    return (
      <div className="space-y-4">
        {showHeading && <h2 className="text-2xl font-bold">Subject Breakdown</h2>}
        
        <Card className="border-dashed">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-medium text-gray-500">No subjects found</h3>
            <p className="text-sm text-gray-500 mt-2">
              Visit the Academic Advisor to set up your subjects
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showHeading && <h2 className="text-2xl font-bold">Subject-Wise Breakdown</h2>}
      
      {compact ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <Card key={subject.id} className="border-l-4" style={{ borderLeftColor: getPriorityColor(subject.priority || 'medium') }}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{subject.name}</h3>
                  <Badge variant="outline" className={getPriorityClass(subject.priority || 'medium')}>
                    {subject.priority || 'Medium'} Priority
                  </Badge>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
                
                <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="font-medium">{subject.chapters.length}</div>
                    <div className="text-xs text-gray-500">Concepts</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="font-medium">{subject.flashcards.total}</div>
                    <div className="text-xs text-gray-500">Flashcards</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="font-medium">{subject.quizzes.length}</div>
                    <div className="text-xs text-gray-500">Tests</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Concepts</TableHead>
                <TableHead>Flashcards</TableHead>
                <TableHead>Tests</TableHead>
                <TableHead>Quiz Score</TableHead>
                <TableHead>Recall</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => {
                const completedQuizzes = subject.quizzes.filter(quiz => quiz.score !== undefined).length;
                const averageQuizScore = subject.quizzes
                  .filter(quiz => quiz.score !== undefined)
                  .reduce((acc, quiz) => acc + (quiz.score || 0), 0) / (completedQuizzes || 1);
                
                const flashcardRecall = subject.flashcards.total > 0
                  ? Math.round((subject.flashcards.mastered / subject.flashcards.total) * 100)
                  : 0;
                
                let status = '🟡 In Progress';
                if (subject.progress >= 90) {
                  status = '✅ Completed';
                } else if (averageQuizScore < 70 || flashcardRecall < 65) {
                  status = '🟠 Needs Attention';
                }
                
                return (
                  <TableRow key={subject.id}>
                    <TableCell className="font-medium">{subject.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPriorityClass(subject.priority || 'medium')}>
                        {subject.priority || 'Medium'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {Math.round(subject.progress / 100 * subject.chapters.length)} / {subject.chapters.length}
                    </TableCell>
                    <TableCell>
                      {subject.flashcards.mastered} / {subject.flashcards.total}
                    </TableCell>
                    <TableCell>
                      {completedQuizzes} / {subject.quizzes.length}
                    </TableCell>
                    <TableCell>{averageQuizScore.toFixed(0)}%</TableCell>
                    <TableCell>{flashcardRecall}%</TableCell>
                    <TableCell>{status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};

// Helper functions
const getPriorityColor = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case 'high': return '#ef4444';
    case 'medium': return '#f59e0b';
    case 'low': return '#22c55e';
    default: return '#6366f1';
  }
};

const getPriorityClass = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case 'high': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30';
    case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30';
    case 'low': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30';
    default: return '';
  }
};

export default SubjectBreakdownSection;

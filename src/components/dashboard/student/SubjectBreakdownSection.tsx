
import React, { useState } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, ArrowDown, ArrowUp, BookOpen, TrendingUp } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  priority: 'High' | 'Medium' | 'Low';
  conceptsCompleted: number;
  conceptsTotal: number;
  flashcards: {
    completed: number;
    total: number;
    accuracy: number;
  };
  practiceTests: {
    completed: number;
    total: number;
    score: number;
  };
  quizAverage: number;
  status: 'completed' | 'in-progress' | 'not-started';
}

interface SubjectBreakdownSectionProps {
  subjects?: Subject[];
}

const SubjectBreakdownSection: React.FC<SubjectBreakdownSectionProps> = ({ 
  subjects = [
    {
      id: '1',
      name: 'Physics',
      priority: 'High',
      conceptsCompleted: 42,
      conceptsTotal: 60,
      flashcards: { completed: 85, total: 120, accuracy: 68 },
      practiceTests: { completed: 15, total: 20, score: 72 },
      quizAverage: 72,
      status: 'in-progress'
    },
    {
      id: '2',
      name: 'Chemistry',
      priority: 'Medium',
      conceptsCompleted: 48,
      conceptsTotal: 55,
      flashcards: { completed: 110, total: 130, accuracy: 74 },
      practiceTests: { completed: 18, total: 22, score: 78 },
      quizAverage: 78,
      status: 'in-progress'
    },
    {
      id: '3',
      name: 'Biology',
      priority: 'High',
      conceptsCompleted: 55,
      conceptsTotal: 55,
      flashcards: { completed: 180, total: 180, accuracy: 90 },
      practiceTests: { completed: 25, total: 25, score: 92 },
      quizAverage: 92,
      status: 'completed'
    }
  ]
}) => {
  const [sortField, setSortField] = useState<keyof Subject>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Subject) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedSubjects = [...subjects].sort((a, b) => {
    let compare = 0;
    
    if (sortField === 'name' || sortField === 'priority' || sortField === 'status') {
      compare = String(a[sortField]).localeCompare(String(b[sortField]));
    } else if (sortField === 'flashcards' || sortField === 'practiceTests') {
      const fieldA = sortField === 'flashcards' ? a.flashcards.accuracy : a.practiceTests.score;
      const fieldB = sortField === 'flashcards' ? b.flashcards.accuracy : b.practiceTests.score;
      compare = fieldA - fieldB;
    } else {
      compare = Number(a[sortField]) - Number(b[sortField]);
    }
    
    return sortDirection === 'asc' ? compare : -compare;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300">✅ Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300">🟡 In Progress</Badge>;
      case 'not-started':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300">🟠 Not Started</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300">High</Badge>;
      case 'Medium':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300">Medium</Badge>;
      case 'Low':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Calculate overall stats
  const totalConcepts = subjects.reduce((sum, s) => sum + s.conceptsCompleted, 0);
  const totalConceptsMax = subjects.reduce((sum, s) => sum + s.conceptsTotal, 0);
  const avgQuizScore = Math.round(subjects.reduce((sum, s) => sum + s.quizAverage, 0) / subjects.length);
  const avgRecallAccuracy = Math.round(subjects.reduce((sum, s) => sum + s.flashcards.accuracy, 0) / subjects.length);
  const totalPracticeTests = subjects.reduce((sum, s) => sum + s.practiceTests.completed, 0);
  
  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Overall Study Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalConcepts}/{totalConceptsMax}</div>
              <div className="text-xs text-muted-foreground">Concepts Completed</div>
              <div className="text-xs text-green-600 font-medium">+5</div>
            </div>
            <div className="text-center p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{avgQuizScore}%</div>
              <div className="text-xs text-muted-foreground">Quiz Average Score</div>
              <div className="text-xs text-green-600 font-medium">+3</div>
            </div>
            <div className="text-center p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{avgRecallAccuracy}%</div>
              <div className="text-xs text-muted-foreground">Flashcard Recall</div>
              <div className="text-xs text-green-600 font-medium">+7</div>
            </div>
            <div className="text-center p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{totalPracticeTests}</div>
              <div className="text-xs text-muted-foreground">Practice Tests</div>
              <div className="text-xs text-green-600 font-medium">+2</div>
            </div>
            <div className="text-center p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">4.5 hrs</div>
              <div className="text-xs text-muted-foreground">Daily Study Goal</div>
              <div className="text-xs text-green-600 font-medium">+0.5%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-violet-600" />
            Subject-Wise Detailed Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort('name')}
                  >
                    Subject
                    {sortField === 'name' && (sortDirection === 'asc' ? <ArrowUp className="ml-1 inline h-3 w-3" /> : <ArrowDown className="ml-1 inline h-3 w-3" />)}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort('priority')}
                  >
                    Priority
                    {sortField === 'priority' && (sortDirection === 'asc' ? <ArrowUp className="ml-1 inline h-3 w-3" /> : <ArrowDown className="ml-1 inline h-3 w-3" />)}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('conceptsCompleted')}
                  >
                    Concepts
                    {sortField === 'conceptsCompleted' && (sortDirection === 'asc' ? <ArrowUp className="ml-1 inline h-3 w-3" /> : <ArrowDown className="ml-1 inline h-3 w-3" />)}
                  </TableHead>
                  <TableHead>Flashcards</TableHead>
                  <TableHead>Practice Tests</TableHead>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort('quizAverage')}
                  >
                    Quiz Score
                    {sortField === 'quizAverage' && (sortDirection === 'asc' ? <ArrowUp className="ml-1 inline h-3 w-3" /> : <ArrowDown className="ml-1 inline h-3 w-3" />)}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('flashcards')}
                  >
                    Recall Accuracy
                    {sortField === 'flashcards' && (sortDirection === 'asc' ? <ArrowUp className="ml-1 inline h-3 w-3" /> : <ArrowDown className="ml-1 inline h-3 w-3" />)}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort('status')}
                  >
                    Status
                    {sortField === 'status' && (sortDirection === 'asc' ? <ArrowUp className="ml-1 inline h-3 w-3" /> : <ArrowDown className="ml-1 inline h-3 w-3" />)}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSubjects.map(subject => (
                  <TableRow key={subject.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <TableCell className="font-medium">{subject.name}</TableCell>
                    <TableCell>{getPriorityBadge(subject.priority)}</TableCell>
                    <TableCell>
                      {subject.conceptsCompleted} / {subject.conceptsTotal}
                      <Progress 
                        value={(subject.conceptsCompleted / subject.conceptsTotal) * 100} 
                        className="h-1 mt-1" 
                      />
                    </TableCell>
                    <TableCell>
                      {subject.flashcards.completed} / {subject.flashcards.total}
                      <Progress 
                        value={(subject.flashcards.completed / subject.flashcards.total) * 100} 
                        className="h-1 mt-1" 
                      />
                    </TableCell>
                    <TableCell>
                      {subject.practiceTests.completed} / {subject.practiceTests.total}
                      <Progress 
                        value={(subject.practiceTests.completed / subject.practiceTests.total) * 100} 
                        className="h-1 mt-1" 
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span 
                          className={`font-medium ${subject.quizAverage >= 80 ? 'text-green-600 dark:text-green-400' : 
                            subject.quizAverage >= 60 ? 'text-amber-600 dark:text-amber-400' : 
                            'text-red-600 dark:text-red-400'}`}
                        >
                          {subject.quizAverage}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span 
                          className={`font-medium ${subject.flashcards.accuracy >= 80 ? 'text-green-600 dark:text-green-400' : 
                            subject.flashcards.accuracy >= 60 ? 'text-amber-600 dark:text-amber-400' : 
                            'text-red-600 dark:text-red-400'}`}
                        >
                          {subject.flashcards.accuracy}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(subject.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectBreakdownSection;

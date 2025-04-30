
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Book, BookOpen, FileText } from 'lucide-react';

interface SubjectProgressData {
  subject: string;
  progress: number;
  conceptsCompleted: number;
  totalConcepts: number;
  flashcardsCompleted: number;
  totalFlashcards: number;
  testsCompleted: number;
  totalTests: number;
}

interface SubjectOverviewProps {
  subjects: SubjectProgressData[];
}

const SubjectOverview: React.FC<SubjectOverviewProps> = ({ subjects }) => {
  return (
    <div className="space-y-4">
      {subjects.map((subject, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{subject.subject}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <span className="text-sm font-medium">{subject.progress}%</span>
            </div>
            <Progress value={subject.progress} className="h-2" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Concepts</p>
                  <p className="text-sm font-medium">{subject.conceptsCompleted}/{subject.totalConcepts}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <Book className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Flashcards</p>
                  <p className="text-sm font-medium">{subject.flashcardsCompleted}/{subject.totalFlashcards}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-violet-100 dark:bg-violet-900/30">
                  <FileText className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Tests</p>
                  <p className="text-sm font-medium">{subject.testsCompleted}/{subject.totalTests}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SubjectOverview;

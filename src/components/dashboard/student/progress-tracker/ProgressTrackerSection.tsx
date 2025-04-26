
import React from 'react';
import { UserProfileType } from '@/types/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface Subject {
  id: string;
  name: string;
  progress: number;
  proficiency: 'weak' | 'moderate' | 'strong';
  chapters: { id: string; name: string; progress: number }[];
  quizzes: { id: string; title: string; score?: number }[];
  flashcards: { total: number; mastered: number };
  recommendedStudyHours: number;
}

interface ProgressTrackerSectionProps {
  userProfile: UserProfileType;
  subjects: Subject[];
}

const ProgressTrackerSection: React.FC<ProgressTrackerSectionProps> = ({ userProfile, subjects }) => {
  // Generate stats for daily, weekly, and monthly progress
  const generateProgressStats = (timeframe: 'daily' | 'weekly' | 'monthly') => {
    // In a real app, this would come from stored data about user's progress over time
    // Using mock data for now
    let conceptsDone, flashcardsDone, testsTaken, completionPercentage;
    
    switch (timeframe) {
      case 'daily':
        conceptsDone = Math.floor(Math.random() * 5) + 1;
        flashcardsDone = Math.floor(Math.random() * 20) + 5;
        testsTaken = Math.floor(Math.random() * 2);
        completionPercentage = Math.floor(Math.random() * 30) + 70;
        break;
      case 'weekly':
        conceptsDone = Math.floor(Math.random() * 20) + 10;
        flashcardsDone = Math.floor(Math.random() * 100) + 50;
        testsTaken = Math.floor(Math.random() * 5) + 2;
        completionPercentage = Math.floor(Math.random() * 20) + 75;
        break;
      case 'monthly':
        conceptsDone = Math.floor(Math.random() * 50) + 30;
        flashcardsDone = Math.floor(Math.random() * 300) + 150;
        testsTaken = Math.floor(Math.random() * 15) + 8;
        completionPercentage = Math.floor(Math.random() * 15) + 80;
        break;
    }
    
    return { conceptsDone, flashcardsDone, testsTaken, completionPercentage };
  };
  
  const dailyStats = generateProgressStats('daily');
  const weeklyStats = generateProgressStats('weekly');
  const monthlyStats = generateProgressStats('monthly');
  
  // Calculate total stats
  const totalConcepts = subjects.reduce((acc, subject) => acc + subject.chapters.length, 0);
  const totalFlashcards = subjects.reduce((acc, subject) => acc + subject.flashcards.total, 0);
  const totalTests = subjects.reduce((acc, subject) => acc + subject.quizzes.length, 0);
  
  // Calculate overall completion percentage
  const completedConcepts = subjects.reduce((acc, subject) => {
    return acc + Math.floor(subject.chapters.length * (subject.progress / 100));
  }, 0);
  const completedFlashcards = subjects.reduce((acc, subject) => acc + subject.flashcards.mastered, 0);
  const completedTests = subjects.reduce((acc, subject) => {
    return acc + subject.quizzes.filter(quiz => quiz.score !== undefined).length;
  }, 0);
  
  const overallCompletion = Math.round(
    ((completedConcepts / totalConcepts) + 
     (completedFlashcards / totalFlashcards) + 
     (completedTests / totalTests)) / 3 * 100
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Progress Tracker</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Timeline Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily">
              <ProgressTable 
                stats={dailyStats} 
                total={{ concepts: totalConcepts, flashcards: totalFlashcards, tests: totalTests }}
              />
            </TabsContent>
            
            <TabsContent value="weekly">
              <ProgressTable 
                stats={weeklyStats} 
                total={{ concepts: totalConcepts, flashcards: totalFlashcards, tests: totalTests }}
              />
            </TabsContent>
            
            <TabsContent value="monthly">
              <ProgressTable 
                stats={monthlyStats} 
                total={{ concepts: totalConcepts, flashcards: totalFlashcards, tests: totalTests }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-bold mb-4">{overallCompletion}%</div>
              <p className="text-gray-500">Overall Completion</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-xl font-bold">{completedConcepts}/{totalConcepts}</div>
                <p className="text-xs text-gray-500">Concepts</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-xl font-bold">{completedFlashcards}/{totalFlashcards}</div>
                <p className="text-xs text-gray-500">Flashcards</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-xl font-bold">{completedTests}/{totalTests}</div>
                <p className="text-xs text-gray-500">Tests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Time Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-3xl font-bold mb-1">
                  {subjects.reduce((acc, subject) => acc + subject.recommendedStudyHours, 0)}
                </div>
                <p className="text-gray-500">Hours/Week</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-3xl font-bold mb-1">
                  {Math.round(subjects.reduce((acc, subject) => acc + subject.recommendedStudyHours, 0) / 7)}
                </div>
                <p className="text-gray-500">Hours/Day</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-3xl font-bold mb-1">
                  {Math.round(totalConcepts / 30)}
                </div>
                <p className="text-gray-500">Concepts/Day</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-3xl font-bold mb-1">
                  {Math.round(totalFlashcards / 30)}
                </div>
                <p className="text-gray-500">Flashcards/Day</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface ProgressTableProps {
  stats: {
    conceptsDone: number;
    flashcardsDone: number;
    testsTaken: number;
    completionPercentage: number;
  };
  total: {
    concepts: number;
    flashcards: number;
    tests: number;
  };
}

const ProgressTable: React.FC<ProgressTableProps> = ({ stats, total }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Timeline</TableHead>
          <TableHead>Concepts Done</TableHead>
          <TableHead>Flashcards Done</TableHead>
          <TableHead>Tests Taken</TableHead>
          <TableHead>Completion %</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Current</TableCell>
          <TableCell>
            {stats.conceptsDone}
            <span className="text-xs text-gray-500 ml-1">/{total.concepts}</span>
          </TableCell>
          <TableCell>
            {stats.flashcardsDone}
            <span className="text-xs text-gray-500 ml-1">/{total.flashcards}</span>
          </TableCell>
          <TableCell>
            {stats.testsTaken}
            <span className="text-xs text-gray-500 ml-1">/{total.tests}</span>
          </TableCell>
          <TableCell>{stats.completionPercentage}%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ProgressTrackerSection;

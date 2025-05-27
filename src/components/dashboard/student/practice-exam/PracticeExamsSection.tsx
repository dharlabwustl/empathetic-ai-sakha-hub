
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PracticeExamOverviewSection from './PracticeExamOverviewSection';
import { FileText, Plus, Filter, Search, Clock, Target } from 'lucide-react';

const PracticeExamsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock exam data
  const availableExams = [
    {
      id: '1',
      title: 'NEET Physics Mock Test 1',
      subject: 'Physics',
      duration: 180,
      questions: 45,
      difficulty: 'Medium',
      attempted: false
    },
    {
      id: '2',
      title: 'NEET Chemistry Practice Set',
      subject: 'Chemistry',
      duration: 180,
      questions: 45,
      difficulty: 'Hard',
      attempted: true,
      score: 78
    },
    {
      id: '3',
      title: 'NEET Biology Comprehensive',
      subject: 'Biology',
      duration: 180,
      questions: 90,
      difficulty: 'Medium',
      attempted: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Practice Exams</h1>
          <p className="text-gray-600 dark:text-gray-400">Test your knowledge with comprehensive mock exams</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Exam
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="available">Available Exams</TabsTrigger>
          <TabsTrigger value="results">My Results</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <PracticeExamOverviewSection />
        </TabsContent>

        <TabsContent value="available">
          <div className="grid gap-4">
            {availableExams.map((exam) => (
              <Card key={exam.id} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">{exam.title}</h3>
                        <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                          {exam.difficulty}
                        </Badge>
                        {exam.attempted && exam.score && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Score: {exam.score}%
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{exam.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          <span>{exam.questions} questions</span>
                        </div>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {exam.subject}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {exam.attempted ? (
                        <>
                          <Button variant="outline" size="sm">
                            View Results
                          </Button>
                          <Button size="sm">
                            Retake Exam
                          </Button>
                        </>
                      ) : (
                        <Button size="sm">
                          Start Exam
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>My Exam Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Your exam results and performance analytics will appear here...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PracticeExamsSection;

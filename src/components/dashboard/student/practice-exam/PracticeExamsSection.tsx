
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileText, Plus, Filter, Search, Clock, Target, TrendingUp, Lightbulb, BookOpen, Brain } from 'lucide-react';

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
      attempted: false,
      progress: 0,
      accuracy: 0,
      description: 'Comprehensive physics test covering mechanics, thermodynamics, and optics'
    },
    {
      id: '2',
      title: 'NEET Chemistry Practice Set',
      subject: 'Chemistry',
      duration: 180,
      questions: 45,
      difficulty: 'Hard',
      attempted: true,
      score: 78,
      progress: 100,
      accuracy: 78,
      description: 'Advanced chemistry test focusing on organic and inorganic chemistry'
    },
    {
      id: '3',
      title: 'NEET Biology Comprehensive',
      subject: 'Biology',
      duration: 180,
      questions: 90,
      difficulty: 'Medium',
      attempted: false,
      progress: 0,
      accuracy: 0,
      description: 'Complete biology assessment covering botany, zoology, and human physiology'
    },
    {
      id: '4',
      title: 'NEET Full Mock Test',
      subject: 'All Subjects',
      duration: 720,
      questions: 180,
      difficulty: 'Hard',
      attempted: true,
      score: 85,
      progress: 100,
      accuracy: 85,
      description: 'Complete NEET simulation with all subjects'
    }
  ];

  // Subject colors matching concept card design
  const subjectColors = {
    'Physics': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20',
    'Chemistry': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20',
    'Biology': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20',
    'All Subjects': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20'
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Smart Suggestions Section */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
              <Lightbulb className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            Daily Smart Suggestions
            <Badge variant="outline" className="ml-auto bg-white dark:bg-gray-800">AI Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
            <Card className="bg-blue-50 border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/80 rounded-full shadow-sm">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-blue-800 text-sm">Take Physics Mock</h4>
                      <Badge variant="destructive" className="text-xs">High Priority</Badge>
                    </div>
                    <p className="text-xs text-gray-700 mb-3">Complete the pending physics mock test today</p>
                    <Button size="sm" variant="outline" className="w-full bg-white/80 hover:bg-white border-white/50 text-xs">
                      Start Test
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200 hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/80 rounded-full shadow-sm">
                    <Target className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-green-800 text-sm">Review Biology Results</h4>
                      <Badge variant="secondary" className="text-xs">Recommended</Badge>
                    </div>
                    <p className="text-xs text-gray-700 mb-3">Analyze your biology test performance patterns</p>
                    <Button size="sm" variant="outline" className="w-full bg-white/80 hover:bg-white border-white/50 text-xs">
                      View Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200 hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/80 rounded-full shadow-sm">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-amber-800 text-sm">Improve Weak Areas</h4>
                      <Badge variant="outline" className="text-xs">Optional</Badge>
                    </div>
                    <p className="text-xs text-gray-700 mb-3">Focus on chemistry organic compounds section</p>
                    <Button size="sm" variant="outline" className="w-full bg-white/80 hover:bg-white border-white/50 text-xs">
                      Practice More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-blue-700">{availableExams.length}</p>
            <p className="text-sm text-blue-600">Total Exams</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold text-green-700">
              {availableExams.filter(e => e.attempted).length}
            </p>
            <p className="text-sm text-green-600">Completed</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold text-purple-700">82%</p>
            <p className="text-sm text-purple-600">Avg Score</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold text-orange-700">3</p>
            <p className="text-sm text-orange-600">This Week</p>
          </CardContent>
        </Card>
      </div>

      {/* Exam Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableExams.map((exam) => (
          <Card key={exam.id} className="h-full flex flex-col hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/60 rounded-xl bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-950/80">
            <CardHeader className="pb-3 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={`${subjectColors[exam.subject as keyof typeof subjectColors]} px-3 py-1 rounded-full text-xs font-semibold`}>
                    {exam.subject}
                  </Badge>
                  <Badge variant="outline" className={`${getDifficultyColor(exam.difficulty)} px-3 py-1 rounded-full text-xs font-semibold`}>
                    {exam.difficulty}
                  </Badge>
                </div>
                {exam.attempted && exam.score && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 px-2 py-1 rounded-full text-xs font-medium">
                    Score: {exam.score}%
                  </Badge>
                )}
              </div>
              
              <CardTitle className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">
                {exam.title}
              </CardTitle>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {exam.description}
              </p>
            </CardHeader>
            
            <CardContent className="flex-grow space-y-4">
              {exam.attempted && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Progress</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{exam.progress}%</span>
                  </div>
                  <Progress value={exam.progress} className="h-2 bg-gray-200 dark:bg-gray-700" />
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                  <div className="text-sm font-bold text-blue-700 dark:text-blue-300">{exam.questions}</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">Questions</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2">
                  <div className="text-sm font-bold text-purple-700 dark:text-purple-300">{exam.duration}m</div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">Duration</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                  <div className="text-sm font-bold text-green-700 dark:text-green-300">{exam.accuracy || 0}%</div>
                  <div className="text-xs text-green-600 dark:text-green-400">Accuracy</div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-3 border-t border-gray-100 dark:border-gray-800 p-4">
              <div className="w-full flex gap-2">
                {exam.attempted ? (
                  <>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Results
                    </Button>
                    <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                      Retake Exam
                    </Button>
                  </>
                ) : (
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Start Exam
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );

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
          <OverviewTab />
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
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-2">
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
                      
                      <p className="text-sm text-gray-600">{exam.description}</p>
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

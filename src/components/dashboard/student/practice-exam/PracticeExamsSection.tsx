
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PracticeExamOverviewSection from './PracticeExamOverviewSection';
import { FileText, Plus, Filter, Search, Clock, Target, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const PracticeExamsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock data for subjects with exam progress
  const subjects = [
    { name: 'Physics', total: 25, completed: 18, avgScore: 78, color: 'blue' },
    { name: 'Chemistry', total: 22, completed: 15, avgScore: 82, color: 'purple' },
    { name: 'Biology', total: 28, completed: 21, avgScore: 85, color: 'green' },
    { name: 'Mathematics', total: 30, completed: 24, avgScore: 76, color: 'orange' }
  ];

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
      score: null,
      description: 'Comprehensive physics test covering mechanics and thermodynamics',
      examType: 'Mock Test'
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
      description: 'Advanced chemistry problems focusing on organic reactions',
      examType: 'Practice Set'
    },
    {
      id: '3',
      title: 'NEET Biology Comprehensive',
      subject: 'Biology',
      duration: 180,
      questions: 90,
      difficulty: 'Medium',
      attempted: false,
      score: null,
      description: 'Complete biology assessment covering all major topics',
      examType: 'Full Test'
    }
  ];

  const getSubjectColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500/10 to-blue-600/10 border-blue-200',
      purple: 'from-purple-500/10 to-purple-600/10 border-purple-200',
      green: 'from-green-500/10 to-green-600/10 border-green-200',
      orange: 'from-orange-500/10 to-orange-600/10 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredExams = selectedSubject === 'all' 
    ? availableExams 
    : availableExams.filter(exam => exam.subject === selectedSubject);

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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="available">Available Exams</TabsTrigger>
          <TabsTrigger value="results">My Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <PracticeExamOverviewSection />
        </TabsContent>

        <TabsContent value="available">
          <div className="space-y-6">
            {/* Subject filter tabs */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedSubject === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSubject('all')}
                className="rounded-full"
              >
                All Subjects
              </Button>
              {subjects.map((subject) => (
                <Button
                  key={subject.name}
                  variant={selectedSubject === subject.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSubject(subject.name)}
                  className="rounded-full"
                >
                  {subject.name}
                </Button>
              ))}
            </div>

            {/* Subject progress cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjects.map((subject) => (
                <Card 
                  key={subject.name} 
                  className={`relative overflow-hidden bg-gradient-to-br ${getSubjectColor(subject.color)} backdrop-blur-sm border hover:shadow-lg transition-all duration-300`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600">{subject.completed}/{subject.total} exams</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Completion</span>
                        <span>{Math.round((subject.completed / subject.total) * 100)}%</span>
                      </div>
                      <Progress value={(subject.completed / subject.total) * 100} className="h-2" />
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-blue-700">{subject.avgScore}%</div>
                      <div className="text-xs text-blue-600">Avg Score</div>
                    </div>
                    <Button size="sm" className="w-full">
                      Take {subject.name} Exam
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Available exams grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam) => (
                <Card key={exam.id} className="group relative overflow-hidden border-l-4 border-l-green-500 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-green-50/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-lg font-semibold">{exam.title}</CardTitle>
                      </div>
                      <Star className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                        {exam.subject}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                        {exam.difficulty}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {exam.examType}
                      </Badge>
                      {exam.attempted && exam.score && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Score: {exam.score}%
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 relative z-10">
                    <p className="text-sm text-gray-600">{exam.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 rounded-lg p-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-sm font-bold text-blue-700">{exam.duration}m</span>
                        </div>
                        <div className="text-xs text-blue-600">Duration</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Target className="h-3 w-3" />
                          <span className="text-sm font-bold text-purple-700">{exam.questions}</span>
                        </div>
                        <div className="text-xs text-purple-600">Questions</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {exam.attempted ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            View Results
                          </Button>
                          <Button size="sm" className="flex-1 group-hover:bg-green-600 transition-colors duration-300">
                            Retake Exam
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="w-full group-hover:bg-green-600 transition-colors duration-300">
                          Start Exam
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Detailed performance analytics and insights coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PracticeExamsSection;

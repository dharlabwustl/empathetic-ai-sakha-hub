
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, Target, Filter, Play, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PracticeExamLandingPage = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Mock data for practice exams with status
  const examsData = {
    today: [
      { id: 'physics-mock-1', title: 'Physics Mock Test 1', subject: 'Physics', questionCount: 30, difficulty: 'Medium', duration: 60, status: 'pending', scheduledToday: true, score: null },
      { id: 'chemistry-quiz-5', title: 'Chemistry Quick Quiz', subject: 'Chemistry', questionCount: 15, difficulty: 'Easy', duration: 30, status: 'pending', scheduledToday: true, score: null },
      { id: 'math-practice-3', title: 'Mathematics Practice', subject: 'Mathematics', questionCount: 25, difficulty: 'Hard', duration: 45, status: 'pending', scheduledToday: true, score: null }
    ],
    pending: [
      { id: 'biology-test-2', title: 'Biology Comprehensive Test', subject: 'Biology', questionCount: 40, difficulty: 'Medium', duration: 75, status: 'pending', scheduledToday: false, score: null },
      { id: 'physics-advanced', title: 'Advanced Physics', subject: 'Physics', questionCount: 35, difficulty: 'Hard', duration: 90, status: 'pending', scheduledToday: false, score: null },
      { id: 'chemistry-organic', title: 'Organic Chemistry Test', subject: 'Chemistry', questionCount: 20, difficulty: 'Medium', duration: 40, status: 'pending', scheduledToday: false, score: null }
    ],
    completed: [
      { id: 'math-basic-1', title: 'Basic Mathematics', subject: 'Mathematics', questionCount: 20, difficulty: 'Easy', duration: 30, status: 'completed', scheduledToday: false, score: 85 },
      { id: 'physics-mechanics', title: 'Physics - Mechanics', subject: 'Physics', questionCount: 25, difficulty: 'Medium', duration: 50, status: 'completed', scheduledToday: false, score: 78 }
    ]
  };

  const subjects = ['all', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];

  const getFilteredExams = (exams: any[]) => {
    if (selectedSubject === 'all') return exams;
    return exams.filter(exam => exam.subject === selectedSubject);
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Easy</Badge>;
      case 'Medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>;
      case 'Hard':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Hard</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string, scheduledToday: boolean, score: number | null) => {
    if (status === 'completed') {
      const scoreColor = score && score >= 80 ? 'text-green-700 bg-green-100 border-green-200' : 
                       score && score >= 60 ? 'text-yellow-700 bg-yellow-100 border-yellow-200' : 
                       'text-red-700 bg-red-100 border-red-200';
      return <Badge variant="outline" className={scoreColor}>Score: {score}%</Badge>;
    }
    if (scheduledToday) {
      return <Badge variant="destructive" className="bg-orange-100 text-orange-700 border-orange-200">Due Today</Badge>;
    }
    return <Badge variant="default" className="bg-blue-100 text-blue-700 border-blue-200">Take Test</Badge>;
  };

  const renderExamCard = (exam: any) => (
    <Card 
      key={exam.id} 
      className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-200 cursor-pointer bg-gradient-to-r from-white to-green-50/30"
      onClick={() => navigate(`/dashboard/student/practice-exam/${exam.id}/start`)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-500" />
            {getStatusBadge(exam.status, exam.scheduledToday, exam.score)}
          </div>
          {getDifficultyBadge(exam.difficulty)}
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{exam.title}</h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">{exam.subject}</span>
            <span>•</span>
            <span>{exam.questionCount} questions</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{exam.duration} min</span>
            </div>
            <Button size="sm" variant="outline" className="h-7 text-xs flex items-center gap-1">
              {exam.status === 'completed' ? (
                <>
                  <Award className="h-3 w-3" />
                  Review
                </>
              ) : (
                <>
                  <Play className="h-3 w-3" />
                  Start Test
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const getTabCount = (tabData: any[]) => {
    return getFilteredExams(tabData).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Practice Exams
          </h1>
          <p className="text-gray-600 mt-1">Test your knowledge and track your progress</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-gray-500" />
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="today" className="flex items-center gap-2">
            Today 
            <Badge variant="secondary" className="text-xs">{getTabCount(examsData.today)}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            Pending
            <Badge variant="secondary" className="text-xs">{getTabCount(examsData.pending)}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed
            <Badge variant="secondary" className="text-xs">{getTabCount(examsData.completed)}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredExams(examsData.today).map(renderExamCard)}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredExams(examsData.pending).map(renderExamCard)}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredExams(examsData.completed).map(renderExamCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PracticeExamLandingPage;

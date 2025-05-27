
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Clock, 
  TrendingUp, 
  Target,
  Lightbulb,
  Play
} from 'lucide-react';

interface SubjectProgress {
  name: string;
  completed: number;
  total: number;
  progress: number;
  efficiency: number;
  studyTime: number;
}

interface OverviewSectionProps {
  type: 'Concepts' | 'Flashcards' | 'Practice Exams';
  title: string;
  subjects: SubjectProgress[];
  totalStudyTime: number;
  overallProgress: number;
  suggestions: string[];
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  type,
  title,
  subjects,
  totalStudyTime,
  overallProgress,
  suggestions
}) => {
  const navigate = useNavigate();

  const getTypeIcon = () => {
    switch (type) {
      case 'Concepts':
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'Flashcards':
        return <Brain className="h-5 w-5 text-purple-600" />;
      case 'Practice Exams':
        return <FileText className="h-5 w-5 text-green-600" />;
    }
  };

  const getStudyActionText = () => {
    switch (type) {
      case 'Concepts':
        return 'Continue Learning';
      case 'Flashcards':
        return 'Study Flashcards';
      case 'Practice Exams':
        return 'Take Practice Test';
    }
  };

  const handleContinueLearning = () => {
    switch (type) {
      case 'Concepts':
        // Navigate to all concepts tab
        const conceptUrl = new URL('/dashboard/student/concepts', window.location.origin);
        conceptUrl.searchParams.set('tab', 'all-concepts');
        window.history.pushState({}, '', conceptUrl.toString());
        navigate('/dashboard/student/concepts');
        break;
      case 'Flashcards':
        navigate('/dashboard/student/flashcards?tab=all-flashcards');
        break;
      case 'Practice Exams':
        // Navigate to available exams tab
        const examUrl = new URL('/dashboard/student/practice-exam', window.location.origin);
        examUrl.searchParams.set('tab', 'available-exams');
        window.history.pushState({}, '', examUrl.toString());
        navigate('/dashboard/student/practice-exam');
        break;
    }
  };

  const handleSubjectStudy = (subjectName: string) => {
    switch (type) {
      case 'Concepts':
        // Navigate to all concepts tab
        const conceptUrl = new URL('/dashboard/student/concepts', window.location.origin);
        conceptUrl.searchParams.set('tab', 'all-concepts');
        window.history.pushState({}, '', conceptUrl.toString());
        navigate('/dashboard/student/concepts');
        break;
      case 'Flashcards':
        navigate('/dashboard/student/flashcards?tab=all-flashcards');
        break;
      case 'Practice Exams':
        // Navigate to available exams tab on the same page
        const examUrl = new URL('/dashboard/student/practice-exam', window.location.origin);
        examUrl.searchParams.set('tab', 'available-exams');
        window.history.pushState({}, '', examUrl.toString());
        navigate('/dashboard/student/practice-exam');
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getTypeIcon()}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <p className="text-gray-600 dark:text-gray-400">NEET subject-wise progress and insights</p>
          </div>
        </div>
        <Button onClick={handleContinueLearning} className="gap-2">
          <Play className="h-4 w-4" />
          {getStudyActionText()}
        </Button>
      </div>

      {/* Subject Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.name} className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{subject.name}</CardTitle>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {subject.progress}% Complete
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{subject.completed}/{subject.total}</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-green-50 rounded text-center">
                  <p className="text-lg font-bold text-green-700">{subject.efficiency}%</p>
                  <p className="text-xs text-green-600">Efficiency</p>
                </div>
                <div className="p-2 bg-blue-50 rounded text-center">
                  <p className="text-lg font-bold text-blue-700">{subject.studyTime}h</p>
                  <p className="text-xs text-blue-600">Study Time</p>
                </div>
              </div>

              <Button 
                className="w-full" 
                variant="outline" 
                size="sm" 
                onClick={() => handleSubjectStudy(subject.name)}
              >
                <Play className="mr-2 h-4 w-4" />
                Study {subject.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Suggestions */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Lightbulb className="h-5 w-5" />
            AI Study Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-orange-200">
                <p className="text-sm text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            {getTypeIcon()}
            <p className="text-2xl font-bold mt-2">{subjects.reduce((acc, s) => acc + s.total, 0)}</p>
            <p className="text-sm text-gray-600">Total Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{subjects.reduce((acc, s) => acc + s.completed, 0)}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{totalStudyTime}h</p>
            <p className="text-sm text-gray-600">Total Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{overallProgress}%</p>
            <p className="text-sm text-gray-600">Overall Progress</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewSection;

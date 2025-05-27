
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
  Play,
  Zap
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
  onContinueLearning?: () => void;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  type,
  title,
  subjects,
  totalStudyTime,
  overallProgress,
  suggestions,
  onContinueLearning
}) => {
  const navigate = useNavigate();

  // Smart suggestions based on type
  const getSmartSuggestions = () => {
    switch (type) {
      case 'Flashcards':
        return [
          {
            id: 'sg1',
            title: 'Focus on Chemistry Flashcards',
            description: 'Your Chemistry flashcard accuracy is below 75%. Review organic reactions.',
            type: 'priority',
            priority: 'high'
          },
          {
            id: 'sg2',
            title: 'Physics Quick Review',
            description: 'Spend 15 minutes on mechanics flashcards for better retention.',
            type: 'review',
            priority: 'medium'
          },
          {
            id: 'sg3',
            title: 'Biology Vocabulary',
            description: 'Practice cell biology terms for upcoming tests.',
            type: 'improvement',
            priority: 'high'
          },
          {
            id: 'sg4',
            title: 'Daily Flashcard Routine',
            description: 'Complete 20 flashcards daily for consistent progress.',
            type: 'routine',
            priority: 'low'
          }
        ];
      case 'Practice Exams':
        return [
          {
            id: 'sg1',
            title: 'Take Physics Mock Test',
            description: 'Your last physics score was 68%. Take a focused test on mechanics.',
            type: 'priority',
            priority: 'high'
          },
          {
            id: 'sg2',
            title: 'Chemistry Weak Areas',
            description: 'Focus on organic chemistry practice questions.',
            type: 'improvement',
            priority: 'high'
          },
          {
            id: 'sg3',
            title: 'Biology Full Test',
            description: 'Complete a full biology mock test to assess progress.',
            type: 'assessment',
            priority: 'medium'
          },
          {
            id: 'sg4',
            title: 'Time Management Practice',
            description: 'Take timed tests to improve your exam speed.',
            type: 'skill',
            priority: 'medium'
          }
        ];
      default: // Concepts
        return [
          {
            id: 'sg1',
            title: 'Focus on Physics Today',
            description: 'Your Physics performance needs attention. Start with Laws of Motion.',
            type: 'priority',
            priority: 'high'
          },
          {
            id: 'sg2',
            title: 'Quick Chemistry Review',
            description: 'Review organic reactions before starting new concepts.',
            type: 'review',
            priority: 'medium'
          },
          {
            id: 'sg3',
            title: 'Biology Weak Areas',
            description: 'Focus on Cell Biology and Genetics for better scores.',
            type: 'improvement',
            priority: 'high'
          },
          {
            id: 'sg4',
            title: 'Daily Concept Review',
            description: 'Spend 30 minutes reviewing yesterday\'s concepts.',
            type: 'routine',
            priority: 'low'
          }
        ];
    }
  };

  const smartSuggestions = getSmartSuggestions();

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
    if (onContinueLearning) {
      onContinueLearning();
      return;
    }
    
    switch (type) {
      case 'Concepts':
        navigate('/dashboard/student/concepts?tab=all-concepts');
        break;
      case 'Flashcards':
        navigate('/dashboard/student/flashcards?tab=all-flashcards');
        break;
      case 'Practice Exams':
        navigate('/dashboard/student/practice-exam?tab=available-exams');
        break;
    }
  };

  const handleSubjectStudy = (subjectName: string) => {
    switch (type) {
      case 'Concepts':
        navigate('/dashboard/student/concepts?tab=all-concepts');
        break;
      case 'Flashcards':
        navigate('/dashboard/student/flashcards?tab=all-flashcards');
        break;
      case 'Practice Exams':
        if (onContinueLearning) {
          onContinueLearning();
        } else {
          navigate('/dashboard/student/practice-exam?tab=available-exams');
        }
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

      {/* Smart Daily Suggestions */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Lightbulb className="h-5 w-5" />
            PREPZR AI Daily Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {smartSuggestions.slice(0, 4).map((suggestion) => (
              <div key={suggestion.id} className="p-3 bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-2">
                  <div className={`p-1.5 rounded-full ${
                    suggestion.priority === 'high' ? 'bg-red-100 text-red-600' :
                    suggestion.priority === 'medium' ? 'bg-orange-100 text-orange-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {suggestion.type === 'priority' ? <Target className="h-3 w-3" /> : 
                     suggestion.type === 'review' ? <Brain className="h-3 w-3" /> :
                     suggestion.type === 'improvement' ? <Zap className="h-3 w-3" /> :
                     suggestion.type === 'assessment' ? <FileText className="h-3 w-3" /> :
                     suggestion.type === 'skill' ? <TrendingUp className="h-3 w-3" /> :
                     <Clock className="h-3 w-3" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{suggestion.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      suggestion.priority === 'high' ? 'border-red-200 text-red-700' :
                      suggestion.priority === 'medium' ? 'border-orange-200 text-orange-700' :
                      'border-green-200 text-green-700'
                    }`}
                  >
                    {suggestion.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Subject Progress Cards - Similar to Flashcard Design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.name} className="group relative overflow-hidden border-2 hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-blue-300 bg-gradient-to-br from-white to-blue-50/30" onClick={() => handleSubjectStudy(subject.name)}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardHeader className="pb-3 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon()}
                  <CardTitle className="text-lg font-semibold">{subject.name}</CardTitle>
                </div>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 font-medium">
                  {subject.progress}%
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{subject.completed}/{subject.total} {type.toLowerCase()}</p>
            </CardHeader>

            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-2">
                <Progress value={subject.progress} className="h-3 bg-gray-200" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg text-center border border-green-200">
                  <p className="text-xl font-bold text-green-700">{subject.efficiency}%</p>
                  <p className="text-xs text-green-600 font-medium">Efficiency</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-center border border-blue-200">
                  <p className="text-xl font-bold text-blue-700">{subject.studyTime}h</p>
                  <p className="text-xs text-blue-600 font-medium">Study Time</p>
                </div>
              </div>

              <Button 
                className="w-full group-hover:bg-blue-600 transition-colors duration-300" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubjectStudy(subject.name);
                }}
              >
                <Play className="mr-2 h-4 w-4" />
                Study {subject.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

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

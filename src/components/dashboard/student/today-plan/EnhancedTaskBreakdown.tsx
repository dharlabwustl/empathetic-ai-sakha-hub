
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Book, 
  Brain, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Star,
  Play,
  RotateCcw,
  Bookmark
} from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface EnhancedTaskBreakdownProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const EnhancedTaskBreakdown: React.FC<EnhancedTaskBreakdownProps> = ({ 
  planData, 
  onConceptClick,
  isMobile = false 
}) => {
  if (!planData) return null;

  const renderConceptCard = (concept: any, index: number) => {
    const isCompleted = concept.status === 'completed';
    const difficultyColor = {
      'Easy': 'from-green-500 to-emerald-600',
      'Medium': 'from-amber-500 to-orange-600', 
      'Hard': 'from-red-500 to-rose-600'
    }[concept.difficulty] || 'from-blue-500 to-indigo-600';

    return (
      <Card 
        key={concept.id}
        className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
          isCompleted ? 'opacity-75' : ''
        }`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${difficultyColor} opacity-10`} />
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${difficultyColor}`} />
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Book className="h-5 w-5 text-blue-500" />
              )}
              <Badge 
                variant={isCompleted ? "secondary" : "default"}
                className={`${isCompleted ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
              >
                {isCompleted ? "Completed" : "Study"}
              </Badge>
            </div>
            <Badge variant="outline" className="text-xs">
              {concept.difficulty}
            </Badge>
          </div>
          
          <CardTitle className={`text-lg font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {concept.title}
          </CardTitle>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Book className="h-4 w-4" />
              {concept.subject}
            </span>
            <span>•</span>
            <span>{concept.topic}</span>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{concept.duration} minutes</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600">Priority</span>
            </div>
          </div>

          <div className="flex gap-2">
            {!isCompleted && (
              <Button 
                size="sm" 
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                onClick={() => onConceptClick(concept.id)}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Study
              </Button>
            )}
            <Button size="sm" variant="outline" className="p-2">
              <Bookmark className="h-4 w-4" />
            </Button>
            {isCompleted && (
              <Button size="sm" variant="outline" className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2" />
                Review
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderFlashcardCard = (flashcard: any, index: number) => {
    const isCompleted = flashcard.status === 'completed';

    return (
      <Card 
        key={flashcard.id}
        className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
          isCompleted ? 'opacity-75' : ''
        }`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-600" />
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Brain className="h-5 w-5 text-purple-500" />
              )}
              <Badge 
                variant={isCompleted ? "secondary" : "default"}
                className={`${isCompleted ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}
              >
                {isCompleted ? "Completed" : "Review"}
              </Badge>
            </div>
            <span className="text-xs text-gray-500">{flashcard.cardCount} cards</span>
          </div>
          
          <CardTitle className={`text-lg font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {flashcard.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{flashcard.duration} minutes</span>
            </div>
            <Progress value={isCompleted ? 100 : 0} className="w-16 h-2" />
          </div>

          <div className="flex gap-2">
            {!isCompleted && (
              <Button 
                size="sm" 
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Review
              </Button>
            )}
            <Button size="sm" variant="outline" className="p-2">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderPracticeExamCard = (exam: any, index: number) => {
    const isCompleted = exam.status === 'completed';

    return (
      <Card 
        key={exam.id}
        className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
          isCompleted ? 'opacity-75' : ''
        }`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-600" />
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <FileText className="h-5 w-5 text-orange-500" />
              )}
              <Badge 
                variant={isCompleted ? "secondary" : "default"}
                className={`${isCompleted ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}
              >
                {isCompleted ? "Completed" : "Practice"}
              </Badge>
            </div>
            <span className="text-xs text-gray-500">{exam.questionCount} questions</span>
          </div>
          
          <CardTitle className={`text-lg font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {exam.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{exam.duration} minutes</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600">High Impact</span>
            </div>
          </div>

          <div className="flex gap-2">
            {!isCompleted && (
              <Button 
                size="sm" 
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Exam
              </Button>
            )}
            <Button size="sm" variant="outline" className="p-2">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-8">
      {/* Concepts Section */}
      {planData.concepts && planData.concepts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Study Concepts</h2>
            <Badge variant="outline" className="text-sm">
              {planData.concepts.filter(c => c.status === 'completed').length} / {planData.concepts.length} Complete
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planData.concepts.map(renderConceptCard)}
          </div>
        </div>
      )}

      {/* Flashcards Section */}
      {planData.flashcards && planData.flashcards.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Flashcard Reviews</h2>
            <Badge variant="outline" className="text-sm">
              {planData.flashcards.filter(f => f.status === 'completed').length} / {planData.flashcards.length} Complete
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planData.flashcards.map(renderFlashcardCard)}
          </div>
        </div>
      )}

      {/* Practice Exams Section */}
      {planData.practiceExams && planData.practiceExams.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Practice Tests</h2>
            <Badge variant="outline" className="text-sm">
              {planData.practiceExams.filter(p => p.status === 'completed').length} / {planData.practiceExams.length} Complete
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planData.practiceExams.map(renderPracticeExamCard)}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedTaskBreakdown;

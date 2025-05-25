
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Book, BookOpen, Brain, FileText, CheckCircle, Clock, Play, Target, AlertCircle } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface PremiumTaskBreakdownProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  onTaskComplete: (id: string, type: 'concept' | 'flashcard' | 'practice-exam') => void;
  isMobile?: boolean;
}

const PremiumTaskBreakdown: React.FC<PremiumTaskBreakdownProps> = ({ 
  planData, 
  onConceptClick,
  onTaskComplete,
  isMobile = false 
}) => {
  if (!planData) return null;
  
  const renderConceptCard = (concept: any) => {
    const isCompleted = concept.status === 'completed';
    
    return (
      <Card 
        key={concept.id} 
        className={`premium-card border-l-4 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
          isCompleted 
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-emerald-500' 
            : 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 hover:to-indigo-100 border-l-blue-500'
        }`}
        onClick={() => onConceptClick(concept.id)}
      >
        <CardContent className={`p-6 ${isMobile ? 'p-4' : ''}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${isCompleted ? 'bg-emerald-100' : 'bg-blue-100'}`}>
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                ) : (
                  <BookOpen className="h-5 w-5 text-blue-600" />
                )}
              </div>
              <div>
                <Badge variant={isCompleted ? "outline" : "default"} className={
                  isCompleted ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-blue-100 text-blue-700 border-blue-200"
                }>
                  {isCompleted ? "Completed" : "Pending"}
                </Badge>
              </div>
            </div>
            <Badge variant="outline" className={
              concept.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' :
              concept.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              'bg-red-50 text-red-700 border-red-200'
            }>
              {concept.difficulty}
            </Badge>
          </div>
          
          <h3 className={`font-semibold text-lg mb-3 ${
            isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
          }`}>
            {concept.title}
          </h3>
          
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span className="font-medium">{concept.subject}</span>
              <span>•</span>
              <span>{concept.topic}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{concept.duration} min</span>
              </div>
              {!isCompleted && (
                <Button 
                  size="sm" 
                  className="h-8 px-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTaskComplete(concept.id, 'concept');
                  }}
                >
                  <Play className="h-3 w-3 mr-1" />
                  Start
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderFlashcardCard = (flashcard: any) => {
    const isCompleted = flashcard.status === 'completed';
    
    return (
      <Card 
        key={flashcard.id} 
        className={`premium-card border-l-4 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
          isCompleted 
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-emerald-500' 
            : 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 hover:to-pink-100 border-l-purple-500'
        }`}
      >
        <CardContent className={`p-6 ${isMobile ? 'p-4' : ''}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${isCompleted ? 'bg-emerald-100' : 'bg-purple-100'}`}>
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                ) : (
                  <Brain className="h-5 w-5 text-purple-600" />
                )}
              </div>
              <Badge variant={isCompleted ? "outline" : "default"} className={
                isCompleted ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-purple-100 text-purple-700 border-purple-200"
              }>
                {isCompleted ? "Completed" : "Review"}
              </Badge>
            </div>
            <span className="text-sm text-gray-500 font-medium">{flashcard.cardCount} cards</span>
          </div>
          
          <h3 className={`font-semibold text-lg mb-3 ${
            isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
          }`}>
            {flashcard.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{flashcard.duration} min</span>
            </div>
            {!isCompleted && (
              <Button 
                size="sm" 
                className="h-8 px-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => onTaskComplete(flashcard.id, 'flashcard')}
              >
                <Play className="h-3 w-3 mr-1" />
                Review
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderPracticeExamCard = (exam: any) => {
    const isCompleted = exam.status === 'completed';
    
    return (
      <Card 
        key={exam.id} 
        className={`premium-card border-l-4 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
          isCompleted 
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-emerald-500' 
            : 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 hover:from-orange-100 hover:to-red-100 border-l-orange-500'
        }`}
      >
        <CardContent className={`p-6 ${isMobile ? 'p-4' : ''}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${isCompleted ? 'bg-emerald-100' : 'bg-orange-100'}`}>
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                ) : (
                  <FileText className="h-5 w-5 text-orange-600" />
                )}
              </div>
              <Badge variant={isCompleted ? "outline" : "default"} className={
                isCompleted ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-orange-100 text-orange-700 border-orange-200"
              }>
                {isCompleted ? "Completed" : "Practice"}
              </Badge>
            </div>
            <span className="text-sm text-gray-500 font-medium">{exam.questionCount} questions</span>
          </div>
          
          <h3 className={`font-semibold text-lg mb-3 ${
            isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
          }`}>
            {exam.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{exam.duration} min</span>
            </div>
            {!isCompleted && (
              <Button 
                size="sm" 
                className="h-8 px-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                onClick={() => onTaskComplete(exam.id, 'practice-exam')}
              >
                <Play className="h-3 w-3 mr-1" />
                Start Exam
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Show backlog tasks if any
  const renderBacklogSection = () => {
    if (!planData.backlogTasks || planData.backlogTasks.length === 0) return null;
    
    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pending Tasks</h2>
          <Badge variant="destructive" className="bg-amber-500 text-white">
            {planData.backlogTasks.length} overdue
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {planData.backlogTasks.map(task => (
            <Card key={task.id} className="border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="destructive" className="bg-amber-500 text-white text-xs">
                    {task.daysOverdue} days overdue
                  </Badge>
                  <span className="text-xs text-gray-500">{task.timeEstimate} min</span>
                </div>
                <h3 className="font-medium text-sm mb-1">{task.title}</h3>
                <p className="text-xs text-gray-600">{task.subject}</p>
                <Button size="sm" variant="outline" className="w-full mt-3 h-7 text-xs">
                  Complete Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-8">
      {renderBacklogSection()}
      
      {/* Today's Concepts Section */}
      {planData.concepts && planData.concepts.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Today's Concepts</h2>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {planData.concepts.filter(c => c.status !== 'completed').length} pending
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planData.concepts.map(renderConceptCard)}
          </div>
        </div>
      )}

      {/* Today's Flashcards Section */}
      {planData.flashcards && planData.flashcards.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Brain className="h-5 w-5 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Flashcard Reviews</h2>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              {planData.flashcards.filter(f => f.status !== 'completed').length} pending
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planData.flashcards.map(renderFlashcardCard)}
          </div>
        </div>
      )}

      {/* Today's Practice Exams Section */}
      {planData.practiceExams && planData.practiceExams.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Practice Tests</h2>
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              {planData.practiceExams.filter(p => p.status !== 'completed').length} pending
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

export default PremiumTaskBreakdown;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, BookOpen, Brain, FileText, CheckCircle, Clock } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { Button } from '@/components/ui/button';
import { SubjectTasksBreakdown } from './SubjectTasksBreakdown';

interface NewTodaysPlanViewProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ 
  planData, 
  onConceptClick,
  isMobile 
}) => {
  if (!planData) return null;
  
  const renderConceptCard = (concept: any) => {
    const isCompleted = concept.status === 'completed';
    
    return (
      <Card 
        key={concept.id} 
        className={`border-l-4 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md ${
          isCompleted 
            ? 'bg-green-50 dark:bg-green-900/20 border-l-green-500' 
            : 'hover:shadow-lg border-l-blue-500'
        }`}
        onClick={() => onConceptClick(concept.id)}
      >
        <CardContent className={`p-4 ${isMobile ? 'p-3' : ''}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <BookOpen className="h-5 w-5 text-blue-500" />
              )}
              <Badge variant={isCompleted ? "outline" : "default"} className={
                isCompleted ? "bg-green-100 text-green-700 border-green-200" : ""
              }>
                {isCompleted ? "Completed" : "Pending"}
              </Badge>
            </div>
            <Badge variant="outline" className={
              concept.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' :
              concept.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              'bg-red-50 text-red-700 border-red-200'
            }>
              {concept.difficulty}
            </Badge>
          </div>
          
          <h3 className={`font-medium ${isMobile ? 'text-sm' : 'text-base'} mb-2 ${
            isCompleted ? 'line-through text-gray-500' : ''
          }`}>
            {concept.title}
          </h3>
          
          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>{concept.subject}</span>
              <span>•</span>
              <span>{concept.topic}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{concept.duration} min</span>
              </div>
              {!isCompleted && (
                <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                  Start Study
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
        className={`border-l-4 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md ${
          isCompleted 
            ? 'bg-green-50 dark:bg-green-900/20 border-l-green-500' 
            : 'hover:shadow-lg border-l-purple-500'
        }`}
      >
        <CardContent className={`p-4 ${isMobile ? 'p-3' : ''}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Brain className="h-5 w-5 text-purple-500" />
              )}
              <Badge variant={isCompleted ? "outline" : "default"} className={
                isCompleted ? "bg-green-100 text-green-700 border-green-200" : "bg-purple-100 text-purple-700 border-purple-200"
              }>
                {isCompleted ? "Completed" : "Review"}
              </Badge>
            </div>
            <span className="text-xs text-gray-500">{flashcard.cardCount} cards</span>
          </div>
          
          <h3 className={`font-medium ${isMobile ? 'text-sm' : 'text-base'} mb-2 ${
            isCompleted ? 'line-through text-gray-500' : ''
          }`}>
            {flashcard.title}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{flashcard.duration} min</span>
            </div>
            {!isCompleted && (
              <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                Start Review
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
        className={`border-l-4 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md ${
          isCompleted 
            ? 'bg-green-50 dark:bg-green-900/20 border-l-green-500' 
            : 'hover:shadow-lg border-l-orange-500'
        }`}
      >
        <CardContent className={`p-4 ${isMobile ? 'p-3' : ''}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <FileText className="h-5 w-5 text-orange-500" />
              )}
              <Badge variant={isCompleted ? "outline" : "default"} className={
                isCompleted ? "bg-green-100 text-green-700 border-green-200" : "bg-orange-100 text-orange-700 border-orange-200"
              }>
                {isCompleted ? "Completed" : "Practice"}
              </Badge>
            </div>
            <span className="text-xs text-gray-500">{exam.questionCount} questions</span>
          </div>
          
          <h3 className={`font-medium ${isMobile ? 'text-sm' : 'text-base'} mb-2 ${
            isCompleted ? 'line-through text-gray-500' : ''
          }`}>
            {exam.title}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{exam.duration} min</span>
            </div>
            {!isCompleted && (
              <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                Start Exam
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6">
      {/* Today's Concepts Section */}
      {planData.concepts && planData.concepts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Today's Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planData.concepts.map(renderConceptCard)}
          </div>
        </div>
      )}

      {/* Today's Flashcards Section */}
      {planData.flashcards && planData.flashcards.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Flashcard Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planData.flashcards.map(renderFlashcardCard)}
          </div>
        </div>
      )}

      {/* Today's Practice Exams Section */}
      {planData.practiceExams && planData.practiceExams.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Practice Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planData.practiceExams.map(renderPracticeExamCard)}
          </div>
        </div>
      )}

      {/* Subject Tasks Breakdown */}
      <SubjectTasksBreakdown />
    </div>
  );
};

export default NewTodaysPlanView;

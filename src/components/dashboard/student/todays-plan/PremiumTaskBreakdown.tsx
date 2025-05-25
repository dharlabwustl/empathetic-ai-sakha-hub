
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, FileText, CheckCircle, Clock, Star, Zap } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface PremiumTaskBreakdownProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  onMarkCompleted: (id: string, type: 'concept' | 'flashcard' | 'practice-exam') => void;
  isMobile?: boolean;
}

const PremiumTaskBreakdown: React.FC<PremiumTaskBreakdownProps> = ({ 
  planData, 
  onConceptClick,
  onMarkCompleted,
  isMobile 
}) => {
  if (!planData) return null;
  
  const renderConceptCard = (concept: any, index: number) => {
    const isCompleted = concept.status === 'completed';
    
    return (
      <motion.div
        key={concept.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="group"
      >
        <Card 
          className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
            isCompleted 
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200' 
              : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 hover:shadow-xl border-blue-200 hover:border-blue-300'
          }`}
          onClick={() => onConceptClick(concept.id)}
        >
          {/* Premium gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${
            isCompleted 
              ? 'from-green-500/10 to-emerald-500/10' 
              : 'from-blue-500/10 via-indigo-500/10 to-purple-500/10'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          <CardContent className={`relative p-6 ${isMobile ? 'p-4' : ''}`}>
            {/* Header with status and difficulty */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  isCompleted 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <Badge 
                  variant={isCompleted ? "secondary" : "default"} 
                  className={
                    isCompleted 
                      ? "bg-green-100 text-green-700 border-green-200" 
                      : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200"
                  }
                >
                  {isCompleted ? "Completed" : "Ready to Study"}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={
                    concept.difficulty === 'Easy' ? 'border-green-200 text-green-700 bg-green-50' :
                    concept.difficulty === 'Medium' ? 'border-amber-200 text-amber-700 bg-amber-50' :
                    'border-red-200 text-red-700 bg-red-50'
                  }
                >
                  {concept.difficulty}
                </Badge>
                {!isCompleted && (
                  <Star className="h-4 w-4 text-yellow-500" />
                )}
              </div>
            </div>
            
            {/* Title and subject */}
            <div className="mb-4">
              <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} mb-2 ${
                isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
              }`}>
                {concept.title}
              </h3>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">{concept.subject}</span>
                <span>•</span>
                <span>{concept.topic}</span>
              </div>
            </div>
            
            {/* Footer with time and action */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {concept.duration} min
                </span>
                <Zap className="h-4 w-4 text-yellow-500 ml-2" />
                <span className="text-xs text-yellow-600 font-medium">AI Enhanced</span>
              </div>
              
              {!isCompleted && (
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkCompleted(concept.id, 'concept');
                  }}
                >
                  Start Study
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const renderFlashcardCard = (flashcard: any, index: number) => {
    const isCompleted = flashcard.status === 'completed';
    
    return (
      <motion.div
        key={flashcard.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="group"
      >
        <Card className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
          isCompleted 
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200' 
            : 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-indigo-900/20 hover:shadow-xl border-purple-200 hover:border-purple-300'
        }`}>
          <div className={`absolute inset-0 bg-gradient-to-r ${
            isCompleted 
              ? 'from-green-500/10 to-emerald-500/10' 
              : 'from-purple-500/10 via-pink-500/10 to-indigo-500/10'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          <CardContent className={`relative p-6 ${isMobile ? 'p-4' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  isCompleted 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Brain className="h-5 w-5 text-purple-600" />
                  )}
                </div>
                <Badge 
                  variant={isCompleted ? "secondary" : "default"} 
                  className={
                    isCompleted 
                      ? "bg-green-100 text-green-700 border-green-200" 
                      : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
                  }
                >
                  {isCompleted ? "Completed" : "Review"}
                </Badge>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {flashcard.cardCount} cards
              </span>
            </div>
            
            <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} mb-4 ${
              isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
            }`}>
              {flashcard.title}
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {flashcard.duration} min
                </span>
              </div>
              
              {!isCompleted && (
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkCompleted(flashcard.id, 'flashcard');
                  }}
                >
                  Start Review
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const renderPracticeExamCard = (exam: any, index: number) => {
    const isCompleted = exam.status === 'completed';
    
    return (
      <motion.div
        key={exam.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="group"
      >
        <Card className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
          isCompleted 
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200' 
            : 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-900/20 dark:via-amber-900/20 dark:to-yellow-900/20 hover:shadow-xl border-orange-200 hover:border-orange-300'
        }`}>
          <div className={`absolute inset-0 bg-gradient-to-r ${
            isCompleted 
              ? 'from-green-500/10 to-emerald-500/10' 
              : 'from-orange-500/10 via-amber-500/10 to-yellow-500/10'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          <CardContent className={`relative p-6 ${isMobile ? 'p-4' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  isCompleted 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : 'bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <FileText className="h-5 w-5 text-orange-600" />
                  )}
                </div>
                <Badge 
                  variant={isCompleted ? "secondary" : "default"} 
                  className={
                    isCompleted 
                      ? "bg-green-100 text-green-700 border-green-200" 
                      : "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border-orange-200"
                  }
                >
                  {isCompleted ? "Completed" : "Practice"}
                </Badge>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {exam.questionCount} questions
              </span>
            </div>
            
            <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} mb-4 ${
              isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
            }`}>
              {exam.title}
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {exam.duration} min
                </span>
              </div>
              
              {!isCompleted && (
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkCompleted(exam.id, 'practice-exam');
                  }}
                >
                  Start Exam
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };
  
  return (
    <div className="space-y-8">
      {/* Today's Concepts Section */}
      {planData.concepts && planData.concepts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Today's Concepts
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planData.concepts.map(renderConceptCard)}
          </div>
        </motion.div>
      )}

      {/* Today's Flashcards Section */}
      {planData.flashcards && planData.flashcards.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Flashcard Reviews
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planData.flashcards.map(renderFlashcardCard)}
          </div>
        </motion.div>
      )}

      {/* Today's Practice Exams Section */}
      {planData.practiceExams && planData.practiceExams.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Practice Tests
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planData.practiceExams.map(renderPracticeExamCard)}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PremiumTaskBreakdown;

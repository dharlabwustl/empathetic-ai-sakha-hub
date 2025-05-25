
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, FileText, CheckCircle, Clock, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface PremiumTaskCardsProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const PremiumTaskCards: React.FC<PremiumTaskCardsProps> = ({ 
  planData, 
  onConceptClick,
  isMobile = false 
}) => {
  if (!planData) return null;

  const renderConceptCard = (concept: any, index: number) => {
    const isCompleted = concept.status === 'completed';
    
    return (
      <motion.div
        key={concept.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
      >
        <Card 
          className={`group relative overflow-hidden cursor-pointer transition-all duration-300 ${
            isCompleted 
              ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg' 
              : 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:shadow-xl hover:shadow-blue-500/25'
          }`}
          onClick={() => onConceptClick(concept.id)}
        >
          {/* Premium gradient border effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${
            isCompleted 
              ? 'from-green-500 to-emerald-500' 
              : 'from-blue-500 to-indigo-600'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} 
          style={{ padding: '2px' }}>
            <div className="w-full h-full bg-white rounded-lg"></div>
          </div>
          
          <CardContent className="relative p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div 
                  className={`p-3 rounded-xl ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                  } shadow-lg`}
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : (
                    <BookOpen className="h-6 w-6 text-white" />
                  )}
                </motion.div>
                <div>
                  <Badge 
                    variant={isCompleted ? "outline" : "default"} 
                    className={`${
                      isCompleted 
                        ? "bg-green-100 text-green-700 border-green-300" 
                        : "bg-blue-100 text-blue-700 border-blue-300"
                    } font-medium`}
                  >
                    {isCompleted ? "✓ Completed" : "Pending"}
                  </Badge>
                  {concept.difficulty && (
                    <Badge variant="outline" className={`ml-2 ${
                      concept.difficulty === 'Easy' ? 'bg-green-50 text-green-700' :
                      concept.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {concept.difficulty}
                    </Badge>
                  )}
                </div>
              </div>
              <Star className="h-5 w-5 text-amber-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h3 className={`text-lg font-bold mb-3 ${
              isCompleted ? 'text-gray-600 line-through' : 'text-gray-900'
            }`}>
              {concept.title}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium">{concept.subject}</span>
                {concept.topic && (
                  <>
                    <span>•</span>
                    <span>{concept.topic}</span>
                  </>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{concept.duration} min</span>
                </div>
                {!isCompleted && (
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Start
                  </Button>
                )}
              </div>
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
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
      >
        <Card 
          className={`group relative overflow-hidden cursor-pointer transition-all duration-300 ${
            isCompleted 
              ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg' 
              : 'bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200 hover:shadow-xl hover:shadow-purple-500/25'
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${
            isCompleted 
              ? 'from-green-500 to-emerald-500' 
              : 'from-purple-500 to-pink-500'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} 
          style={{ padding: '2px' }}>
            <div className="w-full h-full bg-white rounded-lg"></div>
          </div>
          
          <CardContent className="relative p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div 
                  className={`p-3 rounded-xl ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  } shadow-lg`}
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : (
                    <Brain className="h-6 w-6 text-white" />
                  )}
                </motion.div>
                <Badge 
                  variant={isCompleted ? "outline" : "default"} 
                  className={`${
                    isCompleted 
                      ? "bg-green-100 text-green-700 border-green-300" 
                      : "bg-purple-100 text-purple-700 border-purple-300"
                  } font-medium`}
                >
                  {isCompleted ? "✓ Completed" : "Review"}
                </Badge>
              </div>
              <Badge variant="outline" className="text-xs bg-gray-50">
                {flashcard.cardCount} cards
              </Badge>
            </div>
            
            <h3 className={`text-lg font-bold mb-3 ${
              isCompleted ? 'text-gray-600 line-through' : 'text-gray-900'
            }`}>
              {flashcard.title}
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{flashcard.duration} min</span>
              </div>
              {!isCompleted && (
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Review
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
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
      >
        <Card 
          className={`group relative overflow-hidden cursor-pointer transition-all duration-300 ${
            isCompleted 
              ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg' 
              : 'bg-gradient-to-br from-orange-50 to-red-100 border-orange-200 hover:shadow-xl hover:shadow-orange-500/25'
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${
            isCompleted 
              ? 'from-green-500 to-emerald-500' 
              : 'from-orange-500 to-red-500'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} 
          style={{ padding: '2px' }}>
            <div className="w-full h-full bg-white rounded-lg"></div>
          </div>
          
          <CardContent className="relative p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div 
                  className={`p-3 rounded-xl ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gradient-to-r from-orange-500 to-red-500'
                  } shadow-lg`}
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : (
                    <FileText className="h-6 w-6 text-white" />
                  )}
                </motion.div>
                <Badge 
                  variant={isCompleted ? "outline" : "default"} 
                  className={`${
                    isCompleted 
                      ? "bg-green-100 text-green-700 border-green-300" 
                      : "bg-orange-100 text-orange-700 border-orange-300"
                  } font-medium`}
                >
                  {isCompleted ? "✓ Completed" : "Practice"}
                </Badge>
              </div>
              <Badge variant="outline" className="text-xs bg-gray-50">
                {exam.questionCount} questions
              </Badge>
            </div>
            
            <h3 className={`text-lg font-bold mb-3 ${
              isCompleted ? 'text-gray-600 line-through' : 'text-gray-900'
            }`}>
              {exam.title}
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{exam.duration} min</span>
              </div>
              {!isCompleted && (
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Start
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
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Today's Concepts
          </h2>
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
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Flashcard Reviews
          </h2>
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
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Practice Tests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planData.practiceExams.map(renderPracticeExamCard)}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PremiumTaskCards;

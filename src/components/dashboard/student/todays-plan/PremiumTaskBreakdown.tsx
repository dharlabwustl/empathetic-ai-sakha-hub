
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, TestTube, Clock, Play, CheckCircle } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { motion } from 'framer-motion';

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
  isMobile = false 
}) => {
  if (!planData) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'completed' ? 
      <CheckCircle className="h-5 w-5 text-green-600" /> : 
      <Play className="h-5 w-5 text-blue-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Concepts Section */}
      {planData.concepts && planData.concepts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-purple-600" />
                Concept Learning ({planData.concepts.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {planData.concepts.map((concept, index) => (
                <motion.div
                  key={concept.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-lg">{concept.title}</h4>
                    {getStatusIcon(concept.status)}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{concept.subject}</Badge>
                    <Badge className={getDifficultyColor(concept.difficulty || 'Medium')}>
                      {concept.difficulty || 'Medium'}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {concept.duration}m
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Topic: {concept.topic}
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => onConceptClick(concept.id)}
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                    >
                      {concept.status === 'completed' ? 'Review' : 'Start Learning'}
                    </Button>
                    {concept.status !== 'completed' && (
                      <Button 
                        onClick={() => onMarkCompleted(concept.id, 'concept')}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Flashcards Section */}
      {planData.flashcards && planData.flashcards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-green-600" />
                Flashcard Review ({planData.flashcards.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {planData.flashcards.map((flashcard, index) => (
                <motion.div
                  key={flashcard.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-lg">{flashcard.title}</h4>
                    {getStatusIcon(flashcard.status)}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{flashcard.subject}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {flashcard.duration}m
                    </div>
                    <span className="text-sm text-gray-600">
                      {flashcard.cardCount} cards
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                    >
                      {flashcard.status === 'completed' ? 'Review Again' : 'Start Review'}
                    </Button>
                    {flashcard.status !== 'completed' && (
                      <Button 
                        onClick={() => onMarkCompleted(flashcard.id, 'flashcard')}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Practice Exams Section */}
      {planData.practiceExams && planData.practiceExams.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-6 w-6 text-blue-600" />
                Practice Tests ({planData.practiceExams.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {planData.practiceExams.map((exam, index) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-lg">{exam.title}</h4>
                    {getStatusIcon(exam.status)}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{exam.subject}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {exam.duration}m
                    </div>
                    <span className="text-sm text-gray-600">
                      {exam.questionCount} questions
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                    >
                      {exam.status === 'completed' ? 'Retake Test' : 'Start Test'}
                    </Button>
                    {exam.status !== 'completed' && (
                      <Button 
                        onClick={() => onMarkCompleted(exam.id, 'practice-exam')}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default PremiumTaskBreakdown;

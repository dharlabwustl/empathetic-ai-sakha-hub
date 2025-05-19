
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { Clock, BookOpen, Brain, FileText, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface NewTodaysPlanViewProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  isMobile: boolean;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ planData, onConceptClick, isMobile }) => {
  if (!planData) return null;
  
  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <div className="h-3 w-3 rounded-full bg-amber-500" />;
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-300" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Concepts Section */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="h-5 w-5 text-blue-600 mr-2" /> 
              Concept Study
            </CardTitle>
            <Badge variant="outline">
              {planData?.concepts.length || 0} concepts
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 gap-3">
            {planData?.concepts?.map((concept, index) => (
              <motion.div
                key={concept.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`cursor-pointer group p-3 ${concept.status === 'completed' ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : 'bg-white dark:bg-gray-800'} border rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all`}
                onClick={() => onConceptClick(concept.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <div className="mt-1">
                      {getStatusIndicator(concept.status)}
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {concept.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {concept.subject} • {concept.topic}
                        </span>
                        <Badge variant="outline" className={`text-xs ${
                          concept.difficulty === 'Easy' ? 'border-green-200 text-green-700 bg-green-50' :
                          concept.difficulty === 'Medium' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                          'border-red-200 text-red-700 bg-red-50'
                        }`}>
                          {concept.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">{concept.duration} min</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {(!planData?.concepts || planData.concepts.length === 0) && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No concept study scheduled for today</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Flashcards Section */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <Brain className="h-5 w-5 text-purple-600 mr-2" /> 
              Flashcards Review
            </CardTitle>
            <Badge variant="outline">
              {planData?.flashcards.length || 0} decks
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 gap-3">
            {planData?.flashcards?.map((flashcard, index) => (
              <motion.div
                key={flashcard.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`p-3 ${flashcard.status === 'completed' ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : 'bg-white dark:bg-gray-800'} border rounded-lg`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <div className="mt-1">
                      {getStatusIndicator(flashcard.status)}
                    </div>
                    <div>
                      <h3 className="font-medium">{flashcard.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {flashcard.subject} • {flashcard.cardCount} cards
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">{flashcard.duration} min</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {(!planData?.flashcards || planData.flashcards.length === 0) && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No flashcard review scheduled for today</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Practice Exams Section */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 text-green-600 mr-2" /> 
              Practice Exams
            </CardTitle>
            <Badge variant="outline">
              {planData?.practiceExams.length || 0} exams
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 gap-3">
            {planData?.practiceExams?.map((exam, index) => (
              <motion.div
                key={exam.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className={`p-3 ${exam.status === 'completed' ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : 'bg-white dark:bg-gray-800'} border rounded-lg`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <div className="mt-1">
                      {getStatusIndicator(exam.status)}
                    </div>
                    <div>
                      <h3 className="font-medium">{exam.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {exam.subject} • {exam.questionCount} questions
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">{exam.duration} min</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {(!planData?.practiceExams || planData.practiceExams.length === 0) && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No practice exams scheduled for today</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTodaysPlanView;

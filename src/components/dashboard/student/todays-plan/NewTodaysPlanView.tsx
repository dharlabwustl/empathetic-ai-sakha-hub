
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, BookOpen, ArrowRight, BookMarked, Brain, Flag } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ConceptCard {
  id: string;
  title: string;
  description: string;
  subject: string;
  chapter?: string;
  estimatedTime: number;
  difficulty: string;
  completed: boolean;
}

interface PracticeQuiz {
  id: string;
  title: string;
  questions: number;
  estimatedTime: number;
  completed: boolean;
  subject: string;
}

interface StudyPlan {
  date: string;
  totalItems: number;
  completedItems: number;
  conceptCards: ConceptCard[];
  practiceQuizzes: PracticeQuiz[];
  revision?: string[];
}

interface NewTodaysPlanViewProps {
  planData: StudyPlan;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ planData, onConceptClick, isMobile = false }) => {
  const { completedItems, totalItems, conceptCards, practiceQuizzes, revision = [] } = planData;
  
  // Calculate completion percentage
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  
  // Break down plan data by type
  const pendingConcepts = conceptCards.filter(card => !card.completed);
  const completedConcepts = conceptCards.filter(card => card.completed);
  const pendingQuizzes = practiceQuizzes.filter(quiz => !quiz.completed);
  const completedQuizzes = practiceQuizzes.filter(quiz => quiz.completed);
  
  // Helper function for difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'medium': return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard': return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Overall progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Today's Progress</h3>
              <div className="flex items-center gap-2">
                <Progress value={completionPercentage} className="h-2 w-[200px]" />
                <span className="text-sm font-medium">{completionPercentage}%</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {completedItems} of {totalItems} items completed
              </p>
            </div>
            
            <Button variant="outline" className="gap-2">
              <Flag className="h-4 w-4" />
              <span>Mark All Complete</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Pending Concepts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            <span>Concepts to Learn ({pendingConcepts.length})</span>
          </h3>
        </div>
        
        {pendingConcepts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {pendingConcepts.map(concept => (
              <Card
                key={concept.id}
                className="overflow-hidden cursor-pointer hover:border-blue-300 transition-colors"
                onClick={() => onConceptClick(concept.id)}
              >
                <div className="border-l-4 border-blue-500 h-full">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getDifficultyColor(concept.difficulty)}>
                        {concept.difficulty}
                      </Badge>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{concept.estimatedTime} min</span>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-1">{concept.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {concept.description || `Learn about ${concept.title}`}
                    </p>
                    
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-muted-foreground">
                        {concept.subject} {concept.chapter ? `• ${concept.chapter}` : ''}
                      </span>
                      <Button variant="ghost" size="sm" className="h-8 p-0 flex items-center gap-1">
                        <span className="text-xs">Start</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-50 dark:bg-gray-900/20">
            <CardContent className="p-4 text-center">
              <p className="text-muted-foreground">No pending concepts for today</p>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Practice Quizzes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            <span>Practice Quizzes ({pendingQuizzes.length})</span>
          </h3>
        </div>
        
        {pendingQuizzes.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {pendingQuizzes.map(quiz => (
              <Card key={quiz.id} className="overflow-hidden cursor-pointer hover:border-purple-300 transition-colors">
                <div className="border-l-4 border-purple-500 h-full">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                        {quiz.questions} Questions
                      </Badge>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{quiz.estimatedTime} min</span>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-1">{quiz.title}</h4>
                    
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-muted-foreground">
                        {quiz.subject}
                      </span>
                      <Button variant="ghost" size="sm" className="h-8 p-0 flex items-center gap-1">
                        <span className="text-xs">Start Quiz</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-50 dark:bg-gray-900/20">
            <CardContent className="p-4 text-center">
              <p className="text-muted-foreground">No practice quizzes scheduled for today</p>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Revision Section */}
      {revision.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BookMarked className="h-5 w-5 text-amber-500" />
              <span>Review & Revision ({revision.length})</span>
            </h3>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <ul className="divide-y">
                {revision.map((item, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BookMarked className="h-4 w-4 text-amber-500" />
                      <span>{item}</span>
                    </div>
                    <Button size="sm" variant="ghost">Review</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Completed Items */}
      {(completedConcepts.length > 0 || completedQuizzes.length > 0) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Completed Today ({completedConcepts.length + completedQuizzes.length})</span>
            </h3>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <ul className="divide-y">
                {completedConcepts.map(concept => (
                  <li key={concept.id} className="py-3 flex justify-between items-center opacity-60">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span>{concept.title}</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      Completed
                    </Badge>
                  </li>
                ))}
                {completedQuizzes.map(quiz => (
                  <li key={quiz.id} className="py-3 flex justify-between items-center opacity-60">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-500" />
                      <span>{quiz.title}</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      Completed
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NewTodaysPlanView;

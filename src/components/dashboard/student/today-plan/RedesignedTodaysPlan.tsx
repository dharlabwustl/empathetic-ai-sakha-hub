
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Clock, 
  Target, 
  Star, 
  CheckCircle,
  PlayCircle,
  Calendar,
  TrendingUp,
  Zap,
  Brain,
  FileText,
  ChevronRight,
  Award,
  Timer
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface RedesignedTodaysPlanProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const RedesignedTodaysPlan: React.FC<RedesignedTodaysPlanProps> = ({
  planData,
  onConceptClick,
  isMobile = false
}) => {
  if (!planData) return null;

  const completedTasks = planData.completedTasks || 0;
  const totalTasks = planData.totalTasks || 0;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <Calendar className="h-6 w-6 text-blue-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Today's Study Plan
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{todayDate}</p>
        
        {/* Progress Overview */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{totalTasks - completedTasks}</div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{planData.streak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{Math.round(planData.timeAllocation.total / 60)}h</div>
                <div className="text-sm text-gray-600">Total Time</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Today's Progress</span>
                <span>{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Concepts Section */}
      {planData.concepts && planData.concepts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Concept Learning</h2>
            <Badge variant="outline">{planData.concepts.length} topics</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planData.concepts.map((concept, index) => (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-lg border-l-4 ${
                    concept.status === 'completed' 
                      ? 'border-l-green-500 bg-green-50/50 dark:bg-green-900/10' 
                      : 'border-l-blue-500 hover:border-l-blue-600'
                  }`}
                  onClick={() => onConceptClick(concept.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {concept.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <PlayCircle className="h-5 w-5 text-blue-600" />
                        )}
                        <Badge 
                          variant={concept.status === 'completed' ? 'default' : 'outline'}
                          className={concept.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                        >
                          {concept.status === 'completed' ? 'Done' : 'Study'}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {concept.subject}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <h3 className={`font-medium mb-2 ${concept.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                      {concept.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{concept.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        <span>{concept.difficulty}</span>
                      </div>
                    </div>
                    
                    {concept.status !== 'completed' && (
                      <Button size="sm" className="w-full mt-3" variant="outline">
                        Start Learning <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Flashcards Section */}
      {planData.flashcards && planData.flashcards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-purple-600" />
            <h2 className="text-xl font-semibold">Flashcard Reviews</h2>
            <Badge variant="outline">{planData.flashcards.length} decks</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planData.flashcards.map((flashcard, index) => (
              <motion.div
                key={flashcard.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Card className={`cursor-pointer transition-all hover:shadow-lg border-l-4 ${
                  flashcard.status === 'completed' 
                    ? 'border-l-green-500 bg-green-50/50 dark:bg-green-900/10' 
                    : 'border-l-purple-500 hover:border-l-purple-600'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {flashcard.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Zap className="h-5 w-5 text-purple-600" />
                        )}
                        <Badge 
                          variant={flashcard.status === 'completed' ? 'default' : 'outline'}
                          className={flashcard.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}
                        >
                          {flashcard.status === 'completed' ? 'Done' : 'Review'}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {flashcard.cardCount} cards
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <h3 className={`font-medium mb-2 ${flashcard.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                      {flashcard.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{flashcard.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        <span>{flashcard.subject}</span>
                      </div>
                    </div>
                    
                    {flashcard.status !== 'completed' && (
                      <Button size="sm" className="w-full" variant="outline">
                        Start Review <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Practice Exams Section */}
      {planData.practiceExams && planData.practiceExams.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-orange-600" />
            <h2 className="text-xl font-semibold">Practice Tests</h2>
            <Badge variant="outline">{planData.practiceExams.length} tests</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planData.practiceExams.map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Card className={`cursor-pointer transition-all hover:shadow-lg border-l-4 ${
                  exam.status === 'completed' 
                    ? 'border-l-green-500 bg-green-50/50 dark:bg-green-900/10' 
                    : 'border-l-orange-500 hover:border-l-orange-600'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {exam.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Timer className="h-5 w-5 text-orange-600" />
                        )}
                        <Badge 
                          variant={exam.status === 'completed' ? 'default' : 'outline'}
                          className={exam.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}
                        >
                          {exam.status === 'completed' ? 'Done' : 'Test'}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {exam.questionCount} Qs
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <h3 className={`font-medium mb-2 ${exam.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                      {exam.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{exam.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{exam.subject}</span>
                      </div>
                    </div>
                    
                    {exam.status !== 'completed' && (
                      <Button size="sm" className="w-full" variant="outline">
                        Start Test <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-6 w-6 text-yellow-600" />
              <h3 className="text-lg font-semibold">Today's Achievement</h3>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{progressPercentage}%</div>
              <p className="text-gray-600">
                {progressPercentage === 100 
                  ? "🎉 Fantastic! You've completed all tasks for today!" 
                  : `Keep going! ${totalTasks - completedTasks} more tasks to complete your daily goal.`
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RedesignedTodaysPlan;

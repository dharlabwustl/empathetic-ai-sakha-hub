
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  BookOpen, 
  FileText, 
  Users, 
  ArrowRight,
  Star,
  TrendingUp,
  Clock,
  Brain,
  Zap,
  Award,
  FlaskConical,
  Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface PersonalizedRecommendationsProps {
  conceptId: string;
  masteryLevel: number;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({
  conceptId,
  masteryLevel
}) => {
  const navigate = useNavigate();

  const recommendations = [
    {
      type: 'flashcard',
      title: 'Newton\'s Laws Flashcards',
      description: 'Quick review cards based on your learning gaps',
      icon: <FileText className="h-4 w-4" />,
      priority: 'high',
      action: () => navigate('/dashboard/student/flashcards'),
      estimatedTime: '10 min'
    },
    {
      type: 'practice',
      title: 'Force & Motion Practice',
      description: 'Targeted questions for weak areas',
      icon: <Target className="h-4 w-4" />,
      priority: 'medium',
      action: () => navigate('/dashboard/student/practice-exams'),
      estimatedTime: '15 min'
    },
    {
      type: 'concept',
      title: 'Energy Conservation',
      description: 'Related concept to strengthen understanding',
      icon: <BookOpen className="h-4 w-4" />,
      priority: 'low',
      action: () => navigate('/dashboard/student/concepts'),
      estimatedTime: '20 min'
    },
    {
      type: 'group',
      title: 'Physics Study Group',
      description: 'Join discussion on Newton\'s Laws',
      icon: <Users className="h-4 w-4" />,
      priority: 'medium',
      action: () => navigate('/dashboard/student/study-groups'),
      estimatedTime: '30 min'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const learningPath = [
    { title: 'Basic Forces', completed: true },
    { title: 'Newton\'s Laws', current: true },
    { title: 'Energy Conservation', upcoming: true },
    { title: 'Momentum', upcoming: true },
    { title: 'Circular Motion', upcoming: true }
  ];

  return (
    <div className="space-y-6">
      {/* Personalized Recommendations */}
      <Card className="border-2 border-purple-100 dark:border-purple-800 shadow-md">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Suggested Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            {/* Main recommended actions */}
            <div className="flex-1 min-w-0">
              <div className="mb-3">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                  Next Best Actions
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Tailored to your learning needs based on analysis
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-all duration-200 cursor-pointer h-full" onClick={rec.action}>
                      <CardContent className="p-3">
                        <div className="flex gap-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                            {rec.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm truncate">{rec.title}</h4>
                              <Badge 
                                className={`text-xs ${getPriorityColor(rec.priority)}`}
                                variant="outline"
                              >
                                {rec.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                              {rec.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                {rec.estimatedTime}
                              </div>
                              <ArrowRight className="h-3 w-3 text-purple-500" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Learning Path */}
            <div className="w-full md:w-72 lg:w-96 shrink-0">
              <div className="mb-3">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  Your Learning Path
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Sequential progression in mastering this topic
                </p>
              </div>
              
              <div className="space-y-2 mb-4">
                {learningPath.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-2.5 p-2 rounded-lg transition-all ${
                      step.completed 
                        ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800' 
                        : step.current 
                        ? 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800' 
                        : 'bg-gray-50 dark:bg-gray-800/30'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-500 text-white' 
                        : step.current 
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      {step.completed ? (
                        <Award className="h-3 w-3" />
                      ) : step.current ? (
                        <Brain className="h-3 w-3" />
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{step.title}</div>
                      {step.current && (
                        <div className="text-xs text-blue-600 dark:text-blue-400">Current Focus</div>
                      )}
                    </div>
                    {step.completed && (
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    )}
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/dashboard/student/learning-path')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                View Full Learning Path
              </Button>
            </div>
          </div>
          
          {/* Quick insights */}
          <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <div className="flex flex-wrap gap-y-3 gap-x-6 md:gap-x-10">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-indigo-600" />
                <span className="text-sm">
                  Try the related <span className="font-semibold">Momentum</span> concept
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-600" />
                <span className="text-sm">
                  Use 3D simulations for better understanding
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-600" />
                <span className="text-sm">
                  Join the <span className="font-semibold">Physics study group</span> 
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedRecommendations;

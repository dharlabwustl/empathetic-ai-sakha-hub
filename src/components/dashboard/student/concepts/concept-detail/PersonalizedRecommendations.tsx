
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
  Award
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
      <Card className="border-2 border-purple-100 dark:border-purple-800 sticky top-4">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Personalized Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="text-center">
            <div className="mb-2">
              <Star className="h-8 w-8 mx-auto text-yellow-500" />
            </div>
            <h3 className="font-semibold text-purple-900 dark:text-purple-100">
              Next Best Actions
            </h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Based on your learning behavior
            </p>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-all duration-200 cursor-pointer" onClick={rec.action}>
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
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

          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            onClick={() => navigate('/dashboard/student/academic')}
          >
            <Zap className="h-4 w-4 mr-2" />
            Create Full Study Plan
          </Button>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Your Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {learningPath.map((step, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  step.completed 
                    ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800' 
                    : step.current 
                    ? 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800' 
                    : 'bg-gray-50 dark:bg-gray-800/30'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
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
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate('/dashboard/student/analytics')}
          >
            View Full Learning Path
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Study Streak</span>
            <Badge variant="outline">7 days</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Concepts Mastered</span>
            <Badge variant="outline">12/20</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Practice Score</span>
            <Badge className="bg-green-100 text-green-800">85%</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedRecommendations;

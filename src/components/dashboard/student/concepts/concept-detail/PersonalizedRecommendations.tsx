
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
  Video,
  BarChart3,
  MessageSquare
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

  const suggestedActions = [
    {
      type: 'practice',
      title: 'Force & Motion Practice',
      description: 'Targeted practice problems for weak areas',
      icon: <Target className="h-4 w-4" />,
      priority: 'high',
      action: () => navigate('/dashboard/student/practice-exam'),
      estimatedTime: '15 min',
      category: 'Practice'
    },
    {
      type: 'flashcard',
      title: 'Newton\'s Laws Flashcards',
      description: 'Quick review cards for key concepts',
      icon: <FileText className="h-4 w-4" />,
      priority: 'high',
      action: () => navigate('/dashboard/student/flashcards'),
      estimatedTime: '10 min',
      category: 'Review'
    },
    {
      type: 'video',
      title: 'Advanced Applications Video',
      description: 'Watch advanced concept explanations',
      icon: <Video className="h-4 w-4" />,
      priority: 'medium',
      action: () => navigate('/dashboard/student/concepts'),
      estimatedTime: '12 min',
      category: 'Learn'
    },
    {
      type: 'concept',
      title: 'Energy Conservation',
      description: 'Related concept to strengthen understanding',
      icon: <BookOpen className="h-4 w-4" />,
      priority: 'medium',
      action: () => navigate('/dashboard/student/concepts'),
      estimatedTime: '20 min',
      category: 'Explore'
    },
    {
      type: 'discussion',
      title: 'Physics Study Group',
      description: 'Join discussion on Newton\'s Laws',
      icon: <Users className="h-4 w-4" />,
      priority: 'low',
      action: () => navigate('/dashboard/student/study-groups'),
      estimatedTime: '30 min',
      category: 'Collaborate'
    },
    {
      type: 'analysis',
      title: 'Performance Analytics',
      description: 'Review your learning progress',
      icon: <BarChart3 className="h-4 w-4" />,
      priority: 'low',
      action: () => navigate('/dashboard/student/analytics'),
      estimatedTime: '8 min',
      category: 'Track'
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Practice': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Review': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Learn': return 'bg-green-50 text-green-700 border-green-200';
      case 'Explore': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Collaborate': return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'Track': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const learningPath = [
    { title: 'Basic Forces', completed: true, score: 92 },
    { title: 'Newton\'s Laws', current: true, score: 76 },
    { title: 'Energy Conservation', upcoming: true, score: 0 },
    { title: 'Momentum', upcoming: true, score: 0 },
    { title: 'Circular Motion', upcoming: true, score: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Smart Suggested Actions - Redesigned Layout */}
      <div className="space-y-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full">
              <Brain className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Suggested Actions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Smart recommendations based on your learning progress and performance gaps
          </p>
        </div>

        {/* Priority Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestedActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer h-full" onClick={action.action}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-lg">
                      {action.icon}
                    </div>
                    <div className="flex gap-1">
                      <Badge 
                        className={`text-xs ${getPriorityColor(action.priority)}`}
                        variant="outline"
                      >
                        {action.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {action.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {action.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getCategoryColor(action.category)}`}
                      >
                        {action.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {action.estimatedTime}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Action Bar */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                  Ready to boost your learning?
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Start with high-priority actions for maximum impact
                </p>
              </div>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => navigate('/dashboard/student/practice-exam')}
              >
                <Zap className="h-4 w-4 mr-2" />
                Start Practice Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Path - Horizontal Layout */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Your Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <div className="absolute top-6 left-6 h-0.5 bg-blue-500" style={{ width: '40%' }}></div>
            
            {/* Learning Steps */}
            <div className="flex justify-between relative">
              {learningPath.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : step.current 
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                    {step.completed ? (
                      <Award className="h-5 w-5" />
                    ) : step.current ? (
                      <Brain className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="text-center max-w-20">
                    <div className="font-medium text-sm">{step.title}</div>
                    {step.completed && (
                      <div className="text-xs text-green-600 dark:text-green-400">
                        {step.score}% mastered
                      </div>
                    )}
                    {step.current && (
                      <div className="text-xs text-blue-600 dark:text-blue-400">
                        {step.score}% progress
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-6"
            onClick={() => navigate('/dashboard/student/analytics')}
          >
            View Complete Learning Path
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats - Compact Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-blue-600">7</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Study Streak</div>
          <div className="text-xs text-green-600 mt-1">+2 from last week</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600">12/20</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Concepts</div>
          <div className="text-xs text-blue-600 mt-1">60% complete</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-600">85%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Practice Score</div>
          <div className="text-xs text-green-600 mt-1">Above average</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-orange-600">4.2h</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Week Time</div>
          <div className="text-xs text-blue-600 mt-1">Target: 5h</div>
        </Card>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;

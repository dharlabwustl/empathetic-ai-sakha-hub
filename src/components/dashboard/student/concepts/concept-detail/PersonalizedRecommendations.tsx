
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, BookOpen, FileText, Users, ArrowRight,
  Star, TrendingUp, Clock, Brain, Zap, Award,
  RotateCcw, HelpCircle, FlaskConical, Video,
  PenTool, MessageCircle, Lightbulb, CheckCircle,
  BarChart3, PlayCircle, Activity, Sparkles,
  Calendar, PieChart, BookMarked, Gauge, Rocket
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface PersonalizedRecommendationsProps {
  conceptId: string;
  masteryLevel: number;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({
  conceptId,
  masteryLevel
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const suggestedActions = [
    {
      id: 'practice-problems',
      title: 'Practice Related Problems',
      description: 'Solve 5 problems combining force and motion concepts',
      icon: <Target className="h-4 w-4" />,
      priority: 'high',
      estimatedTime: '15 min',
      difficulty: 'Medium',
      action: () => navigate(`/dashboard/student/practice-exam`),
      progress: 40,
      type: 'practice'
    },
    {
      id: 'recall-flashcards',
      title: 'Quick Recall Session',
      description: 'Review key formulas and definitions with flashcards',
      icon: <RotateCcw className="h-4 w-4" />,
      priority: 'high',
      estimatedTime: '10 min',
      difficulty: 'Easy',
      action: () => navigate(`/dashboard/student/flashcards`),
      progress: 0,
      type: 'review'
    },
    {
      id: 'video-review',
      title: 'Watch Advanced Examples',
      description: 'Video explanations of complex applications',
      icon: <Video className="h-4 w-4" />,
      priority: 'medium',
      estimatedTime: '20 min',
      difficulty: 'Advanced',
      action: () => {
        toast({
          title: "Loading video content",
          description: "Preparing advanced examples for you..."
        });
      },
      progress: 25,
      type: 'learn'
    },
    {
      id: 'mock-test',
      title: 'Take Concept Quiz',
      description: 'Test your understanding with targeted questions',
      icon: <FileText className="h-4 w-4" />,
      priority: 'medium',
      estimatedTime: '12 min',
      difficulty: 'Medium',
      action: () => navigate(`/dashboard/student/practice-exam`),
      progress: 0,
      type: 'assessment'
    },
    {
      id: 'lab-experiment',
      title: 'Virtual Lab Experiment',
      description: 'Hands-on simulation with force measurements',
      icon: <FlaskConical className="h-4 w-4" />,
      priority: 'low',
      estimatedTime: '25 min',
      difficulty: 'Advanced',
      action: () => navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`),
      progress: 0,
      type: 'experiment'
    },
    {
      id: 'peer-discussion',
      title: 'Join Study Discussion',
      description: 'Discuss concepts with peers in study groups',
      icon: <Users className="h-4 w-4" />,
      priority: 'low',
      estimatedTime: '30 min',
      difficulty: 'All Levels',
      action: () => toast({
        title: "Study Groups",
        description: "Connecting to available study groups..."
      }),
      progress: 0,
      type: 'social'
    }
  ];

  const relatedConcepts = [
    { 
      title: 'Newton\'s First Law', 
      mastery: 90, 
      status: 'completed',
      route: '/dashboard/student/concepts/newtons-first-law'
    },
    { 
      title: 'Force and Friction', 
      mastery: 75, 
      status: 'in-progress',
      route: '/dashboard/student/concepts/force-friction'
    },
    { 
      title: 'Newton\'s Third Law', 
      mastery: 60, 
      status: 'recommended',
      route: '/dashboard/student/concepts/newtons-third-law'
    },
    { 
      title: 'Momentum Conservation', 
      mastery: 30, 
      status: 'upcoming',
      route: '/dashboard/student/concepts/momentum'
    }
  ];

  const quickStats = [
    { label: 'Study Streak', value: '7 days', icon: <Award className="h-4 w-4 text-yellow-500" /> },
    { label: 'Problems Solved', value: '23/30', icon: <Target className="h-4 w-4 text-blue-500" /> },
    { label: 'Concepts Mastered', value: '12/20', icon: <Brain className="h-4 w-4 text-green-500" /> },
    { label: 'Practice Score', value: '87%', icon: <BarChart3 className="h-4 w-4 text-purple-500" /> }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950/30 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-950/30 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'practice': return 'text-blue-600 dark:text-blue-400';
      case 'review': return 'text-green-600 dark:text-green-400';
      case 'learn': return 'text-purple-600 dark:text-purple-400';
      case 'assessment': return 'text-red-600 dark:text-red-400';
      case 'experiment': return 'text-orange-600 dark:text-orange-400';
      case 'social': return 'text-pink-600 dark:text-pink-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 dark:text-green-400';
      case 'in-progress': return 'text-blue-600 dark:text-blue-400';
      case 'recommended': return 'text-yellow-600 dark:text-yellow-400';
      case 'upcoming': return 'text-gray-600 dark:text-gray-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Header Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-6 rounded-xl border border-amber-100 dark:border-amber-800/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-lg">
            <Sparkles className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Personalized Study Plan</h2>
            <p className="text-gray-600 dark:text-gray-400">Actions tailored to optimize your learning experience</p>
          </div>
        </div>
        
        {/* Stats Cards - Horizontal row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                <Gauge className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Mastery Level</p>
                <p className="text-lg font-bold">{masteryLevel}%</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Study Time</p>
                <p className="text-lg font-bold">45 min</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                <PieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Completion</p>
                <p className="text-lg font-bold">65%</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                <Rocket className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Action Items</p>
                <p className="text-lg font-bold">{suggestedActions.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Suggested Actions - Horizontal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestedActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <Card 
              className="h-full hover:shadow-md transition-all cursor-pointer border-l-4 hover:border-l-indigo-500"
              style={{ borderLeftColor: index === 0 ? '#6366f1' : index === 1 ? '#8b5cf6' : 'transparent' }}
              onClick={action.action}
            >
              <CardContent className="p-4 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-3">
                  <div className={`p-2.5 rounded-lg ${getTypeColor(action.type)} bg-current/10 flex-shrink-0`}>
                    {action.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm line-clamp-1">{action.title}</h4>
                      <Badge 
                        className={`text-xs ${getPriorityColor(action.priority)}`}
                        variant="outline"
                      >
                        {action.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-grow">
                  {action.description}
                </p>
                
                {action.progress > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{action.progress}%</span>
                    </div>
                    <Progress value={action.progress} className="h-2" />
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-auto pt-2">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {action.estimatedTime}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {action.difficulty}
                    </Badge>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Path */}
        <div className="lg:col-span-2">
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Learning Path
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Continue your physics journey with connected concepts
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {relatedConcepts.map((concept, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="cursor-pointer"
                    onClick={() => navigate(concept.route)}
                  >
                    <div className="flex items-center gap-4 p-3 rounded-lg border hover:shadow-sm transition-all">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        concept.status === 'completed' 
                          ? 'bg-green-500 text-white' 
                          : concept.status === 'in-progress'
                          ? 'bg-blue-500 text-white'
                          : concept.status === 'recommended'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}>
                        {concept.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : concept.status === 'in-progress' ? (
                          <PlayCircle className="h-4 w-4" />
                        ) : (
                          <span className="text-xs font-medium">{index + 1}</span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{concept.title}</h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getStatusColor(concept.status)}`}
                          >
                            {concept.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <Progress value={concept.mastery} className="h-2" />
                          </div>
                          <span className="text-xs text-gray-500">{concept.mastery}%</span>
                        </div>
                      </div>
                      
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/dashboard/student/analytics')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                View Complete Learning Path
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="border-t-4 border-t-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Performance Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center gap-2">
                    {stat.icon}
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    {stat.value}
                  </Badge>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={() => navigate('/dashboard/student/analytics')}
              >
                <BarChart3 className="h-3 w-3 mr-2" />
                View Detailed Analytics
              </Button>
            </CardContent>
          </Card>

          {/* Study Tools Shortcuts */}
          <Card className="border-t-4 border-t-yellow-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                Quick Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate('/dashboard/student/flashcards')}
              >
                <RotateCcw className="h-3 w-3 mr-2" />
                Create Flashcards
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate('/dashboard/student/practice-exam')}
              >
                <Target className="h-3 w-3 mr-2" />
                Practice Problems
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => toast({
                  title: "Study Groups",
                  description: "Looking for available study partners..."
                })}
              >
                <Users className="h-3 w-3 mr-2" />
                Find Study Partners
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => {
                  toast({
                    title: "AI Tutor Starting",
                    description: "Connecting you with AI tutor for personalized help..."
                  });
                }}
              >
                <MessageCircle className="h-3 w-3 mr-2" />
                Ask AI Tutor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;

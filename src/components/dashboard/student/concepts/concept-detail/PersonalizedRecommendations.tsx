
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
  BarChart3, PlayCircle, ChevronRight, LineChart,
  BookmarkCheck, Flame, BarChart, Share
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
      action: () => navigate('/dashboard/student/practice-exams'),
      progress: 40,
      type: 'practice',
      stats: {
        accuracyRate: '72%',
        completionTime: '12.5 min avg',
        masteryGain: '+8.5%'
      }
    },
    {
      id: 'recall-flashcards',
      title: 'Quick Recall Session',
      description: 'Review key formulas and definitions with flashcards',
      icon: <RotateCcw className="h-4 w-4" />,
      priority: 'high',
      estimatedTime: '10 min',
      difficulty: 'Easy',
      action: () => navigate('/dashboard/student/flashcards'),
      progress: 0,
      type: 'review',
      stats: {
        retentionRate: '85%',
        cardsReviewed: '32/40',
        masteryGain: '+5.2%'
      }
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
      type: 'learn',
      stats: {
        comprehensionRate: '80%',
        completionRate: '65%',
        masteryGain: '+7.8%'
      }
    },
    {
      id: 'mock-test',
      title: 'Take Concept Quiz',
      description: 'Test your understanding with targeted questions',
      icon: <FileText className="h-4 w-4" />,
      priority: 'medium',
      estimatedTime: '12 min',
      difficulty: 'Medium',
      action: () => navigate('/dashboard/student/practice-exams'),
      progress: 0,
      type: 'assessment',
      stats: {
        expectedScore: '76-82%',
        questionTypes: 'Mixed',
        masteryGain: '+9.1%'
      }
    },
    {
      id: 'lab-experiment',
      title: 'Virtual Lab Experiment',
      description: 'Hands-on simulation with force measurements',
      icon: <FlaskConical className="h-4 w-4" />,
      priority: 'low',
      estimatedTime: '25 min',
      difficulty: 'Advanced',
      action: () => navigate('/dashboard/student/concepts/formula-lab'),
      progress: 0,
      type: 'experiment',
      stats: {
        interactivityLevel: 'High',
        completionRate: '72%',
        masteryGain: '+10.3%'
      }
    },
    {
      id: 'peer-discussion',
      title: 'Join Study Discussion',
      description: 'Discuss concepts with peers in study groups',
      icon: <Users className="h-4 w-4" />,
      priority: 'low',
      estimatedTime: '30 min',
      difficulty: 'All Levels',
      action: () => navigate('/dashboard/student/study-groups'),
      progress: 0,
      type: 'social',
      stats: {
        activeUsers: '24',
        discussionTopics: '5',
        masteryGain: '+6.2%'
      }
    }
  ];

  const relatedConcepts = [
    { 
      title: 'Newton\'s First Law', 
      mastery: 90, 
      status: 'completed',
      route: '/dashboard/student/concepts/newtons-first-law',
      stats: {
        quizScore: '92%',
        practiceCompleted: '8/8',
        timeSpent: '2.5 hours'
      }
    },
    { 
      title: 'Force and Friction', 
      mastery: 75, 
      status: 'in-progress',
      route: '/dashboard/student/concepts/force-friction',
      stats: {
        quizScore: '78%',
        practiceCompleted: '5/8',
        timeSpent: '1.8 hours'
      }
    },
    { 
      title: 'Newton\'s Third Law', 
      mastery: 60, 
      status: 'recommended',
      route: '/dashboard/student/concepts/newtons-third-law',
      stats: {
        difficulty: 'Moderate',
        estimatedTime: '1.5 hours',
        masteryBoost: '+15%'
      }
    },
    { 
      title: 'Momentum Conservation', 
      mastery: 30, 
      status: 'upcoming',
      route: '/dashboard/student/concepts/momentum',
      stats: {
        difficulty: 'Advanced',
        estimatedTime: '2.2 hours',
        prerequisites: '2'
      }
    }
  ];

  const learningAnalytics = [
    { 
      title: 'Concept Mastery', 
      value: '76%',
      trend: '+12%',
      icon: <BarChart3 className="h-4 w-4 text-blue-500" />,
      description: 'Your overall understanding of this concept'
    },
    { 
      title: 'Time Investment', 
      value: '4.2h',
      trend: '+1.5h',
      icon: <Clock className="h-4 w-4 text-green-500" />,
      description: 'Total time spent learning this concept'
    },
    { 
      title: 'Practice Attempts', 
      value: '28',
      trend: '+8',
      icon: <Target className="h-4 w-4 text-violet-500" />,
      description: 'Number of practice questions attempted'
    },
    { 
      title: 'Recall Strength', 
      value: '81%',
      trend: '+14%',
      icon: <Brain className="h-4 w-4 text-amber-500" />,
      description: 'Your ability to recall key information'
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
      {/* Learning Analytics Dashboard */}
      <Card className="border-2 border-blue-100 dark:border-blue-800 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Learning Analytics Dashboard
          </CardTitle>
          <p className="text-blue-100 text-sm">
            Detailed insights about your learning progress and performance
          </p>
        </CardHeader>
        <CardContent className="p-6">
          {/* Analytics Tabs */}
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="visual">Visual Analysis</TabsTrigger>
              <TabsTrigger value="progress">Progress Report</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {learningAnalytics.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {stat.icon}
                      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</h4>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <span className="text-sm text-green-600 dark:text-green-400">{stat.trend}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Performance Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-blue-500" />
                        Performance Trends
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">Last 4 weeks</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-100 dark:border-blue-800 flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="h-12 w-12 mx-auto text-blue-400" />
                        <p className="text-sm text-gray-500 mt-2">Performance growth visualization</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-600">Accuracy</div>
                        <div className="text-lg font-bold text-blue-600">78%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-600">Speed</div>
                        <div className="text-lg font-bold text-green-600">+12%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-600">Retention</div>
                        <div className="text-lg font-bold text-purple-600">85%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skill Breakdown */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-indigo-500" />
                        Skill Analysis
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">Detailed</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Concept Understanding</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Problem Solving</span>
                          <span className="font-medium">72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Application Skills</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Formula Recall</span>
                          <span className="font-medium">91%</span>
                        </div>
                        <Progress value={91} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="visual" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Target className="h-4 w-4 text-purple-500" />
                      Subject Mastery Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-64 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-lg border border-purple-100 dark:border-purple-800 flex items-center justify-center">
                      <div className="text-center">
                        <PieChartPlaceholder />
                        <p className="text-sm text-gray-500 mt-2">Detailed breakdown of mastery by topic</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-gray-600">Theory (38%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-600">Application (25%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-xs text-gray-600">Problem Solving (22%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="text-xs text-gray-600">Analysis (15%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      Learning Progression
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-64 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 rounded-lg border border-green-100 dark:border-green-800 flex items-center justify-center">
                      <div className="text-center">
                        <LineChartPlaceholder />
                        <p className="text-sm text-gray-500 mt-2">Concept mastery progression over time</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-600">Starting</div>
                        <div className="text-lg font-bold text-amber-600">32%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-600">Current</div>
                        <div className="text-lg font-bold text-green-600">76%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-600">Growth</div>
                        <div className="text-lg font-bold text-blue-600">+44%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-orange-500" />
                    Comparative Performance Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-48 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg border border-orange-100 dark:border-orange-800 flex items-center justify-center">
                    <div className="text-center">
                      <BarChartPlaceholder />
                      <p className="text-sm text-gray-500 mt-2">Your performance compared to class average</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    <div className="text-center">
                      <div className="text-xs font-medium text-gray-600">Quiz Score</div>
                      <div className="text-sm font-bold text-green-600">+12%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-gray-600">Practice Time</div>
                      <div className="text-sm font-bold text-blue-600">+8%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-gray-600">Problem Solving</div>
                      <div className="text-sm font-bold text-amber-600">+5%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-gray-600">Retention</div>
                      <div className="text-sm font-bold text-purple-600">+10%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Learning Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-800">
                      <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                        <BookmarkCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">Basic Concept Understanding</h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Completed on April 15, 2025</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-800">
                      <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                        <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">Problem Solving Applications</h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400">In progress - 72% complete</p>
                        <Progress value={72} className="h-1.5 mt-1" />
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                        <FlaskConical className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">Advanced Applications</h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Unlocks at 75% mastery (currently 72%)</p>
                        <Progress value={72} className="h-1.5 mt-1" />
                      </div>
                      <Badge className="bg-gray-100 text-gray-800 border-gray-200">Locked</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                        <Award className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">Mastery Certification</h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Unlocks at 90% mastery (currently 72%)</p>
                        <Progress value={72} className="h-1.5 mt-1" />
                      </div>
                      <Badge className="bg-gray-100 text-gray-800 border-gray-200">Locked</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Flame className="h-4 w-4 text-orange-500" />
                      Learning Streaks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center mb-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-500">7</div>
                        <div className="text-sm text-gray-500">Day Streak</div>
                      </div>
                      <div className="h-12 w-px bg-gray-200 dark:bg-gray-700 mx-6"></div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-500">21</div>
                        <div className="text-sm text-gray-500">Best Streak</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 7 }).map((_, index) => (
                        <div 
                          key={index}
                          className={`h-10 rounded ${
                            index < 5 ? 'bg-orange-400' : 'bg-orange-200'
                          } flex items-center justify-center text-xs text-white font-medium`}
                        >
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Share className="h-4 w-4 text-indigo-500" />
                      Peer Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-40 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg border border-indigo-100 dark:border-indigo-800 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-indigo-600">Top 15%</div>
                        <p className="text-sm text-gray-500 mt-2">Your performance ranking</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-500">
                      <p className="text-center">You're performing better than 85% of peers studying this concept</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* 3D Models & Interactive Simulations */}
      <Card className="border-2 border-purple-100 dark:border-purple-800 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5" />
            3D Models & Interactive Simulations
          </CardTitle>
          <p className="text-purple-100 text-sm">
            Explore complex concepts through interactive 3D visualizations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="force-vector" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="force-vector">Force Vectors</TabsTrigger>
              <TabsTrigger value="newton-model">Newton's Cradle</TabsTrigger>
              <TabsTrigger value="motion-sim">Motion Simulation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="force-vector" className="space-y-4">
              <div className="aspect-video bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 rounded-lg border border-purple-200 dark:border-purple-800 flex items-center justify-center mb-4">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    {/* Force Vector 3D Model Placeholder */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-24 h-1 bg-blue-500 absolute transform rotate-45 origin-left"></div>
                      <div className="w-20 h-1 bg-red-500 absolute transform -rotate-30 origin-left"></div>
                      <div className="w-16 h-1 bg-green-500 absolute transform rotate-120 origin-left"></div>
                      <div className="w-4 h-4 rounded-full bg-gray-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-2">Interactive Force Vectors</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                    Visualize and manipulate force vectors in a 3D environment to understand how they combine and affect motion.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    Key Learning Insights
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded mt-0.5">
                        <CheckCircle className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm">Vector addition and resultant forces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded mt-0.5">
                        <CheckCircle className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm">Direction and magnitude components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded mt-0.5">
                        <CheckCircle className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm">Equilibrium and balanced forces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded mt-0.5">
                        <CheckCircle className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm">Force resolution in multiple dimensions</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4 text-red-500" />
                    Interactive Features
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded mt-0.5">
                        <CheckCircle className="h-3 w-3 text-red-600 dark:text-red-400" />
                      </div>
                      <span className="text-sm">Adjust force magnitude with sliders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded mt-0.5">
                        <CheckCircle className="h-3 w-3 text-red-600 dark:text-red-400" />
                      </div>
                      <span className="text-sm">Change force direction in 3D space</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded mt-0.5">
                        <CheckCircle className="h-3 w-3 text-red-600 dark:text-red-400" />
                      </div>
                      <span className="text-sm">Observe real-time calculation of resultant force</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded mt-0.5">
                        <CheckCircle className="h-3 w-3 text-red-600 dark:text-red-400" />
                      </div>
                      <span className="text-sm">Rotate and zoom to view from any angle</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button className="w-full">
                Launch Interactive 3D Force Vector Simulation
              </Button>
            </TabsContent>
            
            <TabsContent value="newton-model" className="space-y-4">
              <div className="aspect-video bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950/30 dark:to-blue-950/30 rounded-lg border border-teal-200 dark:border-teal-800 flex items-center justify-center mb-4">
                <div className="text-center p-8">
                  {/* Newton's Cradle 3D Model Placeholder */}
                  <div className="relative h-40 w-64 mx-auto mb-4">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gray-400"></div>
                    <div className="flex justify-center items-start h-full gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          animate={i === 1 ? 
                            { rotate: [30, 0, 0, 0, 0] } : 
                            i === 5 ? { rotate: [0, 0, 0, 0, 30] } : 
                            {}}
                          transition={{ 
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 2,
                            ease: "easeInOut" 
                          }}
                          style={{
                            transformOrigin: "top center",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                          }}
                        >
                          <div className="h-24 w-0.5 bg-gray-400"></div>
                          <div className="h-8 w-8 rounded-full bg-gray-700 dark:bg-gray-300 shadow-lg"></div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-2">Interactive Newton's Cradle</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                    Experiment with momentum conservation principles using this interactive 3D model of Newton's Cradle.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    Physics Principles Demonstrated
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-teal-100 dark:bg-teal-900/30 p-1 rounded mt-0.5">
                        <CheckCircle className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                      </div>
                      <span className="text-sm">Conservation of momentum</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-teal-100 dark:bg-teal-900/30 p-1 rounded mt-0.5">
                        <CheckCircle className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                      </div>
                      <span className="text-sm">Conservation of energy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-teal-100 dark:bg-teal-900/30 p-1 rounded mt-0.5">
                        <CheckCircle className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                      </div>
                      <span className="text-sm">Elastic collisions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-teal-100 dark:bg-teal-900/30 p-1 rounded mt-0.5">
                        <CheckCircle className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                      </div>
                      <span className="text-sm">Energy transfer mechanics</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Energy Analysis</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Potential Energy</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Kinetic Energy</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Energy Conservation</span>
                        <span className="font-medium">98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                Launch Newton's Cradle 3D Simulation
              </Button>
            </TabsContent>
            
            <TabsContent value="motion-sim" className="space-y-4">
              <div className="aspect-video bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 flex items-center justify-center mb-4">
                <div className="text-center p-8">
                  {/* Motion Simulation 3D Model Placeholder */}
                  <div className="w-64 h-40 mx-auto mb-4 relative">
                    <motion.div
                      animate={{ x: [0, 150, 0] }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut" 
                      }}
                      className="absolute left-0 bottom-0"
                    >
                      <div className="h-12 w-12 bg-blue-600 rounded-lg shadow-lg"></div>
                    </motion.div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-400"></div>
                  </div>
                  <h3 className="text-xl font-bold text-amber-700 dark:text-amber-300 mb-2">Motion and Acceleration Simulation</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                    Visualize how forces affect motion and acceleration in this interactive 3D physics simulation.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Settings className="h-4 w-4 text-gray-600" />
                    Simulation Controls
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Applied Force (N)</span>
                        <span className="font-medium">25 N</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mass (kg)</span>
                        <span className="font-medium">5 kg</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Friction Coefficient</span>
                        <span className="font-medium">0.2</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <LineChart className="h-4 w-4 text-blue-500" />
                    Real-time Measurements
                  </h4>
                  
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Velocity:</span>
                      <span className="text-sm font-medium">5 m/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Acceleration:</span>
                      <span className="text-sm font-medium">5 m/s²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Distance:</span>
                      <span className="text-sm font-medium">15 m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Applied Force:</span>
                      <span className="text-sm font-medium">25 N</span>
                    </div>
                    <div className="flex justify-between border-t pt-1 mt-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">F = ma:</span>
                      <span className="text-sm font-medium">25 N = 5 kg × 5 m/s²</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                Launch Motion & Acceleration 3D Simulation
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Merged Suggested Actions (horizontal layout) */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border-2 border-amber-100 dark:border-amber-800">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Personalized Suggested Actions
            </CardTitle>
            <p className="text-amber-100 text-sm">
              Smart recommendations for practice, recall, and mastery based on your learning data
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Primary Suggested Actions */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-600" />
                  High-Impact Learning Activities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestedActions.slice(0, 4).map((action, index) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-indigo-500" 
                            onClick={action.action}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${getTypeColor(action.type)} bg-current/10`}>
                              {action.icon}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-medium text-sm">{action.title}</h4>
                                <Badge 
                                  className={`text-xs ${getPriorityColor(action.priority)}`}
                                  variant="outline"
                                >
                                  {action.priority}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {action.difficulty}
                                </Badge>
                              </div>
                              
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
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
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {action.estimatedTime}
                                  </span>
                                  <span className={`capitalize ${getTypeColor(action.type)}`}>
                                    {action.type}
                                  </span>
                                </div>
                                <ArrowRight className="h-4 w-4 text-gray-400" />
                              </div>

                              {/* Action Stats */}
                              <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md grid grid-cols-3 gap-1 text-xs">
                                {Object.entries(action.stats).map(([key, value], i) => (
                                  <div key={i} className="text-center">
                                    <div className="text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                    <div className="font-medium">{value}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Related Learning Path */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Related Learning Path
                </h3>
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
                          
                          {/* Concept Details */}
                          <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
                            {Object.entries(concept.stats).map(([key, value], i) => (
                              <div key={i} className="text-center">
                                <div className="text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                <div className="font-medium">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <ChevronRight className="h-4 w-4 text-gray-400" />
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
              </div>
            </div>

            {/* Additional Suggested Actions - Horizontal Layout */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Additional Learning Resources
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {suggestedActions.slice(4).map((action, index) => (
                  <Card 
                    key={action.id} 
                    className="hover:shadow-md transition-all cursor-pointer border-t-4 border-t-transparent hover:border-t-indigo-500"
                    onClick={action.action}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2 rounded-lg ${getTypeColor(action.type)} bg-current/10`}>
                            {action.icon}
                          </div>
                          <Badge 
                            className={`text-xs ${getPriorityColor(action.priority)}`}
                            variant="outline"
                          >
                            {action.priority}
                          </Badge>
                        </div>
                        
                        <h4 className="font-medium text-sm mb-2">{action.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 flex-grow">
                          {action.description}
                        </p>
                        
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {action.estimatedTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Quick Study Tools */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      Quick Tools
                    </h3>
                    <div className="space-y-2">
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
                        onClick={() => navigate('/dashboard/student/practice-exams')}
                      >
                        <Target className="h-3 w-3 mr-2" />
                        Practice Problems
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => navigate('/dashboard/student/study-groups')}
                      >
                        <Users className="h-3 w-3 mr-2" />
                        Find Study Partners
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Chart placeholder components
const PieChartPlaceholder = () => (
  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-800 mx-auto relative">
    <div className="absolute inset-0 rotate-45">
      <div className="w-1/2 h-full bg-green-300 dark:bg-green-700 rounded-l-full"></div>
    </div>
    <div className="absolute inset-0 rotate-[120deg]">
      <div className="w-1/3 h-full bg-purple-300 dark:bg-purple-700 rounded-l-full"></div>
    </div>
    <div className="absolute inset-0 w-16 h-16 bg-white dark:bg-gray-800 rounded-full m-auto"></div>
  </div>
);

const LineChartPlaceholder = () => (
  <div className="w-full h-32 flex items-end">
    <div className="flex-1 h-full flex items-end justify-around px-4">
      {[20, 35, 25, 45, 60, 75, 65].map((height, i) => (
        <div key={i} className="w-1/8 bg-blue-400 dark:bg-blue-600 rounded-t" style={{height: `${height}%`}}></div>
      ))}
    </div>
  </div>
);

const BarChartPlaceholder = () => (
  <div className="w-full h-32 flex items-end justify-around px-4">
    <div className="w-1/5 flex flex-col items-center">
      <div className="h-16 w-8 bg-blue-400 dark:bg-blue-600 rounded-t"></div>
      <div className="text-xs mt-1">You</div>
    </div>
    <div className="w-1/5 flex flex-col items-center">
      <div className="h-12 w-8 bg-gray-300 dark:bg-gray-600 rounded-t"></div>
      <div className="text-xs mt-1">Avg</div>
    </div>
    <div className="w-1/5 flex flex-col items-center">
      <div className="h-20 w-8 bg-blue-400 dark:bg-blue-600 rounded-t"></div>
      <div className="text-xs mt-1">You</div>
    </div>
    <div className="w-1/5 flex flex-col items-center">
      <div className="h-14 w-8 bg-gray-300 dark:bg-gray-600 rounded-t"></div>
      <div className="text-xs mt-1">Avg</div>
    </div>
  </div>
);

export default PersonalizedRecommendations;

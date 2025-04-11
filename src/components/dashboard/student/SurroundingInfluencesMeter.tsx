
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  BrainCircuit,
  TrendingUp,
  Target,
  Globe,
  Heart,
  HelpCircle,
  ArrowRight,
  Clock,
  BookOpen,
  Bell,
  ThumbsUp,
  Award,
  BarChart3
} from 'lucide-react';

interface InfluenceMetric {
  id: string;
  name: string;
  icon: React.ReactNode;
  value: number; // 0-100
  trend: 'up' | 'down' | 'stable';
  insights: string[];
  suggestions: string[];
  color: string;
  tracksWhat: string;
}

const SurroundingInfluencesMeter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Sample data
  const metricsData: InfluenceMetric[] = [
    {
      id: 'peer-pulse',
      name: 'Peer Pulse',
      icon: <Users className="h-5 w-5" />,
      value: 80,
      trend: 'up',
      insights: [
        "You're studying with peers 2x more than last month",
        "80% of your group faced similar challenges with calculus",
        "Your participation in group sessions is above average"
      ],
      suggestions: [
        "Join the upcoming physics study group this weekend",
        "Try the study method that helped 5 peers improve their scores",
        "Share your notes on organic chemistry with peers who need help"
      ],
      color: 'from-blue-500 to-indigo-500',
      tracksWhat: 'Learning rhythm and outcomes compared to similar learners at the platform for the same exam goal'
    },
    {
      id: 'digital-confidence',
      name: 'Digital Space Confidence',
      icon: <BrainCircuit className="h-5 w-5" />,
      value: 65,
      trend: 'up',
      insights: [
        "You're asking more quality questions in forums",
        "Screen time during study sessions has improved by 15%",
        "Distraction level has decreased compared to last week"
      ],
      suggestions: [
        "Ask 1 doubt today to get peer + AI feedback",
        "Try the new digital distraction blocker during deep work",
        "Schedule specific times for checking notifications"
      ],
      color: 'from-purple-500 to-pink-500',
      tracksWhat: 'Frequency of doubts, digital distractions, and usage of learning forums'
    },
    {
      id: 'confidence-meter',
      name: 'Confidence Meter',
      icon: <TrendingUp className="h-5 w-5" />,
      value: 85,
      trend: 'up',
      insights: [
        "Your self-assessment is now closer to your actual performance",
        "You scored 15% higher than you expected on your last quiz",
        "Your confidence in mathematics has significantly improved"
      ],
      suggestions: [
        "Update your study goals with increased targets",
        "Try teaching a concept you recently mastered to someone else",
        "Take on slightly more challenging problems in your next session"
      ],
      color: 'from-emerald-500 to-teal-500',
      tracksWhat: 'Self-assessment vs. performance outcomes'
    },
    {
      id: 'self-direction',
      name: 'Self-Direction',
      icon: <Target className="h-5 w-5" />,
      value: 60,
      trend: 'stable',
      insights: [
        "You completed 3/5 self-assigned goals this week",
        "Your daily planner usage is consistent",
        "You're better at estimating task completion times"
      ],
      suggestions: [
        "Break down your chemistry revision into smaller daily chunks",
        "Try the Pomodoro technique for focused study sessions",
        "Set 1-2 specific goals for tomorrow before you end today"
      ],
      color: 'from-amber-500 to-orange-500',
      tracksWhat: 'Completion of self-assigned goals, daily planner usage'
    },
    {
      id: 'exposure-aspirations',
      name: 'Exposure & Aspirations',
      icon: <Globe className="h-5 w-5" />,
      value: 70,
      trend: 'up',
      insights: [
        "You've explored 3 new career paths this month",
        "Your engagement with industry content has increased",
        "You've connected with 2 mentors in your field of interest"
      ],
      suggestions: [
        "Watch this short documentary about innovations in your field",
        "Join the upcoming virtual career fair next Tuesday",
        "Follow these recommended experts in your area of interest"
      ],
      color: 'from-blue-500 to-cyan-500',
      tracksWhat: 'Curiosity & career exploration, mentorship interest, engagement with inspiring content'
    },
    {
      id: 'support-system',
      name: 'Support System Vibe',
      icon: <Heart className="h-5 w-5" />,
      value: 75,
      trend: 'stable',
      insights: [
        "Your journal entries show balanced emotional health",
        "You've been reaching out when you need support",
        "Your stress management techniques are working well"
      ],
      suggestions: [
        "Schedule a quick check-in call with your mentor",
        "Try this 5-minute mindfulness exercise before studying",
        "Read about another student who overcame similar challenges"
      ],
      color: 'from-rose-500 to-pink-500',
      tracksWhat: 'Emotional cues from journaling, parental support check-ins'
    }
  ];
  
  const getMetricById = (id: string) => metricsData.find(metric => metric.id === id);
  const selectedMetricData = selectedMetric ? getMetricById(selectedMetric) : null;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  // Get trend icon and color based on trend value
  const getTrendIndicator = (trend: 'up' | 'down' | 'stable') => {
    switch(trend) {
      case 'up':
        return <span className="text-emerald-500 flex items-center text-xs font-medium">↑ Improving</span>;
      case 'down':
        return <span className="text-red-500 flex items-center text-xs font-medium">↓ Declining</span>;
      default:
        return <span className="text-amber-500 flex items-center text-xs font-medium">→ Stable</span>;
    }
  };
  
  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'peer',
      message: 'You joined a study group with 3 other students',
      time: '2 hours ago',
      icon: <Users className="text-blue-500" />
    },
    {
      id: 2,
      type: 'confidence',
      message: 'Your test prediction was 8% below your actual score - you\'re improving!',
      time: '1 day ago',
      icon: <TrendingUp className="text-emerald-500" />
    },
    {
      id: 3,
      type: 'support',
      message: 'You completed your weekly mood journal entry',
      time: '2 days ago',
      icon: <Heart className="text-pink-500" />
    },
    {
      id: 4,
      type: 'self',
      message: 'You completed all your study goals for the day',
      time: '2 days ago',
      icon: <Target className="text-amber-500" />
    },
  ];
  
  // Success stories
  const successStories = [
    {
      id: 1,
      name: "Priya M.",
      story: "I improved my confidence score from 35% to 85% in 6 weeks by focusing on small daily successes instead of just long-term goals.",
      metric: "Confidence Meter",
      avatar: "PM"
    },
    {
      id: 2,
      name: "Rahul K.",
      story: "By using the peer study suggestions, I found 3 study partners who helped me understand concepts I was struggling with for months.",
      metric: "Peer Pulse",
      avatar: "RK"
    },
    {
      id: 3,
      name: "Ananya S.",
      story: "The Support System Vibe meter helped me realize I needed better study-life balance. After making changes, my scores improved by 12%.",
      metric: "Support System Vibe",
      avatar: "AS"
    }
  ];

  return (
    <Card className="border-t-4 border-t-violet-500">
      <CardHeader className="pb-3 bg-gradient-to-r from-violet-500/10 to-indigo-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-violet-100 rounded-full">
              <BarChart3 className="text-violet-600" />
            </div>
            <div>
              <CardTitle className="text-lg gradient-text">Surrounding Influences Meter</CardTitle>
              <CardDescription>Track the environment shaping your learning journey</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-violet-100 text-violet-700 border-violet-200">
            Motivational
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="overview" className="flex-1 gap-1 rounded-none">
              <BarChart3 size={14} /> Overview
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex-1 gap-1 rounded-none">
              <BrainCircuit size={14} /> Insights
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex-1 gap-1 rounded-none">
              <Clock size={14} /> Activities
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex-1 gap-1 rounded-none">
              <Award size={14} /> Success Stories
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="p-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Your Influence Metrics</h3>
                <p className="text-xs text-gray-500 mb-4">
                  These factors shape your learning environment. Click on each for details and personalized recommendations.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {metricsData.map((metric) => (
                  <motion.div
                    key={metric.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-lg border p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedMetric(metric.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full bg-gradient-to-r ${metric.color} text-white`}>
                          {metric.icon}
                        </div>
                        <h3 className="font-medium">{metric.name}</h3>
                      </div>
                      {getTrendIndicator(metric.trend)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Current Level</span>
                        <span className="font-medium">{metric.value}%</span>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 truncate">
                        Tracks: {metric.tracksWhat}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div variants={itemVariants} className="pt-2">
                <div className="bg-violet-50 border border-violet-100 rounded-lg p-3 text-sm">
                  <div className="flex gap-2 items-start">
                    <HelpCircle className="text-violet-600 mt-0.5" size={16} />
                    <div>
                      <p className="text-violet-800 font-medium">How to use this dashboard</p>
                      <p className="text-violet-700 text-xs mt-1">
                        This dashboard tracks environmental factors that influence your learning, not to judge but to help you 
                        understand what's shaping your journey. Use the insights and recommendations to create an optimal learning environment.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          {/* Insights Tab */}
          <TabsContent value="insights" className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Personalized Insights</h3>
                <p className="text-xs text-gray-500 mb-4">
                  Discover how your environment is affecting your learning journey
                </p>
              </div>
              
              {/* Top insights */}
              <div className="space-y-3">
                {metricsData
                  .filter(metric => metric.trend === 'up' && metric.value > 70)
                  .slice(0, 2)
                  .map(metric => (
                    <div 
                      key={`strength-${metric.id}`}
                      className="bg-emerald-50 border border-emerald-100 rounded-lg p-3"
                    >
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 bg-emerald-100 rounded-full mt-0.5">
                          <ThumbsUp size={12} className="text-emerald-700" />
                        </div>
                        <div>
                          <h4 className="font-medium text-emerald-800 text-sm">{metric.name} Strength</h4>
                          <p className="text-xs text-emerald-700 mt-1">{metric.insights[0]}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
                
                {metricsData
                  .filter(metric => metric.trend !== 'up' || metric.value < 70)
                  .slice(0, 2)
                  .map(metric => (
                    <div 
                      key={`opportunity-${metric.id}`}
                      className="bg-amber-50 border border-amber-100 rounded-lg p-3"
                    >
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 bg-amber-100 rounded-full mt-0.5">
                          <Bell size={12} className="text-amber-700" />
                        </div>
                        <div>
                          <h4 className="font-medium text-amber-800 text-sm">{metric.name} Opportunity</h4>
                          <p className="text-xs text-amber-700 mt-1">{metric.suggestions[0]}</p>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="h-auto p-0 text-amber-800 text-xs mt-1"
                            onClick={() => setSelectedMetric(metric.id)}
                          >
                            View suggestions <ArrowRight size={10} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              
              {/* Weekly summary */}
              <div className="bg-white rounded-lg border p-4">
                <h3 className="font-medium text-sm flex items-center gap-2 mb-3">
                  <BookOpen size={14} /> Weekly Learning Environment Summary
                </h3>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-600">Study Sessions</p>
                      <p className="font-bold text-blue-700">18</p>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded-lg">
                      <p className="text-xs text-purple-600">Peer Interactions</p>
                      <p className="font-bold text-purple-700">12</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-600">Goals Completed</p>
                      <p className="font-bold text-green-700">7/10</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-1">Top Focus Area This Week</h4>
                    <div className="bg-indigo-50 rounded-md p-2 text-xs text-indigo-700">
                      Based on your pattern, focus on increasing group study sessions for physics topics. 
                      Students with similar profiles improved by 15% when doing so.
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional insights based on metrics */}
              <div className="bg-white rounded-lg border p-4 space-y-3">
                <h3 className="font-medium text-sm">Learning Style Match</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-gray-700">
                    <span>Environment effectiveness</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-1.5" />
                  <p className="text-xs text-gray-600">
                    Your current study environment matches well with your identified learning style.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Activities Tab */}
          <TabsContent value="activities" className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Recent Activities</h3>
                <p className="text-xs text-gray-500 mb-4">
                  Events and actions that have influenced your learning environment
                </p>
              </div>
              
              {/* Timeline of activities */}
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={activity.id} className="relative pl-6">
                    {/* Timeline line */}
                    {index < recentActivities.length - 1 && (
                      <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 w-[23px] h-[23px] rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                      {activity.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="bg-white rounded-lg border p-3">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  className="w-full text-sm"
                >
                  View More Activities
                </Button>
              </div>
              
              {/* Weekly summary */}
              <div className="bg-gray-50 rounded-lg border p-4">
                <h3 className="font-medium text-sm mb-3">Weekly Influence Highlights</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="p-1 bg-blue-100 rounded-full">
                      <Users size={12} className="text-blue-600" />
                    </div>
                    <p className="text-xs">You engaged with peers 40% more than last week</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="p-1 bg-purple-100 rounded-full">
                      <BrainCircuit size={12} className="text-purple-600" />
                    </div>
                    <p className="text-xs">Your digital distraction time decreased by 15%</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="p-1 bg-green-100 rounded-full">
                      <Target size={12} className="text-green-600" />
                    </div>
                    <p className="text-xs">You completed 70% of your self-assigned tasks</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Success Stories Tab */}
          <TabsContent value="stories" className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Success Stories</h3>
                <p className="text-xs text-gray-500 mb-4">
                  Learn from others who improved their learning environment
                </p>
              </div>
              
              {/* Success stories */}
              <div className="space-y-3">
                {successStories.map(story => (
                  <div key={story.id} className="bg-white rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-violet-100 text-violet-700">
                          {story.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{story.name}</h4>
                          <Badge variant="outline" className="h-5 text-xs">
                            {story.metric}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700">{story.story}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-violet-50 border border-violet-100 rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-violet-800">Share your own success story</p>
                  <p className="text-xs text-violet-700 mt-1">
                    How have you improved your learning environment? Share your experience to inspire others!
                  </p>
                  <Button 
                    className="bg-violet-600 hover:bg-violet-700 mt-3"
                  >
                    Share Your Story
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="bg-gradient-to-r from-violet-500/5 to-indigo-500/5 border-t px-3 py-2">
        <p className="text-xs text-gray-500 w-full text-center">
          Your learning environment shapes up to 40% of your study effectiveness
        </p>
      </CardFooter>
      
      {/* Details Dialog */}
      <Dialog open={!!selectedMetric} onOpenChange={(open) => !open && setSelectedMetric(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                {selectedMetricData && (
                  <>
                    <div className={`p-2 rounded-full bg-gradient-to-r ${selectedMetricData.color} text-white`}>
                      {selectedMetricData.icon}
                    </div>
                    <span>{selectedMetricData?.name}</span>
                  </>
                )}
              </div>
            </DialogTitle>
            <DialogDescription>
              {selectedMetricData?.tracksWhat}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMetricData && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current Level</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedMetricData.value}%</span>
                    {getTrendIndicator(selectedMetricData.trend)}
                  </div>
                </div>
                <Progress value={selectedMetricData.value} className="h-2.5" />
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Recent Insights:</h4>
                  <ul className="space-y-2">
                    {selectedMetricData.insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2 bg-indigo-50 p-2 rounded-md text-sm">
                        <div className="mt-0.5">
                          <BrainCircuit size={14} className="text-indigo-600" />
                        </div>
                        <span className="text-indigo-700">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Personalized Suggestions:</h4>
                  <ul className="space-y-2">
                    {selectedMetricData.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 bg-emerald-50 p-2 rounded-md text-sm">
                        <div className="mt-0.5">
                          <ArrowRight size={14} className="text-emerald-600" />
                        </div>
                        <span className="text-emerald-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-violet-50 p-3 rounded-lg border border-violet-100 text-sm">
                  <p className="font-medium text-violet-800 mb-1">Why this matters</p>
                  <p className="text-xs text-violet-700">
                    Research shows that improvements in your {selectedMetricData.name.toLowerCase()} 
                    can lead to 15-20% better learning outcomes. This metric is designed to help you
                    optimize your environment, not to judge.
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SurroundingInfluencesMeter;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, BookOpen, Video, FlaskConical, Brain, 
  Play, Target, Users, Clock, TrendingUp, Award,
  BarChart3, PieChart, LineChart, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

// Import enhanced tab components
import VideoTabContent from '@/components/dashboard/student/concepts/VideoTabContent';
import FormulaTabContent from '@/components/dashboard/student/concepts/concept-detail/FormulaTabContent';
import PersonalizedRecommendations from '@/components/dashboard/student/concepts/concept-detail/PersonalizedRecommendations';

const ConceptDetailPage = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [masteryLevel, setMasteryLevel] = useState(67);

  // Mock concept data - in real app, this would come from API
  const conceptData = {
    id: conceptId || 'newtons-second-law',
    title: "Newton's Second Law of Motion",
    subject: "Physics",
    difficulty: "Medium",
    description: "Understanding the relationship between force, mass, and acceleration",
    masteryLevel: 67,
    timeSpent: "2h 45m",
    problemsSolved: 23,
    videoProgress: 75,
    labProgress: 40
  };

  useEffect(() => {
    console.log('Concept Detail Page loaded for:', conceptId);
  }, [conceptId]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleOpenFormulaLab = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
  };

  const handleBackToConcepts = () => {
    navigate('/dashboard/student/concepts');
  };

  // Premium analytics data
  const analyticsData = {
    performanceMetrics: [
      { label: 'Understanding', value: 78, color: 'bg-blue-500' },
      { label: 'Application', value: 65, color: 'bg-green-500' },
      { label: 'Problem Solving', value: 72, color: 'bg-purple-500' },
      { label: 'Retention', value: 85, color: 'bg-orange-500' }
    ],
    learningTrend: [
      { day: 'Mon', score: 45 },
      { day: 'Tue', score: 52 },
      { day: 'Wed', score: 48 },
      { day: 'Thu', score: 61 },
      { day: 'Fri', score: 67 },
      { day: 'Sat', score: 71 },
      { day: 'Sun', score: 75 }
    ],
    timeDistribution: [
      { activity: 'Videos', time: 45, color: '#8B5CF6' },
      { activity: 'Practice', time: 35, color: '#3B82F6' },
      { activity: 'Lab Work', time: 20, color: '#10B981' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToConcepts}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Concepts
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {conceptData.title}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="secondary">{conceptData.subject}</Badge>
                <Badge variant="outline">{conceptData.difficulty}</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {conceptData.timeSpent} studied
                </span>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-4">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{masteryLevel}%</div>
                <div className="text-xs text-gray-600">Mastery</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{conceptData.problemsSolved}</div>
                <div className="text-xs text-gray-600">Problems</div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Premium Learning Analytics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Learning Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Performance Metrics */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    Performance Breakdown
                  </h3>
                  {analyticsData.performanceMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{metric.label}</span>
                        <span className="font-medium">{metric.value}%</span>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                    </div>
                  ))}
                </div>

                {/* Learning Trend */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <LineChart className="h-4 w-4 text-green-600" />
                    7-Day Progress Trend
                  </h3>
                  <div className="h-32 flex items-end gap-2">
                    {analyticsData.learningTrend.map((day, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                          style={{ height: `${day.score}%` }}
                        />
                        <span className="text-xs mt-1">{day.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Distribution */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-purple-600" />
                    Study Time Distribution
                  </h3>
                  <div className="space-y-3">
                    {analyticsData.timeDistribution.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm flex-1">{item.activity}</span>
                        <span className="text-sm font-medium">{item.time}min</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Learning Tools Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
                <TabsTrigger 
                  value="overview" 
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
                >
                  <BookOpen className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="videos" 
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
                >
                  <Video className="h-4 w-4" />
                  Videos
                </TabsTrigger>
                <TabsTrigger 
                  value="formulas" 
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
                >
                  <FlaskConical className="h-4 w-4" />
                  Formulas & 3D
                </TabsTrigger>
                <TabsTrigger 
                  value="practice" 
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
                >
                  <Brain className="h-4 w-4" />
                  Practice
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Concept Overview</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {conceptData.description}
                      </p>
                      
                      {/* Key Learning Points */}
                      <div className="space-y-3">
                        <h4 className="font-medium">Key Learning Points:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                            <span className="text-sm">Understand the mathematical relationship F = ma</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                            <span className="text-sm">Apply the law to real-world scenarios</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                            <span className="text-sm">Solve complex physics problems</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Your Progress</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Overall Mastery</span>
                          <span className="font-medium">{masteryLevel}%</span>
                        </div>
                        <Progress value={masteryLevel} className="h-3" />
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <Card className="p-4 text-center">
                            <Video className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                            <div className="text-lg font-semibold">{conceptData.videoProgress}%</div>
                            <div className="text-xs text-gray-600">Video Progress</div>
                          </Card>
                          <Card className="p-4 text-center">
                            <FlaskConical className="h-6 w-6 mx-auto mb-2 text-green-600" />
                            <div className="text-lg font-semibold">{conceptData.labProgress}%</div>
                            <div className="text-xs text-gray-600">Lab Progress</div>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="videos" className="mt-0">
                <VideoTabContent conceptName={conceptData.title} />
              </TabsContent>

              <TabsContent value="formulas" className="mt-0">
                <FormulaTabContent 
                  conceptId={conceptData.id}
                  conceptTitle={conceptData.title}
                  handleOpenFormulaLab={handleOpenFormulaLab}
                />
              </TabsContent>

              <TabsContent value="practice" className="mt-0">
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-xl font-semibold mb-2">Practice Problems</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Test your understanding with interactive practice problems
                    </p>
                    <Button 
                      onClick={() => navigate('/dashboard/student/practice-exam')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Practice Session
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>

        {/* Merged Suggested Actions - Horizontal Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 border-amber-100 dark:border-amber-800">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Suggested Study Actions
              </CardTitle>
              <p className="text-amber-100 text-sm">
                Personalized recommendations to enhance your learning
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Quick Practice */}
                <Card 
                  className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-blue-500"
                  onClick={() => navigate('/dashboard/student/practice-exam')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <Target className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">Quick Practice</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          Solve 5 related problems
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          15 min
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Video Review */}
                <Card 
                  className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-purple-500"
                  onClick={() => setActiveTab('videos')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                        <Video className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">Video Review</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          Watch advanced examples
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          20 min
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Formula Lab */}
                <Card 
                  className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-green-500"
                  onClick={handleOpenFormulaLab}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                        <FlaskConical className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">Formula Lab</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          Interactive experiments
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          25 min
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Study Group */}
                <Card 
                  className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-orange-500"
                  onClick={() => navigate('/dashboard/student/study-groups')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                        <Users className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">Study Group</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          Join peer discussions
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          30 min
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/dashboard/student/flashcards')}
                >
                  Create Flashcards
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/dashboard/student/analytics')}
                >
                  View Analytics
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "AI Tutor",
                      description: "Connecting you with AI tutor..."
                    });
                  }}
                >
                  Ask AI Tutor
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <div>
                    <h3 className="font-semibold">Keep up the great work!</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You're making excellent progress on this concept
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/dashboard/student/concepts')}
                >
                  Explore More Concepts
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;

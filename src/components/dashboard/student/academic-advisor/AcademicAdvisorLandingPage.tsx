
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, 
  Brain, 
  Target, 
  TrendingUp, 
  BookOpen,
  Calendar,
  Award,
  MessageSquare,
  Lightbulb,
  BarChart3,
  Users,
  Star,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '../SharedPageLayout';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';

const AcademicAdvisorLandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('guidance');

  const academicInsights = [
    {
      type: 'strength',
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      title: "Physics Performance Trending Up",
      description: "Your mechanics understanding has improved by 28% this week",
      action: "Continue Current Strategy",
      priority: "positive"
    },
    {
      type: 'improvement',
      icon: <Target className="h-5 w-5 text-orange-600" />,
      title: "Chemistry Organic Reactions Need Focus",
      description: "Spend 20 minutes daily on reaction mechanisms",
      action: "Create Study Plan",
      priority: "medium"
    },
    {
      type: 'opportunity',
      icon: <Lightbulb className="h-5 w-5 text-blue-600" />,
      title: "Mathematics Integration Mastery Opportunity",
      description: "You're 85% ready to master advanced integration techniques",
      action: "Take Assessment",
      priority: "high"
    }
  ];

  const studyRecommendations = [
    {
      subject: "Physics",
      topic: "Electromagnetic Induction",
      reason: "Foundation for upcoming advanced topics",
      timeEstimate: "45 minutes",
      difficulty: "Medium",
      priority: "High"
    },
    {
      subject: "Chemistry",
      topic: "Periodic Trends Review",
      reason: "Weak area identified in recent assessments",
      timeEstimate: "30 minutes",
      difficulty: "Easy",
      priority: "Medium"
    },
    {
      subject: "Mathematics",
      topic: "Differential Equations Practice",
      reason: "Advanced preparation for exam patterns",
      timeEstimate: "60 minutes",
      difficulty: "Hard",
      priority: "High"
    }
  ];

  const upcomingMilestones = [
    {
      title: "Physics Chapter 12 Completion",
      date: "2 days",
      progress: 78,
      type: "chapter"
    },
    {
      title: "Chemistry Mock Test",
      date: "5 days",
      progress: 45,
      type: "assessment"
    },
    {
      title: "Mathematics Weekly Goal",
      date: "3 days",
      progress: 92,
      type: "goal"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'positive': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <SharedPageLayout
      title="Academic Advisor"
      subtitle="Your personalized AI mentor for academic excellence"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Hero Section with Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <GraduationCap className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">87%</div>
              <div className="text-sm text-blue-700">Overall Academic Health</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">+15%</div>
              <div className="text-sm text-green-700">Performance Improvement</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-purple-600">23</div>
              <div className="text-sm text-purple-700">Study Goals Achieved</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-600" />
                AI Academic Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {academicInsights.map((insight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="p-4 bg-white/80 rounded-lg border border-white/50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-full shadow-sm">
                          {insight.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                          <p className="text-xs text-gray-600 mb-2">{insight.description}</p>
                          <Button size="sm" variant="outline" className="text-xs">
                            {insight.action}
                          </Button>
                        </div>
                      </div>
                      <Badge variant="outline" className={getPriorityColor(insight.priority)}>
                        {insight.priority}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="guidance">Guidance</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="guidance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Study Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Personalized Study Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studyRecommendations.map((rec, idx) => (
                      <div key={idx} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-sm">{rec.subject}: {rec.topic}</h4>
                            <p className="text-xs text-gray-600">{rec.reason}</p>
                          </div>
                          <div className="flex gap-1">
                            <Badge variant="outline" className={getDifficultyColor(rec.difficulty)}>
                              {rec.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {rec.timeEstimate}
                          </div>
                          <Button size="sm" variant="outline">Start Study</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Milestones */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingMilestones.map((milestone, idx) => (
                      <div key={idx} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{milestone.title}</h4>
                          <span className="text-xs text-gray-500">Due in {milestone.date}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{milestone.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${milestone.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Lightbulb className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium mb-2">Smart Recommendations</h3>
                  <p className="text-gray-600">AI-powered study recommendations based on your learning patterns...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium mb-2">Progress Analytics</h3>
                  <p className="text-gray-600">Detailed progress tracking and performance analytics...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium mb-2">AI Academic Assistant</h3>
                  <p className="text-gray-600">Chat with your AI academic advisor for instant guidance...</p>
                  <Button className="mt-4">Start Conversation</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Voice Assistant */}
      <FloatingVoiceButton 
        userName="Student"
        language="en-US"
        onNavigationCommand={(route) => navigate(route)}
      />
    </SharedPageLayout>
  );
};

export default AcademicAdvisorLandingPage;

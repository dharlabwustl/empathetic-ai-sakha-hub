
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import {
  GraduationCap,
  MessageCircle,
  TrendingUp,
  Target,
  Brain,
  Calendar,
  Star,
  BookOpen,
  Clock,
  Award,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';

const AcademicAdvisorPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const advisorInsights = [
    {
      id: 'performance',
      title: 'Performance Analysis',
      type: 'analysis',
      priority: 'high',
      message: "Your Chemistry scores have improved by 15% this month! However, Organic Chemistry still needs focused attention. I recommend dedicating 30 minutes daily to reaction mechanisms.",
      suggestions: [
        "Focus on electron movement patterns",
        "Practice 10 mechanism problems daily",
        "Use 3D molecular models for visualization"
      ],
      timeEstimate: "2-3 weeks for significant improvement"
    },
    {
      id: 'study-plan',
      title: 'Study Plan Optimization',
      type: 'strategy',
      priority: 'medium',
      message: "Based on your learning patterns, you're most productive between 6-8 AM and 7-9 PM. Let's restructure your study schedule to maximize these peak hours.",
      suggestions: [
        "Schedule difficult topics during peak hours",
        "Use afternoon for revision and flashcards",
        "Take breaks every 45 minutes for optimal retention"
      ],
      timeEstimate: "Immediate implementation"
    },
    {
      id: 'exam-readiness',
      title: 'NEET Exam Readiness',
      type: 'milestone',
      priority: 'high',
      message: "You're currently at 78% exam readiness. To reach 90% by exam date, focus on these key areas: Physics numericals, Biology diagrams, and Chemistry equations.",
      suggestions: [
        "Complete 2 full-length mock tests weekly",
        "Master 50 key Physics formulas",
        "Practice biological diagram labeling daily"
      ],
      timeEstimate: "6-8 weeks to reach target"
    }
  ];

  const weeklyGoals = [
    { goal: "Complete Organic Chemistry Module", progress: 75, target: 100 },
    { goal: "Solve 50 Physics Problems", progress: 32, target: 50 },
    { goal: "Memorize 100 Biology Terms", progress: 68, target: 100 },
    { goal: "Take 2 Mock Tests", progress: 1, target: 2 }
  ];

  const upcomingMilestones = [
    { title: "Physics Chapter Test", date: "Tomorrow", type: "test", importance: "high" },
    { title: "Chemistry Lab Report Due", date: "This Friday", type: "assignment", importance: "medium" },
    { title: "Biology Mock Test", date: "Next Week", type: "exam", importance: "high" },
    { title: "Math Problem Set Review", date: "Next Monday", type: "review", importance: "low" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 text-red-700';
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-700';
      case 'low': return 'border-green-200 bg-green-50 text-green-700';
      default: return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'analysis': return <BarChart3 className="h-4 w-4" />;
      case 'strategy': return <Target className="h-4 w-4" />;
      case 'milestone': return <Award className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <SharedPageLayout
      title="Academic Advisor"
      subtitle="Your personalized AI mentor for NEET success"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back, Future Doctor! 👩‍⚕️</h2>
                  <p className="text-blue-100">
                    I've analyzed your recent performance and prepared personalized insights to accelerate your NEET preparation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="insights" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
              <TabsTrigger value="goals">Weekly Goals</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="chat">Ask Advisor</TabsTrigger>
            </TabsList>

            <TabsContent value="insights">
              <div className="space-y-4">
                {advisorInsights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                              {getTypeIcon(insight.type)}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{insight.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getPriorityColor(insight.priority)}>
                                  {insight.priority} priority
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {insight.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {insight.message}
                        </p>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-yellow-500" />
                            Recommended Actions:
                          </h4>
                          <ul className="space-y-2">
                            {insight.suggestions.map((suggestion, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                            <Clock className="h-4 w-4" />
                            <span>Timeline: {insight.timeEstimate}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="goals">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-500" />
                    This Week's Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyGoals.map((goal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{goal.goal}</span>
                          <span className="text-sm text-gray-600">{goal.progress}/{goal.target}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={(goal.progress / goal.target) * 100} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{Math.round((goal.progress / goal.target) * 100)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <TrendingUp className="h-5 w-5" />
                      <span className="font-medium">Great Progress!</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      You're on track to complete 3 out of 4 goals this week. Keep up the momentum!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="milestones">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-500" />
                    Upcoming Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingMilestones.map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            milestone.importance === 'high' ? 'bg-red-100 text-red-600' :
                            milestone.importance === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {milestone.type === 'test' && <BookOpen className="h-4 w-4" />}
                            {milestone.type === 'assignment' && <Target className="h-4 w-4" />}
                            {milestone.type === 'exam' && <Award className="h-4 w-4" />}
                            {milestone.type === 'review' && <Brain className="h-4 w-4" />}
                          </div>
                          <div>
                            <div className="font-medium">{milestone.title}</div>
                            <div className="text-sm text-gray-600">{milestone.date}</div>
                          </div>
                        </div>
                        <Badge className={getPriorityColor(milestone.importance)}>
                          {milestone.importance}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-500" />
                    Ask Your Academic Advisor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button variant="outline" className="h-auto p-4 text-left">
                        <div>
                          <div className="font-medium">Study Strategy Help</div>
                          <div className="text-sm text-gray-600 mt-1">Get personalized study plans</div>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 text-left">
                        <div>
                          <div className="font-medium">Subject-Specific Guidance</div>
                          <div className="text-sm text-gray-600 mt-1">Expert advice for each subject</div>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 text-left">
                        <div>
                          <div className="font-medium">Exam Preparation</div>
                          <div className="text-sm text-gray-600 mt-1">NEET-specific strategies</div>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 text-left">
                        <div>
                          <div className="font-medium">Motivation & Support</div>
                          <div className="text-sm text-gray-600 mt-1">Stay motivated and focused</div>
                        </div>
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-700 mb-2">
                        <Star className="h-4 w-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-sm text-blue-600">
                        Ask specific questions like "How can I improve my Physics problem-solving speed?" for the best advice!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Voice Assistant */}
      <FloatingVoiceButton 
        userName="Student"
        language="en-US"
        onNavigationCommand={(route) => navigate(route)}
      />
    </SharedPageLayout>
  );
};

export default AcademicAdvisorPage;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Brain, 
  Zap,
  FileText,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserProfileType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import LearningPageVoiceAssistant from '@/components/voice/LearningPageVoiceAssistant';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const navigate = useNavigate();

  // Sample data for dashboard overview
  const todayStats = {
    conceptsStudied: 3,
    flashcardsReviewed: 25,
    practiceQuestionsAttempted: 15,
    studyTimeMinutes: 120
  };

  const examReadinessScore = 72;
  const streakDays = 7;

  const quickActions = [
    {
      title: "Continue Today's Plan",
      description: "Resume your personalized study schedule",
      icon: Calendar,
      action: () => navigate('/dashboard/student/today'),
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Concept Cards",
      description: "Explore interactive learning concepts",
      icon: Brain,
      action: () => navigate('/dashboard/student/concepts'),
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Quick Flashcards",
      description: "Review with spaced repetition",
      icon: Zap,
      action: () => navigate('/dashboard/student/flashcards'),
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Practice Exam",
      description: "Test your knowledge",
      icon: FileText,
      action: () => navigate('/dashboard/student/practice-exam'),
      color: "from-purple-500 to-pink-500"
    }
  ];

  const upcomingEvents = [
    {
      title: "Physics Revision",
      icon: <BookOpen className="h-4 w-4" />,
      time: "2:00 PM"
    },
    {
      title: "Chemistry Practice Test",
      icon: <CheckCircle className="h-4 w-4" />,
      time: "4:30 PM"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section with Smart Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {userProfile.name}!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Ready to continue your exam preparation journey?
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{examReadinessScore}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Exam Ready</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{todayStats.conceptsStudied}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Concepts Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{todayStats.flashcardsReviewed}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Flashcards</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{todayStats.practiceQuestionsAttempted}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{Math.floor(todayStats.studyTimeMinutes / 60)}h {todayStats.studyTimeMinutes % 60}m</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Study Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="cursor-pointer hover:shadow-md transition-all duration-200 border-0 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
                      <CardContent className="p-4">
                        <div className="text-center space-y-3">
                          <div className={`mx-auto w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center text-white`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-medium">{action.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {action.description}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={action.action}
                            className="w-full"
                          >
                            Start
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress Overview and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Study Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Weekly Goal</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Exam Readiness</span>
                  <span className="text-sm text-muted-foreground">{examReadinessScore}%</span>
                </div>
                <Progress value={examReadinessScore} className="h-2" />
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">Study Streak</span>
                  </div>
                  <Badge variant="secondary">{streakDays} days</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-600">
                        {event.icon}
                      </div>
                      <span className="font-medium">{event.title}</span>
                    </div>
                    <Badge variant="outline">{event.time}</Badge>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate('/dashboard/student/today')}
                >
                  View Full Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Learning Page Voice Assistant for dashboard support */}
      <LearningPageVoiceAssistant 
        userName={userProfile.name}
        pageType="concepts"
      />
    </div>
  );
};

export default RedesignedDashboardOverview;

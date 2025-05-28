
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UserProfileBase, MoodType } from '@/types/user/base';
import { 
  Brain, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  Zap, 
  Award,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Star,
  Timer,
  Users,
  Lightbulb
} from 'lucide-react';

interface ExamGoalAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  examProximity: 'critical' | 'urgent' | 'moderate' | 'relaxed';
  learningStyle: string;
  currentMood?: MoodType;
  [key: string]: any;
}

const ExamGoalAdaptiveDashboard: React.FC<ExamGoalAdaptiveDashboardProps> = ({
  userProfile,
  examProximity,
  learningStyle,
  currentMood,
  ...otherProps
}) => {
  // Adaptive color schemes based on exam proximity
  const adaptiveColors = useMemo(() => {
    switch (examProximity) {
      case 'critical':
        return {
          primary: 'bg-red-500',
          secondary: 'bg-red-100',
          accent: 'text-red-600',
          border: 'border-red-200',
          gradient: 'from-red-50 to-orange-50'
        };
      case 'urgent':
        return {
          primary: 'bg-orange-500',
          secondary: 'bg-orange-100',
          accent: 'text-orange-600',
          border: 'border-orange-200',
          gradient: 'from-orange-50 to-yellow-50'
        };
      case 'moderate':
        return {
          primary: 'bg-blue-500',
          secondary: 'bg-blue-100',
          accent: 'text-blue-600',
          border: 'border-blue-200',
          gradient: 'from-blue-50 to-indigo-50'
        };
      default:
        return {
          primary: 'bg-green-500',
          secondary: 'bg-green-100',
          accent: 'text-green-600',
          border: 'border-green-200',
          gradient: 'from-green-50 to-emerald-50'
        };
    }
  }, [examProximity]);

  // Adaptive priority features based on exam goal and proximity
  const adaptiveFeatures = useMemo(() => {
    const examGoal = userProfile.examGoal || 'NEET';
    
    const baseFeatures = {
      NEET: {
        critical: ['Mock Tests', 'Weak Areas', 'Quick Revision', 'Time Management'],
        urgent: ['Practice Papers', 'Concept Clarity', 'Speed Building', 'Stress Management'],
        moderate: ['Systematic Study', 'Chapter Tests', 'Formula Practice', 'Doubt Clearing'],
        relaxed: ['Foundation Building', 'Concept Learning', 'Regular Practice', 'Study Planning']
      },
      JEE: {
        critical: ['JEE Mains Mocks', 'Problem Solving', 'Time Optimization', 'Error Analysis'],
        urgent: ['Advanced Problems', 'Concept Revision', 'Speed Practice', 'Shortcuts'],
        moderate: ['Chapter Mastery', 'Problem Banks', 'Concept Tests', 'Study Schedule'],
        relaxed: ['Theory Building', 'Basic Problems', 'Concept Maps', 'Long-term Planning']
      },
      UPSC: {
        critical: ['Answer Writing', 'Current Affairs', 'Revision Notes', 'Mock Interviews'],
        urgent: ['Previous Papers', 'Static Portions', 'Essay Practice', 'GS Revision'],
        moderate: ['Subject Studies', 'Note Making', 'Test Series', 'Optional Prep'],
        relaxed: ['Foundation Reading', 'Basic Concepts', 'Newspaper Reading', 'Planning']
      }
    };
    
    return baseFeatures[examGoal]?.[examProximity] || baseFeatures.NEET[examProximity];
  }, [userProfile.examGoal, examProximity]);

  // Adaptive learning recommendations based on learning style
  const learningRecommendations = useMemo(() => {
    const recommendations = {
      visual: ['Mind Maps', 'Flowcharts', 'Video Lectures', 'Infographics'],
      auditory: ['Audio Notes', 'Discussions', 'Verbal Explanations', 'Podcasts'],
      kinesthetic: ['Hands-on Practice', 'Lab Work', 'Physical Models', 'Interactive Demos'],
      reading_writing: ['Text Notes', 'Summary Writing', 'Reading Materials', 'Written Practice']
    };
    return recommendations[learningStyle as keyof typeof recommendations] || recommendations.visual;
  }, [learningStyle]);

  // Calculate exam countdown
  const examCountdown = useMemo(() => {
    if (!userProfile.examDate) return null;
    const examDate = new Date(userProfile.examDate);
    const today = new Date();
    const daysLeft = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft;
  }, [userProfile.examDate]);

  // Performance indicators
  const performanceData = {
    overallProgress: 72,
    weakSubjects: userProfile.weakSubjects || ['Physics', 'Organic Chemistry'],
    strongSubjects: userProfile.strongSubjects || ['Biology', 'Inorganic Chemistry'],
    studyStreak: userProfile.studyStreak || 12,
    weeklyGoal: 85,
    weeklyProgress: 68
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${adaptiveColors.gradient} p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Adaptive Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Exam Countdown & Priority */}
          <Card className={`${adaptiveColors.border} ${adaptiveColors.secondary}/50`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className={`text-lg ${adaptiveColors.accent}`}>
                  {userProfile.examGoal || 'NEET'} 2025
                </CardTitle>
                <Badge variant={examProximity === 'critical' ? 'destructive' : examProximity === 'urgent' ? 'default' : 'secondary'}>
                  {examProximity.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${adaptiveColors.accent}`}>
                    {examCountdown || 180}
                  </div>
                  <p className="text-sm text-muted-foreground">Days Remaining</p>
                </div>
                <Progress value={((365 - (examCountdown || 180)) / 365) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Personal Performance Hub */}
          <Card className={`${adaptiveColors.border} ${adaptiveColors.secondary}/50`}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-lg ${adaptiveColors.accent} flex items-center gap-2`}>
                <TrendingUp className="h-5 w-5" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Overall Readiness</span>
                  <span className={`text-lg font-semibold ${adaptiveColors.accent}`}>
                    {performanceData.overallProgress}%
                  </span>
                </div>
                <Progress value={performanceData.overallProgress} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Strong: {performanceData.strongSubjects.length}</span>
                  <span className="text-red-600">Need Focus: {performanceData.weakSubjects.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Adaptive Study Mode */}
          <Card className={`${adaptiveColors.border} ${adaptiveColors.secondary}/50`}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-lg ${adaptiveColors.accent} flex items-center gap-2`}>
                <Brain className="h-5 w-5" />
                Smart Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  {learningStyle} Learner
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Focus on {learningRecommendations[0]} and {learningRecommendations[1]} today
                </p>
                <Button size="sm" className={`w-full ${adaptiveColors.primary}`}>
                  Start Smart Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Priority Action Section */}
        <Card className={`${adaptiveColors.border}`}>
          <CardHeader>
            <CardTitle className={`${adaptiveColors.accent} flex items-center gap-2`}>
              <Target className="h-5 w-5" />
              Priority Actions ({examProximity.charAt(0).toUpperCase() + examProximity.slice(1)} Phase)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {adaptiveFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${adaptiveColors.secondary}`}>
                        {index === 0 && <Clock className={`h-4 w-4 ${adaptiveColors.accent}`} />}
                        {index === 1 && <AlertTriangle className={`h-4 w-4 ${adaptiveColors.accent}`} />}
                        {index === 2 && <Zap className={`h-4 w-4 ${adaptiveColors.accent}`} />}
                        {index === 3 && <CheckCircle className={`h-4 w-4 ${adaptiveColors.accent}`} />}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{feature}</h4>
                        <p className="text-xs text-muted-foreground">Start now</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personalized Learning Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Subject Focus Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Subject Focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2">Need Immediate Attention</h4>
                  {performanceData.weakSubjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-sm">{subject}</span>
                      <Button size="sm" variant="outline" className="text-xs">
                        Practice
                      </Button>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-600 mb-2">Maintain Strength</h4>
                  {performanceData.strongSubjects.slice(0, 2).map((subject, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-sm">{subject}</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Smart Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Smart Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Morning Focus</p>
                    <p className="text-xs text-muted-foreground">9:00 AM - 11:00 AM</p>
                  </div>
                  <Badge variant="secondary">Physics</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Afternoon Practice</p>
                    <p className="text-xs text-muted-foreground">2:00 PM - 4:00 PM</p>
                  </div>
                  <Badge variant="secondary">Chemistry</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Evening Revision</p>
                    <p className="text-xs text-muted-foreground">6:00 PM - 8:00 PM</p>
                  </div>
                  <Badge variant="secondary">Biology</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Weekly Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Star className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{performanceData.studyStreak} Day Streak!</p>
                    <p className="text-xs text-muted-foreground">Keep it going</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Weekly Goal</span>
                    <span className="text-sm font-medium">{performanceData.weeklyProgress}%</span>
                  </div>
                  <Progress value={performanceData.weeklyProgress} className="h-2" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Lightbulb className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm">Study during your peak hours</p>
                    <p className="text-xs text-muted-foreground">6-8 PM works best for you</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Adaptive Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Access Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { icon: Timer, label: 'Mock Test', urgent: true },
                { icon: Brain, label: 'Flashcards', urgent: false },
                { icon: BookOpen, label: 'Concepts', urgent: false },
                { icon: Users, label: 'Study Group', urgent: false },
                { icon: Target, label: 'Practice', urgent: true },
                { icon: Calendar, label: 'Schedule', urgent: false }
              ].map((tool, index) => (
                <Button
                  key={index}
                  variant={tool.urgent ? "default" : "outline"}
                  className={`h-20 flex-col gap-2 ${tool.urgent ? adaptiveColors.primary : ''}`}
                >
                  <tool.icon className="h-5 w-5" />
                  <span className="text-xs">{tool.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamGoalAdaptiveDashboard;

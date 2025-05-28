
import React from 'react';
import { UserProfileBase, MoodType, UserGoal, LearningStyle, StudyStyle } from '@/types/user/base';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Target, BookOpen, Brain, TrendingUp, Calendar, Zap, Users } from 'lucide-react';

interface AdaptiveDashboardLayoutProps {
  userProfile: UserProfileBase;
  preferences?: any;
  children?: React.ReactNode;
}

const AdaptiveDashboardLayout: React.FC<AdaptiveDashboardLayoutProps> = ({
  userProfile,
  preferences,
  children
}) => {
  // Get exam proximity in days
  const getExamProximity = () => {
    if (!userProfile.examDate) return null;
    const examDate = new Date(userProfile.examDate);
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysToExam = getExamProximity();

  // Get adaptive theme based on mood and exam proximity
  const getAdaptiveTheme = () => {
    const mood = userProfile.currentMood || userProfile.mood;
    const isExamNear = daysToExam && daysToExam < 30;
    
    if (isExamNear) {
      return 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200';
    }
    
    switch (mood) {
      case MoodType.STRESSED:
      case MoodType.ANXIOUS:
        return 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200';
      case MoodType.MOTIVATED:
      case MoodType.EXCITED:
        return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200';
      case MoodType.TIRED:
      case MoodType.OVERWHELMED:
        return 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200';
      default:
        return 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200';
    }
  };

  // Get personalized widgets based on exam goal and learning style
  const getPersonalizedWidgets = () => {
    const examGoal = userProfile.examGoal || preferences?.examGoal;
    const learningStyle = userProfile.learningStyle || preferences?.learningStyle;
    const weakSubjects = userProfile.weakSubjects || preferences?.weakSubjects || [];
    
    const widgets = [];

    // Exam-specific widgets
    if (examGoal === UserGoal.NEET) {
      widgets.push({
        title: 'NEET Focus Areas',
        icon: <Target className="h-5 w-5" />,
        content: (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Biology</span>
              <span className="font-semibold">45%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Chemistry</span>
              <span className="font-semibold">35%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Physics</span>
              <span className="font-semibold">20%</span>
            </div>
          </div>
        )
      });
    } else if (examGoal === UserGoal.JEE) {
      widgets.push({
        title: 'JEE Preparation Track',
        icon: <Zap className="h-5 w-5" />,
        content: (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Mathematics</span>
              <span className="font-semibold">40%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Physics</span>
              <span className="font-semibold">35%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Chemistry</span>
              <span className="font-semibold">25%</span>
            </div>
          </div>
        )
      });
    }

    // Learning style specific widgets
    if (learningStyle === LearningStyle.VISUAL) {
      widgets.push({
        title: 'Visual Learning Hub',
        icon: <Brain className="h-5 w-5" />,
        content: (
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full">
              📊 Interactive Diagrams
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              🎥 Video Concepts
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              🗺️ Mind Maps
            </Button>
          </div>
        )
      });
    } else if (learningStyle === LearningStyle.AUDITORY) {
      widgets.push({
        title: 'Audio Learning Center',
        icon: <Users className="h-5 w-5" />,
        content: (
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full">
              🎧 Audio Lectures
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              💬 Discussion Groups
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              🔊 Voice Notes
            </Button>
          </div>
        )
      });
    }

    // Weak subjects priority widget
    if (weakSubjects.length > 0) {
      widgets.push({
        title: 'Priority Focus Areas',
        icon: <TrendingUp className="h-5 w-5" />,
        content: (
          <div className="space-y-2">
            {weakSubjects.slice(0, 3).map((subject, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{subject}</span>
                <Badge variant="destructive" className="text-xs">
                  Needs Work
                </Badge>
              </div>
            ))}
            <Button size="sm" className="w-full mt-2">
              Start Practice Session
            </Button>
          </div>
        )
      });
    }

    // Time-based widgets
    if (daysToExam) {
      widgets.push({
        title: 'Exam Countdown',
        icon: <Calendar className="h-5 w-5" />,
        content: (
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-orange-600">
              {daysToExam}
            </div>
            <div className="text-sm text-gray-600">days to {examGoal}</div>
            <Progress value={Math.max(0, 100 - (daysToExam / 365) * 100)} className="w-full" />
            <div className="text-xs text-gray-500">
              {daysToExam < 30 ? 'Intensive mode recommended' : 'Steady progress mode'}
            </div>
          </div>
        )
      });
    }

    return widgets;
  };

  const widgets = getPersonalizedWidgets();
  const themeClass = getAdaptiveTheme();

  return (
    <div className={`min-h-screen p-6 ${themeClass}`}>
      {/* Adaptive Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Your Personalized {userProfile.examGoal || 'Study'} Dashboard
            </h1>
            <p className="text-gray-600">
              Adapted for {userProfile.learningStyle || 'your'} learning style
            </p>
          </div>
          <div className="flex items-center gap-2">
            {userProfile.currentMood && (
              <Badge variant="outline" className="capitalize">
                {userProfile.currentMood}
              </Badge>
            )}
            {userProfile.examGoal && (
              <Badge variant="default">
                {userProfile.examGoal} Prep
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Adaptive Widget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {widgets.map((widget, index) => (
          <Card key={index} className="border-2 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                {widget.icon}
                {widget.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {widget.content}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance-based Priority Section */}
      <Card className="mb-6 border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Today's Adaptive Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold">Morning Focus</h3>
              <p className="text-sm text-gray-600">High concentration subjects</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold">Afternoon Practice</h3>
              <p className="text-sm text-gray-600">Problem solving & tests</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold">Evening Review</h3>
              <p className="text-sm text-gray-600">Revision & weak areas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Original Dashboard Content */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default AdaptiveDashboardLayout;

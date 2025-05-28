
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { 
  Clock, 
  AlertTriangle, 
  Target, 
  BookOpen, 
  Brain, 
  FileText, 
  Calendar,
  Zap,
  TrendingUp,
  Timer,
  Flame
} from 'lucide-react';

interface ExamGoalAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  examProximity: 'critical' | 'urgent' | 'moderate' | 'relaxed';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
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
  // Exam proximity theme configuration
  const proximityTheme = useMemo(() => {
    switch (examProximity) {
      case 'critical':
        return {
          primary: 'bg-red-600',
          secondary: 'bg-red-100',
          accent: 'text-red-700',
          border: 'border-red-300',
          urgency: 'CRITICAL',
          urgencyColor: 'text-red-800',
          bgGradient: 'from-red-50 to-orange-50'
        };
      case 'urgent':
        return {
          primary: 'bg-orange-600',
          secondary: 'bg-orange-100',
          accent: 'text-orange-700',
          border: 'border-orange-300',
          urgency: 'URGENT',
          urgencyColor: 'text-orange-800',
          bgGradient: 'from-orange-50 to-yellow-50'
        };
      case 'moderate':
        return {
          primary: 'bg-blue-600',
          secondary: 'bg-blue-100',
          accent: 'text-blue-700',
          border: 'border-blue-300',
          urgency: 'MODERATE',
          urgencyColor: 'text-blue-800',
          bgGradient: 'from-blue-50 to-indigo-50'
        };
      case 'relaxed':
        return {
          primary: 'bg-green-600',
          secondary: 'bg-green-100',
          accent: 'text-green-700',
          border: 'border-green-300',
          urgency: 'PLANNED',
          urgencyColor: 'text-green-800',
          bgGradient: 'from-green-50 to-emerald-50'
        };
    }
  }, [examProximity]);

  // Exam goal specific priorities
  const examGoalConfig = useMemo(() => {
    const examGoal = userProfile.examGoal || 'NEET';
    
    switch (examGoal) {
      case 'NEET':
        return {
          subjects: [
            { name: 'Physics', weight: 'high', urgency: examProximity === 'critical' ? 'critical' : 'high', color: 'blue' },
            { name: 'Chemistry', weight: 'high', urgency: examProximity === 'critical' ? 'critical' : 'high', color: 'green' },
            { name: 'Biology', weight: 'high', urgency: examProximity === 'critical' ? 'critical' : 'high', color: 'purple' }
          ],
          focusAreas: ['Organic Chemistry', 'Human Physiology', 'Mechanics'],
          totalMarks: 720,
          examPattern: '180 questions, 720 marks'
        };
      case 'JEE':
        return {
          subjects: [
            { name: 'Mathematics', weight: 'critical', urgency: 'critical', color: 'red' },
            { name: 'Physics', weight: 'high', urgency: examProximity === 'critical' ? 'critical' : 'high', color: 'blue' },
            { name: 'Chemistry', weight: 'high', urgency: examProximity === 'critical' ? 'critical' : 'high', color: 'green' }
          ],
          focusAreas: ['Calculus', 'Mechanics', 'Organic Chemistry'],
          totalMarks: 300,
          examPattern: '75 questions, 300 marks'
        };
      default:
        return {
          subjects: [
            { name: 'Subject 1', weight: 'high', urgency: 'high', color: 'blue' },
            { name: 'Subject 2', weight: 'medium', urgency: 'medium', color: 'green' }
          ],
          focusAreas: ['Key Topics'],
          totalMarks: 100,
          examPattern: 'Standard pattern'
        };
    }
  }, [userProfile.examGoal, examProximity]);

  // Calculate days left
  const daysLeft = useMemo(() => {
    if (!userProfile.examDate) return null;
    const examDate = new Date(userProfile.examDate);
    const today = new Date();
    return Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }, [userProfile.examDate]);

  // Urgency indicator component
  const UrgencyIndicator = ({ subject }: { subject: any }) => {
    const getUrgencyIcon = () => {
      switch (subject.urgency) {
        case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
        case 'high': return <Timer className="h-4 w-4 text-orange-600" />;
        case 'medium': return <Clock className="h-4 w-4 text-yellow-600" />;
        default: return <Target className="h-4 w-4 text-green-600" />;
      }
    };

    const getUrgencyColor = () => {
      switch (subject.urgency) {
        case 'critical': return 'bg-red-100 text-red-800 border-red-300';
        case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
        case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        default: return 'bg-green-100 text-green-800 border-green-300';
      }
    };

    return (
      <div className={`flex items-center gap-1 px-2 py-1 rounded-md border ${getUrgencyColor()}`}>
        {getUrgencyIcon()}
        <span className="text-xs font-medium uppercase">{subject.urgency}</span>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${proximityTheme.bgGradient} p-6`}>
      {/* Exam Proximity Header */}
      <div className={`mb-8 p-6 rounded-xl border-2 ${proximityTheme.border} bg-white shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${proximityTheme.secondary}`}>
              <Calendar className={`h-8 w-8 ${proximityTheme.accent}`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {userProfile.examGoal || 'NEET'} Preparation Dashboard
              </h1>
              <p className="text-gray-600">Adaptive learning based on your exam proximity and profile</p>
            </div>
          </div>
          
          <div className="text-right">
            <Badge className={`text-lg px-4 py-2 ${proximityTheme.urgencyColor} font-bold`} variant="outline">
              {proximityTheme.urgency}
            </Badge>
            {daysLeft && (
              <p className={`text-2xl font-bold mt-2 ${proximityTheme.accent}`}>
                {daysLeft} days left
              </p>
            )}
          </div>
        </div>

        {/* Exam Goal Specific Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Exam Pattern</span>
              </div>
              <p className="text-sm text-gray-600">{examGoalConfig.examPattern}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Total Marks</span>
              </div>
              <p className="text-xl font-bold text-green-700">{examGoalConfig.totalMarks}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-5 w-5 text-orange-600" />
                <span className="font-semibold">Study Streak</span>
              </div>
              <p className="text-xl font-bold text-orange-700">{userProfile.studyStreak || 0} days</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subject Priority Cards with Urgency Indicators */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Subject Priorities & Urgency</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {examGoalConfig.subjects.map((subject, index) => (
            <Card key={index} className="border-2 hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{subject.name}</CardTitle>
                  <UrgencyIndicator subject={subject} />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-${subject.color}-700 border-${subject.color}-300`}>
                    {subject.weight.toUpperCase()} PRIORITY
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mastery Level</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-3" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily Goal</span>
                    <span className="font-medium">2.5h / 3h</span>
                  </div>
                  <Progress value={83} className="h-2" />
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className={`flex-1 ${proximityTheme.primary} hover:opacity-90`}>
                    <BookOpen className="h-4 w-4 mr-1" />
                    Study Now
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Brain className="h-4 w-4 mr-1" />
                    Practice
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Exam Goal Specific Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick Actions for {userProfile.examGoal}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            className={`h-24 flex flex-col gap-2 ${proximityTheme.primary} hover:opacity-90`}
            size="lg"
          >
            <FileText className="h-6 w-6" />
            <span>Mock Test</span>
          </Button>
          
          <Button 
            className={`h-24 flex flex-col gap-2 ${proximityTheme.primary} hover:opacity-90`}
            size="lg"
          >
            <Brain className="h-6 w-6" />
            <span>Revision</span>
          </Button>
          
          <Button 
            className={`h-24 flex flex-col gap-2 ${proximityTheme.primary} hover:opacity-90`}
            size="lg"
          >
            <Zap className="h-6 w-6" />
            <span>Flash Cards</span>
          </Button>
          
          <Button 
            className={`h-24 flex flex-col gap-2 ${proximityTheme.primary} hover:opacity-90`}
            size="lg"
          >
            <BookOpen className="h-6 w-6" />
            <span>Concepts</span>
          </Button>
        </div>
      </div>

      {/* Focus Areas for Exam Goal */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            Critical Focus Areas for {userProfile.examGoal}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {examGoalConfig.focusAreas.map((area, index) => (
              <div key={index} className={`p-4 rounded-lg ${proximityTheme.secondary} border ${proximityTheme.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{area}</h3>
                  <Badge className={proximityTheme.urgencyColor} variant="outline">HIGH</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">Complete understanding required</p>
                <Button size="sm" className={`w-full ${proximityTheme.primary}`}>
                  Start Learning
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamGoalAdaptiveDashboard;

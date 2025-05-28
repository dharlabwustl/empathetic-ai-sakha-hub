import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  BookOpen, Brain, Clock, Target, TrendingUp, Award, Users, 
  ChevronRight, Play, MessageCircle, Lightbulb, Star, AlertCircle,
  Calendar, CheckCircle, ArrowRight, Settings, Volume2, User,
  Crown, Zap, Trophy, Heart, Flame, Sun, Moon, Coffee, 
  School, GraduationCap, FlaskConical, Atom, Dna
} from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { useNavigate } from 'react-router-dom';
import MoodSelector from '../student/MoodSelector';

interface ComprehensiveAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ComprehensiveAdaptiveDashboard: React.FC<ComprehensiveAdaptiveDashboardProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange
}) => {
  const navigate = useNavigate();
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [examDetails] = useState({
    exam: 'NEET 2026',
    goal: 'Medical College Admission',
    daysToGo: 185,
    studyPace: 'Moderate',
    learnerStyle: 'Visual',
    mood: currentMood || MoodType.FOCUSED
  });

  // Study strategy based on pace and exam proximity
  const getStudyStrategy = () => {
    const { studyPace, daysToGo } = examDetails;
    
    if (daysToGo <= 60) {
      return {
        title: "NEET 2026 Strategy - INTENSIVE",
        subtitle: "Revision + Mock Tests",
        points: ["Focus on weak areas", "Daily mock tests", "Time management"]
      };
    } else if (daysToGo <= 120) {
      return {
        title: "NEET 2026 Strategy - ACCELERATED",
        subtitle: "Complete Syllabus + Practice",
        points: ["Cover remaining topics", "Intensive practice", "Regular assessment"]
      };
    } else {
      return {
        title: "NEET 2026 Strategy - MODERATE",
        subtitle: "Foundation Building + Practice",
        points: ["Complete syllabus", "Concept clarity", "Regular practice"]
      };
    }
  };

  const strategy = getStudyStrategy();

  // Subject breakdown data
  const subjectBreakdown = [
    {
      subject: "Physics",
      priority: "High",
      concepts: { completed: 42, total: 60 },
      flashcards: { completed: 85, total: 120 },
      practiceTests: { completed: 15, total: 20 },
      quizScore: 72,
      recallAccuracy: 68,
      status: "🟡 In Progress",
      color: "bg-blue-500"
    },
    {
      subject: "Chemistry", 
      priority: "Medium",
      concepts: { completed: 48, total: 55 },
      flashcards: { completed: 110, total: 130 },
      practiceTests: { completed: 18, total: 22 },
      quizScore: 78,
      recallAccuracy: 74,
      status: "🟡 In Progress",
      color: "bg-green-500"
    },
    {
      subject: "Biology",
      priority: "High", 
      concepts: { completed: 55, total: 55 },
      flashcards: { completed: 180, total: 180 },
      practiceTests: { completed: 25, total: 25 },
      quizScore: 92,
      recallAccuracy: 90,
      status: "✅ Completed",
      color: "bg-purple-500"
    }
  ];

  // Overall stats
  const overallStats = {
    conceptsCompleted: 45,
    conceptsTotal: 60,
    conceptsGain: 5,
    quizAverage: 82,
    quizGain: 3,
    flashcardRecall: 78,
    flashcardGain: 7,
    practiceTests: 12,
    practiceTestsGain: 2,
    dailyStudyGoal: 4.5,
    dailyStudyGain: 0.5
  };

  const handleMoodChange = (mood: MoodType) => {
    onMoodChange?.(mood);
    setShowMoodSelector(false);
  };

  const getMoodBasedRecommendations = () => {
    switch (currentMood) {
      case MoodType.STRESSED:
        return {
          tasks: 3,
          focus: "Easy revision topics",
          suggestion: "Take breaks between study sessions"
        };
      case MoodType.MOTIVATED:
        return {
          tasks: 6,
          focus: "Challenging new concepts", 
          suggestion: "Tackle difficult topics while motivated"
        };
      case MoodType.TIRED:
        return {
          tasks: 2,
          focus: "Light reading",
          suggestion: "Focus on theory, avoid problem-solving"
        };
      default:
        return {
          tasks: 4,
          focus: "Balanced mix",
          suggestion: "Continue with planned schedule"
        };
    }
  };

  const moodRec = getMoodBasedRecommendations();

  return (
    <div className="space-y-6 p-6">
      {/* Top Stats Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div>
            <p className="text-sm opacity-90">Exam</p>
            <p className="font-bold text-lg">{examDetails.exam}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Goal</p>
            <p className="font-semibold">{examDetails.goal}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Days to go</p>
            <p className="font-bold text-2xl">{examDetails.daysToGo}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Study Pace</p>
            <p className="font-semibold">{examDetails.studyPace}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Learner Style</p>
            <p className="font-semibold">{examDetails.learnerStyle}</p>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-90">Mood:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMoodSelector(true)}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              {currentMood || 'Focused'}
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard/student/academic')}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            Switch Exam / New Plan
          </Button>
        </div>
      </div>

      {/* User Profile & Subscription */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="h-8 w-8" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Welcome back, {userProfile.name || userProfile.firstName || 'Student'}!
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-purple-100 text-purple-800">
                    Free Plan
                  </Badge>
                  <span className="text-sm text-gray-600">Expires: Dec 31, 2024</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => window.open('https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/subscription', '_blank')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Crown className="h-4 w-4 mr-2" />
              Upgrade Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* NEET Strategy Card */}
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-orange-600" />
            {strategy.title}
          </CardTitle>
          <p className="text-lg font-semibold text-orange-800">{strategy.subtitle}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {strategy.points.map((point, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">{point}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject-Wise Detailed Breakdown */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Subject-Wise Detailed Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Subject</th>
                  <th className="text-left p-2">Priority</th>
                  <th className="text-left p-2">Concepts</th>
                  <th className="text-left p-2">Flashcards</th>
                  <th className="text-left p-2">Practice Tests</th>
                  <th className="text-left p-2">Quiz Score</th>
                  <th className="text-left p-2">Recall Accuracy</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {subjectBreakdown.map((subject, index) => (
                  <tr key={index} className="border-b hover:bg-white/50">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                        <span className="font-semibold">{subject.subject}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge variant={subject.priority === 'High' ? 'destructive' : 'secondary'}>
                        {subject.priority}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <span className="font-mono">
                        {subject.concepts.completed} / {subject.concepts.total}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className="font-mono">
                        {subject.flashcards.completed} / {subject.flashcards.total}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className="font-mono">
                        {subject.practiceTests.completed} / {subject.practiceTests.total}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className="font-semibold">{subject.quizScore}%</span>
                    </td>
                    <td className="p-2">
                      <span className="font-semibold">{subject.recallAccuracy}%</span>
                    </td>
                    <td className="p-2">{subject.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Overall Stats Summary */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {overallStats.conceptsCompleted}/{overallStats.conceptsTotal}
              </div>
              <div className="text-sm text-gray-600">Concepts Completed</div>
              <div className="text-xs text-green-600 font-semibold">+{overallStats.conceptsGain}</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{overallStats.quizAverage}%</div>
              <div className="text-sm text-gray-600">Quiz Average Score</div>
              <div className="text-xs text-green-600 font-semibold">+{overallStats.quizGain}</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{overallStats.flashcardRecall}%</div>
              <div className="text-sm text-gray-600">Flashcard Recall</div>
              <div className="text-xs text-green-600 font-semibold">+{overallStats.flashcardGain}</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{overallStats.practiceTests}</div>
              <div className="text-sm text-gray-600">Practice Tests</div>
              <div className="text-xs text-green-600 font-semibold">+{overallStats.practiceTestsGain}</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{overallStats.dailyStudyGoal} hrs</div>
              <div className="text-sm text-gray-600">Daily Study Goal</div>
              <div className="text-xs text-green-600 font-semibold">+{overallStats.dailyStudyGain}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exam Readiness Section */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-teal-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-600" />
            Exam Readiness
          </CardTitle>
          <p className="text-lg font-semibold text-green-800">Track your progress and readiness</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700">85%</div>
              <div className="text-sm text-gray-600">Syllabus Covered</div>
              <Progress value={85} className="mt-2 h-2" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-700">78%</div>
              <div className="text-sm text-gray-600">Concept Clarity</div>
              <Progress value={78} className="mt-2 h-2" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-700">92%</div>
              <div className="text-sm text-gray-600">Retention Score</div>
              <Progress value={92} className="mt-2 h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Coach Section */}
      <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6 text-yellow-600" />
            AI-Powered Personalized Coaching
          </CardTitle>
          <p className="text-lg font-semibold text-yellow-800">Get personalized guidance and support</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-gray-500" />
              <p className="font-medium">Personalized study plan based on your strengths and weaknesses</p>
            </div>
            <div className="flex items-center gap-3">
              <Lightbulb className="h-5 w-5 text-gray-500" />
              <p className="font-medium">Tips and tricks to improve your exam-taking strategy</p>
            </div>
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-gray-500" />
              <p className="font-medium">Motivational messages to keep you going</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Smart Suggestions Section */}
      <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-indigo-600" />
            Daily Smart Suggestions
          </CardTitle>
          <p className="text-lg font-semibold text-indigo-800">Maximize your study efficiency</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <p className="font-medium">Revise {moodRec.focus} ({moodRec.tasks} tasks)</p>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-gray-500" />
              <p className="font-medium">{moodRec.suggestion}</p>
            </div>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-gray-500" />
              <p className="font-medium">Avoid burnout by taking regular breaks</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exam Tips & Tricks Section */}
      <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-pink-600" />
            Exam Tips & Tricks
          </CardTitle>
          <p className="text-lg font-semibold text-pink-800">Boost your exam performance</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FlaskConical className="h-5 w-5 text-gray-500" />
              <p className="font-medium">Practice with mock tests to simulate exam conditions</p>
            </div>
            <div className="flex items-center gap-3">
              <Atom className="h-5 w-5 text-gray-500" />
              <p className="font-medium">Use the Pomodoro technique to stay focused</p>
            </div>
            <div className="flex items-center gap-3">
              <Dna className="h-5 w-5 text-gray-500" />
              <p className="font-medium">Review past papers to understand the exam pattern</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Study Environment Card */}
      <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="h-6 w-6 text-teal-600" />
            Optimize Study Environment
          </CardTitle>
          <p className="text-lg font-semibold text-teal-800">Create a conducive study space</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Sun className="h-5 w-5 text-gray-500" />
              <p className="font-medium">Ensure adequate lighting to reduce eye strain</p>
            </div>
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-gray-500" />
              <p className="font-medium">Minimize distractions by reducing noise levels</p>
            </div>
            <div className="flex items-center gap-3">
              <Coffee className="h-5 w-5 text-gray-500" />
              <p className="font-medium">Take regular breaks to avoid burnout</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mood Selector Dialog */}
      <Dialog open={showMoodSelector} onOpenChange={setShowMoodSelector}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>How are you feeling today?</DialogTitle>
          </DialogHeader>
          <MoodSelector
            currentMood={currentMood}
            onMoodSelect={handleMoodChange}
            className="p-4"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Brain, 
  FileText,
  Timer,
  PlayCircle,
  Trophy,
  Lightbulb,
  Zap,
  Eye,
  Volume2,
  RotateCcw,
  Calculator,
  Gauge
} from 'lucide-react';
import SurroundingInfluencesMeter from '../student/SurroundingInfluencesMeter';

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
  const [selectedMood, setSelectedMood] = useState<string>('stressed');

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const moodOptions = [
    { emoji: '😊', label: 'happy' },
    { emoji: '😐', label: 'neutral' },
    { emoji: '😰', label: 'stressed' },
    { emoji: '😴', label: 'tired' },
    { emoji: '🎯', label: 'focused' }
  ];

  const subjectData = [
    { subject: 'Physics', priority: 'High', concepts: '42 / 60', flashcards: '85 / 120', practiceTests: '15 / 20', quizScore: '72%', recallAccuracy: '68%', status: '🟡 In Progress', progress: 68 },
    { subject: 'Chemistry', priority: 'Medium', concepts: '48 / 55', flashcards: '110 / 130', practiceTests: '18 / 22', quizScore: '78%', recallAccuracy: '74%', status: '🟡 In Progress', progress: 78 },
    { subject: 'Biology', priority: 'High', concepts: '55 / 55', flashcards: '180 / 180', practiceTests: '25 / 25', quizScore: '92%', recallAccuracy: '90%', status: '✅ Completed', progress: 92 }
  ];

  const priorityConcepts = [
    { subject: 'Thermodynamics', category: 'Physics', accuracy: 42 },
    { subject: 'Organic Reactions', category: 'Chemistry', accuracy: 58 },
    { subject: 'Genetics & Evolution', category: 'Biology', accuracy: 65 }
  ];

  const weakAreas = [
    { name: 'Thermodynamics', accuracy: 42 },
    { name: 'Organic Chemistry', accuracy: 56 },
    { name: 'Calculus', accuracy: 61 }
  ];

  const strongAreas = [
    { name: 'Mechanics', accuracy: 89 },
    { name: 'Algebra', accuracy: 92 },
    { name: 'Inorganic Chemistry', accuracy: 85 }
  ];

  const learningTechniques = [
    { title: 'Interactive Visual Diagrams', description: 'Dynamic diagrams & pattern recognition', icon: Eye },
    { title: '3D Models & Simulations', description: 'Live interactive molecular models', icon: Brain },
    { title: 'Video Explanations', description: 'Step-by-step visual tutorials', icon: PlayCircle },
    { title: 'Audio Explanations', description: 'Detailed narrated content', icon: Volume2 },
    { title: 'Spaced Repetition', description: 'AI-powered adaptive review system', icon: RotateCcw },
    { title: 'Formula Mastery', description: 'Interactive numerical problem solving', icon: Calculator }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Header Section */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {currentTime}<br />
              {currentDate}
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard/student/subscription')}>
            Upgrade Plan
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-2">
            Good evening, {userProfile.name}! 🚀
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Ready to conquer your goals today?
          </p>
        </motion.div>

        {/* Goal and Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-4 text-center">
              <h3 className="font-bold">NEET 2026</h3>
              <p className="text-sm">Goal</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="font-bold text-2xl">185</h3>
              <p className="text-sm text-gray-600">days</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="font-bold">Moderate</h3>
              <p className="text-sm text-gray-600">Visual</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="font-bold">Style</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">😰</span>
                <div>
                  <h3 className="font-bold">{selectedMood}</h3>
                  <Button variant="link" size="sm" className="p-0 h-auto text-blue-600">
                    Change
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exam Readiness Score */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Exam Readiness Score - NEET 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold">72%</div>
                <div>Overall Readiness</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">68%</div>
                <div>Physics Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">78%</div>
                <div>Chemistry Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">92%</div>
                <div>Biology Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">45</div>
                <div>Days to Exam</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-xl font-bold">75%</div>
                <div>Concept Mastery</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">68%</div>
                <div>Recall Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">82%</div>
                <div>Predicted Exam Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate('/dashboard/student/today')} className="bg-blue-600 hover:bg-blue-700">
            Complete Today's Tasks
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard/student/today')}>
            View Upcoming Tasks
          </Button>
        </div>

        {/* Today's Top Priority */}
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="text-red-600">Today's Top Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-bold mb-2">Physics - Thermodynamics</h3>
            <p className="text-red-600 mb-4">Accuracy: 42% - Needs immediate attention for NEET</p>
            <div className="flex gap-4 flex-wrap">
              <Button variant="outline" onClick={() => navigate('/dashboard/student/concepts')}>
                📖 Interactive 3D Models
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard/student/concepts')}>
                🔁 Visual Diagrams
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
                📝 NEET Practice Questions
              </Button>
            </div>
            <Button className="mt-4 bg-purple-600 hover:bg-purple-700" onClick={() => navigate('/dashboard/student/focus')}>
              Enter Focus Mode
            </Button>
          </CardContent>
        </Card>

        {/* NEET Strategy */}
        <Card>
          <CardHeader>
            <CardTitle>NEET 2026 Strategy</CardTitle>
            <Badge>MODERATE</Badge>
          </CardHeader>
          <CardContent>
            <h3 className="font-bold mb-2">Foundation Building + Practice</h3>
            <div className="flex gap-4">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Complete syllabus</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Concept clarity</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Regular practice</span>
            </div>
          </CardContent>
        </Card>

        {/* Today's Study Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Today's NEET Study Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div>
                  <h3 className="font-bold">Physics</h3>
                  <p className="text-sm text-gray-600">Thermodynamics</p>
                </div>
                <div className="text-xl font-bold">2h 30m</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <h3 className="font-bold">Chemistry</h3>
                  <p className="text-sm text-gray-600">Organic Chemistry</p>
                </div>
                <div className="text-xl font-bold">2h 15m</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h3 className="font-bold">Biology</h3>
                  <p className="text-sm text-gray-600">Genetics</p>
                </div>
                <div className="text-xl font-bold">2h 45m</div>
              </div>
            </div>
            <Button variant="outline" className="mt-4" onClick={() => navigate('/dashboard/student/today')}>
              📅 View Full NEET Study Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Subject-Wise Detailed Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Subject-Wise Detailed Breakdown</CardTitle>
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
                  {subjectData.map((subject, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{subject.subject}</td>
                      <td className="p-2">
                        <Badge variant={subject.priority === 'High' ? 'destructive' : 'secondary'}>
                          {subject.priority}
                        </Badge>
                      </td>
                      <td className="p-2">{subject.concepts}</td>
                      <td className="p-2">{subject.flashcards}</td>
                      <td className="p-2">{subject.practiceTests}</td>
                      <td className="p-2">{subject.quizScore}</td>
                      <td className="p-2">{subject.recallAccuracy}</td>
                      <td className="p-2">{subject.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">45/60</div>
              <div className="text-sm text-gray-600">Concepts Completed</div>
              <div className="text-green-600 text-sm">+5</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">82%</div>
              <div className="text-sm text-gray-600">Quiz Average Score</div>
              <div className="text-green-600 text-sm">+3</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">78%</div>
              <div className="text-sm text-gray-600">Flashcard Recall</div>
              <div className="text-green-600 text-sm">+7</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-gray-600">Practice Tests</div>
              <div className="text-green-600 text-sm">+2</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">4.5 hrs</div>
              <div className="text-sm text-gray-600">Daily Study Goal</div>
              <div className="text-green-600 text-sm">+0.5%</div>
            </CardContent>
          </Card>
        </div>

        {/* Mood-Based Learning */}
        <Card>
          <CardHeader>
            <CardTitle>Mood-Based Learning</CardTitle>
            <p className="text-gray-600">How are you feeling today?</p>
            <p className="text-sm text-gray-500">Log your mood to get personalized study recommendations</p>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              {moodOptions.map((mood) => (
                <Button
                  key={mood.label}
                  variant={selectedMood === mood.label ? "default" : "outline"}
                  onClick={() => setSelectedMood(mood.label)}
                  className="text-2xl"
                >
                  {mood.emoji}
                </Button>
              ))}
            </div>
            <Button onClick={() => onMoodChange?.(selectedMood as MoodType)}>
              😐 Log Mood
            </Button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-2xl font-bold">87%</div>
                <div className="text-gray-600">Study Performance</div>
                <div className="text-sm text-gray-500">Last 7 days</div>
              </div>
              <div>
                <div className="text-2xl font-bold">5.2 hrs</div>
                <div className="text-gray-600">Focus Time</div>
                <div className="text-sm text-gray-500">This week</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Priority Concepts for Improvement */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Concepts for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {priorityConcepts.map((concept, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-bold">{concept.subject}</h3>
                  <p className="text-gray-600">{concept.category}</p>
                  <div className="text-2xl font-bold text-red-600">{concept.accuracy}%</div>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => navigate('/dashboard/student/concepts')}
                  >
                    Study Concept
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Concept Mastery Techniques */}
        <Card>
          <CardHeader>
            <CardTitle>Advanced Concept Mastery Techniques</CardTitle>
            <p className="text-gray-600">for NEET 2026 - Visual Learning</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {learningTechniques.map((technique, index) => (
                <div key={index} className="p-4 border rounded-lg text-center">
                  <technique.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-bold mb-2">{technique.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{technique.description}</p>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/dashboard/student/concepts')}
                  >
                    Start Session
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weak Areas - Improve Now</CardTitle>
            </CardHeader>
            <CardContent>
              {weakAreas.map((area, index) => (
                <div key={index} className="flex justify-between items-center p-3 border-b last:border-b-0">
                  <div>
                    <h3 className="font-medium">{area.name}</h3>
                    <div className="text-red-600 font-bold">{area.accuracy}%</div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => navigate('/dashboard/student/concepts')}
                  >
                    Improve Now
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Strong Areas - Advance Practice</CardTitle>
            </CardHeader>
            <CardContent>
              {strongAreas.map((area, index) => (
                <div key={index} className="flex justify-between items-center p-3 border-b last:border-b-0">
                  <div>
                    <h3 className="font-medium">{area.name}</h3>
                    <div className="text-green-600 font-bold">{area.accuracy}%</div>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/dashboard/student/practice-exam')}
                  >
                    Advance
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Progress & Motivation */}
        <Card>
          <CardHeader>
            <CardTitle>Progress & Motivation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">15</div>
                <div className="text-gray-600">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">127h</div>
                <div className="text-gray-600">Study Hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">23</div>
                <div className="text-gray-600">Tests Done</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">68%</div>
                <div className="text-gray-600">Exam Ready</div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-bold mb-4">Recent Achievements</h3>
              <div className="flex gap-4">
                <Badge className="bg-yellow-100 text-yellow-800">🏆 Week Warrior</Badge>
                <Badge className="bg-blue-100 text-blue-800">📚 Study Streak</Badge>
                <Badge className="bg-green-100 text-green-800">🎯 Accuracy Boost</Badge>
                <Badge className="bg-purple-100 text-purple-800">⚡ Speed Master</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Tip and AI Coach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🍅 Daily Tip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-bold mb-2">Focus</h3>
              <p className="text-gray-600">Try the Pomodoro Technique: 25 minutes focused study, 5-minute break</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Coach Suggestion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Your focus drops after 20 mins – take a micro-break now</p>
              <Button onClick={() => navigate('/dashboard/student/focus')}>
                Start Break Timer
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Surrounding Influences Meter */}
        <SurroundingInfluencesMeter />
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;

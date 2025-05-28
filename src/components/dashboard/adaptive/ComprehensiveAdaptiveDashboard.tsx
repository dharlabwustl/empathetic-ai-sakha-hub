
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, Target, TrendingUp, Award, BookOpen, Brain, 
  Zap, Users, Heart, MessageCircle, ChevronRight, Play, 
  Bell, Star, CheckCircle, AlertCircle, User, Crown, ExternalLink,
  Settings, Bot, Volume2, VolumeX, Mic, MicOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { MoodSelector } from '../student/MoodSelector';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface ComprehensiveAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ComprehensiveAdaptiveDashboard: React.FC<ComprehensiveAdaptiveDashboardProps> = ({
  userProfile,
  kpis,
  currentMood = MoodType.NEUTRAL,
  onMoodChange
}) => {
  const navigate = useNavigate();
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType>(currentMood);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  // Mock exam data - this would adapt based on user's exam selection
  const examData = {
    name: "NEET 2026",
    daysLeft: 185,
    studyPace: "Moderate",
    learnerStyle: "Visual",
    mood: selectedMood
  };

  // Mock subscription data
  const subscriptionData = {
    plan: "Premium",
    expiryDate: "2025-12-31",
    isActive: true
  };

  const handleMoodChange = (mood: MoodType) => {
    setSelectedMood(mood);
    onMoodChange?.(mood);
    setShowMoodSelector(false);
    
    // Apply mood-based theme changes
    const body = document.body;
    body.className = body.className.replace(/mood-\w+/g, '');
    body.classList.add(`mood-${mood.toLowerCase()}`);
  };

  const handleAiChat = (message: string) => {
    if (audioEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const dailySmartSuggestions = {
    morning: {
      title: "Morning Focus",
      suggestions: [
        "Review yesterday's physics concepts for 15 minutes",
        "Complete 5 organic chemistry questions",
        "Practice meditation for better concentration"
      ]
    },
    afternoon: {
      title: "Peak Performance",
      suggestions: [
        "Tackle challenging calculus problems",
        "Group study session with peers",
        "Take practice test for weak subjects"
      ]
    },
    evening: {
      title: "Active Recall",
      suggestions: [
        "Create mind maps for biology topics",
        "Review flashcards for chemistry formulas",
        "Solve previous year NEET questions"
      ]
    },
    night: {
      title: "Consolidation",
      suggestions: [
        "Light revision of today's topics",
        "Plan tomorrow's study schedule",
        "Relaxation techniques for better sleep"
      ]
    }
  };

  const weakAreas = [
    { subject: "Organic Chemistry", concept: "Alcohols and Ethers", improvement: 15 },
    { subject: "Physics", concept: "Thermodynamics", improvement: 12 },
    { subject: "Biology", concept: "Genetics", improvement: 18 }
  ];

  const strongAreas = [
    { subject: "Inorganic Chemistry", concept: "Periodic Table", mastery: 92 },
    { subject: "Physics", concept: "Mechanics", mastery: 88 },
    { subject: "Biology", concept: "Cell Biology", mastery: 95 }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6 mood-${selectedMood.toLowerCase()}`}>
      {/* Top Stats Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-blue-200 p-4 mb-6 shadow-lg"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Exam: {examData.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <span>Days Left: <strong>{examData.daysLeft}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span>Pace: {examData.studyPace}</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>Style: {examData.learnerStyle}</span>
            </div>
            <button 
              onClick={() => setShowMoodSelector(true)}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors"
            >
              <Heart className="h-4 w-4 text-red-500" />
              <span>Mood: {selectedMood}</span>
            </button>
          </div>
          <Button 
            onClick={() => navigate('/dashboard/student/academic')}
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Switch Exam / New Plan
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* User Profile & Subscription Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="premium-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      {userProfile.avatar ? (
                        <img 
                          src={userProfile.avatar} 
                          alt={userProfile.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-8 w-8 text-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{userProfile.name}</h2>
                      <p className="text-gray-600">NEET 2026 Aspirant</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      <span className="font-semibold">{subscriptionData.plan} Plan</span>
                    </div>
                    <p className="text-sm text-gray-600">Expires: {subscriptionData.expiryDate}</p>
                    <Button 
                      onClick={() => navigate('/subscription')}
                      size="sm" 
                      className="mt-2"
                    >
                      Upgrade Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Exam Readiness Score */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-blue-600" />
                  Exam Readiness Score - NEET 2026
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">78%</div>
                    <div className="text-sm text-gray-600">Overall Readiness</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">720</div>
                    <div className="text-sm text-gray-600">Predicted Score</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">85%</div>
                    <div className="text-sm text-gray-600">Recall Mastery</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">682</div>
                    <div className="text-sm text-gray-600">Avg Exam Score</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Physics</span>
                    <div className="flex items-center gap-2">
                      <Progress value={72} className="w-24" />
                      <span className="text-sm">72%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Chemistry</span>
                    <div className="flex items-center gap-2">
                      <Progress value={84} className="w-24" />
                      <span className="text-sm">84%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Biology</span>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="w-24" />
                      <span className="text-sm">78%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Today's Top Priority */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  Today's Top Priority
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                    <div>
                      <div className="font-semibold">Organic Chemistry - Alcohols & Ethers</div>
                      <div className="text-sm text-gray-600">Complete concept understanding and practice</div>
                    </div>
                    <Button 
                      onClick={() => navigate('/dashboard/student/concepts/alcohols-ethers')}
                      size="sm"
                    >
                      Start Now
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <div>
                      <div className="font-semibold">Physics - Thermodynamics Laws</div>
                      <div className="text-sm text-gray-600">Review and solve practice problems</div>
                    </div>
                    <Button 
                      onClick={() => navigate('/dashboard/student/concepts/thermodynamics')}
                      variant="outline" 
                      size="sm"
                    >
                      Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Today's NEET Study Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  Today's NEET Study Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Morning Session (9:00 AM - 12:00 PM)</div>
                      <div className="text-sm text-gray-600">Physics - Mechanics & Thermodynamics</div>
                    </div>
                    <Badge variant="secondary">3 hours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Afternoon Session (2:00 PM - 5:00 PM)</div>
                      <div className="text-sm text-gray-600">Chemistry - Organic Chemistry</div>
                    </div>
                    <Badge variant="secondary">3 hours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Evening Session (7:00 PM - 9:00 PM)</div>
                      <div className="text-sm text-gray-600">Biology - Genetics & Evolution</div>
                    </div>
                    <Badge variant="secondary">2 hours</Badge>
                  </div>
                  <Button 
                    onClick={() => navigate('/dashboard/student/today')}
                    className="w-full mt-4"
                  >
                    View Full Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Daily Smart Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  Daily Smart Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="morning" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="morning">Morning</TabsTrigger>
                    <TabsTrigger value="afternoon">Afternoon</TabsTrigger>
                    <TabsTrigger value="evening">Evening</TabsTrigger>
                    <TabsTrigger value="night">Night</TabsTrigger>
                  </TabsList>
                  {Object.entries(dailySmartSuggestions).map(([time, data]) => (
                    <TabsContent key={time} value={time} className="space-y-3">
                      <h4 className="font-semibold text-lg">{data.title}</h4>
                      {data.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm">{suggestion}</span>
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                        </div>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Advanced Concept Mastery Techniques */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-purple-600" />
                  Advanced Concept Mastery Techniques for NEET 2026
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Visual Learning</h4>
                    <p className="text-sm text-gray-600 mb-3">Organic Chemistry - Alcohols</p>
                    <Button 
                      onClick={() => navigate('/dashboard/student/concepts/alcohols-ethers')}
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                    >
                      Explore Concept
                    </Button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Interactive Flashcards</h4>
                    <p className="text-sm text-gray-600 mb-3">Physics - Thermodynamics</p>
                    <Button 
                      onClick={() => navigate('/dashboard/student/flashcards')}
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                    >
                      Start Flashcards
                    </Button>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Formula Practice</h4>
                    <p className="text-sm text-gray-600 mb-3">Biology - Genetics</p>
                    <Button 
                      onClick={() => navigate('/dashboard/student/concepts/genetics?tab=formula')}
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                    >
                      Practice Formulas
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weak Areas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                  Weak Areas - Focus & Improve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weakAreas.map((area, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <div className="font-semibold">{area.subject} - {area.concept}</div>
                        <div className="text-sm text-gray-600">+{area.improvement}% improvement needed</div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => navigate(`/dashboard/student/concepts/${area.concept.toLowerCase().replace(/\s+/g, '-')}`)}
                          size="sm" 
                          variant="outline"
                        >
                          Study Concept
                        </Button>
                        <Button 
                          onClick={() => navigate('/dashboard/student/flashcards')}
                          size="sm"
                        >
                          Practice Recall
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Strong Areas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  Strong Areas - Maintain Excellence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {strongAreas.map((area, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-semibold">{area.subject} - {area.concept}</div>
                        <div className="text-sm text-gray-600">{area.mastery}% mastery achieved</div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => navigate(`/dashboard/student/concepts/${area.concept.toLowerCase().replace(/\s+/g, '-')}`)}
                          size="sm" 
                          variant="outline"
                        >
                          Review
                        </Button>
                        <Button 
                          onClick={() => navigate('/dashboard/student/practice-exam')}
                          size="sm"
                        >
                          Take Test
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - AI Assistant & Tools */}
        <div className="lg:col-span-1 space-y-6">
          {/* AI Coach Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  AI Coach
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm">Focus on Organic Chemistry today. Your performance has improved 15% this week!</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm">Schedule a biology revision session. Genetics needs attention.</p>
                </div>
                <Button 
                  onClick={() => setAiChatOpen(true)}
                  className="w-full"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with AI Coach
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* NEET Specific AI Tutor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  NEET AI Tutor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Audio Mode</span>
                  <Button
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    variant="outline"
                    size="sm"
                  >
                    {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleAiChat("Let's focus on your weak areas in Organic Chemistry today")}
                    variant="outline" 
                    size="sm" 
                    className="w-full text-left justify-start"
                  >
                    Organic Chemistry Help
                  </Button>
                  <Button 
                    onClick={() => handleAiChat("I'll help you with Physics problem-solving techniques")}
                    variant="outline" 
                    size="sm" 
                    className="w-full text-left justify-start"
                  >
                    Physics Problem Solving
                  </Button>
                  <Button 
                    onClick={() => handleAiChat("Let's review Biology concepts for better retention")}
                    variant="outline" 
                    size="sm" 
                    className="w-full text-left justify-start"
                  >
                    Biology Concept Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Mood-Based Learning */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Mood-Based Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl mb-2">😤</div>
                  <div className="font-semibold">Current: {selectedMood}</div>
                  <div className="text-sm text-gray-600">Optimized for focus</div>
                </div>
                <Button 
                  onClick={() => setShowMoodSelector(true)}
                  variant="outline" 
                  className="w-full"
                >
                  Change Mood
                </Button>
                <div className="text-sm text-gray-600">
                  <div>📚 Tasks: 8 (adjusted for mood)</div>
                  <div>⏱️ Sessions: 4 focused blocks</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Mood Selection Dialog */}
      <Dialog open={showMoodSelector} onOpenChange={setShowMoodSelector}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>How are you feeling today?</DialogTitle>
          </DialogHeader>
          <MoodSelector
            currentMood={selectedMood}
            onMoodSelect={handleMoodChange}
            className="grid grid-cols-2 gap-3"
          />
        </DialogContent>
      </Dialog>

      {/* AI Chat Dialog */}
      <Dialog open={aiChatOpen} onOpenChange={setAiChatOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              NEET AI Tutor Chat
              <Button
                onClick={() => setAudioEnabled(!audioEnabled)}
                variant="outline"
                size="sm"
                className="ml-auto"
              >
                {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="h-64 bg-gray-50 rounded-lg p-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <p className="text-sm">Hi! I'm your NEET AI Tutor. I can help you with Physics, Chemistry, and Biology concepts. What would you like to study today?</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask me about any NEET topic..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1"
                rows={2}
              />
              <div className="flex flex-col gap-2">
                <Button size="sm">
                  Send
                </Button>
                <Button variant="outline" size="sm">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        .premium-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%);
          border: 2px solid transparent;
          background-clip: padding-box;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          position: relative;
        }
        
        .premium-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          z-index: -1;
        }

        .mood-stressed {
          --primary: 239 68 68;
          --primary-foreground: 255 255 255;
        }

        .mood-motivated {
          --primary: 34 197 94;
          --primary-foreground: 255 255 255;
        }

        .mood-focused {
          --primary: 59 130 246;
          --primary-foreground: 255 255 255;
        }
      `}</style>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;

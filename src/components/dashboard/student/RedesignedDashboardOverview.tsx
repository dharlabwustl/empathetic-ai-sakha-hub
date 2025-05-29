import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Zap } from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import EnhancedNameHeaderCard from './EnhancedNameHeaderCard';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import NEETStrategyCard from './NEETStrategyCard';
import AICoachCard from './AICoachCard';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from './mood-tracking/moodUtils';
import EnhancedExamReadinessScore from './dashboard-sections/EnhancedExamReadinessScore';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, []);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Name Header Card */}
      <EnhancedNameHeaderCard userProfile={userProfile} />
      
      {/* Exam Goal Card */}
      <ExamGoalCard 
        userProfile={userProfile}
        currentMood={currentMood}
        onMoodChange={handleMoodChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enhanced Exam Readiness Score */}
          <EnhancedExamReadinessScore />
          
          {/* Today's Top Priority Section */}
          <TodaysTopPrioritySection />
          
          {/* Today's Plan Section */}
          <TodaysPlanSection currentMood={currentMood} />
          
          {/* Daily Smart Suggestions */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <motion.span
                  animate={{ 
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity
                  }}
                >
                  ✨
                </motion.span>
                Daily Smart Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">Focus Area Today</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Chemistry - Chemical Bonding (Low accuracy: 45%)</p>
                  <div className="flex gap-2 mt-2">
                    <Link to="/dashboard/student/concepts">
                      <Button size="sm" variant="outline">Study Concept</Button>
                    </Link>
                    <Link to="/dashboard/student/flashcards/1/interactive">
                      <Button size="sm" variant="outline">Recall Practice</Button>
                    </Link>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">Quick Review</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Physics - Newton's Laws (High accuracy: 89%)</p>
                  <div className="flex gap-2 mt-2">
                    <Link to="/dashboard/student/flashcards/1/interactive">
                      <Button size="sm" variant="outline">Quick Recall</Button>
                    </Link>
                    <Link to="/dashboard/student/concepts/Newton's%20Second%20Law/formula-lab">
                      <Button size="sm" variant="outline">Formula Practice</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Concept Mastery Techniques */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
              <CardTitle className="text-lg">Advanced Concept Mastery Techniques for NEET 2026</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Active Learning Methods</h4>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Feynman Technique for complex topics</li>
                    <li>• Mind mapping for interconnected concepts</li>
                    <li>• Spaced repetition for long-term retention</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Practice Strategies</h4>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Progressive difficulty scaling</li>
                    <li>• Error analysis and correction</li>
                    <li>• Timed practice sessions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weak Areas Focus & Improve */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
              <CardTitle className="text-lg">Weak Areas - Focus & Improve</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {[
                  { subject: "Chemistry", topic: "Chemical Bonding", accuracy: 45, urgency: "Critical" },
                  { subject: "Physics", topic: "Thermodynamics", accuracy: 52, urgency: "High" },
                  { subject: "Biology", topic: "Ecology", accuracy: 58, urgency: "Medium" }
                ].map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">{area.subject}: {area.topic}</p>
                      <p className="text-sm text-red-600">Accuracy: {area.accuracy}%</p>
                    </div>
                    <div className="flex gap-2">
                      <Link to="/dashboard/student/concepts">
                        <Button size="sm" variant="outline">Study</Button>
                      </Link>
                      <Link to="/dashboard/student/flashcards/1/interactive">
                        <Button size="sm" variant="outline">Practice</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Strong Areas - Maintain Excellence */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardTitle className="text-lg">Strong Areas - Maintain Excellence</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {[
                  { subject: "Physics", topic: "Mechanics", accuracy: 89, level: "Expert" },
                  { subject: "Chemistry", topic: "Organic Chemistry", accuracy: 85, level: "Advanced" },
                  { subject: "Biology", topic: "Cell Biology", accuracy: 92, level: "Expert" }
                ].map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">{area.subject}: {area.topic}</p>
                      <p className="text-sm text-green-600">Accuracy: {area.accuracy}% • {area.level}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link to="/dashboard/student/flashcards/1/interactive">
                        <Button size="sm" variant="outline">Quick Review</Button>
                      </Link>
                      <Link to="/dashboard/student/practice-exam/2/start">
                        <Button size="sm" variant="outline">Test Skills</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subject-Wise Detailed Breakdown */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <CardTitle className="text-lg">Subject-Wise Detailed Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { subject: "Physics", score: 78, topics: 45, mastered: 35, color: "blue" },
                  { subject: "Chemistry", score: 72, topics: 38, mastered: 27, color: "green" },
                  { subject: "Biology", score: 85, topics: 42, mastered: 36, color: "purple" }
                ].map((subject, index) => (
                  <div key={index} className={`p-4 rounded-lg bg-${subject.color}-50 dark:bg-${subject.color}-900/20 border border-${subject.color}-200`}>
                    <h4 className="font-semibold mb-2">{subject.subject}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Score</span>
                        <span className="font-semibold">{subject.score}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Topics Mastered</span>
                        <span>{subject.mastered}/{subject.topics}</span>
                      </div>
                      <Progress value={(subject.mastered / subject.topics) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 5 KPI Tabs */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <CardTitle className="text-lg">Performance KPIs</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { label: "Mastery", value: "78%", color: "blue", icon: "🎯" },
                  { label: "Progress", value: "85%", color: "green", icon: "📈" },
                  { label: "Accuracy", value: "72%", color: "purple", icon: "🎪" },
                  { label: "Speed", value: "68%", color: "orange", icon: "⚡" },
                  { label: "Retention", value: "88%", color: "indigo", icon: "🧠" }
                ].map((kpi, index) => (
                  <div key={index} className={`text-center p-3 rounded-lg bg-${kpi.color}-50 dark:bg-${kpi.color}-900/20`}>
                    <div className="text-2xl mb-1">{kpi.icon}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{kpi.label}</p>
                    <p className="text-lg font-bold">{kpi.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <NEETStrategyCard />
          <AICoachCard />
          <MoodBasedSuggestions 
            currentMood={currentMood} 
            onMoodSelect={handleMoodChange} 
          />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;

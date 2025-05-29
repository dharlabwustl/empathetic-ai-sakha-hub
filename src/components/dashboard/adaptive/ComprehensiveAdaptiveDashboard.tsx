
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  Target, 
  TrendingUp, 
  Calendar, 
  Clock,
  Award,
  BarChart3,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Star
} from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';

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
  const [activeTab, setActiveTab] = useState("mastery");

  // Fix KPI data access using proper properties
  const conceptsCompleted = kpis.find(kpi => kpi.id === 'concepts-completed')?.value || 0;
  const flashcardsReviewed = kpis.find(kpi => kpi.id === 'flashcards-reviewed')?.value || 0;
  const practiceTestsCompleted = kpis.find(kpi => kpi.id === 'practice-tests-completed')?.value || 0;
  const studyStreak = kpis.find(kpi => kpi.id === 'study-streak')?.value || 0;

  // Mock data for the various sections
  const conceptMasteryData = [
    { subject: "Physics", mastered: 45, total: 60, difficulty: "Advanced" },
    { subject: "Chemistry", mastered: 38, total: 55, difficulty: "Intermediate" },
    { subject: "Biology", mastered: 52, total: 65, difficulty: "Basic" }
  ];

  const weakAreas = [
    { topic: "Organic Chemistry Reactions", score: 45, priority: "High" },
    { topic: "Wave Optics", score: 52, priority: "Medium" },
    { topic: "Genetics", score: 58, priority: "Low" }
  ];

  const strongAreas = [
    { topic: "Cell Biology", score: 92, consistency: "Excellent" },
    { topic: "Mechanics", score: 88, consistency: "Good" },
    { topic: "Inorganic Chemistry", score: 85, consistency: "Good" }
  ];

  const subjectBreakdown = [
    {
      subject: "Physics",
      progress: 75,
      chapters: 25,
      completed: 18,
      concepts: 320,
      mastered: 240,
      difficulty: "High",
      timeSpent: "45h",
      accuracy: 78
    },
    {
      subject: "Chemistry", 
      progress: 68,
      chapters: 22,
      completed: 15,
      concepts: 285,
      mastered: 194,
      difficulty: "Medium",
      timeSpent: "38h", 
      accuracy: 72
    },
    {
      subject: "Biology",
      progress: 82,
      chapters: 28,
      completed: 23,
      concepts: 410,
      mastered: 336,
      difficulty: "Low",
      timeSpent: "52h",
      accuracy: 84
    }
  ];

  return (
    <div className="space-y-6">
      {/* Advanced Concept Mastery Techniques Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Advanced Concept Mastery Techniques for NEET 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {conceptMasteryData.map((data, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{data.subject}</h4>
                  <Badge variant={data.difficulty === "Advanced" ? "destructive" : data.difficulty === "Intermediate" ? "default" : "secondary"}>
                    {data.difficulty}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Progress value={(data.mastered / data.total) * 100} className="h-2" />
                  <div className="text-sm text-gray-600">
                    {data.mastered}/{data.total} concepts mastered
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weak Areas - Focus & Improve Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Weak Areas - Focus & Improve
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weakAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{area.topic}</span>
                    <Badge variant={area.priority === "High" ? "destructive" : area.priority === "Medium" ? "default" : "secondary"}>
                      {area.priority} Priority
                    </Badge>
                  </div>
                  <Progress value={area.score} className="h-2" />
                  <div className="text-sm text-gray-600 mt-1">Current Score: {area.score}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strong Areas - Maintain Excellence Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-green-600" />
            Strong Areas - Maintain Excellence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {strongAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{area.topic}</span>
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      {area.consistency}
                    </Badge>
                  </div>
                  <Progress value={area.score} className="h-2" indicatorClassName="bg-green-500" />
                  <div className="text-sm text-gray-600 mt-1">Mastery Score: {area.score}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject-Wise Detailed Breakdown Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Subject-Wise Detailed Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {subjectBreakdown.map((subject, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold">{subject.subject}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{subject.progress}% Complete</Badge>
                    <Badge variant={subject.difficulty === "High" ? "destructive" : subject.difficulty === "Medium" ? "default" : "secondary"}>
                      {subject.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{subject.completed}/{subject.chapters}</div>
                    <div className="text-xs text-gray-500">Chapters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{subject.mastered}/{subject.concepts}</div>
                    <div className="text-xs text-gray-500">Concepts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{subject.timeSpent}</div>
                    <div className="text-xs text-gray-500">Time Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{subject.accuracy}%</div>
                    <div className="text-xs text-gray-500">Accuracy</div>
                  </div>
                </div>
                
                <Progress value={subject.progress} className="h-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 5 KPI Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="mastery">Mastery</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
              <TabsTrigger value="speed">Speed</TabsTrigger>
              <TabsTrigger value="retention">Retention</TabsTrigger>
            </TabsList>
            
            <TabsContent value="mastery" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{conceptsCompleted}</div>
                  <div className="text-sm text-gray-600">Concepts Mastered</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">78%</div>
                  <div className="text-sm text-gray-600">Mastery Rate</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">245</div>
                  <div className="text-sm text-gray-600">Topics Covered</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">92%</div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{studyStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">135h</div>
                  <div className="text-sm text-gray-600">Total Study Time</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">75%</div>
                  <div className="text-sm text-gray-600">Weekly Goal</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">185</div>
                  <div className="text-sm text-gray-600">Days Left</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="accuracy" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">84%</div>
                  <div className="text-sm text-gray-600">Overall Accuracy</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">78%</div>
                  <div className="text-sm text-gray-600">Physics</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">72%</div>
                  <div className="text-sm text-gray-600">Chemistry</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">84%</div>
                  <div className="text-sm text-gray-600">Biology</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="speed" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">2.3m</div>
                  <div className="text-sm text-gray-600">Avg. per Question</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-gray-600">Time Efficiency</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{practiceTestsCompleted}</div>
                  <div className="text-sm text-gray-600">Tests Completed</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">68</div>
                  <div className="text-sm text-gray-600">Questions/Hour</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="retention" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">89%</div>
                  <div className="text-sm text-gray-600">Retention Rate</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{flashcardsReviewed}</div>
                  <div className="text-sm text-gray-600">Cards Reviewed</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">7.2</div>
                  <div className="text-sm text-gray-600">Avg. Recall Score</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">14</div>
                  <div className="text-sm text-gray-600">Days Retention</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;

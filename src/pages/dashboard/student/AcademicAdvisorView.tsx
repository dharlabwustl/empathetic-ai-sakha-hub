
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  Target, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Award,
  Clock,
  Brain,
  Star,
  CheckCircle
} from 'lucide-react';
import AcademicAdvisorVoiceAssistant from '@/components/voice/AcademicAdvisorVoiceAssistant';

const AcademicAdvisorView = () => {
  const currentGoal = "NEET 2024";
  const academicLevel = "Class 12";
  const userName = "Student";

  const studyPlanData = {
    currentStreak: 12,
    weeklyTarget: 35,
    weeklyProgress: 28,
    subjects: [
      { name: 'Physics', progress: 78, target: 85, color: 'blue' },
      { name: 'Chemistry', progress: 65, target: 80, color: 'green' },
      { name: 'Biology', progress: 82, target: 90, color: 'purple' }
    ],
    upcomingMilestones: [
      { title: 'Mock Test 3', date: '2024-01-15', type: 'exam' },
      { title: 'Physics Revision', date: '2024-01-18', type: 'revision' },
      { title: 'Biology Assessment', date: '2024-01-22', type: 'test' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Academic Advisor</h1>
          <p className="text-gray-600 dark:text-gray-400">Your personalized academic guidance and planning</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <GraduationCap className="h-4 w-4 mr-2" />
          {currentGoal}
        </Badge>
      </div>

      {/* Voice Assistant */}
      <div className="flex justify-end">
        <AcademicAdvisorVoiceAssistant 
          currentGoal={currentGoal}
          academicLevel={academicLevel}
          userName={userName}
          isEnabled={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study Progress Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Weekly Study Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">This Week</span>
                  <span className="text-sm text-gray-600">{studyPlanData.weeklyProgress}/{studyPlanData.weeklyTarget} hours</span>
                </div>
                <Progress value={(studyPlanData.weeklyProgress / studyPlanData.weeklyTarget) * 100} className="h-3" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>80% Complete</span>
                  <span>7 hours remaining</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subject-wise Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                Subject Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studyPlanData.subjects.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{subject.progress}%</span>
                        <Badge variant="outline" size="sm">Target: {subject.target}%</Badge>
                      </div>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Study Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Smart Study Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">Focus Area: Chemistry</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Your chemistry performance is below target. Recommend increasing daily practice by 30 minutes.
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900 dark:text-green-100">Strength: Biology</h4>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Excellent progress! Continue with current pace and add advanced practice questions.
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">Revision Needed: Physics</h4>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Schedule revision sessions for Newton's Laws and Thermodynamics this week.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Study Streak */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">{studyPlanData.currentStreak}</div>
                <p className="text-sm text-gray-600">Days in a row</p>
                <div className="mt-4 flex justify-center">
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    🔥 On Fire!
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Upcoming Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studyPlanData.upcomingMilestones.map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div>
                      <p className="font-medium text-sm">{milestone.title}</p>
                      <p className="text-xs text-gray-600">{milestone.date}</p>
                    </div>
                    <Badge variant="outline" size="sm" className="capitalize">
                      {milestone.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-600" />
                Recent Achievement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-semibold">Week Warrior</h4>
                <p className="text-sm text-gray-600">Completed 7 days of study goals</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                View Study Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Progress Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Time Tracking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AcademicAdvisorView;

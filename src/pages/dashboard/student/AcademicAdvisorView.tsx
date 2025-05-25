
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Target, TrendingUp, Calendar, BookOpen, Users } from 'lucide-react';
import { useUnifiedVoice } from '@/components/dashboard/student/voice/UnifiedVoiceManager';

const AcademicAdvisorView: React.FC = () => {
  const { speakMessage } = useUnifiedVoice();

  useEffect(() => {
    const timer = setTimeout(() => {
      const message = `Welcome to your Academic Advisor! I'm here to help you create strategic study plans, analyze your performance patterns, and provide personalized guidance for your exam preparation. You can ask me about optimal study schedules, subject prioritization, or exam strategies. What would you like to work on today?`;
      speakMessage(message, 'medium');
    }, 1000);

    return () => clearTimeout(timer);
  }, [speakMessage]);

  return (
    <div className="space-y-6 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Academic Advisor
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get personalized guidance and strategic advice for your exam preparation
        </p>
      </div>

      {/* Advisory Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg">Study Plan Creation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Create personalized study schedules based on your goals, timeline, and learning style.
            </p>
            <Button className="w-full">Create New Plan</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <CardTitle className="text-lg">Performance Analysis</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Analyze your strengths and weaknesses to optimize your preparation strategy.
            </p>
            <Button className="w-full">View Analysis</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <CardTitle className="text-lg">Exam Strategy</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get strategic advice for different exam phases and time management.
            </p>
            <Button className="w-full">Get Strategy</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-lg">Subject Prioritization</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Identify which subjects to focus on for maximum score improvement.
            </p>
            <Button className="w-full">Prioritize Subjects</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-red-500" />
              <CardTitle className="text-lg">Goal Setting</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Set realistic and achievable academic goals with milestone tracking.
            </p>
            <Button className="w-full">Set Goals</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-teal-500" />
              <CardTitle className="text-lg">Peer Comparison</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Compare your progress with peers and understand where you stand.
            </p>
            <Button className="w-full">View Comparison</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium mb-2">Focus on Physics Mechanics</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Based on your recent test performance, spending more time on mechanics concepts will significantly improve your overall Physics score.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-medium mb-2">Increase Chemistry Practice</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your organic chemistry understanding is strong. Now focus on inorganic reactions to balance your preparation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicAdvisorView;


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import { getMoodThemeClass, getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from './mood-tracking/moodUtils';
import { Clock, BookOpen, Target, TrendingUp, CheckCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

interface Task {
  id: string;
  title: string;
  subject: string;
  type: string;
  timeEstimate: number;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis,
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(getCurrentMoodFromLocalStorage());

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

  const moodThemeClass = getMoodThemeClass(currentMood);

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Physics Practice Test',
      subject: 'Physics',
      type: 'practice',
      timeEstimate: 60,
      deadline: 'Today',
      priority: 'high',
      dueDate: new Date()
    },
    {
      id: '2',
      title: 'Chemistry Revision',
      subject: 'Chemistry', 
      type: 'revision',
      timeEstimate: 45,
      deadline: 'Tomorrow',
      priority: 'medium',
      dueDate: new Date(Date.now() + 86400000)
    },
    {
      id: '3',
      title: 'Biology Notes Review',
      subject: 'Biology',
      type: 'revision', 
      timeEstimate: 30,
      deadline: 'This Week',
      priority: 'low',
      dueDate: new Date(Date.now() + 7 * 86400000)
    }
  ];

  return (
    <div className={`space-y-6 ${moodThemeClass}`}>
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <Card className="h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200/50 dark:border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-2xl">
                Welcome back, {userProfile.name || userProfile.firstName || 'Student'}! 👋
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Ready to conquer your studies today? Let's make it count!
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.slice(0, 4).map((kpi) => (
                  <div key={kpi.id} className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {kpi.value}{kpi.unit}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {kpi.title}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exam Goal Card with Progress Meter */}
        <div className="lg:w-96">
          <ExamGoalCard 
            currentMood={currentMood}
            onMoodChange={handleMoodChange}
          />
        </div>
      </div>

      {/* Today's Plan & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Study Plan */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Study Plan
            </CardTitle>
            <Link to="/dashboard/student/academic">
              <Button variant="outline" size="sm">View All Plans</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {task.subject} • {task.timeEstimate} min
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                      {task.priority}
                    </Badge>
                    <span className="text-sm text-gray-500">{task.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/dashboard/student/practice-exam/2/start">
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Take Mock Test
              </Button>
            </Link>
            <Link to="/dashboard/student/flashcards/1/interactive">
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Quick Revision
              </Button>
            </Link>
            <Link to="/dashboard/student/concepts">
              <Button className="w-full justify-start" variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Explore Concepts
              </Button>
            </Link>
            <Link to="/dashboard/student/analytics">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { subject: 'Physics', progress: 72, color: 'bg-blue-500' },
              { subject: 'Chemistry', progress: 68, color: 'bg-green-500' },
              { subject: 'Biology', progress: 85, color: 'bg-purple-500' },
              { subject: 'Mathematics', progress: 78, color: 'bg-orange-500' }
            ].map((item) => (
              <div key={item.subject} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.subject}</span>
                  <span className="font-medium">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Completed Physics chapter on Waves</span>
                <span className="text-gray-500 ml-auto">2h ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Scored 85% in Chemistry quiz</span>
                <span className="text-gray-500 ml-auto">5h ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Reviewed Biology flashcards</span>
                <span className="text-gray-500 ml-auto">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;

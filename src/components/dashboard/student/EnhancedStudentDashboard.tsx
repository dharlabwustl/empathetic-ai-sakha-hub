
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Calendar,
  Brain,
  Zap,
  Heart,
  Award
} from 'lucide-react';
import EnhancedKpiDashboard from '@/components/dashboard/EnhancedKpiDashboard';
import { UserProfileBase } from '@/types/user/base';
import { useNavigate } from 'react-router-dom';

interface EnhancedStudentDashboardProps {
  userProfile: UserProfileBase;
}

const EnhancedStudentDashboard: React.FC<EnhancedStudentDashboardProps> = ({ 
  userProfile 
}) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Study Concepts',
      description: 'Learn new concepts and review previous ones',
      icon: <Brain className="w-5 h-5 text-blue-600" />,
      action: () => navigate('/dashboard/student/concepts'),
      color: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      title: 'Practice Tests',
      description: 'Take practice exams and assessments',
      icon: <Target className="w-5 h-5 text-green-600" />,
      action: () => navigate('/dashboard/student/practice'),
      color: 'bg-green-50 hover:bg-green-100'
    },
    {
      title: 'Study Plan',
      description: 'View and manage your study schedule',
      icon: <Calendar className="w-5 h-5 text-purple-600" />,
      action: () => navigate('/dashboard/student/study-plan'),
      color: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      title: 'Analytics',
      description: 'Track your progress and performance',
      icon: <TrendingUp className="w-5 h-5 text-orange-600" />,
      action: () => navigate('/dashboard/student/analytics'),
      color: 'bg-orange-50 hover:bg-orange-100'
    }
  ];

  const todaysTasks = [
    {
      id: 1,
      title: 'Complete Physics Chapter 5',
      type: 'concept',
      priority: 'high',
      estimatedTime: 45,
      completed: false
    },
    {
      id: 2,
      title: 'Math Practice Test',
      type: 'test',
      priority: 'medium',
      estimatedTime: 60,
      completed: true
    },
    {
      id: 3,
      title: 'Review Chemistry Flashcards',
      type: 'review',
      priority: 'low',
      estimatedTime: 20,
      completed: false
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Physics Mock Exam',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'exam'
    },
    {
      id: 2,
      title: 'Study Group Session',
      date: '2024-01-16',
      time: '2:00 PM',
      type: 'study'
    },
    {
      id: 3,
      title: 'Math Concept Review',
      date: '2024-01-17',
      time: '4:00 PM',
      type: 'review'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 text-red-700 bg-red-50';
      case 'medium':
        return 'border-yellow-200 text-yellow-700 bg-yellow-50';
      case 'low':
        return 'border-green-200 text-green-700 bg-green-50';
      default:
        return 'border-gray-200 text-gray-700 bg-gray-50';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="h-4 w-4" />;
      case 'test':
        return <Target className="h-4 w-4" />;
      case 'review':
        return <Brain className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {userProfile.name}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Ready to continue your learning journey? Let's make today productive!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-8 w-8 text-yellow-500" />
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">Level 12</div>
              <div className="text-sm text-gray-600">Learning Champion</div>
            </div>
          </div>
        </div>
      </div>

      {/* Student KPI Dashboard */}
      <div>
        <EnhancedKpiDashboard isAdmin={false} userId={userProfile.id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  onClick={action.action}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${action.color}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-white shadow-sm">
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{action.title}</h3>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Today's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg border ${task.completed ? 'bg-gray-50 opacity-60' : 'bg-white'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <div className={`mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                        {getTaskIcon(task.type)}
                      </div>
                      <div>
                        <h4 className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {task.estimatedTime} min
                          </span>
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}}
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${
                    event.type === 'exam' ? 'bg-red-500' :
                    event.type === 'study' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                </div>
                <h3 className="font-semibold text-sm mb-1">{event.title}</h3>
                <div className="text-xs text-muted-foreground">
                  <div>{event.date}</div>
                  <div>{event.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedStudentDashboard;

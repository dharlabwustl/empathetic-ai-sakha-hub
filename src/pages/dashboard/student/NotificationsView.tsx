
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Book, Brain, Calendar, Award, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { useKpiTracking } from '@/hooks/useKpiTracking';

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    title: 'Physics Progress: 75% Completed',
    description: 'Great job! You\'ve completed 3 out of 4 modules. Keep going!',
    timestamp: '2 hours ago',
    actionText: 'Continue Learning',
    actionLink: '/dashboard/student/concepts',
    priority: 'medium',
    icon: Book
  },
  {
    id: '2',
    title: 'Improvement Area: Calculus',
    description: 'You\'re struggling with Integration concepts. Try reviewing related flashcards.',
    timestamp: '5 hours ago',
    actionText: 'Review Flashcards',
    actionLink: '/dashboard/student/flashcards',
    priority: 'high',
    icon: Brain
  },
  {
    id: '3',
    title: 'You\'re on a roll!',
    description: '5-day study streak! Your consistency is impressive. Keep it up!',
    timestamp: '1 day ago',
    actionText: 'View Progress',
    actionLink: '/dashboard/student/today',
    priority: 'low',
    icon: Award
  },
  {
    id: '4',
    title: 'Feeling stressed?',
    description: 'We noticed you\'ve been stressed. Try some relaxation exercises in the Feel-Good Corner.',
    timestamp: '1 day ago',
    actionText: 'Visit Feel-Good Corner',
    actionLink: '/dashboard/student/feel-good-corner',
    priority: 'medium',
    icon: Smile
  },
  {
    id: '5',
    title: 'Study Plan Updated',
    description: 'Your study plan has been updated based on your recent exam performance.',
    timestamp: '2 days ago',
    actionText: 'View Study Plan',
    actionLink: '/dashboard/student/study-plan',
    priority: 'medium',
    icon: Calendar
  }
];

// Type for the notification card
interface NotificationCardProps {
  notification: {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    actionText: string;
    actionLink: string;
    priority: string;
    icon: React.ElementType;
  };
}

// Notification card component
const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const { title, description, timestamp, actionText, actionLink, priority, icon: Icon } = notification;
  
  // Different styles based on notification priority
  const getPriorityStyles = () => {
    switch (priority) {
      case 'high':
        return {
          bgColor: 'bg-amber-50 dark:bg-amber-900/20',
          iconColor: 'text-amber-600 dark:text-amber-400',
          borderColor: 'border-amber-200 dark:border-amber-800'
        };
      case 'medium':
        return {
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          iconColor: 'text-blue-600 dark:text-blue-400',
          borderColor: 'border-blue-200 dark:border-blue-800'
        };
      case 'low':
        return {
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          iconColor: 'text-green-600 dark:text-green-400',
          borderColor: 'border-green-200 dark:border-green-800'
        };
      default:
        return {
          bgColor: 'bg-gray-50 dark:bg-gray-800',
          iconColor: 'text-gray-600 dark:text-gray-400',
          borderColor: 'border-gray-200 dark:border-gray-700'
        };
    }
  };

  const styles = getPriorityStyles();

  return (
    <Card className={`overflow-hidden border-l-4 ${styles.borderColor}`}>
      <CardHeader className={`p-4 flex flex-row items-center gap-3 ${styles.bgColor}`}>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${styles.iconColor} bg-white dark:bg-gray-800`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        {title.includes('Progress') && (
          <div className="mb-4">
            <Progress value={75} className="h-2" />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">75% Complete</div>
          </div>
        )}
        
        <Button asChild size="sm" variant="outline" className="w-full">
          <Link to={actionLink}>{actionText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const NotificationsView = () => {
  const { nudges, markNudgeAsRead } = useKpiTracking();
  const userName = "John"; // This would come from user context/state

  return (
    <SharedPageLayout
      title="Notifications"
      subtitle="Stay updated with your learning journey"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Personalized greeting header */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
          <h2 className="text-xl font-medium">Good morning, {userName}!</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Here are your personalized updates and recommendations.</p>
        </div>
        
        {/* Notifications grid */}
        <div className="space-y-4">
          {/* Display system nudges if available */}
          {nudges && nudges.length > 0 && nudges.map(nudge => (
            <Card key={nudge.id} className="overflow-hidden border-l-4 border-primary">
              <CardHeader className="p-4 flex flex-row items-center gap-3 bg-primary/5">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-primary bg-white dark:bg-gray-800">
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <CardTitle className="text-base font-medium">{nudge.title}</CardTitle>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(nudge.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{nudge.description}</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => markNudgeAsRead(nudge.id)}
                >
                  Mark as Read
                </Button>
              </CardContent>
            </Card>
          ))}
          
          {/* Display mock notifications */}
          {mockNotifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default NotificationsView;

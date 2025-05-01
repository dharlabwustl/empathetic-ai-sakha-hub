
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Book, Brain, Calendar, Award, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { SharedPageLayout } from '../SharedPageLayout';

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    type: 'progress',
    title: 'Physics Progress: 75% Completed',
    description: 'Great job! You\'ve completed 3 out of 4 modules. Keep going!',
    timestamp: '2 hours ago',
    actionText: 'Continue Learning',
    actionLink: '/dashboard/student/concepts',
    icon: Book
  },
  {
    id: '2',
    type: 'weakness',
    title: 'Improvement Area: Calculus',
    description: 'You\'re struggling with Integration concepts. Try reviewing related flashcards.',
    timestamp: '5 hours ago',
    actionText: 'Review Flashcards',
    actionLink: '/dashboard/student/flashcards',
    icon: Brain
  },
  {
    id: '3',
    type: 'motivation',
    title: 'You\'re on a roll!',
    description: '5-day study streak! Your consistency is impressive. Keep it up!',
    timestamp: '1 day ago',
    actionText: 'View Progress',
    actionLink: '/dashboard/student/today',
    icon: Award
  },
  {
    id: '4',
    type: 'mood',
    title: 'Feeling stressed?',
    description: 'We noticed you\'ve been stressed. Try some relaxation exercises in the Feel-Good Corner.',
    timestamp: '1 day ago',
    actionText: 'Visit Feel-Good Corner',
    actionLink: '/dashboard/student/feel-good-corner',
    icon: Smile
  },
  {
    id: '5',
    type: 'plan',
    title: 'Study Plan Updated',
    description: 'Your study plan has been updated based on your recent exam performance.',
    timestamp: '2 days ago',
    actionText: 'View Study Plan',
    actionLink: '/dashboard/student/study-plan',
    icon: Calendar
  }
];

// Type for the notification card
interface NotificationCardProps {
  notification: {
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: string;
    actionText: string;
    actionLink: string;
    icon: React.ElementType;
  };
}

// Notification card component
const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const { type, title, description, timestamp, actionText, actionLink, icon: Icon } = notification;
  
  // Different styles based on notification type
  const getTypeStyles = () => {
    switch (type) {
      case 'progress':
        return {
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          iconColor: 'text-green-600 dark:text-green-400',
          borderColor: 'border-green-200 dark:border-green-800'
        };
      case 'weakness':
        return {
          bgColor: 'bg-amber-50 dark:bg-amber-900/20',
          iconColor: 'text-amber-600 dark:text-amber-400',
          borderColor: 'border-amber-200 dark:border-amber-800'
        };
      case 'motivation':
        return {
          bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          iconColor: 'text-purple-600 dark:text-purple-400',
          borderColor: 'border-purple-200 dark:border-purple-800'
        };
      case 'mood':
        return {
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          iconColor: 'text-blue-600 dark:text-blue-400',
          borderColor: 'border-blue-200 dark:border-blue-800'
        };
      case 'plan':
        return {
          bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
          iconColor: 'text-indigo-600 dark:text-indigo-400',
          borderColor: 'border-indigo-200 dark:border-indigo-800'
        };
      default:
        return {
          bgColor: 'bg-gray-50 dark:bg-gray-800',
          iconColor: 'text-gray-600 dark:text-gray-400',
          borderColor: 'border-gray-200 dark:border-gray-700'
        };
    }
  };

  const styles = getTypeStyles();

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
        
        {type === 'progress' && (
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
  const userName = "John"; // This would come from user context/state

  return (
    <SharedPageLayout
      title="Notifications"
      subtitle="Stay updated with your learning journey"
      backButtonUrl="/dashboard/student"
      showBackButton={true}
    >
      <div className="space-y-6">
        {/* Personalized greeting header */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
          <h2 className="text-xl font-medium">Good morning, {userName}!</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Here are your personalized updates and recommendations.</p>
        </div>
        
        {/* Notifications grid */}
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default NotificationsView;

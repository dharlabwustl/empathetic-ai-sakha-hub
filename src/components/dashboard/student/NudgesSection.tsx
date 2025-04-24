
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertTriangle, InfoIcon, CheckCircle2 } from "lucide-react";
import { NudgeData } from "@/types/user/base";

// Sample nudge data
const mockNudges: NudgeData[] = [
  {
    id: "n1",
    title: "Complete your profile",
    description: "Your profile is 70% complete. Finish it to unlock personalized recommendations.",
    type: "info",
    isRead: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    priority: "medium",
    action: "Complete Profile",
    actionLink: "/profile"
  },
  {
    id: "n2",
    title: "New concepts added for Physics",
    description: "We've added new concept cards for your Physics subject. Check them out!",
    type: "success",
    isRead: false,
    createdAt: new Date(),
    priority: "medium",
    action: "View Concepts",
    actionLink: "/study/concept-card"
  },
  {
    id: "n3",
    title: "Upcoming exam reminder",
    description: "You have a practice exam scheduled for tomorrow. Make sure to prepare!",
    type: "warning",
    isRead: false,
    createdAt: new Date(),
    priority: "high",
    action: "View Exam",
    actionLink: "/exams"
  }
];

interface NudgesSectionProps {
  nudges?: NudgeData[];
  onMarkAsRead?: (id: string) => void;
  className?: string;
}

const NudgesSection: React.FC<NudgesSectionProps> = ({ 
  nudges = mockNudges, 
  onMarkAsRead,
  className = ""
}) => {
  const [localNudges, setLocalNudges] = useState<NudgeData[]>([]);
  
  useEffect(() => {
    setLocalNudges(nudges);
  }, [nudges]);
  
  const handleMarkAsRead = (id: string) => {
    if (onMarkAsRead) {
      onMarkAsRead(id);
    } else {
      setLocalNudges(prev => 
        prev.map(nudge => 
          nudge.id === id ? { ...nudge, isRead: true } : nudge
        )
      );
    }
  };
  
  const handleActionClick = (nudge: NudgeData) => {
    // Mark as read first
    handleMarkAsRead(nudge.id);
    
    // Then perform action if available
    if (nudge.actionLink) {
      window.location.href = nudge.actionLink;
    }
  };
  
  const getNudgeIcon = (type: string) => {
    switch (type) {
      case "info":
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <InfoIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getNudgeBadgeClass = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "warning":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };
  
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };
  
  const unreadNudges = localNudges.filter(nudge => !nudge.isRead);
  
  if (unreadNudges.length === 0) {
    return (
      <Card className={`${className} h-full`}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="text-gray-500" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No new notifications
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className} h-full`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="text-indigo-500" />
            Notifications
          </CardTitle>
          {unreadNudges.length > 0 && (
            <Badge className="bg-indigo-500">
              {unreadNudges.length} new
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-3">
          {unreadNudges.map((nudge) => (
            <div 
              key={nudge.id}
              className="flex gap-3 p-3 border border-gray-100 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm"
            >
              <div>
                {getNudgeIcon(nudge.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium">{nudge.title}</h4>
                  <Badge variant="outline" className={getNudgeBadgeClass(nudge.type)}>
                    {nudge.type.charAt(0).toUpperCase() + nudge.type.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{nudge.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">{getTimeAgo(nudge.createdAt)}</span>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-xs py-1 h-auto"
                      onClick={() => handleMarkAsRead(nudge.id)}
                    >
                      Mark as read
                    </Button>
                    {nudge.action && (
                      <Button 
                        size="sm" 
                        variant="default"
                        className="text-xs py-1 h-auto bg-indigo-500 hover:bg-indigo-600"
                        onClick={() => handleActionClick(nudge)}
                      >
                        {nudge.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NudgesSection;

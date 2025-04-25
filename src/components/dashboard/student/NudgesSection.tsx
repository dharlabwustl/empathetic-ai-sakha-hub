
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NudgeData } from "@/hooks/useKpiTracking";
import { Bell, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const mockNudges: NudgeData[] = [
  {
    id: "nudge1",
    title: "Physics Quiz Due",
    message: "You have a physics quiz due tomorrow on Newton's Laws",
    timestamp: new Date().toISOString(),
    read: false,
    priority: "high",
    type: "reminder",
    action: "Review Quiz",
    url: "/study/quiz/physics-101"
  },
  {
    id: "nudge2",
    title: "Streak Achievement",
    message: "Congrats! You've maintained a 7-day study streak!",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "medium",
    type: "achievement"
  },
  {
    id: "nudge3",
    title: "Study Suggestion",
    message: "Based on your progress, we recommend focusing on Organic Chemistry concepts",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    priority: "low",
    type: "suggestion",
    action: "View Concepts",
    url: "/study/concept-cards/chemistry"
  }
];

interface NudgesSectionProps {
  nudges: NudgeData[];
  markNudgeAsRead?: (id: string) => void;
}

const NudgesSection: React.FC<NudgesSectionProps> = ({ nudges = mockNudges, markNudgeAsRead }) => {
  const navigate = useNavigate();
  const [expandedNudge, setExpandedNudge] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedNudge(expandedNudge === id ? null : id);
    
    // Mark as read when expanded
    if (!nudges.find(n => n.id === id)?.read && markNudgeAsRead) {
      markNudgeAsRead(id);
    }
  };

  const handleAction = (nudge: NudgeData) => {
    if (nudge.url) {
      navigate(nudge.url);
    }
    
    // Mark as read when action taken
    if (!nudge.read && markNudgeAsRead) {
      markNudgeAsRead(nudge.id);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return "recently";
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      case "low":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Bell className="h-4 w-4" />;
      case "achievement":
        return <Check className="h-4 w-4" />;
      case "suggestion":
        return <ChevronRight className="h-4 w-4" />;
      case "alert":
        return <Bell className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  if (nudges.length === 0) {
    return (
      <Card className="border-dashed border-2 bg-white/70 dark:bg-gray-800/20">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="rounded-full bg-slate-100 p-3 mb-3">
            <Bell className="h-5 w-5 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium">No Notifications</h3>
          <p className="text-sm text-muted-foreground mt-1">
            You're all caught up! No new notifications.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {nudges.map((nudge) => (
        <Card 
          key={nudge.id}
          className={cn(
            "overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800/70",
            nudge.read ? "opacity-70" : "shadow-sm"
          )}
        >
          <CardContent className="p-0">
            <div 
              className={cn(
                "flex cursor-pointer p-3",
                nudge.read ? "bg-white dark:bg-gray-800/70" : "bg-blue-50/50 dark:bg-blue-900/10"
              )}
              onClick={() => toggleExpand(nudge.id)}
            >
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <span 
                      className={cn(
                        "w-2 h-2 rounded-full mr-2",
                        nudge.read ? "bg-gray-300" : "bg-blue-500"
                      )}
                    ></span>
                    <h3 
                      className={cn(
                        "font-medium",
                        nudge.read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-white"
                      )}
                    >
                      {nudge.title}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(nudge.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                  {nudge.message}
                </p>
              </div>
            </div>
            
            {expandedNudge === nudge.id && (
              <div className="p-3 pt-0 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {nudge.message}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={cn("text-xs px-2 py-1 rounded-full", getPriorityClass(nudge.priority))}>
                      <span className="flex items-center space-x-1">
                        {getTypeIcon(nudge.type)}
                        <span>{nudge.type}</span>
                      </span>
                    </span>
                  </div>
                  {nudge.action && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs h-8"
                      onClick={() => handleAction(nudge)}
                    >
                      {nudge.action}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NudgesSection;


import { NudgeData } from "@/hooks/useKpiTracking";
import { Bell, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NudgePanelProps {
  nudges: NudgeData[];
  markAsRead: (id: string) => void;
  showAll?: boolean;
}

export default function NudgePanel({ nudges, markAsRead, showAll = false }: NudgePanelProps) {
  const displayNudges = showAll ? nudges : nudges.slice(0, 3);
  
  if (!nudges.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">Notifications</h3>
          <Badge variant="outline">All clear</Badge>
        </div>
        <div className="p-6 text-center text-muted-foreground">
          <Bell className="mx-auto h-8 w-8 mb-2 text-muted-foreground/50" />
          <p>No new notifications</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">Notifications</h3>
        <Badge>{nudges.length} new</Badge>
      </div>
      <div className="space-y-3">
        {displayNudges.map((nudge) => (
          <div
            key={nudge.id}
            className={`p-3 rounded-md border ${
              nudge.priority === "high"
                ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30"
                : nudge.priority === "medium"
                ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30"
                : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30"
            } relative`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {nudge.priority === "high" ? (
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                ) : (
                  <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                )}
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="font-medium text-sm">{nudge.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {nudge.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {new Date(nudge.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-auto py-1 px-2"
                    onClick={() => markAsRead(nudge.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-xs">Mark as read</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {!showAll && nudges.length > 3 && (
          <Button variant="ghost" className="w-full text-sm" asChild>
            <a href="/dashboard/student/notifications">View all {nudges.length} notifications</a>
          </Button>
        )}
      </div>
    </div>
  );
}

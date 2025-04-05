
import { useState } from "react";
import { 
  Bell, 
  Check, 
  ChevronRight, 
  LightbulbIcon, 
  PartyPopper,
  AlertTriangle,
  Megaphone
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NudgeData } from "@/hooks/useKpiTracking";
import { Link } from "react-router-dom";

interface NudgePanelProps {
  nudges: NudgeData[];
  markAsRead: (id: string) => void;
}

export default function NudgePanel({ nudges, markAsRead }: NudgePanelProps) {
  const [expanded, setExpanded] = useState(false);
  const unreadCount = nudges.filter(nudge => !nudge.read).length;
  const displayNudges = expanded ? nudges : nudges.slice(0, 2);

  const getNudgeIcon = (type: string) => {
    switch (type) {
      case "motivation":
        return <Megaphone size={18} className="text-blue-500" />;
      case "reminder":
        return <Bell size={18} className="text-amber-500" />;
      case "celebration":
        return <PartyPopper size={18} className="text-emerald-500" />;
      case "suggestion":
        return <LightbulbIcon size={18} className="text-indigo-500" />;
      case "warning":
        return <AlertTriangle size={18} className="text-red-500" />;
      default:
        return <Bell size={18} className="text-gray-500" />;
    }
  };

  const getNudgeColor = (type: string) => {
    switch (type) {
      case "motivation":
        return "bg-blue-50 border-blue-200";
      case "reminder":
        return "bg-amber-50 border-amber-200";
      case "celebration":
        return "bg-emerald-50 border-emerald-200";
      case "suggestion":
        return "bg-indigo-50 border-indigo-200";
      case "warning":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Bell size={18} />
            <span>Smart Nudges</span>
            {unreadCount > 0 && (
              <Badge variant="default" className="bg-sakha-blue ml-2">
                {unreadCount} new
              </Badge>
            )}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {displayNudges.length > 0 ? (
          displayNudges.map(nudge => (
            <div 
              key={nudge.id}
              className={`p-3 rounded-lg border flex items-start gap-3 relative ${getNudgeColor(nudge.type)} ${!nudge.read ? 'animate-pulse-subtle' : ''}`}
            >
              <div className="mt-1">
                {getNudgeIcon(nudge.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">{nudge.title}</h4>
                <p className="text-sm text-gray-600">{nudge.message}</p>
                {nudge.actionLabel && (
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      asChild
                      onClick={() => markAsRead(nudge.id)}
                    >
                      <Link to={nudge.actionUrl || "#"}>
                        {nudge.actionLabel}
                        <ChevronRight size={14} className="ml-1" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
              {!nudge.read && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => markAsRead(nudge.id)}
                >
                  <Check size={14} />
                </Button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No nudges available</p>
        )}
      </CardContent>

      {nudges.length > 2 && (
        <CardFooter className="pt-0 flex justify-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : `Show ${nudges.length - 2} more`}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}


import React from 'react';
import { Bell, X } from "lucide-react";
import { NudgeData } from "@/hooks/useKpiTracking";

interface NudgeListProps {
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
}

const NudgeList: React.FC<NudgeListProps> = ({ nudges, markNudgeAsRead }) => {
  if (!nudges || nudges.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="space-y-2">
        {nudges.map((nudge) => (
          <div
            key={nudge.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-start gap-3 max-w-xs animate-fade-in border border-gray-100 dark:border-gray-700"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${nudge.priority === 'high' ? 'bg-red-100 text-red-600' : nudge.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
              <Bell className="h-4 w-4" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-sm">{nudge.title}</h3>
              <p className="text-xs text-muted-foreground">{nudge.message}</p>
              {nudge.actionText && (
                <button className="text-xs text-blue-600 mt-1 font-medium">
                  {nudge.actionText}
                </button>
              )}
            </div>
            
            <button 
              onClick={() => markNudgeAsRead(nudge.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NudgeList;

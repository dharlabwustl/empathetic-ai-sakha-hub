
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Bell, Calendar, Clock, AlertTriangle } from "lucide-react";
import { NudgeData } from "@/hooks/useKpiTracking";

interface NudgesSectionProps {
  nudges: NudgeData[];
  onDismiss: (id: string) => void;
  className?: string;
}

const NudgesSection: React.FC<NudgesSectionProps> = ({
  nudges,
  onDismiss,
  className = ""
}) => {
  if (nudges.length === 0) {
    return null;
  }
  
  const getIconForType = (type: string) => {
    switch (type) {
      case 'deadline': return <Calendar className="h-5 w-5 text-amber-500" />;
      case 'reminder': return <Clock className="h-5 w-5 text-blue-500" />;
      case 'important': case 'warning': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Bell className="h-5 w-5 text-indigo-500" />;
    }
  };
  
  const getCardStyle = (type: string) => {
    switch (type) {
      case 'deadline': return 'border-amber-200 bg-amber-50/50';
      case 'reminder': return 'border-blue-200 bg-blue-50/50';
      case 'important': case 'warning': return 'border-red-200 bg-red-50/50';
      default: return 'border-indigo-200 bg-indigo-50/50';
    }
  };
  
  return (
    <div className={`space-y-3 ${className}`}>
      <AnimatePresence>
        {nudges.map((nudge) => (
          <motion.div
            key={nudge.id}
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`${getCardStyle(nudge.type)} shadow-sm`}>
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 p-2 rounded-full bg-white`}>
                    {getIconForType(nudge.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{nudge.title}</h3>
                    <p className="text-xs text-muted-foreground">{nudge.message}</p>
                    
                    {nudge.actionLabel && nudge.onAction && (
                      <Button
                        variant="link"
                        size="sm"
                        className="h-8 px-0 text-xs"
                        onClick={() => nudge.onAction && nudge.onAction()}
                      >
                        {nudge.actionLabel}
                      </Button>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full p-1 h-6 w-6 hover:bg-gray-100"
                    onClick={() => onDismiss(nudge.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Dismiss</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NudgesSection;

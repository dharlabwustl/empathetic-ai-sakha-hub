
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flag, Clock, Calendar, CalendarCheck, CalendarPlus, CheckCircle, Plus, Calendar2, BrainCircuit, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface RevisionSectionProps {
  conceptId: string;
  isFlagged: boolean;
  onToggleFlag: () => void;
}

const RevisionSection: React.FC<RevisionSectionProps> = ({ conceptId, isFlagged, onToggleFlag }) => {
  const [revisionSchedule, setRevisionSchedule] = useState<string | null>(null);
  const [reminders, setReminders] = useState<string[]>([]);
  const { toast } = useToast();

  const scheduleRevision = (timeframe: string) => {
    setRevisionSchedule(timeframe);
    
    toast({
      title: "Revision Scheduled",
      description: `Your revision for this concept has been scheduled for ${timeframe}`,
    });
  };
  
  const addReminder = (time: string) => {
    if (!reminders.includes(time)) {
      setReminders([...reminders, time]);
      
      toast({
        title: "Reminder Added",
        description: `You'll be reminded to revise this concept ${time}`,
      });
    } else {
      // Remove if already exists
      setReminders(reminders.filter(r => r !== time));
      
      toast({
        title: "Reminder Removed",
        description: `Reminder for ${time} has been removed`,
      });
    }
  };

  return (
    <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
      <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl font-bold">
          <BrainCircuit className="h-5 w-5 mr-2 text-amber-600" /> Spaced Revision
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-amber-700/70 dark:text-amber-400/70 mb-4">
          Schedule revisions to optimize your long-term retention using the forgetting curve model
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Revision Status:</div>
            <Button 
              variant={isFlagged ? "default" : "outline"} 
              size="sm"
              onClick={onToggleFlag}
              className={isFlagged ? "bg-amber-500 hover:bg-amber-600" : ""}
            >
              <Flag className="h-4 w-4 mr-1" />
              {isFlagged ? "Flagged for Revision" : "Not Flagged"}
            </Button>
          </div>
          
          <div className="border-t border-amber-200 dark:border-amber-800/50 pt-4">
            <div className="text-sm font-medium mb-3">Schedule revision for:</div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={revisionSchedule === "Today" ? "default" : "outline"}
                size="sm"
                className={`justify-start ${revisionSchedule === "Today" ? "bg-amber-500 hover:bg-amber-600" : ""}`}
                onClick={() => scheduleRevision("Today")}
              >
                <Clock className="h-4 w-4 mr-2" />
                Today
              </Button>
              <Button 
                variant={revisionSchedule === "Tomorrow" ? "default" : "outline"}
                size="sm"
                className={`justify-start ${revisionSchedule === "Tomorrow" ? "bg-amber-500 hover:bg-amber-600" : ""}`}
                onClick={() => scheduleRevision("Tomorrow")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Tomorrow
              </Button>
              <Button 
                variant={revisionSchedule === "3 days" ? "default" : "outline"}
                size="sm"
                className={`justify-start ${revisionSchedule === "3 days" ? "bg-amber-500 hover:bg-amber-600" : ""}`}
                onClick={() => scheduleRevision("3 days")}
              >
                <Calendar2 className="h-4 w-4 mr-2" />
                3 days
              </Button>
              <Button 
                variant={revisionSchedule === "Next week" ? "default" : "outline"}
                size="sm"
                className={`justify-start ${revisionSchedule === "Next week" ? "bg-amber-500 hover:bg-amber-600" : ""}`}
                onClick={() => scheduleRevision("Next week")}
              >
                <CalendarCheck className="h-4 w-4 mr-2" />
                Next week
              </Button>
            </div>
          </div>
          
          <div className="border-t border-amber-200 dark:border-amber-800/50 pt-4">
            <div className="text-sm font-medium mb-3">Set reminders:</div>
            <div className="flex flex-wrap gap-2">
              {["Morning", "Afternoon", "Evening"].map((time) => (
                <Badge
                  key={time}
                  variant={reminders.includes(time) ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-1.5 ${
                    reminders.includes(time) 
                      ? "bg-amber-500 hover:bg-amber-600" 
                      : "hover:bg-amber-100 dark:hover:bg-amber-900/20"
                  }`}
                  onClick={() => addReminder(time)}
                >
                  <Bell className="h-3 w-3 mr-1" />
                  {time}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {revisionSchedule && (
          <motion.div 
            className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800 flex items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-400">
                Revision scheduled for {revisionSchedule}
              </p>
              {reminders.length > 0 && (
                <p className="text-xs text-green-700 dark:text-green-500 mt-1">
                  With reminders: {reminders.join(', ')}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="pb-4 pt-0">
        <div className="text-xs text-amber-700/50 dark:text-amber-400/50 flex items-center">
          <CalendarPlus className="h-3 w-3 mr-1" />
          Optimized using spaced repetition system
        </div>
      </CardFooter>
    </Card>
  );
};

export default RevisionSection;

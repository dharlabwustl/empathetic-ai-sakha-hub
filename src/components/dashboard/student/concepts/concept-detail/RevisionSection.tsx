
import React from 'react';
import { motion } from 'framer-motion';
import { PenLine, Calendar, Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface RevisionSectionProps {
  conceptId: string;
  isFlagged: boolean;
  onToggleFlag: () => void;
}

const RevisionSection: React.FC<RevisionSectionProps> = ({ conceptId, isFlagged, onToggleFlag }) => {
  const { toast } = useToast();

  const handleScheduleRevision = () => {
    toast({
      title: "Revision scheduled",
      description: "We'll remind you to review this concept soon",
    });
  };

  const handleSetReminder = () => {
    toast({
      title: "Reminder set",
      description: "You'll be reminded to review this concept tomorrow",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className={`overflow-hidden border-l-4 transition-all ${
        isFlagged ? 'border-l-amber-500' : 'border-l-gray-200 dark:border-l-gray-800'
      }`}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <PenLine className="h-5 w-5 mr-2 text-amber-500" />
            Revision Planning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant={isFlagged ? "secondary" : "outline"} className={
              isFlagged ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" : ""
            }>
              {isFlagged ? "Flagged for revision" : "Not flagged"}
            </Badge>
            <Button 
              variant={isFlagged ? "default" : "outline"} 
              size="sm"
              onClick={onToggleFlag}
              className={isFlagged ? "bg-amber-600 hover:bg-amber-700" : ""}
            >
              {isFlagged ? "Unflag" : "Flag for revision"}
            </Button>
          </div>

          <div className="mt-4 space-y-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start text-left" 
              onClick={handleScheduleRevision}
            >
              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
              <span>Schedule revision session</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start text-left" 
              onClick={handleSetReminder}
            >
              <Bell className="h-4 w-4 mr-2 text-purple-600" />
              <span>Set reminder</span>
            </Button>
          </div>

          {isFlagged && (
            <div className="mt-3 pt-3 border-t text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center mb-1">
                <Clock className="h-3.5 w-3.5 mr-1 text-gray-500" />
                <span>Next recommended revision: Tomorrow</span>
              </div>
              <p className="text-xs opacity-75 mt-1">
                Revising this concept regularly will improve long-term retention by up to 85%
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RevisionSection;

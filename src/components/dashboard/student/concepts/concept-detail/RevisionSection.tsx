
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flag, Clock, Calendar, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface RevisionSectionProps {
  conceptId: string;
  isFlagged: boolean;
  onToggleFlag: () => void;
}

const RevisionSection: React.FC<RevisionSectionProps> = ({
  conceptId,
  isFlagged,
  onToggleFlag,
}) => {
  // Calculate next revision date (demo purpose)
  const today = new Date();
  const nextRevisionDate = new Date(today);
  nextRevisionDate.setDate(today.getDate() + 3);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 pb-3 pt-3">
          <CardTitle className="text-base flex items-center text-gray-900 dark:text-gray-100">
            <Clock className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
            Revision Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {isFlagged ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm">Next review</span>
                </div>
                <span className="text-sm font-medium">{formatDate(nextRevisionDate)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm">Time to review</span>
                </div>
                <span className="text-sm font-medium">7 min</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm">Forgetting risk</span>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400 font-medium">
                  Medium
                </span>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-2 border-amber-500 text-amber-600 dark:border-amber-700 dark:text-amber-400" 
                size="sm"
                onClick={onToggleFlag}
              >
                <Flag className="h-4 w-4 mr-2" />
                Remove from Revision List
              </Button>
            </div>
          ) : (
            <div className="py-2 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                This concept isn't in your revision list yet.
              </p>
              <Button 
                variant="outline" 
                className="border-amber-500 text-amber-600 dark:border-amber-700 dark:text-amber-400" 
                size="sm"
                onClick={onToggleFlag}
              >
                <Flag className="h-4 w-4 mr-1" />
                Add to Revision List
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RevisionSection;

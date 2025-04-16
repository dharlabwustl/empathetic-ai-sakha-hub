
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserProfileType } from "@/types/user";
import { Calendar, Clock, BookOpen, Target, ArrowRight } from "lucide-react";

interface StudyPlanModalProps {
  user: UserProfileType;
  onClose: () => void;
}

const StudyPlanModal: React.FC<StudyPlanModalProps> = ({ user, onClose }) => {
  // Mock study plan data
  const studyPlan = {
    today: [
      { id: '1', subject: 'Physics', topic: 'Kinematics', duration: 45, complete: false },
      { id: '2', subject: 'Mathematics', topic: 'Integration', duration: 60, complete: false },
      { id: '3', subject: 'Chemistry', topic: 'Organic Chemistry', duration: 30, complete: false },
    ],
    recommended: [
      { id: '4', subject: 'Physics', topic: 'Problem Set: Motion in 2D', duration: 20, type: 'practice' },
      { id: '5', subject: 'Mathematics', topic: 'Applications of Derivatives', duration: 40, type: 'new-concept' },
    ]
  };

  const goalTitle = user?.goals?.[0]?.title || "UPSC";
  const goalDeadline = user?.goals?.[0]?.dueDate || "2025-05-15";
  
  // Format deadline
  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl flex items-center">
            <Calendar className="mr-2 h-6 w-6 text-indigo-500" />
            Your Study Plan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Goal summary */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Preparing For</h4>
                <p className="text-lg font-bold">{goalTitle}</p>
              </div>
              <div className="text-right">
                <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Target Date</h4>
                <p className="font-medium">{formatDeadline(goalDeadline)}</p>
              </div>
            </div>
          </div>

          {/* Today's plan */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-pink-500" />
              Today's Study Plan
            </h3>
            
            <div className="space-y-3">
              {studyPlan.today.map(item => (
                <div 
                  key={item.id}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-between bg-white dark:bg-gray-800"
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.subject === 'Physics' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                      item.subject === 'Mathematics' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      <BookOpen size={18} />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{item.subject}: {item.topic}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.duration} minutes</p>
                    </div>
                  </div>
                  <Button size="sm" variant={item.complete ? "outline" : "default"}>
                    {item.complete ? 'Completed' : 'Start'}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended next */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Target className="mr-2 h-5 w-5 text-emerald-500" />
              Recommended Next
            </h3>
            
            <div className="space-y-3">
              {studyPlan.recommended.map(item => (
                <div 
                  key={item.id}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-between bg-white dark:bg-gray-800"
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === 'practice' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 
                      'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400'
                    }`}>
                      {item.type === 'practice' ? <Target size={18} /> : <BookOpen size={18} />}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{item.subject}: {item.topic}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.duration} minutes</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1">
                    Queue Next <ArrowRight size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600" size="lg">
            View Full Study Plan
          </Button>
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanModal;

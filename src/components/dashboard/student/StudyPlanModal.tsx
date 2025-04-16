
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BookOpen, Brain, FileText } from 'lucide-react';

interface StudyPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudyPlanModal: React.FC<StudyPlanModalProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Your Study Plan</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-purple-600">
            <Calendar size={18} />
            <span className="font-medium">Today's Schedule</span>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-md border p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-blue-600" size={16} />
                <span className="text-sm font-medium">9:00 AM - 10:30 AM</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <BookOpen className="text-purple-500" size={18} />
                </div>
                <div>
                  <h4 className="font-medium">Physics: Mechanics</h4>
                  <p className="text-sm text-gray-500">Newton's Laws of Motion with 5 practice problems</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-blue-600" size={16} />
                <span className="text-sm font-medium">11:00 AM - 12:30 PM</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Brain className="text-purple-500" size={18} />
                </div>
                <div>
                  <h4 className="font-medium">Chemistry: Organic Chemistry</h4>
                  <p className="text-sm text-gray-500">Functional groups with flashcards review</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-blue-600" size={16} />
                <span className="text-sm font-medium">2:00 PM - 3:30 PM</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <FileText className="text-purple-500" size={18} />
                </div>
                <div>
                  <h4 className="font-medium">Mathematics: Calculus</h4>
                  <p className="text-sm text-gray-500">Differentiation rules and application problems</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanModal;

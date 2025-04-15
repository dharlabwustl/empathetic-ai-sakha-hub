
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SubjectProgress, StudyStreak } from "@/types/user/student";

interface StudyPlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  studyProgress: {
    subjectsProgress: SubjectProgress[];
    streak: StudyStreak;
    loading: boolean;
    selectedSubject: SubjectProgress;
    selectSubject: (subjectId: string) => void;
  };
}

const StudyPlanDialog: React.FC<StudyPlanDialogProps> = ({ isOpen, onClose, studyProgress }) => {
  const { subjectsProgress, streak } = studyProgress;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>Your Study Plan</DialogTitle>
          <DialogDescription>
            Here's your personalized study plan based on your progress and goals.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <h3 className="text-lg font-medium">Current Progress</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You've maintained a {streak.current}-day study streak. Keep it up!
          </p>

          <h3 className="text-lg font-medium mt-6">Recommended Topics</h3>
          <ul className="mt-2 space-y-2">
            {subjectsProgress.map((subject) => (
              <li key={subject.id} className="text-sm">
                <div className="flex justify-between items-center">
                  <span>{subject.name}</span>
                  <span className="text-xs font-medium">{subject.progress}% complete</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full mt-1">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ 
                      width: `${subject.progress}%`, 
                      backgroundColor: subject.color || '#0ea5e9' 
                    }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDialog;

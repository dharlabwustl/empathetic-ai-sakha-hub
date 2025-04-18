
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PracticeExamDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PracticeExamDialog: React.FC<PracticeExamDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Practice Exam</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Exams
          </Button>
          
          <div className="mt-4 space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Mock Test - Physics</h3>
              {/* Add your exam content here */}
              <p>Exam content would go here...</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PracticeExamDialog;

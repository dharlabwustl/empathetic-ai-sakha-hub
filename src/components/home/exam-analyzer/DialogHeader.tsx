
import React from 'react';
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { XCircle } from 'lucide-react';

interface DialogHeaderProps {
  title: string;
  description?: string;
  onClose: () => void;
}

const ExamDialogHeader: React.FC<DialogHeaderProps> = ({ title, description, onClose }) => {
  return (
    <>
      <div className="absolute right-4 top-4">
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <XCircle className="h-4 w-4" />
        </Button>
      </div>
      <DialogHeader>
        <DialogTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-violet-500">{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
    </>
  );
};

export default ExamDialogHeader;

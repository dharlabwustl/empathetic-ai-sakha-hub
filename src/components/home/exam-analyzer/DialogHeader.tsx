
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from '@/components/ui/button';

interface ExamDialogHeaderProps {
  title: string;
  description: string;
  onClose: () => void;
  isMobile?: boolean;
}

const ExamDialogHeader: React.FC<ExamDialogHeaderProps> = ({ 
  title, 
  description, 
  onClose,
  isMobile = false
}) => {
  return (
    <DialogHeader className="relative">
      <DialogTitle className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold`}>
        {title}
      </DialogTitle>
      <DialogDescription className={`${isMobile ? 'text-xs mt-1' : 'text-sm mt-2'}`}>
        {description}
      </DialogDescription>
      
      <Button
        variant="ghost"
        size="icon"
        className={`absolute ${isMobile ? 'right-0 top-0' : 'right-0 top-0'} rounded-full hover:bg-gray-100 dark:hover:bg-gray-800`}
        onClick={onClose}
      >
        <X className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} aria-hidden="true" />
        <span className="sr-only">Close</span>
      </Button>
    </DialogHeader>
  );
};

export default ExamDialogHeader;

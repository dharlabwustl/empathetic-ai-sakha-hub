
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface StationeryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StationeryModal: React.FC<StationeryModalProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Your Stationery</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <p className="text-muted-foreground">
            This is your digital stationery. You can use it to take notes, draw diagrams, and more.
          </p>
          
          <div className="h-64 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
            <p className="text-gray-400">Stationery tools will be available soon</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StationeryModal;

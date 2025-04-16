
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Home, Calendar, BookOpen, Brain, FileText, Activity } from 'lucide-react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange
}) => {
  const navItems = [
    { icon: <Home size={18} />, label: 'Overview', value: 'overview' },
    { icon: <Calendar size={18} />, label: 'Today\'s Plan', value: 'today' },
    { icon: <BookOpen size={18} />, label: 'Academic', value: 'academic' },
    { icon: <Brain size={18} />, label: 'Concepts', value: 'concepts' },
    { icon: <FileText size={18} />, label: 'Flashcards', value: 'flashcards' },
    { icon: <Activity size={18} />, label: 'Practice Exam', value: 'practice-exam' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 sm:max-w-[300px] h-screen flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Navigation</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.value}
                variant={activeTab === item.value ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  activeTab === item.value ? 'bg-purple-500 text-white' : ''
                }`}
                onClick={() => onTabChange(item.value)}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileSidebar;

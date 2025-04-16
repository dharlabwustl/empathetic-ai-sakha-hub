
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Brain, 
  FileText, 
  Activity, 
  PenLine, 
  Heart, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

interface SidebarProps {
  hideSidebar: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenStationery?: () => void;
  onOpenFeelGood?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  hideSidebar,
  activeTab,
  onTabChange,
  onOpenStationery,
  onOpenFeelGood
}) => {
  const navItems = [
    { icon: <Home size={18} />, label: 'Overview', value: 'overview' },
    { icon: <Calendar size={18} />, label: 'Today\'s Plan', value: 'today' },
    { icon: <BookOpen size={18} />, label: 'Academic', value: 'academic' },
    { icon: <Brain size={18} />, label: 'Concepts', value: 'concepts' },
    { icon: <FileText size={18} />, label: 'Flashcards', value: 'flashcards' },
    { icon: <Activity size={18} />, label: 'Practice Exam', value: 'practice-exam' }
  ];

  const toolItems = [
    { icon: <PenLine size={18} />, label: 'Stationery', action: onOpenStationery },
    { icon: <Heart size={18} />, label: 'Feel Good Corner', action: onOpenFeelGood },
    { icon: <Settings size={18} />, label: 'Settings', value: 'settings' },
    { icon: <HelpCircle size={18} />, label: 'Help', value: 'help' }
  ];

  if (hideSidebar) {
    return null;
  }

  return (
    <div className="hidden md:block fixed top-0 left-0 w-60 h-full bg-white border-r border-gray-200 z-30 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">Sakha AI</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2 dark:text-gray-400">Navigation</h3>
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

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2 dark:text-gray-400">Tools</h3>
            <nav className="space-y-2">
              {toolItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start gap-3"
                  onClick={item.action || (item.value ? () => onTabChange(item.value) : undefined)}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, 
  CalendarDays, 
  GraduationCap, 
  BookOpen, 
  Brain, 
  FileText,
  Bell,
  ChevronRight,
  Smile,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  description: string;
  badge?: number | string;
  isNew?: boolean;
  isPriority?: boolean;
}

interface EnhancedNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  showLabels?: boolean;
  userPreferredTabs?: string[];
}

const EnhancedNavigation: React.FC<EnhancedNavigationProps> = ({ 
  activeTab, 
  onTabChange,
  showLabels = true,
  userPreferredTabs
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [favoriteItems, setFavoriteItems] = useState<string[]>(userPreferredTabs || []);

  // Define all available navigation items
  const allNavItems: NavItem[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, path: "/dashboard/student/overview", description: "Your personalized dashboard summary" },
    { id: "today", label: "Today's Plan", icon: CalendarDays, path: "/dashboard/student/today", description: "Daily tasks and schedule", badge: 3 },
    { 
      id: "tutor", 
      label: "24/7 AI Tutor", 
      icon: MessageSquare, 
      path: "/dashboard/student/tutor", 
      description: "Get help from our AI tutor anytime", 
      isNew: true,
      isPriority: true
    },
    { id: "academic", label: "Academic Advisor", icon: GraduationCap, path: "/dashboard/student/academic", description: "Personalized academic guidance" },
    { id: "concepts", label: "Concept Cards", icon: BookOpen, path: "/dashboard/student/concepts", description: "Key learning concepts and explanations" },
    { id: "flashcards", label: "Flashcards", icon: Brain, path: "/dashboard/student/flashcards", description: "Smart revision and memorization" },
    { id: "practice-exam", label: "Practice Exams", icon: FileText, path: "/dashboard/student/practice-exam", description: "Mock tests and exam preparation" },
    { 
      id: "feel-good-corner", 
      label: "Feel Good Corner", 
      icon: Smile, 
      path: "/dashboard/student/feel-good-corner", 
      description: "Take a break and boost your mood", 
      isPriority: true 
    },
    { id: "notifications", label: "Notifications", icon: Bell, path: "/dashboard/student/notifications", description: "Important updates and alerts", badge: 2 }
  ];
  
  // Helper function to check if a tab is active
  const isActive = (id: string) => {
    // Special case for home/dashboard root
    if (id === 'overview' && (currentPath === '/dashboard/student' || currentPath === '/')) {
      return true;
    }
    return activeTab === id || currentPath.includes(id);
  };

  // Handle tab selection
  const handleTabClick = (id: string) => {
    onTabChange(id);
  };

  // Sort items to put priority ones first
  const sortedNavItems = [...allNavItems].sort((a, b) => {
    if (a.isPriority && !b.isPriority) return -1;
    if (!a.isPriority && b.isPriority) return 1;
    return 0;
  });

  return (
    <TooltipProvider delayDuration={300}>
      <div className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-0 z-10 mb-6">
        <div className="flex items-center justify-between overflow-x-auto gap-1">
          {sortedNavItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={isActive(item.id) ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex flex-col items-center gap-1 py-2 px-3 h-auto relative",
                      isActive(item.id) 
                        ? "bg-primary/90 text-primary-foreground" 
                        : "text-muted-foreground hover:bg-accent",
                      item.isPriority && !isActive(item.id) && "bg-violet-50 dark:bg-violet-900/30"
                    )}
                    onClick={() => handleTabClick(item.id)}
                  >
                    <item.icon className="h-4 w-4" />
                    {showLabels && <span className="text-xs">{item.label}</span>}
                    
                    {/* Badge for notifications or new items */}
                    {item.badge && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                        {item.badge}
                      </Badge>
                    )}
                    
                    {/* New label */}
                    {item.isNew && !item.badge && (
                      <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full" />
                    )}
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border shadow-md text-xs">
                <p>{item.description}</p>
                {item.badge && <p className="text-primary font-semibold mt-1">{item.badge} new items</p>}
                {item.isNew && <p className="text-green-500 font-semibold mt-1">New feature</p>}
                {item.isPriority && <p className="text-violet-500 font-semibold mt-1">Recommended feature</p>}
              </TooltipContent>
            </Tooltip>
          ))}
          
          {/* More button for additional options (could expand to show more tabs) */}
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 py-2 px-3 h-auto text-muted-foreground hover:bg-accent"
          >
            <ChevronRight className="h-4 w-4" />
            {showLabels && <span className="text-xs">More</span>}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default EnhancedNavigation;

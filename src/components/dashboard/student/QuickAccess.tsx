
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  CalendarDays, 
  GraduationCap, 
  Heart,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

export const QuickAccess = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const quickLinks = [
    {
      path: '/dashboard/student/tutor',
      icon: <MessageSquare className="h-5 w-5" />,
      label: '24/7 AI Tutor'
    },
    {
      path: '/dashboard/student/studyplan',
      icon: <CalendarDays className="h-5 w-5" />,
      label: 'Study Plan'
    },
    {
      path: '/dashboard/student/academic',
      icon: <GraduationCap className="h-5 w-5" />,
      label: 'Academic Advisor'
    },
    {
      path: '/dashboard/student/feel-good-corner',
      icon: <Heart className="h-5 w-5" />,
      label: 'Feel Good Corner'
    }
  ];
  
  return (
    <div className="overflow-x-auto pb-2 mb-2">
      <div className="flex gap-3">
        {quickLinks.map((link) => {
          const isActive = currentPath === link.path;
          return (
            <motion.div 
              key={link.path}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="shrink-0"
            >
              <Link to={link.path}>
                <Button 
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={`py-2 h-auto flex items-center gap-2 ${isActive ? 'shadow-md' : ''}`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Button>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickAccess;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, GraduationCap, FileText, User } from "lucide-react";
import { motion } from "framer-motion";

export const QuickAccess = () => {
  const navigate = useNavigate();

  const quickItems = [
    {
      id: 'today',
      label: "Today's Plan",
      icon: Calendar,
      path: '/dashboard/student/today',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    },
    {
      id: 'concept',
      label: 'Concept Cards',
      icon: BookOpen,
      path: '/dashboard/student/concepts/landing',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
    },
    {
      id: 'advisor',
      label: 'Academic Advisor',
      icon: GraduationCap,
      path: '/dashboard/student/academic',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
      path: '/dashboard/student/profile',
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 }}
  };

  return (
    <div className="mb-4">
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {quickItems.map((item) => (
          <motion.div key={item.id} variants={item}>
            <Button
              variant="outline"
              className="w-full border-0 hover:bg-gray-100 dark:hover:bg-gray-800 h-auto py-3 bg-white dark:bg-gray-900 shadow-sm border-gray-200 dark:border-gray-800"
              onClick={() => navigate(item.path)}
            >
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mb-2`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

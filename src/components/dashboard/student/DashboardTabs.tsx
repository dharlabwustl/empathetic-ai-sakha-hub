
import React, { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  MessageSquare, 
  Calendar, 
  Activity, 
  LineChart, 
  Brain, 
  BookOpen, 
  Heart,
  Target,
  ListTodo,
  Video,
  Users,
  Bell
} from "lucide-react";

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabContents: Record<string, ReactNode>;
  hideTabsNav?: boolean;
}

export default function DashboardTabs({
  activeTab,
  onTabChange,
  tabContents,
  hideTabsNav = false
}: DashboardTabsProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: <Lightbulb size={16} /> },
    { id: "today", label: "Today's Focus", icon: <ListTodo size={16} /> },
    { id: "tutor", label: "24/7 Tutor", icon: <MessageSquare size={16} /> },
    { id: "academic", label: "Academic Advisor", icon: <Calendar size={16} /> },
    { id: "motivation", label: "Motivation", icon: <Activity size={16} /> },
    { id: "progress", label: "Progress", icon: <LineChart size={16} /> },
    { id: "flashcards", label: "Flashcards", icon: <Brain size={16} /> },
    { id: "materials", label: "Materials", icon: <BookOpen size={16} /> },
    { id: "goals", label: "Goals", icon: <Target size={16} /> },
    { id: "wellness", label: "Wellness", icon: <Heart size={16} /> },
    { id: "live-tutors", label: "Live Tutors", icon: <Video size={16} /> },
    { id: "forum", label: "Forum", icon: <Users size={16} /> },
    { id: "videos", label: "Videos", icon: <Video size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4
      }
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
      {!hideTabsNav && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <TabsList className="tab-scrollbar grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
            {tabs.map(tab => (
              <motion.div key={tab.id} variants={itemVariants}>
                <TabsTrigger 
                  value={tab.id} 
                  className="flex items-center gap-2 transition-all duration-300 hover:bg-violet-100/50"
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </motion.div>
      )}
      
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        key={activeTab}
      >
        <TabsContent value={activeTab} className="focus-visible:outline-none focus-visible:ring-0">
          {tabContents[activeTab] || (
            <div className="text-center p-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg text-gray-500">Coming soon...</p>
                <p className="text-sm text-gray-400 mt-2">This feature is under development</p>
              </motion.div>
            </div>
          )}
        </TabsContent>
      </motion.div>
    </Tabs>
  );
}

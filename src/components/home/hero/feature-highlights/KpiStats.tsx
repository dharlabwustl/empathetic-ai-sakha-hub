
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, Users, Award, Clock, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

export type KpiStatsType = {
  className?: string;
};

const kpiStats = [
  { icon: BookOpen, label: '15K+', description: 'Active Learning Resources', color: 'bg-blue-500' },
  { icon: Users, label: '95%', description: 'Success Rate for Students', color: 'bg-violet-500' },
  { icon: Star, label: '9.8/10', description: 'Student Satisfaction Score', color: 'bg-amber-500' },
  { icon: Award, label: '98%', description: 'Exam Pass Rate', color: 'bg-emerald-500' },
  { icon: Clock, label: '35%', description: 'Study Time Optimization', color: 'bg-rose-500' },
  { icon: BarChart, label: '100K+', description: 'Practice Questions', color: 'bg-indigo-500' }
];

const KpiStats: React.FC<KpiStatsType> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animations when component mounts
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={cn("max-w-6xl mx-auto px-4 sm:px-6", className)}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {kpiStats.slice(0, 3).map((stat, index) => (
          <KpiCard key={index} stat={stat} index={index} isVisible={isVisible} />
        ))}
      </div>
      
      <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {kpiStats.slice(3).map((stat, index) => (
          <KpiCard key={index + 3} stat={stat} index={index + 3} isVisible={isVisible} />
        ))}
      </div>
    </motion.div>
  );
};

interface KpiCardProps {
  stat: {
    icon: React.FC<any>;
    label: string;
    description: string;
    color: string;
  };
  index: number;
  isVisible: boolean;
}

const KpiCard: React.FC<KpiCardProps> = ({ stat, index, isVisible }) => {
  const IconComponent = stat.icon;
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-4 sm:p-6 flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", stat.color)}>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <IconComponent className="h-6 w-6 text-white" />
          </motion.div>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 + (0.1 * index), duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.label}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{stat.description}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default KpiStats;

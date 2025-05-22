
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const StudentJourneyBadge: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"
    >
      <GraduationCap className="h-4 w-4" />
      <span>Student Success Journey</span>
    </motion.div>
  );
};

export default StudentJourneyBadge;

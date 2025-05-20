
import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const StudentJourneyBadge: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-700/30 rounded-full px-3 py-1 mb-6"
    >
      <Award className="h-4 w-4 text-indigo-500 mr-2" />
      <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
        From Struggling Student to Exam Champion
      </span>
    </motion.div>
  );
};

export default StudentJourneyBadge;

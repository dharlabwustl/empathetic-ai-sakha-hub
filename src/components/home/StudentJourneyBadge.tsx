
import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const StudentJourneyBadge = () => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1.5"
    >
      <Award className="h-4 w-4" />
      <span>Student Success Journey</span>
    </motion.div>
  );
};

export default StudentJourneyBadge;

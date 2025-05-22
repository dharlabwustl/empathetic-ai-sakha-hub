
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const SecondaryActionButton: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-white/30 dark:bg-gray-800/30 blur-md rounded-full -z-10"></div>
      <Link
        to="/signup"
        className="relative bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl border border-indigo-200 dark:border-indigo-800 flex items-center justify-center"
      >
        <BookOpen className="h-5 w-5 mr-2" />
        <span>Start Your Journey</span>
      </Link>
    </motion.div>
  );
};

export default SecondaryActionButton;

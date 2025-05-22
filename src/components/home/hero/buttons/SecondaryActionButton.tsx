
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const SecondaryActionButton: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to="/signup"
        className="relative bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg border border-indigo-200 dark:border-indigo-800 flex items-center justify-center"
      >
        <BookOpen className="h-5 w-5 mr-2" />
        <span>Start Learning with PREPZR</span>
        
        {/* Pulse effect */}
        <motion.div 
          className="absolute -inset-0.5 rounded-full opacity-50 blur-sm"
          animate={{
            background: [
              "linear-gradient(90deg, rgba(99, 102, 241, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)",
              "linear-gradient(90deg, rgba(99, 102, 241, 0.3) 0%, rgba(124, 58, 237, 0.3) 100%)",
              "linear-gradient(90deg, rgba(99, 102, 241, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)"
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror"
          }}
          style={{ zIndex: -1 }}
        />
      </Link>
    </motion.div>
  );
};

export default SecondaryActionButton;

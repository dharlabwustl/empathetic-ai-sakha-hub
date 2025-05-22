
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const SecondaryActionButton: React.FC = () => {
  const redirectToSignup = () => {
    // Redirect to app.domain.com/signup if needed
    window.location.href = window.location.hostname.includes('localhost') 
      ? '/signup' 
      : `${window.location.protocol}//app.${window.location.hostname.replace('www.', '')}/signup`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <motion.div 
        className="absolute inset-0 bg-white/50 dark:bg-gray-800/40 blur-md rounded-full -z-10"
        animate={{ 
          boxShadow: [
            "0 0 0 rgba(79, 70, 229, 0.1)", 
            "0 0 15px rgba(79, 70, 229, 0.4)", 
            "0 0 0 rgba(79, 70, 229, 0.1)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <Link
        to="/signup"
        onClick={(e) => {
          e.preventDefault();
          redirectToSignup();
        }}
        className="relative bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl border border-indigo-200 dark:border-indigo-800 flex items-center justify-center group"
      >
        <BookOpen className="h-5 w-5 mr-2 group-hover:animate-pulse" />
        <span className="relative">
          <span>Start Your Journey</span>
          <motion.span 
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400 dark:bg-indigo-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{ originX: 0 }}
          />
        </span>
      </Link>
    </motion.div>
  );
};

export default SecondaryActionButton;

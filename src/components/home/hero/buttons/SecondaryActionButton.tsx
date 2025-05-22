
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SecondaryActionButton: React.FC = () => {
  // Helper function to handle subdomain navigation
  const handleClick = () => {
    const hostname = window.location.hostname;
    // Check if we're already on the app subdomain
    if (!hostname.startsWith('app.')) {
      // If local development, use different approach
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        window.location.href = `/login`;
      } else {
        // For production, redirect to app subdomain
        const domain = hostname.includes('.') ? 
          hostname.substring(hostname.indexOf('.') + 1) : hostname;
        window.location.href = `https://app.${domain}/login`;
      }
    } else {
      window.location.href = `/login`;
    }
  };
  
  return (
    <motion.button
      onClick={handleClick}
      className="relative bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-500 hover:border-indigo-600 dark:border-indigo-500 font-bold py-3 px-5 sm:px-7 rounded-full shadow-md hover:shadow-lg flex items-center justify-center text-sm sm:text-base group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="mr-2">Student Login</span>
      <motion.div
        className="opacity-75 group-hover:opacity-100"
        animate={{ x: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowRight className="h-5 w-5" />
      </motion.div>
    </motion.button>
  );
};

export default SecondaryActionButton;

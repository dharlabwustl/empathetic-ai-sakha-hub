
import React from 'react';
import { motion } from 'framer-motion';

const DashboardLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 to-violet-500 blur-lg"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <img 
            src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
            alt="Sakha AI" 
            className="w-24 h-24 mx-auto relative z-10" 
          />
        </div>
        <h2 className="text-2xl font-medium mb-3">Generating your smart study plan...</h2>
        <p className="text-muted-foreground">Personalizing your learning experience</p>
        
        <div className="mt-10 max-w-sm mx-auto">
          <div className="space-y-4">
            <div className="flex items-center">
              <motion.div 
                className="h-3 w-3 bg-sky-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="mr-3"
              />
              <p className="text-sm">Analyzing exam syllabus...</p>
            </div>
            <div className="flex items-center">
              <motion.div 
                className="h-3 w-3 bg-violet-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                className="mr-3"
              />
              <p className="text-sm">Creating personalized study calendar...</p>
            </div>
            <div className="flex items-center">
              <motion.div 
                className="h-3 w-3 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                className="mr-3"
              />
              <p className="text-sm">Generating adaptive flashcards...</p>
            </div>
          </div>
          <motion.div 
            className="mt-8 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
            initial={{ width: "100%" }}
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-sky-500 to-violet-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;

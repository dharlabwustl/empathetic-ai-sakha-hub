import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Users2, BookOpenCheck, HeartHandshake } from "lucide-react";

const SurroundingInfluencesSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
      >
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
          Study Environment
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Optimize your study space for maximum focus and productivity.
        </p>
        <ul className="list-disc pl-5 mt-3 text-sm text-gray-600 dark:text-gray-400">
          <li>Minimize distractions</li>
          <li>Ensure good lighting</li>
          <li>Keep your space organized</li>
        </ul>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
      >
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Users2 className="mr-2 h-5 w-5 text-blue-500" />
          Social Connections
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Connect with peers and mentors for support and collaboration.
        </p>
        <ul className="list-disc pl-5 mt-3 text-sm text-gray-600 dark:text-gray-400">
          <li>Join study groups</li>
          <li>Seek advice from mentors</li>
          <li>Share your progress with friends</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default SurroundingInfluencesSection;

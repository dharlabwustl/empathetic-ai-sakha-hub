
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const CommunityStat: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
      className="mt-4 text-center"
    >
      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-green-600" />
        Join <span className="font-bold text-indigo-600 dark:text-indigo-400">2M+ students</span> achieving exam success with AI
      </p>
    </motion.div>
  );
};

export default CommunityStat;

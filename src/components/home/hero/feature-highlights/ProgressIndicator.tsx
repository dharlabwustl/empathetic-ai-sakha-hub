
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  categories: string[];
  activeTab: string;
}

const ProgressIndicator = ({ categories, activeTab }: ProgressIndicatorProps) => {
  return (
    <div className="flex justify-center gap-1 mt-2">
      {categories.map((category) => (
        <motion.div
          key={category}
          className={`h-1.5 w-1.5 rounded-full ${activeTab === category 
            ? 'bg-purple-500' 
            : 'bg-purple-200 dark:bg-purple-800/40'}`}
          animate={{
            scale: activeTab === category ? [1, 1.2, 1] : 1,
            transition: { repeat: activeTab === category ? Infinity : 0, duration: 2 }
          }}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;

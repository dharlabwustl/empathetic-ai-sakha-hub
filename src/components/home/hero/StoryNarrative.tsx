
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface StoryNarrativeProps {
  onClose: () => void;
}

const StoryNarrative: React.FC<StoryNarrativeProps> = ({ onClose }) => {
  // Story sections with animations
  const storyVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.2,
        duration: 0.5 
      } 
    })
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative w-full max-w-4xl max-h-[80vh] bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-auto p-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          The Student's Journey: From Struggle to Success
        </h2>
        
        <div className="space-y-6">
          <motion.div 
            custom={0}
            variants={storyVariants}
            initial="hidden"
            animate="visible"
            className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-2 text-purple-700 dark:text-purple-300">The Challenge</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Meet Aanya, a bright student from Jaipur with dreams of becoming a doctor. Despite her intelligence,
              Aanya struggled with NEET preparation. The vast syllabus overwhelmed her, causing anxiety and self-doubt.
              Her inconsistent study habits and lack of proper guidance led to frustration as her mock test scores remained stagnant.
            </p>
          </motion.div>
          
          <motion.div 
            custom={1}
            variants={storyVariants}
            initial="hidden"
            animate="visible"
            className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-2 text-blue-700 dark:text-blue-300">The Turning Point</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Everything changed when Aanya discovered our personalized learning platform. The initial assessment 
              revealed her precise strengths and weaknesses. The AI tutor adapted to her unique learning style, and 
              the personalized study plan focused on her areas of improvement. For the first time, Aanya felt someone
              truly understood not just what she needed to learn, but how she learned best.
            </p>
          </motion.div>
          
          <motion.div 
            custom={2}
            variants={storyVariants}
            initial="hidden"
            animate="visible"
            className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-300">The Transformation</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Within weeks, Aanya noticed remarkable progress. The bite-sized concept cards made complex topics digestible.
              The flashcard system helped information stick. Her confidence grew with every practice exam, and the
              real-time feedback helped her refine her approach. Most importantly, the platform adapted to her emotional state,
              providing motivation when she felt overwhelmed and challenging her when she was ready.
            </p>
          </motion.div>
          
          <motion.div 
            custom={3}
            variants={storyVariants}
            initial="hidden"
            animate="visible"
            className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-2 text-amber-700 dark:text-amber-300">The Achievement</h3>
            <p className="text-gray-700 dark:text-gray-300">
              On exam day, Aanya walked in with confidence that comes from proper preparation. The stress management
              techniques she learned helped her remain calm and focused. When results were announced, she had scored 
              in the 98th percentile, securing admission to her dream medical college. Today, Aanya attributes her success
              not just to hard work, but to finding a learning companion that truly understood her needs as a student.
            </p>
          </motion.div>
          
          <motion.div 
            custom={4}
            variants={storyVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 text-center"
          >
            <p className="text-lg font-medium text-purple-600 dark:text-purple-400">
              Your journey to success can begin today. Let us be your guide.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              Begin Your Success Story
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StoryNarrative;

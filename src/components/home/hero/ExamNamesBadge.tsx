
import { motion } from 'framer-motion';

const ExamNamesBadge = () => {
  const badgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5 
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  return (
    <motion.div
      variants={badgeVariants}
      initial="hidden"
      animate="visible"
      className="max-w-lg mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full py-3 px-6 shadow-md flex flex-wrap justify-center items-center gap-3"
    >
      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Trusted by students preparing for:</span>
      
      <motion.span 
        custom={1}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1.5 rounded-full border-2 border-purple-200 dark:border-purple-900 shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
      >
        UPSC
      </motion.span>
      
      <motion.span 
        custom={2}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="font-bold text-lg text-white bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-1.5 rounded-full border-2 border-blue-200 dark:border-blue-900 shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
      >
        NEET
      </motion.span>
      
      <motion.span 
        custom={3}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="font-bold text-lg text-white bg-gradient-to-r from-fuchsia-600 to-pink-600 px-4 py-1.5 rounded-full border-2 border-pink-200 dark:border-pink-900 shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
      >
        IIT-JEE
      </motion.span>
    </motion.div>
  );
};

export default ExamNamesBadge;

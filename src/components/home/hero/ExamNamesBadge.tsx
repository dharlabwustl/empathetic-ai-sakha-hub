
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
        className="font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2 rounded-full border-2 border-purple-200 dark:border-purple-900 shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl ring-2 ring-purple-300 dark:ring-purple-800"
        whileHover={{ 
          scale: 1.1,
          textShadow: "0 0 8px rgb(255, 255, 255)",
          boxShadow: "0 0 8px rgba(139, 92, 246, 0.6)"
        }}
      >
        UPSC
      </motion.span>
      
      <motion.span 
        custom={2}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="font-bold text-lg text-white bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2 rounded-full border-2 border-blue-200 dark:border-blue-900 shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl ring-2 ring-blue-300 dark:ring-blue-800"
        whileHover={{ 
          scale: 1.1, 
          textShadow: "0 0 8px rgb(255, 255, 255)",
          boxShadow: "0 0 8px rgba(59, 130, 246, 0.6)"
        }}
      >
        NEET
      </motion.span>
      
      <motion.span 
        custom={3}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="font-bold text-lg text-white bg-gradient-to-r from-fuchsia-600 to-pink-600 px-5 py-2 rounded-full border-2 border-pink-200 dark:border-pink-900 shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl ring-2 ring-pink-300 dark:ring-pink-800"
        whileHover={{ 
          scale: 1.1,
          textShadow: "0 0 8px rgb(255, 255, 255)",
          boxShadow: "0 0 8px rgba(219, 39, 119, 0.6)"
        }}
      >
        IIT-JEE
      </motion.span>
    </motion.div>
  );
};

export default ExamNamesBadge;

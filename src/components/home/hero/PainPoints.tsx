import { motion } from "framer-motion";
import { Clock, CheckCircle, AlertTriangle, Target, Zap, ScrollText, Brain, Smile, ArrowRight } from "lucide-react";

interface PainPointsProps {
  painPoints: string[];
  solutions: string[];
}

const PainPoints = ({ painPoints, solutions }: PainPointsProps) => {
  // Create factor icons based on the first image
  const factorIcons = [
    { name: "Peer Anxiety", icon: <AlertTriangle size={16} className="text-orange-500" /> },
    { name: "Doubts/Digital Space", icon: <ScrollText size={16} className="text-sky-500" /> },
    { name: "Materials/Notes", icon: <Brain size={16} className="text-indigo-500" /> },
    { name: "Stress & Fear of Failure", icon: <Zap size={16} className="text-red-500" /> },
    { name: "Self Direction", icon: <Target size={16} className="text-green-500" /> },
    { name: "Parental Support", icon: <Smile size={16} className="text-amber-500" /> }
  ];
  
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };
  
  const factorVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10 
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: { type: "spring", stiffness: 300 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 8,
        delay: 0.1 * custom
      }
    }),
    hover: {
      x: 10,
      transition: { type: "spring", stiffness: 300 }
    }
  };
  
  const headingVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 8 
      }
    }
  };
  
  const glowVariants = {
    initial: { 
      boxShadow: "0 0 0 rgba(139, 92, 246, 0)" 
    },
    animate: { 
      boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      } 
    }
  };
  
  return (
    <motion.div 
      className="mb-8 bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-violet-100 shadow-md relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 100 }}
      animate="animate"
    >
      {/* Decorative background elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl"></div>
      
      {/* Ecosystem factors visualization */}
      <motion.div 
        className="mb-6 flex flex-wrap gap-2"
        variants={containerVariants}
      >
        {factorIcons.map((factor, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-violet-100 text-xs shadow-sm"
            variants={factorVariants}
            custom={index}
            whileHover="hover"
          >
            <div className="p-1 rounded-full bg-violet-50">{factor.icon}</div>
            {factor.name}
          </motion.div>
        ))}
      </motion.div>
      
      <motion.h3 
        className="font-semibold text-xl mb-4 text-violet-800 border-b border-violet-100 pb-2"
        variants={headingVariants}
      >
        We understand your struggles:
      </motion.h3>
      
      <motion.ul className="space-y-3 mb-6" variants={containerVariants}>
        {painPoints.map((point, index) => (
          <motion.li 
            key={index}
            className="flex items-center gap-3 text-gray-700 group"
            variants={itemVariants}
            custom={index}
            whileHover="hover"
          >
            <motion.div 
              className="bg-red-100 p-1.5 rounded-full shadow-sm group-hover:bg-red-200 transition-colors"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Clock size={18} className="text-red-500" />
            </motion.div>
            <span className="font-medium">{point}</span>
          </motion.li>
        ))}
      </motion.ul>
      
      <motion.div
        className="flex justify-center my-4"
        variants={headingVariants}
      >
        <motion.div 
          className="p-2 rounded-full bg-gradient-to-r from-red-100 to-green-100 shadow-sm"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            rotate: { repeat: Infinity, duration: 8, ease: "linear" },
            scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
        >
          <ArrowRight className="text-violet-500" size={24} />
        </motion.div>
      </motion.div>
      
      <motion.h3 
        className="font-semibold text-xl mb-4 text-violet-800 border-b border-violet-100 pb-2"
        variants={headingVariants}
      >
        How Sakha helps you:
      </motion.h3>
      
      <motion.ul className="space-y-3" variants={containerVariants}>
        {solutions.map((solution, index) => (
          <motion.li 
            key={index}
            className="flex items-center gap-3 text-gray-700 group"
            variants={itemVariants}
            custom={index}
            whileHover="hover"
          >
            <motion.div 
              className="bg-green-100 p-1.5 rounded-full shadow-sm group-hover:bg-green-200 transition-colors"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CheckCircle size={18} className="text-green-500" />
            </motion.div>
            <span className="font-medium">{solution}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

// Default props
PainPoints.defaultProps = {
  painPoints: [
    "Overwhelming syllabus",
    "Time management issues",
    "Lack of personalized guidance",
    "Test anxiety",
    "Inconsistent progress tracking"
  ],
  solutions: [
    "Personalized study plans",
    "AI-powered tutoring",
    "Real-time progress tracking",
    "Mock tests with analysis",
    "Exam-specific strategies"
  ]
};

export default PainPoints;

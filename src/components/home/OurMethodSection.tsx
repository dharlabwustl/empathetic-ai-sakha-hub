
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Award, 
  BarChart, 
  FileCheck, 
  BookOpen, 
  GraduationCap, 
  Layers, 
  Rocket 
} from 'lucide-react';
import { cn } from '@/lib/utils';

type MethodFeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  index: number;
  isActive: boolean;
  onHover: () => void;
};

const MethodFeature: React.FC<MethodFeatureProps> = ({ 
  icon, 
  title, 
  description, 
  color, 
  index,
  isActive,
  onHover 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isActive ? 1.05 : 1,
        boxShadow: isActive ? "0 10px 25px -5px rgba(0, 0, 0, 0.2)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      whileHover={{ scale: 1.05 }}
      viewport={{ once: true }}
      className={cn(
        "flex flex-col items-center text-center p-5 rounded-xl",
        "transition-all duration-300 cursor-pointer",
        "border border-gray-100 dark:border-gray-700",
        isActive 
          ? "bg-white/90 dark:bg-gray-800/90 shadow-xl" 
          : "bg-white/70 dark:bg-gray-800/70 shadow-md"
      )}
      onMouseEnter={onHover}
      onClick={onHover}
    >
      <div className={`p-3 rounded-full ${color} mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </motion.div>
  );
};

// AI Engine Animation Component
const AIEngine: React.FC<{ activeIndex: number }> = ({ activeIndex }) => {
  const variants = {
    idle: {
      scale: 1,
      opacity: 0.7,
      filter: "blur(3px)",
    },
    active: {
      scale: 1.1,
      opacity: 0.9,
      filter: "blur(1px)",
    }
  };

  // Calculate color based on active index
  const getGradientColors = () => {
    const colors = [
      ["from-purple-600", "to-blue-600"],
      ["from-blue-600", "to-cyan-600"],
      ["from-cyan-600", "to-teal-600"],
      ["from-teal-600", "to-green-600"],
      ["from-green-600", "to-emerald-600"],
      ["from-emerald-600", "to-yellow-600"],
      ["from-yellow-600", "to-orange-600"],
      ["from-orange-600", "to-red-600"]
    ];
    
    return colors[activeIndex % colors.length];
  };

  const [fromColor, toColor] = getGradientColors();

  return (
    <motion.div 
      className={`absolute inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none`}
    >
      <motion.div
        className={`w-[800px] h-[800px] rounded-full bg-gradient-to-br ${fromColor} ${toColor} opacity-10 dark:opacity-20 absolute`}
        variants={variants}
        animate={activeIndex >= 0 ? "active" : "idle"}
        transition={{ duration: 1.5, type: "spring" }}
      />
      <motion.div 
        className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-70 blur-lg"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* AI Engine Core */}
      <motion.div 
        className="absolute"
        animate={{ 
          rotate: 360,
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-80 h-80 rounded-full border-2 border-blue-400/30 dark:border-blue-500/30 relative">
          <motion.div
            className="absolute w-4 h-4 bg-blue-500 rounded-full"
            style={{ top: "10%", left: "50%" }}
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: activeIndex * 0.2,
            }}
          />
          <motion.div
            className="absolute w-3 h-3 bg-purple-500 rounded-full"
            style={{ top: "50%", right: "10%" }}
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.3, 1],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              delay: activeIndex * 0.15,
            }}
          />
          <motion.div
            className="absolute w-5 h-5 bg-cyan-500 rounded-full"
            style={{ bottom: "20%", left: "30%" }}
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              delay: activeIndex * 0.1,
            }}
          />
        </div>
      </motion.div>
      
      {/* Connected nodes */}
      <motion.div className="absolute w-64 h-64 border border-dashed border-blue-300/30 dark:border-blue-500/30 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Display the active feature title */}
      {activeIndex >= 0 && (
        <motion.div 
          className="absolute -bottom-48 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-blue-600/10 dark:bg-blue-900/20 backdrop-blur-sm py-2 px-6 rounded-full inline-block">
            <motion.span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              AI Processing...
            </motion.span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const OurMethodSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      title: "Student Assessment",
      description: "Comprehensive evaluation of student's current knowledge, learning style, and study habits to create a personalized foundation.",
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      title: "Hyper Personalization",
      description: "AI-driven approach that adapts to your unique learning style, mood, and schedule for maximum effectiveness.",
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: <BarChart className="w-6 h-6 text-cyan-600" />,
      title: "Smart Study Plan",
      description: "Dynamically adjusted study schedules that focus on your weak areas while maintaining progress in your strengths.",
      color: "bg-cyan-100 dark:bg-cyan-900/30",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-green-600" />,
      title: "Concept Cards",
      description: "Interactive bite-sized learning modules that break down complex topics into easily digestible information.",
      color: "bg-green-100 dark:bg-green-900/30",
    },
    {
      icon: <FileCheck className="w-6 h-6 text-emerald-600" />,
      title: "Flash Cards",
      description: "Spaced repetition system that ensures long-term retention of key concepts and formulas.",
      color: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-yellow-600" />,
      title: "Practice Exams",
      description: "Simulated test environments with real-time analysis and detailed performance feedback.",
      color: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      icon: <Award className="w-6 h-6 text-orange-600" />,
      title: "Exam Readiness Score",
      description: "Proprietary metric that accurately predicts your exam performance and highlights areas needing attention.",
      color: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
      icon: <Rocket className="w-6 h-6 text-red-600" />,
      title: "AI Engine Support",
      description: "Round-the-clock intelligent assistance that answers questions and provides guidance at every step.",
      color: "bg-red-100 dark:bg-red-900/30",
    },
  ];

  // Auto rotate through features
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [autoPlay, features.length]);

  // Pause autoplay when user interacts
  const handleFeatureHover = (index: number) => {
    setActiveIndex(index);
    setAutoPlay(false);
    
    // Resume autoplay after 10 seconds of inactivity
    const timeout = setTimeout(() => {
      setAutoPlay(true);
    }, 10000);
    
    return () => clearTimeout(timeout);
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 -z-10" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Our Champion-Making Methodology
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            We transform aspirants into champions through our data-driven, AI-powered learning ecosystem
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
        </motion.div>

        {/* AI Engine Animation in Background */}
        <div className="relative h-[500px] mb-12">
          <AIEngine activeIndex={activeIndex} />
          
          {/* Features displayed in a circle around the AI engine */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {features.map((feature, index) => (
                <MethodFeature
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color}
                  index={index}
                  isActive={activeIndex === index}
                  onHover={() => handleFeatureHover(index)}
                />
              ))}
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl shadow-md max-w-3xl mx-auto backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">
              A complete ecosystem designed for your success
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Every feature of our platform is meticulously crafted to work together, creating a seamless learning experience that adapts to your needs and helps you achieve your goals.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurMethodSection;

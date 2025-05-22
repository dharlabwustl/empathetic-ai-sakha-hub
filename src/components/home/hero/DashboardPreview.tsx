
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, PieChart, Calendar, BookMarked, GraduationCap } from 'lucide-react';

interface DashboardPreviewProps {
  activeFeature: number;
  setActiveFeature: React.Dispatch<React.SetStateAction<number>>;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ activeFeature, setActiveFeature }) => {
  const features = [
    {
      title: "Smart Study Plan",
      description: "AI-generated study plans personalized to your learning style and pace",
      icon: <Calendar className="h-5 w-5" />,
      image: "/lovable-uploads/16da1ff5-9fab-4b4b-bd21-5977748acd16.png",
      highlight: "Your daily progress at a glance"
    },
    {
      title: "Concept Cards",
      description: "Interactive visual learning for complex topics",
      icon: <BookMarked className="h-5 w-5" />,
      image: "/lovable-uploads/1bd9164d-90e1-4088-b058-0fa5966be194.png",
      highlight: "Master difficult concepts with ease"
    },
    {
      title: "Performance Analytics",
      description: "Track your progress with detailed insights",
      icon: <PieChart className="h-5 w-5" />,
      image: "/lovable-uploads/26a404be-3145-4a01-9204-8e74a5984c36.png",
      highlight: "Know exactly where you stand"
    },
    {
      title: "Practice Exams",
      description: "Realistic exam simulations with instant feedback",
      icon: <GraduationCap className="h-5 w-5" />,
      image: "/lovable-uploads/63143d4f-73cd-4fca-a1dd-82e6a5313142.png",
      highlight: "Build confidence through practice"
    },
    {
      title: "AI Tutor",
      description: "24/7 support for all your academic queries",
      icon: <BookOpen className="h-5 w-5" />,
      image: "/lovable-uploads/357a0e22-3fec-4a5c-808e-0540d5f7ba05.png",
      highlight: "Never get stuck again"
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full lg:w-1/2 flex flex-col items-center relative"
    >
      {/* Dashboard preview container with 3D effect */}
      <div className="relative w-full max-w-lg perspective-1000 preserve-3d">
        {/* Animated screen glow */}
        <motion.div 
          className="absolute inset-2 bg-blue-400/20 dark:bg-blue-500/20 rounded-xl blur-xl"
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [0.98, 1.01, 0.98]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Dashboard frame */}
        <motion.div 
          className="relative bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-950 rounded-xl shadow-xl overflow-hidden border border-gray-700 depth-shadow"
          animate={{ 
            rotateX: [0, 2, 0, -2, 0], 
            rotateY: [0, -3, 0, 3, 0] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Screen content */}
          <div className="p-1 relative">
            {/* Dashboard header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 p-3 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-white text-xs font-medium">PREPZR Dashboard</div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse mr-1"></div>
                <div className="text-xs text-gray-400">Live</div>
              </div>
            </div>

            {/* Feature images/content with animated transitions */}
            <div className="relative aspect-video w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img 
                    src={features[activeFeature].image} 
                    alt={features[activeFeature].title}
                    className="w-full h-full object-cover object-top"
                  />
                  
                  {/* Feature highlight overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold">{features[activeFeature].title}</h3>
                    <p className="text-white/80 text-sm">{features[activeFeature].highlight}</p>
                  </div>
                  
                  {/* Animated cursor */}
                  <motion.div 
                    className="absolute w-5 h-5 border-2 border-yellow-400 rounded-full flex items-center justify-center pointer-events-none"
                    animate={{ 
                      x: [100, 250, 180, 300],
                      y: [150, 100, 200, 120],
                      scale: [1, 0.8, 1]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                  </motion.div>
                  
                  {/* Click effect */}
                  <motion.div
                    className="absolute w-8 h-8 bg-white/30 rounded-full pointer-events-none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1, 1.5],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 2.5
                    }}
                    style={{ left: '220px', top: '140px' }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Feature selector/navigation */}
            <div className="bg-gray-800 dark:bg-gray-800 p-2 rounded-b-lg">
              <div className="flex justify-between items-center">
                {features.map((feature, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`flex flex-col items-center p-2 rounded ${
                      activeFeature === index 
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-gray-400 hover:text-gray-200'
                    } transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="p-1.5 rounded-full bg-gray-700/50">
                      {feature.icon}
                    </div>
                    <span className="text-xs mt-1 hidden md:block">{feature.title.split(" ")[0]}</span>
                    
                    {activeFeature === index && (
                      <motion.div 
                        className="h-0.5 w-full bg-blue-400 mt-1"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Feature description */}
      <motion.div 
        className="mt-6 text-center max-w-md"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {features[activeFeature].title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {features[activeFeature].description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;

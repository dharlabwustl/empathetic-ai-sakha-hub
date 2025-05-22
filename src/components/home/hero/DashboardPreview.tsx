
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
      {/* Dashboard preview container with enhanced 3D effect */}
      <div className="relative w-full max-w-lg perspective-1000 preserve-3d">
        {/* Animated screen glow */}
        <motion.div 
          className="absolute inset-2 bg-blue-400/30 dark:bg-blue-500/30 rounded-xl blur-xl"
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
                  
                  {/* Happy Student Avatar */}
                  <motion.div 
                    className="absolute bottom-4 right-4 h-12 w-12 bg-white/90 rounded-full border-2 border-green-300 shadow-lg overflow-hidden"
                    animate={{ 
                      y: [0, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <img 
                      src="/lovable-uploads/357a0e22-3fec-4a5c-808e-0540d5f7ba05.png"
                      alt="Happy Student" 
                      className="w-full h-full object-cover"
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-300 to-green-500"
                      animate={{
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  </motion.div>
                  
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
                  
                  {/* Exam Readiness Score */}
                  {activeFeature === 2 && (
                    <motion.div 
                      className="absolute top-4 right-4 w-16 h-16 bg-blue-600/80 rounded-full flex items-center justify-center"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <div className="text-center">
                        <motion.div 
                          className="text-xl font-bold text-white"
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          85%
                        </motion.div>
                        <div className="text-[10px] text-white/80">Readiness</div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* NEET Live Now Button */}
                  <motion.button
                    className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded-full px-3 py-1.5 flex items-center shadow-lg"
                    animate={{ 
                      y: [0, -3, 0],
                      boxShadow: [
                        '0 0 0 0 rgba(16, 185, 129, 0)',
                        '0 0 0 10px rgba(16, 185, 129, 0.2)',
                        '0 0 0 0 rgba(16, 185, 129, 0)'
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <span className="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse"></span>
                    NEET Live Now
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Navigation Panel - No tabs, just indicators */}
            <div className="bg-gray-800 dark:bg-gray-800 p-2 rounded-b-lg">
              <div className="flex justify-between items-center px-2">
                <div className="flex space-x-1">
                  {features.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-1.5 w-8 rounded-full ${
                        activeFeature === index 
                          ? 'bg-blue-500' 
                          : 'bg-gray-600'
                      }`}
                      initial={{ opacity: 0.5 }}
                      animate={{ 
                        opacity: activeFeature === index ? 1 : 0.5,
                        width: activeFeature === index ? 32 : 20
                      }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setActiveFeature(index)}
                    />
                  ))}
                </div>
                
                <div className="text-xs text-gray-400">
                  {activeFeature + 1}/{features.length}
                </div>
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

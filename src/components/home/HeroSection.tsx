
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroButtons from './hero/HeroButtons';
import HeroContent from './hero/HeroContent';
import HeroSlider from './hero/HeroSlider';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Handler for exam readiness analyzer
  const handleExamReadinessClick = () => {
    // Dispatch event to open the exam readiness analyzer
    window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 py-16 md:py-24 relative overflow-hidden">
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200/30 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            x: [0, 30, 0], 
            y: [0, -50, 0] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute top-0 right-1/4 w-72 h-72 bg-purple-200/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 0.8, 1], 
            x: [0, -20, 0], 
            y: [0, 20, 0] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.1, 1], 
            x: [0, 20, 0], 
            y: [0, 30, 0] 
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 4
          }}
        />
        
        {/* Additional decorative elements */}
        <motion.svg 
          className="absolute -bottom-20 right-0 w-64 h-64 text-indigo-100 dark:text-indigo-900/20 opacity-20" 
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <path fill="currentColor" d="M42,-65.9C55.8,-59,69.5,-50.9,76.8,-39C84.1,-27.1,85.1,-11.3,83.5,4.1C81.8,19.6,77.5,34.7,68.7,46.3C59.9,57.9,46.6,65.9,32.8,69.2C19,72.4,4.7,71,-8.3,66.9C-21.4,62.8,-33.3,56.1,-44.1,47.2C-54.8,38.3,-64.5,27.3,-69.2,14.5C-73.9,1.7,-73.6,-12.8,-68.7,-25C-63.9,-37.1,-54.4,-46.8,-43.3,-54.7C-32.1,-62.7,-19.3,-68.9,-3.9,-63.8C11.5,-58.7,28.2,-42.4,42,-65.9Z" transform="translate(100 100)" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          {/* Left Content: Title, description and buttons */}
          <motion.div 
            className="lg:w-1/2 pt-8 lg:pt-0 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Smart Data. Real Impact. Humanizing exam prep.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Our AI-powered platform creates personalized study plans, targeted practice sessions, 
              and tracks your progress to ensure exam success with less stress.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                onClick={() => navigate('/signup')}
              >
                Start Free Trial
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 font-medium text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center w-full sm:w-auto"
                onClick={handleExamReadinessClick}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Check Exam Readiness
              </motion.button>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-1">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-300">
                    {i < 3 ? (
                      <img 
                        src={`/assets/images/avatar-${i+1}.png`} 
                        alt={`User ${i+1}`}
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/assets/images/default-avatar.png";
                        }}
                      />
                    ) : (
                      <span>{i === 3 ? "+99" : ""}</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">5,000+</span> students already improving their scores
              </p>
            </div>
          </motion.div>
          
          {/* Right Content: Animated Slider */}
          <HeroSlider 
            activeSlide={activeSlide} 
            setActiveSlide={setActiveSlide}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

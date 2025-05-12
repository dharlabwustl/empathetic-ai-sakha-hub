
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeroButtons from "@/components/home/hero/HeroButtons";
import { useMediaQuery } from "@/hooks/use-media-query";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobileOrTablet = useMediaQuery("(max-width: 1024px)");
  const [exploreFeatures, setExploreFeatures] = useState(false);
  
  const handleExploreFeatures = () => {
    setExploreFeatures(true);
    const featuresElement = document.getElementById('features');
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleAnalyzeClick = () => {
    navigate('/login');
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-950 pt-16 md:pt-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Hindi Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3"
            style={{ fontFamily: "'Poppins', 'Noto Sans', sans-serif" }}
          >
            अब तैयारी करो अपने तरीके से, सिर्फ PREPZR के साथ!
          </motion.h1>
          
          {/* English Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6"
          >
            We Understand Your Mindset, Not Just the Exam.
          </motion.p>
          
          {/* Animated Highlight Text */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="relative mx-auto max-w-3xl mb-10 py-4"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-300/30 via-blue-300/30 to-pink-300/30 dark:from-purple-800/20 dark:via-blue-800/20 dark:to-pink-800/20 rounded-lg blur-xl"></div>
            <div className="relative">
              {/* Animated text with gradient */}
              <div className="flex overflow-hidden">
                <motion.div
                  animate={{
                    x: [0, -100, -200, -300, -400, 0],
                    transition: {
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 20,
                        ease: "linear",
                      },
                    },
                  }}
                  className="flex flex-shrink-0 whitespace-nowrap"
                >
                  <span className="text-xl md:text-2xl font-medium mx-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                    Ace your exams
                  </span>
                  <span className="text-xl md:text-2xl font-medium mx-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                    Save time
                  </span>
                  <span className="text-xl md:text-2xl font-medium mx-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-emerald-500">
                    Stress free
                  </span>
                  <span className="text-xl md:text-2xl font-medium mx-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-yellow-500">
                    Study smarter
                  </span>
                  <span className="text-xl md:text-2xl font-medium mx-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-500">
                    Crack your exams
                  </span>
                  {/* Duplicate for seamless loop */}
                  <span className="text-xl md:text-2xl font-medium mx-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                    Ace your exams
                  </span>
                  <span className="text-xl md:text-2xl font-medium mx-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                    Save time
                  </span>
                  <span className="text-xl md:text-2xl font-medium mx-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-emerald-500">
                    Stress free
                  </span>
                  <span className="text-xl md:text-2xl font-medium mx-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-yellow-500">
                    Study smarter
                  </span>
                  <span className="text-xl md:text-2xl font-medium mx-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-500">
                    Crack your exams
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <HeroButtons 
              scrollToFeatures={handleExploreFeatures}
              onAnalyzeClick={handleAnalyzeClick}
            />
          </motion.div>
        </div>
        
        {/* We removed the dashboard preview image as requested */}
        
      </div>
      
      {/* Enhanced Gradient background */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%+11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#9089fc] to-[#80ffea] opacity-20 sm:left-[calc(50%+30rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
};

export default HeroSection;

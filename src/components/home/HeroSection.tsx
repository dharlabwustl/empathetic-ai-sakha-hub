
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeroButtons from "@/components/home/hero/HeroButtons";
import { useMediaQuery } from "@/hooks/use-media-query";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobileOrTablet = useMediaQuery("(max-width: 1024px)");
  const [exploreFeatures, setExploreFeatures] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState(0);
  
  const highlightPhrases = [
    "Ace your exams",
    "Save time",
    "Stress free",
    "Study smarter",
    "Crack your exams"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlight(prev => (prev + 1) % highlightPhrases.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
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
          {/* Hindi Text - Line 1 */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ 
              fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
              lineHeight: 1.2
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-600 dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400">
              अब तैयारी करो अपने तरीके से, सिर्फ PREPZR के साथ!
            </span>
          </motion.h1>
          
          {/* English Text - Line 2 */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto max-w-2xl text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            We Understand Your Mindset, Not Just the Exam.
          </motion.p>
          
          {/* Animated Highlight Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="relative h-16 sm:h-20 mb-10 overflow-hidden"
          >
            <div className="absolute w-full flex justify-center items-center">
              {highlightPhrases.map((phrase, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ 
                    opacity: currentHighlight === index ? 1 : 0,
                    y: currentHighlight === index ? 0 : 40
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
                  style={{ 
                    background: "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  {phrase}
                </motion.span>
              ))}
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
      </div>
      
      {/* Gradient background */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
};

export default HeroSection;

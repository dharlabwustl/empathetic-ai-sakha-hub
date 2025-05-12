
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
  
  // Define highlight phrases for animation
  const highlights = [
    "Ace your exams",
    "Save time",
    "Stress free",
    "Study smarter",
    "Crack your exams"
  ];
  
  // Animation for text gradient
  const gradientTextAnimation = {
    background: [
      "linear-gradient(to right, #ff6b6b, #556270)",
      "linear-gradient(to right, #4facfe, #00f2fe)",
      "linear-gradient(to right, #43e97b, #38f9d7)",
      "linear-gradient(to right, #fa709a, #fee140)",
      "linear-gradient(to right, #8e2de2, #4a00e0)"
    ],
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    transition: { duration: 3, repeat: Infinity, repeatType: "reverse" as const }
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-950 pt-16 md:pt-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Hindi tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-3"
            style={{ fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
              अब तैयारी करो अपने तरीके से, सिर्फ PREPZR के साथ!
            </span>
          </motion.h1>
          
          {/* English subtitle */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6"
          >
            We Understand Your Mindset, Not Just the Exam.
          </motion.h2>
          
          {/* Animated highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mb-10"
          >
            <div className="relative h-12">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="absolute w-full text-center text-xl sm:text-2xl font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    y: [20, 0, 0, -20]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: index * 4,
                    times: [0, 0.1, 0.9, 1]
                  }}
                >
                  <motion.span
                    animate={gradientTextAnimation}
                    className="px-2 py-1 rounded-lg"
                  >
                    {highlight}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
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


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroButtons from './hero/HeroButtons';
import HeroContent from './hero/HeroContent';
import HeroSlider from './hero/HeroSlider';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  // Handler for exam readiness analyzer
  const handleExamReadinessClick = () => {
    // Dispatch event to open the exam readiness analyzer
    window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 py-16 md:py-24 relative overflow-hidden">
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200/30 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-200/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        
        {/* Additional decorative elements */}
        <svg className="absolute -bottom-20 right-0 w-64 h-64 text-indigo-100 dark:text-indigo-900/20 opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M42,-65.9C55.8,-59,69.5,-50.9,76.8,-39C84.1,-27.1,85.1,-11.3,83.5,4.1C81.8,19.6,77.5,34.7,68.7,46.3C59.9,57.9,46.6,65.9,32.8,69.2C19,72.4,4.7,71,-8.3,66.9C-21.4,62.8,-33.3,56.1,-44.1,47.2C-54.8,38.3,-64.5,27.3,-69.2,14.5C-73.9,1.7,-73.6,-12.8,-68.7,-25C-63.9,-37.1,-54.4,-46.8,-43.3,-54.7C-32.1,-62.7,-19.3,-68.9,-3.9,-63.8C11.5,-58.7,28.2,-42.4,42,-65.9Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          {/* Left Content: Title, description and buttons */}
          <HeroContent 
            handleExamReadinessClick={handleExamReadinessClick}
          />
          
          {/* Right Content: Animated Slider */}
          <HeroSlider 
            activeSlide={activeSlide} 
            setActiveSlide={setActiveSlide}
          />
        </div>
      </div>
      
      {/* Add style for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.2); }
          66% { transform: translate(-20px, 20px) scale(0.8); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

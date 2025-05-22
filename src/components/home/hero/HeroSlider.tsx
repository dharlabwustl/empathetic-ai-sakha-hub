
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface HeroSliderProps {
  activeSlide: number;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ activeSlide, setActiveSlide }) => {
  const slides = [
    {
      id: 1,
      title: "Personalized Learning Path",
      description: "PREPZR's AI analyzes your strengths and weaknesses to create a custom study plan just for you.",
      image: "/lovable-uploads/40d17395-5bc0-46c3-a6b7-442756b53d1d.png",
      badge: "AI-Powered"
    },
    {
      id: 2,
      title: "Track Your Progress",
      description: "Monitor your improvement with detailed analytics and performance insights.",
      image: "/lovable-uploads/fdad5774-1059-4829-94ba-5bbe39b267e1.png",
      badge: "Data-Driven"
    },
    {
      id: 3,
      title: "Practice Smart, Not Hard",
      description: "Focus on your weak areas with PREPZR's adaptive question bank and save precious study time.",
      image: "/lovable-uploads/f07056a5-51fe-4891-82d0-5850a8780b35.png",
      badge: "Time-Saving"
    },
    {
      id: 4,
      title: "Join the Success Community",
      description: "Connect with toppers and mentors who've walked the same path and achieved their dreams.",
      image: "/lovable-uploads/4637ae1d-70c5-4b45-9c1c-e7cfcd8ad12c.png",
      badge: "Community"
    }
  ];

  const navigateToSlide = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full lg:w-1/2 relative z-10"
    >
      <div className="relative h-[450px] sm:h-[500px] lg:h-[520px] rounded-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
        {/* Slider image wrapper with 3D effect */}
        <div className="absolute inset-0 perspective-1000">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className="absolute inset-0 rounded-xl overflow-hidden"
              initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
              animate={{ 
                opacity: activeSlide === index ? 1 : 0,
                rotateY: activeSlide === index ? 0 : -15,
                scale: activeSlide === index ? 1 : 0.95,
                zIndex: activeSlide === index ? 10 : 0
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              {/* Slide background with overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 z-10" />
              
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover object-center transform transition-transform duration-10000 hover:scale-110 animate-subtle-zoom"
              />
              
              {/* Premium badge */}
              <motion.div 
                className="absolute top-4 right-4 z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: activeSlide === index ? 1 : 0, y: activeSlide === index ? 0 : -20 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-white/20">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-gradient bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {slide.badge}
                    </span>
                  </div>
                </div>
              </motion.div>
              
              {/* Slide content */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: activeSlide === index ? 1 : 0,
                  y: activeSlide === index ? 0 : 20 
                }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {slide.title}
                </h2>
                <p className="text-white/90 text-base sm:text-lg max-w-lg">
                  {slide.description}
                </p>
                
                {/* Emotional impact tag */}
                <motion.div 
                  className="mt-4 inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: activeSlide === index ? 1 : 0, 
                    scale: activeSlide === index ? 1 : 0.8 
                  }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-sm font-medium text-white">Students who use PREPZR are 3x more likely to succeed</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Slide navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeSlide === index 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              onClick={() => navigateToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* 3D floating elements to enhance premium feel */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-sm z-20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur-sm z-20"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -10, 0],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>
    </motion.div>
  );
};

export default HeroSlider;

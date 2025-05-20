import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, User, Book } from 'lucide-react';

interface HeroSliderProps {
  activeSlide: number;
  setActiveSlide: (index: number) => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ activeSlide, setActiveSlide }) => {
  const slideVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

  // Auto-rotate through slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [setActiveSlide]);

  const slideContentList = [
    {
      icon: <Brain size={48} className="text-indigo-500 drop-shadow-md" />,
      title: "Adaptive Learning",
      description: "Our AI engine analyzes your learning patterns and adapts to create personalized study resources",
      image: "/assets/images/adaptive-learning-3d.webp",
      animationDelay: 0
    },
    {
      icon: <User size={48} className="text-purple-500 drop-shadow-md" />,
      title: "Personalized Study Plan",
      description: "Get study plans designed specifically for your learning style and exam goals",
      image: "/assets/images/student-avatar-3d.webp",
      animationDelay: 0.2
    },
    {
      icon: <Book size={48} className="text-blue-500 drop-shadow-md" />,
      title: "Performance Analytics",
      description: "Track your progress with detailed analytics and improve weak areas strategically",
      image: "/assets/images/analytics-3d.webp",
      animationDelay: 0.4
    }
  ];

  return (
    <div className="w-full lg:w-1/2 relative">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[400px] md:h-[500px]"
      >
        {/* 3D animated slide content - automatically rotating */}
        {slideContentList.map((slide, index) => (
          <SlideItem 
            key={index}
            slide={slide}
            index={index}
            activeSlide={activeSlide}
            variants={slideVariants}
          />
        ))}

        {/* Slide navigation dots */}
        <SlideNavigation 
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
          slideCount={slideContentList.length}
        />
      </motion.div>
    </div>
  );
};

interface SlideItemProps {
  slide: {
    icon: React.ReactNode;
    title: string;
    description: string;
    image: string;
    animationDelay: number;
  };
  index: number;
  activeSlide: number;
  variants: {
    enter: { x: number; opacity: number };
    center: { x: number; opacity: number };
    exit: { x: number; opacity: number };
  };
}

const SlideItem: React.FC<SlideItemProps> = ({ slide, index, activeSlide, variants }) => {
  return (
    <motion.div
      initial="enter"
      animate={index === activeSlide ? "center" : "exit"}
      variants={variants}
      transition={{ 
        duration: 0.5,
        type: "spring", 
        stiffness: 100,
        damping: 20
      }}
      className={`absolute inset-0 flex flex-col items-center justify-center ${index === activeSlide ? 'z-10' : 'z-0'}`}
    >
      <motion.div
        initial={{y: 20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{
          delay: slide.animationDelay,
          duration: 0.5
        }}
        className="mb-8"
      >
        <motion.div
          animate={
            { y: [0, -10, 0], scale: [1, 1.02, 1], rotate: [0, 2, 0] }
          }
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
          className="relative"
        >
          {slide.icon}
          <img 
            src={slide.image || `/assets/images/slide-${index + 1}.webp`} 
            alt={slide.title} 
            className="w-64 h-64 object-contain mx-auto"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = "/assets/images/default-slide.png";
            }}
          />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + slide.animationDelay, duration: 0.5 }}
        className="text-center max-w-md"
      >
        <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{slide.description}</p>
      </motion.div>
    </motion.div>
  );
};

interface SlideNavigationProps {
  activeSlide: number;
  setActiveSlide: (index: number) => void;
  slideCount: number;
}

const SlideNavigation: React.FC<SlideNavigationProps> = ({ activeSlide, setActiveSlide, slideCount }) => {
  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {Array.from({ length: slideCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => setActiveSlide(index)}
          className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default HeroSlider;

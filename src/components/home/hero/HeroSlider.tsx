import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Brain, Award, Book } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface HeroSliderProps {
  activeSlide: number;
  setActiveSlide: (index: number) => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ activeSlide, setActiveSlide }) => {
  const slideVariants = {
    enter: { x: 300, opacity: 0, scale: 0.8, rotateY: -30 },
    center: { x: 0, opacity: 1, scale: 1, rotateY: 0 },
    exit: { x: -300, opacity: 0, scale: 0.8, rotateY: 30 }
  };

  // Track animation progress
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationRef = useRef<number>(0);
  
  useEffect(() => {
    const duration = 5000; // 5 seconds same as rotation interval
    const intervalTime = 50; // Update every 50ms for smoother progress
    const steps = duration / intervalTime;
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      currentStep = (currentStep + 1) % steps;
      setAnimationProgress((currentStep / steps) * 100);
    }, intervalTime);
    
    // Auto-rotate slides
    const autoRotateInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideContentList.length);
    }, duration);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(autoRotateInterval);
    };
  }, [activeSlide, setActiveSlide]);

  const slideContentList = [
    {
      icon: <Brain size={48} className="text-indigo-500 drop-shadow-md" />,
      title: "JEE Advanced Preparation",
      description: "Specialized coaching and practice for India's toughest engineering entrance exam",
      image: "/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png",
      examType: "JEE",
      examSpecifics: ["Physics", "Chemistry", "Mathematics"],
      avatarImage: "/lovable-uploads/01d9bec1-6662-487f-8de6-86c1d36cddfd.png",
      animationDelay: 0
    },
    {
      icon: <Book size={48} className="text-purple-500 drop-shadow-md" />,
      title: "NEET Medical Preparation",
      description: "Comprehensive strategies for NEET medical entrance success",
      image: "/lovable-uploads/c34ee0e2-be15-44a9-971e-1c65aa62095a.png",
      examType: "NEET",
      examSpecifics: ["Biology", "Chemistry", "Physics"],
      avatarImage: "/lovable-uploads/1bd9164d-90e1-4088-b058-0fa5966be194.png",
      animationDelay: 0.2
    },
    {
      icon: <Award size={48} className="text-blue-500 drop-shadow-md" />,
      title: "UPSC Civil Services",
      description: "Systematic approach for India's most prestigious civil services examination",
      image: "/lovable-uploads/63143d4f-73cd-4fca-a1dd-82e6a5313142.png",
      examType: "UPSC",
      examSpecifics: ["General Studies", "Optional Papers", "Interview"],
      avatarImage: "/lovable-uploads/2a3b330c-09e1-40bd-b9bd-85ecb5cc394a.png",
      animationDelay: 0.4
    }
  ];

  return (
    <div className="w-full lg:w-1/2 relative">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[450px] md:h-[550px] perspective-1000"
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

        {/* 3D floating particles for depth effect */}
        <Particles />

        {/* Student avatar matching the current slide */}
        <StudentAvatar 
          activeSlide={activeSlide} 
          slideContentList={slideContentList} 
        />

        {/* Slide navigation dots and progress indicator */}
        <div className="absolute bottom-0 left-0 w-full p-4">
          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-3">
            <div 
              className="h-1 bg-indigo-600 rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${animationProgress}%` }}
            />
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center space-x-2">
            {slideContentList.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeSlide 
                    ? 'bg-indigo-600 scale-110' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-indigo-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface StudentAvatarProps {
  activeSlide: number;
  slideContentList: Array<{
    avatarImage: string;
    examType: string;
  }>;
}

const StudentAvatar: React.FC<StudentAvatarProps> = ({ activeSlide, slideContentList }) => {
  const currentSlide = slideContentList[activeSlide];
  
  return (
    <motion.div
      className="absolute -bottom-4 -left-4 z-20"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Avatar className="w-28 h-28 border-4 border-white dark:border-gray-800 shadow-xl">
          <AvatarImage src={currentSlide.avatarImage} alt="Student" />
          <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-2xl font-bold">
            {currentSlide.examType.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <motion.div
          className="absolute -right-2 -top-1 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full font-semibold border-2 border-white dark:border-gray-800"
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {currentSlide.examType}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

interface SlideItemProps {
  slide: {
    icon: React.ReactNode;
    title: string;
    description: string;
    image: string;
    examType: string;
    examSpecifics: string[];
    avatarImage: string;
    animationDelay: number;
  };
  index: number;
  activeSlide: number;
  variants: {
    enter: { x: number; opacity: number; scale: number; rotateY: number };
    center: { x: number; opacity: number; scale: number; rotateY: number };
    exit: { x: number; opacity: number; scale: number; rotateY: number };
  };
}

const SlideItem: React.FC<SlideItemProps> = ({ slide, index, activeSlide, variants }) => {
  return (
    <motion.div
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        perspective: '1000px'
      }}
      initial="enter"
      animate={index === activeSlide ? "center" : "exit"}
      variants={variants}
      transition={{ 
        duration: 0.5,
        type: "spring", 
        stiffness: 100,
        damping: 20
      }}
      className={`flex flex-col items-center justify-center ${index === activeSlide ? 'z-10' : 'z-0'}`}
    >
      {/* Exam Badge */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: slide.animationDelay + 0.2, duration: 0.4 }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-2 px-6 rounded-full shadow-lg z-20"
      >
        {slide.examType}
      </motion.div>
      
      {/* Main content with 3D effect */}
      <motion.div
        className="relative w-full h-full flex flex-col items-center justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: slide.animationDelay, duration: 0.5 }}
      >
        <motion.div
          animate={
            { y: [0, -10, 0], rotateY: [0, 5, 0], rotateX: [0, 3, 0] }
          }
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl transform -rotate-3 scale-105 -z-10" />
          
          {/* 3D floating icon */}
          <motion.div
            animate={{ y: [-5, 5, -5], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-10 -left-6 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-xl"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
          >
            {slide.icon}
          </motion.div>
          
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-72 h-72 md:w-80 md:h-80 object-contain mx-auto rounded-lg shadow-lg transform transition-transform"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
            onError={(e) => {
              e.currentTarget.src = "/assets/images/default-slide.png";
            }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + slide.animationDelay, duration: 0.5 }}
          className="text-center max-w-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-5 shadow-lg"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
        >
          <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{slide.description}</p>
          
          {/* Subject pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {slide.examSpecifics.map((subject, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + slide.animationDelay + (idx * 0.1), duration: 0.3 }}
                className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 text-xs px-3 py-1 rounded-full"
              >
                {subject}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Floating particles for 3D effect
const Particles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ],
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            filter: "blur(1px)"
          }}
        />
      ))}
    </div>
  );
};

export default HeroSlider;

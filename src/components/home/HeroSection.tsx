
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Zap, Book, Brain, User } from 'lucide-react';
import HeroButtons from './hero/HeroButtons';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-rotate through slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleExamReadinessClick = () => {
    // Dispatch event to open the exam readiness analyzer
    window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
  };

  const slideVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

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
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200/30 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-200/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full lg:w-1/2 pt-8 lg:pt-0 lg:pr-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
              We understand your mindset, not just the exam
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              AI-powered personalized learning companion that adapts to your learning style and helps you achieve exam success. Experience learning designed around you.
            </p>
            
            <HeroButtons onAnalyzeClick={handleExamReadinessClick} />

            {/* Feature checkpoints */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {["Personalized Study Plans", "AI Concept Mastery", "Performance Analytics", "Voice-Guided Learning"].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <div className="w-full lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] md:h-[500px]"
            >
              {/* 3D animated slide content - automatically rotating */}
              {slideContentList.map((slide, index) => (
                <motion.div
                  key={index}
                  initial="enter"
                  animate={index === activeSlide ? "center" : "exit"}
                  variants={slideVariants}
                  transition={{ 
                    duration: 0.5,
                    type: "spring", 
                    stiffness: 100,
                    damping: 20
                  }}
                  className={`absolute inset-0 flex flex-col items-center justify-center ${index === activeSlide ? 'z-10' : 'z-0'}`}
                  style={{ display: index === activeSlide ? 'flex' : 'none' }}
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
              ))}

              {/* Slide navigation dots */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </motion.div>
          </div>
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

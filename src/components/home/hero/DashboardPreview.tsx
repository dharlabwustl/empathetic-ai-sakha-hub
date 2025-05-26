
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from "@/components/ui/button";

const DashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Dynamic Plan as per Your Learner Profile",
      description: "AI-powered study plans that adapt to your unique learning style and progress",
      image: "/lovable-uploads/1bd9164d-90e1-4088-b058-0fa5966be194.png",
      features: ["Personalized Learning Path", "Adaptive Difficulty", "Real-time Adjustments"]
    },
    {
      id: 2,
      title: "Daily Adaptive Plans",
      description: "Smart daily schedules that evolve based on your performance and mood",
      image: "/lovable-uploads/2536e929-d62e-4754-919e-759100b32e1d.png",
      features: ["Mood-based Planning", "Performance Tracking", "Time Optimization"]
    },
    {
      id: 3,
      title: "Concept Mastery with Multi-Techniques",
      description: "Master concepts through 3D visuals, videos, summaries, and interactive content",
      image: "/lovable-uploads/357a0e22-3fec-4a5c-808e-0540d5f7ba05.png",
      features: ["3D Visualizations", "Video Learning", "Interactive Summaries"]
    },
    {
      id: 4,
      title: "Recall Accuracy with Spaced Repetition",
      description: "Interactive spaced repetition system that maximizes long-term retention",
      image: "/lovable-uploads/622fa3cd-0a65-49dc-89a3-0987c4462bdd.png",
      features: ["Smart Flashcards", "Memory Optimization", "Progress Analytics"]
    },
    {
      id: 5,
      title: "Formula Practice & Mastery",
      description: "Interactive formula practice with step-by-step guidance and explanations",
      image: "/lovable-uploads/98f91972-8773-4867-8532-88a492ce40f6.png",
      features: ["Step-by-step Solutions", "Formula Builder", "Practice Tests"]
    },
    {
      id: 6,
      title: "Practice Exam Excellence",
      description: "Comprehensive practice exams with detailed analytics and performance insights",
      image: "/lovable-uploads/9ca5a007-1086-4c37-81cc-cc869e880b5b.png",
      features: ["Mock Tests", "Performance Analytics", "Weakness Identification"]
    },
    {
      id: 7,
      title: "Improve Exam Readiness Everyday",
      description: "Daily readiness assessments and targeted improvement recommendations",
      image: "/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png",
      features: ["Readiness Score", "Daily Assessments", "Improvement Tracking"]
    },
    {
      id: 8,
      title: "Become an Exam Champion",
      description: "Transform from student to champion with our comprehensive success system",
      image: "/lovable-uploads/c22d3091-93f3-466d-ac2a-a871167e98e4.png",
      features: ["Champion Mindset", "Success Strategies", "Achievement Unlocked"]
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative w-full h-full"
    >
      {/* Fixed container with exact dimensions */}
      <div className="relative w-[600px] h-[400px] mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="text-sm font-medium">PREPZR Dashboard</div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-white hover:bg-white/20 h-6 w-6 p-0"
              >
                {isAutoPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-12 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              className="h-full flex flex-col"
            >
              {/* Image Section */}
              <div className="flex-1 relative overflow-hidden">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {slides[currentSlide].title}
                  </h3>
                  <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                    {slides[currentSlide].description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {slides[currentSlide].features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {/* Slide Indicators */}
            <div className="flex space-x-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Award, Clock } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  // Journey points for the animated path
  const journeyPoints = [
    { id: 1, title: "Starting Point", description: "Beginning of your preparation journey" },
    { id: 2, title: "Concept Mastery", description: "Understanding core concepts" },
    { id: 3, title: "Practice Phase", description: "Applying knowledge through practice" },
    { id: 4, title: "Confidence Building", description: "Developing exam confidence" },
    { id: 5, title: "Success", description: "Achieving your goals" }
  ];
  
  // Milestones for the hero section
  const milestones = [
    { icon: <Award className="h-6 w-6" />, title: "Confidence Building" },
    { icon: <CheckCircle className="h-6 w-6" />, title: "Exam Success" },
    { icon: <Clock className="h-6 w-6" />, title: "Time Saving" },
    { icon: <BookOpen className="h-6 w-6" />, title: "Stress-Free Preparation" },
    { icon: <Award className="h-6 w-6" />, title: "Happy Learning" },
  ];

  // Auto-rotate slides
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  // Slide content
  const slides = [
    {
      title: "We understand your mindset, not just the exam",
      description: "Our AI-powered platform adapts to your learning style, mood, and environment to create a personalized preparation experience that traditional coaching can't match.",
      animation: "journey"
    },
    {
      title: "Emotionally aware, hyper personalized",
      description: "PREPZR is an emotionally aware, hyper personalized, adaptive exam prep platform designed to understand your unique learning journey.",
      animation: "milestones"
    },
    {
      title: "Study smarter",
      description: "Let our AI system optimize your preparation time by focusing on what matters most for your specific exam goals.",
      animation: "avatar"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white dark:from-gray-900 dark:to-gray-800 pt-16 pb-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content - Text and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-violet-700 to-indigo-600">
              {slides[activeSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              {slides[activeSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => navigate('/free-trial')}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-6 rounded-lg text-lg"
              >
                7 Days Free Trial
              </Button>
              <Button
                onClick={() => navigate('/exam-readiness')}
                variant="outline"
                size="lg"
                className="px-8 py-6 rounded-lg border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 text-lg"
              >
                Test Your Exam Readiness
              </Button>
            </div>
          </motion.div>

          {/* Right content - Animated elements that change based on active slide */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px]"
          >
            {activeSlide === 0 && (
              /* Journey Path Animation */
              <div className="relative h-full w-full">
                {/* Journey Path SVG */}
                <svg className="absolute top-0 left-0 w-full h-full z-10" viewBox="0 0 400 400">
                  <motion.path
                    d="M 50,200 C 100,100 150,300 200,150 S 300,250 350,200"
                    fill="transparent"
                    stroke="#8B5CF6"
                    strokeWidth="4"
                    strokeDasharray="520"
                    strokeDashoffset="520"
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                </svg>

                {/* Milestone Points */}
                {journeyPoints.map((point, index) => {
                  const xPos = 50 + (index * 75);
                  const yPos = 200 + (index % 2 === 0 ? -50 : 50);
                  
                  return (
                    <motion.div
                      key={point.id}
                      className="absolute z-20"
                      style={{ top: yPos, left: xPos }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + (index * 0.3), duration: 0.5 }}
                    >
                      <div className="relative">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{point.id}</span>
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg w-32 opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-xs font-bold">{point.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{point.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Animated Student Avatar */}
                <motion.div
                  className="absolute z-30 w-16 h-16"
                  initial={{ x: 50, y: 200 }}
                  animate={[
                    { x: 50, y: 200 },
                    { x: 125, y: 150 },
                    { x: 200, y: 250 },
                    { x: 275, y: 150 },
                    { x: 350, y: 200 }
                  ]}
                  transition={{
                    times: [0, 0.25, 0.5, 0.75, 1],
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                >
                  <div className="relative">
                    {/* Student Avatar */}
                    <div className="w-16 h-16 bg-indigo-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center overflow-hidden">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#F9FAFB" />
                        <path d="M12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6Z" fill="#4F46E5" />
                        <path d="M12 20C9.33 20 7 18.67 7 16V15C7 13.9 7.9 13 9 13H15C16.1 13 17 13.9 17 15V16C17 18.67 14.67 20 12 20Z" fill="#4F46E5" />
                      </svg>
                    </div>

                    {/* Emotion/State Indicator */}
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white dark:border-gray-800">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H7C6.45 13 6 12.55 6 12C6 11.45 6.45 11 7 11H17C17.55 11 18 11.45 18 12C18 12.55 17.55 13 17 13Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {activeSlide === 1 && (
              /* Milestones Animation */
              <div className="relative h-full w-full flex flex-col justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid grid-cols-2 gap-4 w-full max-w-md"
                >
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md flex items-center space-x-3 border border-purple-100 dark:border-purple-900"
                    >
                      <div className="p-2 bg-purple-100 dark:bg-purple-800/30 rounded-full text-purple-600 dark:text-purple-300">
                        {milestone.icon}
                      </div>
                      <div className="font-medium text-sm">{milestone.title}</div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* 3D floating elements */}
                <motion.div
                  className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl"
                  animate={{ 
                    y: [0, -15, 0],
                    rotateZ: [0, 10, 0, -10, 0],
                    rotateY: [0, 20, 0, -20, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                
                <motion.div
                  className="absolute bottom-20 left-10 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full"
                  animate={{ 
                    y: [0, 15, 0],
                    scale: [1, 1.1, 1],
                    rotateZ: [0, -10, 0, 10, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                />
                
                <motion.div
                  className="absolute top-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg"
                  animate={{ 
                    rotate: [0, 360],
                    y: [0, 10, 0]
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    y: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                  }}
                  style={{ transformOrigin: "center center" }}
                />
              </div>
            )}

            {activeSlide === 2 && (
              /* 3D Student Avatar Animation */
              <div className="relative h-full w-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="relative w-64 h-64"
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* 3D learning environment around the student */}
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                      const angle = (i / 6) * Math.PI * 2;
                      const x = Math.cos(angle) * 120;
                      const z = Math.sin(angle) * 120;
                      return (
                        <motion.div
                          key={i}
                          className="absolute w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white"
                          style={{ 
                            transform: `translate3d(${x}px, 0, ${z}px) rotateY(${i * 60}deg)`,
                            transformStyle: "preserve-3d"
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {i === 0 && <BookOpen className="h-10 w-10" />}
                          {i === 1 && <Award className="h-10 w-10" />}
                          {i === 2 && <Clock className="h-10 w-10" />}
                          {i === 3 && <CheckCircle className="h-10 w-10" />}
                          {i === 4 && <Award className="h-10 w-10" />}
                          {i === 5 && <BookOpen className="h-10 w-10" />}
                        </motion.div>
                      );
                    })}
                    
                    {/* Student in the center */}
                    <motion.div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32"
                      animate={{ 
                        y: [0, -10, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-violet-600 rounded-full border-4 border-white dark:border-gray-800 shadow-xl flex items-center justify-center overflow-hidden">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#F9FAFB" />
                          <path d="M12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6Z" fill="#4F46E5" />
                          <path d="M12 20C9.33 20 7 18.67 7 16V15C7 13.9 7.9 13 9 13H15C16.1 13 17 13.9 17 15V16C17 18.67 14.67 20 12 20Z" fill="#4F46E5" />
                        </svg>
                      </div>

                      {/* Thought bubble */}
                      <motion.div 
                        className="absolute -top-16 right-0 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.3 }}
                      >
                        <p className="text-xs font-medium text-purple-600 dark:text-purple-300">Study smarter!</p>
                        <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45"></div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Background Elements */}
            <motion.div 
              className="absolute bottom-10 right-20 w-20 h-20 bg-purple-200 dark:bg-purple-800/30 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-20 left-10 w-16 h-16 bg-indigo-200 dark:bg-indigo-800/30 rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div 
              className="absolute top-40 right-40 w-12 h-12 bg-blue-200 dark:bg-blue-800/30 rounded-full"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              activeSlide === index ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
            }`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

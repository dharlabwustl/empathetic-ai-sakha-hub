
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeatureSection from '@/components/home/FeatureSection';
import TestimonialSection from '@/components/home/TestimonialSection'; 
import StatisticsSection from '@/components/home/StatisticsSection';
import ExamEcosystemSection from '@/components/home/ExamEcosystemSection';
import SupportSection from '@/components/home/SupportSection';
import HomePageVoiceAssistant from '@/components/voice/HomePageVoiceAssistant';
import ChampionMethodologySection from '@/components/home/ChampionMethodologySection';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import FloatingVoiceAssistant from '@/components/voice/FloatingVoiceAssistant';
import { motion } from 'framer-motion';

const Home = () => {
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const navigate = useNavigate();
  
  const handleOpenVoiceAssistant = () => {
    setShowVoiceAssistant(true);
  };
  
  const handleCloseVoiceAssistant = () => {
    setShowVoiceAssistant(false);
  };
  
  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  // Stop any voice announcements when route changes
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <MainLayout>
      {/* Voice assistance */}
      <HomePageVoiceAssistant language="en-IN" />
      
      {/* Page content */}
      <HeroSection />
      
      {/* UN Sustainability Goals Banner - enhanced with animation */}
      <motion.div 
        className="container mx-auto px-4 my-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-blue-100 dark:from-green-900/20 dark:to-blue-900/20 dark:border-blue-800/30 overflow-hidden relative">
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-green-400/10 dark:bg-green-400/5"
                style={{
                  width: 5 + Math.random() * 10,
                  height: 5 + Math.random() * 10,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.random() * 20, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          
          <CardContent className="flex items-center gap-4 p-4 relative z-10">
            <motion.div 
              className="bg-green-100 dark:bg-green-900/40 p-3 rounded-full"
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{ 
                boxShadow: [
                  "0 0 0 rgba(74, 222, 128, 0)",
                  "0 0 10px rgba(74, 222, 128, 0.5)",
                  "0 0 0 rgba(74, 222, 128, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="h-6 w-6 text-green-500 dark:text-green-300 fill-green-200 dark:fill-green-800" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold mb-1 text-green-600 dark:text-green-300">Supporting UN Sustainability Goals</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                PREPZR is committed to providing inclusive and equitable quality education, 
                supporting UN Sustainability Goal 4 to ensure equal access to education for all.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <FeatureSection />
      <StatisticsSection />
      
      {/* Enhanced Champion Methodology Section with dynamic background */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Dynamic particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 3 + Math.random() * 8,
                height: 3 + Math.random() * 8,
                background: `rgba(${100 + Math.random() * 50}, ${50 + Math.random() * 100}, ${200 + Math.random() * 50}, ${0.1 + Math.random() * 0.2})`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(1px)'
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 50, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Subtle grid lines */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }} />
          
          {/* Animated blob shapes */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full filter blur-[80px] bg-indigo-500/10"
            animate={{
              scale: [1, 1.2, 1],
              x: [-20, 20, -20],
              y: [-20, 20, -20]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-1/4 h-1/4 rounded-full filter blur-[60px] bg-purple-500/10"
            animate={{
              scale: [1.1, 0.9, 1.1],
              x: [20, -20, 20],
              y: [20, -20, 20]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <motion.h2 
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 inline-block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              Transform Your Exam Preparation Journey with PREPZR
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-3 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </motion.div>
          
          <ChampionMethodologySection />
        </div>
      </section>
      
      <ExamEcosystemSection />
      
      {/* Enhanced Team Section - make this section dynamic and vibrant */}
      <section className="py-16 relative overflow-hidden">
        {/* Dynamic animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-indigo-50/70 to-purple-50/70 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating geometric shapes */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute opacity-20 dark:opacity-15"
              style={{
                width: 20 + Math.random() * 40,
                height: 20 + Math.random() * 40,
                borderRadius: Math.random() > 0.5 ? '50%' : '20%',
                border: `2px solid rgba(${100 + Math.random() * 100}, ${50 + Math.random() * 100}, ${200 + Math.random() * 50}, 0.3)`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 30, 0],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Subtle network lines connecting between points */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.1">
              <motion.line 
                x1="10%" y1="20%" x2="30%" y2="40%" 
                stroke="rgb(99, 102, 241)" 
                strokeWidth="1"
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.line 
                x1="30%" y1="40%" x2="50%" y2="30%" 
                stroke="rgb(99, 102, 241)" 
                strokeWidth="1"
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
              <motion.line 
                x1="50%" y1="30%" x2="70%" y2="50%" 
                stroke="rgb(99, 102, 241)" 
                strokeWidth="1"
                animate={{ opacity: [0.1, 0.6, 0.1] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.line 
                x1="70%" y1="50%" x2="90%" y2="30%" 
                stroke="rgb(139, 92, 246)" 
                strokeWidth="1"
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
              />
              <motion.line 
                x1="20%" y1="70%" x2="40%" y2="80%" 
                stroke="rgb(139, 92, 246)" 
                strokeWidth="1"
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 3.8, repeat: Infinity, delay: 2 }}
              />
              <motion.line 
                x1="40%" y1="80%" x2="60%" y2="70%" 
                stroke="rgb(139, 92, 246)" 
                strokeWidth="1"
                animate={{ opacity: [0.1, 0.6, 0.1] }}
                transition={{ duration: 4.2, repeat: Infinity, delay: 1 }}
              />
              <motion.line 
                x1="60%" y1="70%" x2="80%" y2="80%" 
                stroke="rgb(99, 102, 241)" 
                strokeWidth="1"
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: 0.8 }}
              />
            </g>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <motion.h2 
              className="text-3xl font-bold relative inline-block"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span 
                className="relative bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                The Team Behind PREPZR
              </motion.span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </motion.h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our diverse team of educators, technologists, and learning scientists are dedicated to revolutionizing 
              exam preparation through AI-powered personalized learning experiences.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Founder Cards with enhanced 3D animations */}
            {[
              {
                name: "Dr. Ravi Sharma",
                role: "Founder & Educational Visionary",
                image: "/lovable-uploads/c22d3091-93f3-466d-ac2a-a871167e98e4.png"
              },
              {
                name: "Priya Mehta",
                role: "AI Learning Architect",
                image: "/lovable-uploads/c22d3091-93f3-466d-ac2a-a871167e98e4.png"
              },
              {
                name: "Arjun Kapoor",
                role: "Student Experience Director",
                image: "/lovable-uploads/c22d3091-93f3-466d-ac2a-a871167e98e4.png"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-indigo-100 dark:border-indigo-900/30 relative overflow-hidden"
                initial={{ opacity: 0, y: 20, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.2 }
                }}
              >
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-10 z-0"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 1px, transparent 1px)',
                    backgroundSize: '15px 15px',
                  }}
                  animate={{ 
                    backgroundPosition: ["0% 0%", "100% 100%"],
                    opacity: [0.05, 0.12, 0.05]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Halo effect */}
                <motion.div
                  className="absolute top-12 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full filter blur-xl z-0"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                <div className="flex flex-col items-center text-center relative z-10">
                  <motion.div 
                    className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-indigo-200 dark:border-indigo-700"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">{member.role}</p>
                  
                  <motion.div 
                    className="mt-4 flex justify-center space-x-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  >
                    {/* Social media icons */}
                    {[1, 2, 3].map((_, iconIndex) => (
                      <motion.a
                        key={iconIndex}
                        href="#"
                        className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400"
                        whileHover={{ scale: 1.2, backgroundColor: "#4f46e5", color: "#ffffff" }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                            iconIndex === 0 ? "M13 10V3L4 14h7v7l9-11h-7z" :
                            iconIndex === 1 ? "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" :
                            "M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                          } />
                        </svg>
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <TestimonialSection />
      <SupportSection />
      
      {/* Floating voice assistant button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          onClick={handleOpenVoiceAssistant}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" x2="12" y1="19" y2="22"></line>
          </svg>
          <span className="ml-2 font-medium">Voice Assistant</span>
        </button>
      </div>
      
      {/* Voice assistant dialog */}
      {showVoiceAssistant && (
        <FloatingVoiceAssistant 
          isOpen={showVoiceAssistant} 
          onClose={handleCloseVoiceAssistant}
          onNavigationCommand={handleNavigationCommand}
          language="en-IN"
        />
      )}
    </MainLayout>
  );
};

export default Home;

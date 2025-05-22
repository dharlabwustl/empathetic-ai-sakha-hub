
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, GraduationCap, Award, Zap, Clock, Smile, Brain, Star, Medal, BookOpen } from 'lucide-react';

const ExamNamesBadge = () => {
  const navigate = useNavigate();
  
  const handleNeetExamClick = () => {
    // Set exam goal as NEET in localStorage for the signup flow
    const userData = {
      examGoal: "NEET",
      isNewUser: true,
      completedOnboarding: false
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("new_user_signup", "true");
    
    // Navigate to signup page
    navigate("/signup?exam=NEET");
  };
  
  // Key benefits of the PREPZR platform with student-focused descriptions
  const benefits = [
    { icon: <Brain size={16} />, text: "Confidence Builder" },
    { icon: <GraduationCap size={16} />, text: "Exam Success" },
    { icon: <Clock size={16} />, text: "Time Saver" },
    { icon: <Zap size={16} />, text: "Stress-Free" },
    { icon: <Smile size={16} />, text: "Happy Learning" }
  ];

  // Exam badges with enhanced 3D effect
  const examBadges = [
    { name: "NEET", icon: <Medal size={14} />, featured: true },
    { name: "JEE", icon: <GraduationCap size={14} /> },
    { name: "UPSC", icon: <Award size={14} /> },
    { name: "GATE", icon: <Star size={14} /> },
    { name: "Banking", icon: <BookOpen size={14} /> }
  ];
  
  return (
    <motion.div 
      className="flex flex-col items-center sm:items-start gap-4 mt-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Futuristic header with 3D effect */}
      <motion.div 
        className="text-sm text-muted-foreground p-2 rounded-lg relative overflow-hidden"
        style={{ 
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg -z-10"
          animate={{ 
            transform: [
              "translateZ(-10px) rotateX(2deg)",
              "translateZ(-5px) rotateX(-1deg)",
              "translateZ(-10px) rotateX(2deg)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-medium relative">
          Welcome to <span className="font-bold">PREPZR</span> - tomorrow's learning experience:
        </span>
        
        {/* Animated tech particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/20"
            style={{
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, Math.random() * 10, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
      
      {/* Main 3D interactive exam badges container */}
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start relative">
        <div className="absolute inset-0 -z-10">
          {/* Dynamic 3D background elements */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: Math.random() * 20 + 10,
                height: Math.random() * 5 + 5,
                background: `linear-gradient(90deg, rgba(139, 92, 246, ${Math.random() * 0.1}) 0%, rgba(79, 70, 229, ${Math.random() * 0.1}) 100%)`,
                borderRadius: "30px",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 90}deg)`,
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Featured NEET Exam Badge with enhanced 3D effect */}
        <motion.div
          className="relative z-10"
          initial={{ z: 0 }}
          whileHover={{ z: 30, scale: 1.08, y: -3 }}
          whileTap={{ z: 0, scale: 0.95 }}
          style={{ 
            transformStyle: "preserve-3d",
            perspective: 1000,
            transformOrigin: "center center",
            cursor: 'pointer'
          }}
          onClick={handleNeetExamClick}
        >
          {/* Animated glowing background */}
          <motion.div 
            className="absolute -inset-1 rounded-full blur-md bg-gradient-to-r from-blue-400/50 to-violet-500/50"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "translateZ(-5px)" }}
          />
          
          <Badge className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 px-4 py-2 text-white flex items-center gap-2 relative z-10 border border-violet-400/50 shadow-lg">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <motion.div className="absolute inset-0 rounded-full bg-violet-400/30 blur-sm"
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Medal size={15} className="text-amber-300" />
            </motion.div>
            
            <motion.span
              animate={{ 
                textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 4px rgba(255,255,255,0.5)", "0px 0px 0px rgba(255,255,255,0)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="font-semibold tracking-wide"
            >
              NEET
            </motion.span>
            
            {/* 3D animated LIVE badge */}
            <motion.div className="relative 3d-container ml-1" style={{ perspective: "1000px" }}>
              <motion.div 
                className="bg-white text-violet-600 text-xs px-2 py-0.5 rounded-full font-bold"
                animate={{ 
                  scale: [1, 1.1, 1],
                  backgroundColor: ["#ffffff", "#f0f0f0", "#ffffff"],
                  rotateY: [0, 10, 0, -10, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                LIVE
              </motion.div>
              
              {/* Pulse effect */}
              <motion.div 
                className="absolute inset-0 bg-white rounded-full"
                animate={{ 
                  scale: [1, 1.8],
                  opacity: [0.7, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: [0, 20, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="ml-0.5"
            >
              <Sparkles size={13} className="text-blue-200" />
            </motion.div>
          </Badge>
          
          {/* Call-to-action hint with 3D floating effect */}
          <motion.div
            className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-indigo-400 font-medium bg-white/80 dark:bg-gray-900/80 px-2 py-0.5 rounded-md shadow-sm"
            initial={{ opacity: 0, y: -5, rotateX: -20 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [-5, -8, -5],
              rotateX: [-20, 0, -20]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            Click to begin
          </motion.div>
        </motion.div>
        
        {/* Other exam badges with 3D hover effects */}
        {examBadges.filter(badge => !badge.featured).map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, z: 0 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
            whileHover={{ z: 20, scale: 1.05, y: -2 }}
            style={{ transformStyle: "preserve-3d", perspective: 800 }}
            className="relative"
          >
            <Badge 
              className="bg-gradient-to-r from-blue-50 to-violet-50 text-violet-700 border border-violet-200/50 hover:border-violet-300 dark:from-blue-900/30 dark:to-violet-900/30 dark:text-violet-300 dark:border-violet-800/50 flex items-center gap-1.5"
              variant="outline"
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                className="text-blue-600 dark:text-blue-400"
                style={{ transformStyle: "preserve-3d" }}
              >
                {badge.icon}
              </motion.div>
              {badge.name}
              
              {/* Subtle motion effect */}
              <motion.div
                className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-200/5 to-violet-200/5 dark:from-blue-500/5 dark:to-violet-500/5"
                animate={{
                  opacity: [0, 0.5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                style={{ transform: "translateZ(-5px)" }}
              />
            </Badge>
          </motion.div>
        ))}
      </div>
      
      {/* Platform benefits with 3D hover effect */}
      <div className="flex flex-wrap gap-2">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, z: 0 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ delay: 0.2 + 0.1 * index, duration: 0.3 }}
            whileHover={{ z: 10, scale: 1.05, y: -2 }}
            style={{ transformStyle: "preserve-3d", perspective: 800 }}
          >
            <Badge 
              className="bg-gradient-to-r from-blue-50 to-violet-50 text-violet-700 border border-violet-200/50 hover:border-violet-300 dark:from-blue-900/30 dark:to-violet-900/30 dark:text-violet-300 dark:border-violet-800/50 flex items-center gap-1.5 relative overflow-hidden"
              variant="outline"
            >
              <motion.div
                animate={{
                  rotateY: [0, 180, 360],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.7, ease: "easeInOut" }}
                className="text-blue-600 dark:text-blue-400"
              >
                {benefit.icon}
              </motion.div>
              
              <span className="relative z-10">{benefit.text}</span>
              
              {/* Moving background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-200/0 via-blue-200/10 to-blue-200/0 dark:from-blue-500/0 dark:via-blue-500/10 dark:to-blue-500/0"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                style={{ transform: "translateZ(-5px)" }}
              />
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExamNamesBadge;

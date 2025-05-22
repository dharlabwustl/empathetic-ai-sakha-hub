
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, GraduationCap, Award, Zap, Clock, Smile, Brain, Star, Medal, BookOpen, Rocket } from 'lucide-react';

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
      {/* Enhanced 3D animated welcome message */}
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
              "translateZ(-20px) rotateX(5deg)",
              "translateZ(-10px) rotateX(-3deg)",
              "translateZ(-20px) rotateX(5deg)"
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Enhanced animated welcome text */}
        <motion.span 
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-medium relative inline-block"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          Welcome to <span className="font-bold">PREPZR</span> - tomorrow's learning experience
        </motion.span>
        
        {/* Enhanced animated tech particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `rgba(${100 + Math.random() * 100}, ${100 + Math.random() * 100}, ${200 + Math.random() * 50}, ${0.3 + Math.random() * 0.4})`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20, 0],
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
      
      {/* Enhanced 3D interactive exam badges container */}
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start relative">
        <div className="absolute inset-0 -z-10">
          {/* Enhanced 3D background elements */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: Math.random() * 20 + 10,
                height: Math.random() * 5 + 5,
                background: `linear-gradient(90deg, rgba(139, 92, 246, ${Math.random() * 0.15}) 0%, rgba(79, 70, 229, ${Math.random() * 0.15}) 100%)`,
                borderRadius: "30px",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 90}deg)`,
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Enhanced NEET Exam Badge with glowing 3D effect */}
        <motion.div
          className="relative z-10"
          initial={{ z: 0 }}
          whileHover={{ z: 50, scale: 1.12, y: -5 }}
          whileTap={{ scale: 0.95 }}
          style={{ 
            transformStyle: "preserve-3d",
            perspective: 1000,
            transformOrigin: "center center",
            cursor: 'pointer'
          }}
          onClick={handleNeetExamClick}
        >
          {/* Enhanced animated glowing background */}
          <motion.div 
            className="absolute -inset-2 rounded-full blur-md"
            animate={{ 
              background: [
                'radial-gradient(circle, rgba(79,70,229,0.5) 0%, rgba(139,92,246,0.3) 100%)',
                'radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(79,70,229,0.4) 100%)',
                'radial-gradient(circle, rgba(79,70,229,0.5) 0%, rgba(139,92,246,0.3) 100%)'
              ],
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "translateZ(-5px)" }}
          />
          
          <Badge className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 px-5 py-2.5 text-white flex items-center gap-2 relative z-10 border border-violet-400/50 shadow-lg">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-amber-400/50 blur-sm"
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Medal size={16} className="text-amber-300" />
            </motion.div>
            
            <motion.span
              animate={{ 
                textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 8px rgba(255,255,255,0.8)", "0px 0px 0px rgba(255,255,255,0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-semibold tracking-wide text-base"
            >
              NEET
            </motion.span>
            
            {/* Enhanced 3D animated LIVE badge */}
            <motion.div className="relative 3d-container ml-1" style={{ perspective: "1000px" }}>
              <motion.div 
                className="bg-white text-violet-600 text-xs px-2 py-0.5 rounded-full font-bold"
                animate={{ 
                  scale: [1, 1.1, 1],
                  backgroundColor: ["#ffffff", "#f0f0f0", "#ffffff"],
                  rotateY: [0, 15, 0, -15, 0],
                  boxShadow: [
                    "0 0 0 rgba(255,255,255,0)", 
                    "0 0 5px rgba(255,255,255,0.8)", 
                    "0 0 0 rgba(255,255,255,0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                LIVE
              </motion.div>
              
              {/* Enhanced pulse effect */}
              <motion.div 
                className="absolute inset-0 bg-white rounded-full"
                animate={{ 
                  scale: [1, 2.5],
                  opacity: [0.7, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Enhanced sparkle icon */}
            <motion.div
              animate={{ 
                rotate: [0, 20, -20, 0],
                scale: [1, 1.3, 1],
                filter: ["drop-shadow(0 0 0px #a5b4fc)", "drop-shadow(0 0 3px #a5b4fc)", "drop-shadow(0 0 0px #a5b4fc)"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="ml-0.5"
            >
              <Sparkles size={14} className="text-blue-100" />
            </motion.div>
          </Badge>
          
          {/* Enhanced call-to-action hint with 3D floating effect */}
          <motion.div
            className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-indigo-500 font-medium bg-white/90 dark:bg-gray-900/90 px-2 py-0.5 rounded-md shadow-md"
            initial={{ opacity: 0, y: -5, rotateX: -20 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [-5, -8, -5],
              rotateX: [-20, 0, -20],
              boxShadow: [
                "0 0 0px rgba(79,70,229,0.1)", 
                "0 2px 8px rgba(79,70,229,0.3)", 
                "0 0 0px rgba(79,70,229,0.1)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            Click to begin
          </motion.div>
        </motion.div>
        
        {/* Enhanced other exam badges with 3D hover effects */}
        {examBadges.filter(badge => !badge.featured).map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, z: 0 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
            whileHover={{ z: 30, scale: 1.08, y: -3 }}
            style={{ transformStyle: "preserve-3d", perspective: 800 }}
            className="relative"
          >
            <Badge 
              className="bg-gradient-to-r from-blue-50 to-violet-50 text-violet-700 border border-violet-200/80 hover:border-violet-300 dark:from-blue-900/40 dark:to-violet-900/40 dark:text-violet-300 dark:border-violet-800/60 flex items-center gap-1.5"
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
              
              {/* Enhanced subtle motion effect */}
              <motion.div
                className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-200/10 to-violet-200/10 dark:from-blue-500/15 dark:to-violet-500/15"
                animate={{
                  opacity: [0, 0.6, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                style={{ transform: "translateZ(-5px)" }}
              />
            </Badge>
          </motion.div>
        ))}
      </div>
      
      {/* Enhanced platform benefits with 3D hover effect */}
      <div className="flex flex-wrap gap-2 mt-1">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, z: 0 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ delay: 0.2 + 0.1 * index, duration: 0.3 }}
            whileHover={{ z: 20, scale: 1.08, y: -2 }}
            style={{ transformStyle: "preserve-3d", perspective: 800 }}
          >
            <Badge 
              className="bg-gradient-to-r from-blue-50 to-violet-50 text-violet-700 border border-violet-200/50 hover:border-violet-300 dark:from-blue-900/30 dark:to-violet-900/30 dark:text-violet-300 dark:border-violet-800/50 flex items-center gap-1.5 relative overflow-hidden"
              variant="outline"
            >
              <motion.div
                animate={{
                  rotateY: [0, 180, 360],
                  filter: ["drop-shadow(0 0 0px rgba(99,102,241,0))", "drop-shadow(0 0 2px rgba(99,102,241,0.5))", "drop-shadow(0 0 0px rgba(99,102,241,0))"]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.7, ease: "easeInOut" }}
                className="text-blue-600 dark:text-blue-400"
              >
                {benefit.icon}
              </motion.div>
              
              <span className="relative z-10">{benefit.text}</span>
              
              {/* Enhanced moving background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-200/0 via-blue-200/15 to-blue-200/0 dark:from-blue-500/0 dark:via-blue-500/15 dark:to-blue-500/0"
                animate={{
                  x: ["-120%", "120%"],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }}
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

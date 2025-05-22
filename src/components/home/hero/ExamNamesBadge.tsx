
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Award, Star, BookOpen } from 'lucide-react';

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

  // Exam badges with enhanced 3D effect
  const examBadges = [
    { name: "NEET", icon: <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      <GraduationCap size={14} />
    </motion.div>, isLive: true },
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

        {/* Enhanced NEET Exam Badge with intense glowing 3D effect */}
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
          {/* Enhanced animated glowing background with pulsing effect */}
          <motion.div 
            className="absolute -inset-2 rounded-full blur-lg"
            animate={{ 
              background: [
                'radial-gradient(circle, rgba(79,70,229,0.7) 0%, rgba(139,92,246,0.5) 100%)',
                'radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(79,70,229,0.6) 100%)',
                'radial-gradient(circle, rgba(79,70,229,0.7) 0%, rgba(139,92,246,0.5) 100%)'
              ],
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "translateZ(-5px)" }}
          />
          
          <Badge className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 px-5 py-2.5 text-white flex items-center gap-2 relative z-10 border border-violet-400/50 shadow-lg">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-amber-400/80 blur-md"
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0.3, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <GraduationCap size={16} className="text-amber-300" />
            </motion.div>
            
            <div className="flex items-center">
              <motion.span
                animate={{ 
                  textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 10px rgba(255,255,255,0.8)", "0px 0px 0px rgba(255,255,255,0)"]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="font-semibold tracking-wide text-base"
              >
                NEET
              </motion.span>
              
              {/* "Live now" indicator with pulsing animation */}
              <motion.div 
                className="ml-2 flex items-center gap-1 bg-green-600/80 px-1.5 py-0.5 rounded-full text-xs font-medium"
                animate={{ 
                  boxShadow: [
                    "0 0 0px rgba(22, 163, 74, 0.5)",
                    "0 0 10px rgba(22, 163, 74, 0.8)",
                    "0 0 0px rgba(22, 163, 74, 0.5)"
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.span 
                  className="h-1.5 w-1.5 bg-green-300 rounded-full" 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span>LIVE NOW</span>
              </motion.div>
            </div>
          </Badge>
        </motion.div>
        
        {/* Enhanced other exam badges with 3D hover effects */}
        {examBadges.slice(1).map((badge, index) => (
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
    </motion.div>
  );
};

export default ExamNamesBadge;

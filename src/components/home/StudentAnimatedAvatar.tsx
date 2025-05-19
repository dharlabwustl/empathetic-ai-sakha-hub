
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Book, GraduationCap, Star, Brain, Trophy } from 'lucide-react';

interface StudentAnimatedAvatarProps {
  stage?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  size?: 'sm' | 'md' | 'lg';
  showJourneyIndicators?: boolean;
}

const StudentAnimatedAvatar: React.FC<StudentAnimatedAvatarProps> = ({ 
  stage = 'beginner',
  size = 'md',
  showJourneyIndicators = true
}) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  };
  
  const stageColors = {
    beginner: "from-blue-400 to-purple-400",
    intermediate: "from-purple-400 to-indigo-400",
    advanced: "from-indigo-400 to-violet-500",
    expert: "from-violet-500 to-purple-600"
  };
  
  const stageIcons = {
    beginner: <Book className="h-6 w-6" />,
    intermediate: <Brain className="h-6 w-6" />,
    advanced: <Star className="h-6 w-6" />,
    expert: <GraduationCap className="h-6 w-6" />
  };
  
  const achievementStyles = {
    beginner: { count: 1, color: "text-blue-400" },
    intermediate: { count: 2, color: "text-purple-400" },
    advanced: { count: 3, color: "text-indigo-500" },
    expert: { count: 4, color: "text-violet-600" }
  };

  // Handle 3D effect on mouse move
  useEffect(() => {
    const avatar = avatarRef.current;
    if (!avatar) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = avatar.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const strength = 15;
      const rotateX = y / -strength;
      const rotateY = x / strength;
      
      avatar.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const handleMouseLeave = () => {
      avatar.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };
    
    avatar.addEventListener('mousemove', handleMouseMove);
    avatar.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      avatar.removeEventListener('mousemove', handleMouseMove);
      avatar.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <motion.div 
        ref={avatarRef}
        className={`relative ${sizeClasses[size]} transition-all duration-300 ease-out will-change-transform`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
      >
        {/* Avatar base - animated student character */}
        <motion.div 
          className={`rounded-full bg-gradient-to-br ${stageColors[stage]} shadow-lg flex items-center justify-center relative overflow-hidden`}
          style={{ transformStyle: "preserve-3d" }}
          animate={{ 
            y: [0, -5, 0],
            boxShadow: [
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className={`h-full w-full rounded-full bg-gradient-to-br ${stageColors[stage]}`}
        >
          {/* Student face illustration - simplified version */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="h-3/4 w-3/4">
              <motion.circle 
                cx="50" cy="40" r="30" 
                fill="white" 
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Eyes */}
              <motion.g
                animate={{ y: [0, -1, 0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <circle cx="40" cy="35" r="4" fill="#333" />
                <circle cx="60" cy="35" r="4" fill="#333" />
              </motion.g>
              {/* Smile */}
              <motion.path 
                d="M 35 45 Q 50 60 65 45" 
                stroke="#333" 
                strokeWidth="2.5" 
                fill="transparent"
                animate={{ d: ["M 35 45 Q 50 60 65 45", "M 35 45 Q 50 55 65 45", "M 35 45 Q 50 60 65 45"] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </svg>
          </div>
        </motion.div>
        
        {/* Badge/icon for current stage */}
        <motion.div 
          className="absolute -right-1 -bottom-1 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md border-2 border-white dark:border-gray-700"
          animate={{ 
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <div className={`text-${stage} flex items-center justify-center`}>
            {stageIcons[stage]}
          </div>
        </motion.div>
        
        {/* Learning indicators */}
        {showJourneyIndicators && (
          <div className="absolute -top-1 -left-1">
            <motion.div
              className="bg-gradient-to-br from-amber-400 to-amber-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md border border-white dark:border-gray-800"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {achievementStyles[stage].count}
            </motion.div>
          </div>
        )}
      </motion.div>
      
      {/* Floating particles around avatar */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-${stage} opacity-30`}
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 20 - 10],
              y: [0, Math.random() * 20 - 10],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + Math.random() * 2,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentAnimatedAvatar;

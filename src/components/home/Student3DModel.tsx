
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Student3DModelProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'focused' | 'curious';
  className?: string;
}

const Student3DModel: React.FC<Student3DModelProps> = ({ 
  size = 'md',
  mood = 'happy',
  className = ''
}) => {
  const modelRef = useRef<HTMLDivElement>(null);
  
  const sizeClass = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-80 h-80'
  };
  
  const moodColors = {
    happy: 'from-amber-300 to-orange-400',
    focused: 'from-blue-300 to-indigo-500',
    curious: 'from-purple-300 to-violet-500'
  };
  
  // Handle 3D effect with mouse movement
  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = model.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      model.style.transform = `
        perspective(1000px) 
        rotateY(${x * 20}deg) 
        rotateX(${y * -20}deg) 
        translateZ(10px)
      `;
    };
    
    const handleMouseLeave = () => {
      model.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    model.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      model.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div className={`relative ${className}`}>
      <motion.div 
        ref={modelRef}
        className={`${sizeClass[size]} transition-all duration-300 ease-out will-change-transform`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15 
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Student 3D model container */}
        <div className="w-full h-full relative preserve-3d">
          {/* Head */}
          <motion.div 
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-2/5 rounded-full bg-gradient-to-br ${moodColors[mood]} shadow-lg border-2 border-white dark:border-gray-800 preserve-3d`}
            animate={{ 
              y: [0, -5, 0],
              rotateZ: [0, 2, 0, -2, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {/* Eyes */}
            <motion.div 
              className="absolute top-1/3 left-1/4 w-1/5 h-1/5 bg-white dark:bg-gray-200 rounded-full shadow-inner"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatDelay: 2
              }}
            />
            <motion.div 
              className="absolute top-1/3 right-1/4 w-1/5 h-1/5 bg-white dark:bg-gray-200 rounded-full shadow-inner"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatDelay: 2
              }}
            />
            
            {/* Smile */}
            <motion.div 
              className="absolute top-2/3 left-1/2 -translate-x-1/2 w-1/2 h-1/6 rounded-b-full border-b-4 border-white dark:border-gray-200"
              animate={{ 
                scaleX: mood === 'happy' ? [1, 1.1, 1] : [1, 0.9, 1],
                scaleY: mood === 'happy' ? [1, 1.2, 1] : [1, 0.8, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity
              }}
            />
            
            {/* Glasses for focused mood */}
            {mood === 'focused' && (
              <>
                <div className="absolute top-1/3 left-1/4 w-1/5 h-1/5 border-2 border-white dark:border-gray-200 rounded-full transform -translate-x-1/4" />
                <div className="absolute top-1/3 right-1/4 w-1/5 h-1/5 border-2 border-white dark:border-gray-200 rounded-full transform translate-x-1/4" />
                <div className="absolute top-1/3 left-1/2 w-1/5 h-1/20 border-2 border-white dark:border-gray-200 transform -translate-x-1/2" />
              </>
            )}
          </motion.div>
          
          {/* Body */}
          <motion.div 
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-2/3 h-2/5 bg-indigo-500 dark:bg-indigo-700 rounded-xl shadow-md preserve-3d"
            animate={{ 
              rotateZ: [0, 1, 0, -1, 0],
              y: [0, 2, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {/* T-shirt design */}
            <div className="absolute inset-4 rounded-lg bg-indigo-400 dark:bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                PREPZR
              </motion.span>
            </div>
          </motion.div>
          
          {/* Arms */}
          <motion.div 
            className="absolute top-1/3 left-1/6 w-1/8 h-1/3 bg-indigo-500 dark:bg-indigo-700 rounded-full origin-top"
            animate={{ rotateZ: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/6 w-1/8 h-1/3 bg-indigo-500 dark:bg-indigo-700 rounded-full origin-top"
            animate={{ rotateZ: [10, -10, 10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Book (for student context) */}
          <motion.div
            className="absolute top-2/3 left-1/2 -translate-x-1/2 w-1/2 h-1/8 bg-violet-600 dark:bg-violet-800 rounded-md origin-center preserve-3d shadow-md"
            animate={{ 
              rotateX: [0, 10, 0],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 border-t-2 border-violet-400 dark:border-violet-600 rounded-md"></div>
            <div className="absolute inset-1 bg-violet-500 dark:bg-violet-700 rounded-sm"></div>
          </motion.div>
        </div>
        
        {/* Floating particles around model */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-indigo-400 dark:bg-indigo-600 opacity-30"
              style={{
                width: Math.random() * 12 + 4,
                height: Math.random() * 12 + 4,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 30 - 15],
                y: [0, Math.random() * 30 - 15],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + Math.random() * 2,
                ease: "easeInOut",
                repeatType: "mirror",
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Shadow beneath the model */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-4 bg-black/10 dark:bg-black/20 rounded-full blur-md"
        animate={{ 
          width: ["60%", "50%", "60%"],
          opacity: [0.15, 0.1, 0.15]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default Student3DModel;

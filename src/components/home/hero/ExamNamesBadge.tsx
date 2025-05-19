
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const ExamNamesBadge = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  
  // Start animation after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
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
  
  return (
    <motion.div 
      className="flex flex-wrap justify-center items-center gap-2 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-sm text-muted-foreground mr-1">
        Your path to success:
      </div>
      
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNeetExamClick}
          style={{ cursor: 'pointer' }}
          initial={{ scale: 1 }}
          animate={animate ? { 
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 0 rgba(16, 185, 129, 0)',
              '0 0 20px rgba(16, 185, 129, 0.7)',
              '0 0 0 rgba(16, 185, 129, 0)'
            ]
          } : {}}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          <Badge 
            className="bg-green-600 hover:bg-green-700 px-4 py-2.5 text-white flex items-center gap-2 shadow-lg border border-green-500/50 relative"
          >
            <div className="bg-white rounded-full p-1.5">
              <GraduationCap size={16} className="text-green-600" />
            </div>
            
            <span className="font-bold text-base">
              NEET Exam
            </span>
            
            <motion.div
              className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1"
              animate={{ 
                scale: [1, 1.15, 1],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <span className="h-1.5 w-1.5 bg-white rounded-full animate-pulse"></span>
              LIVE
            </motion.div>
          </Badge>
          
          {/* Pulsing highlight effect */}
          <motion.div 
            className="absolute inset-0 -z-10 bg-green-500 rounded-full opacity-30 blur-md"
            animate={{ 
              scale: [0.85, 1.2, 0.85],
              opacity: [0.3, 0.15, 0.3]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
      
      <div
        className="text-xs text-muted-foreground ml-1 mt-1 sm:mt-0 sm:ml-2 px-2 py-1 bg-white/5 backdrop-blur-sm rounded-full"
      >
        More exams coming soon
      </div>
    </motion.div>
  );
};

export default ExamNamesBadge;

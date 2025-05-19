
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

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
  
  return (
    <motion.div 
      className="flex flex-wrap justify-center sm:justify-start items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="text-sm text-muted-foreground mr-1"
        animate={{ 
          scale: [1, 1.03, 1],
          background: [
            "rgba(255,255,255,0)", 
            "rgba(200,215,255,0.2)", 
            "rgba(255,255,255,0)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        style={{ padding: "4px 8px", borderRadius: "4px" }}
      >
        <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent font-medium">
          Experience the future of learning with:
        </span>
      </motion.div>
      
      <div className="flex flex-wrap gap-2 items-center">
        <motion.div
          whileHover={{ scale: 1.05, rotateZ: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNeetExamClick}
          style={{ cursor: 'pointer' }}
          className="relative"
        >
          {/* Futuristic glow effect */}
          <motion.div 
            className="absolute inset-0 bg-blue-500/30 rounded-full blur-md"
            animate={{ 
              scale: [0.9, 1.1, 0.9],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <Badge className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 px-3 py-1.5 text-white flex items-center gap-1.5 relative z-10 border border-violet-400/50 shadow-lg">
            <motion.span
              animate={{ 
                color: ["#ffffff", "#f0f0f0", "#ffffff"],
                textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 4px rgba(255,255,255,0.5)", "0px 0px 0px rgba(255,255,255,0)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="font-semibold"
            >
              NEET
            </motion.span>
            
            <motion.div className="relative">
              <motion.span 
                className="bg-white text-violet-600 text-xs px-1.5 py-0.5 rounded-full font-medium"
                animate={{ 
                  scale: [1, 1.1, 1],
                  backgroundColor: ["#ffffff", "#f0f0f0", "#ffffff"]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                LIVE
              </motion.span>
              
              {/* Futuristic ripple effect */}
              <motion.div 
                className="absolute inset-0 bg-white rounded-full"
                animate={{ 
                  scale: [1, 1.6],
                  opacity: [0.8, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              />
            </motion.div>
            
            {/* Sparkle icon for futuristic feel */}
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 0.9, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-1"
            >
              <Sparkles size={14} className="text-blue-200" />
            </motion.div>
          </Badge>
          
          {/* Futuristic call to action */}
          <motion.div
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-indigo-400 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            Begin your future
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExamNamesBadge;

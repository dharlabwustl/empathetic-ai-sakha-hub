
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
            "rgba(200,215,255,0.1)", 
            "rgba(255,255,255,0)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        style={{ padding: "4px 8px", borderRadius: "4px" }}
      >
        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Begin your journey with:
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
          {/* Pulsing background effect */}
          <motion.div 
            className="absolute inset-0 bg-green-500/30 rounded-full blur-md"
            animate={{ 
              scale: [0.9, 1.1, 0.9],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <Badge className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-3 py-1.5 text-white flex items-center gap-1.5 relative z-10 border border-green-500 shadow-lg">
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
                className="bg-white text-green-600 text-xs px-1.5 py-0.5 rounded-full font-medium"
                animate={{ 
                  scale: [1, 1.1, 1],
                  backgroundColor: ["#ffffff", "#f0f0f0", "#ffffff"]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                LIVE
              </motion.span>
              
              {/* Ripple effect for LIVE badge */}
              <motion.div 
                className="absolute inset-0 bg-white rounded-full"
                animate={{ 
                  scale: [1, 1.6],
                  opacity: [0.8, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              />
            </motion.div>
          </Badge>
          
          {/* Call to action hint */}
          <motion.div
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            Click to start
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExamNamesBadge;

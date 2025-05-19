
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, GraduationCap, Award, Zap, Clock, Smile } from 'lucide-react';

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
  
  // Key benefits of the PREPZR platform
  const benefits = [
    { icon: <GraduationCap size={16} />, text: "Smart Learning" },
    { icon: <Award size={16} />, text: "Exam Success" },
    { icon: <Clock size={16} />, text: "Time-Saving" },
    { icon: <Zap size={16} />, text: "Confidence" },
    { icon: <Smile size={16} />, text: "Stress-Free" }
  ];
  
  return (
    <motion.div 
      className="flex flex-col items-center sm:items-start gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="text-sm text-muted-foreground bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-2 rounded-lg"
        animate={{ 
          boxShadow: ["0 0 0px rgba(139, 92, 246, 0)", "0 0 8px rgba(139, 92, 246, 0.3)", "0 0 0px rgba(139, 92, 246, 0)"]
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      >
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-medium">
          The future of learning is here:
        </span>
      </motion.div>
      
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        {/* NEET Exam Badge with click handler */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNeetExamClick}
          style={{ cursor: 'pointer' }}
          className="relative"
        >
          {/* Glowing background effect */}
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
              
              {/* Pulse effect */}
              <motion.div 
                className="absolute inset-0 bg-white rounded-full"
                animate={{ 
                  scale: [1, 1.6],
                  opacity: [0.8, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              />
            </motion.div>
            
            <Sparkles size={14} className="text-blue-200" />
          </Badge>
          
          {/* Call-to-action hint */}
          <motion.div
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-indigo-400 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            Begin your future
          </motion.div>
        </motion.div>
        
        {/* Benefits badges in a futuristic style */}
        <div className="flex flex-wrap gap-2">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
            >
              <Badge 
                className="bg-gradient-to-r from-blue-50 to-violet-50 text-violet-700 border border-violet-200/50 hover:border-violet-300 dark:from-blue-900/30 dark:to-violet-900/30 dark:text-violet-300 dark:border-violet-800/50 flex items-center gap-1.5"
                variant="outline"
              >
                <motion.div
                  animate={{
                    rotate: [0, index % 2 === 0 ? 10 : -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  className="text-blue-600 dark:text-blue-400"
                >
                  {benefit.icon}
                </motion.div>
                {benefit.text}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExamNamesBadge;


import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

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
      className="flex flex-wrap justify-center items-center gap-2 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-sm text-muted-foreground mr-1">
        Specialized for:
      </div>
      
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNeetExamClick}
          style={{ cursor: 'pointer' }}
        >
          <Badge 
            className="bg-green-600 hover:bg-green-700 px-3 py-2 text-white flex items-center gap-1.5 shadow-lg"
          >
            <div className="bg-white rounded-full p-0.5">
              <GraduationCap size={14} className="text-green-600" />
            </div>
            
            <span className="font-semibold">
              NEET Exam
            </span>
            
            <span 
              className="bg-white text-green-600 text-xs px-1.5 py-0.5 rounded-full font-medium"
            >
              LIVE
            </span>
          </Badge>
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


import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, BookOpen } from "lucide-react";

interface HeroButtonsProps {
  onAnalyzeClick: () => void;
}

const HeroButtons = ({ onAnalyzeClick }: HeroButtonsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col sm:flex-row justify-start items-center gap-4 mb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          size="lg"
          className="bg-gradient-to-r from-violet-600 to-purple-500 hover:opacity-90 text-white px-8 py-6 shadow-md hover:shadow-xl transition-all"
          onClick={onAnalyzeClick}
        >
          <motion.div
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.5 }}
          >
            <TrendingUp className="mr-2" />
          </motion.div>
          Test Your Exam Readiness Now
        </Button>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          size="lg" 
          variant="outline"
          className="border-violet-500 text-violet-600 hover:bg-violet-50 shadow-sm hover:shadow-md transition-all"
          asChild
        >
          <Link to="/signup">
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5 }}
            >
              <BookOpen className="mr-2" />
            </motion.div>
            Start Free Preparation
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroButtons;

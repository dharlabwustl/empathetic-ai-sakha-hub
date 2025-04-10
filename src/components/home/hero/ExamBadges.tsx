
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { 
  FileText, 
  GraduationCap, 
  Medal, 
  Brain, 
  BarChart3, 
  Award, 
  Trophy,
  BookOpen
} from "lucide-react";

interface ExamBadge {
  name: string;
  icon: ReactNode;
}

interface ExamBadgesProps {
  badges: ExamBadge[];
}

const ExamBadges = ({ badges }: ExamBadgesProps) => {
  // Create a circular layout with animation
  return (
    <div className="relative mb-6">
      {/* Animated ecosystem visualization based on first image */}
      <motion.div
        className="absolute -left-4 -top-4 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-40 h-40 md:w-52 md:h-52">
          {/* Center element */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg z-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <p className="text-sm font-bold">Exam</p>
          </motion.div>

          {/* Connecting lines */}
          {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360].map((angle, idx) => (
            <motion.div
              key={angle}
              className="absolute top-1/2 left-1/2 h-px bg-violet-300 origin-left z-10"
              style={{ 
                rotate: `${angle}deg`,
                width: '100px'
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + (idx * 0.05), duration: 0.4 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 relative z-30">
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <Badge className="bg-white text-violet-700 hover:bg-violet-50 border border-violet-200 shadow-sm py-1.5 px-3 flex items-center gap-1">
              {badge.icon}
              <span className="ml-1">{badge.name}</span>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.6 }}
                className="text-yellow-500"
              >
                <Sparkles size={10} />
              </motion.div>
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Default exam badges
ExamBadges.defaultProps = {
  badges: [
    { name: "UPSC", icon: <FileText size={12} /> },
    { name: "JEE", icon: <GraduationCap size={12} /> },
    { name: "NEET", icon: <Medal size={12} /> },
    { name: "GMAT", icon: <Brain size={12} /> },
    { name: "CAT", icon: <BarChart3 size={12} /> },
    { name: "GATE", icon: <Award size={12} /> },
    { name: "SSC", icon: <FileText size={12} /> },
    { name: "Banking", icon: <Trophy size={12} /> },
    { name: "GRE", icon: <BookOpen size={12} /> }
  ]
};

export default ExamBadges;

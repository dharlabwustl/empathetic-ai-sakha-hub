
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FileText, GraduationCap, Medal, Brain, BarChart3, Award, Trophy } from "lucide-react";

interface ExamBadge {
  name: string;
  icon: ReactNode;
}

interface ExamBadgesProps {
  badges: ExamBadge[];
}

const ExamBadges = ({ badges }: ExamBadgesProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 * index, duration: 0.3 }}
        >
          <Badge className="bg-white text-violet-700 hover:bg-violet-50 border border-violet-200 shadow-sm py-1.5 px-3">
            {badge.icon}
            <span className="ml-1">{badge.name}</span>
          </Badge>
        </motion.div>
      ))}
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
    { name: "Banking", icon: <Trophy size={12} /> }
  ]
};

export default ExamBadges;

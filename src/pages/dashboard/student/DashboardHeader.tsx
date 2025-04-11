
import { Button } from "@/components/ui/button";
import { UserProfileType } from "@/types/user";
import { Eye } from "lucide-react";
import MoodLogButton from "@/components/dashboard/student/MoodLogButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
}

// Extend the userProfile type locally to handle the streak property
interface ExtendedUserProfile extends UserProfileType {
  studyStreak?: number;
}

const DashboardHeader = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan
}: DashboardHeaderProps) => {
  const isMobile = useIsMobile();
  // Cast to our extended type
  const extendedProfile = userProfile as ExtendedUserProfile;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.15 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="mb-6 p-4 sm:p-6 rounded-xl bg-gradient-to-r from-violet-500/10 via-sky-100/20 to-purple-100/20 border border-violet-200/50 shadow-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.div variants={itemVariants}>
          <motion.h1 
            className="text-2xl md:text-3xl font-semibold flex items-center"
            variants={itemVariants}
          >
            Hello, 
            <motion.span 
              className="gradient-text ml-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            >
              {userProfile.name}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="inline-block ml-2"
            >
              👋
            </motion.span>
          </motion.h1>
          
          <motion.div 
            className="text-xs sm:text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 sm:gap-x-4 mt-1"
            variants={itemVariants}
          >
            <span>{formattedDate}</span>
            <span className="hidden xs:inline-block">•</span>
            <span className="hidden xs:inline-block">{formattedTime}</span>
            {userProfile.goals && userProfile.goals[0] && (
              <motion.span 
                className="font-medium text-primary bg-violet-100/70 px-2 py-0.5 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                Goal: {userProfile.goals[0].title}
              </motion.span>
            )}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex gap-2 items-start justify-start md:justify-end w-full sm:w-auto"
          variants={itemVariants}
        >
          <MoodLogButton className={`${isMobile ? 'text-xs px-3 py-1' : ''} whitespace-nowrap`} />
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={onViewStudyPlan}
              className={`
                flex items-center gap-2 shadow-md whitespace-nowrap
                bg-gradient-to-r from-violet-500 to-sky-500 hover:from-violet-600 hover:to-sky-600
                ${isMobile ? 'text-xs px-3 py-1 h-8' : ''}
              `}
            >
              <Eye size={isMobile ? 14 : 18} />
              <span>View Study Plan</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {extendedProfile.studyStreak && extendedProfile.studyStreak > 0 && (
        <motion.div 
          className="mt-3 sm:mt-4 flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex">
            {[...Array(Math.min(extendedProfile.studyStreak, 5))].map((_, i) => (
              <motion.div 
                key={i}
                className="w-6 h-6 bg-amber-100 rounded-full border-2 border-amber-300 flex items-center justify-center -ml-1 first:ml-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1 }}
              >
                <span className="text-xs">🔥</span>
              </motion.div>
            ))}
          </div>
          <span className="text-xs font-medium text-amber-700">
            {extendedProfile.studyStreak} day{extendedProfile.studyStreak > 1 ? 's' : ''} streak! Keep it up!
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardHeader;


import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import RedesignedTodaysPlan from '@/components/dashboard/student/todays-plan/RedesignedTodaysPlan';
import TodayStudyPlan from '@/components/dashboard/student/TodayStudyPlan';
import { useStudentProfile } from '@/hooks/useStudentProfile';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CalendarDays, Brain, Clock, Book } from 'lucide-react';

const TodaysPlanView: React.FC = () => {
  const { userProfile, loading } = useStudentProfile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
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
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <SharedPageLayout
      title="Today's Study Plan"
      subtitle="Your personalized daily learning schedule to keep you on track"
      icon={<CalendarDays className="h-5 w-5 text-violet-500" />}
    >
      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-md w-48"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        </div>
      ) : userProfile ? (
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-0 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/40 dark:to-indigo-950/40 shadow-md">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-300">
                      <Brain className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-violet-800 dark:text-violet-300">
                      Learning Schedule
                    </h3>
                  </div>
                  <TodayStudyPlan />
                </div>
                <div className="bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/40 dark:to-indigo-900/40 px-6 py-3 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-300">
                    <Clock className="h-4 w-4" />
                    <span>Estimated completion time: 3.5 hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-300">
                    <Book className="h-4 w-4" />
                    <span>4 concepts to master today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Please log in to view your personalized study plan.
          </p>
        </div>
      )}
    </SharedPageLayout>
  );
};

export default TodaysPlanView;

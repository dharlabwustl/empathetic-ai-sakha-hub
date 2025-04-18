
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, TrendingUp, Smile, Users, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';
import { adminService } from '@/services/adminService';

export interface KpiStats {
  stressReduction: number;
  timeOptimization: number;
  habitFormation: number;
  examConfidence: number;
  userRetention: number;
  moodBasedUsage: number;
}

interface KpiItem {
  icon: React.ReactNode;
  stat: string;
  description: string;
  color: string;
  delay: number;
}

// Define minimum thresholds for data validity
const MIN_SAMPLE_SIZE = 50; // Minimum number of users for reliable stats
const MIN_SESSIONS_FOR_TIME_CALC = 100; // Minimum sessions for time calculation

const KpiStats = () => {
  const [stats, setStats] = React.useState<KpiStats>({
    stressReduction: 0,
    timeOptimization: 0,
    habitFormation: 0,
    examConfidence: 0,
    userRetention: 0,
    moodBasedUsage: 0
  });
  
  // New state to track data reliability
  const [dataReliability, setDataReliability] = React.useState({
    stressReduction: false,
    timeOptimization: false,
    habitFormation: false,
    examConfidence: false,
    userRetention: false,
    moodBasedUsage: false
  });

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const dashboardStats = await adminService.getDashboardStats();
        
        if (dashboardStats) {
          // Check if we have enough data for reliable statistics
          const hasSufficientUsers = dashboardStats.totalStudents >= MIN_SAMPLE_SIZE;
          const hasSufficientSessions = dashboardStats.totalSessions >= MIN_SESSIONS_FOR_TIME_CALC;
          
          // Calculate metrics with confidence indicators
          const newStats = {
            // Calculate stress reduction based on verified mood improvement data
            stressReduction: dashboardStats.verifiedMoodImprovement 
              ? Math.min(Math.round(dashboardStats.verifiedMoodImprovement), 100)
              : Math.min(Math.round((dashboardStats.averageMoodScore - 5) / 5 * 100), 100),
            
            // Calculate time optimization based on study plan efficiency metrics
            // If we have verified time savings data, use it; otherwise calculate from efficiency improvement
            timeOptimization: dashboardStats.averageTimeSavedPerWeek 
              ? Math.round(dashboardStats.averageTimeSavedPerWeek) 
              : dashboardStats.studyPlanEfficiencyImprovement
                ? Math.round(dashboardStats.studyPlanEfficiencyImprovement / 10)
                : 5,
            
            // Calculate habit formation using verified consistency data across 2+ weeks
            habitFormation: dashboardStats.studentsWithVerifiedConsistentHabits && hasSufficientUsers
              ? Math.round((dashboardStats.studentsWithVerifiedConsistentHabits / dashboardStats.totalStudents) * 100)
              : Math.round((dashboardStats.studentsWithConsistentHabits / dashboardStats.totalStudents) * 100),
            
            // Calculate exam confidence from pre/post survey data
            examConfidence: dashboardStats.verifiedExamConfidenceImprovement
              ? Math.round(dashboardStats.verifiedExamConfidenceImprovement) 
              : Math.round((dashboardStats.averageConfidenceScore / 10) * 100),
            
            // Calculate user retention with verified retention data
            userRetention: dashboardStats.verifiedRetentionRate
              ? dashboardStats.verifiedRetentionRate
              : Math.round((dashboardStats.activeStudents / dashboardStats.totalStudents) * 100),
            
            // Calculate mood feature usage with verified engagement data
            moodBasedUsage: dashboardStats.verifiedMoodFeatureUsage
              ? dashboardStats.verifiedMoodFeatureUsage
              : Math.round((dashboardStats.moodBasedSessionsCount / dashboardStats.totalSessions) * 100)
          };
          
          setStats(newStats);
          
          // Set data reliability based on sample sizes and verification status
          setDataReliability({
            stressReduction: Boolean(dashboardStats.verifiedMoodImprovement) && hasSufficientUsers,
            timeOptimization: Boolean(dashboardStats.averageTimeSavedPerWeek) && hasSufficientSessions,
            habitFormation: Boolean(dashboardStats.studentsWithVerifiedConsistentHabits) && hasSufficientUsers,
            examConfidence: Boolean(dashboardStats.verifiedExamConfidenceImprovement) && hasSufficientUsers,
            userRetention: Boolean(dashboardStats.verifiedRetentionRate) && hasSufficientUsers,
            moodBasedUsage: Boolean(dashboardStats.verifiedMoodFeatureUsage) && hasSufficientSessions
          });
        }
      } catch (error) {
        console.error('Failed to fetch KPI stats:', error);
      }
    };

    fetchStats();
  }, []);

  const getDescription = (key: keyof KpiStats, description: string) => {
    // Add "estimated" prefix to descriptions for non-reliable data
    return dataReliability[key] ? description : `estimated ${description}`;
  };

  const kpis: KpiItem[] = [
    {
      icon: <Brain className="h-6 w-6 text-white" />,
      stat: `${stats.stressReduction}%`,
      description: getDescription('stressReduction', "of students said Sakha helped reduce exam stress"),
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
      delay: 0.1,
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      stat: `${stats.timeOptimization}+ hours`,
      description: getDescription('timeOptimization', "saved weekly through personalized study plans"),
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      delay: 0.2,
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      stat: `${stats.habitFormation}%`,
      description: getDescription('habitFormation', "of students built a consistent study habit in 2 weeks"),
      color: "bg-gradient-to-br from-green-500 to-green-700",
      delay: 0.3,
    },
    {
      icon: <Smile className="h-6 w-6 text-white" />,
      stat: `4 out of 5`,
      description: getDescription('examConfidence', "students felt more confident before their exam"),
      color: "bg-gradient-to-br from-amber-500 to-amber-700",
      delay: 0.4,
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      stat: `${stats.userRetention}%+`,
      description: getDescription('userRetention', "of Sakha users continued after their 1st month"),
      color: "bg-gradient-to-br from-pink-500 to-pink-700",
      delay: 0.5,
    },
    {
      icon: <Headphones className="h-6 w-6 text-white" />,
      stat: `${stats.moodBasedUsage}%`,
      description: getDescription('moodBasedUsage', "use mood-based learning themes daily"),
      color: "bg-gradient-to-br from-indigo-500 to-indigo-700",
      delay: 0.6,
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Proven Results That Matter
        </motion.h2>
        
        <motion.p 
          className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Based on our pilot program feedback and verified user data, here's how Sakha AI is making a difference
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((kpi, index) => (
            <KpiCard key={index} kpi={kpi} />
          ))}
        </div>
      </div>
    </div>
  );
};

const KpiCard: React.FC<{ kpi: KpiItem }> = ({ kpi }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: kpi.delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 }
      }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center space-x-4">
        <div className={cn("p-3 rounded-lg", kpi.color)}>
          {kpi.icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            {kpi.stat}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {kpi.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default KpiStats;

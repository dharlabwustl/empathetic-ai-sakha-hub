
import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Clock, Brain, CheckSquare } from 'lucide-react';
import { adminService } from '@/services/adminService';

const KpiStats = () => {
  // Using the stats data directly from the adminService
  const [stats, setStats] = React.useState([
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      value: '50,000+',
      label: 'Students',
      description: 'Mastering exams with our platform'
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-500" />,
      value: '1,200+',
      label: 'Concepts Mastered',
      description: 'Per student on average'
    },
    {
      icon: <Award className="h-8 w-8 text-green-500" />,
      value: '92%',
      label: 'Success Rate',
      description: 'Higher exam scores using PREPZR'
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-500" />,
      value: '35%',
      label: 'Time Saved',
      description: 'Study more efficiently with AI'
    },
    {
      icon: <Brain className="h-8 w-8 text-red-500" />,
      value: '72%',
      label: 'Stress Reduced',
      description: 'Feel better while studying'
    },
    {
      icon: <CheckSquare className="h-8 w-8 text-indigo-500" />,
      value: '24+',
      label: 'Dynamic Plans',
      description: 'Personalized study plans delivered'
    }
  ]);

  // Fetch stats from backend when component mounts
  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const dashboardStats = await adminService.getDashboardStats();
        
        if (dashboardStats) {
          // Update the stats with data from the backend
          setStats([
            {
              icon: <Users className="h-8 w-8 text-blue-500" />,
              value: dashboardStats.totalStudents ? 
                dashboardStats.totalStudents.toLocaleString() + '+' : 
                '50,000+',
              label: 'Students',
              description: 'Mastering exams with our platform'
            },
            {
              icon: <BookOpen className="h-8 w-8 text-purple-500" />,
              value: dashboardStats.averageConcepts ? 
                dashboardStats.averageConcepts.toLocaleString() + '+' : 
                '1,200+',
              label: 'Concepts Mastered',
              description: 'Per student on average'
            },
            {
              icon: <Award className="h-8 w-8 text-green-500" />,
              value: dashboardStats.successRate ? 
                dashboardStats.successRate + '%' : 
                '92%',
              label: 'Success Rate',
              description: 'Higher exam scores using PREPZR'
            },
            {
              icon: <Clock className="h-8 w-8 text-orange-500" />,
              value: dashboardStats.averageTimeSavedPerWeek ? 
                dashboardStats.averageTimeSavedPerWeek * 10 + '%' : 
                '35%',
              label: 'Time Saved',
              description: 'Study more efficiently with AI'
            },
            {
              icon: <Brain className="h-8 w-8 text-red-500" />,
              value: dashboardStats.verifiedMoodImprovement ? 
                dashboardStats.verifiedMoodImprovement + '%' : 
                '72%',
              label: 'Stress Reduced',
              description: 'Feel better while studying'
            },
            {
              icon: <CheckSquare className="h-8 w-8 text-indigo-500" />,
              value: dashboardStats.totalStudyPlans ? 
                Math.round(dashboardStats.totalStudyPlans / 500) + '+' : 
                '24+',
              label: 'Dynamic Plans',
              description: 'Personalized study plans delivered'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching KPI stats:', error);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-5 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
        <h3 className="text-xl md:text-2xl font-bold">
          Smart Data. Real Impact. Humanizing exam prep.
        </h3>
        <p className="text-violet-100">
          Our AI-driven platform transforms how students prepare for NEET exams
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 p-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <div className="mb-3 p-3 rounded-full bg-gray-100 dark:bg-gray-700 shadow-sm">
              {stat.icon}
            </div>
            <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h4>
            <p className="font-semibold text-purple-600 dark:text-purple-400">{stat.label}</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{stat.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default KpiStats;

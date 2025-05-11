
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Users, Brain, Calendar, Heart } from 'lucide-react';
import { adminService } from '@/services/adminService';
import { useState } from 'react';

// Get KPI data from admin service
const useKpiData = () => {
  const [kpiData, setKpiData] = useState({
    totalStudents: 0,
    averageConcepts: 0,
    totalStudyPlans: 0,
    verifiedMoodImprovement: 0
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await adminService.getDashboardStats();
        setKpiData({
          totalStudents: stats.totalStudents || 15000, // Updated number
          averageConcepts: stats.averageConcepts || 950, // Updated number
          totalStudyPlans: stats.totalStudyPlans || 18000, // Updated number
          verifiedMoodImprovement: stats.verifiedMoodImprovement || 84 // Updated percentage
        });
      } catch (error) {
        console.error("Failed to fetch KPI data:", error);
        // Use fallback data
        setKpiData({
          totalStudents: 15000,
          averageConcepts: 950,
          totalStudyPlans: 18000,
          verifiedMoodImprovement: 84
        });
      }
    };
    
    fetchData();
  }, []);
  
  return kpiData;
}

const StatCard = ({ 
  icon, 
  value, 
  label, 
  delay = 0,
  gradient = 'from-blue-500 to-violet-500' 
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
  gradient?: string;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, delay: delay * 0.1 + 0.3 }
        }
      }}
      className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient}`}></div>
      <div className="p-5 md:p-6">
        <div className="flex items-center justify-between mb-2">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-10`}>
            {icon}
          </div>
        </div>
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: delay * 0.1 + 0.5 }}
          className={`text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        >
          {value}
        </motion.h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
      </div>
    </motion.div>
  );
};

const KpiStats = () => {
  const kpiData = useKpiData();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
      <StatCard 
        icon={<Users size={24} className="text-white" />} 
        value={`+${kpiData.totalStudents.toLocaleString()}`} 
        label="Students Helped"
        delay={0}
        gradient="from-blue-500 to-violet-500"
      />
      
      <StatCard 
        icon={<Brain size={24} className="text-white" />} 
        value={`${kpiData.averageConcepts}/Student`} 
        label="Concepts Mastered Avg"
        delay={1}
        gradient="from-violet-500 to-purple-500"
      />
      
      <StatCard 
        icon={<Calendar size={24} className="text-white" />} 
        value={`${kpiData.totalStudyPlans.toLocaleString()}+`} 
        label="Dynamic Study Plans Delivered"
        delay={2}
        gradient="from-indigo-500 to-blue-500"
      />
      
      <StatCard 
        icon={<Heart size={24} className="text-white" />} 
        value={`${kpiData.verifiedMoodImprovement}%`} 
        label="Feel Stress Reduced"
        delay={3}
        gradient="from-green-500 to-teal-500"
      />
    </div>
  );
};

export default KpiStats;

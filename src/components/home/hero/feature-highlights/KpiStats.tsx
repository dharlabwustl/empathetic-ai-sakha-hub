
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Users, Brain, Award, BookOpen, Calendar, Heart } from 'lucide-react';

interface KpiValue {
  value: string;
  label: string;
}

// Mock API data - in a real app this would come from your backend
const getKpiData = (): Record<string, KpiValue> => {
  // This function would typically fetch from an API
  return {
    studentsHelped: { value: "+10,000", label: "Students Helped" },
    conceptsMastered: { value: "850/Student", label: "Concepts Mastered Avg" },
    successRate: { value: "95%", label: "Success Rate" },
    studyPlansDelivered: { value: "12,000+", label: "Study Plans Delivered" },
    stressReduced: { value: "72%", label: "Feel Reduced Anxiety" },
    flashcardsReviewed: { value: "2,000,000+", label: "Flashcards Reviewed" }
  };
};

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
  const kpiData = getKpiData();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
      <StatCard 
        icon={<Users size={24} className="text-white" />} 
        value={kpiData.studentsHelped.value}
        label={kpiData.studentsHelped.label}
        delay={0}
        gradient="from-blue-500 to-violet-500"
      />
      
      <StatCard 
        icon={<Brain size={24} className="text-white" />} 
        value={kpiData.conceptsMastered.value}
        label={kpiData.conceptsMastered.label}
        delay={1}
        gradient="from-violet-500 to-purple-500"
      />
      
      <StatCard 
        icon={<Award size={24} className="text-white" />} 
        value={kpiData.successRate.value}
        label={kpiData.successRate.label}
        delay={2}
        gradient="from-purple-500 to-pink-500"
      />
      
      <StatCard 
        icon={<Calendar size={24} className="text-white" />} 
        value={kpiData.studyPlansDelivered.value}
        label={kpiData.studyPlansDelivered.label}
        delay={3}
        gradient="from-indigo-500 to-blue-500"
      />
      
      <StatCard 
        icon={<Heart size={24} className="text-white" />} 
        value={kpiData.stressReduced.value}
        label={kpiData.stressReduced.label}
        delay={4}
        gradient="from-green-500 to-teal-500"
      />
      
      <StatCard 
        icon={<BookOpen size={24} className="text-white" />} 
        value={kpiData.flashcardsReviewed.value}
        label={kpiData.flashcardsReviewed.label}
        delay={5}
        gradient="from-pink-500 to-red-500"
      />
    </div>
  );
};

export default KpiStats;


import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Clock, Gauge, Brain, Sparkles } from 'lucide-react';

// Define the KPI data interface
interface KpiData {
  totalStudents: number;
  conceptsMastered: number;
  successRate: number;
  timeSaved: number;
  stressReduced: number;
  plansDelivered: number;
}

// This function would fetch data from your backend in a real implementation
const fetchKpiData = async (): Promise<KpiData> => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalStudents: 10000,
        conceptsMastered: 250,
        successRate: 92,
        timeSaved: 40,
        stressReduced: 65,
        plansDelivered: 15000
      });
    }, 500);
  });
};

const KpiItem = ({ icon, value, label, delay }: { icon: React.ReactNode, value: string, label: string, delay: number }) => (
  <motion.div 
    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
  >
    <div className="flex items-start">
      <div className="mr-4 p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  </motion.div>
);

const KpiStats = () => {
  const [kpiData, setKpiData] = useState<KpiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchKpiData();
        setKpiData(data);
      } catch (error) {
        console.error("Error loading KPI data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-pulse">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-200 dark:bg-gray-700 h-24 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!kpiData) {
    return null;
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}k+`;
    }
    return `${num}+`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <KpiItem 
        icon={<Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} 
        value={formatNumber(kpiData.totalStudents)} 
        label="Total Students" 
        delay={0.1} 
      />
      <KpiItem 
        icon={<GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} 
        value={`${kpiData.conceptsMastered}/student`} 
        label="Concepts Mastered" 
        delay={0.2} 
      />
      <KpiItem 
        icon={<Gauge className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} 
        value={`${kpiData.successRate}%`} 
        label="Success Rate" 
        delay={0.3} 
      />
      <KpiItem 
        icon={<Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} 
        value={`${kpiData.timeSaved}%`} 
        label="Time Saved" 
        delay={0.4} 
      />
      <KpiItem 
        icon={<Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} 
        value={`${kpiData.stressReduced}%`} 
        label="Stress Reduced" 
        delay={0.5} 
      />
      <KpiItem 
        icon={<Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} 
        value={formatNumber(kpiData.plansDelivered)} 
        label="Dynamic Plans Delivered" 
        delay={0.6} 
      />
    </div>
  );
};

export default KpiStats;

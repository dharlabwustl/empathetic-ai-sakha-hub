
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { statsData } from './kpiStatsData';
import StatCategory from './StatCategory';
import ProgressIndicator from './ProgressIndicator';
import { tabVariants } from './kpiAnimations';

export const KpiStats = () => {
  const [inView, setInView] = useState(false);
  const [activeTab, setActiveTab] = useState("impact");
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    const element = document.getElementById('kpi-stats-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  
  // Auto-rotate tabs every 6 seconds
  useEffect(() => {
    if (!inView) return;
    
    const categories = Object.keys(statsData);
    const interval = setInterval(() => {
      setActiveTab(prevTab => {
        const currentIndex = categories.indexOf(prevTab);
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex];
      });
    }, 6000);
    
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div 
      id="kpi-stats-section" 
      className="bg-gradient-to-r from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-900 dark:to-blue-900/20 py-4 px-4 rounded-xl shadow-md border border-purple-100/50 dark:border-purple-900/50 mx-auto max-w-5xl"
    >
      <div className="text-center mb-3">
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Smart Data. Real Impact. Humanizing exam preparation.
        </motion.h3>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-3">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={tabVariants}
          >
            <TabsList className="bg-purple-100/60 dark:bg-gray-800/60 p-1">
              <TabsTrigger 
                value="impact" 
                className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
              >
                Impact
              </TabsTrigger>
              <TabsTrigger 
                value="learning" 
                className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
              >
                Learning
              </TabsTrigger>
              <TabsTrigger 
                value="engagement" 
                className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
              >
                Engagement
              </TabsTrigger>
            </TabsList>
          </motion.div>
        </div>
        
        {Object.entries(statsData).map(([category, stats]) => (
          <StatCategory 
            key={category} 
            category={category} 
            stats={stats} 
            inView={inView} 
            activeTab={activeTab} 
          />
        ))}
      </Tabs>
      
      <ProgressIndicator 
        categories={Object.keys(statsData)} 
        activeTab={activeTab} 
      />
    </div>
  );
};

export default KpiStats;

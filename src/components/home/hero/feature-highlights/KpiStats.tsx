
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Enhanced stats with categories
const statsData = {
  impact: [
    { id: 1, value: 10000, label: "Students Helped", prefix: "+", suffix: "", decimals: 0, icon: "👩‍🎓" },
    { id: 2, value: 95, label: "Success Rate", prefix: "", suffix: "%", decimals: 0, icon: "✅" },
    { id: 3, value: 20, label: "Target Exams Covered", prefix: "+", suffix: "", decimals: 0, icon: "🎯" },
    { id: 4, value: 72, label: "Feel Reduced Anxiety", prefix: "", suffix: "%", decimals: 0, icon: "🧘" }
  ],
  learning: [
    { id: 5, value: 850, label: "Concepts Mastered", prefix: "Avg ", suffix: "", decimals: 0, icon: "🧠" },
    { id: 6, value: 500000, label: "Practice Questions", prefix: "", suffix: "+", decimals: 0, icon: "📚" },
    { id: 7, value: 2000000, label: "Flashcards Reviewed", prefix: "", suffix: "+", decimals: 0, icon: "🃏" },
    { id: 8, value: 12000, label: "Study Plans Delivered", prefix: "", suffix: "+", decimals: 0, icon: "🔄" }
  ],
  engagement: [
    { id: 9, value: 6.5, label: "Weekly Study Hours", prefix: "Avg ", suffix: "hrs", decimals: 1, icon: "⏳" },
    { id: 10, value: 85, label: "Log Weekly Moods", prefix: "", suffix: "%", decimals: 0, icon: "😊" },
    { id: 11, value: 98, label: "Student Satisfaction", prefix: "", suffix: "%", decimals: 0, icon: "⭐" },
    { id: 12, value: 3.2, label: "Daily Learning Sessions", prefix: "Avg ", suffix: "", decimals: 1, icon: "📊" }
  ]
};

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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 } 
    }
  };
  
  const tabVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div 
      id="kpi-stats-section" 
      className="bg-gradient-to-r from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-900 dark:to-blue-900/20 py-4 px-4 rounded-xl shadow-sm border border-purple-100/50 dark:border-purple-900/50"
    >
      <div className="text-center mb-2">
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
        <div className="flex justify-center mb-2">
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
          <TabsContent key={category} value={category} className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView && activeTab === category ? "visible" : "hidden"}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mx-auto max-w-6xl"
            >
              {stats.map((stat) => (
                <motion.div 
                  key={stat.id} 
                  variants={itemVariants}
                  className="flex flex-col items-center text-center bg-white dark:bg-gray-800/60 p-2 rounded-lg border border-purple-100/30 dark:border-purple-800/30 shadow-sm hover:shadow transition-shadow"
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <span className="text-2xl mb-1" aria-hidden="true">{stat.icon}</span>
                  <motion.div 
                    className="text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center"
                  >
                    <span>{stat.prefix}</span>
                    {inView ? (
                      <CountUp 
                        start={0} 
                        end={stat.value} 
                        duration={2} 
                        separator="," 
                        decimals={stat.decimals}
                        decimal="."
                      />
                    ) : (
                      <span>0</span>
                    )}
                    <span>{stat.suffix}</span>
                  </motion.div>
                  <motion.p 
                    className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 h-8"
                  >
                    {stat.label}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Progress indicator dots */}
      <div className="flex justify-center gap-1 mt-2">
        {Object.keys(statsData).map((category) => (
          <motion.div
            key={category}
            className={`h-1.5 w-1.5 rounded-full ${activeTab === category 
              ? 'bg-purple-500' 
              : 'bg-purple-200 dark:bg-purple-800/40'}`}
            animate={{
              scale: activeTab === category ? [1, 1.2, 1] : 1,
              transition: { repeat: activeTab === category ? Infinity, duration: 2 }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default KpiStats;

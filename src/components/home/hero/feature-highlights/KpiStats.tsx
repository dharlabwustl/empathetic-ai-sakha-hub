
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
  { id: 1, value: 10000, label: "Students", prefix: "+", suffix: "", decimals: 0 },
  { id: 2, value: 95, label: "Success Rate", prefix: "", suffix: "%", decimals: 0 },
  { id: 3, value: 500000, label: "Practice Questions", prefix: "+", suffix: "", decimals: 0 },
  { id: 4, value: 850, label: "Concepts Mastered", prefix: "Avg ", suffix: "", decimals: 0 }
];

export const KpiStats = () => {
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      } 
    }
  };

  return (
    <div 
      id="kpi-stats-section" 
      className="bg-gradient-to-r from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-900 dark:to-blue-900/20 py-8 px-4 rounded-2xl shadow-sm border border-purple-100/50 dark:border-purple-900/50"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-6xl mx-auto"
      >
        {stats.map((stat) => (
          <motion.div 
            key={stat.id} 
            variants={itemVariants}
            className="flex flex-col items-center text-center"
          >
            <motion.div 
              className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2 flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span>{stat.prefix}</span>
              {inView ? (
                <CountUp 
                  start={0} 
                  end={stat.value} 
                  duration={2.5} 
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
              className="text-sm text-gray-600 dark:text-gray-300"
              whileHover={{ color: "#8B5CF6" }}
            >
              {stat.label}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default KpiStats;

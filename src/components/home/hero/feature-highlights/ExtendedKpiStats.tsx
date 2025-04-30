
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface KpiStatItem {
  id: number;
  value: number;
  prefix: string;
  suffix: string;
  description: string;
  color: string;
  icon?: React.ReactNode;
  decimals?: number;
}

const extendedStats: KpiStatItem[] = [
  { 
    id: 1, 
    value: 56, 
    prefix: "", 
    suffix: "%", 
    description: "of students said Sakha helped reduce exam stress",
    color: "from-blue-400 to-blue-600",
    decimals: 0
  },
  { 
    id: 2, 
    value: 5, 
    prefix: "", 
    suffix: "+ hours", 
    description: "saved weekly through personalized study plans",
    color: "from-green-400 to-green-600",
    decimals: 0
  },
  { 
    id: 3, 
    value: 70, 
    prefix: "", 
    suffix: "%", 
    description: "of students built a consistent study habit in 2 weeks",
    color: "from-violet-400 to-violet-600",
    decimals: 0
  },
  { 
    id: 4, 
    value: 80, 
    prefix: "", 
    suffix: "%", 
    description: "of students felt more confident before their exam",
    color: "from-amber-400 to-amber-600",
    decimals: 0
  },
  { 
    id: 5, 
    value: 70, 
    prefix: "", 
    suffix: "%+", 
    description: "of Sakha users continued after their 1st month",
    color: "from-pink-400 to-pink-600",
    decimals: 0
  },
  { 
    id: 6, 
    value: 63, 
    prefix: "", 
    suffix: "%", 
    description: "use mood-based learning themes daily",
    color: "from-indigo-400 to-indigo-600",
    decimals: 0
  }
];

const ExtendedKpiStats: React.FC = () => {
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
    
    const element = document.getElementById('extended-kpi-stats-section');
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
        staggerChildren: 0.15,
        delayChildren: 0.3,
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: (i: number) => ({ 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 80,
        delay: i * 0.1, 
        duration: 0.6
      } 
    })
  };

  return (
    <div 
      id="extended-kpi-stats-section" 
      className="py-8 px-4 rounded-2xl bg-white/90 dark:bg-gray-800/90 shadow-lg"
    >
      <h3 className="text-xl font-semibold text-center mb-6">Impact on Student Success</h3>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {extendedStats.map((stat, index) => (
          <motion.div 
            key={stat.id}
            custom={index}
            variants={itemVariants}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 shadow-md border border-purple-100/30 dark:border-purple-800/30 group hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col h-full">
              <motion.div 
                className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 flex items-center`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span>{stat.prefix}</span>
                {inView ? (
                  <CountUp 
                    start={0} 
                    end={stat.value} 
                    duration={2 + (index * 0.3)} 
                    separator="," 
                    decimals={stat.decimals || 0}
                    decimal="."
                    delay={0.5 + (index * 0.2)}
                  />
                ) : (
                  <span>0</span>
                )}
                <span>{stat.suffix}</span>
              </motion.div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {stat.description}
              </p>
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-gradient-to-r from-purple-200/20 to-blue-200/20 dark:from-purple-700/20 dark:to-blue-700/20 blur-xl group-hover:w-32 group-hover:h-32 transition-all duration-500"></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExtendedKpiStats;

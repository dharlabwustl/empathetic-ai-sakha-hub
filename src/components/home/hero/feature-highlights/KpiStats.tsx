
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const kpiData = [
  {
    metric: '56%',
    description: 'of students said PREPZR helped reduce exam stress',
    icon: '😌'
  },
  {
    metric: '5+ hours',
    description: 'saved weekly through personalized study plans',
    icon: '⏰'
  },
  {
    metric: '70%',
    description: 'of students built a consistent study habit in 2 weeks',
    icon: '📚'
  },
  {
    metric: '4 out of 5',
    description: 'students felt more confident before their exam',
    icon: '💪'
  },
  {
    metric: '70%+',
    description: 'of PREPZR users continued after their 1st month',
    icon: '🎯'
  },
  {
    metric: '63%',
    description: 'use mood-based learning themes daily',
    icon: '😊'
  }
];

const KpiStats = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          The PREPZR Impact
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {kpiData.map((kpi, index) => (
            <motion.div
              key={index}
              className={cn(
                "relative bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow",
                index % 3 === 0 && "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10",
                index % 3 === 1 && "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10",
                index % 3 === 2 && "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10"
              )}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }
                }
              }}
            >
              <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-2xl">
                {kpi.icon}
              </div>
              <div className="pt-4">
                <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {kpi.metric}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {kpi.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default KpiStats;

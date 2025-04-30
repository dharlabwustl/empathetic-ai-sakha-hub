
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Check, Clock, Calendar, Star, Heart, TrendingUp } from 'lucide-react';

const stats = [
  {
    value: '56%',
    label: 'estimated of students said PREPZR helped reduce exam stress',
    icon: Heart,
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  },
  {
    value: '5+ hours',
    label: 'estimated saved weekly through personalized study plans',
    icon: Clock,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  },
  {
    value: '70%',
    label: 'estimated of students built a consistent study habit in 2 weeks',
    icon: Calendar,
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  },
  {
    value: '4 out of 5',
    label: 'estimated students felt more confident before their exam',
    icon: Star,
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  },
  {
    value: '70%+',
    label: 'estimated of PREPZR users continued after their 1st month',
    icon: Check,
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  },
  {
    value: '63%',
    label: 'estimated use mood-based learning themes daily',
    icon: TrendingUp,
    color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  },
];

const KpiStats = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 50
            }}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-start gap-4 h-full"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transition: { duration: 0.2 } 
              }}
            >
              <div className={`p-3 rounded-full ${stat.color} flex-shrink-0`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
              <motion.div 
                className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-500"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KpiStats;

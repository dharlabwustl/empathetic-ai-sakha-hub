
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Award, BrainCircuit, LineChart, BookOpen } from 'lucide-react';

// Animated counter component for numbers
const AnimatedCounter = ({ value, duration = 2, className = "" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value.toString().replace(/[^0-9]/g, ""));
    
    // Calculate increments based on duration
    const incrementTime = duration / end * 1000;
    
    // Don't run if no valid number
    if (start === end) return;
    
    // Start animation
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);
    
    return () => {
      clearInterval(timer);
    };
  }, [value, duration]);
  
  // Format the number with commas and add the + sign if present in original value
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const hasPlusSign = value.toString().includes('+');
  
  return (
    <span className={className}>
      {formattedCount}{hasPlusSign ? '+' : ''}
    </span>
  );
};

// KPI Stats component with animation and premium design
const KpiStats = () => {
  // This data would come from admin backend in a real implementation
  const kpiData = [
    {
      id: "students",
      label: "Total Students",
      value: "50,000+",
      icon: <Users className="h-6 w-6 text-white" />,
      description: "Active learners across the platform",
      color: "bg-blue-600"
    },
    {
      id: "success",
      label: "Exam Success Rate",
      value: "92%",
      icon: <Award className="h-6 w-6 text-white" />,
      description: "Students achieving target scores",
      color: "bg-green-600"
    },
    {
      id: "plans",
      label: "Dynamic Plans",
      value: "125,000+",
      icon: <LineChart className="h-6 w-6 text-white" />,
      description: "Personalized study plans generated",
      color: "bg-purple-600"
    },
    {
      id: "stress",
      label: "Stress Reduced",
      value: "73%",
      icon: <BrainCircuit className="h-6 w-6 text-white" />,
      description: "Decrease in exam anxiety reported",
      color: "bg-pink-600"
    },
    {
      id: "concepts",
      label: "Mastery Concepts",
      value: "1,200+",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      description: "Concepts mastered per student",
      color: "bg-amber-600"
    }
  ];

  const [activeKpi, setActiveKpi] = useState(kpiData[0].id);
  const [isVisible, setIsVisible] = useState(false);
  
  // Add intersection observer to trigger animations when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('kpi-stats-section');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div id="kpi-stats-section" className="w-full overflow-hidden py-8">
      {/* Premium gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-amber-950/30 opacity-50 -z-10 rounded-3xl"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
      
      <div className="flex flex-col space-y-8">
        {/* Circular KPI selector with premium glow effects */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-8">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.15, duration: 0.5 } 
              } : {}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveKpi(kpi.id)}
              className="cursor-pointer select-none"
            >
              <div className="flex flex-col items-center gap-3">
                <div 
                  className={`relative rounded-full ${kpi.color} ${activeKpi === kpi.id ? 'ring-4 ring-offset-2 ring-blue-300 dark:ring-blue-700 shadow-lg shadow-blue-300/30 dark:shadow-blue-900/30' : ''} 
                  p-6 flex items-center justify-center w-24 h-24 shadow-lg transition-all duration-300
                  hover:shadow-xl hover:shadow-blue-300/50 dark:hover:shadow-blue-900/50 group`}
                >
                  {/* Icon */}
                  <motion.div
                    animate={activeKpi === kpi.id ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0],
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: activeKpi === kpi.id ? Infinity : 0,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                  >
                    {kpi.icon}
                  </motion.div>

                  {/* Display value directly on circle */}
                  <motion.div
                    className={`absolute inset-0 flex flex-col items-center justify-center bg-opacity-80 rounded-full transition-opacity duration-300 ${
                      activeKpi === kpi.id ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                    } ${kpi.color}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeKpi === kpi.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-xl font-bold">
                      {kpi.value}
                    </span>
                  </motion.div>
                </div>
                
                {/* Label below the circle */}
                <div className="text-center">
                  <p className="font-medium text-sm">{kpi.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[120px] text-center">
                    {kpi.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected KPI display with animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKpi}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-3xl"
          >
            <Card className="overflow-hidden border border-purple-200 dark:border-purple-900 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-xl">
              <CardContent className="p-6">
                {kpiData.map((kpi) => (
                  kpi.id === activeKpi && (
                    <div key={kpi.id} className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center">
                        <motion.div 
                          className={`mr-4 p-3 rounded-full ${kpi.color}`}
                          initial={{ rotate: -10 }}
                          animate={{ 
                            rotate: 0,
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ 
                            rotate: { duration: 0.5 },
                            scale: { duration: 2, repeat: Infinity }
                          }}
                        >
                          {kpi.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-semibold">{kpi.label}</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">{kpi.description}</p>
                        </div>
                      </div>
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                        <AnimatedCounter value={kpi.value} />
                      </div>
                    </div>
                  )
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        
        {/* Animated bottom decoration */}
        <motion.div 
          className="flex justify-center mt-6"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: '40%' } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default KpiStats;

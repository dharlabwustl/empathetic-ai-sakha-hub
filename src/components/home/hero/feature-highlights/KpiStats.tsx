
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Award, BrainCircuit, LineChart, BookOpen } from 'lucide-react';

// This component displays key performance indicators in the "Our Impact" section with animations
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
  const [counter, setCounter] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-rotate through KPIs when not hovering
  useEffect(() => {
    if (isHovering) return;

    const intervalId = setInterval(() => {
      const currentIndex = kpiData.findIndex(kpi => kpi.id === activeKpi);
      const nextIndex = (currentIndex + 1) % kpiData.length;
      setActiveKpi(kpiData[nextIndex].id);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [activeKpi, isHovering, kpiData]);

  // Animated counter for values
  useEffect(() => {
    const active = kpiData.find(kpi => kpi.id === activeKpi);
    if (!active) return;
    
    const targetValue = parseInt(active.value.replace(/\D/g, ''));
    const duration = 1500;
    const framesPerSecond = 60;
    const totalFrames = duration / 1000 * framesPerSecond;
    const increment = targetValue / totalFrames;
    
    let currentCount = 0;
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= targetValue) {
        setCounter(targetValue);
        clearInterval(timer);
      } else {
        setCounter(Math.floor(currentCount));
      }
    }, 1000 / framesPerSecond);
    
    return () => clearInterval(timer);
  }, [activeKpi]);

  return (
    <div className="w-full" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className="flex flex-col space-y-6">
        {/* Circular KPI selector */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {kpiData.map((kpi) => (
            <motion.div
              key={kpi.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveKpi(kpi.id)}
              className="cursor-pointer flex flex-col items-center"
              initial={{ opacity: 0.7, y: 20 }}
              animate={{ 
                opacity: activeKpi === kpi.id ? 1 : 0.7, 
                y: 0,
                scale: activeKpi === kpi.id ? 1.05 : 1
              }}
              transition={{ 
                duration: 0.5, 
                type: "spring", 
                stiffness: 300, 
                damping: 15
              }}
            >
              <motion.div 
                className={`rounded-full ${kpi.color} ${activeKpi === kpi.id ? 'ring-4 ring-offset-2' : ''} 
                p-4 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 shadow-lg transition-all duration-300`}
                animate={activeKpi === kpi.id ? {
                  boxShadow: ["0px 0px 0px rgba(0,0,0,0.2)", "0px 0px 20px rgba(0,0,0,0.2)", "0px 0px 0px rgba(0,0,0,0.2)"]
                } : {}}
                transition={{
                  repeat: activeKpi === kpi.id ? Infinity : 0,
                  duration: 2
                }}
              >
                {kpi.icon}
              </motion.div>
              <span className="mt-2 text-xs md:text-sm font-medium text-center">{kpi.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Selected KPI display - with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKpi}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl"
          >
            <Card className="overflow-hidden border-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardContent className="p-6">
                {kpiData.map((kpi) => (
                  kpi.id === activeKpi && (
                    <motion.div 
                      key={kpi.id} 
                      className="flex flex-col md:flex-row items-center justify-between gap-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center">
                        <div className={`mr-4 p-4 rounded-full ${kpi.color} shadow-lg`}>
                          <motion.div
                            animate={{ 
                              rotate: [0, 10, 0, -10, 0],
                              scale: [1, 1.1, 1, 1.1, 1]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "loop"
                            }}
                          >
                            {kpi.icon}
                          </motion.div>
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold">{kpi.label}</h3>
                          <p className="text-gray-500 text-sm md:text-base">{kpi.description}</p>
                        </div>
                      </div>
                      <motion.div 
                        className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        {kpi.value}
                      </motion.div>
                    </motion.div>
                  )
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default KpiStats;

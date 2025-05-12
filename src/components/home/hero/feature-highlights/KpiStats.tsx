
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, Award, BrainCircuit, LineChart, BookOpen } from 'lucide-react';

// This component displays key performance indicators in the Impact section
const KpiStats = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // This data would come from admin backend in a real implementation
  const kpiData = [
    {
      id: "students",
      label: "Total Students",
      value: "50,000+",
      icon: <Users className="h-6 w-6 text-white" />,
      description: "Active learners across the platform",
      color: "bg-blue-600",
      highlight: "Our growing community of dedicated learners"
    },
    {
      id: "success",
      label: "Exam Success Rate",
      value: "92%",
      icon: <Award className="h-6 w-6 text-white" />,
      description: "Students achieving target scores",
      color: "bg-green-600",
      highlight: "Proven track record of student achievements"
    },
    {
      id: "plans",
      label: "Dynamic Plans",
      value: "125,000+",
      icon: <LineChart className="h-6 w-6 text-white" />,
      description: "Personalized study plans generated",
      color: "bg-purple-600",
      highlight: "AI-tailored learning journeys for every student"
    },
    {
      id: "stress",
      label: "Stress Reduced",
      value: "73%",
      icon: <BrainCircuit className="h-6 w-6 text-white" />,
      description: "Decrease in exam anxiety reported",
      color: "bg-pink-600",
      highlight: "Creating a positive, focused learning environment"
    },
    {
      id: "concepts",
      label: "Mastery Concepts",
      value: "1,200+",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      description: "Concepts mastered per student",
      color: "bg-amber-600",
      highlight: "Deep understanding through comprehensive coverage"
    }
  ];

  // Auto-rotate through tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % kpiData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  return (
    <div className="w-full py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Smart Data. Real Impact. Humanizing exam prep.
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col space-y-8"
      >
        {/* Tab Navigation - more spacious and elegant */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center gap-2 md:gap-4 overflow-x-auto py-2 px-1 max-w-full"
        >
          {kpiData.map((kpi, index) => (
            <motion.button
              key={kpi.id}
              onClick={() => setActiveTab(index)}
              className={`relative px-6 py-3 rounded-lg font-medium text-sm md:text-base whitespace-nowrap transition-all duration-300 flex items-center gap-2 
                ${activeTab === index 
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className={`inline-block w-2 h-2 rounded-full ${kpi.color}`}></span>
              {kpi.label}
              
              {/* Animated underline for active tab */}
              {activeTab === index && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500"
                  layoutId="activeTabUnderline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content with Premium Feel */}
        <motion.div
          layout
          className="relative w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: activeTab === index ? 1 : 0,
                x: activeTab === index ? 0 : 20,
                pointerEvents: activeTab === index ? "auto" : "none",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{ display: activeTab === index ? "block" : "none" }}
            >
              <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/90 dark:from-gray-900 dark:to-gray-950/90">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-2">
                    {/* Left side - Icon and stats */}
                    <div className="flex items-center flex-col md:flex-row md:w-1/2 gap-6">
                      <motion.div 
                        className={`p-5 rounded-full ${kpi.color} shadow-lg`}
                        animate={{ 
                          scale: [1, 1.08, 1],
                          boxShadow: [
                            "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                            "0 15px 20px -3px rgba(0, 0, 0, 0.2)",
                            "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                          ]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        {kpi.icon}
                      </motion.div>
                      <div className="text-center md:text-left">
                        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">{kpi.description}</p>
                        <h3 className="text-xl md:text-2xl font-semibold mt-2">{kpi.label}</h3>
                        <motion.div 
                          className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mt-2"
                          animate={{ 
                            backgroundPosition: ["0% center", "100% center", "0% center"],
                          }}
                          transition={{ duration: 8, repeat: Infinity }}
                          style={{
                            backgroundSize: "200% auto"
                          }}
                        >
                          {kpi.value}
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Right side - Highlight and visual */}
                    <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 shadow-inner">
                      <h4 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200">Why This Matters</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{kpi.highlight}</p>
                      
                      <motion.div 
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <motion.div
                          className={`h-full ${kpi.color}`}
                          initial={{ width: "0%" }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
                        />
                      </motion.div>
                      
                      <div className="mt-6 grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: Math.random() * 50 + 20 }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 * i }}
                            className={`rounded-t-sm ${kpi.color} opacity-${90 - i * 20}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KpiStats;

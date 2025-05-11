
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, Award, BrainCircuit, LineChart, BookOpen } from 'lucide-react';

// This component displays key performance indicators in the "Our Impact" section
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

  const [activeKpi, setActiveKpi] = React.useState(kpiData[0].id);

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-6">
        {/* Enhanced animated circular KPI selector with integrated info display */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {kpiData.map((kpi) => (
            <motion.div
              key={kpi.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveKpi(kpi.id)}
              className="cursor-pointer flex flex-col items-center group"
            >
              <motion.div 
                className={`relative rounded-full ${kpi.color} ${activeKpi === kpi.id ? 'ring-4 ring-offset-2' : ''} 
                p-4 flex items-center justify-center w-16 h-16 md:w-24 md:h-24 shadow-lg transition-all duration-300`}
                animate={{
                  boxShadow: activeKpi === kpi.id 
                    ? '0 0 0 4px rgba(255,255,255,0.4)'
                    : '0 0 0 0px rgba(255,255,255,0)'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 15px rgba(0,0,0,0.2)'
                }}
                transition={{ duration: 0.3 }}
              >
                {kpi.icon}
                
                {/* Show data on hover directly on the circle */}
                <motion.div 
                  className="absolute inset-0 rounded-full flex flex-col items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-lg md:text-xl font-bold text-white">{kpi.value}</span>
                  <span className="text-[10px] md:text-xs text-white/90 px-1 text-center">{kpi.label}</span>
                </motion.div>
                
                {/* Animated pulse effect for active KPI */}
                {activeKpi === kpi.id && (
                  <motion.div 
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 1, opacity: 0.3 }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                    style={{ 
                      background: `${kpi.color}`,
                      filter: 'blur(5px)'
                    }}
                  />
                )}
              </motion.div>
              <span className="mt-2 text-xs md:text-sm font-medium text-center">{kpi.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Selected KPI display - more visually engaging */}
        <motion.div
          key={activeKpi}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-3xl"
        >
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardContent className="p-4">
              {kpiData.map((kpi) => (
                kpi.id === activeKpi && (
                  <div key={kpi.id} className="flex flex-col md:flex-row items-center justify-between gap-4 p-2">
                    <div className="flex items-center">
                      <motion.div 
                        className={`mr-4 p-3 rounded-full ${kpi.color}`}
                        animate={{ 
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        {kpi.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold">{kpi.label}</h3>
                        <p className="text-gray-500 text-sm">{kpi.description}</p>
                      </div>
                    </div>
                    <motion.div 
                      className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {kpi.value}
                    </motion.div>
                  </div>
                )
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default KpiStats;

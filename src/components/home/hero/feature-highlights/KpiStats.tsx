
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
      <div className="flex flex-col space-y-8">
        {/* Circular KPI selector */}
        <div className="flex justify-center space-x-6 md:space-x-12">
          {kpiData.map((kpi) => (
            <motion.div
              key={kpi.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveKpi(kpi.id)}
              className={`cursor-pointer flex flex-col items-center`}
            >
              <div className={`rounded-full ${kpi.color} ${activeKpi === kpi.id ? 'ring-4 ring-offset-2' : ''} p-4 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 shadow-lg transition-all duration-300`}>
                {kpi.icon}
              </div>
              <span className="mt-2 text-xs md:text-sm font-medium text-center">{kpi.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Selected KPI display */}
        <motion.div
          key={activeKpi}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                {kpiData.map((kpi) => (
                  kpi.id === activeKpi && (
                    <React.Fragment key={kpi.id}>
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className={`mr-4 p-3 rounded-full ${kpi.color}`}>
                          {kpi.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{kpi.label}</h3>
                          <p className="text-gray-500">{kpi.description}</p>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-blue-600">{kpi.value}</div>
                    </React.Fragment>
                  )
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default KpiStats;

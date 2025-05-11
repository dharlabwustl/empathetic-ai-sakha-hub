
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Tab content type definition
interface TabData {
  value: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
}

const ImpactSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("students");
  
  const tabData: TabData[] = [
    {
      value: "students",
      title: "For Students",
      description: "PREPZR helps thousands of students achieve their exam goals with personalized learning paths and AI-powered assistance.",
      metrics: [
        { label: "Avg. Score Improvement", value: "32%" },
        { label: "Study Time Efficiency", value: "+45%" },
        { label: "Exam Success Rate", value: "97%" },
      ]
    },
    {
      value: "educators",
      title: "For Educators",
      description: "Empower your teaching with data-driven insights, automate routine tasks, and focus more on each student's unique learning journey.",
      metrics: [
        { label: "Time Saved Weekly", value: "18+ hrs" },
        { label: "Student Engagement", value: "+58%" },
        { label: "Performance Tracking", value: "100%" },
      ]
    },
    {
      value: "institutions",
      title: "For Institutions",
      description: "Transform your educational institution with comprehensive analytics, resource optimization, and improved learning outcomes.",
      metrics: [
        { label: "Success Rate", value: "+27%" },
        { label: "Resource Utilization", value: "+40%" },
        { label: "Student Satisfaction", value: "4.8/5" },
      ]
    }
  ];
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950" id="impact">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 dark:from-blue-400 dark:via-purple-400 dark:to-violet-400">
            Real Impact, Proven Results
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            PREPZR is transforming education with measurable results across students, educators, and institutions.
          </p>
        </div>
        
        <Tabs 
          defaultValue="students" 
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full max-w-4xl mx-auto"
        >
          <TabsList className="grid grid-cols-3 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl shadow-md">
            {tabData.map(tab => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className={cn(
                  "relative p-3 md:p-4 text-base md:text-lg transition-all duration-300 font-medium",
                  "data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700",
                  "data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300",
                  "data-[state=active]:shadow-md rounded-lg",
                  "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5",
                  "after:bg-blue-600 after:scale-x-0 data-[state=active]:after:scale-x-100",
                  "after:transition-transform after:duration-300 after:origin-bottom-left"
                )}
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 min-h-[350px]">
            {tabData.map(tab => (
              <TabsContent 
                key={tab.value} 
                value={tab.value}
                className="mt-0"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                        {tab.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
                        {tab.description}
                      </p>
                    </div>
                    
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {tab.metrics.map((metric, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="bg-gray-50 dark:bg-gray-700/50 p-4 md:p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <h4 className="text-gray-600 dark:text-gray-300 text-sm mb-1">{metric.label}</h4>
                          <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                            {metric.value}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default ImpactSection;

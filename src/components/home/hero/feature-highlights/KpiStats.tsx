
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const KpiStats = () => {
  const [activeTab, setActiveTab] = useState("students");
  
  const tabs = [
    {
      id: "students",
      title: "Students",
      metrics: [
        { label: "Total Students", value: "50,000+", description: "Enrolled in various exam preparation programs" },
        { label: "Avg. Score Improvement", value: "38%", description: "After using PREPZR for 3 months" },
        { label: "Success Rate", value: "92%", description: "Of students improved their test scores" }
      ]
    },
    {
      id: "exams",
      title: "Exams",
      metrics: [
        { label: "Supported Exams", value: "15+", description: "Major competitive exams covered" },
        { label: "Top Ranks", value: "50+", description: "Students achieved top 100 ranks in national exams" },
        { label: "Practice Tests", value: "10,000+", description: "High-quality practice questions" }
      ]
    },
    {
      id: "content",
      title: "Content",
      metrics: [
        { label: "Concept Cards", value: "2,500+", description: "Well-structured learning materials" },
        { label: "Hours of Video", value: "800+", description: "Expert-led video explanations" },
        { label: "Formulas", value: "1,200+", description: "Interactive formula practice modules" }
      ]
    },
    {
      id: "success",
      title: "Success Stories",
      metrics: [
        { label: "Medical College", value: "450+", description: "Students gained admission to top medical colleges" },
        { label: "Engineering", value: "620+", description: "Students secured spots in premier engineering institutes" },
        { label: "Scholarships", value: "₹4.2 Cr", description: "Worth of scholarships earned by our students" }
      ]
    }
  ];
  
  return (
    <div className="w-full">
      <Tabs 
        defaultValue="students" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-8 p-1 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
          {tabs.map(tab => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className={`relative text-sm md:text-base py-3 transition-all duration-300 ${
                activeTab === tab.id ? "font-medium" : ""
              }`}
            >
              {activeTab === tab.id && (
                <motion.div 
                  className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-md z-0"
                  layoutId="activeTabBackground"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{tab.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabs.map(tab => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tab.metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-500 mb-2">
                          {metric.value}
                        </div>
                        <div className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
                          {metric.label}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {metric.description}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default KpiStats;

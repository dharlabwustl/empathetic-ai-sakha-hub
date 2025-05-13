
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Medal, TrendingUp, Users, Clock, Brain, Layers } from 'lucide-react';

const ImpactSection = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
      }
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Tabs 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="p-6 pb-0">
          <TabsList className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-100/60 dark:bg-slate-900/60">
            <TabsTrigger 
              value="analytics" 
              className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white dark:data-[state=active]:shadow-lg rounded-md transition-all"
            >
              <span className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics-Driven
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="achievements" 
              className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white dark:data-[state=active]:shadow-lg rounded-md transition-all"
            >
              <span className="flex items-center">
                <Medal className="w-4 h-4 mr-2" />
                Achievements
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="approach" 
              className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white dark:data-[state=active]:shadow-lg rounded-md transition-all"
            >
              <span className="flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                Our Approach
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="analytics" className="p-0 m-0">
          <div className="p-6 md:p-8">
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Data-Driven Learning Insights</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our AI-powered analytics engine captures and processes thousands of data points from your study patterns to deliver personalized insights that optimize your exam preparation.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-1 mr-3 mt-1">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Personalized Learning Path</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Adaptive study plans that evolve with your progress</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-1 mr-3 mt-1">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Performance Prediction</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Advanced algorithms forecast your exam readiness</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-1 mr-3 mt-1">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Weak Area Identification</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Pinpoint knowledge gaps with precision</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-center"
              >
                <div className="relative h-64 w-64">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full opacity-10 animate-ping-slow"></div>
                  <div className="relative h-64 w-64 rounded-full border-4 border-blue-500/30 dark:border-blue-600/30 flex items-center justify-center bg-white/60 dark:bg-gray-900/60">
                    <div className="w-44 h-44 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                      <div className="text-center">
                        <h3 className="text-4xl font-bold">94%</h3>
                        <p className="text-sm font-medium mt-2">Improvement in<br />study efficiency</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="p-0 m-0">
          <div className="p-6 md:p-8">
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Student Success Stories</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our platform has helped thousands of students achieve their dream scores in competitive exams through personalized learning experiences.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="rounded-full bg-amber-100 dark:bg-amber-900 p-1 mr-3 mt-1">
                      <Users className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">10,000+ Success Stories</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Students who secured top ranks in competitive exams</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-amber-100 dark:bg-amber-900 p-1 mr-3 mt-1">
                      <Medal className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">87% Higher Score Improvement</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Compared to traditional study methods</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-amber-100 dark:bg-amber-900 p-1 mr-3 mt-1">
                      <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">30% Less Study Time</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">More efficient learning means better work-life balance</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-center"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-center">
                      <h4 className="text-3xl font-bold text-blue-600 dark:text-blue-400">1200+</h4>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">NEET Selections</p>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="text-center">
                      <h4 className="text-3xl font-bold text-purple-600 dark:text-purple-400">850+</h4>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">JEE Advanced</p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-center">
                      <h4 className="text-3xl font-bold text-green-600 dark:text-green-400">5000+</h4>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">JEE Mains</p>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
                    <div className="text-center">
                      <h4 className="text-3xl font-bold text-amber-600 dark:text-amber-400">94%</h4>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">Success Rate</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="approach" className="p-0 m-0">
          <div className="p-6 md:p-8">
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Holistic Study Methodology</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We believe in developing a complete student, not just exam-takers. Our approach combines cognitive science, educational psychology, and AI to create a holistic learning experience.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="rounded-full bg-indigo-100 dark:bg-indigo-900 p-1 mr-3 mt-1">
                      <Brain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Cognitive Science Based</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Learning techniques that work with your brain, not against it</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-indigo-100 dark:bg-indigo-900 p-1 mr-3 mt-1">
                      <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Multi-dimensional Learning</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Addressing conceptual, procedural, and application knowledge</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-indigo-100 dark:bg-indigo-900 p-1 mr-3 mt-1">
                      <ChevronRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Mindset Development</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Building resilience, focus, and test-taking confidence</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-center"
              >
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 animate-pulse"></div>
                  <div className="relative bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800">
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="text-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white h-10 w-10 rounded-full flex items-center justify-center font-bold mr-4">1</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Assessment</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Detailed analysis of strengths and weaknesses</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="text-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white h-10 w-10 rounded-full flex items-center justify-center font-bold mr-4">2</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Personalization</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Tailored study plans and resources</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="text-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white h-10 w-10 rounded-full flex items-center justify-center font-bold mr-4">3</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Practice & Review</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Optimized learning through targeted practice</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="text-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white h-10 w-10 rounded-full flex items-center justify-center font-bold mr-4">4</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Mastery</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Confidence and competence in all subjects</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Decorative Elements */}
      <style jsx>{`
        @keyframes ping-slow {
          0% { transform: scale(0.95); opacity: 1; }
          75% { transform: scale(1.1); opacity: 0.5; }
          100% { transform: scale(0.95); opacity: 1; }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default ImpactSection;

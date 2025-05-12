
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type TabData = {
  value: string;
  label: string;
  content: React.ReactNode;
};

const ImpactSection = () => {
  const [activeTab, setActiveTab] = useState<string>('engagement');

  const tabs: TabData[] = [
    {
      value: 'engagement',
      label: 'Student Engagement',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Personalized Learning Journey</h3>
          <p>
            Students with access to personalized learning paths show 40% higher engagement rates and 35% improvement in subject mastery compared to traditional methods.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-900/30">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">94%</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                of students report feeling more motivated with AI-guided study recommendations
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">3.2x</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                increase in study consistency when using PREPZR's adaptive learning tools
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      value: 'performance',
      label: 'Academic Performance',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Transformative Results</h3>
          <p>
            PREPZR students report significant improvements in exam readiness and performance, with our AI-driven approach tailoring to individual learning needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">87%</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                of users improved their grades within 3 months
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-cyan-100 dark:border-cyan-900/30">
              <div className="text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">42%</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                average increase in concept mastery
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-6 rounded-xl border border-amber-100 dark:border-amber-900/30">
              <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">2.5x</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                improvement in problem-solving speed
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      value: 'wellbeing',
      label: 'Student Well-being',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Beyond Academics: Mental Health Matters</h3>
          <p>
            Our mood-tracking and adaptive scheduling features help reduce exam anxiety and promote healthier study habits, supporting students' overall well-being.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-rose-100 dark:border-rose-900/30">
              <div className="text-4xl font-bold text-rose-600 dark:text-rose-400 mb-2">68%</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                of students report reduced exam anxiety after using our mood-adaptive study plans
              </p>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-violet-100 dark:border-violet-900/30">
              <div className="text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">76%</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                report better work-life balance with PREPZR's optimized study planning
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Smart Data. Real Impact. Humanizing exam prep.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how our AI-powered approach transforms traditional exam preparation into a personalized journey tailored to individual learning styles.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue="engagement" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 bg-gray-100 dark:bg-gray-800/60 rounded-xl">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "flex flex-col items-center py-3 px-2 h-auto relative data-[state=active]:shadow-none",
                    "transition-all duration-300 ease-in-out",
                    "data-[state=active]:text-primary dark:data-[state=active]:text-primary-foreground",
                    "data-[state=active]:font-medium"
                  )}
                >
                  <span>{tab.label}</span>
                  {activeTab === tab.value && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8">
              {tabs.map((tab) => (
                <TabsContent 
                  key={tab.value} 
                  value={tab.value}
                  className="focus-visible:outline-none focus-visible:ring-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    {tab.content}
                  </motion.div>
                </TabsContent>
              ))}
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none"></div>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;

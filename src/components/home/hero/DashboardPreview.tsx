
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { BookOpen, Sparkles, Brain, Calculator, FileText, Smile, ChevronRight } from 'lucide-react';

interface DashboardPreviewProps {
  activeFeature: number;
  setActiveFeature: (index: number) => void;
}

interface FeatureData {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  data?: { pv: number }[];
  component: React.ReactNode;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ activeFeature, setActiveFeature }) => {
  // Sample data for charts
  const progressData = [
    { pv: 40 }, { pv: 30 }, { pv: 45 }, { pv: 50 }, 
    { pv: 60 }, { pv: 55 }, { pv: 65 }, { pv: 70 }
  ];

  const retentionData = [
    { pv: 20 }, { pv: 40 }, { pv: 35 }, { pv: 50 }, 
    { pv: 55 }, { pv: 60 }, { pv: 70 }, { pv: 75 }
  ];

  const examScoreData = [
    { pv: 35 }, { pv: 40 }, { pv: 50 }, { pv: 48 }, 
    { pv: 55 }, { pv: 65 }, { pv: 70 }, { pv: 80 }
  ];

  const practiceData = [
    { pv: 10 }, { pv: 25 }, { pv: 30 }, { pv: 45 }, 
    { pv: 40 }, { pv: 55 }, { pv: 60 }, { pv: 70 }
  ];

  const syllabusData = [
    { pv: 5 }, { pv: 15 }, { pv: 25 }, { pv: 35 }, 
    { pv: 45 }, { pv: 60 }, { pv: 75 }, { pv: 85 }
  ];

  // Dashboard features
  const features: FeatureData[] = [
    {
      title: "Smart Dashboard",
      description: "Real-time progress tracking and adaptive recommendations",
      icon: Sparkles,
      color: "from-purple-500 to-indigo-500",
      data: progressData,
      component: (
        <div className="space-y-4">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-sm border border-purple-100 dark:border-purple-900/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Exam Readiness</span>
              <span className="text-sm font-bold text-green-500">+7% ↑</span>
            </div>
            <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Previous: 58%</span>
              <span>Current: 65%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-sm border border-purple-100 dark:border-purple-900/30">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700 dark:text-gray-300">Streak</span>
                <span className="text-xs font-semibold">12 days</span>
              </div>
              <div className="mt-1 flex">
                {[1,2,3,4,5].map((_, i) => (
                  <div key={i} className="h-1 w-full bg-purple-500 mr-0.5 rounded-sm"></div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-sm border border-purple-100 dark:border-purple-900/30">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700 dark:text-gray-300">Today's Goal</span>
                <span className="text-xs font-semibold">75% done</span>
              </div>
              <div className="mt-1 flex">
                {[1,2,3,4].map((_, i) => (
                  <div key={i} className={`h-1 w-full ${i < 3 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} mr-0.5 rounded-sm`}></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-sm border border-purple-100 dark:border-purple-900/30">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Next Up</span>
              <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                15 min
              </span>
            </div>
            <div className="mt-2 flex items-center text-xs text-gray-600 dark:text-gray-400">
              <BookOpen className="h-3.5 w-3.5 mr-1.5" />
              <span>Thermodynamics: First Law</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Adaptive Study Plan",
      description: "Personalized learning path based on your strengths and weaknesses",
      icon: Brain,
      color: "from-blue-500 to-cyan-500",
      data: retentionData,
      component: (
        <div className="space-y-3">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-sm border border-blue-100 dark:border-blue-900/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Today's Schedule</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">May 22, 2025</span>
            </div>
            
            <div className="space-y-2">
              {[
                { time: "9:00 AM", task: "Physics: Wave Optics", duration: "45 min", status: "completed" },
                { time: "10:00 AM", task: "Chemistry: Coordination Compounds", duration: "30 min", status: "current" },
                { time: "11:00 AM", task: "Practice Quiz: Organic Chemistry", duration: "20 min", status: "upcoming" }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start p-2 rounded-md ${
                    item.status === 'completed' ? 'bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20' : 
                    item.status === 'current' ? 'bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20' : 
                    'bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800/80'
                  }`}
                >
                  <div className="mr-2">
                    <div className={`h-4 w-4 rounded-full flex items-center justify-center ${
                      item.status === 'completed' ? 'bg-green-500' : 
                      item.status === 'current' ? 'bg-blue-500 animate-pulse' : 
                      'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      {item.status === 'completed' && (
                        <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-xs font-medium">{item.task}</span>
                      <span className="text-xs text-gray-500">{item.duration}</span>
                    </div>
                    <div className="text-[10px] text-gray-500">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-sm border border-blue-100 dark:border-blue-900/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Focus Areas</span>
              <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
                Needs Attention
              </span>
            </div>
            
            <div className="space-y-1.5">
              {[
                { subject: "Thermodynamics", progress: 35 },
                { subject: "Organic Chemistry", progress: 42 },
                { subject: "Vector Calculus", progress: 28 }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{item.subject}</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full" 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Flashcard Recall System",
      description: "Spaced repetition algorithm optimizes your memory retention",
      icon: BookOpen,
      color: "from-amber-500 to-orange-500",
      data: examScoreData,
      component: (
        <div className="space-y-3">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-sm border border-amber-100 dark:border-amber-900/30">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Memory Retention</span>
                <div className="text-xs text-green-600">+15% this week</div>
              </div>
              <div className="text-2xl font-bold text-amber-500">75%</div>
            </div>
            
            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={examScoreData}>
                  <Line 
                    type="monotone" 
                    dataKey="pv" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm border border-amber-100 dark:border-amber-900/30 overflow-hidden">
            <div className="p-3 border-b border-amber-100 dark:border-amber-900/30">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Due for Review (5)
              </span>
            </div>
            
            <div className="divide-y divide-amber-100 dark:divide-amber-900/30 max-h-[180px] overflow-auto">
              {[
                { subject: "Physics", topic: "Electromagnetic Induction", due: "Today", urgency: "high" },
                { subject: "Chemistry", topic: "Coordination Compounds", due: "Today", urgency: "high" },
                { subject: "Biology", topic: "Human Physiology", due: "Tomorrow", urgency: "medium" },
                { subject: "Chemistry", topic: "Chemical Kinetics", due: "Tomorrow", urgency: "medium" },
                { subject: "Mathematics", topic: "Differential Calculus", due: "In 2 days", urgency: "low" }
              ].map((card, idx) => (
                <div key={idx} className="flex items-center p-2 hover:bg-amber-50 dark:hover:bg-amber-900/10 cursor-pointer">
                  <div 
                    className={`h-2 w-2 rounded-full mr-2 ${
                      card.urgency === 'high' ? 'bg-red-500' :
                      card.urgency === 'medium' ? 'bg-amber-500' :
                      'bg-green-500'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="text-xs font-medium">{card.topic}</div>
                    <div className="text-[10px] text-gray-500">{card.subject}</div>
                  </div>
                  <div className="text-xs text-gray-500">{card.due}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Formula Practice",
      description: "Interactive equations and formulas for physics, chemistry, and math",
      icon: Calculator,
      color: "from-green-500 to-emerald-500",
      data: practiceData,
      component: (
        <div className="space-y-3">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-sm border border-green-100 dark:border-green-900/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Formula Mastery</span>
              <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                70% Proficiency
              </span>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border border-green-100 dark:border-green-900/30 mb-2">
              <div className="text-center font-mono text-sm">
                E = mc<sup>2</sup>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded border border-green-100 dark:border-green-900/30 text-center">
                <div className="font-mono">F = ma</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded border border-green-100 dark:border-green-900/30 text-center">
                <div className="font-mono">PV = nRT</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded border border-green-100 dark:border-green-900/30 text-center">
                <div className="font-mono">V = IR</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded border border-green-100 dark:border-green-900/30 text-center">
                <div className="font-mono">λ = h/p</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-sm border border-green-100 dark:border-green-900/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Formula Stats</span>
              <span className="text-xs text-gray-500">Last 30 days</span>
            </div>
            
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 dark:text-gray-400">Practiced: <span className="font-medium">124</span></span>
              <span className="text-gray-600 dark:text-gray-400">Mastered: <span className="font-medium">86</span></span>
            </div>
            
            <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '70%' }}></div>
            </div>
            
            <div className="text-xs text-gray-600 dark:text-gray-400 flex justify-between">
              <span>Subject Breakdown:</span>
              <div className="flex gap-2">
                <span className="flex items-center">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-1"></span>Physics
                </span>
                <span className="flex items-center">
                  <span className="h-2 w-2 bg-amber-500 rounded-full mr-1"></span>Chemistry
                </span>
                <span className="flex items-center">
                  <span className="h-2 w-2 bg-purple-500 rounded-full mr-1"></span>Math
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-sm border border-green-100 dark:border-green-900/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Next Practice Session</span>
              <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                Today
              </span>
            </div>
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1">
              <Calculator className="h-3 w-3 mr-1" />
              <span>Thermodynamics Formulas</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Exam Syllabus Integration",
      description: "Complete syllabus coverage with progress tracking by subject",
      icon: FileText,
      color: "from-pink-500 to-rose-500",
      data: syllabusData,
      component: (
        <div className="space-y-3">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-sm border border-pink-100 dark:border-pink-900/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">NEET Syllabus Coverage</span>
              <span className="text-xs bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 px-2 py-0.5 rounded-full">
                85% Complete
              </span>
            </div>
            
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" style={{ width: '85%' }}></div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <div className="font-medium">Physics</div>
                <div className="text-green-600 dark:text-green-400">92%</div>
              </div>
              <div>
                <div className="font-medium">Chemistry</div>
                <div className="text-amber-600 dark:text-amber-400">78%</div>
              </div>
              <div>
                <div className="font-medium">Biology</div>
                <div className="text-blue-600 dark:text-blue-400">87%</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-sm border border-pink-100 dark:border-pink-900/30">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Remaining Topics</span>
              <span className="text-xs text-gray-500">15 days to exam</span>
            </div>
            
            <div className="space-y-2">
              {[
                { subject: "Physics", topic: "Electromagnetic Waves", priority: "high" },
                { subject: "Chemistry", topic: "Polymers & Biomolecules", priority: "medium" },
                { subject: "Biology", topic: "Genetic Engineering", priority: "low" }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center p-2 rounded-md bg-pink-50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-900/20"
                >
                  <div 
                    className={`h-2 w-2 rounded-full mr-2 ${
                      item.priority === 'high' ? 'bg-red-500' :
                      item.priority === 'medium' ? 'bg-amber-500' :
                      'bg-green-500'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="text-xs font-medium">{item.topic}</div>
                    <div className="text-[10px] text-gray-500">{item.subject}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-sm border border-pink-100 dark:border-pink-900/30">
            <div className="flex items-center gap-2 mb-2">
              <Smile className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">You're on track!</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              At your current pace, you'll complete the entire syllabus 5 days before the exam.
            </p>
          </div>
        </div>
      )
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  const feature = features[activeFeature];
  
  return (
    <motion.div 
      className="w-full lg:w-1/2 flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* 3D Dashboard Window */}
      <div className="perspective-1000 w-full max-w-md">
        <motion.div
          className="preserve-3d rounded-xl shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden"
          animate={{ 
            rotateX: [0, 1, 0],
            rotateY: [0, 2, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut" 
          }}
        >
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3">
            <div className="flex items-center justify-between">
              <div className="text-white font-medium">PREPZR Dashboard</div>
              <div className="text-xs text-white/80">NEET 2025</div>
            </div>
          </div>
          
          {/* Feature Title */}
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center">
              <div className={`h-8 w-8 rounded-md bg-gradient-to-br ${feature.color} flex items-center justify-center text-white p-1.5 mr-3`}>
                <feature.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{feature.description}</p>
              </div>
            </div>
          </div>
          
          {/* Feature Content */}
          <motion.div 
            className="p-4 h-[330px] bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-y-auto"
            key={activeFeature}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {feature.component}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Feature Navigation */}
      <motion.div
        className="mt-6 flex flex-wrap justify-center gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {features.map((f, idx) => (
          <motion.button
            key={idx}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              activeFeature === idx 
                ? `bg-gradient-to-r ${f.color} text-white shadow-sm` 
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => setActiveFeature(idx)}
            variants={cardVariants}
          >
            <span className="flex items-center gap-1">
              <f.icon className="h-3 w-3" />
              {f.title}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;

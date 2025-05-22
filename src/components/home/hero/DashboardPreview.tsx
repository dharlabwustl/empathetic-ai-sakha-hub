
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, BookOpen, Calendar, Clock, Target, Star, BarChart3, LineChart, Brain, BookCopy } from 'lucide-react';

interface DashboardPreviewProps {
  activeFeature: number;
  setActiveFeature: (index: number) => void;
}

// Dashboard preview features
const features = [
  {
    title: "Smart Dashboard",
    icon: <LineChart className="h-4 w-4" />,
    component: "SmartDashboard",
  },
  {
    title: "Study Plan",
    icon: <Calendar className="h-4 w-4" />,
    component: "StudyPlan",
  },
  {
    title: "Concepts",
    icon: <Brain className="h-4 w-4" />,
    component: "ConceptCards",
  },
  {
    title: "Flashcards",
    icon: <BookCopy className="h-4 w-4" />,
    component: "Flashcards",
  },
  {
    title: "Formulas",
    icon: <Target className="h-4 w-4" />,
    component: "FormulaCards",
  },
  {
    title: "Progress",
    icon: <BarChart3 className="h-4 w-4" />,
    component: "ExamProgress",
  }
];

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ 
  activeFeature,
  setActiveFeature
}) => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center mt-6 lg:mt-0 relative z-10">
      {/* Device frame with 3D perspective */}
      <div className="w-full max-w-2xl mx-auto perspective-1000">
        <motion.div 
          className="relative rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateY(-5deg) rotateX(2deg)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.02, rotateY: "-3deg" }}
        >
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white/20 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold">P</div>
              <span className="ml-2 text-white font-medium">PREPZR Dashboard</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-xs">AS</span>
              </div>
            </div>
          </div>
          
          {/* Feature Tabs */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <Tabs 
              value={features[activeFeature].component}
              onValueChange={(value) => {
                const index = features.findIndex(f => f.component === value);
                if (index !== -1) setActiveFeature(index);
              }}
              className="w-full"
            >
              <TabsList className="grid grid-cols-6 h-9">
                {features.map((feature, index) => (
                  <TabsTrigger 
                    key={feature.component}
                    value={feature.component}
                    className="text-xs px-1 flex items-center gap-1"
                  >
                    {feature.icon}
                    <span className="hidden sm:inline">{feature.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          {/* Dashboard Content */}
          <div className="relative w-full" style={{ height: "350px" }}>
            {/* Smart Dashboard View */}
            {activeFeature === 0 && (
              <DashboardOverview />
            )}
            
            {/* Study Plan View */}
            {activeFeature === 1 && (
              <StudyPlanPreview />
            )}
            
            {/* Concepts View */}
            {activeFeature === 2 && (
              <ConceptsPreview />
            )}
            
            {/* Flashcards View */}
            {activeFeature === 3 && (
              <FlashcardsPreview />
            )}
            
            {/* Formula Cards View */}
            {activeFeature === 4 && (
              <FormulaCardsPreview />
            )}
            
            {/* Exam Progress View */}
            {activeFeature === 5 && (
              <ExamProgressPreview />
            )}
          </div>
          
          {/* Interactive reflection overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom right, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.01) 100%)",
            }}
          />
        </motion.div>
      </div>
      
      {/* Feature highlights */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6 text-center px-4 lg:px-0"
      >
        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
          {features[activeFeature].title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto mt-1">
          {getFeatureDescription(activeFeature)}
        </p>
      </motion.div>
    </div>
  );
};

// Feature specific components
const DashboardOverview: React.FC = () => (
  <div className="p-4 h-full overflow-y-auto overflow-x-hidden">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-lg font-semibold">Welcome, Amit</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Here's your learning progress</p>
      </div>
      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50">
        <CheckCircle2 className="mr-1 h-3 w-3" /> Day 12
      </Badge>
    </div>
    
    {/* KPI Cards */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
      {[
        { title: "Concepts", value: "48", icon: "📚", color: "bg-blue-50 text-blue-700" },
        { title: "Study Hours", value: "32", icon: "⏰", color: "bg-purple-50 text-purple-700" },
        { title: "Readiness", value: "76%", icon: "🎯", color: "bg-green-50 text-green-700" },
        { title: "Streak", value: "12", icon: "🔥", color: "bg-amber-50 text-amber-700" },
      ].map((item, idx) => (
        <div key={idx} className={`p-2 rounded-lg border ${item.color} border-opacity-30`}>
          <div className="text-xs font-medium">{item.title}</div>
          <div className="flex items-baseline">
            <span className="text-lg font-semibold">{item.value}</span>
            <span className="ml-1">{item.icon}</span>
          </div>
        </div>
      ))}
    </div>
    
    {/* Today's Focus */}
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2">Today's Focus</h3>
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Physics: Newton's Laws</span>
          <Badge variant="secondary" className="text-xs">3 tasks</Badge>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          Complete concept cards and practice problems
        </div>
      </div>
    </div>
    
    {/* Progress Bars */}
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2">Subject Progress</h3>
      <div className="space-y-3">
        {[
          { subject: "Physics", progress: 65, color: "bg-blue-500" },
          { subject: "Chemistry", progress: 48, color: "bg-purple-500" },
          { subject: "Biology", progress: 72, color: "bg-green-500" },
        ].map((subject, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{subject.subject}</span>
              <span>{subject.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`${subject.color} h-2 rounded-full`} 
                style={{ width: `${subject.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Upcoming Tests */}
    <h3 className="text-sm font-semibold mb-2">Upcoming Tests</h3>
    <div className="space-y-2">
      <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-red-100 dark:bg-red-900/30 p-1.5 rounded-md text-red-600 dark:text-red-400">
            <Calendar className="h-4 w-4" />
          </div>
          <div className="ml-2">
            <div className="text-xs font-medium">Physics Mock Test</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">60 minutes</div>
          </div>
        </div>
        <span className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">Today</span>
      </div>
    </div>
  </div>
);

const StudyPlanPreview: React.FC = () => (
  <div className="p-4 h-full overflow-y-auto">
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Your Study Plan</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Personalized for maximum efficiency</p>
    </div>
    
    {/* Today's Schedule */}
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">Today's Schedule</h3>
        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">Wednesday</Badge>
      </div>
      
      <div className="space-y-2">
        {[
          { time: "09:00 AM", task: "Physics: Newton's Laws", type: "Concept Review", completed: true },
          { time: "10:30 AM", task: "Chemistry: Periodic Table", type: "Flashcards", completed: false },
          { time: "02:00 PM", task: "Biology: Cell Division", type: "Practice Test", completed: false },
        ].map((item, idx) => (
          <div key={idx} className={`p-2 rounded-lg border ${item.completed ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800/30' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'} flex items-center`}>
            <div className={`${item.completed ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
              <Clock className="h-4 w-4" />
            </div>
            <div className="ml-2 flex-1">
              <div className={`text-xs font-medium ${item.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                {item.task}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{item.time} • {item.type}</div>
            </div>
            {item.completed ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <div className="px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md">
                Start
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    
    {/* Weekly Goals */}
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2">Weekly Goals</h3>
      <div className="space-y-2">
        {[
          { goal: "Complete Physics Module 3", progress: 75 },
          { goal: "Review Chemistry Flashcards", progress: 50 },
          { goal: "Take 2 Biology Practice Tests", progress: 0 },
        ].map((goal, idx) => (
          <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium">{goal.goal}</span>
              <span className="text-xs">{goal.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full" 
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Study Tips */}
    <div>
      <h3 className="text-sm font-semibold mb-2">AI Study Tip</h3>
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/30 p-3 rounded-lg text-xs text-gray-700 dark:text-gray-300">
        Based on your learning patterns, try studying Physics concepts early in the morning when your focus is at its peak.
      </div>
    </div>
  </div>
);

const ConceptsPreview: React.FC = () => (
  <div className="p-4 h-full overflow-y-auto">
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Concept Cards</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Master complex concepts with visual learning</p>
    </div>
    
    {/* Subject Filter */}
    <div className="flex gap-1 mb-3 overflow-x-auto pb-1">
      <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 cursor-pointer">All</Badge>
      <Badge variant="outline" className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">Physics</Badge>
      <Badge variant="outline" className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">Chemistry</Badge>
      <Badge variant="outline" className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">Biology</Badge>
      <Badge variant="outline" className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">Mathematics</Badge>
    </div>
    
    {/* Concept Cards */}
    <div className="space-y-3">
      {[
        { 
          id: 1, 
          title: "Newton's Laws of Motion", 
          subject: "Physics", 
          progress: 80,
          image: "/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png"
        },
        { 
          id: 2, 
          title: "Periodic Table & Elements", 
          subject: "Chemistry", 
          progress: 50,
          image: "/lovable-uploads/c34ee0e2-be15-4c3a-a8f8-84035e473248.png"
        },
        { 
          id: 3, 
          title: "Cell Division", 
          subject: "Biology", 
          progress: 30,
          image: "/lovable-uploads/e66776f4-3ade-40a0-8f27-1dd77afad116.png"
        },
      ].map((concept) => (
        <div key={concept.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex bg-white dark:bg-gray-800">
          <div className="w-1/4 relative">
            <div 
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${concept.image || "/images/concept-placeholder.jpg"})` }}
            />
          </div>
          <div className="w-3/4 p-3">
            <div className="flex items-center justify-between mb-1">
              <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/30">{concept.subject}</Badge>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-amber-400 mr-1 fill-amber-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">4.8</span>
              </div>
            </div>
            <h3 className="text-sm font-medium mb-2 line-clamp-1">{concept.title}</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{concept.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                  className="bg-green-500 h-1.5 rounded-full" 
                  style={{ width: `${concept.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FlashcardsPreview: React.FC = () => (
  <div className="p-4 h-full overflow-y-auto">
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Flashcards</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Review and memorize with spaced repetition</p>
    </div>
    
    {/* Flashcard Interactive Preview */}
    <div className="w-full aspect-[3/2] max-h-48 perspective-1000 mb-4">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl border border-blue-200 dark:border-blue-800/50 p-4 flex items-center justify-center shadow-md">
          <div className="text-center">
            <div className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Physics</div>
            <div className="text-base">What is Newton's Third Law?</div>
            <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">Click to reveal answer</div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Due Today */}
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2">Due Today</h3>
      <div className="space-y-2">
        {[
          { deck: "Physics: Mechanics", count: 15, subject: "Physics", color: "blue" },
          { deck: "Chemistry: Periodic Table", count: 10, subject: "Chemistry", color: "purple" },
          { deck: "Biology: Cell Structure", count: 8, subject: "Biology", color: "green" },
        ].map((item, idx) => (
          <div 
            key={idx} 
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className={`bg-${item.color}-100 dark:bg-${item.color}-900/30 p-1.5 rounded-md text-${item.color}-600 dark:text-${item.color}-400`}>
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="ml-2">
                <div className="text-xs font-medium">{item.deck}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.subject}</div>
              </div>
            </div>
            <Badge>{item.count} cards</Badge>
          </div>
        ))}
      </div>
    </div>
    
    {/* Stats */}
    <div>
      <h3 className="text-sm font-semibold mb-2">Your Stats</h3>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg text-center">
          <div className="text-lg font-semibold text-green-600 dark:text-green-400">94</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Mastered</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg text-center">
          <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">33</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Learning</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg text-center">
          <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">12</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Days</div>
        </div>
      </div>
    </div>
  </div>
);

const FormulaCardsPreview: React.FC = () => (
  <div className="p-4 h-full overflow-y-auto">
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Formula Cards</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Master essential equations for your exam</p>
    </div>
    
    {/* Formula highlight */}
    <div className="mb-4">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800/30 text-center">
        <div className="text-sm text-purple-800 dark:text-purple-300 mb-2">Physics: Mechanics</div>
        <div className="text-lg mb-3 font-mono tracking-wide">F = m·a</div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          Newton's Second Law of Motion: Force equals mass times acceleration
        </div>
      </div>
    </div>
    
    {/* Formula Categories */}
    <div>
      <h3 className="text-sm font-semibold mb-2">Categories</h3>
      <div className="space-y-2">
        {[
          { name: "Physics Formulas", count: 24, icon: "⚛️", color: "bg-blue-50 dark:bg-blue-900/20" },
          { name: "Chemistry Equations", count: 18, icon: "🧪", color: "bg-purple-50 dark:bg-purple-900/20" },
          { name: "Mathematics", count: 32, icon: "📐", color: "bg-green-50 dark:bg-green-900/20" },
        ].map((category, idx) => (
          <div 
            key={idx} 
            className={`p-3 rounded-lg border border-gray-200 dark:border-gray-700 ${category.color} flex items-center justify-between`}
          >
            <div className="flex items-center">
              <span className="text-xl mr-3">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </div>
            <Badge variant="outline">{category.count}</Badge>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExamProgressPreview: React.FC = () => (
  <div className="p-4 h-full overflow-y-auto">
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Exam Progress</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Track your progress towards exam mastery</p>
    </div>
    
    {/* Exam Readiness */}
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <h3 className="text-sm font-semibold">NEET Exam Readiness</h3>
        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-none">
          Improving
        </Badge>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm">Overall Readiness</span>
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">76%</span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" style={{ width: '76%' }}></div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <span className="block text-gray-500 dark:text-gray-400">Physics</span>
            <span className="font-medium">65%</span>
          </div>
          <div>
            <span className="block text-gray-500 dark:text-gray-400">Chemistry</span>
            <span className="font-medium">48%</span>
          </div>
          <div>
            <span className="block text-gray-500 dark:text-gray-400">Biology</span>
            <span className="font-medium">72%</span>
          </div>
        </div>
      </div>
    </div>
    
    {/* Recent Performance */}
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2">Recent Performance</h3>
      <div className="space-y-2">
        {[
          { test: "Physics Mock Test 3", score: 78, date: "2 days ago", change: "+12%" },
          { test: "Chemistry Quiz", score: 65, date: "3 days ago", change: "+8%" },
          { test: "Full Mock Test", score: 72, date: "1 week ago", change: "+5%" },
        ].map((item, idx) => (
          <div key={idx} className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div>
              <div className="text-xs font-medium">{item.test}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{item.date}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">{item.score}%</div>
              <div className="text-xs text-green-600 dark:text-green-400">{item.change}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Weak Areas */}
    <div>
      <h3 className="text-sm font-semibold mb-2">Focus Areas</h3>
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 p-3 rounded-lg">
        <div className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">Needs Improvement:</div>
        <div className="text-xs text-gray-700 dark:text-gray-300">
          • Organic Chemistry: Reaction Mechanisms<br />
          • Physics: Electromagnetic Induction<br />
          • Biology: Human Physiology
        </div>
      </div>
    </div>
  </div>
);

// Helper function to get feature descriptions
const getFeatureDescription = (featureIndex: number): string => {
  switch (featureIndex) {
    case 0:
      return "Real-time analytics provide insights on your progress and learning patterns";
    case 1:
      return "AI-customized study plan adapts to your learning pace and preferences";
    case 2:
      return "Visual concept cards help you understand complex topics with ease";
    case 3:
      return "Spaced repetition flashcards optimize memory retention and recall";
    case 4:
      return "Interactive formula cards help you master important equations";
    case 5:
      return "Track your exam readiness with detailed progress metrics";
    default:
      return "";
  }
};

export default DashboardPreview;

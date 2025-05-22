
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb, Trophy, BookOpen, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardPreviewProps {
  activeFeature: number;
  setActiveFeature: (index: number) => void;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ activeFeature, setActiveFeature }) => {
  const features = [
    {
      id: "overview",
      title: "Smart Dashboard",
      description: "AI-powered personalized dashboard with performance insights",
      icon: BarChart3,
      preview: (
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl p-4 shadow-lg border border-orange-200 dark:border-orange-800/30">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300">Your Progress</h3>
              <span className="text-sm text-orange-500 font-medium">75% Complete</span>
            </div>
            
            <div className="space-y-2">
              <div className="w-full bg-orange-100 dark:bg-orange-900/30 h-2 rounded-full">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full w-3/4"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800/20 text-center">
                  <p className="text-xs text-orange-600 dark:text-orange-400">Daily Streak</p>
                  <p className="text-xl font-bold text-orange-700 dark:text-orange-300">7</p>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800/20 text-center">
                  <p className="text-xs text-orange-600 dark:text-orange-400">Accuracy</p>
                  <p className="text-xl font-bold text-orange-700 dark:text-orange-300">92%</p>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800/20 text-center">
                  <p className="text-xs text-orange-600 dark:text-orange-400">Concept Mastery</p>
                  <p className="text-xl font-bold text-orange-700 dark:text-orange-300">32</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                <p className="text-sm text-orange-800 dark:text-orange-200">Focus on Physics concepts today based on your learning pattern!</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "adaptive-plan",
      title: "Adaptive Study Plan",
      description: "Personalized study plans that adjust to your learning pace",
      icon: CheckCircle,
      preview: (
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl p-4 shadow-lg border border-orange-200 dark:border-orange-800/30">
          <h3 className="text-lg font-semibold mb-3 text-orange-700 dark:text-orange-300">Your Adaptive Plan</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-orange-200 dark:bg-orange-800/50 rounded-full flex items-center justify-center text-orange-700 dark:text-orange-300 font-medium">1</div>
                <div>
                  <p className="font-medium text-orange-700 dark:text-orange-300">Physics - Kinematics</p>
                  <p className="text-xs text-orange-600/70 dark:text-orange-400/70">30 min • High priority</p>
                </div>
              </div>
              <div className="bg-orange-100 dark:bg-orange-800/30 text-orange-800 dark:text-orange-200 text-xs px-2 py-1 rounded-full">
                Current
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50/50 dark:bg-orange-900/10 rounded-lg border-l-4 border-orange-300">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-orange-100 dark:bg-orange-800/30 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 font-medium">2</div>
                <div>
                  <p className="font-medium text-orange-600 dark:text-orange-400">Chemistry - Atomic Structure</p>
                  <p className="text-xs text-orange-500/70 dark:text-orange-400/70">45 min • Medium priority</p>
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-800/20 text-orange-600 dark:text-orange-400 text-xs px-2 py-1 rounded-full">
                Next
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50/50 dark:bg-orange-900/10 rounded-lg border-l-4 border-orange-200">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-orange-100/70 dark:bg-orange-800/20 rounded-full flex items-center justify-center text-orange-500 dark:text-orange-400/80 font-medium">3</div>
                <div>
                  <p className="font-medium text-orange-500 dark:text-orange-400/80">Biology - Cell Structure</p>
                  <p className="text-xs text-orange-400/70 dark:text-orange-300/70">20 min • Review</p>
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-800/20 text-orange-500 dark:text-orange-400/80 text-xs px-2 py-1 rounded-full">
                Later
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-orange-100/70 dark:bg-orange-900/30 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Trophy className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Adaptive Suggestion</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">Based on your learning patterns, we've increased focus on Physics today and reduced Biology content.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "flashcard-recall",
      title: "Flashcard Recall",
      description: "Powerful spaced repetition for better memory retention",
      icon: CheckCircle,
      preview: (
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl p-4 shadow-lg border border-orange-200 dark:border-orange-800/30">
          <h3 className="text-lg font-semibold mb-3 text-orange-700 dark:text-orange-300">Flashcard Recall</h3>
          
          <div className="relative perspective-1000 h-48 mb-4">
            <div className="absolute inset-0 preserve-3d backface-hidden bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg shadow-lg p-4 flex items-center justify-center text-white">
              <p className="text-lg font-medium text-center">What is Newton's Second Law of Motion?</p>
            </div>
            <div className="absolute inset-0 preserve-3d backface-hidden rotate-y-180 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col gap-2">
              <p className="text-base text-orange-800 dark:text-orange-200">F = ma</p>
              <p className="text-sm text-orange-700 dark:text-orange-300">Force equals mass times acceleration</p>
              <div className="text-xs text-orange-600 dark:text-orange-400 mt-auto">
                The rate of change of momentum is proportional to the force applied, and occurs in the direction of the force.
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm text-orange-600 dark:text-orange-400">
              <span className="font-medium">7</span> remaining today
            </div>
            
            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              <span className="h-2 w-2 rounded-full bg-orange-200 dark:bg-orange-800"></span>
              <span className="h-2 w-2 rounded-full bg-orange-200 dark:bg-orange-800"></span>
            </div>
            
            <div className="text-sm text-orange-600 dark:text-orange-400">
              <span className="font-medium">68%</span> recall
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/30">
              Hard
            </Button>
            <Button variant="outline" className="border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/30">
              Medium
            </Button>
            <Button variant="outline" className="border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/30">
              Easy
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "formula-practice",
      title: "Formula Practice",
      description: "Interactive tools to master key academic formulas",
      icon: CheckCircle,
      preview: (
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl p-4 shadow-lg border border-orange-200 dark:border-orange-800/30">
          <h3 className="text-lg font-semibold mb-3 text-orange-700 dark:text-orange-300">Formula Practice</h3>
          
          <div className="p-3 bg-orange-50/80 dark:bg-orange-900/20 rounded-lg mb-3">
            <p className="font-medium text-orange-700 dark:text-orange-300 mb-1">Kinematic Equation</p>
            <div className="text-lg font-mono text-center py-2 text-orange-800 dark:text-orange-200">
              v = u + at
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <div className="text-center">
                <div className="text-xs text-orange-500 dark:text-orange-400 mb-1">v</div>
                <input 
                  type="text" 
                  className="w-full text-center p-1 border border-orange-300 dark:border-orange-700 rounded bg-white dark:bg-gray-800 text-orange-800 dark:text-orange-200" 
                  placeholder="?"
                />
              </div>
              <div className="text-center">
                <div className="text-xs text-orange-500 dark:text-orange-400 mb-1">u</div>
                <input 
                  type="text" 
                  className="w-full text-center p-1 border border-orange-300 dark:border-orange-700 rounded bg-white dark:bg-gray-800 text-orange-800 dark:text-orange-200" 
                  value="5"
                  readOnly
                />
              </div>
              <div className="text-center">
                <div className="text-xs text-orange-500 dark:text-orange-400 mb-1">a</div>
                <input 
                  type="text" 
                  className="w-full text-center p-1 border border-orange-300 dark:border-orange-700 rounded bg-white dark:bg-gray-800 text-orange-800 dark:text-orange-200" 
                  value="2"
                  readOnly
                />
              </div>
              <div className="text-center">
                <div className="text-xs text-orange-500 dark:text-orange-400 mb-1">t</div>
                <input 
                  type="text" 
                  className="w-full text-center p-1 border border-orange-300 dark:border-orange-700 rounded bg-white dark:bg-gray-800 text-orange-800 dark:text-orange-200" 
                  value="3"
                  readOnly
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-orange-600 dark:text-orange-400">
              Formula practice progress:
            </div>
            <div className="text-sm font-medium text-orange-700 dark:text-orange-300">
              12/20
            </div>
          </div>
          
          <div className="w-full bg-orange-100 dark:bg-orange-800/40 h-2 rounded-full mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full" style={{width: '60%'}}></div>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">
            Check Answer
          </Button>
        </div>
      )
    },
    {
      id: "syllabus-integration",
      title: "Syllabus Integration",
      description: "Concepts linked to your exam syllabus for better organization",
      icon: BookOpen,
      preview: (
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl p-4 shadow-lg border border-orange-200 dark:border-orange-800/30">
          <h3 className="text-lg font-semibold mb-3 text-orange-700 dark:text-orange-300">Syllabus Integration</h3>
          
          <div className="border border-orange-200 dark:border-orange-800/30 rounded-lg overflow-hidden mb-4">
            <div className="p-3 bg-orange-100/60 dark:bg-orange-900/40 border-b border-orange-200 dark:border-orange-800/30 flex justify-between items-center">
              <span className="font-medium text-orange-700 dark:text-orange-300">NEET Physics</span>
              <span className="text-xs bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 px-2 py-0.5 rounded-full">65% Complete</span>
            </div>
            
            <div className="divide-y divide-orange-100 dark:divide-orange-900/30">
              <div className="p-3 flex justify-between items-center hover:bg-orange-50/50 dark:hover:bg-orange-900/10">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-orange-700 dark:text-orange-300">Mechanics</span>
                </div>
                <span className="text-xs text-orange-500 dark:text-orange-400">21/25 concepts</span>
              </div>
              
              <div className="p-3 flex justify-between items-center hover:bg-orange-50/50 dark:hover:bg-orange-900/10">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="text-orange-700 dark:text-orange-300">Thermodynamics</span>
                </div>
                <span className="text-xs text-orange-500 dark:text-orange-400">15/20 concepts</span>
              </div>
              
              <div className="p-3 flex justify-between items-center hover:bg-orange-50/50 dark:hover:bg-orange-900/10">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                  <span className="text-orange-700 dark:text-orange-300">Optics</span>
                </div>
                <span className="text-xs text-orange-500 dark:text-orange-400">8/18 concepts</span>
              </div>
              
              <div className="p-3 flex justify-between items-center hover:bg-orange-50/50 dark:hover:bg-orange-900/10">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-orange-700 dark:text-orange-300">Modern Physics</span>
                </div>
                <span className="text-xs text-orange-500 dark:text-orange-400">3/15 concepts</span>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50/70 dark:bg-orange-900/20 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Exam Strategy</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">Focus on Modern Physics next as it's the least covered area in your preparation.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handlePrevious = () => {
    setActiveFeature((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveFeature((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="w-full lg:w-1/2"
    >
      <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm border border-white/20 dark:border-gray-800/30 rounded-3xl overflow-hidden shadow-2xl perspective-1000 lg:min-h-[530px]">
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-sm font-medium">{features[activeFeature].title}</span>
          </div>
          <div className="flex items-center text-xs">
            <span className="bg-white/20 px-2 py-0.5 rounded text-white">PREPZR Dashboard</span>
          </div>
        </div>
        
        {/* Feature preview area */}
        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-orange-50/90 to-amber-50/80 dark:from-orange-950/80 dark:to-amber-950/80">
          <AnimatePresence mode="wait">
            <motion.div
              key={features[activeFeature].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="preserve-3d"
            >
              {features[activeFeature].preview}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Dashboard navigation */}
        <div className="bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handlePrevious}
            className="flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:text-orange-700 hover:bg-orange-100/50 dark:hover:bg-orange-900/30"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex gap-1">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeFeature 
                    ? "bg-orange-500 w-6" 
                    : "bg-orange-200 dark:bg-orange-800 w-2"
                }`}
              />
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleNext}
            className="flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:text-orange-700 hover:bg-orange-100/50 dark:hover:bg-orange-900/30"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Feature description */}
      <div className="mt-4 text-center">
        <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-300">{features[activeFeature].title}</h3>
        <p className="text-orange-600 dark:text-orange-400">{features[activeFeature].description}</p>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;

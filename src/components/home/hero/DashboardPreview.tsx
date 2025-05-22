
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, BookMarked, BarChart3, BookOpen, Zap } from 'lucide-react';

interface DashboardPreviewProps {
  activeFeature: number;
  setActiveFeature: (index: number) => void;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ activeFeature, setActiveFeature }) => {
  // Dashboard features
  const features = [
    {
      name: "Smart Study Plan",
      icon: <Calendar className="h-5 w-5" />,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      previewImage: "/lovable-uploads/study-plan-preview.png", // Placeholder - update when you have actual images
    },
    {
      name: "AI Tutor",
      icon: <BookOpen className="h-5 w-5" />,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
      previewImage: "/lovable-uploads/ai-tutor-preview.png", // Placeholder - update when you have actual images
    },
    {
      name: "Exam Readiness",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      previewImage: "/lovable-uploads/exam-readiness-preview.png", // Placeholder - update when you have actual images
    },
    {
      name: "Concept Cards",
      icon: <BookMarked className="h-5 w-5" />,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
      previewImage: "/lovable-uploads/concept-cards-preview.png", // Placeholder - update when you have actual images
    },
    {
      name: "Revision Loops",
      icon: <Zap className="h-5 w-5" />,
      color: "text-orange-600 dark:text-orange-400", 
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      previewImage: "/lovable-uploads/revision-loops-preview.png", // Placeholder - update when you have actual images
    },
  ];

  // Default preview content - Exam readiness score visualization
  const examReadinessContent = (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Exam Readiness Score</h3>
      
      <div className="flex justify-center mb-6">
        <div className="relative">
          {/* Circular progress indicator */}
          <svg className="w-32 h-32">
            <circle 
              cx="64" 
              cy="64" 
              r="58" 
              stroke="#FFA50033" 
              strokeWidth="12" 
              fill="transparent" 
              className="dark:opacity-30"
            />
            <circle 
              cx="64" 
              cy="64" 
              r="58"
              stroke="#FFA500" 
              strokeWidth="12" 
              strokeDasharray="365" 
              strokeDashoffset="127" 
              fill="transparent" 
              strokeLinecap="round" 
              transform="rotate(-90 64 64)" 
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-4xl font-bold text-orange-600 dark:text-orange-400">65%</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">+7% this week</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">Physics</span>
            <span className="text-orange-600 dark:text-orange-400">72%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: "72%" }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">Chemistry</span>
            <span className="text-orange-600 dark:text-orange-400">58%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: "58%" }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">Biology</span>
            <span className="text-orange-600 dark:text-orange-400">65%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: "65%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Feature-specific previews
  const featurePreviews = [
    // Study Plan Preview
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Personalized Study Plan</h3>
      <div className="space-y-3">
        <div className="p-3 border border-orange-200 dark:border-orange-900/50 rounded-md bg-orange-50 dark:bg-orange-900/20">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <span className="font-medium">Physics - Motion Laws</span>
            </div>
            <span className="text-sm text-orange-600">9:00 - 10:30 AM</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Complete problems 1-15 from Newton's Laws chapter</p>
        </div>
        
        <div className="p-3 border border-green-200 dark:border-green-900/50 rounded-md bg-green-50 dark:bg-green-900/20">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="font-medium">Biology - Cell Structure</span>
            </div>
            <span className="text-sm text-green-600">11:00 - 12:30 PM</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Review cell organelles and take practice quiz</p>
        </div>
        
        <div className="p-3 border border-purple-200 dark:border-purple-900/50 rounded-md bg-purple-50 dark:bg-purple-900/20">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="font-medium">Chemistry - Organic Compounds</span>
            </div>
            <span className="text-sm text-purple-600">2:00 - 3:30 PM</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Study functional groups and naming conventions</p>
        </div>
      </div>
    </div>,
    
    // AI Tutor Preview
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">24/7 AI Tutor</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-orange-100 dark:bg-orange-900/30 p-3 border-b">
          <div className="flex items-center">
            <span className="font-medium">Chemistry Help</span>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-medium">ME</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg max-w-[80%]">
              <p className="text-sm">Can you explain how to balance this chemical equation: H₂ + O₂ → H₂O</p>
            </div>
          </div>
          
          <div className="flex gap-3 justify-end">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg max-w-[80%]">
              <p className="text-sm">
                To balance this equation, we need equal atoms on both sides:
                <br /><br />
                Step 1: Count the atoms on each side.
                <br />
                Left: 2 H atoms, 2 O atoms
                <br />
                Right: 2 H atoms, 1 O atom
                <br /><br />
                Step 2: We need to balance oxygen by adding a coefficient to H₂O:
                <br />
                H₂ + O₂ → 2H₂O
                <br /><br />
                Step 3: Verify all atoms are balanced:
                <br />
                Left: 2 H atoms, 2 O atoms
                <br />
                Right: 4 H atoms, 2 O atoms
                <br /><br />
                Step 4: We need to balance hydrogen by updating the H₂ coefficient:
                <br />
                2H₂ + O₂ → 2H₂O
                <br /><br />
                Now we have:
                <br />
                Left: 4 H atoms, 2 O atoms
                <br />
                Right: 4 H atoms, 2 O atoms
                <br /><br />
                The balanced equation is: 2H₂ + O₂ → 2H₂O
              </p>
            </div>
            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    
    // Exam Readiness Preview (already defined above)
    examReadinessContent,
    
    // Concept Cards Preview
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interactive Concept Cards</h3>
      <div className="flex justify-center">
        <div className="perspective-1000 w-full max-w-xs">
          <div className="relative preserve-3d h-60 w-full transition-all duration-500 hover:rotate-y-180">
            <div className="absolute backface-hidden w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 border border-orange-200 dark:border-orange-800/30 rounded-lg p-5 flex flex-col">
              <h4 className="font-bold text-lg text-orange-800 dark:text-orange-300 mb-2">Photosynthesis</h4>
              <p className="text-gray-700 dark:text-gray-300 flex-grow text-sm">
                The process by which green plants and certain microorganisms transform light energy into chemical energy.
              </p>
              <div className="text-xs text-right text-orange-600 dark:text-orange-400 mt-2">Tap to flip</div>
            </div>
            
            <div className="absolute backface-hidden w-full h-full rotate-y-180 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border border-orange-200 dark:border-orange-800/30 rounded-lg p-5">
              <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-2">Key Points:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>Takes place in chloroplasts</li>
                <li>Converts CO₂ + H₂O → glucose + O₂</li>
                <li>Requires sunlight, chlorophyll</li>
                <li>Two phases: light-dependent reactions and Calvin cycle</li>
              </ul>
              <div className="flex justify-end mt-4">
                <div className="bg-orange-200 dark:bg-orange-800/50 text-orange-800 dark:text-orange-300 text-xs px-2 py-1 rounded">
                  Biology
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    
    // Revision Loops Preview
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revision Loops</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-orange-200 dark:bg-orange-800/50 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                <span className="text-white font-bold">85%</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium">Newton's Laws of Motion</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Next review: Tomorrow</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-amber-200 dark:bg-amber-800/50 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                <span className="text-white font-bold">62%</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium">Periodic Table Elements</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Next review: Today</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-red-200 dark:bg-red-800/50 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white font-bold">43%</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium">Organic Chemistry Functional Groups</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Review now!</p>
          </div>
        </div>
      </div>
    </div>
  ];

  return (
    <div className="flex-1 w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0 lg:mr-4 xl:mr-0">
      <div className="relative mx-auto">
        {/* Dashboard Window with macOS style header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Browser-like header */}
          <div className="bg-gray-100 dark:bg-gray-900 p-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
            <div className="flex space-x-1.5 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
                PREPZR Dashboard
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-4 bg-orange-50/50 dark:bg-gray-900/50">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold text-orange-800 dark:text-orange-300">Dashboard</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome, Rahul</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                R
              </div>
            </div>

            {/* Feature navigation tabs */}
            <div className="flex overflow-x-auto space-x-1 py-2 mb-4 scrollbar-thin scrollbar-thumb-orange-200 dark:scrollbar-thumb-orange-800 scrollbar-track-transparent">
              {features.map((feature, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap text-sm transition-all ${
                    activeFeature === index 
                      ? `${feature.bgColor} ${feature.color} font-medium` 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {feature.icon}
                  <span>{feature.name}</span>
                </button>
              ))}
            </div>

            {/* Feature preview section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden h-[320px] relative shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  {featurePreviews[activeFeature]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Decorative elements around the dashboard */}
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-300 dark:from-orange-700/30 dark:to-amber-700/30 rounded-full blur-2xl opacity-50 -z-10"></div>
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-700/30 dark:to-orange-700/30 rounded-full blur-xl opacity-50 -z-10"></div>
      </div>
    </div>
  );
};

export default DashboardPreview;

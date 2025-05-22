
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface DashboardPreviewProps {
  activeFeature: number;
  setActiveFeature: (index: number) => void;
}

// Icons for feature highlights
const FeatureIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">
    {children}
  </div>
);

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ activeFeature, setActiveFeature }) => {
  const features = [
    {
      id: "smart-dashboard",
      title: "Smart Dashboard",
      description: "Personalized overview of your study progress and activities.",
      image: "https://placehold.co/600x400/e3f2fd/1976d2?text=Smart+Dashboard",
      color: "from-blue-600 to-blue-500"
    },
    {
      id: "adaptive-plan",
      title: "Adaptive Study Plan",
      description: "Learning plan that adapts to your performance and preferences.",
      image: "https://placehold.co/600x400/e3f2fd/1976d2?text=Adaptive+Study+Plan",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "flashcard-recall",
      title: "Flashcard Recall System",
      description: "Spaced repetition system for maximum memory retention.",
      image: "https://placehold.co/600x400/e3f2fd/1976d2?text=Flashcard+Recall",
      color: "from-indigo-600 to-blue-600"
    },
    {
      id: "formula-practice",
      title: "Formula Practice",
      description: "Interactive practice for physics, chemistry, and math equations.",
      image: "https://placehold.co/600x400/e3f2fd/1976d2?text=Formula+Practice",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "syllabus-integration",
      title: "Exam Syllabus Integration",
      description: "Track your progress through the official exam syllabus.",
      image: "https://placehold.co/600x400/e3f2fd/1976d2?text=Syllabus+Integration",
      color: "from-blue-600 to-indigo-500"
    }
  ];

  return (
    <motion.div 
      className="w-full lg:w-1/2 perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="relative">
        {/* Feature selection controls */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {features.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(index)}
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                activeFeature === index 
                  ? `bg-gradient-to-r ${feature.color} text-white font-medium shadow-md`
                  : 'bg-white/70 hover:bg-white border border-blue-100 text-blue-700'
              }`}
            >
              {feature.title}
            </button>
          ))}
        </div>

        {/* Feature preview */}
        <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-blue-200 dark:border-blue-800/30 preserve-3d transition-all duration-500 transform hover:scale-[1.02]">
          {/* Dashboard header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-white font-bold">PREPZR Dashboard</div>
            </div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-white/30"></div>
              <div className="w-3 h-3 rounded-full bg-white/30"></div>
              <div className="w-3 h-3 rounded-full bg-white/30"></div>
            </div>
          </div>

          {/* Welcome banner */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/30">
            <h3 className="text-blue-800 dark:text-blue-200 font-medium">Welcome to PREPZR</h3>
            <p className="text-blue-600 dark:text-blue-300 text-sm">
              World's first emotionally aware, hyper personalized, adaptive exam prep platform.
            </p>
          </div>

          {/* Feature content */}
          <div className="p-4 h-64 overflow-hidden relative">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-4"
            >
              <div className="flex flex-col h-full">
                <h3 className={`text-lg font-medium mb-2 bg-gradient-to-r ${features[activeFeature].color} bg-clip-text text-transparent`}>
                  {features[activeFeature].title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  {features[activeFeature].description}
                </p>
                
                {/* Smart Dashboard View */}
                {activeFeature === 0 && (
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="text-xs text-blue-700 font-medium">Study Streak</div>
                      <div className="text-2xl font-bold text-blue-900">14 days</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="text-xs text-blue-700 font-medium">Exam Readiness</div>
                      <div className="text-2xl font-bold text-blue-900">78%</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="text-xs text-blue-700 font-medium">Focus Time</div>
                      <div className="text-2xl font-bold text-blue-900">4.5 hrs</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="text-xs text-blue-700 font-medium">Concepts Mastered</div>
                      <div className="text-2xl font-bold text-blue-900">127</div>
                    </div>
                  </div>
                )}
                
                {/* Adaptive Study Plan View */}
                {activeFeature === 1 && (
                  <div className="flex-1 flex flex-col">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-3">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-blue-800 font-medium">Physics - Wave Optics</div>
                        <div className="text-xs text-blue-500">9:00 AM - 10:30 AM</div>
                      </div>
                      <div className="mt-1 text-xs text-blue-600">Personalized for your learning style</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-3">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-blue-800 font-medium">Chemistry - Organic Reactions</div>
                        <div className="text-xs text-blue-500">11:00 AM - 12:30 PM</div>
                      </div>
                      <div className="mt-1 text-xs text-blue-600">Based on your recent performance</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-800 font-medium">AI Recommendation</div>
                      <div className="mt-1 text-xs text-blue-700">Focus more on Thermodynamics based on test results</div>
                    </div>
                  </div>
                )}
                
                {/* Flashcard Recall System View */}
                {activeFeature === 2 && (
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 flex items-center justify-center mb-3 perspective-1000">
                      <div className="bg-white p-4 rounded-lg shadow-md text-center w-full preserve-3d transform transition-all duration-500 animate-float-subtle">
                        <div className="text-sm text-blue-800 font-medium mb-2">What is Newton's First Law?</div>
                        <div className="text-xs text-blue-600 italic">Tap to flip</div>
                      </div>
                    </div>
                    <div className="flex justify-between gap-2">
                      <div className="flex-1 bg-red-50 p-2 rounded-lg border border-red-100 text-center">
                        <div className="text-xs text-red-700">Review</div>
                      </div>
                      <div className="flex-1 bg-yellow-50 p-2 rounded-lg border border-yellow-100 text-center">
                        <div className="text-xs text-yellow-700">Hard</div>
                      </div>
                      <div className="flex-1 bg-green-50 p-2 rounded-lg border border-green-100 text-center">
                        <div className="text-xs text-green-700">Easy</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Formula Practice View */}
                {activeFeature === 3 && (
                  <div className="flex-1 flex flex-col">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-3">
                      <div className="text-center">
                        <div className="text-lg font-medium text-blue-800 mb-2">E = mc²</div>
                        <div className="text-xs text-blue-600">Energy-Mass Equivalence</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <div className="flex-1 bg-white p-2 rounded-lg border border-blue-100 text-center">
                        <div className="text-xs text-blue-700">Practice</div>
                      </div>
                      <div className="flex-1 bg-white p-2 rounded-lg border border-blue-100 text-center">
                        <div className="text-xs text-blue-700">Derivation</div>
                      </div>
                      <div className="flex-1 bg-white p-2 rounded-lg border border-blue-100 text-center">
                        <div className="text-xs text-blue-700">Applications</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-800 font-medium">Multi-technique Learning</div>
                      <div className="text-xs text-blue-700 mt-1">Visual, practical, and conceptual approaches</div>
                    </div>
                  </div>
                )}
                
                {/* Syllabus Integration View */}
                {activeFeature === 4 && (
                  <div className="flex-1 flex flex-col">
                    <div className="mb-3">
                      <div className="text-sm text-blue-800 font-medium mb-2">NEET Syllabus Progress</div>
                      <div className="flex items-center mb-1">
                        <div className="text-xs text-blue-700 w-24">Physics</div>
                        <div className="flex-1 bg-blue-100 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                        </div>
                        <div className="text-xs text-blue-700 ml-2">75%</div>
                      </div>
                      <div className="flex items-center mb-1">
                        <div className="text-xs text-blue-700 w-24">Chemistry</div>
                        <div className="flex-1 bg-blue-100 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '82%'}}></div>
                        </div>
                        <div className="text-xs text-blue-700 ml-2">82%</div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-xs text-blue-700 w-24">Biology</div>
                        <div className="flex-1 bg-blue-100 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '68%'}}></div>
                        </div>
                        <div className="text-xs text-blue-700 ml-2">68%</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-800 font-medium">Exam Readiness Score</div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-xs text-blue-700">
                          Based on syllabus coverage and test performance
                        </div>
                        <div className="text-lg font-bold text-blue-900">78%</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Feature benefit list */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-t border-blue-100 dark:border-blue-800/30">
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Key Benefits:</h4>
            <ul className="space-y-1.5">
              <li className="flex items-center text-xs text-blue-700 dark:text-blue-300">
                <Check className="h-3.5 w-3.5 mr-2 text-blue-600 dark:text-blue-400" />
                Hyper-personalized learning experience
              </li>
              <li className="flex items-center text-xs text-blue-700 dark:text-blue-300">
                <Check className="h-3.5 w-3.5 mr-2 text-blue-600 dark:text-blue-400" />
                Adaptive to your learning style and performance
              </li>
              <li className="flex items-center text-xs text-blue-700 dark:text-blue-300">
                <Check className="h-3.5 w-3.5 mr-2 text-blue-600 dark:text-blue-400" />
                Complete exam syllabus coverage
              </li>
            </ul>
          </div>
        </div>
        
        {/* Floating 3D elements around the dashboard */}
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-200/50 dark:bg-blue-800/20 rounded-full filter blur-xl animate-blob"></div>
        <div className="absolute -top-5 right-16 w-16 h-16 bg-indigo-200/50 dark:bg-indigo-800/20 rounded-full filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 -right-8 w-20 h-20 bg-blue-200/50 dark:bg-blue-800/20 rounded-full filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;

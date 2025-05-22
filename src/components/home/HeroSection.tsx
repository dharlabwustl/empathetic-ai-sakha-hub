
import React, { useState } from 'react';
import { ExamReadinessAnalyzer } from './ExamReadinessAnalyzer';
import HeroContent from './hero/HeroContent';
import ImprovedHeroBackground from './hero/ImprovedHeroBackground';

const HeroSection = () => {
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  
  const handleExamReadinessClick = () => {
    setShowExamAnalyzer(true);
  };
  
  const handleCloseExamAnalyzer = () => {
    setShowExamAnalyzer(false);
  };

  return (
    <section className="min-h-[80vh] w-full relative overflow-hidden py-20 flex items-center">
      {/* Improved 3D background that matches dashboard style */}
      <ImprovedHeroBackground />
      
      {/* Semi-transparent overlay for text readability */}
      <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 z-10" />
      
      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left content with text and CTA */}
          <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
          
          {/* Right content with 3D imagery/mockup */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-lg h-[500px] perspective-1000">
              {/* Floating dashboard mockup with 3D effect */}
              <div 
                className="absolute w-full h-full top-0 left-0 preserve-3d"
                style={{ 
                  transform: "rotateY(-10deg) rotateX(5deg) translateZ(0)",
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 preserve-3d">
                  {/* Dashboard mockup content would go here */}
                  <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 flex flex-col">
                    {/* Header area */}
                    <div className="h-12 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex items-center px-4">
                      <div className="w-32 h-4 bg-indigo-200 dark:bg-indigo-700 rounded-full"></div>
                      <div className="ml-auto flex space-x-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-800"></div>
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-800"></div>
                      </div>
                    </div>
                    
                    {/* Main content area */}
                    <div className="flex-1 flex gap-4">
                      {/* Sidebar */}
                      <div className="w-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-col items-center py-4 space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-800"></div>
                        ))}
                      </div>
                      
                      {/* Dashboard cards */}
                      <div className="flex-1 space-y-4">
                        {/* KPI row */}
                        <div className="flex gap-4">
                          {[...Array(3)].map((_, i) => (
                            <div 
                              key={i} 
                              className="h-24 flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 flex flex-col"
                            >
                              <div className="w-12 h-3 bg-indigo-200 dark:bg-indigo-700 rounded-full mb-2"></div>
                              <div className="w-16 h-5 bg-purple-200 dark:bg-purple-700 rounded-full mt-auto"></div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Chart area */}
                        <div className="h-40 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                          <div className="w-full h-full flex items-end space-x-2">
                            {[...Array(7)].map((_, i) => (
                              <div 
                                key={i}
                                className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-md"
                                style={{ height: `${Math.random() * 80 + 10}%` }}
                              ></div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Activities section */}
                        <div className="h-32 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-24 h-3 bg-indigo-200 dark:bg-indigo-700 rounded-full"></div>
                            <div className="w-10 h-3 bg-purple-200 dark:bg-purple-700 rounded-full"></div>
                          </div>
                          <div className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-800 mr-2"></div>
                                <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Subtle drop shadow for 3D effect */}
                <div 
                  className="absolute -bottom-10 -right-10 w-[90%] h-[20%] bg-blue-900/10 dark:bg-blue-500/10 blur-2xl rounded-full"
                  style={{ transform: "translateZ(-50px)" }}
                ></div>
                
                {/* Hover glow effect */}
                <div 
                  className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ transform: "translateZ(-30px)" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Exam Readiness Analyzer pop-up */}
      {showExamAnalyzer && <ExamReadinessAnalyzer onClose={handleCloseExamAnalyzer} />}
    </section>
  );
};

export default HeroSection;

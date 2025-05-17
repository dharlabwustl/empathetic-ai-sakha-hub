
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Layers, Star, ArrowRight, BookOpen, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChampionMethodologySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const steps = [
    {
      id: 0,
      title: "Personalized Learning Profile",
      description: "We start by analyzing your learning style, preferences, and academic history to create a unique profile tailored to you.",
      icon: <BookOpen className="h-12 w-12 text-purple-600" />,
      color: "from-purple-500 to-purple-700"
    },
    {
      id: 1,
      title: "AI-Powered Content Delivery",
      description: "Our AI engine delivers study materials and practice questions optimized for your learning profile and current knowledge level.",
      icon: <Brain className="h-12 w-12 text-blue-600" />,
      color: "from-blue-500 to-blue-700"
    },
    {
      id: 2,
      title: "Real-time Adaptation",
      description: "The system continuously adjusts to your performance, mood, and surrounding influences to optimize your learning experience.",
      icon: <Zap className="h-12 w-12 text-yellow-600" />,
      color: "from-yellow-500 to-yellow-700"
    },
    {
      id: 3,
      title: "Comprehensive Data Analysis",
      description: "We analyze performance data across multiple dimensions to identify patterns, strengths, and areas needing improvement.",
      icon: <BarChart2 className="h-12 w-12 text-green-600" />,
      color: "from-green-500 to-green-700"
    },
    {
      id: 4,
      title: "Integrated Knowledge Network",
      description: "Our system connects concepts, creating a neural network of knowledge that enhances understanding and recall.",
      icon: <Layers className="h-12 w-12 text-red-600" />,
      color: "from-red-500 to-red-700"
    },
    {
      id: 5,
      title: "Champion Results",
      description: "The culmination of our methodology produces exceptional exam results, deeper understanding, and lifelong learning skills.",
      icon: <Star className="h-12 w-12 text-orange-600" />,
      color: "from-orange-500 to-orange-700"
    }
  ];
  
  // Auto-advancing animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
      }, 3000); // Change step every 3 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, steps.length]);
  
  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);
  
  return (
    <section 
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            The Champion Methodology
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our revolutionary approach combines AI intelligence with emotional awareness to create a deeply personalized learning experience.
          </p>
        </div>
        
        {/* Main animation area */}
        <div className="relative mx-auto max-w-5xl mb-12 min-h-[400px] md:min-h-[500px]">
          {/* Central AI brain hub animation */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-indigo-600 opacity-20 blur-xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full p-6 md:p-8 shadow-lg">
                <Brain className="h-12 w-12 md:h-16 md:w-16 text-white" />
              </div>
              <div className="absolute inset-0 border-4 border-indigo-300 rounded-full animate-ping opacity-30"></div>
            </div>
          </motion.div>
          
          {/* Connection lines */}
          {steps.map((step) => (
            <AnimatePresence key={`line-${step.id}`}>
              {(activeStep === step.id || steps[(activeStep + 1) % steps.length].id === step.id) && (
                <motion.div 
                  className={`absolute hidden md:block top-1/2 left-1/2 h-px bg-gradient-to-r from-transparent to-indigo-500 transform -translate-y-1/2 origin-left`}
                  style={{ 
                    rotate: `${60 * step.id}deg`,
                    width: '150px',
                    transformOrigin: 'left center'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 0.7 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>
          ))}
          
          {/* Step nodes */}
          {steps.map((step) => {
            // Calculate position around the circle
            const angle = (Math.PI * 2 * step.id) / steps.length - Math.PI / 2;
            const radius = window.innerWidth < 768 ? 120 : 200; // Responsive radius
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <div 
                key={step.id}
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                style={{ 
                  marginLeft: x,
                  marginTop: y,
                }}
              >
                <AnimatePresence>
                  <motion.div
                    className={`rounded-full ${activeStep === step.id ? 'bg-gradient-to-br ' + step.color : 'bg-gray-200 dark:bg-gray-700'} 
                      ${activeStep === step.id ? 'text-white' : 'text-gray-600 dark:text-gray-300'} 
                      p-3 cursor-pointer shadow-lg transition-all duration-300`}
                    onClick={() => setActiveStep(step.id)}
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      scale: activeStep === step.id ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        
        {/* Step details */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeStep}
            className="text-center max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`inline-flex bg-gradient-to-br ${steps[activeStep].color} rounded-full p-3 mb-4`}>
              {steps[activeStep].icon}
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">{steps[activeStep].title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{steps[activeStep].description}</p>
            
            <div className="flex justify-center space-x-3">
              <Button
                variant="outline" 
                onClick={() => setActiveStep(activeStep === 0 ? steps.length - 1 : activeStep - 1)}
                size="sm"
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-2">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${activeStep === step.id ? 'bg-indigo-600 w-4' : 'bg-gray-300 dark:bg-gray-600'}`}
                    aria-label={`Go to step ${step.id + 1}`}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline"
                onClick={() => setActiveStep(activeStep === steps.length - 1 ? 0 : activeStep + 1)}
                size="sm"
              >
                Next
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="mt-10 text-center">
          <Button variant="default" className="group">
            Learn more about our methodology
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChampionMethodologySection;


import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, BookOpen, TrendingUp, Clock, Target, Dices, Crown, BookText, BarChart } from 'lucide-react';

const ChampionMethodologySection = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  
  const steps = [
    {
      title: 'Personalized Assessment',
      description: 'Our AI analyzes your learning style, goals, and current knowledge levels to create a personalized roadmap for success.',
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      color: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-500'
    },
    {
      title: 'AI-Driven Concept Mastery',
      description: 'Our revolutionary AI guidance system ensures complete mastery of core concepts, building a strong foundation for advanced topics.',
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Continuous Adaptation',
      description: 'Machine learning algorithms continuously adapt to your progress, strengthening weak areas and optimizing study time.',
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      color: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-500'
    },
    {
      title: 'Optimal Learning Intervals',
      description: 'Scientifically optimized spaced repetition ensures long-term retention and minimizes forgetting curve effects.',
      icon: <Clock className="h-8 w-8 text-amber-500" />,
      color: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-500'
    },
    {
      title: 'Precision Targeting',
      description: 'Identifies and targets high-yield topics most likely to appear on your specific exam, maximizing study efficiency.',
      icon: <Target className="h-8 w-8 text-red-500" />,
      color: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-500'
    },
    {
      title: 'Randomized Practice',
      description: 'Strategic randomized practice tests and problems simulate real exam conditions, building test-day confidence.',
      icon: <Dices className="h-8 w-8 text-indigo-500" />,
      color: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-500'
    },
    {
      title: 'Champion Performance',
      description: 'The culmination of our methodology results in peak performance when it matters most - on exam day.',
      icon: <Crown className="h-8 w-8 text-yellow-500" />,
      color: 'bg-yellow-100 dark:bg-yellow-900/30',
      iconColor: 'text-yellow-500'
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setActiveStepIndex((prev) => (prev + 1) % steps.length);
      }, 5000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoPlaying, steps.length]);

  const handleStepClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveStepIndex(index);
  };

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              The PREPZR Champion Methodology™
            </span>
          </h2>
          <p className="text-muted-foreground">
            Our proprietary 7-step AI-powered learning system that has helped thousands of students achieve top percentile scores
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left side - Steps List */}
          <div className="lg:col-span-4">
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  onClick={() => handleStepClick(index)}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={resumeAutoPlay}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border ${
                    activeStepIndex === index 
                      ? 'border-primary bg-primary/5' 
                      : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-2 ${step.color}`}>
                      {step.icon}
                    </div>
                    <div>
                      <h3 className={`font-medium ${
                        activeStepIndex === index ? 'text-primary' : ''
                      }`}>
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Animated Content */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border p-6 h-[400px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="h-full flex flex-col justify-center relative z-10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`rounded-full p-4 ${steps[activeStepIndex].color}`}>
                      {steps[activeStepIndex].icon}
                    </div>
                    <h3 className="text-2xl font-bold">{steps[activeStepIndex].title}</h3>
                  </div>
                  
                  <p className="text-lg mb-8">{steps[activeStepIndex].description}</p>
                  
                  {/* Visual representations for each step */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeStepIndex === 0 && (
                      <>
                        <Card className="bg-slate-50 dark:bg-slate-900 border">
                          <CardContent className="p-4 flex items-center gap-3">
                            <Brain className="h-6 w-6 text-purple-500" />
                            <div className="text-sm">
                              <span className="font-medium">AI analysis</span>
                              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
                                <motion.div
                                  initial={{ width: "0%" }}
                                  animate={{ width: "80%" }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="h-full bg-purple-500"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-slate-50 dark:bg-slate-900 border">
                          <CardContent className="p-4 flex items-center gap-3">
                            <BarChart className="h-6 w-6 text-blue-500" />
                            <div className="text-sm">
                              <span className="font-medium">Personalization</span>
                              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
                                <motion.div
                                  initial={{ width: "0%" }}
                                  animate={{ width: "95%" }}
                                  transition={{ duration: 1, delay: 0.7 }}
                                  className="h-full bg-blue-500"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                    
                    {activeStepIndex === 1 && (
                      <>
                        <Card className="bg-slate-50 dark:bg-slate-900 border">
                          <CardContent className="p-4 flex items-center gap-3">
                            <BookOpen className="h-6 w-6 text-blue-500" />
                            <div className="text-sm">
                              <span className="font-medium">Concept Mapping</span>
                              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
                                <motion.div
                                  initial={{ width: "0%" }}
                                  animate={{ width: "90%" }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="h-full bg-blue-500"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-slate-50 dark:bg-slate-900 border">
                          <CardContent className="p-4 flex items-center gap-3">
                            <BookText className="h-6 w-6 text-green-500" />
                            <div className="text-sm">
                              <span className="font-medium">Foundation Building</span>
                              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
                                <motion.div
                                  initial={{ width: "0%" }}
                                  animate={{ width: "85%" }}
                                  transition={{ duration: 1, delay: 0.7 }}
                                  className="h-full bg-green-500"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}

                    {/* Similar interactive elements for other steps */}
                    {(activeStepIndex > 1) && (
                      <Card className="col-span-2 bg-slate-50 dark:bg-slate-900 border">
                        <CardContent className="p-4">
                          <div className="flex justify-center">
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              {steps[activeStepIndex].icon}
                            </motion.div>
                          </div>
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2 }}
                            className="h-2 bg-primary/60 rounded-full mt-4"
                          />
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Progress indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleStepClick(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeStepIndex === index 
                        ? 'bg-primary w-4' 
                        : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChampionMethodologySection;

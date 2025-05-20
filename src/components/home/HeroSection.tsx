
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, BookOpen, Users, GraduationCap } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleExploreStudyPlans = () => {
    navigate('/study-plans');
  };

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-300 filter blur-3xl"></div>
          <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-purple-300 filter blur-3xl"></div>
          <div className="absolute bottom-40 left-40 w-96 h-96 rounded-full bg-indigo-300 filter blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          {/* Left content */}
          <motion.div
            className="max-w-2xl space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block">
              <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full">
                AI-Powered Personalized Learning
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Master NEET with Emotional Intelligence
            </h1>

            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-xl">
              The world's first emotionally aware exam preparation platform that adapts to your unique learning style and emotional state.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg px-8 py-6 text-lg"
              >
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                onClick={handleExploreStudyPlans}
                size="lg"
                variant="outline"
                className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-8 py-6 text-lg"
              >
                Explore Study Plans
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">95%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">10K+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">24/7</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Expert Support</p>
              </div>
            </div>
          </motion.div>

          {/* Right content - Visual elements */}
          <motion.div
            className="w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main dashboard preview */}
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
                <div className="px-6 py-4 rounded-t-xl bg-gradient-to-r from-indigo-600 to-purple-600">
                  <h2 className="text-white font-bold text-lg">Your Personalized Study Dashboard</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Study progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium dark:text-white">Today's Progress</span>
                      <span className="text-indigo-600 dark:text-indigo-400">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  
                  {/* Concept cards */}
                  <div className="space-y-3">
                    {['Physics: Mechanics', 'Biology: Cell Structure', 'Chemistry: Organic Compounds'].map((topic, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/60 rounded-lg">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-blue-100 text-blue-600' : 
                          index === 1 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {index === 0 ? <GraduationCap className="h-5 w-5" /> : 
                           index === 1 ? <BookOpen className="h-5 w-5" /> : 
                           <Heart className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium dark:text-white text-sm">{topic}</h3>
                          <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${
                              index === 0 ? 'bg-blue-500 w-[80%]' : 
                              index === 1 ? 'bg-green-500 w-[60%]' : 
                              'bg-amber-500 w-[40%]'
                            }`}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Action button */}
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Continue Learning
                  </Button>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -bottom-6 -right-6 z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <Card className="w-32 h-32 shadow-lg">
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                    <Users className="h-8 w-8 text-indigo-500 mb-2" />
                    <p className="text-sm font-medium text-center">Join 10k+ students</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                className="absolute -top-6 -left-6 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              >
                <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-blue-100 dark:border-blue-800/30">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-full">
                      <Heart className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-xs">
                      <p className="font-medium">UN SDG</p>
                      <p>Education for All</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Trusted by section */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
            Trusted by top medical colleges and institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['AIIMS', 'JIPMER', 'CMC Vellore', 'AFMC', 'MAMC'].map((college, index) => (
              <div key={index} className="text-gray-400 dark:text-gray-600 font-semibold text-lg">
                {college}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

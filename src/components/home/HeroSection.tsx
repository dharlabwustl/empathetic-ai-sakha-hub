
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Target, Users, GraduationCap, BookOpen, Brain } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleExploreStudyPlans = () => {
    navigate('/study-plans');
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-500/20 filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-purple-500/20 filter blur-3xl animate-pulse-subtle"></div>
          <div className="absolute bottom-40 left-40 w-96 h-96 rounded-full bg-indigo-500/20 filter blur-3xl animate-pulse"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block">
              <span className="bg-indigo-600/30 text-indigo-200 text-sm font-medium px-4 py-1.5 rounded-full border border-indigo-500/30">
                AI-Powered Learning Revolution
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300">
                Master NEET with
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mt-2">
                Emotional Intelligence
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-xl">
              The first exam preparation platform that adapts to your unique learning style and emotional state, 
              delivering personalized study experiences for maximum results.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-indigo-500/20 px-8 py-6 text-lg"
              >
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                onClick={handleExploreStudyPlans}
                size="lg"
                variant="outline"
                className="border-indigo-400/30 hover:bg-indigo-800/30 text-white px-8 py-6 text-lg"
              >
                Explore Study Plans
              </Button>
            </div>

            {/* Stats with improved visual design */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <motion.div 
                className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <p className="text-3xl font-bold text-indigo-300">95%</p>
                <p className="text-sm text-gray-300">Success Rate</p>
              </motion.div>
              <motion.div 
                className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <p className="text-3xl font-bold text-indigo-300">10K+</p>
                <p className="text-sm text-gray-300">Active Students</p>
              </motion.div>
              <motion.div 
                className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <p className="text-3xl font-bold text-indigo-300">24/7</p>
                <p className="text-sm text-gray-300">Expert Support</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right content - Visual elements */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Main dashboard card */}
            <div className="relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/20">
                <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 border-b border-indigo-500/30">
                  <h2 className="text-white font-bold text-lg">Your Smart Study Dashboard</h2>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Study progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-white">Today's Progress</span>
                      <span className="text-indigo-300">75%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  
                  {/* Concept cards */}
                  <div className="space-y-3">
                    {[
                      { title: 'Physics: Mechanics', icon: <Target className="h-5 w-5" />, progress: 80, color: 'blue' },
                      { title: 'Biology: Cell Structure', icon: <BookOpen className="h-5 w-5" />, progress: 60, color: 'green' },
                      { title: 'Chemistry: Organic Compounds', icon: <Brain className="h-5 w-5" />, progress: 40, color: 'amber' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.color === 'blue' ? 'bg-blue-500/20 text-blue-300' : 
                          item.color === 'green' ? 'bg-green-500/20 text-green-300' : 
                          'bg-amber-500/20 text-amber-300'
                        }`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white text-sm">{item.title}</h3>
                          <div className="mt-1 w-full bg-slate-700 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${
                              item.color === 'blue' ? 'bg-blue-500 w-[80%]' : 
                              item.color === 'green' ? 'bg-green-500 w-[60%]' : 
                              'bg-amber-500 w-[40%]'
                            }`}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Action button */}
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                    Continue Learning
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Floating elements with better design */}
            <motion.div
              className="absolute -bottom-12 -right-6 z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="bg-slate-800/90 backdrop-blur-lg w-32 h-32 rounded-2xl shadow-lg border border-indigo-500/20 p-4 flex flex-col items-center justify-center">
                <Users className="h-8 w-8 text-indigo-300 mb-2" />
                <p className="text-sm font-medium text-gray-200 text-center">Join 10k+ students</p>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -top-10 -left-6 z-20"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            >
              <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl border border-green-500/20 p-3 flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-green-300" />
                </div>
                <div className="text-xs">
                  <p className="font-medium text-green-200">UN SDG</p>
                  <p className="text-gray-300">Education for All</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Trusted by section */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
            Trusted by top medical colleges and institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['AIIMS', 'JIPMER', 'CMC Vellore', 'AFMC', 'MAMC'].map((college, index) => (
              <div key={index} className="text-gray-400 font-semibold text-lg">
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


import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, GraduationCap, Users, Award, BookOpen, Heart } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleExploreFeatures = () => {
    // Smooth scroll to features section
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-purple-300 blur-3xl"></div>
          <div className="absolute top-[30%] right-[15%] w-72 h-72 rounded-full bg-blue-300 blur-3xl"></div>
          <div className="absolute bottom-[20%] left-[25%] w-80 h-80 rounded-full bg-indigo-300 blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content - Text and CTAs */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block">
              <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full">
                Next-gen NEET preparation
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Master NEET with Personalized Learning
            </h1>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-lg">
              Achieve your medical dream with AI-powered study plans, adaptive practice tests, and expert-crafted content tailored to your unique learning style.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all"
              >
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                onClick={handleExploreFeatures}
                size="lg"
                variant="outline"
                className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
              >
                Explore Features
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">95%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">10K+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">24/7</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Expert Support</p>
              </div>
            </div>
          </motion.div>

          {/* Right content - Visual elements */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main illustration */}
              <div className="relative z-20 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
                <div className="px-6 py-6 rounded-t-xl bg-gradient-to-r from-indigo-500 to-purple-600">
                  <h2 className="text-white font-bold text-xl">NEET Physics: Mastery Path</h2>
                </div>
                <div className="p-6 space-y-4">
                  {/* Learning topics */}
                  {['Kinematics', 'Thermodynamics', 'Optics'].map((topic, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/60 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-green-100 text-green-600' : 
                        index === 1 ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {index === 0 ? <Award className="h-5 w-5" /> : 
                         index === 1 ? <BookOpen className="h-5 w-5" /> : 
                         <GraduationCap className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="font-medium dark:text-white">{topic}</h3>
                        <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${
                            index === 0 ? 'bg-green-500 w-[85%]' : 
                            index === 1 ? 'bg-blue-500 w-[60%]' : 
                            'bg-amber-500 w-[40%]'
                          }`}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Interactive elements */}
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Continue Learning
                    </Button>
                  </div>
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
                className="absolute -top-4 -left-4 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              >
                <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 w-36 shadow-lg border-blue-100 dark:border-blue-800/30">
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
          className="mt-16 md:mt-24 text-center"
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

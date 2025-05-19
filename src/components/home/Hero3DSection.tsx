
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import StudentAvatarJourney from '@/components/animations/StudentAvatarJourney';
import { ArrowRight, Brain, Target, Sparkles } from 'lucide-react';

const Hero3DSection = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/signup');
  };
  
  const handleExamReadiness = () => {
    navigate('/exam-readiness');
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-16">
      {/* Creative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/20" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[20%] left-[20%] w-64 h-64 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute top-[50%] right-[20%] w-72 h-72 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl" />
        
        {/* Decorative geometric shapes */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-24 right-[15%] w-20 h-20 border-2 border-indigo-300/30 dark:border-indigo-400/20 rounded-xl rotate-12"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2.5, delay: 0.3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-24 left-[15%] w-16 h-16 border-2 border-purple-300/30 dark:border-purple-400/20 rounded-full"
        />
        <motion.div 
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.5, rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] left-[10%] w-24 h-24 border-4 border-dashed border-blue-300/20 dark:border-blue-400/10 rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left content column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Sustainability badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300 rounded-full"
            >
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-medium">Supporting UN Sustainability Goal 4</span>
            </motion.div>
            
            {/* Main heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 leading-tight"
            >
              We understand your mindset, not just the Exam
            </motion.h1>
            
            {/* Supporting text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg text-slate-600 dark:text-slate-300 mb-8 mx-auto lg:mx-0 max-w-2xl"
            >
              PREP-zer goes beyond traditional exam prep by adapting to your emotional state, 
              learning style, and personal circumstances to create a truly personalized learning experience.
            </motion.p>
            
            {/* CTA buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                7 Days Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                onClick={handleExamReadiness}
                variant="outline"
                size="lg"
                className="border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700"
              >
                Test Your Exam Readiness
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right content column - Avatar journey */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1 w-full lg:max-w-[600px]"
          >
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50 overflow-hidden backdrop-blur-sm transform lg:rotate-1">
              <div className="p-1 md:p-2">
                {/* Hero visualization */}
                <div className="rounded-xl overflow-hidden bg-gradient-to-b from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 h-[400px] md:h-[500px]">
                  <StudentAvatarJourney />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            {
              icon: <Brain className="h-6 w-6 text-indigo-500" />,
              title: "Mood-Adaptive Learning",
              description: "Our AI detects your mood and adjusts study materials for optimal learning efficiency."
            },
            {
              icon: <Target className="h-6 w-6 text-purple-500" />,
              title: "Personalized Path",
              description: "Customized learning journeys adapted to your unique learning style and pace."
            },
            {
              icon: <Sparkles className="h-6 w-6 text-pink-500" />,
              title: "Proven Results",
              description: "Students achieve 32% better results using our emotionally intelligent exam preparation."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm"
            >
              <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero3DSection;


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import ExamNamesBadge from '../home/hero/ExamNamesBadge';
import { ArrowRight, SparklesIcon, BookOpen, Rocket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentTagline, setCurrentTagline] = useState(0);
  
  const taglines = [
    "Ace your exams.",
    "Save time.",
    "Stress less.",
    "Study smarter."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handler for exam readiness analyzer
  const handleExamReadiness = () => {
    // Dispatch an event to open the exam analyzer
    const event = new Event('open-exam-analyzer');
    window.dispatchEvent(event);
  };

  return (
    <section className="relative bg-gradient-to-br from-sky-100 via-white to-violet-100 dark:from-sky-900/80 dark:via-gray-900 dark:to-violet-900/80 py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Abstract background elements with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 -right-10 w-72 h-72 bg-purple-300/30 dark:bg-purple-700/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-300/30 dark:bg-blue-700/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-300/20 dark:bg-pink-700/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 9,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>
      
      {/* Enhanced grid pattern background with subtle animation */}
      <motion.div 
        className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        animate={{ 
          backgroundPosition: ["0% 0%", "1% 1%", "0% 0%"],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <div className="w-full max-w-7xl px-4 relative z-10 mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="w-full max-w-7xl mx-auto">
            {/* Hindi text line with enhanced gradient and special PREPZR animation - FIXED WIDTH ISSUE */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-hindi px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="py-2 inline-block w-full">
                अब तैयारी करो अपने तरीके से, सिर्फ{" "}
                <motion.span 
                  className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }}
                >
                  PREPZR
                </motion.span>{" "}
                के साथ!
              </span>
            </motion.h1>
            
            {/* English text line with different animation timing */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-white px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              We Understand Your Mindset, Not Just the Exam.
            </motion.h2>
          </div>
          
          {/* Enhanced Animated taglines */}
          <div className="text-lg md:text-xl text-gray-600 dark:text-gray-300 h-20 flex items-center justify-center mt-6">
            <motion.div
              key={currentTagline}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="inline-block relative"
            >
              <motion.span
                className="absolute inset-0 rounded-lg blur-sm"
                style={{
                  background: 'linear-gradient(90deg, #8b5cf6, #3b82f6, #ec4899, #f97316)',
                  opacity: 0.3,
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <span className="relative px-3 py-1 bg-white/40 dark:bg-gray-900/40 rounded-lg backdrop-blur-sm font-medium">
                {taglines[currentTagline]}
              </span>
            </motion.div>

            {currentTagline === taglines.length - 1 && (
              <motion.span
                className="ml-2 inline-block font-bold px-3 py-1 rounded-lg"
                initial={{ x: -20, opacity: 0 }}
                animate={{ 
                  x: 0,
                  opacity: 1,
                  color: ["#8b5cf6", "#3b82f6", "#ec4899", "#f97316", "#8b5cf6"],
                  scale: [1, 1.1, 1],
                  textShadow: ["0 0 5px rgba(139, 92, 246, 0.5)", "0 0 10px rgba(236, 72, 153, 0.5)", "0 0 5px rgba(59, 130, 246, 0.5)"]
                }}
                transition={{ 
                  x: { duration: 0.5 },
                  color: { duration: 4, repeat: Infinity, repeatType: "reverse" },
                  scale: { duration: 3, repeat: Infinity, repeatType: "reverse" },
                  textShadow: { duration: 4, repeat: Infinity, repeatType: "reverse" }
                }}
                style={{
                  backgroundImage: 'linear-gradient(to right, #8b5cf6, #3b82f6, #ec4899, #f97316)',
                  backgroundSize: '200% auto',
                  backgroundRepeat: 'no-repeat',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Crack your exams!
              </motion.span>
            )}
          </div>
          
          {/* Call to action buttons with enhanced animations */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 my-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            {user ? (
              <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 shadow-lg hover:shadow-xl group">
                <Link to="/dashboard/student" className="flex items-center px-6 py-6">
                  <SparklesIcon size={18} className="mr-2" />
                  <span>Go to Dashboard</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="ml-2"
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </Link>
              </Button>
            ) : (
              <>
                {/* Using Test Your Exam Readiness button as requested */}
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl flex items-center gap-2 px-6 py-6"
                  onClick={handleExamReadiness}
                >
                  <SparklesIcon size={20} />
                  <span className="font-medium">Test Your Exam Readiness</span>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="border-violet-200 hover:border-violet-300 hover:bg-violet-50 shadow-md hover:shadow-lg transition-all dark:border-violet-800 dark:hover:border-violet-700 dark:hover:bg-violet-900/50 px-6 py-6"
                >
                  <Link to="/signup" className="flex items-center gap-2">
                    <BookOpen size={20} />
                    <span>7-Day Free Trial</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </Link>
                </Button>
              </>
            )}
          </motion.div>
          
          {/* Exam Names Badge - animated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 mb-6 w-full"
          >
            <ExamNamesBadge />
          </motion.div>
        </div>
      </div>

      {/* Making Champion Methodology Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Our Making Champion Methodology
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            A comprehensive approach to ensure your exam success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
            whileHover={{ y: -5 }}
          >
            <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Personalized Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tailored study plans based on your learning style, strengths and weaknesses.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
            whileHover={{ y: -5 }}
          >
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Comprehensive Resources</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access to high-quality study materials, flashcards, practice questions, and concept cards.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
            whileHover={{ y: -5 }}
          >
            <div className="h-12 w-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600 dark:text-pink-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Progress Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              AI-powered analytics to monitor your progress and identify areas that need improvement.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

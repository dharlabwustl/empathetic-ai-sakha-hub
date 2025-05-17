
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
          <div className="w-full max-w-6xl mx-auto">
            {/* Hindi text line with enhanced gradient and special PREPZR animation */}
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight font-hindi"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="inline-block py-2 text-center overflow-visible whitespace-normal px-4">
                <span className="hindi-text">
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
              </div>
            </motion.h1>
            
            {/* English text line with different animation timing */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              We Understand Your Mindset, Not Just the Exam.
            </motion.h2>
          </div>
          
          {/* Enhanced Animated taglines */}
          <div className="text-lg md:text-xl text-gray-600 dark:text-gray-300 h-20 flex items-center justify-center mt-2">
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
      
      {/* Add CSS to ensure the Hindi text displays properly */}
      <style jsx>{`
        .hindi-text {
          font-family: 'Arial', 'Noto Sans Devanagari', sans-serif;
          letter-spacing: 0.5px;
          white-space: nowrap;
          display: inline-block;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import ExamNamesBadge from '../home/hero/ExamNamesBadge';
import KpiStats from '../home/hero/feature-highlights/KpiStats';
import { ArrowRight, SparklesIcon } from 'lucide-react';

const HeroSection = () => {
  const { user } = useAuth();
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

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Dynamic highlight animation
  const highlightVariants = {
    initial: { 
      backgroundSize: '0% 100%', 
      backgroundPosition: '0% 100%' 
    },
    animate: { 
      backgroundSize: '100% 100%',
      backgroundPosition: '100% 100%',
      transition: { duration: 1.2 }
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-sky-50 via-white to-violet-50 dark:from-sky-900 dark:via-gray-900 dark:to-violet-900 py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-violet-500 mb-4"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            variants={textVariants}
          >
            अब तैयारी करो अपने तरीके से, सिर्फ PREPZR के साथ!
          </motion.h2>
          
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6 max-w-3xl"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
            variants={textVariants}
          >
            We understand Your Mindset, Not Just the Exam.
          </motion.h1>
          
          <div className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 h-8">
            <motion.p
              key={currentTagline}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              {taglines[currentTagline]}
            </motion.p>
            {currentTagline === taglines.length - 1 && (
              <motion.span
                className="ml-2 inline-block font-bold"
                initial="initial"
                animate="animate"
                style={{
                  backgroundImage: 'linear-gradient(to right, #8b5cf6, #3b82f6)',
                  backgroundRepeat: 'no-repeat',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
                variants={highlightVariants}
              >
                Crack your exams!
              </motion.span>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {user ? (
              <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 group">
                <Link to="/dashboard/student" className="flex items-center">
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
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 group"
                  onClick={() => {
                    const event = new CustomEvent('open-exam-analyzer');
                    window.dispatchEvent(event);
                  }}
                >
                  <Link to="#" className="flex items-center">
                    <SparklesIcon size={18} className="mr-2" />
                    <span>Test Your Exam Readiness</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-violet-200 hover:border-violet-300 hover:bg-violet-50 dark:border-violet-800 dark:hover:border-violet-700 dark:hover:bg-violet-900/50">
                  <Link to="/signup" className="flex items-center">
                    7-Day Free Trial
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="ml-2"
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Trusted by students section */}
          <motion.div 
            className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 py-3 px-6 rounded-full border border-purple-100 dark:border-purple-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Trusted by students preparing for: 
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                NEET Launched
              </span>
            </p>
          </motion.div>
          
          {/* Exam Names Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 mb-12"
          >
            <ExamNamesBadge />
          </motion.div>
        </div>
        
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12"
        >
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Smart Data. Real Impact. Humanizing exam prep.
            </h3>
            <KpiStats />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

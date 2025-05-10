
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const HeroSection = () => {
  const { user } = useAuth();
  const [inView, setInView] = React.useState(false);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    const element = document.getElementById('hero-stats-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Stats data
  const stats = [
    { 
      id: 1, 
      value: 10000, 
      label: "Students Helped", 
      prefix: "+", 
      suffix: "", 
      decimals: 0,
      icon: "👨‍🎓"
    },
    { 
      id: 2, 
      value: 850, 
      label: "Concepts Mastered", 
      prefix: "Avg ", 
      suffix: "/Student", 
      decimals: 0,
      icon: "🧠"
    },
    { 
      id: 3, 
      value: 95, 
      label: "Success Rate", 
      prefix: "", 
      suffix: "%", 
      decimals: 0,
      icon: "✅"
    },
    { 
      id: 4, 
      value: 2000000, 
      label: "Flashcards Reviewed", 
      prefix: "", 
      suffix: "+", 
      decimals: 0,
      icon: "📚"
    },
    { 
      id: 5, 
      value: 12000, 
      label: "Study Plans Delivered", 
      prefix: "", 
      suffix: "+", 
      decimals: 0,
      icon: "📝"
    },
    { 
      id: 6, 
      value: 72, 
      label: "Feel Reduced Anxiety", 
      prefix: "", 
      suffix: "%", 
      decimals: 0,
      icon: "😌"
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-sky-50 via-white to-violet-50 dark:from-sky-900 dark:via-gray-900 dark:to-violet-900 py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-violet-500 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            अब तैयारी करो अपने तरीके से, सिर्फ PREPZR के साथ!
          </motion.h2>
          
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6 max-w-3xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We understand Your Mindset, Not Just the Exam.
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ace your exams. Save time. Stress less. Study smarter.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {user ? (
              <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600">
                <Link to="/dashboard/student">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600">
                  <Link to="/signup">Test Your Exam Readiness</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/signup">7-Day Free Trial</Link>
                </Button>
              </>
            )}
          </motion.div>
          
          <motion.div
            className="mt-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Trusted by students preparing for:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-sky-100 to-violet-100 dark:from-sky-800/50 dark:to-violet-800/50 text-sm font-medium rounded-full">
                  NEET <span className="text-xs px-1 py-0.5 bg-green-500 text-white rounded-sm ml-1">Launched</span>
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-sky-100 to-violet-100 dark:from-sky-800/50 dark:to-violet-800/50 text-sm font-medium rounded-full">JEE</span>
                <span className="px-3 py-1 bg-gradient-to-r from-sky-100 to-violet-100 dark:from-sky-800/50 dark:to-violet-800/50 text-sm font-medium rounded-full">UPSC</span>
                <span className="px-3 py-1 bg-gradient-to-r from-sky-100 to-violet-100 dark:from-sky-800/50 dark:to-violet-800/50 text-sm font-medium rounded-full">GATE</span>
              </div>
            </div>
          </motion.div>
          
          {/* Stats Section */}
          <div 
            id="hero-stats-section" 
            className="bg-gradient-to-r from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-900 dark:to-blue-900/20 py-8 px-4 rounded-2xl shadow-sm border border-purple-100/50 dark:border-purple-900/50 w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Smart Data. Real Impact. Humanizing exam prep.
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
              {stats.map((stat) => (
                <motion.div 
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: stat.id * 0.1 }}
                  className="flex flex-col items-center text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    scale: 1.02
                  }}
                >
                  <motion.div 
                    className="text-3xl mb-3 p-3 rounded-full bg-gray-50 dark:bg-gray-700"
                    whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">
                    {stat.label}
                  </h3>
                  <motion.div 
                    className="text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>{stat.prefix}</span>
                    {inView ? (
                      <CountUp 
                        start={0} 
                        end={stat.value} 
                        duration={2.5} 
                        separator="," 
                        decimals={stat.decimals}
                        decimal="."
                        useEasing={true}
                      />
                    ) : (
                      <span>0</span>
                    )}
                    <span>{stat.suffix}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { adminService } from '@/services/adminService';
import { 
  Users, Brain, CheckCircle, BookOpen, 
  ScrollText, ClipboardList
} from 'lucide-react';

// Define the stats based on the admin data structure
const defaultStats = [
  { 
    id: 1, 
    value: 10000, 
    label: "Students Helped", 
    prefix: "+", 
    suffix: "", 
    decimals: 0,
    icon: <Users className="text-purple-500" />,
    adminKey: "totalStudents"
  },
  { 
    id: 2, 
    value: 850, 
    label: "Concepts Mastered", 
    prefix: "Avg ", 
    suffix: "/Student", 
    decimals: 0,
    icon: <Brain className="text-indigo-500" />,
    adminKey: "averageConcepts"
  },
  { 
    id: 3, 
    value: 95, 
    label: "Success Rate", 
    prefix: "", 
    suffix: "%", 
    decimals: 0,
    icon: <CheckCircle className="text-green-500" />,
    adminKey: "successRate"
  },
  { 
    id: 5, 
    value: 2000000, 
    label: "Flashcards Reviewed", 
    prefix: "", 
    suffix: "+", 
    decimals: 0,
    icon: <ScrollText className="text-cyan-500" />,
    adminKey: "totalFlashcards"
  },
  { 
    id: 6, 
    value: 12000, 
    label: "Study Plans Delivered", 
    prefix: "", 
    suffix: "+", 
    decimals: 0,
    icon: <ClipboardList className="text-orange-500" />,
    adminKey: "totalStudyPlans"
  },
  { 
    id: 10, 
    value: 72, 
    label: "Feel Reduced Anxiety", 
    prefix: "", 
    suffix: "%", 
    decimals: 0,
    icon: <BookOpen className="text-fuchsia-500" />,
    adminKey: "verifiedMoodImprovement"
  }
];

export const KpiStats = () => {
  const [inView, setInView] = useState(false);
  const [stats, setStats] = useState(defaultStats);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );
    
    const element = document.getElementById('kpi-stats-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  
  // Fetch admin statistics when component mounts
  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const adminStats = await adminService.getDashboardStats();
        
        if (adminStats) {
          // Update stats with values from admin dashboard if available
          setStats(prevStats => 
            prevStats.map(stat => {
              const adminValue = adminStats[stat.adminKey as keyof typeof adminStats];
              // Only update if admin value exists and is a number
              if (adminValue !== undefined && !isNaN(Number(adminValue))) {
                return { ...stat, value: Number(adminValue) };
              }
              return stat;
            })
          );
        }
      } catch (error) {
        console.error("Error fetching admin statistics:", error);
        // Keep using default values if there's an error
      }
    };

    fetchAdminStats();
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3,
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      } 
    }
  };

  // Enhanced title animations for a premium feel
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Text animation variants for each character
  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  // Split the title into individual characters for animation
  const titleText = "Smart Data. Real Impact. Humanizing exam prep.";
  const titleChars = titleText.split("");

  return (
    <div 
      id="kpi-stats-section" 
      className="relative py-8 md:py-12 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30 rounded-2xl overflow-hidden">
        <div className="absolute w-full h-full">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <motion.div 
          className="text-center mb-8" 
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
          >
            {titleChars.map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={charVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4"
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-4">
                <motion.div
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mr-4"
                  animate={{
                    boxShadow: ["0 0 0 rgba(129, 140, 248, 0)", "0 0 20px rgba(129, 140, 248, 0.5)", "0 0 0 rgba(129, 140, 248, 0)"]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    repeatType: "reverse"
                  }}
                >
                  {stat.icon}
                </motion.div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{stat.label}</h3>
              </div>
              
              <div className="flex items-baseline">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.prefix}</span>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mx-1">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      decimals={stat.decimals}
                      delay={0.5}
                    />
                  ) : (
                    0
                  )}
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.suffix}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

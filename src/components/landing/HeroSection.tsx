
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import ExamNamesBadge from '../home/hero/ExamNamesBadge';
import { ArrowRight, SparklesIcon, BookOpen, Rocket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Direct NEET signup modal component
const NeetSignupModal = ({ isOpen, onClose, onContinue }) => {
  const [examDate, setExamDate] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div 
        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Join NEET Preparation
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Enter your details to start your NEET preparation journey with personalized guidance.
        </p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Mobile Number</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="+91 9876543210"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">NEET Exam Date</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
              onClick={() => onContinue({ name, mobile, examDate })}
            >
              Start Preparation
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showNeetModal, setShowNeetModal] = useState(false);
  
  // Text animation states
  const [isVisible, setIsVisible] = useState({
    mainTitle: false,
    subtitle: false,
    tagline: false,
    buttons: false,
    examsBadge: false
  });
  
  // Animation sequence
  useEffect(() => {
    // Trigger animations in sequence
    const sequence = async () => {
      setIsVisible(prev => ({ ...prev, mainTitle: true }));
      await new Promise(r => setTimeout(r, 400));
      setIsVisible(prev => ({ ...prev, subtitle: true }));
      await new Promise(r => setTimeout(r, 300));
      setIsVisible(prev => ({ ...prev, tagline: true }));
      await new Promise(r => setTimeout(r, 300));
      setIsVisible(prev => ({ ...prev, buttons: true }));
      await new Promise(r => setTimeout(r, 300));
      setIsVisible(prev => ({ ...prev, examsBadge: true }));
    };
    
    sequence();
  }, []);

  const handleStartNeetPrep = (data) => {
    // Save user selection data to localStorage
    const userData = {
      name: data.name,
      mobile: data.mobile,
      examGoal: "NEET",
      targetExamDate: data.examDate,
      isNewUser: true,
      completedOnboarding: false,
      loginCount: 1,
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem("userData", JSON.stringify(userData));
    
    toast({
      title: "Welcome to PREPZR!",
      description: "Preparing your personalized NEET study plan.",
    });
    
    // Close modal and navigate
    setShowNeetModal(false);
    navigate("/welcome-flow?completedOnboarding=false&new=true&exam=NEET");
  };

  // Text animation variants
  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  // Button animation variants
  const buttonAnimation = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3, type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section className="relative bg-gradient-to-br from-sky-100 via-white to-violet-100 dark:from-sky-900/80 dark:via-gray-900 dark:to-violet-900/80 py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 -right-10 w-72 h-72 bg-purple-300/30 dark:bg-purple-700/20 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-300/30 dark:bg-blue-700/20 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-300/20 dark:bg-pink-700/20 rounded-full blur-3xl"
          animate={{
            x: [0, 15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      {/* Grid pattern background with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tighter"
            initial="hidden"
            animate={isVisible.mainTitle ? "visible" : "hidden"}
            variants={textAnimation}
          >
            <motion.span 
              className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 py-2"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              अब तैयारी करो अपने तरीके से
            </motion.span>
            <motion.span 
              className="block text-gray-800 dark:text-white py-2"
              variants={textAnimation}
            >
              सिर्फ PREPZR के साथ!
            </motion.span>
            <motion.span 
              className="block text-gray-800 dark:text-white py-2"
              variants={textAnimation}
            >
              We understand Your Mindset, Not Just the Exam.
            </motion.span>
          </motion.h1>
          
          <motion.div 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 space-y-2"
            initial="hidden"
            animate={isVisible.subtitle ? "visible" : "hidden"}
            variants={textAnimation}
          >
            <p className="py-1">Ace your exams.</p>
            <p className="py-1">Save time.</p>
            <p className="py-1">Stress less.</p>
            <p className="py-1">Study smarter.</p>
            <motion.p 
              className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
              animate={{ 
                scale: [1, 1.05, 1],
                color: ["#8b5cf6", "#3b82f6", "#8b5cf6"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Crack your exams!
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial="hidden"
            animate={isVisible.buttons ? "visible" : "hidden"}
            variants={textAnimation}
          >
            {user ? (
              <motion.div
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={buttonAnimation}
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 shadow-lg hover:shadow-xl group">
                  <Link to="/dashboard/student" className="flex items-center px-8 py-6">
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
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonAnimation}
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl flex items-center gap-2 px-8 py-6"
                    onClick={() => setShowNeetModal(true)}
                  >
                    <Rocket size={20} />
                    <span className="font-medium">Start NEET Preparation</span>
                  </Button>
                </motion.div>
                
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonAnimation}
                >
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg" 
                    className="border-violet-200 hover:border-violet-300 hover:bg-violet-50 shadow-md hover:shadow-lg transition-all dark:border-violet-800 dark:hover:border-violet-700 dark:hover:bg-violet-900/50 px-8 py-6"
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
                </motion.div>
              </>
            )}
          </motion.div>
          
          {/* Exam Names Badge with animation */}
          <motion.div
            initial="hidden"
            animate={isVisible.examsBadge ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
            className="mt-12 mb-6 w-full"
          >
            <ExamNamesBadge />
          </motion.div>
        </div>
      </div>
      
      {/* NEET Signup Modal */}
      <NeetSignupModal 
        isOpen={showNeetModal} 
        onClose={() => setShowNeetModal(false)}
        onContinue={handleStartNeetPrep}
      />
    </section>
  );
};

export default HeroSection;


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
  const [currentTagline, setCurrentTagline] = useState(0);
  const [showNeetModal, setShowNeetModal] = useState(false);
  
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
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl">
            {/* Hindi text line with enhanced gradient */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-hindi"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="block py-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 animate-gradient-x">
                अब तैयारी करो अपने तरीके से, सिर्फ PREPZR के साथ!
              </span>
            </motion.h1>
            
            {/* English text line with different animation timing */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-white"
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
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl flex items-center gap-2 px-6 py-6"
                  onClick={() => setShowNeetModal(true)}
                >
                  <Rocket size={20} />
                  <span className="font-medium">Start NEET Preparation</span>
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


import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import ExamNamesBadge from '../home/hero/ExamNamesBadge';
import { ArrowRight, SparklesIcon, BookOpen, Rocket, Brain, Award, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStoryStep, setCurrentStoryStep] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const isMobile = useIsMobile();
  const storyTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // The student's journey story
  const storySteps = [
    {
      heading: "From overwhelmed to confident.",
      subtext: "Every exam journey begins with confusion and doubt.",
      emotion: "overwhelmed",
      color: "from-red-500 to-orange-400"
    },
    {
      heading: "Discover your unique learning path.",
      subtext: "PREPZR identifies your strengths and learning style.",
      emotion: "curious",
      color: "from-orange-400 to-amber-300"
    },
    {
      heading: "Learn smarter, not harder.",
      subtext: "Personalized study plans adapt to how you think.",
      emotion: "focused",
      color: "from-amber-300 to-green-400"
    },
    {
      heading: "Overcome your weakest areas.",
      subtext: "AI-powered insights target what you need most.",
      emotion: "determined",
      color: "from-green-400 to-blue-500"
    },
    {
      heading: "Feel the confidence growing.",
      subtext: "Watch your exam readiness score climb day by day.",
      emotion: "motivated",
      color: "from-blue-500 to-purple-500"
    },
    {
      heading: "Success is no longer just a dream.",
      subtext: "It's your new reality with PREPZR.",
      emotion: "triumphant",
      color: "from-purple-500 to-violet-600"
    }
  ];

  // Progress through the story automatically
  useEffect(() => {
    if (storyTimerRef.current) {
      clearInterval(storyTimerRef.current);
    }

    // Only auto-advance if not on the last step
    if (currentStoryStep < storySteps.length - 1) {
      storyTimerRef.current = setInterval(() => {
        setCurrentStoryStep(prev => {
          if (prev < storySteps.length - 1) {
            return prev + 1;
          }
          clearInterval(storyTimerRef.current!);
          setAnimationComplete(true);
          return prev;
        });
      }, 4000);
    } else {
      setAnimationComplete(true);
    }

    return () => {
      if (storyTimerRef.current) {
        clearInterval(storyTimerRef.current);
      }
    };
  }, [currentStoryStep]);

  // Handler for exam readiness analyzer
  const handleExamReadiness = () => {
    // Dispatch an event to open the exam analyzer
    const event = new Event('open-exam-analyzer');
    window.dispatchEvent(event);
    
    toast({
      title: "Exam Readiness Analysis",
      description: "Let's discover where you stand and create your personalized path to success.",
    });
  };

  // Emotion-based character rendering
  const renderCharacter = (emotion: string) => {
    const characterVariants = {
      initial: { opacity: 0, scale: 0.8 },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.5 }
      },
      exit: { 
        opacity: 0, 
        scale: 0.8,
        transition: { duration: 0.3 } 
      }
    };

    const characterEmotions: Record<string, React.ReactNode> = {
      overwhelmed: (
        <div className="relative h-40 w-40 md:h-60 md:w-60">
          <motion.div 
            className="absolute inset-0 bg-red-100 dark:bg-red-900/20 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl">😰</div>
          </motion.div>
          <motion.div 
            className="absolute -top-4 -right-4 text-xl md:text-2xl"
            animate={{ 
              y: [0, -10, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ❓
          </motion.div>
          <motion.div 
            className="absolute -bottom-4 -left-4 text-xl md:text-2xl"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          >
            ❓
          </motion.div>
        </div>
      ),
      curious: (
        <div className="relative h-40 w-40 md:h-60 md:w-60">
          <motion.div 
            className="absolute inset-0 bg-amber-100 dark:bg-amber-900/20 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl">🤔</div>
          </motion.div>
          <motion.div 
            className="absolute -top-4 right-0 text-xl md:text-2xl"
            animate={{ 
              rotate: [0, 15, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            💡
          </motion.div>
        </div>
      ),
      focused: (
        <div className="relative h-40 w-40 md:h-60 md:w-60">
          <motion.div 
            className="absolute inset-0 bg-green-100 dark:bg-green-900/20 rounded-full"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl">🧠</div>
          </motion.div>
          <motion.div 
            className="absolute top-0 right-0 text-xl md:text-2xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ✨
          </motion.div>
        </div>
      ),
      determined: (
        <div className="relative h-40 w-40 md:h-60 md:w-60">
          <motion.div 
            className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl">💪</div>
          </motion.div>
          <motion.div 
            className="absolute top-2 right-2 text-xl md:text-2xl"
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🔥
          </motion.div>
        </div>
      ),
      motivated: (
        <div className="relative h-40 w-40 md:h-60 md:w-60">
          <motion.div 
            className="absolute inset-0 bg-purple-100 dark:bg-purple-900/20 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          />
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl">😃</div>
          </motion.div>
          <motion.div 
            className="absolute -top-2 -right-2 text-2xl md:text-3xl"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 20, 0]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ⭐
          </motion.div>
          <motion.div 
            className="absolute -bottom-2 -left-2 text-2xl md:text-3xl"
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, -20, 0]
            }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          >
            ⭐
          </motion.div>
        </div>
      ),
      triumphant: (
        <div className="relative h-40 w-40 md:h-60 md:w-60">
          <motion.div 
            className="absolute inset-0 bg-violet-100 dark:bg-violet-900/20 rounded-full"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl">🎓</div>
          </motion.div>
          <motion.div 
            className="absolute -top-4 -left-4 text-2xl md:text-3xl"
            animate={{ 
              y: [0, -8, 0],
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🏆
          </motion.div>
          <motion.div 
            className="absolute -bottom-4 -right-4 text-2xl md:text-3xl"
            animate={{ 
              y: [0, 8, 0],
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          >
            🎯
          </motion.div>
        </div>
      ),
    };

    return (
      <motion.div
        key={emotion}
        variants={characterVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="character-container"
      >
        {characterEmotions[emotion]}
      </motion.div>
    );
  };

  return (
    <section className="relative bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-slate-900 py-16 md:py-20 lg:py-24 overflow-hidden min-h-[90vh] flex items-center">
      {/* Story progress indicator */}
      <div className="absolute top-4 left-0 right-0 flex justify-center">
        <div className="flex space-x-2">
          {storySteps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full cursor-pointer ${index === currentStoryStep ? 'w-8 bg-violet-500' : 'w-2 bg-gray-300 dark:bg-gray-700'}`}
              onClick={() => setCurrentStoryStep(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
      </div>
      
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic gradient background that changes with story steps */}
        <motion.div 
          className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${storySteps[currentStoryStep].color} opacity-5 dark:opacity-10`}
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute -top-10 -right-10 w-72 h-72 bg-purple-300/30 dark:bg-purple-700/20 rounded-full blur-3xl"
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
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Story visualization part */}
          <motion.div 
            className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <motion.div
                key={currentStoryStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="story-visual relative"
              >
                {/* Character */}
                {renderCharacter(storySteps[currentStoryStep].emotion)}
                
                {/* Path visualization */}
                <svg className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
                  <motion.path
                    d="M0,100 Q50,-50 100,100 Q150,250 200,100 Q250,-50 300,100 Q350,250 400,100"
                    fill="none"
                    stroke="url(#gradientPath)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: currentStoryStep / (storySteps.length - 1),
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="gradientPath" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Final celebration effect */}
                {currentStoryStep === storySteps.length - 1 && (
                  <>
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      {/* Celebration confetti effect */}
                      {Array.from({ length: 30 }).map((_, i) => {
                        const randomX = Math.random() * 100 - 50;
                        const randomY = Math.random() * 100 - 50;
                        const scale = 0.5 + Math.random() * 1;
                        const colors = ['#8b5cf6', '#3b82f6', '#ec4899', '#f97316', '#22c55e'];
                        const color = colors[Math.floor(Math.random() * colors.length)];
                        
                        return (
                          <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                              left: '50%',
                              top: '50%',
                              width: 10,
                              height: 10,
                              backgroundColor: color
                            }}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                            animate={{
                              x: randomX * 5,
                              y: randomY * 5,
                              scale,
                              opacity: [0, 1, 0],
                              rotate: Math.random() * 360
                            }}
                            transition={{
                              duration: 2.5,
                              delay: Math.random() * 0.2,
                              repeat: Infinity,
                              repeatType: 'loop',
                              repeatDelay: 1
                            }}
                          />
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Text content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="space-y-6 md:max-w-lg mx-auto md:mx-0">
              {/* Dynamic heading based on current story step */}
              <motion.h1
                key={`heading-${currentStoryStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
              >
                {storySteps[currentStoryStep].heading}
              </motion.h1>
              
              {/* Dynamic subtext based on current story step */}
              <motion.p
                key={`subtext-${currentStoryStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300"
              >
                {storySteps[currentStoryStep].subtext}
              </motion.p>
              
              {/* Final story message - becomes visible after full story */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: animationComplete ? 1 : 0, 
                  height: animationComplete ? 'auto' : 0
                }}
                transition={{ duration: 0.7 }}
                className="pt-4"
              >
                <p className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500">
                  Your exam success story starts today with PREPZR.
                </p>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  Join thousands of students who transformed their preparation journey from stress to success.
                </p>
              </motion.div>
              
              {/* CTA buttons - show full set when animation is complete */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <Button 
                  size={isMobile ? "default" : "lg"}
                  onClick={handleExamReadiness}
                  className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
                >
                  <motion.span
                    className="absolute inset-0 bg-white"
                    initial={{ x: '100%', opacity: 0.3 }}
                    animate={{ x: '-100%', opacity: 0 }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5, 
                      ease: "linear",
                      repeatDelay: 1
                    }}
                  />
                  <SparklesIcon size={isMobile ? 16 : 20} className="mr-2" />
                  <span className="relative z-10 font-medium">Begin Your Success Journey</span>
                </Button>
                
                {user ? (
                  <Button 
                    asChild
                    variant="outline"
                    size={isMobile ? "default" : "lg"}
                    className="border-violet-200 hover:border-violet-300 hover:bg-violet-50 shadow-md hover:shadow-lg dark:border-violet-800 dark:hover:border-violet-700 dark:hover:bg-violet-900/50"
                  >
                    <Link to="/dashboard/student">
                      <Rocket size={isMobile ? 16 : 20} className="mr-2" />
                      <span>Go to Dashboard</span>
                    </Link>
                  </Button>
                ) : (
                  <Button 
                    asChild
                    variant="outline"
                    size={isMobile ? "default" : "lg"}
                    className="border-violet-200 hover:border-violet-300 hover:bg-violet-50 shadow-md hover:shadow-lg dark:border-violet-800 dark:hover:border-violet-700 dark:hover:bg-violet-900/50"
                  >
                    <Link to="/signup">
                      <BookOpen size={isMobile ? 16 : 20} className="mr-2" />
                      <span>7-Day Free Trial</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="ml-1"
                      >
                        <ArrowRight size={isMobile ? 16 : 18} />
                      </motion.div>
                    </Link>
                  </Button>
                )}
              </motion.div>
              
              {/* Student testimonial - fades in near the end */}
              <motion.div 
                className="mt-8 bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentStoryStep >= storySteps.length - 2 ? 1 : 0,
                }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">1,453 student reviews</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic text-sm">
                  "PREPZR transformed my JEE preparation completely. I went from scoring 60% in mock tests to clearing JEE Mains with a top 500 rank. The personalized study plans and AI guidance made all the difference!"
                </p>
                <div className="mt-2 text-sm font-medium">
                  - Priya S., IIT Delhi, Computer Science
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Exam names badge - shows at the end */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: currentStoryStep >= storySteps.length - 2 ? 1 : 0,
            y: currentStoryStep >= storySteps.length - 2 ? 0 : 20
          }}
          transition={{ duration: 0.8 }}
          className="mt-12"
        >
          <ExamNamesBadge />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

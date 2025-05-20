
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/components/layouts/MainLayout';
import { ArrowRight, Lightbulb, Target, Calendar, Heart, BookOpen, GraduationCap, Trophy } from 'lucide-react';
import ImmersiveStoryCanvas from '@/components/home/ImmersiveStoryCanvas';
import FloatingVoiceAssistant from '@/components/voice/FloatingVoiceAssistant';
import HomePageVoiceAssistant from '@/components/voice/HomePageVoiceAssistant';

const Home = () => {
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: storyContainerRef,
    offset: ["start start", "end end"]
  });
  
  // Animation progress values for different elements
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const opacityStages = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  // Student journey stages
  const journeyStages = [
    {
      title: "The Challenge",
      description: "Feeling overwhelmed with vast syllabus, inconsistent study schedules, and lack of personalized guidance?",
      icon: Target,
      color: "from-red-500 to-pink-500"
    },
    {
      title: "The Struggle",
      description: "Balancing multiple subjects, tracking progress, and identifying weak areas becomes increasingly difficult.",
      icon: Calendar,
      color: "from-orange-500 to-amber-500"
    },
    {
      title: "The Turning Point",
      description: "Discovering PREPZR - an AI companion that understands not just your academic needs but your mindset.",
      icon: Lightbulb,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "The Transformation",
      description: "With personalized study plans, adaptive quizzes, and mood-based learning, preparation becomes more efficient.",
      icon: GraduationCap,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "The Success",
      description: "Achieving confidence, clarity, and ultimately success in your examination journey.",
      icon: Trophy,
      color: "from-purple-500 to-indigo-500"
    }
  ];

  useEffect(() => {
    // Auto-scroll functionality to showcase the journey
    const handleScroll = () => {
      if (!storyContainerRef.current) return;
      
      const scrollPosition = window.scrollY;
      const containerTop = storyContainerRef.current.offsetTop;
      const containerHeight = storyContainerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate which stage is currently in view
      if (scrollPosition >= containerTop && scrollPosition < containerTop + containerHeight) {
        const relativePosition = scrollPosition - containerTop;
        const stageIndex = Math.floor((relativePosition / containerHeight) * journeyStages.length);
        setCurrentStage(Math.min(stageIndex, journeyStages.length - 1));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [journeyStages.length]);
  
  const handleOpenVoiceAssistant = () => {
    setShowVoiceAssistant(true);
  };
  
  const handleCloseVoiceAssistant = () => {
    setShowVoiceAssistant(false);
  };
  
  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  return (
    <MainLayout>
      {/* Hidden but functional voice assistant */}
      <HomePageVoiceAssistant language="en-IN" />
      
      {/* Hero Section with 3D Animation */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: opacityHero, scale }}
      >
        <div className="absolute inset-0 -z-10">
          <ImmersiveStoryCanvas />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600">
                Your Exam Journey.
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-400 mt-2">
                Our AI Guidance.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              PREPZR transforms your exam preparation by understanding your unique learning journey 
              and adapting to your personal study patterns.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8"
                onClick={() => navigate('/signup')}
              >
                Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-indigo-300 dark:border-indigo-600 px-8"
                onClick={() => {
                  if (storyContainerRef.current) {
                    storyContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Explore How It Works
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-12 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <div className="animate-bounce bg-white dark:bg-gray-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 shadow-lg rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Student Journey Narrative */}
      <motion.section 
        ref={storyContainerRef}
        className="min-h-[400vh] relative" 
        style={{ opacity: opacityStages }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="container mx-auto px-4 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* 3D Visual Representation */}
              <div className="relative h-[500px] rounded-xl overflow-hidden border border-indigo-100 dark:border-indigo-900/30 shadow-xl">
                <div className="absolute inset-0">
                  <ImmersiveStoryCanvas stage={currentStage} />
                </div>
              </div>
              
              {/* Journey Stage Description */}
              <div>
                {journeyStages.map((stage, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: currentStage === index ? 1 : 0,
                      y: currentStage === index ? 0 : 20
                    }}
                    transition={{ duration: 0.5 }}
                    className={`absolute ${currentStage === index ? 'block' : 'hidden'}`}
                  >
                    <div className={`inline-flex items-center justify-center p-3 mb-4 rounded-full bg-gradient-to-r ${stage.color}`}>
                      <stage.icon className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">{stage.title}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{stage.description}</p>
                    
                    {index === journeyStages.length - 1 && (
                      <div className="flex flex-wrap gap-4">
                        <Button 
                          size="lg" 
                          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8"
                          onClick={() => navigate('/signup')}
                        >
                          Begin Your Success Story
                        </Button>
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="border-indigo-300 dark:border-indigo-600 px-8"
                          onClick={() => navigate('/features')}
                        >
                          Explore Features
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {/* Journey Progress Indicator */}
                <div className="absolute bottom-0 left-0 right-0 mt-12">
                  <div className="flex gap-2 justify-center">
                    {journeyStages.map((_, index) => (
                      <div 
                        key={index}
                        className={`h-2 w-12 rounded-full transition-all duration-300 ${
                          currentStage >= index 
                            ? 'bg-indigo-500' 
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Solution Features */}
      <section className="py-20 bg-gradient-to-b from-white to-indigo-50/30 dark:from-gray-900 dark:to-indigo-950/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How PREPZR Transforms Your Preparation</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our AI-powered platform adapts to your unique learning style, mood, and progress to provide 
              a truly personalized exam preparation experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Personalized Study Plans",
                description: "AI-generated study schedules tailored to your learning pace, exam timeline, and current knowledge level.",
                icon: Calendar,
                color: "bg-blue-500"
              },
              {
                title: "Mood-Based Learning",
                description: "Content and practice sessions that adapt to your current mindset, improving retention and focus.",
                icon: Heart,
                color: "bg-pink-500"
              },
              {
                title: "Interactive Concept Cards",
                description: "Visual, interactive explanations of complex topics, making difficult concepts easier to understand.",
                icon: BookOpen,
                color: "bg-purple-500"
              },
              {
                title: "Adaptive Quizzes",
                description: "Practice questions that adjust in difficulty based on your performance to maximize learning efficiency.",
                icon: Target,
                color: "bg-green-500"
              },
              {
                title: "Progress Analytics",
                description: "Comprehensive insights into your strengths, weaknesses, and improvement areas to optimize your study time.",
                icon: Lightbulb,
                color: "bg-amber-500"
              },
              {
                title: "24/7 AI Tutor Support",
                description: "Always-available AI tutor to answer your questions, explain concepts, and guide your learning journey.",
                icon: GraduationCap,
                color: "bg-indigo-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full border border-indigo-100 dark:border-indigo-900/30 overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 flex-grow">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/10"
                  style={{
                    width: Math.random() * 100 + 50,
                    height: Math.random() * 100 + 50,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: Math.random() * 10 + 10,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10 text-center md:text-left md:flex md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Transform Your Exam Journey?</h2>
                <p className="text-indigo-100 text-lg max-w-xl">
                  Join thousands of students who have discovered the power of AI-driven personalized learning.
                  Your success story begins now.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start flex-shrink-0">
                <Button 
                  size="lg" 
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-8"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10 px-8"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Floating Voice Assistant button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl flex items-center justify-center"
          onClick={handleOpenVoiceAssistant}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" x2="12" y1="19" y2="22"></line>
          </svg>
          <span className="ml-2 font-medium">Voice Assistant</span>
        </Button>
      </div>
      
      {/* Enhanced Floating Voice Assistant with settings panel */}
      {showVoiceAssistant && (
        <FloatingVoiceAssistant 
          isOpen={showVoiceAssistant} 
          onClose={handleCloseVoiceAssistant}
          onNavigationCommand={handleNavigationCommand}
          language="en-IN"
        />
      )}
    </MainLayout>
  );
};

export default Home;

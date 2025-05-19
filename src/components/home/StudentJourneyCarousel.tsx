
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext, 
  CarouselDots 
} from '@/components/ui/carousel';
import { 
  Brain, 
  GraduationCap, 
  Clock, 
  Trophy, 
  Star, 
  Smile, 
  Sparkles, 
  Zap, 
  BookOpen, 
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const StudentJourneyCarousel = () => {
  const navigate = useNavigate();

  const journeySteps = [
    {
      title: "Step 1: Join PREPZR",
      description: "Sign up and tell us about your exam goals. Our AI analyzes your needs.",
      icon: <Sparkles className="h-10 w-10 text-violet-400" />,
      benefits: ["Free assessment", "AI profile creation", "Personalized plan"],
      color: "from-violet-400/20 to-purple-400/20",
      action: "Start Now",
      path: "/signup"
    },
    {
      title: "Step 2: Personalized Plan",
      description: "Receive a custom study plan that adapts to your strengths and learning style.",
      icon: <Brain className="h-10 w-10 text-blue-400" />,
      benefits: ["Adaptive scheduling", "Learning style match", "Time optimization"],
      color: "from-blue-400/20 to-cyan-400/20",
      action: "See Sample Plans",
      path: "/features"
    },
    {
      title: "Step 3: Master Concepts",
      description: "Study with AI-generated resources that adapt to your progress.",
      icon: <BookOpen className="h-10 w-10 text-green-500" />,
      benefits: ["Interactive lessons", "Visual learning aids", "Real-time feedback"],
      color: "from-green-400/20 to-emerald-400/20",
      action: "Explore Content",
      path: "/features"
    },
    {
      title: "Step 4: Practice & Improve",
      description: "Challenge yourself with practice exams and targeted exercises.",
      icon: <Zap className="h-10 w-10 text-amber-500" />,
      benefits: ["Adaptive difficulty", "Personalized feedback", "Growth tracking"],
      color: "from-amber-400/20 to-orange-400/20",
      action: "Try Demo Test",
      path: "/signup?demo=true" 
    },
    {
      title: "Step 5: Ace Your Exams",
      description: "Go into your exams with confidence, preparation, and peace of mind.",
      icon: <Trophy className="h-10 w-10 text-rose-500" />,
      benefits: ["Stress reduction", "Performance analytics", "Success strategies"],
      color: "from-rose-400/20 to-red-400/20",
      action: "Success Stories",
      path: "/testimonials"
    }
  ];

  return (
    <div className="relative py-12 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-purple-50/5 dark:to-purple-950/5 -z-10" />
      
      {/* Floating 3D elements in background */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-violet-500/10 to-blue-500/10 blur-xl"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 30 - 15],
            y: [0, Math.random() * 30 - 15],
            opacity: [0.3, 0.1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 5 + Math.random() * 5,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
          style={{ zIndex: -1 }}
        />
      ))}
      
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Your Exam Success Journey
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            PREPZR guides you through every step of the way, from your first day to exam success
          </motion.p>
        </div>

        <Carousel
          opts={{ loop: true, align: "center" }}
          className="w-full"
          interactive3d={true}
        >
          <CarouselContent>
            {journeySteps.map((step, index) => (
              <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3 h-[450px]">
                <motion.div 
                  className="h-full overflow-hidden bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-md relative group"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.2)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Gradient top accent */}
                  <div className={`h-2 w-full bg-gradient-to-r ${step.color}`} />
                  
                  {/* Number badge */}
                  <motion.div 
                    className="absolute -right-3 -top-3 w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ 
                      y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                      scale: { type: "spring", stiffness: 300, damping: 10 }
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {index + 1}
                  </motion.div>
                  
                  <div className="p-6 flex flex-col h-full">
                    <div className="mb-6">
                      {/* Icon with 3D effect */}
                      <motion.div 
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/30 dark:to-blue-900/30 flex items-center justify-center mb-4 mx-auto"
                        whileHover={{ 
                          rotateY: 180,
                          boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)"
                        }}
                        transition={{ duration: 0.6 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {step.icon}
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                      {step.description}
                    </p>
                    
                    <div className="flex-grow">
                      <div className="space-y-3">
                        {step.benefits.map((benefit, i) => (
                          <motion.div 
                            key={i}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                            viewport={{ once: true }}
                          >
                            <Star className="h-4 w-4 text-amber-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white group"
                        onClick={() => navigate(step.path)}
                      >
                        {step.action}
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="ml-2"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 lg:-left-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800" />
          <CarouselNext className="right-2 lg:-right-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800" />
          <CarouselDots />
        </Carousel>
      </div>
    </div>
  );
};

export default StudentJourneyCarousel;

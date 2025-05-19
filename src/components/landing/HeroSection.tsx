
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight, BookOpen, Award, Brain, Clock } from 'lucide-react';

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  category?: string;
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  const heroData: HeroData[] = [
    {
      title: "Master any exam with emotional intelligence",
      subtitle: "AI-powered exam preparation that adapts to your learning style",
      description: "Our platform analyzes your emotional state and learning patterns to create a personalized study experience that evolves with you.",
      category: "foundation"
    },
    {
      title: "Personalized learning journeys",
      subtitle: "Tailored to your unique needs",
      description: "No two learners are the same. Our AI creates study plans specifically designed for your strengths, weaknesses, and learning preferences.",
      category: "approach"
    },
    {
      title: "Study smarter",
      subtitle: "Optimize your study time and effort",
      description: "Focus on what matters most with our adaptive learning system that identifies knowledge gaps and adjusts your study plan in real-time.",
      category: "approach"
    },
    {
      title: "Conquer exam anxiety",
      subtitle: "Build confidence through understanding",
      description: "Our emotionally intelligent system helps you overcome stress and anxiety with confidence-building exercises and strategic preparation.",
      category: "benefit"
    },
    {
      title: "Excel in your career path",
      subtitle: "From exam success to professional achievement",
      description: "Develop the deep understanding and critical thinking skills that translate to success in your future career, not just passing exams.",
      category: "outcome"
    },
    {
      title: "We understand your mindset, not just the exam",
      subtitle: "Prep-zer is emotionally aware, hyper personalized, adaptive exam prep platform",
      description: "Our AI analyzes your emotional state, learning patterns, and cognitive preferences to create a truly personalized learning experience.",
      category: "foundation"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!animating) {
        setCurrentSlide((prev) => (prev + 1) % heroData.length);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [heroData.length, animating]);

  const slideVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      } 
    },
    exit: { 
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  const handleSlideChange = (index: number) => {
    setAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setAnimating(false), 800);
  };

  const getStatusColorClass = (index: number) => {
    if (currentSlide === index) return 'bg-purple-600';
    const category = heroData[index].category;
    
    switch(category) {
      case 'foundation': return 'bg-blue-400 dark:bg-blue-600';
      case 'approach': return 'bg-green-400 dark:bg-green-600';
      case 'benefit': return 'bg-amber-400 dark:bg-amber-600';
      case 'outcome': return 'bg-pink-400 dark:bg-pink-600';
      default: return 'bg-gray-300 dark:bg-gray-600';
    }
  };

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-background to-background flex items-center min-h-[90vh]">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="col-span-1 lg:col-span-7"
          >
            <div className="relative h-[280px] md:h-[300px]">
              <AnimatePresence mode="wait">
                {heroData.map((data, index) => (
                  currentSlide === index && (
                    <motion.div 
                      key={index}
                      className="absolute w-full"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={slideVariants}
                    >
                      <div className="mb-3">
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full text-white ${
                          data.category === 'foundation' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                          data.category === 'approach' ? 'bg-gradient-to-r from-green-500 to-teal-600' :
                          data.category === 'benefit' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                          'bg-gradient-to-r from-pink-500 to-rose-600'
                        }`}>
                          {data.category?.charAt(0).toUpperCase() + data.category?.slice(1)}
                        </span>
                      </div>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 leading-tight">
                        {data.title}
                      </h1>
                      <h2 className="text-xl md:text-2xl mb-4 text-gray-700 dark:text-gray-300 font-medium">
                        {data.subtitle}
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed">
                        {data.description}
                      </p>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl">
                <Link to="/signup" className="flex items-center px-6">
                  Get Started Free
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Link to="/exam-readiness" className="flex items-center px-6">
                  Take Exam Readiness Quiz
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="flex gap-2 mt-12 items-center">
              {heroData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'w-10 ' : 'w-2.5 opacity-70'
                  } ${getStatusColorClass(index)}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="col-span-1 lg:col-span-5 relative"
          >
            <div className="relative">
              {/* Milestones section integrated into hero */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm relative z-10">
                <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                  Your Success Milestones
                </h3>
                
                <div className="space-y-3.5">
                  <motion.div 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-indigo-100 dark:bg-indigo-800/30 p-2.5 rounded-full">
                      <Award className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Confidence Building</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Build self-assurance through personalized learning</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-green-100 dark:bg-green-800/30 p-2.5 rounded-full">
                      <Brain className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Exam Success</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Achieve higher scores with adaptive strategies</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-blue-100 dark:bg-blue-800/30 p-2.5 rounded-full">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Time Saving</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Optimize your study time with AI-powered focus</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-amber-100 dark:bg-amber-800/30 p-2.5 rounded-full">
                      <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Stress-Free Preparation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Reduce exam anxiety with structured support</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-pink-100 dark:bg-pink-800/30 p-2.5 rounded-full">
                      <Award className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Happy Learning</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Enjoy engaging, interactive content tailored to you</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Dashboard preview in the background */}
            <div className="absolute -bottom-10 -right-10 w-full h-full -z-10 opacity-60 dark:opacity-40">
              <img 
                src="/hero-dashboard.png" 
                alt="AI-powered exam preparation dashboard" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 4s;
        }
        .animation-delay-4000 {
          animation-delay: 8s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroData: HeroData[] = [
    {
      title: "Master any exam with emotional intelligence",
      subtitle: "AI-powered exam preparation that adapts to your learning style",
      description: "Our platform analyzes your emotional state and learning patterns to create a personalized study experience that evolves with you."
    },
    {
      title: "Personalized learning journeys",
      subtitle: "Tailored to your unique needs",
      description: "No two learners are the same. Our AI creates study plans specifically designed for your strengths, weaknesses, and learning preferences."
    },
    {
      title: "Study smarter",
      subtitle: "Optimize your study time and effort",
      description: "Focus on what matters most with our adaptive learning system that identifies knowledge gaps and adjusts your study plan in real-time."
    },
    {
      title: "Conquer exam anxiety",
      subtitle: "Build confidence through understanding",
      description: "Our emotionally intelligent system helps you overcome stress and anxiety with confidence-building exercises and strategic preparation."
    },
    {
      title: "Excel in your career path",
      subtitle: "From exam success to professional achievement",
      description: "Develop the deep understanding and critical thinking skills that translate to success in your future career, not just passing exams."
    },
    {
      title: "We understand your mindset, not just the exam",
      subtitle: "Prep-zer is emotionally aware, hyper personalized, adaptive exam prep platform",
      description: "Our AI analyzes your emotional state, learning patterns, and cognitive preferences to create a truly personalized learning experience."
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroData.length]);

  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      } 
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-background to-background flex items-center min-h-[80vh]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-1"
          >
            <div className="relative h-[220px] md:h-[240px]">
              {heroData.map((data, index) => (
                <motion.div 
                  key={index}
                  className="absolute w-full"
                  initial="hidden"
                  animate={currentSlide === index ? "visible" : "hidden"}
                  exit="exit"
                  variants={slideVariants}
                  style={{ display: currentSlide === index ? 'block' : 'none' }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                    {data.title}
                  </h1>
                  <h2 className="text-xl md:text-2xl mb-4 text-gray-700 dark:text-gray-300">
                    {data.subtitle}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
                    {data.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Link to="/signup">
                  Get Started Free
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/exam-readiness">
                  Take Exam Readiness Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="flex gap-3 mt-8">
              {heroData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'w-8 bg-purple-600' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="col-span-1 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/hero-dashboard.png" 
                    alt="AI-powered exam preparation dashboard" 
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="currentColor"
            fillOpacity="0.05"
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,218.7C672,224,768,224,864,213.3C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

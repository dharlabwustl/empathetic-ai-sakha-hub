
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroContent from './hero/HeroContent';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Image, Play } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  // Handler for exam readiness analyzer
  const handleExamReadinessClick = () => {
    // Dispatch event to open the exam readiness analyzer
    window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
  };

  // Student testimonials for carousel
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      image: "/images/students/student-1.jpg",
      title: "NEET Aspirant",
      quote: "PREPZR understands me! The way concepts are explained feels personalized to my learning style.",
      score: "Improved score by 35%",
      subject: "Biology",
    },
    {
      id: 2,
      name: "Arjun Patel",
      image: "/images/students/student-2.jpg",
      title: "JEE Advanced Qualifier",
      quote: "The AI detected my weak areas in physics and created a personalized study plan that actually worked.",
      score: "AIR under 1000",
      subject: "Physics",
    },
    {
      id: 3,
      name: "Meera Krishnan",
      image: "/images/students/student-3.jpg",
      title: "UPSC Aspirant",
      quote: "The mindset coaching combined with concept mastery was exactly what I needed to build confidence.",
      score: "Cleared Prelims on first attempt",
      subject: "Current Affairs",
    },
    {
      id: 4,
      name: "Rahul Verma",
      image: "/images/students/student-4.jpg",
      title: "Medical Student",
      quote: "From struggling with chemistry to mastering it. The formula lab and interactive quizzes made all the difference.",
      score: "Scored 650+ in NEET",
      subject: "Chemistry",
    }
  ];

  useEffect(() => {
    // Auto-rotate slides every 5 seconds
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative overflow-hidden min-h-[90vh] py-16 md:py-24 flex items-center">
      {/* Enhanced 3D Background with depth effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/70 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/50" />
        
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{
            backgroundImage: "linear-gradient(#5c6bc0 1px, transparent 1px), linear-gradient(to right, #5c6bc0 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
      
        {/* Abstract floating 3D shapes */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-700/5 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            x: [0, 30, 0], 
            y: [0, -50, 0] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        
        <motion.div 
          className="absolute top-40 right-10 w-80 h-80 bg-purple-300/20 dark:bg-purple-700/10 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 0.8, 1], 
            x: [0, -20, 0], 
            y: [0, 20, 0] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 2
          }}
        />
      
        <motion.div 
          className="absolute bottom-10 left-1/3 w-96 h-96 bg-green-300/20 dark:bg-green-600/10 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.1, 1], 
            x: [0, 20, 0], 
            y: [0, 30, 0] 
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 4
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left Content: Title, description and buttons */}
          <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
          
          {/* Right Content: Enhanced Testimonial Carousel */}
          <div className="w-full lg:w-1/2 mt-10 lg:mt-0 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-4 relative"
            >
              <Carousel className="w-full max-w-xl mx-auto">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={testimonial.id}>
                      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/80 dark:from-gray-900 dark:to-indigo-950/50">
                        <CardContent className="p-0">
                          <div className="p-6 md:p-8 space-y-4">
                            {/* Student image and info */}
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                                {testimonial.image ? (
                                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                                ) : (
                                  testimonial.name.charAt(0)
                                )}
                              </div>
                              <div>
                                <h3 className="font-bold text-lg">{testimonial.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                              </div>
                              <div className="ml-auto">
                                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                                  {testimonial.subject}
                                </Badge>
                              </div>
                            </div>
                            
                            {/* Quote */}
                            <div className="relative">
                              <div className="absolute -top-2 -left-2 text-indigo-300 dark:text-indigo-700 text-4xl opacity-30">"</div>
                              <p className="text-gray-700 dark:text-gray-200 pt-3 pl-4 italic relative z-10">
                                {testimonial.quote}
                              </p>
                              <div className="absolute -bottom-4 -right-2 text-indigo-300 dark:text-indigo-700 text-4xl opacity-30">"</div>
                            </div>
                            
                            {/* Results */}
                            <div className="pt-4 flex items-center gap-2">
                              <span className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </span>
                              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                                {testimonial.score}
                              </span>
                            </div>
                            
                            {/* Stars */}
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                              ))}
                            </div>
                          </div>
                          
                          {/* Decorative bottom gradient */}
                          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
                        activeSlide === index ? 'w-8 bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
              </Carousel>
              
              {/* Floating action indicators */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-3 rounded-full shadow-lg hidden md:flex items-center justify-center animate-bounce">
                <Play className="h-5 w-5 fill-white" />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Enhanced 3D scroll indicator */}
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">Scroll to explore</span>
          <div className="w-5 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-1 bg-gray-500 dark:bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "loop" 
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, BookOpen, Trophy, Star, Lightbulb, Heart, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const CallToAction = () => {
  const stats = [
    {
      icon: GraduationCap,
      number: "90%+",
      text: "Students reported improved exam scores"
    },
    {
      icon: Brain,
      number: "40%",
      text: "Less study time with better retention"
    },
    {
      icon: Trophy,
      number: "10,000+",
      text: "Students achieving their exam goals"
    }
  ];

  const studentJourneys = [
    {
      name: "Rahul K.",
      before: "Stressed and overwhelmed",
      after: "Confident top performer",
      quote: "PREPZR understood my anxiety and built a plan that worked for ME."
    },
    {
      name: "Aisha M.",
      before: "Struggling with focus",
      after: "Cracked JEE Advanced",
      quote: "The mood-adaptive study sessions transformed my preparation journey."
    },
    {
      name: "Vikram S.",
      before: "60% in mock tests",
      after: "95% in final exam",
      quote: "From hopeless to topper in just 3 months with PREPZR's personalized approach!"
    }
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7, 
        delay: custom * 0.1,
        ease: "easeOut"
      }
    })
  };

  // Enhanced voice interaction - Play informational audio when component mounts
  useEffect(() => {
    // This custom event will be picked up by the HomePageVoiceAssistant
    const triggerVoiceInfo = () => {
      const voiceEvent = new CustomEvent('voice-announce', {
        detail: {
          message: "PREPZR's emotionally intelligent platform adapts to your learning style and mood, helping you achieve your exam goals with personalized, AI-driven preparation techniques."
        }
      });
      document.dispatchEvent(voiceEvent);
    };

    // Add scroll listener to activate voice when this section is visible
    const handleScroll = () => {
      const element = document.getElementById('cta-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        // If element is in viewport and hasn't spoken yet
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Only trigger voice if user hasn't heard it yet in this session
          if (sessionStorage.getItem('cta-voice-played') !== 'true') {
            triggerVoiceInfo();
            // Mark as played to avoid repetition
            sessionStorage.setItem('cta-voice-played', 'true');
            window.removeEventListener('scroll', handleScroll);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="cta-section" className="py-20 relative overflow-hidden">
      {/* Background gradient with animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "100px 100px"]
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear"
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Stats row with enhanced animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              custom={index}
              variants={fadeInUpVariants}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center transform transition-all"
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <stat.icon className="w-7 h-7" />
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  animate={{ 
                    boxShadow: ['0 0 0 0px rgba(255,255,255,0.3)', '0 0 0 8px rgba(255,255,255,0)'],
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2,
                    delay: index * 0.3
                  }}
                />
              </div>
              <motion.h3 
                className="text-2xl font-bold mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3, delay: index * 0.5 }}
              >
                {stat.number}
              </motion.h3>
              <p className="text-white/90">{stat.text}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
            Transform Your Exam Preparation Journey with PREPZR
          </h2>
          
          <div className="flex justify-center mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotate: [0, i === 3 ? 10 : -10, 0],
                    scale: [1, i === 3 ? 1.2 : 1.1, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatDelay: 3,
                    duration: 0.5, 
                    delay: i * 0.1 
                  }}
                >
                  <Star key={i} className="h-6 w-6 text-yellow-300 fill-yellow-300" />
                </motion.div>
              ))}
            </div>
          </div>
          
          <p className="text-white/90 text-lg mb-8 font-light">
            Join thousands of students who transformed their exam preparation from 
            <span className="line-through mx-2 opacity-80">stress and anxiety</span> to 
            <motion.span 
              className="font-semibold ml-2 inline-block"
              animate={{ 
                color: ['#ffffff', '#a5f3fc', '#ffffff'],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              confidence and success
            </motion.span>.
          </p>
          
          {/* Student Journey Transformations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {studentJourneys.map((journey, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-lg p-4 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-violet-500" />
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 flex items-center justify-center text-white font-bold">
                    {journey.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-white">{journey.name}</h4>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3 text-sm">
                  <div className="bg-red-500/20 text-red-300 px-2 py-1 rounded">
                    Before: {journey.before}
                  </div>
                  <div className="text-white opacity-50 px-2">→</div>
                  <div className="bg-green-500/20 text-green-300 px-2 py-1 rounded">
                    After: {journey.after}
                  </div>
                </div>
                
                <p className="text-white/80 text-sm italic">"{journey.quote}"</p>
                
                <motion.div
                  className="absolute -bottom-6 -right-6 w-20 h-20 opacity-5"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className="bg-white hover:bg-gray-100 text-violet-700 text-lg group px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link to="/signup" className="flex items-center gap-2">
                  <span>Start Your Free Trial Today</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
                asChild
              >
                <Link to="/about">Learn How It Works</Link>
              </Button>
            </motion.div>
          </div>
          
          <motion.p 
            className="mt-6 text-white/80 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            No credit card required. 7-day free trial.
          </motion.p>
          
          {/* Animated Social Proof Badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 px-4">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full text-sm text-white/90 flex items-center"
              whileHover={{ scale: 1.05 }}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="mr-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              >
                ⭐
              </motion.span> 
              "Changed my approach to studying!" - Rahul K.
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full text-sm text-white/90 flex items-center"
              whileHover={{ scale: 1.05 }}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 1.5 }}
              >
                🎯
              </motion.span> 
              "Finally cracked JEE Advanced!" - Aisha M.
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full text-sm text-white/90 flex items-center"
              whileHover={{ scale: 1.05 }}
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="mr-2"
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ repeat: Infinity, duration: 2, delay: 2 }}
              >
                🚀
              </motion.span> 
              "From 60% to 95% in just 3 months!" - Vikram S.
            </motion.div>
          </div>
          
          {/* Emotionally Intelligent Badge */}
          <motion.div 
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 flex items-center">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full p-2 mr-3">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-white font-medium">World's First Emotionally Intelligent Exam Prep</h4>
                <p className="text-white/70 text-sm">PREPZR adapts to your mood, learning style, and surroundings</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;

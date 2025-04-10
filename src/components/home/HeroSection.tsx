
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; 
import { FileText, GraduationCap, Medal, Brain, BarChart3, Award, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onAnalyzeClick: () => void;
}

const HeroSection = ({ onAnalyzeClick }: HeroSectionProps) => {
  const navigate = useNavigate();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };
  
  // Floating animation for chat UI
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <section className="pt-24 pb-16 min-h-screen overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(at_top_right,_var(--tw-gradient-stops))] from-violet-50 via-white to-sky-50 dark:from-violet-950/30 dark:via-gray-900 dark:to-sky-950/30"></div>
      
      {/* Animated gradient blobs */}
      <motion.div 
        className="absolute top-40 -left-24 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content - Main heading and CTA */}
          <motion.div 
            className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants}>
              <Badge className="mb-4 bg-violet-100 text-violet-800 hover:bg-violet-200 transition-colors py-1.5 px-4 font-medium">
                AI-Powered Learning
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-700 via-purple-600 to-violet-500">
                Your Smart Study Partner
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              Sakha delivers personalized exam preparation with AI-powered study plans that adapt to your unique learning style and goals.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
              variants={itemVariants}
            >
              <Button
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-medium"
                size="lg"
              >
                Get Started Free
              </Button>
              <Button
                onClick={onAnalyzeClick}
                variant="outline"
                className="w-full sm:w-auto border-2 border-violet-300 dark:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300 px-8 py-6 rounded-lg text-lg font-medium"
                size="lg"
              >
                Test Your Readiness
              </Button>
            </motion.div>
            
            {/* Feature highlights */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
              variants={itemVariants}
            >
              {[
                { icon: <Brain size={20} className="text-violet-500" />, text: "Personalized AI" },
                { icon: <GraduationCap size={20} className="text-violet-500" />, text: "Exam-Specific" },
                { icon: <BarChart3 size={20} className="text-violet-500" />, text: "Progress Analytics" },
                { icon: <Award size={20} className="text-violet-500" />, text: "Proven Results" }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-white/70 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700 rounded-lg p-3 shadow-sm hover:shadow transition-all"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center">
                    <div className="mr-3">{feature.icon}</div>
                    <p className="text-sm font-medium">{feature.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right content - Chat UI animation */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div 
              className="w-full max-w-md mx-auto"
              animate={floatingAnimation}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <Brain size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold">Sakha AI</h3>
                      <p className="text-xs opacity-80">Your personal study companion</p>
                    </div>
                  </div>
                </div>
                
                {/* Chat content */}
                <div className="p-4 bg-gray-50 dark:bg-gray-850 h-72 overflow-y-auto space-y-4">
                  {/* AI message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-start">
                      <div className="bg-violet-100 dark:bg-violet-900/30 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Hi there! I'm your AI study partner. How can I help with your exam preparation today?</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* User message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">I'm preparing for IIT-JEE. Can you help me with a Physics concept?</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* AI message with question */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <div className="flex items-start">
                      <div className="bg-violet-100 dark:bg-violet-900/30 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Of course! Let's work on Physics. What concept are you struggling with?</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* User message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                  >
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">I'm having trouble understanding rotational dynamics.</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* AI explaining */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7 }}
                  >
                    <div className="flex items-start">
                      <div className="bg-violet-100 dark:bg-violet-900/30 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Let me break down rotational dynamics for you step by step...</p>
                        <motion.div 
                          className="w-24 bg-violet-200 h-1 mt-2"
                          initial={{ width: 0 }}
                          animate={{ width: 96 }}
                          transition={{ delay: 2, duration: 1.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Input area */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Type your question..."
                      className="flex-1 border border-gray-200 dark:border-gray-700 rounded-l-lg px-3 py-2 outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-700 dark:text-white text-sm" 
                      disabled
                    />
                    <button className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-2 rounded-r-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Animated particle effects */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-violet-400"
                    initial={{ 
                      x: Math.random() * 200 - 100, 
                      y: Math.random() * 200 - 100,
                      opacity: 0 
                    }}
                    animate={{ 
                      x: Math.random() * 400 - 200,
                      y: Math.random() * 400 - 200,
                      opacity: [0, 0.5, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 3 + Math.random() * 4,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div
              className="mt-8 flex justify-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              {['50,000+ Students', '95% Success Rate', '24/7 Support'].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{item}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Exam badges */}
        <motion.div
          className="mt-12 mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Specialized preparation for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: "UPSC", icon: <FileText size={12} /> },
              { name: "JEE", icon: <GraduationCap size={12} /> },
              { name: "NEET", icon: <Medal size={12} /> },
              { name: "GMAT", icon: <Brain size={12} /> },
              { name: "CAT", icon: <BarChart3 size={12} /> },
              { name: "GATE", icon: <Award size={12} /> }
            ].map((exam, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <Badge variant="outline" className="bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-violet-300 hover:bg-violet-50 dark:hover:border-violet-700 dark:hover:bg-violet-900/20 transition-all py-1.5">
                  <span className="flex items-center gap-1">
                    {exam.icon}
                    <span>{exam.name}</span>
                  </span>
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="flex flex-col items-center"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Scroll to explore</p>
            <div className="w-5 h-9 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
              <motion.div 
                className="w-1 h-1 bg-violet-500 dark:bg-violet-400 rounded-full mt-1"
                animate={{ 
                  y: [0, 15, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity, 
                  repeatType: "loop"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

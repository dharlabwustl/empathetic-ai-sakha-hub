
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; 
import { FileText, GraduationCap, Medal, Brain, BarChart3, Award, Trophy, X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onAnalyzeClick: () => void;
}

const HeroSection = ({ onAnalyzeClick }: HeroSectionProps) => {
  const navigate = useNavigate();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Pain point animations
  const painPoints = [
    { icon: <X size={18} />, text: "Peer Anxiety", color: "from-red-400 to-red-600" },
    { icon: <X size={18} />, text: "Doubts in Digital Space", color: "from-orange-400 to-orange-600" },
    { icon: <X size={18} />, text: "Stress & Fear of Failure", color: "from-amber-400 to-amber-600" },
    { icon: <X size={18} />, text: "Lack of Self Direction", color: "from-yellow-400 to-yellow-600" }
  ];

  const solutions = [
    { icon: <Check size={18} />, text: "Personalized Learning", color: "from-emerald-400 to-emerald-600" },
    { icon: <Check size={18} />, text: "24/7 AI Support", color: "from-green-400 to-green-600" },
    { icon: <Check size={18} />, text: "Structured Guidance", color: "from-teal-400 to-teal-600" },
    { icon: <Check size={18} />, text: "Confidence Building", color: "from-cyan-400 to-cyan-600" }
  ];

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
        <div className="flex flex-col lg:items-center max-w-3xl lg:max-w-5xl mx-auto text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-violet-100 text-violet-800 hover:bg-violet-200 transition-colors py-1.5 px-4 font-medium">
              AI-Powered Learning
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            India's First Personalized
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-violet-700 via-purple-600 to-violet-500">
              AI Study Partner for Exam Success
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Sakha delivers personalized exam preparation with AI-powered study plans that adapt to your unique learning style and goals.
          </motion.p>

          {/* CTA Buttons below subtitle */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
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

          {/* Pain points and solutions animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-16">
            <div className="space-y-4">
              <motion.h3 
                className="text-xl font-bold text-red-600 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Challenges Students Face
              </motion.h3>
              <div className="space-y-3">
                {painPoints.map((point, i) => (
                  <motion.div
                    key={`pain-${i}`}
                    className="flex items-center bg-white/80 dark:bg-gray-800/50 rounded-lg p-3 shadow-sm transform transition-all border border-gray-100 dark:border-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (i * 0.1) }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${point.color} text-white flex items-center justify-center mr-3 shadow-md`}>
                      {point.icon}
                    </div>
                    <span className="font-medium">{point.text}</span>
                    
                    <motion.div
                      className="absolute -z-10 inset-0 bg-gradient-to-r from-red-100/50 to-orange-100/50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg opacity-0"
                      initial={false}
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <motion.h3 
                className="text-xl font-bold text-green-600 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                How Sakha AI Helps
              </motion.h3>
              <div className="space-y-3">
                {solutions.map((solution, i) => (
                  <motion.div
                    key={`solution-${i}`}
                    className="flex items-center bg-white/80 dark:bg-gray-800/50 rounded-lg p-3 shadow-sm border border-gray-100 dark:border-gray-700"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${solution.color} text-white flex items-center justify-center mr-3 shadow-md`}>
                      {solution.icon}
                    </div>
                    <span className="font-medium">{solution.text}</span>
                    
                    <motion.div
                      className="absolute -z-10 inset-0 bg-gradient-to-r from-green-100/50 to-teal-100/50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg opacity-0"
                      initial={false}
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat UI section below the hero content */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.div 
              className="w-full max-w-2xl mx-auto"
              animate={floatingAnimation}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Chat header */}
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
                    transition={{ delay: 1.5 }}
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
                    transition={{ delay: 1.8 }}
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
                    transition={{ delay: 2.1 }}
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
                    transition={{ delay: 2.4 }}
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
                    transition={{ delay: 2.7 }}
                  >
                    <div className="flex items-start">
                      <div className="bg-violet-100 dark:bg-violet-900/30 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Let me break down rotational dynamics for you step by step...</p>
                        <motion.div 
                          className="w-24 bg-violet-200 h-1 mt-2"
                          initial={{ width: 0 }}
                          animate={{ width: 96 }}
                          transition={{ delay: 3, duration: 1.5 }}
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
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
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
          </motion.div>
        </div>

        {/* Exam Icons Section */}
        <motion.div 
          className="max-w-5xl mx-auto mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Trusted by students preparing for</h3>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {[
              { name: "IIT-JEE", icon: <GraduationCap className="text-violet-500" size={32} /> },
              { name: "NEET", icon: <FileText className="text-green-500" size={32} /> },
              { name: "UPSC", icon: <Award className="text-amber-500" size={32} /> },
              { name: "Bank PO", icon: <Medal className="text-blue-500" size={32} /> },
              { name: "CAT", icon: <BarChart3 className="text-indigo-500" size={32} /> },
              { name: "GATE", icon: <Trophy className="text-rose-500" size={32} /> },
            ].map((exam, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-3 px-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-2"
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {exam.icon}
                <span className="font-medium">{exam.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

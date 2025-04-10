
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  SendHorizonal, 
  Mic, 
  User, 
  BookOpen, 
  TrendingUp, 
  CheckCircle, 
  ChevronDown, 
  Brain, 
  Award, 
  GraduationCap,
  Medal,
  Trophy,
  Clock,
  FileText,
  BarChart3,
  Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  onAnalyzeClick: () => void;
}

const HeroSection = ({ onAnalyzeClick }: HeroSectionProps) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", content: "Hi, I'm Sakha – your personal AI exam companion. I'll help you ace your exams with personalized study plans and continuous support!" }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setChatMessages([...chatMessages, { type: "user", content: message }]);
    
    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        type: "bot", 
        content: "I'd be happy to help with your exam preparation! To create a personalized study plan for you, would you like to sign up so I can tailor my responses to your specific exam goals?" 
      }]);
    }, 1000);
    
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Define features for the hero section
  const features = [
    "Personalized study plans",
    "AI-powered tutoring",
    "Real-time progress tracking",
    "Mock tests with analysis",
    "Exam-specific strategies"
  ];

  // Competitive exam badges
  const examBadges = [
    { name: "UPSC", icon: <FileText size={12} /> },
    { name: "JEE", icon: <GraduationCap size={12} /> },
    { name: "NEET", icon: <Medal size={12} /> },
    { name: "GMAT", icon: <Brain size={12} /> },
    { name: "CAT", icon: <BarChart3 size={12} /> },
    { name: "GATE", icon: <Award size={12} /> },
    { name: "SSC", icon: <FileText size={12} /> },
    { name: "Banking", icon: <Trophy size={12} /> }
  ];

  // Pain points of exam aspirants
  const painPoints = [
    "Overwhelming syllabus",
    "Time management issues",
    "Lack of personalized guidance",
    "Test anxiety",
    "Inconsistent progress tracking"
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="pt-16 pb-10 min-h-screen bg-gradient-to-br from-violet-100/40 via-white to-purple-100/40 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-40 -left-24 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left content - Main heading and CTA */}
          <motion.div 
            className="text-left max-w-3xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Competitive Exam Badges */}
            <div className="mb-6 flex flex-wrap gap-2">
              {examBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <Badge className="bg-white text-violet-700 hover:bg-violet-50 border border-violet-200 shadow-sm py-1.5 px-3">
                    {badge.icon}
                    <span className="ml-1">{badge.name}</span>
                  </Badge>
                </motion.div>
              ))}
            </div>
            
            <Badge className="mb-4 bg-violet-100 text-violet-800 hover:bg-violet-200 transition-colors py-1.5 px-4 font-medium">
              Supercharge Your Exam Preparation
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-700 via-purple-600 to-violet-500 leading-tight">
              Your AI Study Partner for <br className="hidden md:block" />Guaranteed Exam Success
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl">
              Sakha delivers personalized exam preparation strategies with AI-powered study plans that adapt to your learning style and goals.
            </p>

            {/* Pain points and solutions */}
            <div className="mb-8 bg-white/70 backdrop-blur-sm rounded-lg p-5 border border-violet-100 shadow-sm">
              <h3 className="font-semibold text-lg mb-3 text-violet-800">We understand your struggles:</h3>
              <ul className="space-y-2 mb-5">
                {painPoints.map((point, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <div className="bg-red-100 p-1 rounded-full">
                      <Clock size={16} className="text-red-500" />
                    </div>
                    {point}
                  </motion.li>
                ))}
              </ul>
              
              <h3 className="font-semibold text-lg mb-3 text-violet-800">How Sakha helps you:</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + 0.1 * index, duration: 0.3 }}
                  >
                    <div className="bg-green-100 p-1 rounded-full">
                      <CheckCircle size={16} className="text-green-500" />
                    </div>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-start items-center gap-4 mb-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-purple-500 hover:opacity-90 text-white px-8 py-6 shadow-md hover:shadow-lg"
                  onClick={onAnalyzeClick}
                >
                  <TrendingUp className="mr-2" />
                  Test Your Exam Readiness Now
                </Button>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-violet-500 text-violet-600 hover:bg-violet-50 shadow-sm hover:shadow-md"
                  asChild
                >
                  <Link to="/signup">
                    <BookOpen className="mr-2" />
                    Start Free Preparation
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Right content - Image and chat */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Real image of exam aspirants */}
            <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/26a404be-3145-4a01-9204-8e74a5984c36.png" 
                alt="Students preparing for exams" 
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Chat Interface */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-violet-100">
              {/* Chat Header */}
              <div className="p-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="avatar-pulse"></div>
                    <div className="avatar-pulse" style={{ animationDelay: "0.5s" }}></div>
                    <div className="avatar-eyes w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full relative overflow-hidden animate-glow">
                      <img 
                        src="/lovable-uploads/37933273-088b-4a83-a5ec-24b13c8c89f5.png" 
                        alt="Sakha AI Avatar" 
                        className="w-10 h-10 rounded-full z-10 relative"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Sakha AI</h3>
                    <p className="text-xs opacity-80">Online | Your Study Partner</p>
                  </div>
                  <Badge className="ml-auto bg-white/20 text-white hover:bg-white/30 flex items-center gap-1">
                    <Brain size={12} /> AI-Powered
                  </Badge>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="chat-container p-6 bg-gray-50 h-[280px] overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <motion.div 
                    key={index} 
                    className={msg.type === "user" ? "user-message" : "bot-message"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.type === "bot" ? (
                        <div className="avatar-eyes w-6 h-6 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full relative overflow-hidden">
                          <img 
                            src="/lovable-uploads/37933273-088b-4a83-a5ec-24b13c8c89f5.png" 
                            alt="Sakha AI" 
                            className="w-6 h-6 rounded-full"
                          />
                        </div>
                      ) : (
                        <User size={16} className="text-white" />
                      )}
                      <span className="text-xs font-medium">
                        {msg.type === "bot" ? "Sakha AI" : "You"}
                      </span>
                    </div>
                    <p>{msg.content}</p>
                  </motion.div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full flex-shrink-0 border-gray-300 hover:bg-violet-50"
                  >
                    <Mic className="h-5 w-5 text-gray-500" />
                  </Button>
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about your exam preparation..."
                      className="w-full p-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-violet-100"
                      onClick={handleSendMessage}
                    >
                      <SendHorizonal className="h-5 w-5 text-violet-500" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3 flex justify-center">
                  <Button 
                    className="bg-gradient-to-r from-violet-500 to-purple-600 text-white animate-pulse-subtle shadow-md"
                    asChild
                  >
                    <Link to="/signup">Sign Up for Personalized Study Plan</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="flex justify-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button variant="ghost" className="text-violet-500 flex flex-col items-center gap-1 animate-bounce-subtle">
            <span className="text-sm font-medium">Explore More</span>
            <ChevronDown size={16} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

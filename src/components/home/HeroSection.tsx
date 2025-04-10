
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import PainPoints from "./hero/PainPoints";
import ChatInterface from "./hero/ChatInterface";
import HeroButtons from "./hero/HeroButtons";
import ExamBadges from "./hero/ExamBadges";
import ScrollIndicator from "./hero/ScrollIndicator";
import { GraduationCap, FileText, Medal, Brain, BarChart3, Award, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  // Pain point data
  const painPoints = [
    "Overwhelming syllabus",
    "Time management issues",
    "Lack of personalized guidance",
    "Test anxiety",
    "Inconsistent progress tracking"
  ];

  const solutions = [
    "Personalized study plans",
    "AI-powered tutoring",
    "Real-time progress tracking",
    "Mock tests with analysis",
    "Exam-specific strategies"
  ];

  const examBadges = [
    { name: "IIT-JEE", icon: <GraduationCap size={12} /> },
    { name: "NEET", icon: <FileText size={12} /> },
    { name: "UPSC", icon: <Award size={12} /> },
    { name: "Bank PO", icon: <Medal size={12} /> },
    { name: "CAT", icon: <BarChart3 size={12} /> },
    { name: "GATE", icon: <Trophy size={12} /> },
    { name: "SSC", icon: <FileText size={12} /> },
    { name: "GRE", icon: <Brain size={12} /> }
  ];

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

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg"
              onClick={() => navigate('/signup')}
            >
              Get Started Free
            </Button>
            
            <Button 
              size="lg"
              onClick={onAnalyzeClick}
              className="relative overflow-hidden border-2 border-violet-200 dark:border-violet-800 bg-white dark:bg-gray-900 hover:bg-violet-50 dark:hover:bg-violet-900/30 group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20 group-hover:from-violet-600/30 group-hover:to-blue-600/30 animate-pulse"></span>
              <span className="relative text-violet-700 dark:text-violet-300 font-medium">
                Check Exam Readiness
              </span>
            </Button>
          </motion.div>

          {/* Display exam badges */}
          <ExamBadges badges={examBadges} />

          {/* Pain points and solutions animation */}
          <PainPoints painPoints={painPoints} solutions={solutions} />
        </div>

        {/* Chat UI section below the hero content */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <ChatInterface />
            
            {/* CTA Buttons */}
            <HeroButtons onAnalyzeClick={onAnalyzeClick} />
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

        {/* Exam Readiness Analyzer Banner */}
        <motion.div
          className="max-w-5xl mx-auto mt-16 bg-gradient-to-r from-violet-600/10 to-blue-600/10 dark:from-violet-900/30 dark:to-blue-900/30 rounded-xl p-6 border-2 border-violet-200/50 dark:border-violet-800/50 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-medium">
                Scientific Assessment
              </Badge>
              <h3 className="text-xl lg:text-2xl font-bold">Discover Your Exam Readiness Score</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                Complete three quick tests to get a personalized study plan based on your unique strengths and weaknesses.
              </p>
            </div>
            <Button 
              size="lg"
              onClick={onAnalyzeClick}
              className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg px-6"
            >
              <Brain className="mr-2" size={20} />
              Analyze My Readiness
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default HeroSection;

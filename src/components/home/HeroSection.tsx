
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import ExamBadges from "./hero/ExamBadges";
import PainPoints from "./hero/PainPoints";
import HeroButtons from "./hero/HeroButtons";
import ChatInterface from "./hero/ChatInterface";
import ScrollIndicator from "./hero/ScrollIndicator";

interface HeroSectionProps {
  onAnalyzeClick: () => void;
}

const HeroSection = ({ onAnalyzeClick }: HeroSectionProps) => {
  // Define exam badges with icons
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

  // Features/solutions offered
  const features = [
    "Personalized study plans",
    "AI-powered tutoring",
    "Real-time progress tracking",
    "Mock tests with analysis",
    "Exam-specific strategies"
  ];

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
            <ExamBadges badges={examBadges} />
            
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
            <PainPoints painPoints={painPoints} solutions={features} />
            
            {/* CTA Buttons */}
            <HeroButtons onAnalyzeClick={onAnalyzeClick} />
          </motion.div>
          
          {/* Right content - Image and chat */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Updated with the new image of exam aspirants */}
            <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="/lovable-uploads/0aee9e2f-6c2f-484e-a580-f28fe3d23820.png" 
                  alt="Students using Sakha AI for exam preparation" 
                  className="w-full h-64 object-cover"
                />
              </motion.div>
              
              {/* Overlaid badges to highlight ecosystem */}
              <motion.div 
                className="absolute -top-2 -right-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-3 py-1 rounded-full shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-xs font-medium">Collaborative Learning</span>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 -right-2 bg-gradient-to-r from-blue-500 to-sky-500 text-white px-3 py-1 rounded-full shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <span className="text-xs font-medium">AI-Guided</span>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <span className="text-xs font-medium">Personalized Study Plans</span>
              </motion.div>
            </div>

            {/* Chat Interface */}
            <ChatInterface />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </div>
    </section>
  );
};

import { 
  FileText, 
  GraduationCap, 
  Medal, 
  Brain, 
  BarChart3, 
  Award, 
  Trophy 
} from "lucide-react";

export default HeroSection;

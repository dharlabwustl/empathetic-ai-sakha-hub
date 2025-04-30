
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Brain,
  FileText,
  Star,
  Eye,
  Activity,
  Check,
  Clock,
  Calendar,
} from 'lucide-react';
import founderImage from '@/assets/images/founder.jpg';

interface WelcomeScreenProps {
  studentName?: string;
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ studentName = 'Student', onComplete }) => {
  const navigate = useNavigate();
  
  // Auto-redirect to dashboard after 2 minutes
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 120000); // 2 minutes
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const features = [
    {
      title: "Concept Cards",
      description: "Master foundational concepts with interactive learning cards",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    },
    {
      title: "Flashcards",
      description: "Reinforce knowledge with smart, adaptive flashcards",
      icon: <Brain className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    },
    {
      title: "Practice Exams",
      description: "Test your knowledge with exam-like questions",
      icon: <FileText className="h-5 w-5" />,
      color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    },
    {
      title: "Today's Plan",
      description: "Follow your daily personalized study schedule",
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    },
    {
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed analytics",
      icon: <Activity className="h-5 w-5" />,
      color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    },
    {
      title: "Time Management",
      description: "Optimize your study time with smart scheduling",
      icon: <Clock className="h-5 w-5" />,
      color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    },
  ];

  const steps = [
    "Check your Today's Plan for personalized study schedule",
    "Start with concept cards to strengthen your foundations",
    "Review with flashcards to reinforce your memory",
    "Take practice exams to test your understanding",
    "Track your progress and adjust your strategy",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-primary">Prepzr</div>
        </div>
        <Button onClick={onComplete}>Skip to Dashboard</Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          className="max-w-4xl mx-auto space-y-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Welcome Section */}
          <motion.div variants={item} className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Welcome to Prepzr, {studentName}!</h1>
            <p className="text-xl text-muted-foreground">
              Your personalized learning journey begins now
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={item}>
            <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className={`p-3 rounded-full w-fit ${feature.color} mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Getting Started */}
          <motion.div variants={item} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4" />
                  </div>
                  <p>{step}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button size="lg" onClick={onComplete}>
                Start Your Learning Journey
              </Button>
            </div>
          </motion.div>

          {/* Founder Message */}
          <motion.div
            variants={item}
            className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/50 dark:to-indigo-950/50 rounded-lg shadow-md p-8 border border-violet-100 dark:border-violet-900/30"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-primary">
                <img
                  src={founderImage || "https://via.placeholder.com/100"}
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">A Message from Our Founder</h3>
                <p className="italic text-gray-700 dark:text-gray-300 mb-4">
                  "Welcome to Prepzr! Our mission is to transform how you prepare for exams through personalized learning. We've built this platform to adapt to your unique needs and help you achieve your academic goals with confidence. I'm excited to join you on this learning journey!"
                </p>
                <p className="font-semibold">Dr. Arjun Sharma, Founder & CEO</p>
              </div>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            variants={item}
            className="text-center py-6"
            whileHover={{ scale: 1.05 }}
          >
            <Button size="lg" onClick={onComplete} className="px-8">
              Go to Dashboard
            </Button>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center text-sm text-muted-foreground">
        <p>© 2024 Prepzr Education. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomeScreen;


import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Award, 
  BarChart, 
  FileCheck, 
  BookOpen, 
  GraduationCap, 
  Layers, 
  Rocket 
} from 'lucide-react';
import { cn } from '@/lib/utils';

type MethodFeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  index: number;
};

const MethodFeature: React.FC<MethodFeatureProps> = ({ icon, title, description, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "flex flex-col items-center text-center p-5 rounded-xl shadow-md",
        "transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800",
        "border border-gray-100 dark:border-gray-700"
      )}
    >
      <div className={`p-3 rounded-full ${color} mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </motion.div>
  );
};

const OurMethodSection: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      title: "Student Assessment",
      description: "Comprehensive evaluation of student's current knowledge, learning style, and study habits to create a personalized foundation.",
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      title: "Hyper Personalization",
      description: "AI-driven approach that adapts to your unique learning style, mood, and schedule for maximum effectiveness.",
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: <BarChart className="w-6 h-6 text-cyan-600" />,
      title: "Smart Study Plan",
      description: "Dynamically adjusted study schedules that focus on your weak areas while maintaining progress in your strengths.",
      color: "bg-cyan-100 dark:bg-cyan-900/30",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-green-600" />,
      title: "Concept Cards",
      description: "Interactive bite-sized learning modules that break down complex topics into easily digestible information.",
      color: "bg-green-100 dark:bg-green-900/30",
    },
    {
      icon: <FileCheck className="w-6 h-6 text-emerald-600" />,
      title: "Flash Cards",
      description: "Spaced repetition system that ensures long-term retention of key concepts and formulas.",
      color: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-yellow-600" />,
      title: "Practice Exams",
      description: "Simulated test environments with real-time analysis and detailed performance feedback.",
      color: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      icon: <Award className="w-6 h-6 text-orange-600" />,
      title: "Exam Readiness Score",
      description: "Proprietary metric that accurately predicts your exam performance and highlights areas needing attention.",
      color: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
      icon: <Rocket className="w-6 h-6 text-red-600" />,
      title: "AI Engine Support",
      description: "Round-the-clock intelligent assistance that answers questions and provides guidance at every step.",
      color: "bg-red-100 dark:bg-red-900/30",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Our Champion-Making Methodology
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            We transform aspirants into champions through our data-driven, AI-powered learning ecosystem
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <MethodFeature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              index={index}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl shadow-md max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">
              A complete ecosystem designed for your success
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Every feature of our platform is meticulously crafted to work together, creating a seamless learning experience that adapts to your needs and helps you achieve your goals.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurMethodSection;

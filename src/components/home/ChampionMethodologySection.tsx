
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, FileText, Calculator, ChartBar, CheckCircle, BarChart } from 'lucide-react';

const ChampionMethodologySection = () => {
  const methodologyPoints = [
    {
      id: 1,
      title: 'Student Assessment',
      description: 'Comprehensive evaluation of learning style, strengths, and improvement areas tailored to each student.',
      icon: <BookOpen size={24} />,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 2,
      title: 'Hyper Personalization',
      description: 'AI-driven content adaptation based on individual learning patterns, preferences, and progress.',
      icon: <Brain size={24} />,
      color: 'from-purple-500 to-violet-400'
    },
    {
      id: 3,
      title: 'Smart Study Plan',
      description: 'Dynamically generated study schedules that optimize time allocation and prioritize weak areas.',
      icon: <FileText size={24} />,
      color: 'from-green-500 to-teal-400'
    },
    {
      id: 4,
      title: 'Byte Size Concept Cards',
      description: 'Complex topics broken down into manageable, interconnected knowledge units for easier understanding.',
      icon: <Calculator size={24} />,
      color: 'from-orange-500 to-amber-400'
    },
    {
      id: 5,
      title: 'Interactive Flashcards',
      description: 'Memory-enhancing active recall tools that adapt to your retention patterns for better memorization.',
      icon: <ChartBar size={24} />,
      color: 'from-pink-500 to-rose-400'
    },
    {
      id: 6,
      title: 'Exam Preparation',
      description: 'Realistic practice tests and simulations that mirror actual exam conditions and question patterns.',
      icon: <CheckCircle size={24} />,
      color: 'from-indigo-500 to-blue-400'
    },
    {
      id: 7,
      title: 'Exam Readiness Score',
      description: 'Real-time analytics that measure your preparation level and predict performance for your target exam.',
      icon: <BarChart size={24} />,
      color: 'from-red-500 to-orange-400'
    }
  ];

  return (
    <section className="py-16 md:py-24 overflow-hidden relative bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10">
          {/* Background circuit pattern */}
          <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-purple-500">
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="400" cy="400" r="200" />
              <circle cx="400" cy="400" r="150" />
              <circle cx="400" cy="400" r="300" />
              <path d="M400,100 L400,700 M100,400 L700,400 M200,200 L600,600 M200,600 L600,200" />
              <path d="M400,100 C550,150 650,250 700,400 C650,550 550,650 400,700 C250,650 150,550 100,400 C150,250 250,150 400,100" />
            </g>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Champion-Making</span> Methodology
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our AI-powered system transforms preparation into performance through a seven-step methodology that adapts to your unique learning journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {methodologyPoints.map((point, index) => (
            <motion.div 
              key={point.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${point.color} flex items-center justify-center mb-4`}>
                {point.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{point.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChampionMethodologySection;

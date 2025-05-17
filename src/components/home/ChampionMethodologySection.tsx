
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, BookOpen, BarChart3, Users, Lightbulb, Clock } from 'lucide-react';

const ChampionMethodologySection: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Methodology steps
  const methodologySteps = [
    {
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      title: "Personalized Learning",
      description: "AI adapts to your unique learning style and creates customized study plans that evolve with you.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-blue-500" />,
      title: "Micro-Concepts Mastery",
      description: "Break down complex topics into digestible micro-concepts for efficient learning and retention.",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
      title: "Active Recall",
      description: "Scientifically proven techniques that strengthen memory through strategic testing and repetition.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-amber-500" />,
      title: "Progress Analytics",
      description: "Track your improvement with detailed analytics that identify strengths and areas for growth.",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: <Clock className="h-8 w-8 text-rose-500" />,
      title: "Optimization Loop",
      description: "Continuous feedback system refines your study plan for maximum efficiency and effectiveness.",
      color: "from-rose-500 to-pink-600"
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      title: "Peer Community",
      description: "Connect with like-minded students to share tips, collaborate, and stay motivated together.",
      color: "from-indigo-500 to-violet-600"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="inline-block text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Champion Methodology™
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            Our scientifically-backed approach combines cutting-edge AI with proven learning techniques to maximize your exam preparation
          </p>
        </motion.div>

        {/* Central AI Engine */}
        <div className="relative mb-12">
          <motion.div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-violet-600/20 to-blue-600/20 blur-xl dark:from-violet-600/40 dark:to-blue-600/40" />
          </motion.div>
          
          <motion.div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
            initial={{ scale: 0, rotate: -30, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg">
              <Lightbulb className="h-10 w-10 md:h-14 md:w-14 text-white" />
              <motion.div
                className="absolute w-full h-full rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 0px rgba(124, 58, 237, 0.4)",
                    "0 0 0 15px rgba(124, 58, 237, 0)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                }}
              />
            </div>
            <div className="absolute -bottom-8 text-center whitespace-nowrap font-medium text-violet-600 dark:text-violet-400">
              AI Learning Engine
            </div>
          </motion.div>
        </div>

        {/* Methodology Steps in a circular arrangement */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10 mt-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {methodologySteps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all p-6 group"
            >
              <div className="absolute -top-6 left-6 p-2 rounded-lg bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 shadow-md group-hover:-translate-y-1 transition-transform">
                <div className="p-3 rounded-lg bg-gradient-to-r group-hover:animate-pulse" style={{ backgroundImage: `linear-gradient(to right, ${step.color})` }}>
                  {step.icon}
                </div>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{step.description}</p>
              
              {/* Connecting lines */}
              <motion.div 
                className={`hidden lg:block absolute ${
                  index % 3 === 0 ? "right-0 top-1/2" : 
                  index % 3 === 1 ? "right-0 top-1/2" : 
                  "left-1/2 bottom-0"
                } transform ${
                  index % 3 === 0 ? "translate-x-1/2 -translate-y-1/2" : 
                  index % 3 === 1 ? "translate-x-1/2 -translate-y-1/2" : 
                  "-translate-x-1/2 translate-y-1/2"
                } pointer-events-none z-[-1]`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {((index < methodologySteps.length - 1) && ((index + 1) % 3 !== 0)) && (
                  <div className="h-0.5 w-8 bg-gradient-to-r from-purple-400 to-blue-400" />
                )}
                {(index < 3) && (
                  <div className="absolute w-0.5 h-8 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gradient-to-b from-blue-400 to-purple-400 opacity-40" />
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg font-medium mb-6">
            This unique methodology has helped 10,000+ students achieve their exam goals
          </p>
          <div className="inline-block">
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-medium text-lg cursor-pointer hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Discover Your Learning Path
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChampionMethodologySection;

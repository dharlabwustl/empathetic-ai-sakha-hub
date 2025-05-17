
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, BookOpen, BarChart3, Users, Lightbulb, Clock, Zap } from 'lucide-react';

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
  
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const connectionVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  // Methodology steps
  const methodologySteps = [
    {
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      title: "Personalized Learning",
      description: "AI adapts to your unique learning style and creates customized study plans that evolve with you.",
      color: "from-purple-500 to-indigo-600",
      position: "top-left"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-blue-500" />,
      title: "Micro-Concepts Mastery",
      description: "Break down complex topics into digestible micro-concepts for efficient learning and retention.",
      color: "from-blue-500 to-cyan-600",
      position: "top-right"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
      title: "Active Recall",
      description: "Scientifically proven techniques that strengthen memory through strategic testing and repetition.",
      color: "from-green-500 to-emerald-600",
      position: "middle-right"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-amber-500" />,
      title: "Progress Analytics",
      description: "Track your improvement with detailed analytics that identify strengths and areas for growth.",
      color: "from-amber-500 to-orange-600",
      position: "bottom-right"
    },
    {
      icon: <Clock className="h-8 w-8 text-rose-500" />,
      title: "Optimization Loop",
      description: "Continuous feedback system refines your study plan for maximum efficiency and effectiveness.",
      color: "from-rose-500 to-pink-600",
      position: "bottom-left"
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      title: "Peer Community",
      description: "Connect with like-minded students to share tips, collaborate, and stay motivated together.",
      color: "from-indigo-500 to-violet-600",
      position: "middle-left"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="inline-block text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Champion Methodology™
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            Our scientifically-backed approach combines cutting-edge AI with proven learning techniques 
            to maximize your exam preparation
          </p>
        </motion.div>

        {/* Central AI System with Dynamic Connections */}
        <div className="relative mb-20 md:mb-28">
          {/* Outer glow effect */}
          <motion.div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            variants={pulseVariants}
            animate="pulse"
          >
            <div className="w-40 h-40 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-violet-600/30 to-blue-600/30 blur-xl dark:from-violet-600/40 dark:to-blue-600/40" />
          </motion.div>
          
          {/* Central AI Brain */}
          <motion.div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center"
            initial={{ scale: 0, rotate: -30, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-xl relative">
              <Lightbulb className="h-12 w-12 md:h-16 md:w-16 text-white" />
              
              {/* Animated data points */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full"
                animate={{ 
                  x: [0, 10, 5, 0],
                  y: [0, -5, 10, 0],
                  opacity: [1, 0.5, 0.8, 1]
                }}
                transition={{ duration: 3.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-yellow-300 rounded-full"
                animate={{ 
                  x: [0, -8, 4, 0],
                  y: [0, 7, -5, 0],
                  opacity: [1, 0.7, 0.9, 1]
                }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-300 rounded-full"
                animate={{ 
                  x: [0, 7, -7, 0],
                  y: [0, 8, 4, 0],
                  opacity: [1, 0.6, 0.7, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
              
              {/* Pulsing effect */}
              <motion.div
                className="absolute w-full h-full rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 0px rgba(124, 58, 237, 0)",
                    "0 0 0 15px rgba(124, 58, 237, 0.1)",
                    "0 0 0 20px rgba(124, 58, 237, 0)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                }}
              />
            </div>
            <div className="absolute -bottom-10 text-center whitespace-nowrap font-medium text-violet-600 dark:text-violet-400 bg-white dark:bg-gray-800 px-4 py-1 rounded-full shadow-md">
              <span className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-yellow-400" />
                Emotional AI Engine
                <Zap className="h-4 w-4 text-yellow-400" />
              </span>
            </div>
          </motion.div>
          
          {/* SVG Connection Lines */}
          <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] max-h-[600px] z-10" viewBox="0 0 200 200">
            {/* Data Transmission Dots */}
            <motion.circle 
              cx="100" cy="45" r="2" fill="#8b5cf6"
              animate={{
                cx: [100, 80, 100],
                cy: [45, 55, 45],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle 
              cx="155" cy="100" r="2" fill="#3b82f6"
              animate={{
                cx: [155, 130, 155],
                cy: [100, 90, 100],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
            />
            <motion.circle 
              cx="100" cy="155" r="2" fill="#ef4444"
              animate={{
                cx: [100, 120, 100],
                cy: [155, 130, 155],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
            />
            <motion.circle 
              cx="45" cy="100" r="2" fill="#10b981"
              animate={{
                cx: [45, 70, 45],
                cy: [100, 110, 100],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
            />
            
            {/* Connection Lines */}
            <motion.path
              d="M100,100 L100,20"
              stroke="url(#gradientTop)"
              strokeWidth="1.5"
              fill="none"
              variants={connectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            />
            <motion.path
              d="M100,100 L180,55"
              stroke="url(#gradientTopRight)"
              strokeWidth="1.5"
              fill="none"
              variants={connectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            />
            <motion.path
              d="M100,100 L180,145"
              stroke="url(#gradientBottomRight)"
              strokeWidth="1.5"
              fill="none"
              variants={connectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            />
            <motion.path
              d="M100,100 L100,180"
              stroke="url(#gradientBottom)"
              strokeWidth="1.5"
              fill="none"
              variants={connectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            />
            <motion.path
              d="M100,100 L20,145"
              stroke="url(#gradientBottomLeft)"
              strokeWidth="1.5"
              fill="none"
              variants={connectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            />
            <motion.path
              d="M100,100 L20,55"
              stroke="url(#gradientTopLeft)"
              strokeWidth="1.5"
              fill="none"
              variants={connectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            />
            
            {/* Gradients for connections */}
            <defs>
              <linearGradient id="gradientTop" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="gradientTopRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
              <linearGradient id="gradientBottomRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="gradientBottom" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <linearGradient id="gradientBottomLeft" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
              <linearGradient id="gradientTopLeft" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Methodology Steps in a circular arrangement */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10"
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
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            >
              <div className="absolute -top-6 left-6 p-2 rounded-lg bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 shadow-md group-hover:-translate-y-1 transition-transform">
                <div className="p-3 rounded-lg bg-gradient-to-r group-hover:animate-pulse" style={{ backgroundImage: `linear-gradient(to right, ${step.color})` }}>
                  {step.icon}
                </div>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{step.description}</p>
              
              {/* Animated AI Connection Indicator */}
              <motion.div 
                className="absolute top-2 right-2 w-2 h-2 rounded-full bg-violet-500"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* AI Insights Message */}
        <motion.div 
          className="relative max-w-3xl mx-auto mt-16 bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 p-6 rounded-xl shadow-md border border-violet-100 dark:border-violet-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <div className="flex items-start gap-4">
            <div className="bg-violet-600 rounded-full p-3 flex-shrink-0">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-violet-800 dark:text-violet-300 mb-2">
                AI Insight: Emotionally Intelligent Learning
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Our AI engine doesn't just understand your academic progress – it's emotionally aware and adapts to your learning state. When you're feeling overwhelmed, it suggests lighter materials. When you're motivated, it challenges you with advanced concepts.
              </p>
            </div>
          </div>
          
          {/* Animated data streams */}
          <motion.div 
            className="absolute top-0 right-0 h-full w-1/4 overflow-hidden opacity-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
          >
            {[...Array(15)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent"
                style={{ 
                  width: Math.random() * 60 + 20, 
                  left: Math.random() * 100,
                  top: Math.random() * 100 + '%'
                }}
                animate={{
                  x: [-50, 100],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
              />
            ))}
          </motion.div>
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
          <div className="inline-block relative">
            <motion.div
              className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-medium text-lg cursor-pointer hover:shadow-lg transition-all z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Discover Your Learning Path
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-lg opacity-70 -z-10"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChampionMethodologySection;

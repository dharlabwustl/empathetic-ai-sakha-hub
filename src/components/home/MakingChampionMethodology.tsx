
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Award, Target, Brain, ChartLineUp, UserPlus } from 'lucide-react';

const MakingChampionMethodology = () => {
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
    show: { y: 0, opacity: 1 }
  };

  const steps = [
    {
      id: 1,
      title: "Customized Learning Paths",
      description: "Personalized study plans tailored to your unique learning style, strengths, and areas for improvement.",
      icon: <Target className="h-12 w-12 text-blue-500" />
    },
    {
      id: 2,
      title: "Precision Practice",
      description: "Targeted practice on weak concepts with adaptive algorithms that evolve with your progress.",
      icon: <Brain className="h-12 w-12 text-purple-500" />
    },
    {
      id: 3,
      title: "Real-time Analytics",
      description: "Comprehensive performance tracking and insights to optimize your preparation strategy.",
      icon: <ChartLineUp className="h-12 w-12 text-green-500" />
    },
    {
      id: 4,
      title: "Expert Mentorship",
      description: "Guidance from top educators and successful exam passers to navigate complex topics.",
      icon: <UserPlus className="h-12 w-12 text-orange-500" />
    },
    {
      id: 5,
      title: "Champion Mindset",
      description: "Mental conditioning techniques to build confidence, focus, and resilience during exam preparation.",
      icon: <Award className="h-12 w-12 text-red-500" />
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Making Champion Methodology
            </span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Our proven 5-step approach transforms average students into exam champions through
            personalized strategies and cutting-edge technology.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
            >
              <div className="rounded-full p-3 bg-gray-50 dark:bg-gray-700 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              <div className="mt-4 flex items-center text-green-600 dark:text-green-400">
                <Check size={16} className="mr-1" />
                <span className="text-sm font-medium">Research Backed</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-3xl mx-auto mt-16 bg-gradient-to-r from-purple-100/80 to-blue-100/80 dark:from-purple-900/30 dark:to-blue-900/30 p-6 rounded-xl border border-blue-100 dark:border-blue-800"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-6 h-6 text-yellow-500" fill="currentColor" />
            <h3 className="text-2xl font-bold">Proven Results</h3>
            <Star className="w-6 h-6 text-yellow-500" fill="currentColor" />
          </div>
          <p className="text-center text-gray-800 dark:text-gray-200">
            Students following our champion methodology have shown a <span className="font-bold text-purple-600 dark:text-purple-400">35% improvement</span> in exam scores and <span className="font-bold text-blue-600 dark:text-blue-400">87% report reduced exam anxiety</span> compared to traditional study methods.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MakingChampionMethodology;

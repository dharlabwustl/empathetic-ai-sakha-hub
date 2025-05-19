
import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Award, Clock, Heart, BookOpen } from 'lucide-react';

const MilestonesSection = () => {
  const milestones = [
    {
      title: "Confidence Building",
      description: "Boost your exam confidence with adaptive learning that grows with you",
      icon: <Award className="h-10 w-10 text-amber-500" />,
      color: "from-amber-500 to-amber-600",
      delay: 0.1
    },
    {
      title: "Exam Success",
      description: "Achieve your target scores through personalized study strategies",
      icon: <BookOpen className="h-10 w-10 text-emerald-500" />,
      color: "from-emerald-500 to-emerald-600",
      delay: 0.2
    },
    {
      title: "Time Saving",
      description: "Study smarter, not harder, with AI-optimized learning paths",
      icon: <Clock className="h-10 w-10 text-blue-500" />,
      color: "from-blue-500 to-blue-600",
      delay: 0.3
    },
    {
      title: "Stress-Free Preparation",
      description: "Reduce exam anxiety with our emotionally-aware guidance system",
      icon: <Heart className="h-10 w-10 text-rose-500" />,
      color: "from-rose-500 to-rose-600",
      delay: 0.4
    },
    {
      title: "Happy Learning",
      description: "Enjoy the journey to success with engaging, interactive content",
      icon: <Smile className="h-10 w-10 text-violet-500" />,
      color: "from-violet-500 to-violet-600",
      delay: 0.5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            Your Journey to Success
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            PREPZR guides you through these key milestones on your path to exam excellence
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ duration: 0.5, delay: milestone.delay }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg"
            >
              <div className="p-6">
                <div className={`inline-flex items-center justify-center p-3 mb-4 rounded-full bg-gradient-to-r ${milestone.color}`}>
                  {milestone.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
              </div>
              
              <div className={`h-1 w-full bg-gradient-to-r ${milestone.color}`}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MilestonesSection;

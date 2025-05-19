
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Heart, ShieldCheck, Smile } from 'lucide-react';

const MilestonesSection: React.FC = () => {
  const milestones = [
    {
      title: 'Confidence Building',
      description: 'Build self-assurance through personalized learning paths and positive reinforcement',
      icon: <Award className="h-10 w-10 text-indigo-500" />,
      color: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
      iconBg: 'bg-indigo-100 dark:bg-indigo-800/30'
    },
    {
      title: 'Exam Success',
      description: 'Achieve higher scores with targeted practice and adaptive learning strategies',
      icon: <ShieldCheck className="h-10 w-10 text-green-500" />,
      color: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      iconBg: 'bg-green-100 dark:bg-green-800/30'
    },
    {
      title: 'Time Saving',
      description: 'Optimize your study time with AI-powered recommendations focused on your needs',
      icon: <Clock className="h-10 w-10 text-blue-500" />,
      color: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      iconBg: 'bg-blue-100 dark:bg-blue-800/30'
    },
    {
      title: 'Stress-Free Preparation',
      description: 'Reduce exam anxiety with structured plans and confidence-building exercises',
      icon: <Heart className="h-10 w-10 text-purple-500" />,
      color: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
      iconBg: 'bg-purple-100 dark:bg-purple-800/30'
    },
    {
      title: 'Happy Learning',
      description: 'Enjoy the journey with engaging, interactive content tailored to your preferences',
      icon: <Smile className="h-10 w-10 text-amber-500" />,
      color: 'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20',
      iconBg: 'bg-amber-100 dark:bg-amber-800/30'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/80">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Your Success Milestones
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our personalized approach helps you achieve these key milestones throughout your exam preparation journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${milestone.color} rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700`}
            >
              <div className={`${milestone.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                {milestone.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MilestonesSection;

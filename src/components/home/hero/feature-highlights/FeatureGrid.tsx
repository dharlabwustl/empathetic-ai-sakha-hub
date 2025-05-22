
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Award, Heart, Zap } from 'lucide-react';
import FeaturePoint from './FeaturePoint';
import { container } from './animationVariants';

const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: <Award className="h-6 w-6 text-white" />,
      title: "Exam Success",
      description: "Higher scores with focused prep strategies",
      color: "from-amber-500 to-amber-600",
      delay: 0.2
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Confidence Builder",
      description: "Master concepts with personalized approach",
      color: "from-blue-500 to-blue-600",
      delay: 0.3
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Time Saver",
      description: "Study smarter, not harder with AI assistance",
      color: "from-green-500 to-green-600",
      delay: 0.4
    },
    {
      icon: <Brain className="h-6 w-6 text-white" />,
      title: "Stress-Free",
      description: "Reduce exam anxiety with proven methods",
      color: "from-purple-500 to-purple-600",
      delay: 0.5
    },
    {
      icon: <Heart className="h-6 w-6 text-white" />,
      title: "Happy Learning",
      description: "Enjoy your journey to academic success",
      color: "from-pink-500 to-pink-600",
      delay: 0.6
    }
  ];

  return (
    <motion.div
      className="py-6 px-4"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={container}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {features.map((feature, index) => (
          <FeaturePoint
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            color={feature.color}
            delay={feature.delay}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FeatureGrid;

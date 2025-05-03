
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Zap } from 'lucide-react';

const AchievementsSection = () => {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  // Animation variants for icons
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 80
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.6
      }
    }
  };

  // Title animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Text reveal animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Achievement data
  const achievements = [
    {
      id: 1,
      title: "G-CARED 2025",
      description: "Selected at First Global Conference on AI Research and Emerging Developments for 'Sakha AI: Building India's First Emotionally Intelligent Foundational AI Model for Exam Aspirants'",
      icon: <Award className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
      color: "indigo",
      decoration: "bg-indigo-600/5 border-indigo-600/20"
    },
    {
      id: 2,
      title: "NVIDIA Startup",
      description: "Proud member of the NVIDIA Inception Program for cutting-edge AI startups, leveraging advanced technology for educational innovation",
      icon: <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />,
      color: "green",
      decoration: "bg-green-600/5 border-green-600/20"
    },
    {
      id: 3,
      title: "NASSCOM CoE",
      description: "Incubated at NASSCOM Centre of Excellence, Gurgaon, developing AI-driven educational solutions with expert guidance and support",
      icon: <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      color: "blue",
      decoration: "bg-blue-600/5 border-blue-600/20"
    }
  ];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 right-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold"
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 100%"],
              backgroundSize: ["100% 100%", "200% 200%"] 
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundImage: "linear-gradient(90deg, #8b5cf6, #3b82f6, #8b5cf6)",
            }}
          >
            Recognitions & Achievements
          </motion.h2>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mt-3"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {achievements.map((achievement) => (
            <motion.div 
              key={achievement.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className={`bg-white dark:bg-gray-800/80 backdrop-blur p-6 rounded-2xl shadow-lg border ${achievement.color === "indigo" ? "border-indigo-200/50 dark:border-indigo-700/30" : achievement.color === "green" ? "border-green-200/50 dark:border-green-700/30" : "border-blue-200/50 dark:border-blue-700/30"} flex flex-col items-center text-center`}
            >
              <motion.div 
                className={`${achievement.color === "indigo" ? "bg-indigo-100 dark:bg-indigo-900/40" : achievement.color === "green" ? "bg-green-100 dark:bg-green-900/40" : "bg-blue-100 dark:bg-blue-900/40"} p-4 rounded-full mb-5 ${achievement.decoration}`}
                variants={iconVariants}
                whileHover="hover"
              >
                {achievement.icon}
              </motion.div>
              
              <motion.h3 
                className={`text-lg md:text-xl font-semibold mb-3 ${achievement.color === "indigo" ? "text-indigo-700 dark:text-indigo-300" : achievement.color === "green" ? "text-green-700 dark:text-green-300" : "text-blue-700 dark:text-blue-300"}`}
                variants={textVariants}
              >
                {achievement.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
                variants={textVariants}
              >
                {achievement.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;

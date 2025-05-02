
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Shield, FileText, CircleUserRound, ArrowRightLeft } from 'lucide-react';

const EcosystemAnimation: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  
  const examCategories = [
    {
      id: 1,
      title: "Engineering Exams",
      description: "Prepare for top engineering entrance exams with AI-driven personalized study plans",
      icon: <GraduationCap size={28} />,
      exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "MET"],
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      title: "Medical Exams",
      description: "Master medical concepts with adaptive learning paths tailored to your strengths and weaknesses",
      icon: <BookOpen size={28} />,
      exams: ["NEET-UG", "AIIMS", "JIPMER", "NEET-PG", "FMGE"],
      color: "from-green-500 to-teal-400"
    },
    {
      id: 3,
      title: "Civil Service Exams",
      description: "Comprehensive preparation for all stages of civil service examination with current affairs updates",
      icon: <Shield size={28} />,
      exams: ["UPSC CSE", "State PCS", "SSC CGL", "UPSC ESE", "UPSC CDS"],
      color: "from-orange-500 to-amber-400"
    },
    {
      id: 4,
      title: "Management Exams",
      description: "Strategic preparation for management entrance tests with focus on analytical and verbal ability",
      icon: <FileText size={28} />,
      exams: ["CAT", "XAT", "SNAP", "NMAT", "CMAT"],
      color: "from-purple-500 to-violet-400"
    },
    {
      id: 5,
      title: "Competitive Exams",
      description: "Stay ahead with pattern-focused preparation and regular mock tests for competitive exams",
      icon: <CircleUserRound size={28} />,
      exams: ["Banking", "SSC", "Railways", "Insurance", "Teaching"],
      color: "from-rose-500 to-pink-400"
    },
    {
      id: 6,
      title: "International Exams",
      description: "Complete preparation for international standardized tests with focus on all test components",
      icon: <ArrowRightLeft size={28} />,
      exams: ["GRE", "GMAT", "TOEFL", "IELTS", "SAT"],
      color: "from-indigo-500 to-blue-400"
    }
  ];

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
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Complete <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Exam Ecosystem</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            One platform for all competitive exam preparation needs, designed to adapt to your goals and learning style
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {examCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1)" 
              }}
              onHoverStart={() => setActiveCategory(category.id)}
              onHoverEnd={() => setActiveCategory(null)}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${category.color} text-white mr-4`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-5">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.exams.map((exam, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0.7 }}
                      animate={{ 
                        opacity: activeCategory === category.id ? 1 : 0.7,
                        scale: activeCategory === category.id ? 1.05 : 1
                      }}
                      className={`text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r ${category.color} text-white opacity-70 hover:opacity-100 transition-opacity`}
                    >
                      {exam}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EcosystemAnimation;

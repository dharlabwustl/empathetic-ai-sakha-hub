
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, School, University } from 'lucide-react';

const ExamEcosystemSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const examCategories = [
    {
      title: "Entrance Exams",
      icon: <GraduationCap className="h-12 w-12 text-purple-600" />,
      exams: ["NEET", "IIT-JEE", "AIIMS", "CLAT", "NIFT", "NID", "NATA"],
      color: "from-purple-500 to-indigo-600"
    },
    {
      title: "Government Exams",
      icon: <University className="h-12 w-12 text-blue-600" />,
      exams: ["UPSC", "SSC", "Bank PO", "RRB", "GATE", "NDA", "CDS"],
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Management Exams",
      icon: <School className="h-12 w-12 text-teal-600" />,
      exams: ["CAT", "XAT", "MAT", "CMAT", "GMAT", "SNAP", "NMAT"],
      color: "from-teal-500 to-green-600"
    },
    {
      title: "International Exams",
      icon: <BookOpen className="h-12 w-12 text-amber-600" />,
      exams: ["GRE", "TOEFL", "IELTS", "SAT", "GMAT", "PTE", "OET"],
      color: "from-amber-500 to-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Exam Ecosystem
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            PREPZR supports a wide range of competitive exams with specialized content, strategies, and prep techniques tailored to each exam's unique requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {examCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className={`p-6 bg-gradient-to-r ${category.color} text-white`}>
                <div className="flex items-center gap-4">
                  {category.icon}
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  {category.exams.map((exam, examIndex) => (
                    <motion.li
                      key={examIndex}
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + examIndex * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 20, 
                          delay: 0.2 + examIndex * 0.05 
                        }}
                        className={`h-2 w-2 rounded-full bg-gradient-to-r ${category.color}`}
                      ></motion.div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {exam}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-600 dark:text-gray-400 italic">
            Don't see your exam listed? Contact us to learn how PREPZR can still help you prepare effectively!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExamEcosystemSection;

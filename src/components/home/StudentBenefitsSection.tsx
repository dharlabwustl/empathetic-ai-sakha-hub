
import { motion } from "framer-motion";
import { CircleCheck, Brain, Calendar, Clock, Target, Trophy, Sparkles } from "lucide-react";

const StudentBenefitsSection = () => {
  const benefits = [
    {
      icon: <Brain className="w-6 h-6 text-violet-500" />,
      title: "Personalized Learning",
      description: "AI-tailored study plans based on your learning style, strengths, and weaknesses."
    },
    {
      icon: <Calendar className="w-6 h-6 text-violet-500" />,
      title: "Smart Scheduling",
      description: "Dynamic study calendars that adapt to your progress and optimize your study time."
    },
    {
      icon: <Clock className="w-6 h-6 text-violet-500" />,
      title: "Time Optimization",
      description: "Study smarter, not harder with AI-optimized time allocation for each topic."
    },
    {
      icon: <Target className="w-6 h-6 text-violet-500" />,
      title: "Weak Area Focus",
      description: "Automatic identification and targeting of concepts you struggle with most."
    },
    {
      icon: <Trophy className="w-6 h-6 text-violet-500" />,
      title: "Progress Tracking",
      description: "Real-time performance analytics and milestone achievements to keep you motivated."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-violet-500" />,
      title: "Exam Strategy",
      description: "Personalized exam strategies based on your preparation level and exam patterns."
    }
  ];

  return (
    <section className="py-20 bg-white" id="student-benefits">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-500"
          >
            Why Students Love Sakha AI
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-700"
          >
            Join thousands of students who are achieving their academic goals with 
            personalized AI assistance that understands their unique learning journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-purple-50 rounded-xl p-6 border border-purple-100 hover:shadow-md transition-all"
            >
              <div className="rounded-full bg-white p-3 w-14 h-14 flex items-center justify-center mb-4 shadow-sm">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-violet-800">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Student Success Rate</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">92%</div>
                <p>Improved exam scores</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">3.5x</div>
                <p>Study efficiency boost</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">87%</div>
                <p>Found weak areas faster</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentBenefitsSection;

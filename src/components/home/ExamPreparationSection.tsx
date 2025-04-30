
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ExamCardProps {
  name: string;
  description: string;
  features: string[];
  icon: string;
}

const ExamPreparationSection = () => {
  const exams: ExamCardProps[] = [
    {
      name: "UPSC",
      description: "Complete preparation for Civil Services with comprehensive syllabus coverage and current affairs integration.",
      features: [
        "Daily current affairs digests",
        "Subject-wise micro concepts",
        "Previous year question analysis",
        "Answer writing practice",
        "Mock interview preparation"
      ],
      icon: "👨‍⚖️"
    },
    {
      name: "JEE",
      description: "Master Physics, Chemistry, and Mathematics with concept-based learning and problem-solving techniques.",
      features: [
        "Advanced problem-solving",
        "Chapter-wise practice tests",
        "Formula revision cards",
        "Difficulty analysis",
        "Personalized weak topic focus"
      ],
      icon: "🔬"
    },
    {
      name: "NEET",
      description: "Comprehensive medical entrance preparation covering Biology, Physics, and Chemistry with visual learning.",
      features: [
        "Visual biology concepts",
        "Regular MCQ practice",
        "NCERT-focused curriculum",
        "Subject correlation mapping",
        "Exam pattern training"
      ],
      icon: "⚕️"
    },
    {
      name: "Banking",
      description: "Complete preparation for Bank PO and Clerical exams with focus on reasoning, quant, and English.",
      features: [
        "Speed test modules",
        "Reasoning pattern practice",
        "Quantitative aptitude",
        "English comprehension",
        "Banking awareness"
      ],
      icon: "🏦"
    },
    {
      name: "CLAT",
      description: "Comprehensive law entrance preparation covering legal reasoning, logical reasoning, and English.",
      features: [
        "Legal reasoning practice",
        "Current affairs for law",
        "Reading comprehension",
        "Logical reasoning",
        "Vocabulary building"
      ],
      icon: "⚖️"
    },
    {
      name: "MBA",
      description: "CAT, XAT, and other MBA entrance preparation with focus on VARC, DILR, and Quant.",
      features: [
        "Data interpretation",
        "Logical reasoning",
        "Verbal ability",
        "Reading comprehension",
        "Quantitative aptitude"
      ],
      icon: "📊"
    },
    {
      name: "CUET",
      description: "Prepare for Common University Entrance Test with domain knowledge and general test preparation.",
      features: [
        "Domain subject preparation",
        "General test practice",
        "Language proficiency",
        "University-specific focus",
        "Mock tests and analysis"
      ],
      icon: "🎓"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50" id="exam-preparation">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-500">
            Exam Preparation Tailored to Your Goals
          </h2>
          <p className="text-lg text-gray-700">
            Sakha AI adapts to the specific requirements of your exam, providing personalized 
            learning paths that focus on your strengths and improve your weaknesses.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {exams.map((exam, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-purple-100 hover:border-purple-200"
            >
              <div className="text-4xl mb-4">{exam.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-violet-700">{exam.name}</h3>
              <p className="text-gray-600 mb-4">{exam.description}</p>
              
              <ul className="space-y-2">
                {exam.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-violet-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExamPreparationSection;

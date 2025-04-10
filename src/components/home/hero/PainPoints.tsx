
import { motion } from "framer-motion";
import { Clock, CheckCircle } from "lucide-react";

interface PainPointsProps {
  painPoints: string[];
  solutions: string[];
}

const PainPoints = ({ painPoints, solutions }: PainPointsProps) => {
  return (
    <div className="mb-8 bg-white/70 backdrop-blur-sm rounded-lg p-5 border border-violet-100 shadow-sm">
      <h3 className="font-semibold text-lg mb-3 text-violet-800">We understand your struggles:</h3>
      <ul className="space-y-2 mb-5">
        {painPoints.map((point, index) => (
          <motion.li 
            key={index}
            className="flex items-center gap-2 text-gray-700"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            <div className="bg-red-100 p-1 rounded-full">
              <Clock size={16} className="text-red-500" />
            </div>
            {point}
          </motion.li>
        ))}
      </ul>
      
      <h3 className="font-semibold text-lg mb-3 text-violet-800">How Sakha helps you:</h3>
      <ul className="space-y-2">
        {solutions.map((solution, index) => (
          <motion.li 
            key={index}
            className="flex items-center gap-2 text-gray-700"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + 0.1 * index, duration: 0.3 }}
          >
            <div className="bg-green-100 p-1 rounded-full">
              <CheckCircle size={16} className="text-green-500" />
            </div>
            {solution}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

// Default props
PainPoints.defaultProps = {
  painPoints: [
    "Overwhelming syllabus",
    "Time management issues",
    "Lack of personalized guidance",
    "Test anxiety",
    "Inconsistent progress tracking"
  ],
  solutions: [
    "Personalized study plans",
    "AI-powered tutoring",
    "Real-time progress tracking",
    "Mock tests with analysis",
    "Exam-specific strategies"
  ]
};

export default PainPoints;

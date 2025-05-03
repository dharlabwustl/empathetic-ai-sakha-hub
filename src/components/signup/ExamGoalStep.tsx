
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface ExamGoalStepProps {
  selectedExam: string;
  onExamSelect: (exam: string) => void;
}

const ExamGoalStep: React.FC<ExamGoalStepProps> = ({ selectedExam, onExamSelect }) => {
  // Only show NEET as exam option
  const exams = [
    {
      id: "NEET",
      name: "NEET",
      description: "National Eligibility cum Entrance Test for medical studies",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-medium flex items-center gap-2">
          <GraduationCap className="text-indigo-500" />
          Exam preparing for
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Select the exam you're preparing for
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        {exams.map((exam) => (
          <Button
            key={exam.id}
            onClick={() => onExamSelect(exam.id)}
            variant={selectedExam === exam.id ? "default" : "outline"}
            className={`h-auto py-6 justify-start text-left ${
              selectedExam === exam.id
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
            } transition-all`}
          >
            <div className="flex flex-col">
              <span className="text-lg font-medium">{exam.name}</span>
              <span className={`text-sm mt-1 ${selectedExam === exam.id ? "text-indigo-100" : "text-gray-500 dark:text-gray-400"}`}>
                {exam.description}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default ExamGoalStep;

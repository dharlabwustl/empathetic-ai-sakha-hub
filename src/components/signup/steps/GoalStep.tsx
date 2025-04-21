
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserGoal, UserRole } from "../OnboardingContext";

interface GoalStepProps {
  onGoalSelect: (goal: UserGoal) => void;
  selectedRole?: UserRole;
}

const GoalStep: React.FC<GoalStepProps> = ({ onGoalSelect, selectedRole }) => {
  const goals: { id: UserGoal; title: string; description: string; icon: string }[] = [
    {
      id: "IIT-JEE",
      title: "IIT-JEE",
      description: "Prepare for the Joint Entrance Examination",
      icon: "🎓"
    },
    {
      id: "NEET",
      title: "NEET",
      description: "National Eligibility cum Entrance Test for medical studies",
      icon: "⚕️"
    },
    {
      id: "GATE",
      title: "GATE",
      description: "Graduate Aptitude Test in Engineering",
      icon: "🔧"
    },
    {
      id: "CAT",
      title: "CAT",
      description: "Common Admission Test for MBA",
      icon: "📊"
    },
    {
      id: "UPSC",
      title: "UPSC",
      description: "Civil Services Examination",
      icon: "🏛️"
    },
    {
      id: "Bank Exams",
      title: "Bank Exams",
      description: "Various banking examinations",
      icon: "🏦"
    },
    {
      id: "Board Exams",
      title: "Board Exams",
      description: "CBSE, ICSE or State board examinations",
      icon: "📝"
    },
    {
      id: "Other",
      title: "Other",
      description: "Other competitive exams or certifications",
      icon: "🎯"
    }
  ];

  const handleSelect = (goalId: UserGoal) => {
    onGoalSelect(goalId);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">What is your goal?</h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
        Select the exam or certification you're preparing for
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border rounded-lg p-4 cursor-pointer hover:border-primary hover:bg-primary/5"
            onClick={() => handleSelect(goal.id)}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">{goal.icon}</div>
              <h3 className="font-medium text-lg">{goal.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {goal.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GoalStep;

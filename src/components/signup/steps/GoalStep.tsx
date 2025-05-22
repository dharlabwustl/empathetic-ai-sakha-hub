
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { UserGoal } from "../OnboardingContext";
import { Sparkles, GraduationCap, BookOpen, Scale, BarChart3 } from "lucide-react";
import { Card } from '@/components/ui/card';

interface GoalCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ title, description, icon, isSelected, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card
      className={`cursor-pointer transition-all p-4 border-2 ${
        isSelected
          ? "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-900/30"
          : "border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700/50"
      } rounded-lg`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div
          className={`p-3 rounded-full ${
            isSelected ? "bg-indigo-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
          }`}
        >
          {icon}
        </div>
        <div>
          <h3 className={`font-semibold ${isSelected ? "text-indigo-600 dark:text-indigo-400" : ""}`}>
            {title}
          </h3>
          <p className={`text-sm line-clamp-2 ${isSelected ? "text-indigo-700/80 dark:text-indigo-300/80" : "text-gray-500 dark:text-gray-400"}`}>
            {description}
          </p>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="mt-2 text-xs inline-flex items-center px-2 py-1 bg-indigo-100 dark:bg-indigo-800/60 text-indigo-700 dark:text-indigo-300 rounded-full"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Selected
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  </motion.div>
);

interface GoalStepProps {
  role: string;
  onGoalSelect: (goal: UserGoal) => void;
}

const GoalStep: React.FC<GoalStepProps> = ({ role, onGoalSelect }) => {
  const goals = [
    {
      id: UserGoal.NEET,
      title: "NEET",
      description: "Medical entrance preparation",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      id: UserGoal.JEE,
      title: "JEE",
      description: "Engineering entrance preparation",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: UserGoal.UPSC,
      title: "UPSC",
      description: "Civil services preparation",
      icon: <Scale className="h-5 w-5" />,
    },
    {
      id: UserGoal.CAT,
      title: "CAT",
      description: "Management entrance preparation",
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ];

  const [selectedGoal, setSelectedGoal] = React.useState<UserGoal | null>(UserGoal.NEET); // Default to NEET selected

  // Automatically proceed to the next step after selecting NEET
  useEffect(() => {
    // Slight delay to show the selection animation
    const timer = setTimeout(() => {
      if (selectedGoal === UserGoal.NEET) {
        onGoalSelect(UserGoal.NEET);
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, [selectedGoal, onGoalSelect]);

  const handleGoalSelect = (goal: UserGoal) => {
    setSelectedGoal(goal);
    // Only auto-proceed for NEET, other goals need manual confirmation
    if (goal !== UserGoal.NEET) {
      onGoalSelect(goal);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold">Select your exam goal</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          We'll tailor your learning plan based on your target exam
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {goals.map((goal, index) => (
          <GoalCard
            key={goal.id}
            title={goal.title}
            description={goal.description}
            icon={goal.icon}
            isSelected={selectedGoal === goal.id}
            onClick={() => handleGoalSelect(goal.id)}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400"
      >
        <p>NEET will be automatically selected for the demo</p>
      </motion.div>
    </div>
  );
};

export default GoalStep;

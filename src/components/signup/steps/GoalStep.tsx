
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Briefcase, GraduationCap, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { UserRole } from "@/types/user/base";

interface GoalStepProps {
  role: string;
  onGoalSelect: (goal: string) => void;
}

const GoalStep: React.FC<GoalStepProps> = ({ role = "Student", onGoalSelect }) => {
  let goals: { id: string; title: string; icon: React.ReactNode }[] = [];

  // Set goals based on user role
  switch (role) {
    case UserRole.Student:
    case "Student":
      goals = [
        { id: "IIT-JEE", title: "JEE (Main & Advanced)", icon: <GraduationCap size={24} /> },
        { id: "NEET", title: "NEET", icon: <GraduationCap size={24} /> },
        { id: "UPSC", title: "UPSC", icon: <GraduationCap size={24} /> },
        { id: "CAT", title: "CAT", icon: <GraduationCap size={24} /> },
        { id: "GATE", title: "GATE", icon: <GraduationCap size={24} /> },
        { id: "CBSE-12", title: "CBSE Class 12", icon: <BookOpen size={24} /> },
        { id: "CBSE-10", title: "CBSE Class 10", icon: <BookOpen size={24} /> },
        { id: "Other", title: "Other Exam", icon: <BookOpen size={24} /> }
      ];
      break;
    case UserRole.Teacher:
    case "Teacher":
      goals = [
        { id: "TeachIITJEE", title: "Teach JEE", icon: <Briefcase size={24} /> },
        { id: "TeachNEET", title: "Teach NEET", icon: <Briefcase size={24} /> },
        { id: "TeachUPSC", title: "Teach UPSC", icon: <Briefcase size={24} /> },
        { id: "K12Teaching", title: "K-12 Teaching", icon: <UserPlus size={24} /> },
        { id: "OtherTeach", title: "Other Teaching", icon: <Briefcase size={24} /> }
      ];
      break;
    default:
      goals = [
        { id: "IIT-JEE", title: "JEE (Main & Advanced)", icon: <GraduationCap size={24} /> },
        { id: "NEET", title: "NEET", icon: <GraduationCap size={24} /> },
        { id: "UPSC", title: "UPSC", icon: <GraduationCap size={24} /> },
        { id: "Other", title: "Other Exam", icon: <BookOpen size={24} /> }
      ];
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <motion.div variants={item}>
        <h2 className="text-2xl font-semibold text-center mb-2">
          What's your goal?
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          {role === UserRole.Student || role === "Student"
            ? "Select the exam you're preparing for"
            : "What would you like to use Sakha AI for?"}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {goals.map((goal) => (
          <motion.div key={goal.id} variants={item}>
            <Button
              variant="outline"
              className="w-full h-auto py-6 px-4 flex flex-col items-center justify-center gap-3 hover:bg-primary/5 hover:border-primary/30 transition-all group"
              onClick={() => onGoalSelect(goal.id)}
            >
              <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                {goal.icon}
              </div>
              <span className="text-lg font-medium">{goal.title}</span>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GoalStep;


import React from "react";
import { Card } from "@/components/ui/card";
import { UserRole } from "@/components/signup/OnboardingContext";
import { motion } from "framer-motion";

interface GoalSelectionProps {
  onSelect: (goal: string) => void;
  selectedRole: UserRole;
}

const GoalSelection: React.FC<GoalSelectionProps> = ({ onSelect, selectedRole }) => {
  // Define goals based on selected role
  const goals = getGoalsForRole(selectedRole);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Select Your Goal</h3>
      <p className="text-sm text-muted-foreground mb-6">
        What are you preparing for?
      </p>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {goals.map((goal) => (
          <motion.div key={goal.id} variants={itemVariants} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Card
              className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => onSelect(goal.title)}
            >
              <div className="flex items-center gap-3">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${goal.bgColor}`}
                >
                  <img
                    src={goal.icon}
                    alt={goal.title}
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{goal.title}</h4>
                  <p className="text-xs text-muted-foreground">{goal.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// Helper to get goals based on role
const getGoalsForRole = (role: UserRole) => {
  switch (role) {
    case UserRole.Student:
      return [
        {
          id: "jee",
          title: "IIT-JEE",
          description: "Prepare for Indian Institutes of Technology entrance exam",
          icon: "/assets/icons/engineering.svg",
          bgColor: "bg-gradient-to-br from-blue-500 to-violet-500"
        },
        {
          id: "neet",
          title: "NEET",
          description: "Prepare for medical entrance exams",
          icon: "/assets/icons/medicine.svg",
          bgColor: "bg-gradient-to-br from-emerald-500 to-teal-500"
        },
        {
          id: "boards",
          title: "Board Exams",
          description: "Prepare for 10th & 12th grade exams",
          icon: "/assets/icons/education.svg",
          bgColor: "bg-gradient-to-br from-amber-500 to-orange-500"
        },
        {
          id: "upsc",
          title: "UPSC",
          description: "Prepare for civil services examination",
          icon: "/assets/icons/government.svg",
          bgColor: "bg-gradient-to-br from-red-500 to-rose-500"
        },
        {
          id: "banking",
          title: "Banking",
          description: "Prepare for bank PO and clerk exams",
          icon: "/assets/icons/finance.svg",
          bgColor: "bg-gradient-to-br from-green-500 to-lime-500"
        },
        {
          id: "gate",
          title: "GATE",
          description: "Prepare for graduate aptitude test in engineering",
          icon: "/assets/icons/technology.svg",
          bgColor: "bg-gradient-to-br from-purple-500 to-fuchsia-500"
        },
        {
          id: "cat",
          title: "CAT",
          description: "Prepare for common admission test for MBA",
          icon: "/assets/icons/business.svg",
          bgColor: "bg-gradient-to-br from-cyan-500 to-sky-500"
        },
        {
          id: "general",
          title: "General Study",
          description: "General academic improvement and knowledge building",
          icon: "/assets/icons/learning.svg",
          bgColor: "bg-gradient-to-br from-indigo-500 to-blue-500"
        }
      ];
    case UserRole.Employee:
      return [
        {
          id: "skills",
          title: "Skill Development",
          description: "Enhance professional skills",
          icon: "/assets/icons/skills.svg",
          bgColor: "bg-gradient-to-br from-blue-500 to-indigo-500"
        },
        {
          id: "certification",
          title: "Professional Certification",
          description: "Prepare for industry certifications",
          icon: "/assets/icons/certificate.svg",
          bgColor: "bg-gradient-to-br from-emerald-500 to-green-500"
        }
      ];
    case UserRole.Doctor:
      return [
        {
          id: "specialization",
          title: "Medical Specialization",
          description: "Advanced training in specialized fields",
          icon: "/assets/icons/health.svg",
          bgColor: "bg-gradient-to-br from-teal-500 to-cyan-500"
        },
        {
          id: "research",
          title: "Medical Research",
          description: "Research in healthcare and medicine",
          icon: "/assets/icons/research.svg",
          bgColor: "bg-gradient-to-br from-violet-500 to-purple-500"
        }
      ];
    case UserRole.Founder:
      return [
        {
          id: "startup",
          title: "Startup Growth",
          description: "Accelerate startup development",
          icon: "/assets/icons/startup.svg",
          bgColor: "bg-gradient-to-br from-amber-500 to-yellow-500"
        },
        {
          id: "funding",
          title: "Investor Pitch",
          description: "Prepare for investor meetings and funding",
          icon: "/assets/icons/investment.svg",
          bgColor: "bg-gradient-to-br from-rose-500 to-red-500"
        }
      ];
    default:
      return [
        {
          id: "general",
          title: "General Study",
          description: "General academic improvement and knowledge building",
          icon: "/assets/icons/learning.svg",
          bgColor: "bg-gradient-to-br from-indigo-500 to-blue-500"
        }
      ];
  }
};

export default GoalSelection;

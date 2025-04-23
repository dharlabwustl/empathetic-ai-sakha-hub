
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, BookOpen, Users, Lightbulb, Clock, Calendar } from "lucide-react";

type PersonalityType = string;

interface PersonalityStepProps {
  onSelect: (personality: PersonalityType) => void;
}

const PersonalityStep: React.FC<PersonalityStepProps> = ({ onSelect }) => {
  const personalities = [
    {
      id: "analytical",
      title: "The Analytical Thinker",
      description: "You solve problems methodically with detailed reasoning and logic",
      icon: <Brain className="h-6 w-6 mb-4 text-blue-500" />,
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:border-blue-800",
    },
    {
      id: "creative",
      title: "The Creative Learner",
      description: "You thrive with visual aids, metaphors, and abstract concepts",
      icon: <Lightbulb className="h-6 w-6 mb-4 text-amber-500" />,
      color: "bg-amber-50 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/20 dark:border-amber-800",
    },
    {
      id: "practical",
      title: "The Practical Applier",
      description: "You learn best through hands-on examples and real-world applications",
      icon: <BookOpen className="h-6 w-6 mb-4 text-green-500" />,
      color: "bg-green-50 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-800",
    },
    {
      id: "social",
      title: "The Collaborative Learner",
      description: "You excel in group settings with discussion and peer teaching",
      icon: <Users className="h-6 w-6 mb-4 text-violet-500" />,
      color: "bg-violet-50 border-violet-200 hover:bg-violet-100 dark:bg-violet-900/20 dark:border-violet-800",
    },
    {
      id: "structured",
      title: "The Systematic Planner",
      description: "You prefer well-organized, structured learning with clear schedules",
      icon: <Calendar className="h-6 w-6 mb-4 text-red-500" />,
      color: "bg-red-50 border-red-200 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800",
    },
    {
      id: "flexible",
      title: "The Adaptive Navigator",
      description: "You thrive with flexible, self-paced learning and varied approaches",
      icon: <Clock className="h-6 w-6 mb-4 text-indigo-500" />,
      color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Your Learning Personality</h2>
        <p className="text-muted-foreground mt-2">
          Select the learning style that best matches how you prefer to study
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {personalities.map((personality, index) => (
          <motion.div
            key={personality.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card 
              className={`cursor-pointer border-2 ${personality.color}`} 
              onClick={() => onSelect(personality.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center">
                  {personality.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{personality.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {personality.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button 
          variant="link" 
          onClick={() => onSelect("unsure")}
          className="text-primary hover:text-primary/80"
        >
          I'm not sure, help me decide
        </Button>
      </div>
    </div>
  );
};

export default PersonalityStep;

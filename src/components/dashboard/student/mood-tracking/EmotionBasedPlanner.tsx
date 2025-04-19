
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useMoodContext } from "@/contexts/MoodContext";
import { Brain, Timer, Target } from "lucide-react";
import { motion } from "framer-motion";

const EmotionBasedPlanner = () => {
  const { currentMood } = useMoodContext();
  
  const getPlanByMood = () => {
    switch (currentMood) {
      case "motivated":
      case "focused":
        return {
          intensity: "High",
          duration: 45,
          breakInterval: 25,
          tasks: ["Complex problem solving", "New concept introduction", "Advanced practice"]
        };
      case "tired":
      case "stressed":
        return {
          intensity: "Low",
          duration: 20,
          breakInterval: 15,
          tasks: ["Review familiar topics", "Simple exercises", "Short quizzes"]
        };
      default:
        return {
          intensity: "Medium",
          duration: 30,
          breakInterval: 20,
          tasks: ["Mixed difficulty tasks", "Balanced review", "Moderate practice"]
        };
    }
  };

  const plan = getPlanByMood();

  return (
    <Card>
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Adaptive Study Plan</h3>
              <p className="text-sm text-muted-foreground">
                Tailored to your current state of mind
              </p>
            </div>
            <Button variant="outline" size="sm">
              Adjust Plan
            </Button>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
              <Brain className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Intensity</span>
                  <span>{plan.intensity}</span>
                </div>
                <Progress value={
                  plan.intensity === "High" ? 90 :
                  plan.intensity === "Medium" ? 60 : 30
                } className="mt-2" />
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
              <Timer className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Session Duration</span>
                  <span>{plan.duration} minutes</span>
                </div>
                <Progress value={(plan.duration / 45) * 100} className="mt-2" />
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
              <Target className="h-5 w-5 text-purple-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Break Interval</span>
                  <span>Every {plan.breakInterval} minutes</span>
                </div>
                <Progress value={(plan.breakInterval / 25) * 100} className="mt-2" />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Recommended Tasks</h4>
            <ul className="space-y-2">
              {plan.tasks.map((task, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  {task}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default EmotionBasedPlanner;

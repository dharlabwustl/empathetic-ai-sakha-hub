
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useMoodContext } from "@/contexts/MoodContext";
import { Lightbulb, BookOpen, Coffee, Star } from "lucide-react";
import { motion } from "framer-motion";

const EmotionalContentDelivery = () => {
  const { currentMood } = useMoodContext();
  
  const getContentByMood = () => {
    switch (currentMood) {
      case "happy":
      case "motivated":
        return {
          title: "Keep the Momentum Going!",
          items: [
            { icon: <Star className="text-yellow-500" />, text: "Challenge: Try our advanced practice questions" },
            { icon: <Lightbulb className="text-blue-500" />, text: "New feature unlocked: Competitive mode" },
            { icon: <BookOpen className="text-green-500" />, text: "Explore complex topics in your strong subjects" }
          ]
        };
        
      case "tired":
      case "stressed":
        return {
          title: "Let's Take It Easy",
          items: [
            { icon: <Coffee className="text-amber-500" />, text: "Quick 5-minute mindfulness exercise" },
            { icon: <BookOpen className="text-blue-500" />, text: "Review familiar topics with our bite-sized lessons" },
            { icon: <Star className="text-purple-500" />, text: "Remember: Small steps lead to big achievements" }
          ]
        };
        
      default:
        return {
          title: "Your Personalized Learning Path",
          items: [
            { icon: <Lightbulb className="text-yellow-500" />, text: "Mix of easy and challenging content" },
            { icon: <BookOpen className="text-blue-500" />, text: "Suggested topics based on your progress" },
            { icon: <Star className="text-purple-500" />, text: "Set your pace and goals" }
          ]
        };
    }
  };
  
  const content = getContentByMood();
  
  return (
    <Card>
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-medium mb-4">{content.title}</h3>
          <div className="space-y-4">
            {content.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-muted rounded-lg"
              >
                {item.icon}
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default EmotionalContentDelivery;

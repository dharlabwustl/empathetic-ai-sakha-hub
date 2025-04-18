
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag, CheckCircle, Clock, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ConceptCardProps {
  title: string;
  description: string;
  difficultyLevel: "Easy" | "Medium" | "Hard" | "Expert";
  estimatedTime: string;
  onMarkComplete: () => void;
  onView: () => void;
  isCompleted?: boolean;
  progress?: number;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  title,
  description,
  difficultyLevel,
  estimatedTime,
  onMarkComplete,
  onView,
  isCompleted = false,
  progress = 0,
}) => {
  const [completed, setCompleted] = useState(isCompleted);
  const { toast } = useToast();

  const handleMarkComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCompleted(!completed);
    onMarkComplete();
    
    toast({
      title: completed ? "Concept marked as incomplete" : "Concept marked as complete",
      description: `"${title}" has been updated in your progress.`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700 border-green-200";
      case "Medium":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Hard":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Expert":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`cursor-pointer hover:shadow-md transition-all ${completed ? 'bg-gray-50 border-green-200 dark:bg-gray-800/50' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <Badge variant="outline" className={`${getDifficultyColor(difficultyLevel)}`}>
              <Tag className="h-3 w-3 mr-1" />
              {difficultyLevel}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{description}</p>
          
          <div className="flex items-center mt-3 text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span>{estimatedTime}</span>
          </div>
          
          {progress > 0 && !completed && (
            <div className="mt-3">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <div className="text-xs text-right mt-1 text-gray-500">
                {progress}% complete
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between pt-1">
          <Button 
            variant={completed ? "outline" : "ghost"} 
            size="sm"
            className={`${completed ? 'text-green-600 border-green-200' : ''}`}
            onClick={handleMarkComplete}
          >
            <CheckCircle className={`h-4 w-4 mr-1 ${completed ? 'fill-green-600' : ''}`} />
            {completed ? "Completed" : "Mark Complete"}
          </Button>
          <Button variant="outline" size="sm" onClick={onView}>
            <BookOpen className="h-4 w-4 mr-1" />
            View
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ConceptCard;

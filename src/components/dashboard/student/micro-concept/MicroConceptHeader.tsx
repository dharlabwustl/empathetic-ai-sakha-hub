
import React from "react";
import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrainCog, CheckCircle } from "lucide-react";

interface MicroConceptHeaderProps {
  title: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  isCompleted: boolean;
}

export const MicroConceptHeader: React.FC<MicroConceptHeaderProps> = ({
  title,
  subject,
  difficulty,
  isCompleted
}) => {
  // Get difficulty color
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-between items-start">
      <div>
        <CardTitle className="flex items-center text-lg sm:text-xl">
          {isCompleted ? (
            <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
          ) : (
            <BrainCog className="mr-2 h-5 w-5 text-violet-600" />
          )}
          {title}
        </CardTitle>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className="bg-violet-100 text-violet-700 border-violet-200">
            {subject}
          </Badge>
          <Badge variant="outline" className={getDifficultyColor()}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
          {isCompleted && (
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
              Completed
            </Badge>
          )}
        </div>
      </div>
      <Button variant="outline" size="sm" className="hover:bg-violet-100 hover:text-violet-700">
        Save for Later
      </Button>
    </div>
  );
};

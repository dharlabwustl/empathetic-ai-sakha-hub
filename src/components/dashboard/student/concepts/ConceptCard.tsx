import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Check, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConceptCardProps {
  concept: {
    id: string;
    title: string;
    subject: string;
    chapter: string;
    status: "completed" | "in-progress" | "not-started";
    difficulty: "easy" | "medium" | "hard";
    timeEstimate: number;
    mastery: number;
    priority: number;
    cardCount: number;
    isRecommended: boolean;
  };
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept }) => {
  const navigate = useNavigate();

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed":
        return { color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: Check, text: "Completed" };
      case "in-progress":
        return { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Clock, text: "In Progress" };
      case "not-started":
        return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: BookOpen, text: "Not Started" };
      default:
        return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: BookOpen, text: "Unknown" };
    }
  };

  const getDifficultyInfo = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return { color: "bg-green-100 text-green-800 border-green-200", text: "Easy" };
      case "medium":
        return { color: "bg-yellow-100 text-yellow-800 border-yellow-200", text: "Medium" };
      case "hard":
        return { color: "bg-red-100 text-red-800 border-red-200", text: "Hard" };
      default:
        return { color: "bg-gray-100 text-gray-800 border-gray-200", text: "Unknown" };
    }
  };

  const getButtonLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Review Again";
      case "in-progress":
        return "Continue Learning";
      default:
        return "Start Learning";
    }
  };

  const handleOpenConceptStudy = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}/study`);
  };

  const statusInfo = getStatusInfo(concept.status);
  const difficultyInfo = getDifficultyInfo(concept.difficulty);
  const StatusIcon = statusInfo.icon;

  return (
    <Card className="h-full flex flex-col transform hover:scale-[1.01] transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{concept.title}</CardTitle>
          {concept.isRecommended && (
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
              <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
              Recommended
            </Badge>
          )}
        </div>
        <CardDescription className="flex flex-wrap gap-2 mt-1">
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            {concept.subject}
          </Badge>
          <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
            {concept.chapter}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className={statusInfo.color}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusInfo.text}
          </Badge>
          <Badge variant="outline" className={difficultyInfo.color}>
            {difficultyInfo.text}
          </Badge>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Mastery</span>
            <span>{concept.mastery}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                concept.mastery >= 80 
                  ? "bg-emerald-500" 
                  : concept.mastery >= 40 
                    ? "bg-yellow-500" 
                    : "bg-red-500"
              }`} 
              style={{ width: `${concept.mastery}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{concept.timeEstimate} min</span>
          <span className="mx-2">•</span>
          <BookOpen className="h-4 w-4" />
          <span>{concept.cardCount} cards</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          onClick={() => handleOpenConceptStudy(concept.id)}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          {getButtonLabel(concept.status)}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConceptCard;

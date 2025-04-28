import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Check, Clock } from "lucide-react";
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
    cardCount: number;
    isRecommended?: boolean;
  };
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept }) => {
  const navigate = useNavigate();

  const handleOpenConceptStudy = (conceptId: string) => {
    navigate(`/concepts/study/${conceptId}`);
  };

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

  return (
    <Card className="h-full flex flex-col transform hover:scale-[1.01] transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{concept.title}</CardTitle>
          {concept.isRecommended && (
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
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
          <Badge variant="outline" className={getStatusInfo(concept.status).color}>
            {getStatusInfo(concept.status).text}
          </Badge>
          <Badge variant="outline" className={getDifficultyInfo(concept.difficulty).color}>
            {getDifficultyInfo(concept.difficulty).text}
          </Badge>
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

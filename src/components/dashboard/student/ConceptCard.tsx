
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ArrowRight, ArrowLeft, Calculator } from "lucide-react";
import { MouseClickEvent } from '@/types/user';

interface ConceptCardProps {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  progress?: number;
  relatedConcepts?: string[];
  onView?: () => void;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  id,
  title,
  description,
  subject,
  difficulty,
  completed = false,
  progress = 0,
  relatedConcepts = [],
  onView
}) => {
  const navigate = useNavigate();
  
  const difficultyColors = {
    'easy': 'bg-green-100 text-green-800 border-green-200',
    'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'hard': 'bg-red-100 text-red-800 border-red-200'
  };

  const handleCardClick = () => {
    // Navigate directly to concept card detail page
    if (onView) {
      onView();
    } else {
      navigate(`/dashboard/student/concepts/card/${id}`);
    }
  };

  const handleStudyClick = (e: MouseClickEvent) => {
    // Prevent the parent card click handler from being called
    e.preventDefault();
    e.stopPropagation();
    
    // Navigate directly to the concept card detail
    navigate(`/dashboard/student/concepts/card/${id}`);
  };
  
  const handleFormulaLabClick = (e: MouseClickEvent) => {
    // Prevent the parent card click handler from being called
    e.preventDefault();
    e.stopPropagation();
    
    // Navigate to formula lab
    navigate(`/dashboard/student/concepts/${id}/formula-lab`);
  };

  const handleBackToDashboard = (e: MouseClickEvent) => {
    // Prevent the parent card click handler from being called
    e.preventDefault();
    e.stopPropagation();
    
    // Navigate back to the dashboard
    navigate('/dashboard/student');
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 overflow-hidden border-2 border-gray-100">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={`${difficultyColors[difficulty]} capitalize`}>
            {difficulty}
          </Badge>
          {completed && (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
              Completed
            </Badge>
          )}
        </div>
        <CardTitle 
          className="text-lg font-semibold mt-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={handleCardClick}
        >
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {subject}
        </p>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3">
          {description}
        </p>
        
        {progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {relatedConcepts && relatedConcepts.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-1">Related Concepts:</p>
            <div className="flex flex-wrap gap-1">
              {relatedConcepts.map((concept, i) => (
                <Badge key={i} variant="outline" className="text-xs bg-gray-50">
                  {concept}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 flex flex-col gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="w-full flex justify-center items-center gap-1"
          onClick={handleBackToDashboard}
        >
          <ArrowLeft className="h-4 w-4" /> 
          Back to Dashboard
        </Button>
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button 
            variant="default" 
            className="w-full group"
            onClick={handleStudyClick}
          >
            <BookOpen className="mr-2 h-4 w-4" /> 
            <span className="hidden sm:inline">Study</span>
            <span className="sm:hidden">Study</span>
          </Button>
          <Button 
            variant="outline" 
            className="w-full group border-blue-200 text-blue-700 hover:bg-blue-50"
            onClick={handleFormulaLabClick}
          >
            <Calculator className="mr-2 h-4 w-4" /> 
            <span className="hidden sm:inline">Formula Lab</span>
            <span className="sm:hidden">Formulas</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ConceptCard;

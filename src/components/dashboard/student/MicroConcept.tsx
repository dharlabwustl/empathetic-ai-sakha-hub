
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Check, 
  BookOpen, 
  Award, 
  HelpCircle, 
  ThumbsUp, 
  MessageSquare,
  ArrowRight
} from "lucide-react";

interface MicroConceptProps {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: number; // in minutes
  content: string;
  resourceType?: "Video" | "Text" | "PDF"; // Added resourceType
  resourceUrl?: string; // Added resourceUrl
  onComplete: (id: string) => void;
  onNeedHelp: (id: string) => void;
}

const MicroConcept = ({
  id,
  title,
  subject,
  chapter,
  difficulty,
  estimatedTime,
  content,
  resourceType,
  resourceUrl,
  onComplete,
  onNeedHelp
}: MicroConceptProps) => {
  const [expanded, setExpanded] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const getDifficultyColor = () => {
    switch(difficulty) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleGotIt = () => {
    setUnderstood(true);
    onComplete(id);
    
    toast({
      title: "Concept Completed!",
      description: "Great job! Moving to the next concept.",
    });
    
    // Navigate to next concept after a short delay
    setTimeout(() => {
      navigate("/dashboard/student/concept/next");
    }, 1500);
  };
  
  const handleNeedHelp = () => {
    onNeedHelp(id);
    navigate(`/dashboard/student/tutor?conceptId=${id}&from=concept&back=true`);
  };

  const handleAITutorHelp = () => {
    toast({
      title: "Connecting to AI Tutor",
      description: "Opening 24/7 AI Tutor chat with this concept...",
    });
    navigate(`/dashboard/student/tutor?conceptId=${id}&topic=${encodeURIComponent(title)}&subject=${encodeURIComponent(subject)}`);
  };

  return (
    <Card className={`shadow-md transition-all duration-300 ${understood ? 'border-l-4 border-l-green-500' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            <div className="text-sm text-muted-foreground">
              {subject} · {chapter}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="outline" className={`flex items-center gap-1 ${getDifficultyColor()}`}>
              <Award className="h-4 w-4" />
              {difficulty}
            </Badge>
            
            <Badge variant="outline" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {estimatedTime} min
            </Badge>

            {resourceType && (
              <Badge variant="outline" className="flex items-center gap-1">
                {resourceType}
              </Badge>
            )}
          </div>
        </div>

        {expanded && (
          <div className="mt-4 space-y-4 animate-fade-in">
            <p className="text-sm text-gray-600">{content}</p>
            
            {resourceUrl && resourceType && (
              <div className="mt-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={resourceUrl} target="_blank" rel="noopener noreferrer">
                    View {resourceType} Resource
                  </a>
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t bg-gray-50 p-3 flex flex-wrap gap-2">
        {understood ? (
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-600">
              <Check className="h-5 w-5" />
              <span>Concept Understood</span>
            </div>
            <Button 
              variant="outline"
              size="sm"
              className="text-green-600"
              onClick={() => navigate("/dashboard/student/concept/next")}
            >
              Next Concept
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Collapse" : "Expand"}
            </Button>

            {expanded && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleAITutorHelp}
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  24/7 AI Tutor
                </Button>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleNeedHelp}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Need Help
                </Button>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleGotIt}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Got It!
                </Button>
              </>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default MicroConcept;

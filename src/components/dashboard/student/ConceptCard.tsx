import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle2, BookOpen, Tag, Brain, Star, Lock, CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

export interface ConceptCardProps {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'advanced';
  completed: boolean;
  progress: number;
  isLocked?: boolean;
  isPremium?: boolean;
  onToggleComplete?: (id: string, completed: boolean) => void;
  onView?: (id: string) => void;
  relatedConcepts?: string[];
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  id,
  title,
  description,
  subject,
  difficulty,
  completed,
  progress,
  isLocked = false,
  isPremium = false,
  onToggleComplete,
  onView,
  relatedConcepts = []
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'hard':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'advanced':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  const getSubjectColor = () => {
    const colors: Record<string, string> = {
      'Physics': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'Chemistry': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Mathematics': 'bg-violet-100 text-violet-700 border-violet-200',
      'Biology': 'bg-rose-100 text-rose-700 border-rose-200',
      'English': 'bg-cyan-100 text-cyan-700 border-cyan-200',
      'History': 'bg-amber-100 text-amber-700 border-amber-200',
      'Geography': 'bg-lime-100 text-lime-700 border-lime-200'
    };
    
    return colors[subject] || 'bg-gray-100 text-gray-700 border-gray-200';
  };
  
  const handleMarkComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleComplete && !isLocked) {
      onToggleComplete(id, !completed);
    }
  };
  
  const handleView = () => {
    if (onView && !isLocked) {
      onView(id);
    }
  };
  
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)', transition: { duration: 0.2 } }
  };
  
  return (
    <TooltipProvider>
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover={!isLocked ? "hover" : undefined}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative ${completed ? 'border-l-4 border-green-500' : ''} ${isLocked ? 'opacity-80' : ''}`}
      >
        <Card className={`overflow-hidden h-full ${isLocked ? 'bg-gray-50 dark:bg-gray-800/50' : ''}`}>
          {isPremium && (
            <div className="absolute top-2 right-2 z-10">
              <Badge variant="outline" className="bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 border-amber-300">
                Premium
              </Badge>
            </div>
          )}
          
          {isLocked && (
            <div className="absolute inset-0 bg-gray-200/60 dark:bg-gray-700/60 backdrop-blur-[1px] flex items-center justify-center z-20">
              <div className="text-center">
                <Lock className="h-10 w-10 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400 font-medium">Locked</p>
              </div>
            </div>
          )}
          
          <div className="absolute top-0 left-0 w-full h-1">
            <div className="h-full bg-gradient-to-r from-indigo-300 to-violet-300" style={{ width: `${progress}%` }}></div>
          </div>
          
          <CardHeader className="space-y-1 pb-2">
            <div className="flex justify-between items-start">
              <div className="flex gap-1 flex-wrap">
                <Badge variant="outline" className={getSubjectColor()}>
                  {subject}
                </Badge>
                <Badge variant="outline" className={getDifficultyColor()}>
                  <Tag className="h-3 w-3 mr-1" />
                  {difficulty}
                </Badge>
              </div>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-6 w-6 rounded-full ${completed ? 'text-green-600' : 'text-gray-400'}`}
                    onClick={handleMarkComplete}
                    disabled={isLocked}
                  >
                    {completed ? (
                      <CheckCircle className="h-5 w-5 fill-green-100" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{completed ? 'Mark as incomplete' : 'Mark as complete'}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{title}</h3>
              <Badge variant="outline" className="text-xs">
                {difficulty.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center text-xs text-muted-foreground">
                <Brain className="h-3.5 w-3.5 mr-1" />
                <div className="flex items-center">
                  Progress: 
                  <span className="font-medium ml-1">{progress}%</span>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-xs group"
                onClick={handleView}
                disabled={isLocked}
              >
                <BookOpen className="h-3.5 w-3.5 mr-1 group-hover:text-primary" />
                View
              </Button>
            </div>
            
            <Button
              variant={completed ? "outline" : "default"}
              size="sm"
              className={`w-full text-xs ${completed ? 'text-green-600 border-green-200 hover:bg-green-50' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
              onClick={handleMarkComplete}
              disabled={isLocked}
            >
              {completed ? (
                <>
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Completed
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  Mark as Complete
                </>
              )}
            </Button>
            
            {relatedConcepts && relatedConcepts.length > 0 && (
              <div className="w-full space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Related Concepts:</p>
                <div className="flex flex-wrap gap-2">
                  {relatedConcepts.map((conceptId) => (
                    <Button
                      key={conceptId}
                      variant="outline"
                      size="sm"
                      className="text-xs hover:bg-muted"
                      onClick={(e) => {
                        e.stopPropagation();
                        onView?.(conceptId);
                      }}
                    >
                      View Related
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardFooter>
        </Card>
        
        {completed && !isLocked && (
          <motion.div
            className="absolute -top-2 -right-2 z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Badge className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center p-0">
              <CheckCircle className="h-4 w-4 text-white" />
            </Badge>
          </motion.div>
        )}
      </motion.div>
    </TooltipProvider>
  );
};

export default ConceptCard;

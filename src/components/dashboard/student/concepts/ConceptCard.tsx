
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConceptCardProps {
  id: string;
  title: string;
  subject?: string;
  description?: string;
  progress?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  isLocked?: boolean;
  lastStudied?: string;
  href?: string;
  variant?: 'default' | 'compact';
  onClick?: () => void;
}

const ConceptCard = ({
  id,
  title,
  subject,
  description,
  progress = 0,
  difficulty = 'medium',
  isLocked = false,
  lastStudied,
  href,
  variant = 'default',
  onClick,
}: ConceptCardProps) => {
  // Calculate how many days ago it was last studied
  const getDaysAgo = () => {
    if (!lastStudied) return null;
    
    const lastDate = new Date(lastStudied);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };
  
  // Format the card content
  const cardContent = (
    <CardContent className={cn(
      "p-4 flex flex-col h-full transition-all duration-200",
      isLocked ? "opacity-75 grayscale" : "hover:shadow-md",
      "group"
    )}>
      <div className="flex items-start justify-between mb-3">
        {/* Subject Tag */}
        {subject && (
          <Badge 
            variant="outline" 
            className={cn(
              "px-2 py-0.5 text-xs capitalize font-normal",
              difficulty === 'easy' ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400' :
              difficulty === 'medium' ? 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
              'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400'
            )}
          >
            {subject}
          </Badge>
        )}
        
        {/* Difficulty Badge */}
        <Badge 
          variant="outline" 
          className={cn(
            "ml-auto px-2 py-0.5 text-xs capitalize font-normal",
            difficulty === 'easy' ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400' :
            difficulty === 'medium' ? 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
            'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400'
          )}
        >
          {difficulty}
        </Badge>
      </div>
      
      {/* Icon with Title */}
      <div className="flex items-center gap-2 mb-1.5">
        <div className={cn(
          "p-1.5 rounded-md flex items-center justify-center",
          difficulty === 'easy' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
          difficulty === 'medium' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
          'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
        )}>
          <BookOpen className="h-4 w-4" />
        </div>
        <h3 className={cn(
          "font-medium text-base flex-1",
          isLocked && "text-muted-foreground"
        )}>
          {title}
        </h3>
      </div>
      
      {/* Description */}
      {description && variant !== 'compact' && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>
      )}
      
      {/* Progress Bar */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">
            {isLocked ? (
              <span className="flex items-center">
                <Lock className="h-3 w-3 mr-1" />
                <span>Locked</span>
              </span>
            ) : (
              <span>Progress</span>
            )}
          </span>
          {!isLocked && (
            <span className="text-xs font-medium">{progress}%</span>
          )}
        </div>
        <Progress 
          value={isLocked ? 0 : progress} 
          className={cn(
            "h-1.5 bg-gray-100 dark:bg-gray-800",
            isLocked && "opacity-50"
          )}
        />
      </div>
      
      {/* Last Studied */}
      {lastStudied && !isLocked && (
        <div className="text-xs text-muted-foreground mt-2">
          Last studied {getDaysAgo()}
        </div>
      )}
      
      {/* Lock Overlay for locked content */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 dark:bg-black/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
          <div className="flex flex-col items-center bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium mt-1">Premium Content</span>
          </div>
        </div>
      )}
    </CardContent>
  );
  
  // Add styled hover state
  const cardStyles = {
    position: "relative",
    overflow: "hidden",
    height: "100%", 
    transition: "all 0.3s ease",
    borderRadius: "1rem",
    background: "transparent",
  } as React.CSSProperties;

  return (
    <Card className="overflow-hidden group border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-850 h-full">
      {href ? (
        <Link to={href} className="h-full block" onClick={onClick}>
          {cardContent}
        </Link>
      ) : (
        <div onClick={onClick} className={cn("h-full cursor-pointer", !onClick && "cursor-default")}>
          {cardContent}
        </div>
      )}
    </Card>
  );
};

export default ConceptCard;

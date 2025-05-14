
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Star, Clock, BookOpen } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from '@/lib/utils';

interface ConceptCardProps {
  id: string;
  title: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  progress: number;
  totalVideos: number;
  estimatedTime: string;
  tags: string[];
  isPremium?: boolean;
  isRecommended?: boolean;
}

const difficultyColors = {
  easy: "bg-green-500",
  medium: "bg-yellow-500",
  hard: "bg-red-500",
};

const subjectColors = {
  Physics: "bg-blue-600 hover:bg-blue-700",
  Chemistry: "bg-purple-600 hover:bg-purple-700",
  Biology: "bg-green-600 hover:bg-green-700",
  Mathematics: "bg-red-600 hover:bg-red-700",
  English: "bg-amber-600 hover:bg-amber-700",
  Science: "bg-cyan-600 hover:bg-cyan-700",
  default: "bg-slate-600 hover:bg-slate-700"
};

export const ConceptCard = ({
  id,
  title,
  subject,
  difficulty,
  progress,
  totalVideos,
  estimatedTime,
  tags,
  isPremium = false,
  isRecommended = false
}: ConceptCardProps) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/dashboard/student/concepts/card/${id}`);
  };
  
  // Determine subject color
  const subjectColor = subjectColors[subject as keyof typeof subjectColors] || subjectColors.default;
  
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={handleCardClick}
      className="cursor-pointer"
    >
      <Card className="h-full overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 rounded-xl">
        <div className="p-5 flex flex-col h-full">
          {/* Card header with subject and difficulty */}
          <div className="flex justify-between items-center mb-4">
            <Badge className={`font-medium ${subjectColor}`}>
              {subject}
            </Badge>
            <div className={`w-3 h-3 rounded-full ${difficultyColors[difficulty]}`} 
              title={`Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`} />
          </div>
          
          {/* Card Title */}
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 my-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Progress section */}
          <div className="mt-auto">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
          
          {/* Footer info */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              <span>{estimatedTime}</span>
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{totalVideos} videos</span>
            </div>
            
            {isPremium && <Star className="w-4 h-4 text-amber-500" />}
          </div>
          
          {/* Recommended badge */}
          {isRecommended && (
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-1 rotate-12 shadow-md">
              Recommended
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

interface ConceptCardViewProps {
  cards: ConceptCardProps[];
  filters?: {
    subject?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    search?: string;
  };
}

export const ConceptCardView = ({ cards, filters }: ConceptCardViewProps) => {
  // Apply filters if provided
  const filteredCards = React.useMemo(() => {
    if (!filters) return cards;
    
    return cards.filter(card => {
      if (filters.subject && card.subject !== filters.subject) return false;
      if (filters.difficulty && card.difficulty !== filters.difficulty) return false;
      if (filters.search && !card.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [cards, filters]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCards.map((card) => (
        <ConceptCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export default ConceptCardView;

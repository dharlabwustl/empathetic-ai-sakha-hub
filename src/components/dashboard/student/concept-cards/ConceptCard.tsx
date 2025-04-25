
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  Star, 
  FileText, 
  Tag,
  Volume2,
  Bookmark,
} from 'lucide-react';

export interface ConceptCardProps {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: 'high' | 'medium' | 'low';
  status: 'not-started' | 'in-progress' | 'completed';
  hasFlashcards: boolean;
  hasPracticeTest: boolean;
  isBookmarked: boolean;
  hasVoiceNarration: boolean;
  voiceEnabled?: boolean;
}

const ConceptCard = ({
  id,
  title,
  subject,
  topic,
  difficulty,
  priority,
  status,
  hasFlashcards,
  hasPracticeTest,
  isBookmarked,
  hasVoiceNarration,
  voiceEnabled = false
}: ConceptCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return '';
    }
  };

  return (
    <Link to={`/dashboard/student/concepts/${id}`}>
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <Badge variant={status === 'completed' ? "outline" : "default"}>
              {status === 'completed' ? "Completed" : status === 'in-progress' ? "In Progress" : "Start Learning"}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`p-0 h-8 w-8 ${isBookmarked ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <Bookmark className={isBookmarked ? 'fill-current' : ''} />
            </Button>
          </div>

          <h3 className="font-semibold text-lg mb-3">{title}</h3>

          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {subject}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {topic}
            </Badge>
            <Badge variant="outline" className={getDifficultyColor(difficulty)}>
              {difficulty}
            </Badge>
            <Badge variant="outline" className={getPriorityColor(priority)}>
              <Star className="h-3 w-3 mr-1" />
              {priority}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {hasFlashcards && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <Brain className="h-3 w-3 mr-1" />
                Flashcards
              </Badge>
            )}
            {hasPracticeTest && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                <FileText className="h-3 w-3 mr-1" />
                Practice Test
              </Badge>
            )}
            {hasVoiceNarration && voiceEnabled && (
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <Volume2 className="h-3 w-3 mr-1" />
                Voice Ready
              </Badge>
            )}
          </div>

          <Button className="w-full">
            Open Concept Card
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ConceptCard;

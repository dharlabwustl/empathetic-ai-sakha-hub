
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
  CheckCircle2,
  Bookmark,
  Volume2,
  Tag
} from 'lucide-react';
import { motion } from 'framer-motion';

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
}

const ConceptCard: React.FC<ConceptCardProps> = ({
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
  hasVoiceNarration
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{title}</h3>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">{subject}</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {topic}
                </Badge>
                <Badge variant="outline" className={getDifficultyColor(difficulty)}>
                  {difficulty}
                </Badge>
              </div>
            </div>
            <div className="flex items-start gap-2">
              {isBookmarked && <Bookmark className="h-5 w-5 text-blue-500 fill-current" />}
              {hasVoiceNarration && <Volume2 className="h-5 w-5 text-blue-500" />}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
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
            <Badge variant="outline" className="bg-amber-50 text-amber-700">
              <Star className="h-3 w-3 mr-1" />
              {priority} Priority
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <Badge 
              variant={status === 'completed' ? 'outline' : 'default'}
              className={status === 'completed' ? 'bg-green-50 text-green-700' : ''}
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In Progress' : 'Start Learning'}
            </Badge>
            <Link to={`/dashboard/student/concepts/${id}`}>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Open
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConceptCard;

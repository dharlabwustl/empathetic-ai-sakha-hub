
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
  Tag,
  BookMarked,
  FireIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  hasVoiceNarration,
  voiceEnabled = false
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return '';
    }
  };

  const handleVoiceNarration = (e: React.MouseEvent) => {
    e.preventDefault();
    if (voiceEnabled && hasVoiceNarration) {
      // In a real implementation, this would trigger the text-to-speech API
      const speech = new SpeechSynthesisUtterance();
      speech.text = `Concept: ${title}. Subject: ${subject}. Topic: ${topic}.`;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    // In a real implementation, this would update the bookmark status in the database
    console.log('Bookmark toggled for concept:', id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/dashboard/student/concepts/${id}`}>
        <Card className="hover:shadow-md transition-shadow duration-200 h-full">
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
                </div>
              </div>
              <div className="flex items-start gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleBookmark}
                      >
                        <Bookmark 
                          className={`h-5 w-5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isBookmarked ? 'Remove bookmark' : 'Bookmark this concept'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {hasVoiceNarration && voiceEnabled && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-500"
                          onClick={handleVoiceNarration}
                        >
                          <Volume2 className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Listen to narration</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className={getDifficultyColor(difficulty)}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
              <Badge variant="outline" className={getPriorityColor(priority)}>
                <Star className="h-3 w-3 mr-1" />
                {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {hasFlashcards && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 flex items-center gap-1">
                  <Brain className="h-3 w-3" />
                  Flashcards
                </Badge>
              )}
              {hasPracticeTest && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  Practice Test
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Badge 
                variant={status === 'completed' ? 'outline' : 'default'}
                className={status === 'completed' ? 'bg-green-50 text-green-700' : 
                          status === 'in-progress' ? 'bg-amber-500' : ''}
              >
                <CheckCircle2 className="h-3 w-3 mr-1" />
                {status === 'completed' ? 'Completed' : 
                 status === 'in-progress' ? 'In Progress' : 'Start Learning'}
              </Badge>
              
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Open
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ConceptCard;

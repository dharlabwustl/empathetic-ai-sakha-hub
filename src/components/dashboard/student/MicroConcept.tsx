
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Book, BookOpen, Clock, HelpCircle, CheckCircle, FileText, Video } from 'lucide-react';

export interface MicroConceptProps {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: number;
  content: string;
  resourceType: 'Video' | 'Text' | 'PDF' | 'Flashcards' | 'Exam';
  resourceUrl: string;
  completed?: boolean;
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
  completed = false,
  onComplete,
  onNeedHelp
}: MicroConceptProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return '';
    }
  };
  
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video': return <Video size={16} className="text-blue-500" />;
      case 'pdf': return <FileText size={16} className="text-red-500" />;
      case 'text': return <BookOpen size={16} className="text-green-500" />;
      case 'flashcards': return <BookOpen size={16} className="text-amber-500" />;
      case 'exam': return <FileText size={16} className="text-violet-500" />;
      default: return <BookOpen size={16} className="text-blue-500" />;
    }
  };
  
  const handleMarkComplete = (e: React.MouseEvent) => {
    e.preventDefault();
    onComplete(id);
  };
  
  const handleNeedHelp = (e: React.MouseEvent) => {
    e.preventDefault();
    onNeedHelp(id);
  };
  
  return (
    <Card className={`border-l-4 ${completed ? 'border-green-500' : 'border-blue-500'} hover:shadow-md transition-shadow duration-200`}>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold">{title}</h3>
              <Badge variant="outline" className={getDifficultyColor(difficulty)}>
                {difficulty}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <Book size={14} />
                <span>{subject}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen size={14} />
                <span>{chapter}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{estimatedTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                {getResourceIcon(resourceType)}
                <span>{resourceType}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!completed && (
              <Button size="sm" variant="outline" onClick={handleMarkComplete}>
                <CheckCircle size={14} className="mr-1" />
                Mark Done
              </Button>
            )}
            <Button size="sm" onClick={handleNeedHelp} variant="outline" className="text-indigo-600 hover:bg-indigo-50">
              <HelpCircle size={14} className="mr-1" />
              Need Help
            </Button>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-3 pt-3 border-t text-sm">
            <p>{content}</p>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(!expanded)} 
          className="mt-2 text-xs text-muted-foreground"
        >
          {expanded ? 'Show Less' : 'Show More'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MicroConcept;


import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Star, 
  Volume2, 
  Lab, 
  FileText, 
  Video, 
  Brain, 
  AlertTriangle, 
  BarChart, 
  CircleCheck,
  Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface ConceptCardProps {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  description: string;
  difficultyLevel: 'easy' | 'medium' | 'hard' | 'advanced';
  tags: string[];
  progress: number;
  hasFormula: boolean;
  hasVideo: boolean;
  has3DModel: boolean;
  totalExamples: number;
  examMistakes: number;
  lastStudied?: string;
  importance: 'high' | 'medium' | 'low';
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'hard': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

const getProgressColor = (progress: number) => {
  if (progress < 30) return 'bg-red-500';
  if (progress < 70) return 'bg-yellow-500';
  return 'bg-green-500';
};

const getImportanceIcon = (importance: string) => {
  switch (importance) {
    case 'high': 
      return <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 gap-1">
        <AlertTriangle className="h-3 w-3" /> High Importance
      </Badge>;
    case 'medium': 
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 gap-1">
        <Star className="h-3 w-3" /> Medium Importance
      </Badge>;
    case 'low': 
      return <Badge variant="outline" className="gap-1">
        <BookOpen className="h-3 w-3" /> Background Knowledge
      </Badge>;
    default: return null;
  }
};

const EnhancedConceptCard: React.FC<ConceptCardProps> = ({
  id,
  title,
  subject,
  chapter,
  description,
  difficultyLevel,
  tags,
  progress,
  hasFormula,
  hasVideo,
  has3DModel,
  totalExamples,
  examMistakes,
  lastStudied,
  importance
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const handleReadText = () => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = `${title}. ${description}`;
      speech.lang = 'en-IN';
      speech.rate = 0.9;
      window.speechSynthesis.speak(speech);
    }
  };
  
  const handleOpenConcept = () => {
    navigate(`/dashboard/student/concepts/${id}`);
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={contentVariants}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`h-full overflow-hidden transition-all duration-300 ${
          isHovered ? 'shadow-lg shadow-blue-100 dark:shadow-blue-900/20 transform scale-[1.02]' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground">{subject} • {chapter}</p>
            </div>
            <Badge className={`${getDifficultyColor(difficultyLevel)} capitalize`}>{difficultyLevel}</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <p className="text-sm line-clamp-2 mb-4">{description}</p>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">Mastery Progress</span>
              <span className="text-xs">{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2"
              style={{ background: 'rgb(229 231 235)', '--progress-background': getProgressColor(progress) } as React.CSSProperties}
            />
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {getImportanceIcon(importance)}
            
            {lastStudied && (
              <Badge variant="outline" className="text-xs">
                Last studied: {lastStudied}
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            {hasFormula && (
              <div className="flex items-center gap-1">
                <Lab className="h-3 w-3 text-blue-500" />
                <span>Interactive Formula</span>
              </div>
            )}
            
            {hasVideo && (
              <div className="flex items-center gap-1">
                <Video className="h-3 w-3 text-pink-500" />
                <span>Video Explanation</span>
              </div>
            )}
            
            {has3DModel && (
              <div className="flex items-center gap-1">
                <Lightbulb className="h-3 w-3 text-purple-500" />
                <span>3D Visualization</span>
              </div>
            )}
            
            {totalExamples > 0 && (
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3 text-green-500" />
                <span>{totalExamples} Examples</span>
              </div>
            )}
            
            {examMistakes > 0 && (
              <div className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3 text-orange-500" />
                <span>{examMistakes} Common Mistakes</span>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button variant="default" onClick={handleOpenConcept} className="flex-1">
            <BookOpen className="h-4 w-4 mr-2" />
            Study Now
          </Button>
          <Button variant="outline" size="icon" onClick={handleReadText} title="Read aloud">
            <Volume2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EnhancedConceptCard;

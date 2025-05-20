
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ThumbsUp, RefreshCw, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Joke } from './types';

// Mock data for jokes
const mockJokes: Joke[] = [
  { 
    id: 1, 
    content: "Why don't scientists trust atoms? Because they make up everything!", 
    likes: 120,
    author: "Science Joker"
  },
  { 
    id: 2, 
    content: "What did one cell say to his sister cell when she stepped on his toe? Mitosis!", 
    likes: 98,
    author: "Biology Prof"
  },
  { 
    id: 3, 
    content: "I was going to tell a chemistry joke, but all the good ones Argon.", 
    likes: 156,
    author: "Chem Student"
  },
  { 
    id: 4, 
    content: "Why did the math book look sad? Because it had too many problems.", 
    likes: 201,
    author: "Math Lover"
  },
  { 
    id: 5, 
    content: "What did the physics student say when his teacher told him to read chapters 1-10? 'Not a Light matter'!", 
    likes: 89,
    author: "Physics Fan"
  }
];

interface JokesTabProps {
  onLike?: (jokeId: number) => void;
}

const JokesTab: React.FC<JokesTabProps> = ({ onLike = () => {} }) => {
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [likedJokes, setLikedJokes] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const currentJoke = mockJokes[currentJokeIndex];
  
  const handleNextJoke = () => {
    setCurrentJokeIndex((prevIndex) => (prevIndex + 1) % mockJokes.length);
  };
  
  const handlePreviousJoke = () => {
    setCurrentJokeIndex((prevIndex) => (prevIndex - 1 + mockJokes.length) % mockJokes.length);
  };
  
  const handleRandomJoke = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * mockJokes.length);
    } while (newIndex === currentJokeIndex && mockJokes.length > 1);
    
    setCurrentJokeIndex(newIndex);
  };
  
  const handleLikeJoke = () => {
    if (!likedJokes.includes(currentJoke.id)) {
      setLikedJokes([...likedJokes, currentJoke.id]);
      onLike(currentJoke.id);
      
      toast({
        title: "Joke liked!",
        description: "Thanks for your feedback!",
        variant: "default"
      });
    } else {
      toast({
        title: "Already liked",
        description: "You've already liked this joke.",
        variant: "default"
      });
    }
  };
  
  const handleCopyJoke = () => {
    navigator.clipboard.writeText(currentJoke.content);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "You can now share this joke with friends!",
      variant: "default"
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold mb-1`}>Study Break Jokes</h3>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
          A good laugh improves memory retention by up to 15%!
        </p>
      </div>
      
      <Card className={`p-5 md:p-6 relative ${
        currentJokeIndex % 2 === 0 
          ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20' 
          : 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
      }`}>
        <div className="min-h-[120px] md:min-h-[150px] flex items-center justify-center">
          <p className={`text-center ${isMobile ? 'text-lg' : 'text-xl'} font-medium`}>
            {currentJoke.content}
          </p>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span className={isMobile ? 'text-xs' : ''}>By: {currentJoke.author}</span>
          <div className="flex items-center gap-1">
            <ThumbsUp className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-blue-500`} />
            <span className={isMobile ? 'text-xs' : ''}>{currentJoke.likes + (likedJokes.includes(currentJoke.id) ? 1 : 0)}</span>
          </div>
        </div>
        
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleCopyJoke}
            className={`h-8 w-8 rounded-full ${isMobile ? 'h-7 w-7' : ''}`}
          >
            {copied ? (
              <Check className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-green-500`} />
            ) : (
              <Copy className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
            )}
          </Button>
        </div>
      </Card>
      
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={handlePreviousJoke}
          size={isMobile ? "sm" : "default"}
        >
          <ChevronLeft className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
          <span className={isMobile ? 'text-xs' : ''}>Previous</span>
        </Button>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleRandomJoke}
            size={isMobile ? "sm" : "default"}
          >
            <RefreshCw className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
            <span className={isMobile ? 'text-xs' : ''}>Random Joke</span>
          </Button>
          
          <Button 
            onClick={handleLikeJoke}
            variant="outline"
            disabled={likedJokes.includes(currentJoke.id)}
            size={isMobile ? "sm" : "default"}
            className={likedJokes.includes(currentJoke.id) ? 'text-blue-500' : ''}
          >
            <ThumbsUp className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
            <span className={isMobile ? 'text-xs' : ''}>{likedJokes.includes(currentJoke.id) ? 'Liked' : 'Like'}</span>
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleNextJoke}
          size={isMobile ? "sm" : "default"}
        >
          <span className={isMobile ? 'text-xs' : ''}>Next</span>
          <ChevronRight className={`${isMobile ? 'h-3 w-3 ml-1' : 'h-4 w-4 ml-2'}`} />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        <Card className={`p-3 bg-green-50 dark:bg-green-900/20 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          <h4 className="font-medium">Did you know?</h4>
          <p className="mt-1 text-muted-foreground">
            Laughter increases dopamine production, which enhances learning ability and memory retention.
          </p>
        </Card>
        <Card className={`p-3 bg-blue-50 dark:bg-blue-900/20 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          <h4 className="font-medium">Study Tip</h4>
          <p className="mt-1 text-muted-foreground">
            Take a 5-minute humor break every hour of study to maintain high cognitive function.
          </p>
        </Card>
      </div>
      
      <p className={`text-center text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
        Joke {currentJokeIndex + 1} of {mockJokes.length}
      </p>
    </div>
  );
};

export default JokesTab;

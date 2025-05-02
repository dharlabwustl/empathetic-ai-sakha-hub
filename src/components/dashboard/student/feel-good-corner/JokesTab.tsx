
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, ThumbsUp, ThumbsDown, Share } from 'lucide-react';
import { UserProfileBase } from '@/types/user/base';

interface JokesTabProps {
  userProfile?: UserProfileBase;
}

const JokesTab: React.FC<JokesTabProps> = ({ userProfile }) => {
  const [joke, setJoke] = useState({
    setup: "Why don't scientists trust atoms?",
    punchline: "Because they make up everything!",
    category: "Science"
  });
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);
  
  const fetchNewJoke = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const jokes = [
        {
          setup: "How do you organize a space party?",
          punchline: "You planet!",
          category: "Space"
        },
        {
          setup: "Why did the physics teacher break up with the biology teacher?",
          punchline: "There was no chemistry.",
          category: "Science"
        },
        {
          setup: "What's the best thing about Switzerland?",
          punchline: "I don't know, but the flag is a big plus!",
          category: "Geography"
        },
        {
          setup: "Why did the scarecrow win an award?",
          punchline: "Because he was outstanding in his field!",
          category: "Agriculture"
        },
        {
          setup: "What do you call a factory that makes okay products?",
          punchline: "A satisfactory.",
          category: "Wordplay"
        }
      ];
      
      const randomIndex = Math.floor(Math.random() * jokes.length);
      setJoke(jokes[randomIndex]);
      setLiked(null);
      setLoading(false);
    }, 800);
  };
  
  const handleLike = (isLike: boolean) => {
    setLiked(isLike);
  };
  
  const handleShare = () => {
    // Implementation for sharing the joke
    console.log("Sharing joke:", joke);
    // In a real implementation, this would open a share dialog
    alert("Joke copied to clipboard!");
  };
  
  return (
    <div className="flex flex-col h-[500px]">
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-3 rounded-t-lg">
        <h3 className="font-medium">Study Break Jokes</h3>
        <p className="text-xs text-muted-foreground">
          A little humor to lighten your study mood
        </p>
      </div>
      
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="max-w-md text-center space-y-6">
          <div className="bg-gradient-to-r from-amber-100/50 to-yellow-100/50 dark:from-amber-900/20 dark:to-yellow-900/20 p-6 rounded-xl">
            <h4 className="text-xl font-medium mb-4">{joke.setup}</h4>
            <p className="text-lg font-semibold text-amber-600 dark:text-amber-400">{joke.punchline}</p>
            <div className="mt-3 text-xs text-muted-foreground">
              Category: {joke.category}
            </div>
          </div>
          
          <div className="flex justify-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleLike(true)}
              className={liked === true ? "bg-green-100 text-green-700 border-green-300" : ""}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              Funny
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleLike(false)}
              className={liked === false ? "bg-red-100 text-red-700 border-red-300" : ""}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              Not Funny
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShare}
            >
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
          
          <Button 
            onClick={fetchNewJoke} 
            disabled={loading}
            variant="default"
            className="bg-gradient-to-r from-amber-500 to-yellow-500"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                New Joke
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JokesTab;

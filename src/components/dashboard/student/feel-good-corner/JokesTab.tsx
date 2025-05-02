
import React, { useState } from 'react';
import { Button } from '@/components/ui/card';
import { RefreshCw, ThumbsUp, ThumbsDown, Share } from 'lucide-react';
import { UserProfileBase } from '@/types/user/base';

interface JokesTabProps {
  userProfile?: UserProfileBase;
}

const JokesTab: React.FC<JokesTabProps> = ({ userProfile }) => {
  const [currentJoke, setCurrentJoke] = useState({
    setup: "Why don't scientists trust atoms?",
    punchline: "Because they make up everything!",
    category: "science"
  });
  
  const [liked, setLiked] = useState<boolean | null>(null);
  const [showPunchline, setShowPunchline] = useState(false);
  
  const jokes = [
    {
      setup: "Why don't scientists trust atoms?",
      punchline: "Because they make up everything!",
      category: "science"
    },
    {
      setup: "Why did the physics teacher break up with the biology teacher?",
      punchline: "There was no chemistry.",
      category: "science"
    },
    {
      setup: "I was going to tell a chemistry joke...",
      punchline: "But all the good ones Argon.",
      category: "science"
    },
    {
      setup: "What did one math book say to the other?",
      punchline: "I've got problems.",
      category: "math"
    },
    {
      setup: "Why couldn't the geometry teacher control her class?",
      punchline: "Because she had too many problems.",
      category: "math"
    }
  ];
  
  const getNewJoke = () => {
    const newJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setCurrentJoke(newJoke);
    setShowPunchline(false);
    setLiked(null);
  };
  
  const handleLike = (isLiked: boolean) => {
    setLiked(isLiked);
  };
  
  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <div className="w-full max-w-lg bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/20 p-6 rounded-lg shadow-sm">
        <h3 className="font-medium text-lg text-center mb-6">{currentJoke.setup}</h3>
        
        {showPunchline ? (
          <p className="text-center font-medium text-lg mb-6">{currentJoke.punchline}</p>
        ) : (
          <div className="flex justify-center mb-6">
            <Button
              onClick={() => setShowPunchline(true)}
              className="bg-amber-200 hover:bg-amber-300 text-amber-800 dark:bg-amber-800 dark:hover:bg-amber-700 dark:text-amber-100"
            >
              Show Punchline
            </Button>
          </div>
        )}
        
        {showPunchline && (
          <div className="flex justify-center space-x-4 mb-4">
            <button
              className={`p-2 rounded-full ${liked === true ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => handleLike(true)}
            >
              <ThumbsUp className="h-5 w-5" />
            </button>
            <button
              className={`p-2 rounded-full ${liked === false ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => handleLike(false)}
            >
              <ThumbsDown className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full bg-blue-100 text-blue-600">
              <Share className="h-5 w-5" />
            </button>
          </div>
        )}
        
        <div className="flex justify-center mt-4">
          <button
            onClick={getNewJoke}
            className="flex items-center space-x-2 text-sm font-medium text-amber-700 dark:text-amber-300"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Another joke</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JokesTab;

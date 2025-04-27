
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';

const JokesTab = () => {
  const [currentJoke, setCurrentJoke] = useState<{setup: string; punchline: string} | null>({
    setup: "Why don't scientists trust atoms?",
    punchline: "Because they make up everything!"
  });
  const [showPunchline, setShowPunchline] = useState(false);
  const [loading, setLoading] = useState(false);

  const jokes = [
    {
      setup: "Why don't scientists trust atoms?",
      punchline: "Because they make up everything!"
    },
    {
      setup: "What did the 0 say to the 8?",
      punchline: "Nice belt!"
    },
    {
      setup: "Why did the math book look sad?",
      punchline: "Because it had too many problems."
    },
    {
      setup: "What do you call a fake noodle?",
      punchline: "An impasta!"
    },
    {
      setup: "How does a physicist exercise?",
      punchline: "By doing quantum leaps!"
    },
    {
      setup: "What's the best way to organize a space party?",
      punchline: "You planet!"
    },
    {
      setup: "Why can't you trust an atom?",
      punchline: "They make up literally everything."
    }
  ];

  const getRandomJoke = () => {
    setLoading(true);
    setShowPunchline(false);
    
    // Simulate API call delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * jokes.length);
      setCurrentJoke(jokes[randomIndex]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Study Break Jokes</h3>
        <p className="text-muted-foreground">
          Take a quick laugh break to refresh your mind between study sessions.
        </p>
      </div>

      <Card className="overflow-hidden border-2 border-indigo-100 dark:border-indigo-900">
        <CardContent className="p-6">
          {currentJoke ? (
            <div className="space-y-4 text-center py-8">
              <p className="text-xl font-medium">{currentJoke.setup}</p>
              
              {showPunchline ? (
                <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-4">
                  {currentJoke.punchline}
                </p>
              ) : (
                <Button 
                  onClick={() => setShowPunchline(true)} 
                  variant="outline" 
                  className="mt-4"
                >
                  Show Answer
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p>Click the button below to get a joke!</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={getRandomJoke}
          disabled={loading}
          className="bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Loading...' : 'Another Joke!'}
        </Button>
      </div>
      
      <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
        <p className="text-sm text-amber-800 dark:text-amber-300">
          <strong>Did you know?</strong> Laughter increases the release of endorphins, which can help reduce stress and improve focus when you return to studying.
        </p>
      </div>
    </div>
  );
};

export default JokesTab;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Smile, ThumbsUp, ThumbsDown, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const JokesTab = () => {
  const { toast } = useToast();
  const [currentJoke, setCurrentJoke] = useState<string>(
    "Why don't scientists trust atoms? Because they make up everything!"
  );
  const [userJoke, setUserJoke] = useState<string>('');
  const [showShareForm, setShowShareForm] = useState(false);
  const [sharedJokes, setSharedJokes] = useState([
    { user: "Maya S.", joke: "I told my computer I needed a break. It replied, 'Error 404: free time not found.'" },
    { user: "Raj K.", joke: "How do you organize a space party? You planet!" },
  ]);
  
  // These would come from an API in a real app
  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I told my computer I needed a break. It replied, 'Error 404: free time not found.'",
    "How do you organize a space party? You planet!",
    "Why did the math book look sad? It had too many problems.",
    "What did one wall say to the other wall? I'll meet you at the corner!",
    "Why don't skeletons fight each other? They don't have the guts.",
    "I used to be a baker, but I couldn't make enough dough.",
  ];
  
  const handleNextJoke = () => {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setCurrentJoke(randomJoke);
  };
  
  const handleLikeJoke = () => {
    toast({
      title: "Joke Liked!",
      description: "We'll show you more jokes like this.",
    });
    handleNextJoke();
  };
  
  const handleDislikeJoke = () => {
    handleNextJoke();
  };
  
  const handleShareJoke = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userJoke.trim() === '') {
      toast({
        title: "Empty Joke",
        description: "Please enter a joke to share.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Joke Shared!",
      description: "Your joke has been shared with the community.",
    });
    
    setSharedJokes([
      { user: "You", joke: userJoke },
      ...sharedJokes,
    ]);
    
    setUserJoke('');
    setShowShareForm(false);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <motion.div
          key={currentJoke}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-950/30 dark:to-blue-950/30 rounded-xl shadow-sm"
        >
          <div className="flex justify-center mb-4">
            <Smile className="h-10 w-10 text-violet-500" />
          </div>
          <p className="text-center text-lg font-medium mb-6">{currentJoke}</p>
          <div className="flex justify-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 bg-violet-100 hover:bg-violet-200 border-violet-200"
              onClick={handleLikeJoke}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>That's Funny!</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={handleDislikeJoke}
            >
              <ThumbsDown className="h-4 w-4" />
              <span>Next Joke</span>
            </Button>
          </div>
        </motion.div>
      </div>
      
      <div className="border-t border-b py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Community Jokes</h3>
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setShowShareForm(!showShareForm)}
          >
            <Send className="h-4 w-4" />
            <span>{showShareForm ? "Cancel" : "Share Your Joke"}</span>
          </Button>
        </div>
        
        {showShareForm && (
          <form onSubmit={handleShareJoke} className="mb-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900/20">
            <div className="space-y-3">
              <div>
                <label htmlFor="joke" className="block text-sm font-medium mb-1">Your Joke</label>
                <Textarea
                  id="joke"
                  value={userJoke}
                  onChange={(e) => setUserJoke(e.target.value)}
                  placeholder="Enter your joke here..."
                  className="min-h-[80px]"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="flex items-center gap-1">
                  <Send className="h-4 w-4" />
                  <span>Share Joke</span>
                </Button>
              </div>
            </div>
          </form>
        )}
        
        <div className="space-y-3">
          {sharedJokes.map((item, index) => (
            <Card key={index} className="p-3">
              <p className="mb-2 text-sm">{item.joke}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Shared by {item.user}</span>
                {item.user === "You" && (
                  <span className="text-xs text-blue-500">Just now</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JokesTab;

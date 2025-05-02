
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageSquare, Share, Trophy, Plus, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface DailyWinner {
  name: string;
  avatar: string;
  content: string;
}

interface JokesPanelProps {
  onLike: () => void;
  dailyWinner: DailyWinner;
}

const JokesPanel: React.FC<JokesPanelProps> = ({ onLike, dailyWinner }) => {
  const { toast } = useToast();
  const [showAddJoke, setShowAddJoke] = useState(false);
  const [newJoke, setNewJoke] = useState({ setup: '', punchline: '' });

  // Sample jokes data
  const jokes = [
    {
      id: '1',
      user: { name: 'Dr. Sharma', avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png' },
      setup: 'Why do we tell actors to "break a leg"?',
      punchline: 'Because every play has a cast!',
      category: 'Theater',
      likes: 24,
      comments: 3,
      userLiked: false
    },
    {
      id: '2',
      user: { name: 'Priya M.', avatar: '/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png' },
      setup: 'What did the biology student say when class finished?',
      punchline: 'It's time to go homo sapien!',
      category: 'Science',
      likes: 45,
      comments: 7,
      userLiked: true
    },
    {
      id: '3',
      user: { name: 'Aditya K.', avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png' },
      setup: 'What do you call a physicist who knows how to market?',
      punchline: 'A quantum sales person!',
      category: 'Physics',
      likes: 18,
      comments: 2,
      userLiked: false
    }
  ];

  const [jokesState, setJokesState] = useState(jokes);

  const handleLikeJoke = (id: string) => {
    setJokesState(prevJokes => {
      return prevJokes.map(joke => {
        if (joke.id === id) {
          const newLiked = !joke.userLiked;
          return {
            ...joke,
            userLiked: newLiked,
            likes: newLiked ? joke.likes + 1 : joke.likes - 1
          };
        }
        return joke;
      });
    });
  };

  const handleShareJoke = (id: string) => {
    const joke = jokesState.find(joke => joke.id === id);
    
    if (joke) {
      toast({
        title: "Joke shared!",
        description: "Link copied to clipboard (simulated).",
      });
    }
  };

  const handleAddJoke = () => {
    if (!newJoke.setup || !newJoke.punchline) {
      toast({
        title: "Cannot submit joke",
        description: "Please fill in both setup and punchline fields.",
        variant: "destructive",
      });
      return;
    }

    const newJokeEntry = {
      id: `${jokesState.length + 1}`,
      user: { name: 'You', avatar: '' },
      setup: newJoke.setup,
      punchline: newJoke.punchline,
      category: 'General',
      likes: 0,
      comments: 0,
      userLiked: false
    };

    setJokesState(prev => [newJokeEntry, ...prev]);
    setNewJoke({ setup: '', punchline: '' });
    setShowAddJoke(false);
    
    toast({
      title: "Joke submitted!",
      description: "Your joke has been added and is now visible to others.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-10 w-10 border-2 border-green-300">
            <AvatarImage src={dailyWinner.avatar} alt={dailyWinner.name} />
            <AvatarFallback>{dailyWinner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">Today's Joke Winner</h3>
              <Trophy className="h-4 w-4 text-amber-500 ml-2" />
            </div>
            <p className="text-sm text-green-700">{dailyWinner.name} got the most laughs with their {dailyWinner.content}!</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Student Jokes</h2>
        <Button onClick={() => setShowAddJoke(true)} className="flex items-center gap-1">
          <Plus className="h-3.5 w-3.5" />
          <span>Add Joke</span>
        </Button>
      </div>

      {jokesState.map((joke) => (
        <Card key={joke.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={joke.user.avatar} alt={joke.user.name} />
                  <AvatarFallback>{joke.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{joke.user.name}</CardTitle>
                </div>
              </div>
              <Badge variant="outline">{joke.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">{joke.setup}</p>
            <p className="text-muted-foreground">{joke.punchline}</p>
            
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleLikeJoke(joke.id)}
                  className={joke.userLiked ? "text-indigo-600" : ""}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{joke.likes}</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{joke.comments}</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleShareJoke(joke.id)}>
                <Share className="h-4 w-4 mr-1" />
                <span>Share</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center pt-2">
        <Button variant="ghost" onClick={onLike} className="flex items-center">
          <Award className="mr-2 h-4 w-4" />
          I enjoyed these jokes!
        </Button>
      </div>

      <Dialog open={showAddJoke} onOpenChange={setShowAddJoke}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Your Joke</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Setup</label>
              <Input
                placeholder="Enter joke setup..."
                value={newJoke.setup}
                onChange={(e) => setNewJoke(prev => ({ ...prev, setup: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Punchline</label>
              <Textarea
                placeholder="Enter joke punchline..."
                value={newJoke.punchline}
                onChange={(e) => setNewJoke(prev => ({ ...prev, punchline: e.target.value }))}
              />
            </div>
            <Button onClick={handleAddJoke} className="w-full">Submit Joke</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JokesPanel;

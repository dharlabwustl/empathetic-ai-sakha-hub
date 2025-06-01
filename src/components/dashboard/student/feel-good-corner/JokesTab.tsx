
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThumbsUp, Send, Plus, Smile } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface Joke {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  setup: string;
  punchline: string;
  category: string;
  likes: number;
  timestamp: string;
  isLiked?: boolean;
}

const JokesTab: React.FC = () => {
  const { toast } = useToast();
  const [jokes, setJokes] = useState<Joke[]>([
    {
      id: '1',
      user: { name: 'Rahul K.', avatar: '/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png' },
      setup: "Why don't scientists trust atoms?",
      punchline: "Because they make up everything!",
      category: 'Science',
      likes: 89,
      timestamp: '2 days ago',
      isLiked: false
    },
    {
      id: '2',
      user: { name: 'Anjali T.', avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png' },
      setup: "What did the mathematics book say to the pencil?",
      punchline: "I've got a lot of problems!",
      category: 'Math',
      likes: 76,
      timestamp: '3 days ago',
      isLiked: false
    }
  ]);
  
  const [showPunchline, setShowPunchline] = useState<Record<string, boolean>>({});
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [newJoke, setNewJoke] = useState({ setup: '', punchline: '', category: 'Science' });

  const categories = ['Science', 'Math', 'General', 'Physics', 'Chemistry', 'Biology'];

  const togglePunchline = (id: string) => {
    setShowPunchline(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleLike = (id: string) => {
    setJokes(prevJokes => 
      prevJokes.map(joke => 
        joke.id === id && !joke.isLiked
          ? { ...joke, likes: joke.likes + 1, isLiked: true }
          : joke
      )
    );
    
    toast({
      title: "Joke liked!",
      description: "Thank you for spreading positivity",
    });
  };

  const handleShareJoke = () => {
    if (!newJoke.setup || !newJoke.punchline) {
      toast({
        title: "Cannot share joke",
        description: "Please provide both setup and punchline for your joke",
        variant: "destructive"
      });
      return;
    }
    
    const joke: Joke = {
      id: `joke-${Date.now()}`,
      user: { 
        name: 'You', 
        avatar: '/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png'
      },
      setup: newJoke.setup,
      punchline: newJoke.punchline,
      category: newJoke.category,
      likes: 0,
      timestamp: 'Just now',
      isLiked: false
    };
    
    setJokes(prev => [joke, ...prev]);
    setNewJoke({ setup: '', punchline: '', category: 'Science' });
    setShowShareDialog(false);
    
    toast({
      title: "Joke shared!",
      description: "Your joke has been added to the community board",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Smile className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold">Community Jokes</h3>
        </div>
        <Button onClick={() => setShowShareDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Share Your Joke
        </Button>
      </div>
      
      <div className="space-y-4">
        {jokes.map((joke) => (
          <Card key={joke.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={joke.user.avatar} alt={joke.user.name} />
                  <AvatarFallback>{joke.user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{joke.user.name}</p>
                  <p className="text-xs text-muted-foreground">{joke.timestamp}</p>
                </div>
                <Badge variant="outline">{joke.category}</Badge>
              </div>
              
              <p className="font-medium mb-2">{joke.setup}</p>
              
              {showPunchline[joke.id] ? (
                <p className="italic text-primary mb-3">{joke.punchline}</p>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary mb-3" 
                  onClick={() => togglePunchline(joke.id)}
                >
                  Reveal punchline
                </Button>
              )}
              
              <div className="flex justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex items-center gap-1 ${joke.isLiked ? 'text-primary' : ''}`}
                  onClick={() => handleLike(joke.id)}
                  disabled={joke.isLiked}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{joke.likes}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share a Joke</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={newJoke.category} 
                onValueChange={(value) => setNewJoke(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="setup">Setup</Label>
              <Textarea 
                id="setup" 
                placeholder="Enter the setup of your joke..." 
                value={newJoke.setup}
                onChange={(e) => setNewJoke(prev => ({ ...prev, setup: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="punchline">Punchline</Label>
              <Textarea 
                id="punchline" 
                placeholder="Enter the punchline..." 
                value={newJoke.punchline}
                onChange={(e) => setNewJoke(prev => ({ ...prev, punchline: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>Cancel</Button>
            <Button type="submit" onClick={handleShareJoke}>
              <Send className="mr-2 h-4 w-4" />
              Share Joke
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JokesTab;

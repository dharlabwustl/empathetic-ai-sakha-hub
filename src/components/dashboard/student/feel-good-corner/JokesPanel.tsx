
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThumbsUp, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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
  timestamp?: string;
}

const mockJokes: Joke[] = [
  {
    id: '1',
    user: { name: 'Rahul K.', avatar: '/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png' },
    setup: "Why don't scientists trust atoms?",
    punchline: "Because they make up everything!",
    category: 'Science',
    likes: 89,
    timestamp: '2 days ago'
  },
  {
    id: '2',
    user: { name: 'Anjali T.', avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png' },
    setup: "What did the mathematics book say to the pencil?",
    punchline: "I've got a lot of problems!",
    category: 'Math',
    likes: 76,
    timestamp: '3 days ago'
  },
  {
    id: '3',
    user: { name: 'Priya M.', avatar: '/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png' },
    setup: "What did the biology student say when class finished?",
    punchline: "It's time to go homo sapien!",
    category: 'Science',
    likes: 45,
    timestamp: '5 days ago'
  },
];

const categories = ['Science', 'Math', 'General', 'History', 'Physics', 'Chemistry', 'Biology'];

export const JokesPanel: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>(mockJokes);
  const [showPunchline, setShowPunchline] = useState<Record<string, boolean>>({});
  const [likedJokes, setLikedJokes] = useState<Record<string, boolean>>({});
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [newJoke, setNewJoke] = useState({ setup: '', punchline: '', category: 'Science' });
  const { toast } = useToast();
  
  // Load saved state from localStorage
  useEffect(() => {
    const savedLikedJokes = localStorage.getItem('likedJokes');
    const savedShowPunchline = localStorage.getItem('showPunchline');
    const savedJokes = localStorage.getItem('jokes');
    
    if (savedLikedJokes) {
      setLikedJokes(JSON.parse(savedLikedJokes));
    }
    
    if (savedShowPunchline) {
      setShowPunchline(JSON.parse(savedShowPunchline));
    }
    
    if (savedJokes) {
      setJokes(JSON.parse(savedJokes));
    }
  }, []);
  
  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('likedJokes', JSON.stringify(likedJokes));
  }, [likedJokes]);
  
  useEffect(() => {
    localStorage.setItem('showPunchline', JSON.stringify(showPunchline));
  }, [showPunchline]);
  
  useEffect(() => {
    localStorage.setItem('jokes', JSON.stringify(jokes));
  }, [jokes]);

  const togglePunchline = (id: string) => {
    setShowPunchline(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleLike = (id: string) => {
    if (likedJokes[id]) return;

    setJokes(prevJokes => 
      prevJokes.map(joke => 
        joke.id === id ? { ...joke, likes: joke.likes + 1 } : joke
      )
    );

    setLikedJokes(prev => ({
      ...prev,
      [id]: true
    }));
    
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
    
    // Generate a random profile image
    const avatarChoices = [
      '/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png',
      '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png'
    ];
    const randomAvatar = avatarChoices[Math.floor(Math.random() * avatarChoices.length)];
    
    // Create new joke
    const joke: Joke = {
      id: `joke-${Date.now()}`,
      user: { 
        name: 'You', 
        avatar: randomAvatar
      },
      setup: newJoke.setup,
      punchline: newJoke.punchline,
      category: newJoke.category,
      likes: 0,
      timestamp: 'Just now'
    };
    
    // Add to jokes list
    setJokes(prev => [joke, ...prev]);
    
    // Reset form and close dialog
    setNewJoke({ setup: '', punchline: '', category: 'Science' });
    setShowShareDialog(false);
    
    toast({
      title: "Joke shared!",
      description: "Your joke has been added to the community board",
    });
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Community Jokes</h3>
        <Button onClick={() => setShowShareDialog(true)}>Share Your Joke</Button>
      </div>
      
      <div className="space-y-4">
        {jokes.map((joke) => (
          <Card key={joke.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Avatar>
                <AvatarImage src={joke.user.avatar} alt={joke.user.name} />
                <AvatarFallback>{joke.user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{joke.user.name}</p>
                <p className="text-xs text-muted-foreground">{joke.timestamp}</p>
              </div>
              <Badge variant="outline" className="ml-auto">{joke.category}</Badge>
            </div>
            
            <p className="text-lg font-medium mb-2">{joke.setup}</p>
            
            {showPunchline[joke.id] ? (
              <p className="italic text-primary">{joke.punchline}</p>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary" 
                onClick={() => togglePunchline(joke.id)}
              >
                Reveal punchline
              </Button>
            )}
            
            <div className="flex justify-end mt-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`flex items-center gap-1 ${likedJokes[joke.id] ? 'text-primary' : ''}`}
                onClick={() => handleLike(joke.id)}
                disabled={likedJokes[joke.id]}
              >
                <ThumbsUp size={16} />
                <span>{joke.likes}</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Share Joke Dialog */}
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

export default JokesPanel;

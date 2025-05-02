
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, Send, Share } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/hooks/use-toast";
import { UserProfileBase } from '@/types/user/base';

interface JokesTabProps {
  userProfile?: UserProfileBase;
}

interface Joke {
  id: number;
  user: {
    name: string;
    avatar?: string;
  };
  text: string;
  likes: number;
  timestamp: string;
  userLiked: boolean;
}

const JokesTab: React.FC<JokesTabProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const [newJoke, setNewJoke] = useState('');
  const [jokes, setJokes] = useState<Joke[]>([
    {
      id: 1,
      user: {
        name: 'Rahul Sharma',
        avatar: 'https://i.pravatar.cc/150?img=53',
      },
      text: 'Why do we tell actors to "break a leg?" Because every play has a cast.',
      likes: 42,
      timestamp: '2 hours ago',
      userLiked: false
    },
    {
      id: 2,
      user: {
        name: 'Priya Singh',
        avatar: 'https://i.pravatar.cc/150?img=24',
      },
      text: 'I told my wife she was drawing her eyebrows too high. She looked surprised.',
      likes: 28,
      timestamp: '5 hours ago',
      userLiked: true
    },
    {
      id: 3,
      user: {
        name: 'Amit Kumar',
        avatar: 'https://i.pravatar.cc/150?img=69',
      },
      text: 'What\'s the best thing about Switzerland? I don\'t know, but the flag is a big plus.',
      likes: 15,
      timestamp: '1 day ago',
      userLiked: false
    }
  ]);

  const handleLike = (id: number) => {
    setJokes(prevJokes => 
      prevJokes.map(joke => 
        joke.id === id 
          ? { 
              ...joke, 
              likes: joke.userLiked ? joke.likes - 1 : joke.likes + 1,
              userLiked: !joke.userLiked 
            } 
          : joke
      )
    );
  };

  const handleShare = (id: number) => {
    const joke = jokes.find(j => j.id === id);
    if (joke) {
      // In a real app, this would use the Web Share API
      toast({
        title: "Joke shared!",
        description: "Link copied to clipboard",
      });
    }
  };

  const handleSubmitJoke = () => {
    if (!newJoke.trim()) {
      toast({
        title: "Please enter a joke",
        variant: "destructive"
      });
      return;
    }

    const newJokeObj: Joke = {
      id: jokes.length + 1,
      user: {
        name: userProfile?.name || 'Anonymous Student',
        avatar: userProfile?.avatar,
      },
      text: newJoke,
      likes: 0,
      timestamp: 'Just now',
      userLiked: false
    };

    setJokes([newJokeObj, ...jokes]);
    setNewJoke('');

    toast({
      title: "Joke shared!",
      description: "Your joke has been posted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse Jokes</TabsTrigger>
          <TabsTrigger value="share">Share a Joke</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          {jokes.map((joke) => (
            <Card key={joke.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={joke.user.avatar} />
                    <AvatarFallback>{joke.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{joke.user.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{joke.timestamp}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p>{joke.text}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between pt-0">
                <Button 
                  variant={joke.userLiked ? "default" : "ghost"} 
                  size="sm"
                  className={joke.userLiked ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300" : ""}
                  onClick={() => handleLike(joke.id)}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{joke.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleShare(joke.id)}>
                  <Share className="h-4 w-4 mr-1" />
                  <span>Share</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="share">
          <Card>
            <CardHeader>
              <CardTitle>Share a Joke</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Type your joke here..."
                className="min-h-[120px]"
                value={newJoke}
                onChange={(e) => setNewJoke(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setNewJoke('')}>
                Clear
              </Button>
              <Button onClick={handleSubmitJoke}>
                <Send className="h-4 w-4 mr-1" />
                <span>Share Joke</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JokesTab;

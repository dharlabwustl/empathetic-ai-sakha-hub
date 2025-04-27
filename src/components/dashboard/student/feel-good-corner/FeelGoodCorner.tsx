
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { 
  Smile, MessageSquare, PuzzlePiece, Video, 
  Pencil, Bot, Star, RefreshCw, Send, Award, Heart, ThumbsUp
} from "lucide-react";

const FeelGoodCorner = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('jokes');
  const [jokeInput, setJokeInput] = useState('');
  const [userDoodle, setUserDoodle] = useState<string | null>(null);
  const [doodleEmotion, setDoodleEmotion] = useState<string | null>(null);

  // Mock data for jokes
  const jokes = [
    { 
      id: 1, 
      content: "Why did the physics teacher break up with the biology teacher? There was no chemistry.",
      author: "Emma P.",
      likes: 42,
      isLiked: true
    },
    { 
      id: 2, 
      content: "I told my computer I needed a break. Now it won't stop sending me vacation ads.",
      author: "Alex K.",
      likes: 37,
      isLiked: false
    },
    { 
      id: 3, 
      content: "Why don't scientists trust atoms? Because they make up everything!",
      author: "Sam J.",
      likes: 28,
      isLiked: false
    }
  ];

  // Mock data for puzzles
  const puzzles = [
    {
      id: 1,
      title: "Daily Brain Teaser",
      question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
      hint: "Think about communication",
      answer: "An echo",
      showAnswer: false
    },
    {
      id: 2,
      title: "Math Puzzle",
      question: "If a hen and a half lay an egg and a half in a day and a half, how many eggs do one hen lay in one day?",
      hint: "Set up a proportion",
      answer: "2/3 of an egg",
      showAnswer: false
    }
  ];

  // Mock data for videos
  const videos = [
    {
      id: 1,
      title: "The Science of Happiness",
      thumbnail: "https://via.placeholder.com/300x150?text=Science+of+Happiness",
      duration: "4:25",
      creator: "Mind Academy"
    },
    {
      id: 2,
      title: "Quick Desk Stretches for Students",
      thumbnail: "https://via.placeholder.com/300x150?text=Desk+Stretches",
      duration: "3:15",
      creator: "Health & Learning"
    }
  ];

  // Handle joke submission
  const handleSubmitJoke = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jokeInput.trim()) return;

    toast({
      title: "Joke Submitted!",
      description: "Your joke has been shared with other students.",
      duration: 3000
    });

    setJokeInput('');
  };

  // Handle puzzle answer reveal
  const togglePuzzleAnswer = (id: number) => {
    // In a real app, you would update state here
    toast({
      title: "Answer Revealed!",
      description: "Keep trying other puzzles to improve your logical thinking.",
      duration: 3000
    });
  };

  // Simulate doodling by letting user "upload" an image
  const handleDoodleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setUserDoodle(reader.result as string);
      
      // Simulate AI emotion analysis
      setTimeout(() => {
        const emotions = ["happy", "creative", "relaxed", "focused", "energetic"];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        setDoodleEmotion(randomEmotion);
        
        toast({
          title: "Doodle Analyzed",
          description: `Your doodle suggests you're feeling ${randomEmotion}!`,
          duration: 4000
        });
      }, 1500);
    };
    
    reader.readAsDataURL(file);
  };

  // Handle liking a joke
  const handleLikeJoke = (id: number) => {
    // In a real app, you'd update the state here
    toast({
      title: "Joke Liked!",
      description: "Your appreciation has been recorded.",
      duration: 2000
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5 text-pink-500" />
          Feel Good Corner
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="jokes" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6">
            <TabsTrigger value="jokes" className="text-xs">
              <Smile className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden xs:inline">Jokes</span>
            </TabsTrigger>
            <TabsTrigger value="teasers" className="text-xs">
              <MessageSquare className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden xs:inline">Teasers</span>
            </TabsTrigger>
            <TabsTrigger value="puzzles" className="text-xs">
              <PuzzlePiece className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden xs:inline">Puzzles</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="text-xs">
              <Video className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden xs:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger value="doodling" className="text-xs">
              <Pencil className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden xs:inline">Doodling</span>
            </TabsTrigger>
            <TabsTrigger value="chill" className="text-xs">
              <Bot className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden xs:inline">Sakha AI</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Jokes Tab */}
          <TabsContent value="jokes" className="space-y-4 mt-4">
            <div className="space-y-3">
              {jokes.map(joke => (
                <motion.div 
                  key={joke.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm"
                >
                  <p className="text-sm mb-2">{joke.content}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>By {joke.author}</span>
                    <button 
                      className={`flex items-center gap-1 ${joke.isLiked ? 'text-pink-500' : 'hover:text-pink-500'}`}
                      onClick={() => handleLikeJoke(joke.id)}
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span>{joke.likes}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <form onSubmit={handleSubmitJoke} className="pt-2">
              <div className="flex gap-2">
                <Input 
                  placeholder="Share your own joke..." 
                  value={jokeInput}
                  onChange={(e) => setJokeInput(e.target.value)}
                  className="text-sm"
                />
                <Button type="submit" size="sm" disabled={!jokeInput.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </TabsContent>
          
          {/* Teasers Tab */}
          <TabsContent value="teasers" className="mt-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 text-center">
              <h3 className="font-medium mb-2">Daily Brain Teaser</h3>
              <p className="text-sm mb-4">What has cities, but no houses; forests, but no trees; and water, but no fish?</p>
              <Button>Reveal Answer</Button>
            </div>
          </TabsContent>
          
          {/* Puzzles Tab */}
          <TabsContent value="puzzles" className="space-y-4 mt-4">
            {puzzles.map(puzzle => (
              <div key={puzzle.id} className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-100">
                <h3 className="font-medium mb-1">{puzzle.title}</h3>
                <p className="text-sm mb-3">{puzzle.question}</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({
                      title: "Hint",
                      description: puzzle.hint
                    })}
                  >
                    Need a hint?
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => togglePuzzleAnswer(puzzle.id)}
                  >
                    Show Answer
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Daily puzzle completed earns you points!</p>
              <Button variant="outline" size="sm" className="w-full">
                <Star className="h-3 w-3 mr-1" />
                View Leaderboard
              </Button>
            </div>
          </TabsContent>
          
          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-3 mt-4">
            {videos.map(video => (
              <div 
                key={video.id} 
                className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-32 object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1">{video.title}</h3>
                  <p className="text-xs text-gray-500">{video.creator}</p>
                </div>
              </div>
            ))}
            
            <Button variant="outline" size="sm" className="w-full">
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh Recommendations
            </Button>
          </TabsContent>
          
          {/* Doodling Tab */}
          <TabsContent value="doodling" className="mt-4">
            <div className="space-y-4">
              {!userDoodle ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Pencil className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-4">Upload your doodle!</p>
                  <div className="flex justify-center">
                    <label className="cursor-pointer">
                      <Input 
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={handleDoodleUpload} 
                      />
                      <Button variant="outline" size="sm" type="button">
                        Upload Doodle
                      </Button>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <img 
                      src={userDoodle} 
                      alt="Your doodle"
                      className="w-full h-40 object-contain"
                    />
                  </div>
                  
                  {doodleEmotion && (
                    <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                      <h3 className="font-medium mb-1">AI Analysis</h3>
                      <p className="text-sm">
                        Your doodle suggests you're feeling 
                        <span className="font-medium text-indigo-600 mx-1">
                          {doodleEmotion}
                        </span>
                        today!
                      </p>
                      <div className="mt-2 flex justify-end">
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                          Get Mood Tips
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => setUserDoodle(null)}>
                      Start Over
                    </Button>
                    <Button size="sm">
                      <Award className="h-4 w-4 mr-1" />
                      Submit for Contest
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="text-center text-xs text-gray-500 pt-2">
                <p>Best doodles are featured weekly!</p>
              </div>
            </div>
          </TabsContent>
          
          {/* Sakha AI Chill Mode Tab */}
          <TabsContent value="chill" className="mt-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-violet-50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Sakha AI - Chill Mode</h3>
                  <p className="text-xs text-gray-500">Relax, chat, play games, get inspiration</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm mb-2">Hi there! I'm in chill mode. What would you like to do today?</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">Chat</Button>
                    <Button variant="outline" size="sm">Game</Button>
                    <Button variant="outline" size="sm">Quote</Button>
                    <Button variant="outline" size="sm">Story</Button>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Type something to Sakha AI..."
                    className="text-sm min-h-[60px]"
                  />
                  <Button className="self-end">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FeelGoodCorner;

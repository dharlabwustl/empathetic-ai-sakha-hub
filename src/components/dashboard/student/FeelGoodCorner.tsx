
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Smile, 
  Heart, 
  Video, 
  Play, 
  Lightbulb, 
  PencilLine, 
  MessageCircle,
  ThumbsUp,
  RefreshCcw,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockJokes = [
  { id: 1, content: "Why don't scientists trust atoms? Because they make up everything!", likes: 42, author: "PhysicsNerd" },
  { id: 2, content: "I told my wife she was drawing her eyebrows too high. She looked surprised.", likes: 38, author: "DadJokeMaster" },
  { id: 3, content: "Why did the scarecrow win an award? Because he was outstanding in his field!", likes: 27, author: "FarmLife" },
  { id: 4, content: "I'm reading a book about anti-gravity. It's impossible to put down!", likes: 35, author: "ScienceWiz" },
  { id: 5, content: "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.", likes: 31, author: "MathGeek" },
];

const mockBrainTeasers = [
  { 
    id: 1, 
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", 
    answer: "An echo",
    difficulty: "Easy"
  },
  { 
    id: 2, 
    question: "What has keys but no locks, space but no room, and you can enter but not go in?", 
    answer: "A keyboard",
    difficulty: "Medium"
  },
  { 
    id: 3, 
    question: "The more you take, the more you leave behind. What am I?", 
    answer: "Footsteps",
    difficulty: "Easy"
  },
  { 
    id: 4, 
    question: "What has a head, a tail, is brown, and has no legs?", 
    answer: "A penny",
    difficulty: "Medium"
  },
  { 
    id: 5, 
    question: "What gets wet while drying?", 
    answer: "A towel",
    difficulty: "Easy"
  }
];

const mockVideos = [
  { id: 1, title: "When Physics Goes Wrong", thumbnail: "https://source.unsplash.com/random/300x200?comedy", duration: "0:30" },
  { id: 2, title: "Funny Animal Bloopers", thumbnail: "https://source.unsplash.com/random/300x200?animals", duration: "0:27" },
  { id: 3, title: "Study Break Comedy", thumbnail: "https://source.unsplash.com/random/300x200?laugh", duration: "0:30" },
];

const mockDrawings = [
  { id: 1, image: "https://source.unsplash.com/random/300x200?drawing", likes: 24, author: "CreativeMind" },
  { id: 2, image: "https://source.unsplash.com/random/300x200?sketch", likes: 18, author: "ArtistSoul" },
  { id: 3, image: "https://source.unsplash.com/random/300x200?doodle", likes: 32, author: "Doodler" },
];

const FeelGoodCorner = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("jokes");
  const [selectedTeaser, setSelectedTeaser] = useState<number | null>(null);
  const [teaserAnswer, setTeaserAnswer] = useState<string | null>(null);
  const [newJoke, setNewJoke] = useState("");
  const [showDoodleCanvas, setShowDoodleCanvas] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<{text: string, isUser: boolean}[]>([
    {text: "Hi there! I'm Sakha in chill mode. How can I brighten your day?", isUser: false}
  ]);

  const handleSubmitJoke = () => {
    if (!newJoke.trim()) return;
    
    toast({
      title: "Joke submitted!",
      description: "Your joke will be reviewed and added soon.",
    });
    
    setNewJoke("");
  };

  const handleShowAnswer = (id: number) => {
    setSelectedTeaser(id);
    setTeaserAnswer(mockBrainTeasers.find(teaser => teaser.id === id)?.answer || "");
  };

  const handleSendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Add user message to chat
    setChatMessages([...chatMessages, {text: chatMessage, isUser: true}]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Did you hear about the guy who invented Lifesavers? He made a mint!",
        "Here's a fun fact: Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat!",
        "Want to recharge? Try this: Close your eyes and take three deep breaths, focusing only on the sensation of breathing.",
        "You know what? You're doing great today. Sometimes we don't hear that enough!",
        "Quick happiness hack: Try smiling for 10 seconds, even if forced. Your brain often can't tell the difference and will release feel-good chemicals!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, {text: randomResponse, isUser: false}]);
    }, 1000);
    
    setChatMessage("");
  };

  const handlePlayVideo = (id: number) => {
    toast({
      title: "Video playing",
      description: "Enjoy your 30-second laugh break!",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="overflow-hidden border-t-4 border-t-violet-500">
        <CardHeader className="pb-3 bg-gradient-to-r from-violet-500/10 to-sky-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div 
                className="bg-violet-100 p-2 rounded-full"
                whileHover={{ rotate: 20 }}
              >
                <Smile className="text-violet-600" />
              </motion.div>
              <div>
                <CardTitle className="text-lg gradient-text">Feel Good Corner</CardTitle>
                <CardDescription>Your Pocket Smile Buddy</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-violet-100 text-violet-700 border-violet-200">
              Mood Booster
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="jokes" className="flex-1 gap-1 rounded-none">
                <Smile size={14} /> Jokes
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex-1 gap-1 rounded-none">
                <Video size={14} /> Videos
              </TabsTrigger>
              <TabsTrigger value="teasers" className="flex-1 gap-1 rounded-none">
                <Lightbulb size={14} /> Teasers
              </TabsTrigger>
              <TabsTrigger value="doodle" className="flex-1 gap-1 rounded-none">
                <PencilLine size={14} /> Doodle
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex-1 gap-1 rounded-none">
                <MessageCircle size={14} /> Sakha
              </TabsTrigger>
            </TabsList>
            
            <AnimatePresence mode="wait">
              {/* JOKES TAB */}
              <TabsContent value="jokes" className="p-4">
                <motion.div 
                  key="jokes"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Today's Top Jokes</h3>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <RefreshCcw size={12} className="mr-1" /> Refresh
                      </Button>
                    </div>
                    
                    <ScrollArea className="h-[280px] rounded border p-2">
                      <div className="space-y-3">
                        {mockJokes.map((joke) => (
                          <motion.div 
                            key={joke.id} 
                            className="bg-white rounded-lg p-3 shadow-sm border"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: joke.id * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                          >
                            <p className="text-sm mb-2">{joke.content}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">by @{joke.author}</span>
                              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                                <ThumbsUp size={12} />
                                {joke.likes}
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    <div className="pt-2">
                      <p className="text-xs text-gray-500 mb-2">Share your own joke:</p>
                      <div className="flex gap-2">
                        <Textarea 
                          value={newJoke} 
                          onChange={(e) => setNewJoke(e.target.value)} 
                          placeholder="Type your joke here..."
                          className="text-sm min-h-[60px] resize-none"
                        />
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button 
                          size="sm" 
                          className="bg-violet-600 text-xs"
                          onClick={handleSubmitJoke}
                        >
                          Share Joke
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* VIDEOS TAB */}
              <TabsContent value="videos" className="p-4">
                <motion.div 
                  key="videos"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-4">
                    <h3 className="font-medium">30-Second Laugh Break</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {mockVideos.map((video) => (
                        <motion.div 
                          key={video.id} 
                          className="rounded-lg overflow-hidden border bg-white shadow-sm"
                          whileHover={{ y: -2, scale: 1.01 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: video.id * 0.15 }}
                        >
                          <div className="relative">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title} 
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-white w-10 h-10"
                                onClick={() => handlePlayVideo(video.id)}
                              >
                                <Play className="h-5 w-5 text-violet-700" />
                              </Button>
                            </div>
                            <Badge className="absolute top-2 right-2 bg-black/50">
                              {video.duration}
                            </Badge>
                          </div>
                          <div className="p-2">
                            <h4 className="text-sm font-medium">{video.title}</h4>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Videos are curated based on your preferences and age group.
                    </p>
                  </div>
                </motion.div>
              </TabsContent>

              {/* BRAIN TEASERS TAB */}
              <TabsContent value="teasers" className="p-4">
                <motion.div 
                  key="teasers"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Mini Brain Teasers</h3>
                      <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                        Solve in 30s!
                      </Badge>
                    </div>
                    
                    <ScrollArea className="h-[280px] rounded border p-2">
                      <div className="space-y-3">
                        {mockBrainTeasers.map((teaser) => (
                          <motion.div 
                            key={teaser.id} 
                            className="bg-white rounded-lg p-3 shadow-sm border"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: teaser.id * 0.1 }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <p className="text-sm">{teaser.question}</p>
                              <Badge className={`
                                ${teaser.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : ''}
                                ${teaser.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' : ''}
                                ${teaser.difficulty === 'Hard' ? 'bg-red-100 text-red-800' : ''}
                              `}>
                                {teaser.difficulty}
                              </Badge>
                            </div>
                            
                            {selectedTeaser === teaser.id ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2"
                              >
                                <p className="text-sm font-medium text-violet-700">{teaserAnswer}</p>
                              </motion.div>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full mt-1 text-xs"
                                onClick={() => handleShowAnswer(teaser.id)}
                              >
                                Show Answer
                              </Button>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100">
                      <div className="flex gap-2 items-center">
                        <div className="rounded-full bg-indigo-200 p-1.5">
                          <Trophy className="h-3 w-3 text-indigo-700" />
                        </div>
                        <div className="text-xs">
                          <span className="font-medium">Today's Top Solvers:</span> @MindMaster, @PuzzleKing, @QuickThinker
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* DOODLE TAB */}
              <TabsContent value="doodle" className="p-4">
                <motion.div 
                  key="doodle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {!showDoodleCanvas ? (
                    <>
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Popular Doodles</h3>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => setShowDoodleCanvas(true)}
                        >
                          Create New
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {mockDrawings.map((drawing) => (
                          <motion.div 
                            key={drawing.id}
                            className="bg-white rounded-lg overflow-hidden border shadow-sm"
                            whileHover={{ y: -2 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: drawing.id * 0.15 }}
                          >
                            <img 
                              src={drawing.image} 
                              alt={`Drawing by ${drawing.author}`} 
                              className="w-full h-32 object-cover"
                            />
                            <div className="p-2 flex justify-between items-center">
                              <span className="text-xs text-gray-600">by @{drawing.author}</span>
                              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                                <ThumbsUp size={12} />
                                {drawing.likes}
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-xs text-center text-gray-500">
                        Express yourself through doodles and see what others are creating!
                      </p>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Create Your Doodle</h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setShowDoodleCanvas(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="h-[250px] border rounded-md bg-white flex items-center justify-center">
                        <p className="text-gray-400 text-sm">Canvas would appear here</p>
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">Clear</Button>
                        <Button className="bg-violet-600" size="sm">Share Doodle</Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </TabsContent>

              {/* SAKHA CHAT TAB */}
              <TabsContent value="chat" className="p-4">
                <motion.div 
                  key="chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-3">
                    <h3 className="font-medium">Talk to Sakha - Chill Mode</h3>
                    
                    <ScrollArea className="h-[250px] rounded border p-2 bg-white">
                      <div className="space-y-3">
                        {chatMessages.map((msg, index) => (
                          <motion.div 
                            key={index}
                            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className={`
                              max-w-[80%] rounded-lg p-2 px-3 
                              ${msg.isUser 
                                ? 'bg-violet-600 text-white' 
                                : 'bg-gray-100 text-gray-800 border'
                              }
                            `}>
                              <p className="text-sm">{msg.text}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    <div className="flex gap-2">
                      <Input 
                        value={chatMessage} 
                        onChange={(e) => setChatMessage(e.target.value)} 
                        placeholder="Type something to brighten your day..."
                        className="text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendChatMessage();
                        }}
                      />
                      <Button 
                        className="bg-violet-600" 
                        size="icon"
                        onClick={handleSendChatMessage}
                      >
                        <Send size={16} />
                      </Button>
                    </div>
                    
                    <div className="pt-1">
                      <p className="text-xs text-gray-500">
                        Try: "Tell me a joke" • "Share a fun fact" • "I need a motivation boost"
                      </p>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-gradient-to-r from-violet-500/5 to-sky-500/5 border-t px-3 py-2">
          <p className="text-xs text-gray-500 w-full text-center">
            <Heart className="h-3 w-3 inline mr-1 text-pink-500" />
            Personalized mood boosters based on your study patterns and preferences
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Missing trophy icon component
const Trophy = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 11v8h10v-8" />
    <path d="M17 11a6 6 0 1 0 0-12H7a6 6 0 0 0 0 12" />
  </svg>
);

export default FeelGoodCorner;

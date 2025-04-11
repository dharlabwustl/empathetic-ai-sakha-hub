
import React, { useState, useEffect, useRef } from 'react';
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
import { Avatar } from "@/components/ui/avatar";
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
  Send,
  Check,
  X,
  Undo
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

const FeelGoodCorner = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("jokes");
  const [selectedTeaser, setSelectedTeaser] = useState<number | null>(null);
  const [teaserAnswer, setTeaserAnswer] = useState<string | null>(null);
  const [newJoke, setNewJoke] = useState("");
  const [jokes, setJokes] = useState(mockJokes);
  const [likedJokes, setLikedJokes] = useState<number[]>([]);
  const [showDoodleCanvas, setShowDoodleCanvas] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<{text: string, isUser: boolean}[]>([
    {text: "Hi there! I'm Sakha in chill mode. How can I brighten your day?", isUser: false}
  ]);
  
  // Canvas state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingColor, setDrawingColor] = useState("#000000");
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  useEffect(() => {
    if (showDoodleCanvas && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveDrawingState();
      }
    }
  }, [showDoodleCanvas]);
  
  const saveDrawingState = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // If we're not at the end of the history, truncate it
        if (historyIndex < drawingHistory.length - 1) {
          setDrawingHistory(prev => prev.slice(0, historyIndex + 1));
        }
        
        setDrawingHistory(prev => [...prev, currentState]);
        setHistoryIndex(prev => prev + 1);
      }
    }
  };
  
  const undoDrawing = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      const newIndex = historyIndex - 1;
      
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.putImageData(drawingHistory[newIndex], 0, 0);
        }
      }
    }
  };
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = drawingColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault(); // Prevent scrolling while drawing
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const endDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveDrawingState();
    }
  };
  
  const clearCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      saveDrawingState();
    }
  };
  
  const handleShareDoodle = () => {
    if (!canvasRef.current) return;
    
    toast({
      title: "Doodle shared!",
      description: "Your masterpiece has been shared with the community.",
    });
    
    setShowDoodleCanvas(false);
  };

  const handleSubmitJoke = () => {
    if (!newJoke.trim()) return;
    
    const newJokeObj = {
      id: jokes.length + 1,
      content: newJoke,
      likes: 0,
      author: "You"
    };
    
    setJokes([newJokeObj, ...jokes]);
    
    toast({
      title: "Joke submitted!",
      description: "Your joke has been added to the collection!",
    });
    
    setNewJoke("");
  };

  const handleShowAnswer = (id: number) => {
    setSelectedTeaser(id);
    setTeaserAnswer(mockBrainTeasers.find(teaser => teaser.id === id)?.answer || "");
  };

  const handleLikeJoke = (id: number) => {
    if (likedJokes.includes(id)) {
      // Unlike
      setJokes(jokes.map(joke => 
        joke.id === id ? {...joke, likes: joke.likes - 1} : joke
      ));
      setLikedJokes(likedJokes.filter(jokeId => jokeId !== id));
    } else {
      // Like
      setJokes(jokes.map(joke => 
        joke.id === id ? {...joke, likes: joke.likes + 1} : joke
      ));
      setLikedJokes([...likedJokes, id]);
    }
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
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => setJokes([...mockJokes])}
                      >
                        <RefreshCcw size={12} className="mr-1" /> Refresh
                      </Button>
                    </div>
                    
                    <ScrollArea className="h-[280px] rounded border p-2">
                      <div className="space-y-3">
                        {jokes.map((joke) => (
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
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className={`h-7 gap-1 text-xs ${likedJokes.includes(joke.id) ? 'text-pink-500' : ''}`}
                                onClick={() => handleLikeJoke(joke.id)}
                              >
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
                        <h3 className="font-medium">Express Yourself</h3>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => setShowDoodleCanvas(true)}
                        >
                          Create New
                        </Button>
                      </div>
                      <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-white/50">
                        <PencilLine size={48} className="text-gray-300 mb-4" />
                        <p className="text-center text-gray-500">
                          Create your own doodle to express yourself<br />
                          or just have fun taking a creative break!
                        </p>
                        <Button 
                          onClick={() => setShowDoodleCanvas(true)}
                          className="mt-4 bg-violet-600"
                        >
                          Start Doodling
                        </Button>
                      </div>
                      <p className="text-xs text-center text-gray-500">
                        Express yourself through doodles - it's great for stress relief!
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
                      <div className="flex justify-center gap-2 mb-2">
                        {['#000000', '#FF0000', '#0000FF', '#008000', '#FFA500', '#800080'].map((color) => (
                          <div
                            key={color}
                            className={`w-6 h-6 rounded-full cursor-pointer ${drawingColor === color ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setDrawingColor(color)}
                          />
                        ))}
                      </div>
                      <div className="border rounded-md bg-white flex items-center justify-center">
                        <canvas 
                          ref={canvasRef} 
                          width={300} 
                          height={250} 
                          className="border cursor-crosshair touch-none"
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={endDrawing}
                          onMouseLeave={endDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={endDrawing}
                        />
                      </div>
                      <div className="flex justify-between">
                        <div className="space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={clearCanvas}
                          >
                            <X size={14} className="mr-1" /> Clear
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={undoDrawing}
                            disabled={historyIndex <= 0}
                          >
                            <Undo size={14} className="mr-1" /> Undo
                          </Button>
                        </div>
                        <Button 
                          className="bg-violet-600" 
                          size="sm"
                          onClick={handleShareDoodle}
                        >
                          <Check size={14} className="mr-1" /> Share Doodle
                        </Button>
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

// Trophy icon component
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

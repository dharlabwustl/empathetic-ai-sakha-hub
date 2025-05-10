
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Send, ThumbsUp } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { ChatMessage, Joke } from '@/components/dashboard/student/feel-good-corner/types';

const FeelGoodCornerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { text: "Hello! How are you feeling today?", isUser: false },
    { text: "I'm feeling a bit stressed about my upcoming exams.", isUser: true },
    { text: "That's completely normal. Let's talk about some stress management techniques that can help you.", isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState("");
  
  // Sample data for the jokes section
  const [jokes, setJokes] = useState<Joke[]>([
    { id: 1, content: "Why don't scientists trust atoms? Because they make up everything!", likes: 24, author: "Physics Fan" },
    { id: 2, content: "I told my wife she was drawing her eyebrows too high. She looked surprised.", likes: 18, author: "Makeup Pro" },
    { id: 3, content: "What did the ocean say to the beach? Nothing, it just waved.", likes: 32, author: "Marine Biologist" },
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    setChatMessages([...chatMessages, { text: newMessage, isUser: true }]);
    setNewMessage("");
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        text: "Thank you for sharing. I'm here to help you through this. Would you like to try some relaxation exercises?", 
        isUser: false 
      }]);
    }, 1000);
  };
  
  const handleLikeJoke = (id: number) => {
    setJokes(jokes.map(joke => 
      joke.id === id ? { ...joke, likes: joke.likes + 1 } : joke
    ));
  };

  return (
    <SharedPageLayout 
      title="Feel Good Corner" 
      subtitle="Take a break and boost your mood"
      activeTab="feel-good-corner"
    >
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="chat">Motivational Chat</TabsTrigger>
          <TabsTrigger value="jokes">Jokes</TabsTrigger>
          <TabsTrigger value="affirmations">Affirmations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chat with FeelGood AI</CardTitle>
              <CardDescription>
                Share your thoughts and feelings to get personalized encouragement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] overflow-y-auto mb-4 space-y-3 p-2">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      msg.isUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Type your message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="jokes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Study Break Jokes</CardTitle>
              <CardDescription>
                Laughter is the best medicine for study stress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jokes.map(joke => (
                  <Card key={joke.id} className="border shadow-sm">
                    <CardContent className="pt-6">
                      <p className="text-lg mb-4">{joke.content}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <div className="bg-primary text-white rounded-full h-full w-full flex items-center justify-center text-xs">
                              {joke.author.charAt(0)}
                            </div>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{joke.author}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleLikeJoke(joke.id)}
                          className="flex items-center gap-1"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{joke.likes}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Submit Your Own Joke
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="affirmations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Affirmations</CardTitle>
              <CardDescription>
                Positive statements to boost your confidence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "I am capable of learning difficult concepts.",
                  "My dedication leads to success.",
                  "Every study session brings me closer to my goals.",
                  "I believe in my abilities.",
                  "I am resilient and can overcome any academic challenge.",
                  "I transform stress into productive energy."
                ].map((affirmation, index) => (
                  <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <p className="text-center italic">{affirmation}</p>
                      <div className="flex justify-center mt-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>Favorite</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button className="w-full col-span-full">
                  Generate New Affirmations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default FeelGoodCornerPage;

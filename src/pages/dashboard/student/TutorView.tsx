
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Image, Paperclip, History, Lightbulb, Book } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const TutorView = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [messageInput, setMessageInput] = useState("");
  
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // Add message to chat in a real implementation
    setMessageInput("");
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <SharedPageLayout 
      title="24/7 AI Tutor"
      subtitle="Get personalized help with any subject, anytime you need it"
    >
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="chat">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />
            Chat History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="space-y-4">
          <Card className="border-blue-200">
            <CardHeader className="pb-3 bg-blue-50 dark:bg-blue-900/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/ai-tutor-avatar.jpg" alt="AI Tutor" />
                  <AvatarFallback className="bg-blue-100 text-blue-800">AI</AvatarFallback>
                </Avatar>
                <span>Sakha AI Tutor</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-4 h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {/* AI Message */}
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src="/ai-tutor-avatar.jpg" alt="AI Tutor" />
                    <AvatarFallback className="bg-blue-100 text-blue-800">AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md max-w-[80%]">
                    <p className="text-sm">
                      Hello! I'm your AI tutor. How can I help you with your studies today?
                    </p>
                  </div>
                </div>
                
                {/* User Message */}
                <div className="flex items-start justify-end gap-3">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md max-w-[80%]">
                    <p className="text-sm">
                      I'm struggling with Newton's laws of motion. Can you help me understand the third law better?
                    </p>
                  </div>
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src="/user-avatar.jpg" alt="User" />
                    <AvatarFallback className="bg-purple-100 text-purple-800">US</AvatarFallback>
                  </Avatar>
                </div>
                
                {/* AI Message with Resource Cards */}
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src="/ai-tutor-avatar.jpg" alt="AI Tutor" />
                    <AvatarFallback className="bg-blue-100 text-blue-800">AI</AvatarFallback>
                  </Avatar>
                  <div className="space-y-3 max-w-[80%]">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                      <p className="text-sm">
                        Newton's Third Law states that "For every action, there is an equal and opposite reaction." This means that when one object exerts a force on a second object, the second object simultaneously exerts a force equal in magnitude and opposite in direction on the first object.
                      </p>
                      <p className="text-sm mt-2">
                        Let me give you a simple example: When you push against a wall, you're applying a force to the wall. According to Newton's Third Law, the wall is pushing back against you with equal force in the opposite direction.
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Card className="border-blue-200">
                        <CardContent className="p-3 flex items-center gap-3">
                          <Book className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="text-sm font-medium">Newton's Laws Concept Page</h4>
                            <p className="text-xs text-muted-foreground">Detailed explanation with examples</p>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-auto">View</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-blue-200">
                        <CardContent className="p-3 flex items-center gap-3">
                          <Lightbulb className="h-5 w-5 text-amber-600" />
                          <div>
                            <h4 className="text-sm font-medium">Practice Problems</h4>
                            <p className="text-xs text-muted-foreground">5 problems to test your understanding</p>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-auto">Try</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-3">
              <div className="flex items-end w-full gap-2">
                <Textarea
                  placeholder="Type your message here..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[80px] resize-none flex-grow"
                />
                <div className="flex flex-col gap-2">
                  <Button size="icon" variant="outline">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          <div className="p-3 bg-muted rounded-md">
            <h3 className="font-medium text-sm mb-2">Subject-Specific Help</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Physics</Button>
              <Button variant="outline" size="sm">Chemistry</Button>
              <Button variant="outline" size="sm">Mathematics</Button>
              <Button variant="outline" size="sm">Biology</Button>
              <Button variant="outline" size="sm">English</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <div className="mb-4">
            <Input placeholder="Search chat history..." className="max-w-md" />
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <Card key={i} className="hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/ai-tutor-avatar.jpg" alt="AI Tutor" />
                      <AvatarFallback className="bg-blue-100 text-blue-800">AI</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Help with Newton's Laws</h4>
                      <p className="text-xs text-muted-foreground">10/25/2023 • 15 messages</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Physics</Badge>
                    <Button variant="ghost" size="sm">Continue</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default TutorView;

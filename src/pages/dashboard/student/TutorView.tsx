
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Plus, Bookmark, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const TutorView = () => {
  const [activeTab, setActiveTab] = useState("chat");
  
  // Mock chat history data
  const chatHistory = [
    {
      id: "1",
      title: "Understanding Newton's Laws",
      preview: "I need help understanding the practical applications of...",
      date: "Today, 2:30 PM",
      subject: "Physics"
    },
    {
      id: "2",
      title: "Quadratic Equations",
      preview: "Can you explain how to solve this equation...",
      date: "Yesterday",
      subject: "Mathematics"
    },
    {
      id: "3",
      title: "Chemical Bonding",
      preview: "What's the difference between ionic and covalent bonds?",
      date: "Apr 20, 2023",
      subject: "Chemistry"
    }
  ];

  return (
    <SharedPageLayout title="24/7 AI Tutor" subtitle="Get personalized help anytime, anywhere">
      <div className="space-y-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="chat">Start New Chat</TabsTrigger>
            <TabsTrigger value="history">Chat History</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-0">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare size={32} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Your 24/7 AI Study Companion</h2>
                  <p className="text-muted-foreground max-w-lg mb-6">
                    Ask any study question, get explanations for complex concepts, or practice with personalized quizzes.
                    Your AI tutor is always ready to help with your academic needs.
                  </p>
                  <Button className="gap-2">
                    <Plus size={16} />
                    Start a New Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Topic Suggestions */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Suggested Topics to Explore</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { title: "Newton's Laws of Motion", subject: "Physics" },
                  { title: "Quadratic Equations", subject: "Mathematics" },
                  { title: "Periodic Table", subject: "Chemistry" },
                  { title: "Cell Structure", subject: "Biology" },
                  { title: "World War II", subject: "History" },
                  { title: "Essay Writing", subject: "English" }
                ].map((topic, idx) => (
                  <Card key={idx} className="hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <h4 className="font-medium">{topic.title}</h4>
                      <p className="text-xs text-muted-foreground">{topic.subject}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Your Recent Conversations</h3>
                
                {chatHistory.length > 0 ? (
                  <div className="space-y-4">
                    {chatHistory.map((chat) => (
                      <Card key={chat.id} className="hover:shadow-md transition-all cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{chat.title}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-1">{chat.preview}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-muted-foreground flex items-center">
                                  <Clock size={12} className="mr-1" /> {chat.date}
                                </span>
                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                  {chat.subject}
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Bookmark size={16} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No chat history yet. Start a new conversation!</p>
                    <Button className="mt-4 gap-2">
                      <Plus size={16} />
                      Start a New Chat
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default TutorView;

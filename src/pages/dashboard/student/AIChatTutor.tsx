
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, Zap, FileText, Trash2, Clock, CheckCircle2, BookOpen, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

interface AIChatTutorProps {
  userProfile: any;
}

const AIChatTutor: React.FC<AIChatTutorProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Sample chat data
  const [chatMessages, setChatMessages] = useState([
    { id: 1, role: 'system', content: 'Hello! I\'m your 24/7 AI Tutor. How can I help you with your studies today?', timestamp: new Date().toISOString() },
    { id: 2, role: 'user', content: 'Can you explain the concept of kinetic energy?', timestamp: new Date().toISOString() },
    { id: 3, role: 'system', content: 'Kinetic energy is the energy that an object possesses due to its motion. The formula for kinetic energy is KE = (1/2)mv², where m is mass and v is velocity. This means that the kinetic energy of an object is directly proportional to its mass and the square of its velocity. If the velocity of an object doubles, its kinetic energy quadruples. This concept is fundamental in physics and is especially important when studying mechanics, thermodynamics, and conservation of energy. Would you like me to provide some examples or go deeper into the mathematical derivation?', timestamp: new Date().toISOString() }
  ]);
  
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: chatMessages.length + 1,
      role: 'user',
      content: messageInput,
      timestamp: new Date().toISOString()
    };
    
    setChatMessages([...chatMessages, newUserMessage]);
    setMessageInput('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const newSystemMessage = {
        id: chatMessages.length + 2,
        role: 'system',
        content: `Here's my response to your question about "${messageInput}"...`,
        timestamp: new Date().toISOString()
      };
      
      setChatMessages(prevMessages => [...prevMessages, newSystemMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  // Quick topics for students to ask about
  const quickTopics = [
    "Explain Newton's Laws of Motion",
    "Help with solving quadratic equations",
    "Explain the concept of chemical equilibrium",
    "What is the difference between ionic and covalent bonds?",
    "How do I solve integration by parts problems?",
    "Explain the structure of DNA"
  ];
  
  // Chat history examples
  const chatHistory = [
    { id: 1, title: "Physics Mechanics Help", date: "Today", preview: "Help with solving physics problems..." },
    { id: 2, title: "Chemistry Bonding", date: "Yesterday", preview: "Explaining chemical bonding concepts..." },
    { id: 3, title: "Math Integration", date: "2 days ago", preview: "Tutorial on integration techniques..." }
  ];
  
  // Learning paths
  const learningPaths = [
    { 
      title: "Mechanics Master", 
      description: "Complete guide to mastering mechanical physics concepts",
      progress: 35,
      topics: ['Newton\'s Laws', 'Kinematics', 'Energy Conservation']
    },
    { 
      title: "Chemistry Fundamentals", 
      description: "Essential chemistry concepts every student should know",
      progress: 60,
      topics: ['Periodic Table', 'Chemical Bonding', 'Stoichiometry'] 
    },
    { 
      title: "Calculus Deep Dive", 
      description: "Advanced calculus concepts and problem solving",
      progress: 20,
      topics: ['Limits', 'Derivatives', 'Integration'] 
    }
  ];
  
  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard/student/overview" className="text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">24/7 AI Tutor</h1>
              <p className="text-gray-600">Your personal learning assistant, available anytime</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Learning Assistant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="paths">Paths</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="chat" className="space-y-4 mt-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Quick Topics</h3>
                      <div className="space-y-2">
                        {quickTopics.map((topic, index) => (
                          <Button 
                            key={index} 
                            variant="ghost" 
                            className="w-full justify-start text-left h-auto py-2"
                            onClick={() => setMessageInput(topic)}
                          >
                            <Zap className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="line-clamp-1">{topic}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Tools</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="h-4 w-4 mr-2" /> Upload Study Material
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Brain className="h-4 w-4 mr-2" /> Concept Explainer
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <BookOpen className="h-4 w-4 mr-2" /> Create Flashcards
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="mt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">Recent Conversations</h3>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {chatHistory.map(chat => (
                        <Button 
                          key={chat.id} 
                          variant="ghost" 
                          className="w-full justify-start text-left h-auto py-2"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <span className="font-medium line-clamp-1">{chat.title}</span>
                              <span className="text-xs text-gray-500">{chat.date}</span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-1">{chat.preview}</p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="paths" className="mt-4">
                    <div className="space-y-4">
                      {learningPaths.map((path, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                          <CardContent className="pt-4">
                            <h3 className="font-medium">{path.title}</h3>
                            <p className="text-xs text-gray-500 mb-2">{path.description}</p>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>{path.progress}%</span>
                              </div>
                              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full" 
                                  style={{ width: `${path.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {path.topics.map((topic, i) => (
                                <Badge key={i} variant="outline" className="text-xs">{topic}</Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Main chat area */}
          <div className="lg:col-span-9">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/images/ai-tutor-avatar.png" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>AI Learning Assistant</CardTitle>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow overflow-hidden flex flex-col">
                <ScrollArea className="flex-grow mb-4 pr-4">
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} rounded-lg p-3`}>
                          {message.content}
                          <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                            <Clock className="h-3 w-3 inline mr-1" />
                            {new Date(message.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            <span className="text-sm text-gray-500">AI is typing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                <div className="mt-auto">
                  <div className="flex items-center space-x-2">
                    <Textarea
                      placeholder="Ask me anything about your studies..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-grow"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!messageInput.trim() || isLoading}
                      className="flex-shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Shift + Enter for new line</span>
                    <span className="flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                      AI tutor is ready to help
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AIChatTutor;

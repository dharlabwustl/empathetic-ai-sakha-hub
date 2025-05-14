
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, ThumbsUp, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DoubtsTabProps {
  conceptId: string;
  conceptTitle: string;
}

const DoubtsTab: React.FC<DoubtsTabProps> = ({ conceptId, conceptTitle }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  
  const existingDoubts = [
    {
      id: '1',
      title: `How is ${conceptTitle} different from similar concepts?`,
      content: `I'm confused about how ${conceptTitle} differs from similar concepts in this chapter. Could someone clarify the key differences?`,
      author: {
        name: 'Rahul Sharma',
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      date: '2 days ago',
      status: 'answered',
      likes: 12,
      answers: [
        {
          id: 'a1',
          content: `Great question! The main difference is that ${conceptTitle} focuses on the relationship between variables, while similar concepts are more about the properties of individual elements. For example...`,
          author: {
            name: 'Dr. Priya Singh',
            avatar: 'https://i.pravatar.cc/150?img=20',
            role: 'Tutor'
          },
          date: '1 day ago',
          isBestAnswer: true,
          likes: 8
        },
        {
          id: 'a2',
          content: `I had the same doubt! The way I understand it is that ${conceptTitle} is primarily about the cause and effect relationship, while the other concepts describe states.`,
          author: {
            name: 'Ankit Verma',
            avatar: 'https://i.pravatar.cc/150?img=12'
          },
          date: '1 day ago',
          isBestAnswer: false,
          likes: 3
        }
      ]
    },
    {
      id: '2',
      title: `Applications of ${conceptTitle} in entrance exams`,
      content: `Can someone explain how ${conceptTitle} is typically applied in entrance exam questions? What type of problems should I expect?`,
      author: {
        name: 'Neha Patel',
        avatar: 'https://i.pravatar.cc/150?img=23'
      },
      date: '3 days ago',
      status: 'open',
      likes: 7,
      answers: []
    }
  ];
  
  const handleSubmitQuestion = () => {
    if (!questionTitle.trim() || !newQuestion.trim()) {
      return;
    }
    
    console.log("New question:", { title: questionTitle, content: newQuestion });
    // In a real app, this would be submitted to a backend
    
    setQuestionTitle("");
    setNewQuestion("");
    
    // Show success message or update UI
    alert("Your question has been submitted and will be answered shortly!");
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-indigo-600" />
          Questions & Doubts
        </h3>
        <p className="text-sm text-muted-foreground">
          Ask your doubts about {conceptTitle} or help others by answering their questions.
        </p>
      </div>
      
      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Questions</TabsTrigger>
          <TabsTrigger value="ask">Ask a Question</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="pt-4 space-y-4">
          {existingDoubts.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <h3 className="text-lg font-medium">No questions yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Be the first to ask a question about this concept!
              </p>
              <Button>Ask a Question</Button>
            </div>
          ) : (
            <>
              {existingDoubts.map((doubt) => (
                <Card key={doubt.id} className="border border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={doubt.author.avatar} alt={doubt.author.name} />
                          <AvatarFallback>{doubt.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base font-medium">{doubt.title}</CardTitle>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-muted-foreground">{doubt.author.name} asked {doubt.date}</span>
                            <span 
                              className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                doubt.status === 'answered' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                              }`}
                            >
                              {doubt.status === 'answered' ? 'Answered' : 'Open'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 gap-1">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>{doubt.likes}</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3 pb-0">
                    <p className="text-sm">{doubt.content}</p>
                  </CardContent>
                  <CardFooter className="pt-4 pb-3 flex-col items-start">
                    <h4 className="text-sm font-medium mb-3 flex items-center">
                      {doubt.answers.length > 0 ? (
                        <>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {doubt.answers.length} {doubt.answers.length === 1 ? 'Answer' : 'Answers'}
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 mr-1" />
                          Waiting for answers
                        </>
                      )}
                    </h4>
                    
                    {doubt.answers.length > 0 && (
                      <div className="space-y-3 w-full">
                        {doubt.answers.map((answer) => (
                          <div 
                            key={answer.id} 
                            className={`p-3 rounded-md w-full ${
                              answer.isBestAnswer 
                                ? 'bg-green-50 border border-green-200 dark:bg-green-900/10 dark:border-green-900'
                                : 'bg-gray-50 border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={answer.author.avatar} alt={answer.author.name} />
                                  <AvatarFallback>{answer.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center">
                                    <span className="text-sm font-medium">{answer.author.name}</span>
                                    {answer.author.role && (
                                      <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs rounded-full">
                                        {answer.author.role}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-xs text-muted-foreground">{answer.date}</span>
                                </div>
                              </div>
                              {answer.isBestAnswer && (
                                <div className="flex items-center text-green-600 text-xs font-medium">
                                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                  Best Answer
                                </div>
                              )}
                            </div>
                            <p className="text-sm">{answer.content}</p>
                            <div className="mt-2 flex justify-end">
                              <Button variant="ghost" size="sm" className="h-7 gap-1">
                                <ThumbsUp className="h-3.5 w-3.5" />
                                <span>{answer.likes}</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {doubt.status === 'open' && (
                      <div className="w-full mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                        <Textarea 
                          placeholder="Write your answer..."
                          className="min-h-24 mb-2"
                        />
                        <div className="flex justify-end">
                          <Button>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Answer
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="ask" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ask a New Question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="question-title" className="text-sm font-medium">Question Title</label>
                <Input
                  id="question-title"
                  placeholder="Enter a clear, specific title for your question"
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="question-content" className="text-sm font-medium">Your Question</label>
                <Textarea
                  id="question-content"
                  placeholder="Describe your question in detail. Include any information that might help others understand your doubt."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <p className="text-xs text-muted-foreground">
                Your question will be reviewed by tutors and fellow students.
              </p>
              <Button onClick={handleSubmitQuestion} disabled={!questionTitle.trim() || !newQuestion.trim()}>
                Post Question
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoubtsTab;

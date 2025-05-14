
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Send } from "lucide-react";

interface Doubt {
  id: string;
  question: string;
  answer?: string;
  timestamp: string;
  author: {
    name: string;
    avatar?: string;
  };
  resolved: boolean;
}

const DoubtsTab: React.FC = () => {
  const [newQuestion, setNewQuestion] = useState("");
  
  // Sample doubts for demonstration
  const [doubts, setDoubts] = useState<Doubt[]>([
    {
      id: "1",
      question: "How can I apply this concept to solve problem type X?",
      answer: "You can use the formula Y = X^2 * Z when approaching problems like this. Remember to account for the initial conditions. Here's a step-by-step approach...",
      timestamp: "2 days ago",
      author: {
        name: "Amit S.",
        avatar: "/assets/avatars/user1.jpg"
      },
      resolved: true
    },
    {
      id: "2",
      question: "I'm having trouble understanding the relationship between concept A and concept B. Could you explain how they connect?",
      timestamp: "6 hours ago",
      author: {
        name: "Priya R.",
      },
      resolved: false
    }
  ]);
  
  const handleAskQuestion = () => {
    if (!newQuestion.trim()) return;
    
    const newDoubt: Doubt = {
      id: `${doubts.length + 1}`,
      question: newQuestion,
      timestamp: "Just now",
      author: {
        name: "You",
      },
      resolved: false
    };
    
    setDoubts([newDoubt, ...doubts]);
    setNewQuestion("");
  };
  
  return (
    <div className="space-y-6">
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-3">Ask Your Doubt</h3>
          <div className="space-y-2">
            <Textarea
              placeholder="Type your question here..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button onClick={handleAskQuestion} disabled={!newQuestion.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Submit Question
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Previous Questions</h3>
        
        {doubts.length > 0 ? (
          doubts.map((doubt) => (
            <Card key={doubt.id} className="border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={doubt.author.avatar} />
                    <AvatarFallback>{doubt.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{doubt.author.name}</p>
                      <span className="text-xs text-muted-foreground">{doubt.timestamp}</span>
                    </div>
                    <p className="text-sm">{doubt.question}</p>
                    
                    {doubt.answer && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-7 w-7 bg-purple-100 text-purple-600">
                            <AvatarFallback>T</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <p className="text-xs font-medium">Teacher</p>
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">Resolved</span>
                            </div>
                            <p className="text-sm mt-1">{doubt.answer}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {!doubt.resolved && doubt.author.name !== "You" && (
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="text-xs">
                          I have the same question
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h4 className="mt-4 text-lg font-medium">No questions yet</h4>
            <p className="text-muted-foreground">Be the first to ask a question about this concept</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubtsTab;

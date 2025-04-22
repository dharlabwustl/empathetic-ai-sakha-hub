import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserProfileType } from "@/types/user/base";

interface AIChatTutorProps {
  userProfile: UserProfileType;
}

const AIChatTutor: React.FC<AIChatTutorProps> = ({ userProfile }) => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I help you with your studies today?" },
  ]);
  const [input, setInput] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = { sender: "user", text: input };
      setMessages([...messages, newMessage]);
      setInput("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          sender: "ai",
          text: `Thanks for your question! Here's some info about ${selectedSubject || 'your topic'}: ...`
        };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }, 500);
    }
  };

  const renderSubjectSelection = () => {
    // Safe check if examPreparation is defined and has subjects
    const subjects = 
      userProfile.examPreparation && 
      typeof userProfile.examPreparation !== 'string' && 
      userProfile.examPreparation.subjects ? 
      userProfile.examPreparation.subjects : 
      ['Physics', 'Chemistry', 'Mathematics']; // Default subjects
      
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Select subject for today's session</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? "default" : "outline"}
              className="py-6"
              onClick={() => setSelectedSubject(subject)}
            >
              {subject}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">AI Chat Tutor</h2>

      {renderSubjectSelection()}

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col h-[400px]">
            <ScrollArea className="flex-grow">
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`rounded-lg p-3 w-fit max-w-[80%] ${
                        message.sender === "user"
                          ? "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-grow"
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default AIChatTutor;

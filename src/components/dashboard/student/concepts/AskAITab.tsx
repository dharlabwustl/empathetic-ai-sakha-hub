
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, Sparkles, MessageCircle, Lightbulb } from 'lucide-react';

interface AskAITabProps {
  conceptName: string;
}

const AskAITab: React.FC<AskAITabProps> = ({ conceptName }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: `Hello! I'm your AI tutor for ${conceptName}. Feel free to ask me any questions about this concept, and I'll provide detailed explanations with examples.`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    `What are some real-world applications of ${conceptName}?`,
    `Can you explain the formula for ${conceptName} step by step?`,
    `What are the most common mistakes students make with ${conceptName}?`,
    `How does ${conceptName} relate to other physics concepts?`,
    `Can you provide practice problems for ${conceptName}?`
  ];

  const handleSendQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = { type: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setQuestion('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        content: `Great question about ${conceptName}! Let me explain this in detail...

${question.toLowerCase().includes('formula') ? 
  `The formula F = ma is fundamental because:
  
  1. **F (Force)**: This represents the net force acting on an object, measured in Newtons (N)
  2. **m (mass)**: The amount of matter in the object, measured in kilograms (kg)  
  3. **a (acceleration)**: The rate of change of velocity, measured in m/s²
  
  The beauty of this formula is that it shows the direct relationship between force and acceleration, while showing the inverse relationship between mass and acceleration.` :
  
  question.toLowerCase().includes('real-world') ?
  `Here are some fascinating real-world applications of ${conceptName}:
  
  🚗 **Automotive Engineering**: Car manufacturers use this law to design safety features like airbags and crumple zones
  🚀 **Rocket Propulsion**: NASA engineers calculate thrust requirements for space missions
  ⚽ **Sports**: Athletes use this principle to optimize their performance in various sports
  🏗️ **Construction**: Engineers ensure buildings can withstand various forces` :
  
  `This is an excellent question about ${conceptName}. The key thing to understand is that this law governs virtually all motion we see around us. Would you like me to dive deeper into any specific aspect?`}

Is there anything specific about this explanation you'd like me to clarify further?`
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (suggestedQ: string) => {
    setQuestion(suggestedQ);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Ask AI About {conceptName}</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Bot className="h-4 w-4" />
          AI-Powered Learning Assistant
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                AI Tutor Chat
              </CardTitle>
              <CardDescription>
                Ask any questions about {conceptName} and get instant, detailed explanations
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 border'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.type === 'ai' && (
                          <Bot className="h-4 w-4 mt-0.5 text-blue-600" />
                        )}
                        <div className="text-sm whitespace-pre-line">{message.content}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-800 border p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-blue-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Textarea
                  placeholder={`Ask anything about ${conceptName}...`}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="flex-1 min-h-[60px]"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendQuestion();
                    }
                  }}
                />
                <Button
                  onClick={handleSendQuestion}
                  disabled={!question.trim() || isLoading}
                  className="px-6"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suggested Questions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                Suggested Questions
              </CardTitle>
              <CardDescription>
                Quick-start questions to explore {conceptName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestedQuestions.map((q, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left h-auto p-3 whitespace-normal"
                  onClick={() => handleSuggestedQuestion(q)}
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 mt-0.5 text-yellow-600 flex-shrink-0" />
                    <span className="text-sm">{q}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">AI Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <Bot className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium text-sm">Instant Explanations</div>
                  <div className="text-xs text-muted-foreground">Get immediate answers to your questions</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <Lightbulb className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-sm">Step-by-Step Solutions</div>
                  <div className="text-xs text-muted-foreground">Detailed problem-solving guidance</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium text-sm">Adaptive Learning</div>
                  <div className="text-xs text-muted-foreground">Personalized to your learning style</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AskAITab;

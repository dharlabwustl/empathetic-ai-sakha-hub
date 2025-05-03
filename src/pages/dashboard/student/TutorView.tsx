
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Bot, User, Info, Download, BookOpen, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const TutorView = () => {
  const [question, setQuestion] = React.useState('');
  
  const mockMessages = [
    {
      role: 'assistant',
      content: 'Hi there! I\'m your AI tutor. How can I help you with your NEET preparation today?'
    }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the question to an API
    console.log('Question submitted:', question);
    setQuestion('');
  };
  
  return (
    <SharedPageLayout
      title="24/7 AI Tutor"
      subtitle="Get immediate help with your studies anytime"
    >
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                AI Tutor Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto p-4 space-y-4">
              {mockMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.role === 'assistant' ? 'bg-secondary' : 'bg-primary text-primary-foreground'} p-3 rounded-lg`}>
                    <div className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                      {message.role === 'assistant' ? 
                        <Bot className="h-4 w-4" /> : 
                        <User className="h-4 w-4" />
                      }
                    </div>
                    <div>{message.content}</div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
            <div className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input 
                  value={question} 
                  onChange={(e) => setQuestion(e.target.value)} 
                  placeholder="Ask any question about your studies..." 
                  className="flex-grow"
                />
                <Button type="submit" disabled={!question.trim()}>
                  <Send className="h-4 w-4 mr-1" /> Send
                </Button>
              </form>
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Suggested Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Explain Newton's Laws of Motion",
                "Help me understand DNA Replication",
                "Solve this chemical equation",
                "Create a study plan for Biochemistry"
              ].map((topic, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  className="w-full justify-start text-left text-sm h-auto py-2"
                  onClick={() => setQuestion(topic)}
                >
                  {topic}
                </Button>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Learning Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" /> NEET Biology Guide
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Brain className="mr-2 h-4 w-4" /> Physics Formula Sheet
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" /> Chemistry Quick Notes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Info className="mr-2 h-4 w-4" /> NEET Exam Pattern
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 border-blue-100 dark:border-blue-900/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                <Info className="h-4 w-4 inline mr-1" />
                Your AI tutor is available 24/7 to help with any subject. Ask questions, get explanations, or request study guidance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default TutorView;

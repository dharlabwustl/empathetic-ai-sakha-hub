
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function TutorCard() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recentQuestions, setRecentQuestions] = useState([
    "How do I solve quadratic equations using the formula?",
    "Explain Newton's First Law of Motion with examples."
  ]);
  const { toast } = useToast();

  const handleAskQuestion = () => {
    if (!question.trim()) {
      toast({
        title: "Empty Question",
        description: "Please enter a question to ask the tutor.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate AI response delay
    setTimeout(() => {
      setRecentQuestions(prev => [question, ...prev.slice(0, 4)]);
      setQuestion("");
      setIsLoading(false);
      toast({
        title: "Question Submitted",
        description: "Your tutor is preparing an answer for you.",
      });
    }, 1500);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>24/7 Tutor</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-center p-6 space-y-4">
          <MessageSquare size={48} className="mx-auto text-sakha-blue" />
          <h3 className="text-xl font-medium">Ask Sakha Any Question</h3>
          <p className="text-gray-600">
            Need help with a tough problem? Have a concept you don't understand?
            Just type your question below to get help.
          </p>
          <div className="flex flex-col gap-3">
            <Textarea
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <Button 
              className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white"
              onClick={handleAskQuestion}
              disabled={isLoading}
            >
              {isLoading ? "Thinking..." : "Ask Question"}
            </Button>
          </div>
          
          <div className="pt-6 border-t border-gray-200 mt-6">
            <h4 className="font-medium mb-3 text-left">Recent Questions</h4>
            <div className="space-y-2 text-left">
              {recentQuestions.map((q, index) => (
                <div key={index} className="p-3 rounded-lg bg-gray-50 text-sm">
                  {q}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

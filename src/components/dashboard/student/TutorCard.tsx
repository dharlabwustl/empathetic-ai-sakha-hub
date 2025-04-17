
import { useState } from "react";
import { Book, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Answer {
  id: string;
  question: string;
  answer: string;
  format: "text" | "video";
  videoUrl?: string;
  feedbackGiven?: "helpful" | "not-helpful";
}

export default function TutorCard() {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("physics");
  const [isLoading, setIsLoading] = useState(false);
  const [preferredFormat, setPreferredFormat] = useState<"text" | "video">("text");
  const [answers, setAnswers] = useState<Answer[]>([]);
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
      const newAnswer: Answer = {
        id: Date.now().toString(),
        question,
        answer: generateMockAnswer(subject, question),
        format: preferredFormat,
        videoUrl: preferredFormat === "video" ? "https://example.com/mock-video" : undefined
      };
      
      setAnswers(prev => [newAnswer, ...prev]);
      setQuestion("");
      setIsLoading(false);
      toast({
        title: "Question Answered",
        description: "Your tutor has provided an answer.",
      });
    }, 1500);
  };

  const generateMockAnswer = (subject: string, question: string) => {
    // Simple mock answers based on subject
    const answers = {
      physics: `For your question about "${question}", the physics principles involved are related to Newton's laws of motion. According to Newton's second law, force equals mass times acceleration (F=ma). This principle helps us understand how objects behave when forces are applied to them.`,
      chemistry: `Regarding your question on "${question}", this involves chemical reactions where electrons are transferred between atoms. When this happens, it creates ionic bonds which have different properties than covalent bonds.`,
      mathematics: `To solve "${question}", we need to apply algebraic principles. First, isolate the variables on one side of the equation, then solve step by step, ensuring each transformation maintains the equality.`,
      biology: `For your question about "${question}", this biological process is part of cellular respiration, which is how cells convert nutrients into energy. The mitochondria plays a key role in this process.`,
    };

    return answers[subject as keyof typeof answers] || 
      `I'd be happy to help with your question: "${question}". Let me explain this concept in a simple way...`;
  };

  const handleFeedback = (answerId: string, feedback: "helpful" | "not-helpful") => {
    setAnswers(prev => prev.map(answer => 
      answer.id === answerId 
        ? { ...answer, feedbackGiven: feedback }
        : answer
    ));
    
    toast({
      title: feedback === "helpful" ? "Thank you for your feedback!" : "We'll improve our answer",
      description: feedback === "helpful" 
        ? "We're glad this answer was helpful" 
        : "We'll use your feedback to provide better answers in the future"
    });
  };

  const subjects = [
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "mathematics", label: "Mathematics" },
    { value: "biology", label: "Biology" },
    { value: "history", label: "History" },
    { value: "geography", label: "Geography" },
    { value: "literature", label: "Literature" },
    { value: "computer-science", label: "Computer Science" },
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>24/7 Tutor</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Subject</label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.value} value={subject.value}>
                          {subject.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Preferred Format</label>
                <div className="flex space-x-2">
                  <Button 
                    variant={preferredFormat === "text" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setPreferredFormat("text")}
                  >
                    Text
                  </Button>
                  <Button 
                    variant={preferredFormat === "video" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setPreferredFormat("video")}
                  >
                    Video
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <Textarea
                placeholder="Ask your question here..."
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
          </div>
          
          {answers.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-lg font-medium">Answers</h3>
              <div className="space-y-4">
                {answers.map((answer) => (
                  <div key={answer.id} className="border rounded-lg p-4 bg-card">
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      {answer.question}
                    </div>
                    
                    <div className="prose dark:prose-invert text-card-foreground max-w-none">
                      {answer.format === "text" ? (
                        <p>{answer.answer}</p>
                      ) : (
                        <div className="aspect-video bg-muted rounded flex items-center justify-center">
                          <div className="text-center">
                            <Book className="mx-auto mb-2" />
                            <p>Video explanation would appear here</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Was this answer helpful?
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className={answer.feedbackGiven === "helpful" ? "bg-green-50 text-green-600 border-green-200" : ""}
                          onClick={() => handleFeedback(answer.id, "helpful")}
                          disabled={answer.feedbackGiven !== undefined}
                        >
                          <ThumbsUp size={16} className="mr-1" /> 
                          Helpful
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className={answer.feedbackGiven === "not-helpful" ? "bg-red-50 text-red-600 border-red-200" : ""}
                          onClick={() => handleFeedback(answer.id, "not-helpful")}
                          disabled={answer.feedbackGiven !== undefined}
                        >
                          <ThumbsDown size={16} className="mr-1" /> 
                          Not helpful
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


import { useState } from "react";
import { Book, MessageSquare, ThumbsUp, ThumbsDown, Clock, Search } from "lucide-react";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Answer {
  id: string;
  question: string;
  subject: string;
  topic: string | null;
  concept: string | null;
  answer: string;
  format: "text" | "video";
  videoUrl?: string;
  feedbackGiven?: "helpful" | "not-helpful";
  timestamp: Date;
}

export default function TutorCard() {
  const [activeTab, setActiveTab] = useState("ask");
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("physics");
  const [topic, setTopic] = useState<string | null>(null);
  const [concept, setConcept] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preferredFormat, setPreferredFormat] = useState<"text" | "video">("text");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { toast } = useToast();

  // Mock data - in a real app, these would come from an API
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

  const topicsBySubject = {
    physics: [
      { value: "mechanics", label: "Mechanics" },
      { value: "electricity", label: "Electricity & Magnetism" },
      { value: "optics", label: "Optics" },
      { value: "thermodynamics", label: "Thermodynamics" },
      { value: "quantum", label: "Quantum Physics" },
    ],
    chemistry: [
      { value: "organic", label: "Organic Chemistry" },
      { value: "inorganic", label: "Inorganic Chemistry" },
      { value: "physical", label: "Physical Chemistry" },
      { value: "analytical", label: "Analytical Chemistry" },
    ],
    mathematics: [
      { value: "algebra", label: "Algebra" },
      { value: "calculus", label: "Calculus" },
      { value: "geometry", label: "Geometry" },
      { value: "statistics", label: "Statistics" },
      { value: "trigonometry", label: "Trigonometry" },
    ],
    // Add other subjects as needed
  };

  const conceptsByTopic = {
    mechanics: [
      { value: "newtons-laws", label: "Newton's Laws" },
      { value: "momentum", label: "Momentum" },
      { value: "energy", label: "Energy" },
      { value: "circular-motion", label: "Circular Motion" },
    ],
    electricity: [
      { value: "electric-fields", label: "Electric Fields" },
      { value: "magnetic-fields", label: "Magnetic Fields" },
      { value: "circuits", label: "Electric Circuits" },
    ],
    // Add more concepts for other topics
  };

  const currentTopics = topicsBySubject[subject as keyof typeof topicsBySubject] || [];
  const currentConcepts = topic && conceptsByTopic[topic as keyof typeof conceptsByTopic] || [];

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
        subject,
        topic,
        concept,
        answer: generateMockAnswer(subject, question),
        format: preferredFormat,
        videoUrl: preferredFormat === "video" ? "https://example.com/mock-video" : undefined,
        timestamp: new Date()
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

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>24/7 AI Tutor</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="ask" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              Ask a Question
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Question History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ask" className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Select Subject</label>
                  <Select value={subject} onValueChange={(val) => {
                    setSubject(val);
                    setTopic(null); // Reset topic when subject changes
                    setConcept(null); // Reset concept when subject changes
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Core Subjects</SelectLabel>
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
                  <label className="block text-sm font-medium mb-1">Topic (Optional)</label>
                  <Select 
                    value={topic || ""} 
                    onValueChange={(val) => {
                      setTopic(val);
                      setConcept(null); // Reset concept when topic changes
                    }}
                    disabled={currentTopics.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {currentTopics.map((topic) => (
                          <SelectItem key={topic.value} value={topic.value}>
                            {topic.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Concept (Optional)</label>
                <Select 
                  value={concept || ""} 
                  onValueChange={setConcept}
                  disabled={!topic || currentConcepts.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a concept" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {currentConcepts.map((concept) => (
                        <SelectItem key={concept.value} value={concept.value}>
                          {concept.label}
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
              
              <div className="flex flex-col gap-3">
                <Textarea
                  placeholder="Ask your question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
                <Button 
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
                  onClick={handleAskQuestion}
                  disabled={isLoading}
                >
                  {isLoading ? "Thinking..." : "Ask Question"}
                </Button>
              </div>
            </div>
            
            {answers.length > 0 && activeTab === "ask" && (
              <div className="space-y-4 pt-4 border-t border-border mt-4">
                <h3 className="text-lg font-medium">Recent Answer</h3>
                <div className="border rounded-lg p-4 bg-card">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {answers[0].question}
                  </div>
                  
                  <div className="prose dark:prose-invert text-card-foreground max-w-none">
                    {answers[0].format === "text" ? (
                      <p>{answers[0].answer}</p>
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
                        className={answers[0].feedbackGiven === "helpful" ? "bg-green-50 text-green-600 border-green-200" : ""}
                        onClick={() => handleFeedback(answers[0].id, "helpful")}
                        disabled={answers[0].feedbackGiven !== undefined}
                      >
                        <ThumbsUp size={16} className="mr-1" /> 
                        Helpful
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className={answers[0].feedbackGiven === "not-helpful" ? "bg-red-50 text-red-600 border-red-200" : ""}
                        onClick={() => handleFeedback(answers[0].id, "not-helpful")}
                        disabled={answers[0].feedbackGiven !== undefined}
                      >
                        <ThumbsDown size={16} className="mr-1" /> 
                        Not helpful
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="p-4">
            {answers.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Question History</h3>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Search questions..." 
                      className="w-full pl-8 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>
                
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {answers.map((answer) => (
                      <div key={answer.id} className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{answer.question}</h4>
                          <span className="text-xs text-muted-foreground">
                            {answer.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-violet-100 text-violet-800 mr-2">
                            {subjects.find(s => s.value === answer.subject)?.label || answer.subject}
                          </span>
                          {answer.topic && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 mr-2">
                              {currentTopics.find(t => t.value === answer.topic)?.label || answer.topic}
                            </span>
                          )}
                          {answer.concept && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              {currentConcepts.find(c => c.value === answer.concept)?.label || answer.concept}
                            </span>
                          )}
                        </div>
                        
                        <div className="prose dark:prose-invert text-card-foreground max-w-none text-sm line-clamp-2">
                          <p>{answer.answer}</p>
                        </div>
                        
                        <div className="mt-2 flex justify-end">
                          <Button variant="outline" size="sm" className="text-xs">
                            View Full Answer
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Questions Yet</h3>
                <p className="text-muted-foreground mt-2">
                  Your question history will appear here after you ask your first question.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

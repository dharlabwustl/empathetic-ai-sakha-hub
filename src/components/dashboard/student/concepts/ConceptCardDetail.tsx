
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  BrainCircuit, 
  ArrowRight, 
  CheckCircle, 
  Volume2, 
  NotebookPen, 
  BarChart3, 
  BookMarked, 
  AlertCircle, 
  Lightbulb 
} from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface ConceptCardDetailProps {
  conceptId: string;
  title: string;
  content: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  examTags: string[];
  relatedConcepts?: Array<{ id: string; title: string }>;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({
  conceptId,
  title,
  content,
  category,
  difficulty,
  examTags,
  relatedConcepts
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");
  const [userNotes, setUserNotes] = useState("");
  const [mastery, setMastery] = useState(68); // Example mastery percentage
  const { speakMessage, isSpeaking, voiceSettings } = useVoiceAnnouncer();

  // Load any saved notes on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`concept_notes_${conceptId}`);
    if (savedNotes) {
      setUserNotes(savedNotes);
    }
  }, [conceptId]);

  // Save notes whenever they change
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const notes = e.target.value;
    setUserNotes(notes);
    localStorage.setItem(`concept_notes_${conceptId}`, notes);
  };

  // Handle read aloud functionality
  const handleReadAloud = () => {
    if (isSpeaking) {
      // Stop speaking if currently speaking
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } else {
      // Start reading the concept content
      const textToRead = `${title}. ${content}`;
      speakMessage(textToRead);
      
      toast({
        title: "Reading concept content",
        description: "Listening mode activated. Click again to stop."
      });
    }
  };

  // Handle practice exam
  const handlePracticeExam = () => {
    toast({
      title: "Practice Exam Loading",
      description: `Preparing questions related to ${title}`
    });
    // In real app, would navigate to practice exam with this concept's questions
  };

  // Handle interactive flashcards
  const handleFlashcards = () => {
    toast({
      title: "Flashcards Loading",
      description: `Creating flashcards for ${title}`
    });
    // In real app, would navigate to flashcards for this concept
  };

  // Analytics data - this would come from API in real app
  const analyticsData = {
    masteryLevel: mastery,
    recallStrength: 72,
    attemptHistory: [
      { date: "2023-05-10", score: 65 },
      { date: "2023-05-15", score: 70 },
      { date: "2023-05-18", score: 68 },
    ],
    weakAreas: ["Memorization", "Application"],
    strengths: ["Understanding", "Relation to other concepts"]
  };

  // AI insights data - would come from API in real app
  const aiInsights = {
    weakLinks: ["Connection to Advanced Cellular Processes", "Practical Applications"],
    revisionSuggestions: [
      "Review related concepts in Biochemistry",
      "Practice with real-world examples",
      "Create connections to previously mastered concepts"
    ],
    recommendedResources: [
      { title: "Illustrated Guide to Cell Biology", type: "book" },
      { title: "Cell Function Interactive Lab", type: "simulation" }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main content card */}
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <CardTitle>{title}</CardTitle>
                  <Badge variant={
                    difficulty === "easy" ? "outline" :
                    difficulty === "medium" ? "secondary" : "destructive"
                  }>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </Badge>
                </div>
                <CardDescription>{category}</CardDescription>
              </div>
              
              {/* Read Aloud Button */}
              <Button 
                variant={isSpeaking ? "destructive" : "outline"} 
                size="sm"
                onClick={handleReadAloud}
                className="flex items-center gap-2"
              >
                <Volume2 size={16} />
                {isSpeaking ? "Stop Reading" : "Read Aloud"}
              </Button>
            </CardHeader>
            
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
              <div className="px-6">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="content">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="notes">
                    <NotebookPen className="w-4 h-4 mr-2" />
                    My Notes
                  </TabsTrigger>
                  <TabsTrigger value="analytics">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <CardContent>
                <TabsContent value="content" className="mt-0">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{content}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="mt-0">
                  <div className="space-y-4">
                    <Textarea 
                      placeholder="Add your personal notes about this concept here..."
                      className="min-h-[200px]"
                      value={userNotes}
                      onChange={handleNotesChange}
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => {
                          toast({
                            title: "Notes Saved",
                            description: "Your notes have been saved successfully."
                          });
                        }}
                      >
                        Save Notes
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="mt-0">
                  <div className="space-y-6">
                    {/* Mastery Tracking */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Mastery Level</h3>
                        <span className="font-semibold text-primary">{analyticsData.masteryLevel}%</span>
                      </div>
                      <Progress value={analyticsData.masteryLevel} />
                    </div>
                    
                    {/* Recall Strength */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Recall Strength</h3>
                        <span className="font-semibold text-primary">{analyticsData.recallStrength}%</span>
                      </div>
                      <Progress value={analyticsData.recallStrength} className="bg-purple-100" />
                    </div>
                    
                    {/* Attempt History */}
                    <div>
                      <h3 className="font-medium mb-2">Attempt History</h3>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        {analyticsData.attemptHistory.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No attempts recorded yet.</p>
                        ) : (
                          <div className="space-y-2">
                            {analyticsData.attemptHistory.map((attempt, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{attempt.date}</span>
                                <span className="font-medium">{attempt.score}%</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Strengths/Weaknesses */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Strengths</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {analyticsData.strengths.map((strength, index) => (
                            <li key={index}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Areas for Improvement</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {analyticsData.weakAreas.map((area, index) => (
                            <li key={index}>{area}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
        
        {/* Right sidebar */}
        <div className="md:w-80 space-y-6">
          {/* Actions Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Related Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Related Concepts */}
              <Button variant="outline" className="w-full justify-start" onClick={() => {
                toast({
                  title: "Loading Related Concepts",
                  description: `Exploring concepts related to ${title}`
                });
              }}>
                <div className="flex items-center">
                  <BookMarked className="mr-2 h-4 w-4" />
                  <span>Related Concept Cards</span>
                </div>
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
              
              {/* Interactive Flashcards */}
              <Button variant="outline" className="w-full justify-start" onClick={handleFlashcards}>
                <div className="flex items-center">
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  <span>Interactive Flashcards</span>
                </div>
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
              
              {/* Practice Exam */}
              <Button variant="outline" className="w-full justify-start" onClick={handlePracticeExam}>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  <span>Practice Exam</span>
                </div>
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          {/* AI Insights Card */}
          <Card>
            <CardHeader className="pb-3 bg-purple-50 dark:bg-purple-900/20">
              <CardTitle className="text-lg flex items-center">
                <BrainCircuit className="mr-2 h-5 w-5 text-purple-600" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {/* Weak Link Detection */}
              <div>
                <h3 className="text-sm font-medium flex items-center mb-2">
                  <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                  Weak Links Detected
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  {aiInsights.weakLinks.map((link, index) => (
                    <li key={index}>{link}</li>
                  ))}
                </ul>
              </div>
              
              {/* Revision Suggestions */}
              <div>
                <h3 className="text-sm font-medium flex items-center mb-2">
                  <Lightbulb className="mr-2 h-4 w-4 text-green-500" />
                  Revision Suggestions
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  {aiInsights.revisionSuggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
              
              {/* Recommended Resources */}
              <div>
                <h3 className="text-sm font-medium mb-2">Recommended Resources</h3>
                <div className="space-y-1">
                  {aiInsights.recommendedResources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="font-medium">{resource.title}</span>
                      <Badge variant="outline">{resource.type}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* AI Tutor */}
              <Button variant="secondary" className="w-full">
                <BrainCircuit className="mr-2 h-4 w-4" />
                Ask AI Tutor
              </Button>
            </CardContent>
          </Card>
          
          {/* Exam Tags */}
          <div className="flex flex-wrap gap-2">
            {examTags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetail;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Book,
  BookOpen,
  Clock,
  Volume2,
  VolumeX,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  BrainCircuit,
  Award,
  FileText,
  BarChart2,
  Zap,
  BookmarkPlus,
  Check,
  Brain,
  Download
} from "lucide-react";
import { ConceptCard } from "@/hooks/useUserStudyPlan";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface ConceptCardDetailViewProps {
  concept: any;
  onMarkCompleted: () => void;
}

const ConceptCardDetailView: React.FC<ConceptCardDetailViewProps> = ({
  concept,
  onMarkCompleted,
}) => {
  const [activeTab, setActiveTab] = useState("explanation");
  const [activeExplanationTab, setActiveExplanationTab] = useState("basic");
  const [isReading, setIsReading] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const newSpeech = new SpeechSynthesisUtterance();
      // Try to set Indian English voice
      setTimeout(() => {
        const voices = window.speechSynthesis.getVoices();
        const indianVoice = voices.find(voice => 
          voice.lang === 'en-IN' || 
          voice.name.includes('Indian') ||
          voice.name.includes('Hindi')
        );
        
        if (indianVoice) {
          newSpeech.voice = indianVoice;
        }
        newSpeech.rate = 0.9; // Slightly slower
        newSpeech.pitch = 1;
      }, 100);
      
      setSpeech(newSpeech);
      
      return () => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, []);

  // Handle text-to-speech
  const handleReadContent = (text: string) => {
    if (!speech) return;
    
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    
    speech.text = text;
    window.speechSynthesis.speak(speech);
    setIsReading(true);
    
    speech.onend = () => {
      setIsReading(false);
    };
  };

  // Get text for current tab to read
  const getCurrentTabContent = (): string => {
    if (activeTab === "explanation") {
      return concept.content?.[activeExplanationTab] || "No content available";
    } else if (activeTab === "examples") {
      return concept.examples?.join(". ") || "No examples available";
    } else if (activeTab === "mistakes") {
      return concept.commonMistakes?.join(". ") || "No common mistakes information available";
    } else if (activeTab === "relevance") {
      return concept.examRelevance || "No exam relevance information available";
    } else if (activeTab === "quiz") {
      return "Practice quiz for this concept. Test your knowledge with these questions.";
    }
    return "No content available";
  };

  const handleNavigateToRelated = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Downloaded",
      description: "Concept notes have been downloaded successfully.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'border-green-500 bg-green-50';
      case 'medium': return 'border-amber-500 bg-amber-50';
      case 'hard': return 'border-red-500 bg-red-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  const getDifficultyTextColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-700';
      case 'medium': return 'text-amber-700';
      case 'hard': return 'text-red-700';
      default: return 'text-blue-700';
    }
  };

  if (!concept) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold">Concept not found</h2>
        <p className="text-gray-500 mt-2">
          The concept you're looking for may not exist or has been moved.
        </p>
        <Link to="/dashboard/student/concepts/all">
          <Button className="mt-4">View All Concepts</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Enhanced Header with navigation */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Link
          to="/dashboard/student/concepts/all"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to All Concepts
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{concept.title}</h1>
              {concept.completed && (
                <Badge 
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  Completed
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-1">
              <div className="flex items-center gap-1">
                <Book size={16} />
                <span>{concept.subject}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <BookOpen size={16} />
                <span>{concept.chapter}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{concept.estimatedTime} minutes</span>
              </div>
              
              <div className={`flex items-center gap-1 ${getDifficultyTextColor(concept.difficulty)}`}>
                <BrainCircuit size={16} />
                <span>{concept.difficulty} difficulty</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => handleReadContent(getCurrentTabContent())}
              className="flex items-center gap-2"
            >
              {isReading ? <VolumeX size={16} /> : <Volume2 size={16} />}
              {isReading ? "Stop Reading" : "Read Aloud"}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleDownloadPDF}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Download PDF
            </Button>
            
            {!concept.completed && (
              <Button
                onClick={onMarkCompleted}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle size={16} />
                Mark as Completed
              </Button>
            )}
          </div>
        </div>
        
        {/* Learning progress bar */}
        {concept.progress !== undefined && (
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Learning Progress</span>
              <span>{concept.progress}%</span>
            </div>
            <Progress value={concept.progress} className="h-2" />
          </div>
        )}
      </div>

      {/* Main content with enhanced tabs */}
      <Card className="border shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
          <h2 className="text-white text-xl font-semibold flex items-center gap-2">
            <Brain size={24} />
            Learning Material
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Comprehensive study materials for {concept.title}
          </p>
        </div>
        
        <Tabs defaultValue="explanation" value={activeTab} onValueChange={setActiveTab} className="p-6">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="explanation" className="flex items-center gap-2">
              <Book size={16} />
              <span>Explanation</span>
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <Lightbulb size={16} />
              <span>Examples</span>
            </TabsTrigger>
            <TabsTrigger value="mistakes" className="flex items-center gap-2">
              <AlertTriangle size={16} />
              <span>Common Mistakes</span>
            </TabsTrigger>
            <TabsTrigger value="relevance" className="flex items-center gap-2">
              <Award size={16} />
              <span>Exam Relevance</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <FileText size={16} />
              <span>Practice Quiz</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explanation" className="space-y-6 animate-in fade-in-50">
            <Tabs defaultValue="basic" value={activeExplanationTab} onValueChange={setActiveExplanationTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="detailed">Detailed</TabsTrigger>
                <TabsTrigger value="simplified">Simplified</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="text-blue-600" size={18} />
                  <span className="font-medium">Learning Tip:</span>
                  <span className="text-sm">Choose the explanation level that suits your current understanding.</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-700"
                  onClick={() => handleReadContent(getCurrentTabContent())}
                >
                  <Volume2 size={14} className="mr-1" />
                  Read Aloud
                </Button>
              </div>
              
              <TabsContent value="basic" className="animate-in fade-in-50">
                <Card className="border border-blue-100">
                  <CardContent className="pt-6 prose max-w-none">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-blue-800 m-0">Basic Explanation</h3>
                      <Button variant="ghost" size="sm" onClick={() => handleReadContent(concept.content?.basic || "")}>
                        <Volume2 size={16} className="mr-1" /> Listen
                      </Button>
                    </div>
                    <Separator className="my-2" />
                    <p>{concept.content?.basic || "No basic explanation available."}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="detailed" className="animate-in fade-in-50">
                <Card className="border border-green-100">
                  <CardContent className="pt-6 prose max-w-none">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-green-800 m-0">Detailed Explanation</h3>
                      <Button variant="ghost" size="sm" onClick={() => handleReadContent(concept.content?.detailed || "")}>
                        <Volume2 size={16} className="mr-1" /> Listen
                      </Button>
                    </div>
                    <Separator className="my-2" />
                    <p>{concept.content?.detailed || "No detailed explanation available."}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="simplified" className="animate-in fade-in-50">
                <Card className="border border-purple-100">
                  <CardContent className="pt-6 prose max-w-none">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-purple-800 m-0">Simplified Explanation</h3>
                      <Button variant="ghost" size="sm" onClick={() => handleReadContent(concept.content?.simplified || "")}>
                        <Volume2 size={16} className="mr-1" /> Listen
                      </Button>
                    </div>
                    <Separator className="my-2" />
                    <p>{concept.content?.simplified || "No simplified explanation available."}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="advanced" className="animate-in fade-in-50">
                <Card className="border border-red-100">
                  <CardContent className="pt-6 prose max-w-none">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-red-800 m-0">Advanced Explanation</h3>
                      <Button variant="ghost" size="sm" onClick={() => handleReadContent(concept.content?.advanced || "")}>
                        <Volume2 size={16} className="mr-1" /> Listen
                      </Button>
                    </div>
                    <Separator className="my-2" />
                    <p>{concept.content?.advanced || "No advanced explanation available."}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="examples" className="animate-in fade-in-50">
            <div className="bg-yellow-50 p-4 rounded-lg mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="text-yellow-600" size={18} />
                <span className="font-medium">Learning through examples:</span>
                <span className="text-sm">See how this concept is applied in real situations.</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-yellow-700"
                onClick={() => handleReadContent(concept.examples?.join(". ") || "")}
              >
                <Volume2 size={14} className="mr-1" />
                Read Examples
              </Button>
            </div>
            
            <Card className="border border-yellow-100">
              <CardContent className="pt-6 prose max-w-none">
                <h3 className="text-xl font-semibold text-yellow-800">Real-World Examples</h3>
                {concept.examples && concept.examples.length > 0 ? (
                  <ol className="list-decimal pl-5 space-y-4 mt-4">
                    {concept.examples.map((example: string, index: number) => (
                      <li key={index} className="pl-2 pb-3 border-b border-yellow-100 last:border-0">
                        <p>{example}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-1 text-yellow-700" 
                          onClick={() => handleReadContent(example)}
                        >
                          <Volume2 size={12} className="mr-1" /> Listen
                        </Button>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-gray-500 mt-2">No examples available for this concept.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mistakes" className="animate-in fade-in-50">
            <div className="bg-red-50 p-4 rounded-lg mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-red-600" size={18} />
                <span className="font-medium">Avoid these errors:</span>
                <span className="text-sm">Common mistakes students make with this concept.</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-700"
                onClick={() => handleReadContent(concept.commonMistakes?.join(". ") || "")}
              >
                <Volume2 size={14} className="mr-1" />
                Read Aloud
              </Button>
            </div>
            
            <Card className="border border-red-100">
              <CardContent className="pt-6 prose max-w-none">
                <h3 className="text-xl font-semibold text-red-800">Common Mistakes</h3>
                {concept.commonMistakes && concept.commonMistakes.length > 0 ? (
                  <ul className="space-y-4 mt-4">
                    {concept.commonMistakes.map((mistake: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 pb-3 border-b border-red-100 last:border-0">
                        <AlertTriangle className="text-red-500 shrink-0 mt-1" size={16} />
                        <div>
                          <p className="mb-1">{mistake}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-700" 
                            onClick={() => handleReadContent(mistake)}
                          >
                            <Volume2 size={12} className="mr-1" /> Listen
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No common mistakes information available for this concept.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relevance" className="animate-in fade-in-50">
            <div className="bg-blue-50 p-4 rounded-lg mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="text-blue-600" size={18} />
                <span className="font-medium">Exam Strategy:</span>
                <span className="text-sm">How this topic appears in your target exam.</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-700"
                onClick={() => handleReadContent(concept.examRelevance || "")}
              >
                <Volume2 size={14} className="mr-1" />
                Read Aloud
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-blue-100">
                <CardContent className="pt-6 prose max-w-none">
                  <h3 className="text-xl font-semibold text-blue-800">Exam Relevance</h3>
                  {concept.examRelevance ? (
                    <div className="bg-blue-50 p-4 rounded-lg mt-4">
                      <div className="flex items-start gap-2">
                        <Award className="text-blue-600 shrink-0 mt-1" size={20} />
                        <p className="text-blue-800">{concept.examRelevance}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 mt-2">No exam relevance information available for this concept.</p>
                  )}
                </CardContent>
              </Card>
              
              <Card className="border border-blue-100">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Previous Years' Analysis</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Frequency in Exams</span>
                        <span className="text-sm font-medium">High</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Average Marks Allotted</span>
                        <span className="text-sm font-medium">5-7 marks</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Difficulty Level</span>
                        <span className="text-sm font-medium">{concept.difficulty}</span>
                      </div>
                      <Progress value={concept.difficulty === 'hard' ? 90 : concept.difficulty === 'medium' ? 60 : 30} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="animate-in fade-in-50">
            <div className="bg-green-50 p-4 rounded-lg mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="text-green-600" size={18} />
                <span className="font-medium">Practice Makes Perfect:</span>
                <span className="text-sm">Test your knowledge with these practice questions.</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-green-700 border-green-300"
              >
                <BarChart2 size={14} className="mr-1" />
                View Quiz History
              </Button>
            </div>
            
            <Card className="border border-green-100 mb-4">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-green-800 flex items-center gap-2 mb-4">
                  <FileText />
                  Practice Questions
                </h3>

                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium mb-2">1. What is the key principle behind {concept.title}?</p>
                    <div className="space-y-2 ml-6 mt-4">
                      <div className="flex items-center gap-2">
                        <input type="radio" id="q1-a" name="q1" />
                        <label htmlFor="q1-a">Option A</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="q1-b" name="q1" />
                        <label htmlFor="q1-b">Option B</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="q1-c" name="q1" />
                        <label htmlFor="q1-c">Option C</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="q1-d" name="q1" />
                        <label htmlFor="q1-d">Option D</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium mb-2">2. Calculate the result when applying {concept.title} to the following scenario:</p>
                    <p className="text-gray-600 mb-4">A sample problem related to this concept would appear here.</p>
                    <textarea 
                      className="w-full border p-2 rounded-md"
                      rows={3}
                      placeholder="Enter your answer here..."
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Check className="mr-2 h-4 w-4" />
                      Submit Answers
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Related concepts section with improved UI */}
      {concept.relatedConcepts && concept.relatedConcepts.length > 0 && (
        <Card className="border shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Brain className="text-violet-600" />
              <span>Related Concepts</span>
            </h2>
            <p className="text-gray-500 mb-4">
              Continue your learning journey with these related topics
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {concept.relatedConcepts.map((relatedId: string) => (
                <Button
                  key={relatedId}
                  variant="outline"
                  onClick={() => handleNavigateToRelated(relatedId)}
                  className="justify-start h-auto py-4 px-4 bg-gray-50 hover:bg-gray-100 border-gray-200"
                >
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen size={16} className="text-blue-600" />
                      <span className="font-medium">Related Concept</span>
                    </div>
                    <span className="text-sm text-gray-600">View content for concept {relatedId}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Action buttons */}
      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" asChild>
          <Link to="/dashboard/student/concepts/all">
            <ArrowLeft size={16} className="mr-2" /> Back to All Concepts
          </Link>
        </Button>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download size={16} />
            Download Notes
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <BookmarkPlus size={16} />
            Bookmark
          </Button>
          
          {!concept.completed && (
            <Button onClick={onMarkCompleted} className="bg-green-600 hover:bg-green-700">
              <Check size={16} className="mr-2" />
              Mark Complete
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ConceptCardDetailView;

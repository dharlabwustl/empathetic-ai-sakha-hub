
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
} from "lucide-react";
import { ConceptCard } from "@/hooks/useUserStudyPlan";
import { toast } from "@/components/ui/toast";

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
  const navigate = useNavigate();

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const newSpeech = new SpeechSynthesisUtterance();
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
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
    setIsReading(true);
    
    speech.onend = () => {
      setIsReading(false);
    };
  };

  // Get text for current tab to read
  const getCurrentTabContent = (): string => {
    if (activeTab === "explanation") {
      return concept.content[activeExplanationTab] || "No content available";
    } else if (activeTab === "examples") {
      return concept.examples?.join(". ") || "No examples available";
    } else if (activeTab === "mistakes") {
      return concept.commonMistakes?.join(". ") || "No common mistakes information available";
    } else if (activeTab === "relevance") {
      return concept.examRelevance || "No exam relevance information available";
    }
    return "No content available";
  };

  const handleNavigateToRelated = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
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
      {/* Header with navigation */}
      <div>
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
            
            {!concept.completed && (
              <Button
                onClick={onMarkCompleted}
                className="flex items-center gap-2"
              >
                <CheckCircle size={16} />
                Mark as Completed
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main content with tabs */}
      <Card className="border-t-4 shadow-sm" style={{ borderTopColor: getDifficultyColor(concept.difficulty).split(' ')[0].replace('border-', '') }}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BrainCircuit className={getDifficultyTextColor(concept.difficulty)} size={20} />
              <span className={`font-semibold ${getDifficultyTextColor(concept.difficulty)}`}>
                {concept.difficulty} Difficulty
              </span>
            </div>
            
            {concept.completed && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={16} />
                <span>Mastered</span>
              </div>
            )}
          </div>
          
          <Tabs defaultValue="explanation" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 mb-6">
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
            </TabsList>

            <TabsContent value="explanation" className="space-y-6 animate-in fade-in-50">
              <Tabs defaultValue="basic" value={activeExplanationTab} onValueChange={setActiveExplanationTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed</TabsTrigger>
                  <TabsTrigger value="simplified">Simplified</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="animate-in fade-in-50">
                  <div className="prose max-w-none">
                    <p>{concept.content?.basic || "No basic explanation available."}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="detailed" className="animate-in fade-in-50">
                  <div className="prose max-w-none">
                    <p>{concept.content?.detailed || "No detailed explanation available."}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="simplified" className="animate-in fade-in-50">
                  <div className="prose max-w-none">
                    <p>{concept.content?.simplified || "No simplified explanation available."}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="advanced" className="animate-in fade-in-50">
                  <div className="prose max-w-none">
                    <p>{concept.content?.advanced || "No advanced explanation available."}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="examples" className="animate-in fade-in-50">
              <div className="prose max-w-none space-y-4">
                <h3 className="text-xl font-semibold">Real-World Examples</h3>
                {concept.examples && concept.examples.length > 0 ? (
                  <ol className="list-decimal pl-5 space-y-3">
                    {concept.examples.map((example: string, index: number) => (
                      <li key={index} className="pl-2">{example}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-gray-500">No examples available for this concept.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="mistakes" className="animate-in fade-in-50">
              <div className="prose max-w-none space-y-4">
                <h3 className="text-xl font-semibold">Common Mistakes</h3>
                {concept.commonMistakes && concept.commonMistakes.length > 0 ? (
                  <ul className="space-y-3">
                    {concept.commonMistakes.map((mistake: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="text-red-500 shrink-0 mt-1" size={16} />
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No common mistakes information available for this concept.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="relevance" className="animate-in fade-in-50">
              <div className="prose max-w-none space-y-4">
                <h3 className="text-xl font-semibold">Exam Relevance</h3>
                {concept.examRelevance ? (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Award className="text-blue-600 shrink-0 mt-1" size={20} />
                      <p className="text-blue-800">{concept.examRelevance}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No exam relevance information available for this concept.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Related concepts section */}
      {concept.relatedConcepts && concept.relatedConcepts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Related Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {concept.relatedConcepts.map((relatedId: string) => (
              <Button
                key={relatedId}
                variant="outline"
                onClick={() => handleNavigateToRelated(relatedId)}
                className="justify-start h-auto py-3 px-4 bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-blue-600" />
                  <span>Concept {relatedId}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ConceptCardDetailView;

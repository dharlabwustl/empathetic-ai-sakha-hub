import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, BookOpen, Clock, ArrowLeft, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { ConceptCard } from '@/hooks/useUserStudyPlan';
import { Link } from 'react-router-dom';

interface ConceptCardDetailViewProps {
  concept: any;
  onMarkCompleted?: () => void;
}

const ConceptCardDetailView: React.FC<ConceptCardDetailViewProps> = ({
  concept,
  onMarkCompleted
}) => {
  const [activeTab, setActiveTab] = useState<string>("explanation");
  const [activeSubTab, setActiveSubTab] = useState<string>("basic");
  const [isReading, setIsReading] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initialize speech synthesis
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
  
  // Handle speech for content
  const handleSpeech = (text: string) => {
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
  
  const getContentForVoice = () => {
    switch (activeTab) {
      case "explanation":
        return concept.content[activeSubTab] || "No content available";
      case "examples":
        return Array.isArray(concept.examples) 
          ? "Examples: " + concept.examples.join(". Next example. ") 
          : "No examples available";
      case "mistakes":
        return Array.isArray(concept.commonMistakes) 
          ? "Common mistakes: " + concept.commonMistakes.join(". Next mistake. ") 
          : "No common mistakes information available";
      case "relevance":
        return concept.examRelevance || "No exam relevance information available";
      default:
        return "No content available for this section";
    }
  };
  
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <Link to="/dashboard/student/concepts/all" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft size={16} className="mr-1" /> Back to Concepts
          </Link>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleSpeech(getContentForVoice())}
              className="flex items-center gap-1"
            >
              {isReading ? <VolumeX size={16} /> : <Volume2 size={16} />}
              {isReading ? "Stop Reading" : "Read Aloud"}
            </Button>
            
            {!concept.completed && (
              <Button 
                size="sm" 
                onClick={onMarkCompleted}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Mark as Completed
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">{concept.name || concept.title}</h1>
          <Badge 
            variant={concept.completed ? "outline" : "default"}
            className={`${concept.completed ? "border-green-600 text-green-600" : "bg-blue-600"} px-3 py-1`}
          >
            {concept.completed ? "Completed" : "In Progress"}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-1">
            <Book size={16} />
            <span>{concept.subject}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <BookOpen size={16} />
            <span>{concept.topic || concept.chapter}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{concept.estimatedTime} minutes</span>
          </div>
          
          <Badge variant="outline" className={getDifficultyClass(concept.difficulty)}>
            {concept.difficulty}
          </Badge>
        </div>
      </div>
      
      {/* Main content with tabs */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="explanation" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="explanation">Explanation</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
              <TabsTrigger value="relevance">Exam Relevance</TabsTrigger>
            </TabsList>
            
            {/* Explanation Tab with Sub-tabs */}
            <TabsContent value="explanation" className="space-y-4">
              <Tabs defaultValue="basic" value={activeSubTab} onValueChange={setActiveSubTab}>
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed</TabsTrigger>
                  <TabsTrigger value="simplified">Simplified</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="mt-4 text-gray-800 leading-relaxed">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    {concept.content?.basic || "Basic explanation not available."}
                  </div>
                </TabsContent>
                
                <TabsContent value="detailed" className="mt-4 text-gray-800 leading-relaxed">
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    {concept.content?.detailed || "Detailed explanation not available."}
                  </div>
                </TabsContent>
                
                <TabsContent value="simplified" className="mt-4 text-gray-800 leading-relaxed">
                  <div className="p-4 bg-green-50 rounded-lg">
                    {concept.content?.simplified || "Simplified explanation not available."}
                  </div>
                </TabsContent>
                
                <TabsContent value="advanced" className="mt-4 text-gray-800 leading-relaxed">
                  <div className="p-4 bg-amber-50 rounded-lg">
                    {concept.content?.advanced || "Advanced explanation not available."}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSpeech(concept.content?.[activeSubTab] || "No content available")}
                  className="flex items-center gap-1"
                >
                  {isReading ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  {isReading ? "Stop" : "Read This Section"}
                </Button>
              </div>
            </TabsContent>
            
            {/* Examples Tab */}
            <TabsContent value="examples" className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg space-y-4">
                <h3 className="font-medium text-lg text-blue-800">Real World Examples</h3>
                {Array.isArray(concept.examples) && concept.examples.length > 0 ? (
                  <ul className="space-y-3 list-disc pl-5">
                    {concept.examples.map((example: string, index: number) => (
                      <li key={index} className="text-gray-800">{example}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No examples available for this concept.</p>
                )}
              </div>
              
              <div className="flex justify-end mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSpeech(Array.isArray(concept.examples) ? 
                    "Examples: " + concept.examples.join(". Next example. ") : 
                    "No examples available")}
                  className="flex items-center gap-1"
                >
                  {isReading ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  {isReading ? "Stop" : "Read Examples"}
                </Button>
              </div>
            </TabsContent>
            
            {/* Common Mistakes Tab */}
            <TabsContent value="mistakes" className="space-y-4">
              <div className="p-5 bg-red-50 rounded-lg space-y-4">
                <h3 className="font-medium text-lg text-red-800">Common Mistakes to Avoid</h3>
                {Array.isArray(concept.commonMistakes) && concept.commonMistakes.length > 0 ? (
                  <ul className="space-y-3 list-disc pl-5">
                    {concept.commonMistakes.map((mistake: string, index: number) => (
                      <li key={index} className="text-gray-800">{mistake}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No common mistakes listed for this concept.</p>
                )}
              </div>
              
              <div className="flex justify-end mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSpeech(Array.isArray(concept.commonMistakes) ? 
                    "Common mistakes to avoid: " + concept.commonMistakes.join(". Next mistake. ") : 
                    "No common mistakes information available")}
                  className="flex items-center gap-1"
                >
                  {isReading ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  {isReading ? "Stop" : "Read Mistakes"}
                </Button>
              </div>
            </TabsContent>
            
            {/* Exam Relevance Tab */}
            <TabsContent value="relevance" className="space-y-4">
              <div className="p-5 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-lg text-purple-800 mb-3">Exam Relevance</h3>
                <div className="text-gray-800 leading-relaxed">
                  {concept.examRelevance || "No exam relevance information available for this concept."}
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSpeech(concept.examRelevance || "No exam relevance information available")}
                  className="flex items-center gap-1"
                >
                  {isReading ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  {isReading ? "Stop" : "Read Relevance"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Related concepts section */}
      {concept.relatedConcepts && concept.relatedConcepts.length > 0 && (
        <div className="pt-4">
          <h3 className="text-xl font-medium mb-4">Related Concepts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {concept.relatedConcepts.map((relatedId: string) => (
              <RelatedConceptCard key={relatedId} conceptId={relatedId} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for related concepts
const RelatedConceptCard = ({ conceptId }: { conceptId: string }) => {
  const { conceptCards } = useUserStudyPlan();
  const relatedConcept = conceptCards.find(c => c.id === conceptId);
  
  if (!relatedConcept) return null;
  
  return (
    <Link to={`/dashboard/student/concepts/${conceptId}`}>
      <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <h4 className="font-medium">{relatedConcept.title}</h4>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-600">{relatedConcept.subject}</span>
            <ArrowRight size={16} className="text-blue-500" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

// Helper functions
const getDifficultyClass = (difficulty: string): string => {
  switch (difficulty?.toLowerCase()) {
    case 'easy': return 'bg-green-50 text-green-700 border-green-200';
    case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'hard': return 'bg-red-50 text-red-700 border-red-200';
    default: return '';
  }
};

// Import the hook at the top
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';

export default ConceptCardDetailView;

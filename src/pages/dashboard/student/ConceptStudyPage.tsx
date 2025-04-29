
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  ChevronLeft, 
  Book, 
  Video, 
  FileText,
  ArrowRight, 
  CheckCircle,
  Bookmark,
  Share2,
  MessageSquare,
  Play,
  Volume2,
  Calculator
} from 'lucide-react';

// Mock concept data (replace with API call in a real app)
const mockConcept = {
  id: '1',
  title: "Newton's Third Law of Motion",
  subject: "Physics",
  chapter: "Laws of Motion",
  difficulty: "Medium",
  relatedConcepts: [
    { id: '2', title: "Newton's First Law" },
    { id: '3', title: "Newton's Second Law" },
    { id: '4', title: "Conservation of Momentum" }
  ],
  content: {
    simple: "Newton's Third Law states that for every action, there is an equal and opposite reaction. This means that if object A exerts a force on object B, then object B exerts an equal force in the opposite direction on object A.",
    detailed: "Newton's Third Law of Motion states that for every action, there is an equal and opposite reaction. This fundamental principle explains the nature of forces as interactions between objects. When one object exerts a force on a second object, the second object simultaneously exerts a force of equal magnitude in the opposite direction on the first object. This law is often expressed mathematically as F₁₂ = -F₂₁, where F₁₂ is the force exerted by object 1 on object 2, and F₂₁ is the force exerted by object 2 on object 1.",
    examples: [
      {
        title: "Rocket Propulsion",
        description: "A rocket expels gas backwards (action), which creates a forward thrust on the rocket (reaction)."
      },
      {
        title: "Walking",
        description: "When you walk, you push the ground backwards with your foot (action), and the ground pushes you forward (reaction)."
      },
      {
        title: "Swimming",
        description: "Swimmers push water backwards (action), and the water pushes them forward (reaction)."
      }
    ],
    diagrams: [
      {
        title: "Force Pair Diagram",
        imageUrl: "https://placeholder.com/newton-third-law.png",
        description: "Illustration showing the equal and opposite forces acting on two objects."
      }
    ],
    examRelevance: "This concept appears frequently in mechanics problems involving collisions, rocket propulsion, and connected systems. Expect questions that require identifying action-reaction pairs or calculating forces in interacting systems.",
    commonMistakes: [
      "Confusing action-reaction pairs with balanced forces. Action-reaction forces act on different objects, while balanced forces act on the same object.",
      "Assuming that equal and opposite forces cancel each other out. They don't, because they act on different objects.",
      "Applying the law incorrectly in non-inertial reference frames."
    ],
    videoExplanation: "https://example.com/newton-third-law-video"
  }
};

const ConceptStudyPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [concept, setConcept] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('simple');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  
  useEffect(() => {
    // In a real app, fetch concept data by ID from an API
    setTimeout(() => {
      setConcept(mockConcept);
      setLoading(false);
    }, 500);
  }, [conceptId]);
  
  const handleBack = () => {
    navigate('/dashboard/student/concepts');
  };
  
  const handleMarkComplete = () => {
    // In a real app, mark the concept as completed in the user's progress
    console.log(`Marked concept ${conceptId} as completed`);
  };
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    // In a real app, start or stop text-to-speech here
  };
  
  if (loading) {
    return (
      <SharedPageLayout title="Loading Concept...">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }
  
  if (!concept) {
    return (
      <SharedPageLayout title="Concept Not Found">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">The concept you're looking for could not be found.</p>
            <Button onClick={handleBack}>
              <ChevronLeft size={16} className="mr-2" />
              Back to Concepts
            </Button>
          </CardContent>
        </Card>
      </SharedPageLayout>
    );
  }
  
  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} • ${concept.chapter}`}
    >
      <div className="mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack}
          className="flex items-center gap-1"
        >
          <ChevronLeft size={16} />
          Back to Concepts
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{concept.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {concept.subject}
                    </Badge>
                    <Badge variant="outline">{concept.chapter}</Badge>
                    <Badge variant={
                      concept.difficulty === 'Easy' ? 'outline' : 
                      concept.difficulty === 'Medium' ? 'secondary' : 'destructive'
                    }>
                      {concept.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={toggleBookmark}
                    className={isBookmarked ? "text-amber-500" : "text-gray-400"}
                  >
                    <Bookmark size={20} />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={toggleVoice}
                    className={isVoiceActive ? "text-indigo-500" : "text-gray-400"}
                  >
                    <Volume2 size={20} />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-gray-400">
                    <Share2 size={20} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
                <TabsList className="grid grid-cols-6 w-full mb-4">
                  <TabsTrigger value="simple">Simple</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
                  <TabsTrigger value="exam">Exam Notes</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>
                
                <TabsContent value="simple" className="pt-2">
                  <p>{concept.content.simple}</p>
                </TabsContent>
                
                <TabsContent value="detailed" className="pt-2">
                  <p>{concept.content.detailed}</p>
                </TabsContent>
                
                <TabsContent value="examples" className="pt-2">
                  <div className="space-y-4">
                    {concept.content.examples.map((example: any, index: number) => (
                      <div 
                        key={index} 
                        className="p-4 border rounded-lg bg-blue-50 border-blue-100"
                      >
                        <h3 className="font-medium text-lg mb-2">{example.title}</h3>
                        <p>{example.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="diagrams" className="pt-2">
                  <div className="space-y-4">
                    {concept.content.diagrams.map((diagram: any, index: number) => (
                      <div key={index} className="text-center">
                        <div className="bg-gray-100 p-6 rounded-lg mb-2 flex items-center justify-center">
                          <FileText size={48} className="text-gray-400" />
                        </div>
                        <h3 className="font-medium">{diagram.title}</h3>
                        <p className="text-sm text-muted-foreground">{diagram.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="exam" className="pt-2">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Exam Relevance</h3>
                    <p>{concept.content.examRelevance}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Common Mistakes</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {concept.content.commonMistakes.map((mistake: string, index: number) => (
                        <li key={index}>{mistake}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="video" className="pt-2">
                  <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center justify-center">
                    <div className="mb-4 bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center">
                      <Play size={24} />
                    </div>
                    <p className="text-center text-muted-foreground">
                      Click to watch video explanation of {concept.title}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button onClick={handleBack} variant="outline">
                <ChevronLeft size={16} className="mr-2" />
                Back
              </Button>
              <Button onClick={handleMarkComplete} className="bg-green-600 hover:bg-green-700">
                <CheckCircle size={16} className="mr-2" />
                Mark as Completed
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen size={18} />
                Related Concepts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {concept.relatedConcepts.map((relatedConcept: any) => (
                <Button 
                  key={relatedConcept.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate(`/dashboard/student/concepts/study/${relatedConcept.id}`)}
                >
                  <Book size={16} className="mr-2" /> {relatedConcept.title}
                </Button>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator size={18} />
                Study Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center">
                  <Video size={16} className="mr-2" /> Watch Tutorial Video
                </span>
                <ArrowRight size={14} />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center">
                  <FileText size={16} className="mr-2" /> Practice Problems
                </span>
                <ArrowRight size={14} />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center">
                  <MessageSquare size={16} className="mr-2" /> Ask AI Tutor
                </span>
                <ArrowRight size={14} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptStudyPage;

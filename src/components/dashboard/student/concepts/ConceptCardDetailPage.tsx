
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, Video, FileText, Brain, MessageSquareText, 
  Flag, Check, ArrowLeft, Clock, Play, VolumeX, Volume2,
  Lightbulb, BookMarked, Puzzle, FlaskConical, CheckCircle
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import SharedPageLayout from '@/components/dashboard/student/SharedPageLayout';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';

interface KeyPoint {
  id: string;
  content: string;
}

interface Formula {
  id: string;
  name: string;
  formula: string;
  explanation: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { conceptCards, loading } = useUserStudyPlan();
  const [activeTab, setActiveTab] = useState('overview');
  const [concept, setConcept] = useState<any>(null);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Generate synthetic data for the concept if we can't find it in the study plan
  useEffect(() => {
    if (!loading) {
      console.log(`Searching for concept with ID: ${conceptId}`);
      const foundConcept = conceptCards.find(card => card.id === conceptId);
      
      if (foundConcept) {
        // Add required fields if they don't exist
        const enhancedConcept = {
          ...foundConcept,
          keyPoints: foundConcept.keyPoints || [
            { id: "kp1", content: "NEET candidates must understand the relationship between pressure, volume and temperature in gases" },
            { id: "kp2", content: "The ideal gas law combines Boyle's Law, Charles's Law, and Avogadro's Law into one equation: PV = nRT" },
            { id: "kp3", content: "Different gas constants (R) are used depending on the units (L·atm/mol·K or J/mol·K)" },
            { id: "kp4", content: "Real gases deviate from ideal behavior at high pressures and low temperatures" },
            { id: "kp5", content: "NEET questions frequently test conversion between different gas law equations" }
          ],
          formulas: foundConcept.formulas || [
            {
              id: "f1",
              name: "Ideal Gas Law",
              formula: "PV = nRT",
              explanation: "P is pressure, V is volume, n is moles of gas, R is gas constant, and T is temperature in Kelvin"
            },
            {
              id: "f2",
              name: "Boyle's Law",
              formula: "P₁V₁ = P₂V₂",
              explanation: "At constant temperature, pressure × volume = constant"
            },
            {
              id: "f3",
              name: "Charles's Law",
              formula: "V₁/T₁ = V₂/T₂",
              explanation: "At constant pressure, volume ÷ temperature = constant"
            }
          ],
          questions: [
            {
              id: "q1",
              question: "What is the volume occupied by 4.4 g of CO₂ at STP?",
              options: ["2.24 L", "22.4 L", "1.12 L", "44.8 L"],
              correctAnswer: 0,
              explanation: "At STP, 1 mole occupies 22.4 L. 4.4 g CO₂ is 0.1 moles (44 g/mol), so it occupies 0.1 × 22.4 = 2.24 L"
            },
            {
              id: "q2",
              question: "Which law states that at constant temperature, the pressure of a gas is inversely proportional to its volume?",
              options: ["Charles's Law", "Boyle's Law", "Gay-Lussac's Law", "Avogadro's Law"],
              correctAnswer: 1,
              explanation: "Boyle's Law states that at constant temperature, P₁V₁ = P₂V₂"
            }
          ],
          videos: [
            {
              id: "v1",
              title: "Gas Laws Explained",
              url: "https://www.example.com/gas-laws-video",
              duration: "10:23",
              thumbnail: "https://via.placeholder.com/320x180.png?text=Gas+Laws"
            },
            {
              id: "v2",
              title: "Solving NEET Gas Problems",
              url: "https://www.example.com/neet-gas-problems",
              duration: "15:45",
              thumbnail: "https://via.placeholder.com/320x180.png?text=NEET+Problems"
            }
          ],
          notes: [],
          mastery: foundConcept.mastery || 65
        };
        
        console.log("Found and enhanced concept:", enhancedConcept);
        setConcept(enhancedConcept);
      } else {
        console.log(`Concept with ID: ${conceptId} not found`);
        // Create a fallback concept with the ID
        setConcept({
          id: conceptId,
          title: "Gas Laws and Properties",
          subject: "Chemistry",
          chapter: "States of Matter",
          difficulty: "medium",
          timeEstimate: 25,
          mastery: 65,
          priority: 2,
          completed: false,
          status: "in-progress",
          keyPoints: [
            { id: "kp1", content: "NEET candidates must understand the relationship between pressure, volume and temperature in gases" },
            { id: "kp2", content: "The ideal gas law combines Boyle's Law, Charles's Law, and Avogadro's Law into one equation: PV = nRT" },
            { id: "kp3", content: "Different gas constants (R) are used depending on the units (L·atm/mol·K or J/mol·K)" },
            { id: "kp4", content: "Real gases deviate from ideal behavior at high pressures and low temperatures" },
            { id: "kp5", content: "NEET questions frequently test conversion between different gas law equations" }
          ],
          formulas: [
            {
              id: "f1",
              name: "Ideal Gas Law",
              formula: "PV = nRT",
              explanation: "P is pressure, V is volume, n is moles of gas, R is gas constant, and T is temperature in Kelvin"
            },
            {
              id: "f2",
              name: "Boyle's Law",
              formula: "P₁V₁ = P₂V₂",
              explanation: "At constant temperature, pressure × volume = constant"
            },
            {
              id: "f3",
              name: "Charles's Law",
              formula: "V₁/T₁ = V₂/T₂",
              explanation: "At constant pressure, volume ÷ temperature = constant"
            }
          ],
          questions: [
            {
              id: "q1",
              question: "What is the volume occupied by 4.4 g of CO₂ at STP?",
              options: ["2.24 L", "22.4 L", "1.12 L", "44.8 L"],
              correctAnswer: 0,
              explanation: "At STP, 1 mole occupies 22.4 L. 4.4 g CO₂ is 0.1 moles (44 g/mol), so it occupies 0.1 × 22.4 = 2.24 L"
            },
            {
              id: "q2",
              question: "Which law states that at constant temperature, the pressure of a gas is inversely proportional to its volume?",
              options: ["Charles's Law", "Boyle's Law", "Gay-Lussac's Law", "Avogadro's Law"],
              correctAnswer: 1,
              explanation: "Boyle's Law states that at constant temperature, P₁V₁ = P₂V₂"
            }
          ],
          videos: [
            {
              id: "v1",
              title: "Gas Laws Explained",
              url: "https://www.example.com/gas-laws-video",
              duration: "10:23",
              thumbnail: "https://via.placeholder.com/320x180.png?text=Gas+Laws"
            },
            {
              id: "v2",
              title: "Solving NEET Gas Problems",
              url: "https://www.example.com/neet-gas-problems",
              duration: "15:45",
              thumbnail: "https://via.placeholder.com/320x180.png?text=NEET+Problems"
            }
          ],
          notes: []
        });
      }
    }
  }, [conceptCards, conceptId, loading]);

  if (loading || !concept) {
    return (
      <SharedPageLayout
        title="Loading Concept..."
        subtitle="Please wait while we prepare your study material"
        backButtonUrl="/dashboard/student/concepts"
        showBackButton={true}
      >
        <div className="h-[40vh] flex items-center justify-center">
          <div className="animate-pulse space-y-4 w-full max-w-3xl">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      </SharedPageLayout>
    );
  }

  const handleToggleReadAloud = () => {
    if (isReadingAloud) {
      // Stop reading
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      toast({
        title: "Read-aloud stopped",
        description: "Text-to-speech has been turned off.",
      });
    } else {
      // Start reading the content
      const textToRead = `${concept.title}. ${concept.keyPoints?.map((point: KeyPoint) => point.content).join('. ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.9; // Slightly slower than default
      utterance.onend = () => {
        setIsReadingAloud(false);
      };
      window.speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
      toast({
        title: "Reading aloud",
        description: "The concept content is being read to you.",
      });
    }
  };

  const handleMarkAsCompleted = () => {
    toast({
      title: "Concept marked as completed!",
      description: "Your progress has been updated.",
    });
  };

  const handleFlagForRevision = () => {
    toast({
      title: "Flagged for revision",
      description: "This concept will be added to your revision list.",
    });
  };

  const handleAddNote = () => {
    toast({
      title: "Note added",
      description: "Your note has been saved to this concept.",
    });
  };

  const handleFormulaLabOpen = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
  };

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} > ${concept.chapter}`}
      backButtonUrl="/dashboard/student/concepts"
      showBackButton={true}
    >
      <div className="space-y-6">
        {/* Concept card header with progress */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={
                    concept.difficulty === 'easy' ? 'bg-green-50 text-green-700 border-green-200' :
                    concept.difficulty === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  }>
                    {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                  </Badge>
                  <Badge variant="outline" className={
                    concept.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    concept.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-gray-50 text-gray-700 border-gray-200'
                  }>
                    {concept.status === 'completed' ? 'Completed' :
                     concept.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {concept.timeEstimate} min
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mastery</span>
                    <span>{concept.mastery}%</span>
                  </div>
                  <Progress value={concept.mastery} className="h-2" />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleToggleReadAloud}>
                  {isReadingAloud ? <VolumeX className="h-4 w-4 mr-1" /> : <Volume2 className="h-4 w-4 mr-1" />}
                  {isReadingAloud ? "Stop Reading" : "Read Aloud"}
                </Button>
                
                <Button variant="outline" size="sm" onClick={handleFlagForRevision}>
                  <Flag className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Flag for Revision</span>
                </Button>
                
                {concept.status !== 'completed' ? (
                  <Button size="sm" onClick={handleMarkAsCompleted}>
                    <Check className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Mark as Completed</span>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Completed</span>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for concept content */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab as any} className="space-y-4">
          <TabsList className="grid grid-cols-5 sm:grid-cols-5">
            <TabsTrigger value="overview">
              <BookOpen className="h-4 w-4 mr-1 inline" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="h-4 w-4 mr-1 inline" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger value="practice">
              <Brain className="h-4 w-4 mr-1 inline" />
              <span className="hidden sm:inline">Practice</span>
            </TabsTrigger>
            <TabsTrigger value="formulas">
              <FlaskConical className="h-4 w-4 mr-1 inline" />
              <span className="hidden sm:inline">Formulas</span>
            </TabsTrigger>
            <TabsTrigger value="notes">
              <MessageSquareText className="h-4 w-4 mr-1 inline" />
              <span className="hidden sm:inline">Notes</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium flex items-center mb-4">
                  <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                  Key Points
                </h3>
                <ul className="space-y-3">
                  {concept.keyPoints?.map((point: KeyPoint) => (
                    <li key={point.id} className="flex items-start">
                      <div className="mr-2 mt-1 text-blue-500">•</div>
                      <div>{point.content}</div>
                    </li>
                  ))}
                </ul>
                
                <Separator className="my-6" />
                
                <h3 className="text-lg font-medium flex items-center mb-4">
                  <BookMarked className="h-5 w-5 mr-2 text-violet-500" />
                  Learning Outcomes
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-green-500">✓</div>
                    <div>Explain the relationship between pressure, volume, and temperature of gases</div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-green-500">✓</div>
                    <div>Apply gas law equations to solve NEET-style problems</div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-green-500">✓</div>
                    <div>Understand the limitations of ideal gas behavior</div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Video Lessons</h3>
                
                <div className="grid gap-6">
                  {concept.videos?.map((video: any, index: number) => (
                    <div key={video.id} className="space-y-4">
                      {/* Video Player Placeholder */}
                      <div className="relative aspect-video bg-gray-900 rounded-md overflow-hidden">
                        {index === currentVideoIndex ? (
                          <div className="flex items-center justify-center h-full text-white">
                            <div className="text-center">
                              <Play className="h-16 w-16 mx-auto" />
                              <p className="mt-2">Click to play</p>
                            </div>
                          </div>
                        ) : (
                          <div className="relative h-full">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title} 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                              <Play className="h-16 w-16 text-white opacity-80" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-medium">{video.title}</h4>
                        <p className="text-sm text-gray-500">{video.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {concept.videos?.length === 0 && (
                  <p className="text-center py-8 text-gray-500">No video lessons available for this concept</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium flex items-center mb-4">
                  <Puzzle className="h-5 w-5 mr-2 text-violet-500" />
                  NEET-Style Practice Questions
                </h3>
                
                <div className="space-y-8">
                  {concept.questions?.map((question: Question, index: number) => (
                    <div key={question.id} className="space-y-4 pb-6 border-b last:border-b-0">
                      <div className="font-medium">
                        <span className="text-violet-600 mr-2">{index + 1}.</span>
                        {question.question}
                      </div>
                      
                      <div className="pl-6 space-y-2">
                        {question.options.map((option: string, optionIndex: number) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <div className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                              optionIndex === question.correctAnswer 
                                ? 'border-green-500 text-green-500 bg-green-50' 
                                : 'border-gray-300'
                            }`}>
                              {String.fromCharCode(65 + optionIndex)}
                            </div>
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-md">
                        <p className="text-sm font-medium text-blue-700">Explanation:</p>
                        <p className="text-sm text-blue-600">{question.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {concept.questions?.length === 0 && (
                  <p className="text-center py-8 text-gray-500">No practice questions available for this concept</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Formulas Tab */}
          <TabsContent value="formulas" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <FlaskConical className="h-5 w-5 mr-2 text-blue-500" />
                    Key Formulas
                  </h3>
                  
                  <Button size="sm" onClick={handleFormulaLabOpen}>
                    Practice Formulas
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {concept.formulas?.map((formula: Formula) => (
                    <div key={formula.id} className="border rounded-lg p-4">
                      <h4 className="font-medium text-blue-700">{formula.name}</h4>
                      
                      <div className="my-3 p-3 bg-gray-50 dark:bg-gray-800 rounded text-center">
                        <span className="text-xl font-mono">{formula.formula}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300">{formula.explanation}</p>
                    </div>
                  ))}
                </div>
                
                {concept.formulas?.length === 0 && (
                  <p className="text-center py-8 text-gray-500">No formulas available for this concept</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Your Notes</h3>
                
                {concept.notes && concept.notes.length > 0 ? (
                  <div className="space-y-4">
                    {concept.notes.map((note: any) => (
                      <div key={note.id} className="border rounded-lg p-4">
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-500">{note.date}</p>
                        </div>
                        <p className="mt-2">{note.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't added any notes to this concept yet.</p>
                    <Button onClick={handleAddNote}>Add Note</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetailPage;

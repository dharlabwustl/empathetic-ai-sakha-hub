
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { 
  BookOpen, 
  Video, 
  Lab, 
  FileText, 
  Brain, 
  AlertTriangle, 
  BarChart, 
  Volume2, 
  ArrowLeft, 
  Bookmark, 
  PenLine,
  XCircle,
  CheckCircle2,
  Lightbulb,
  Microscope,
  Undo2
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock concept data
const conceptData = {
  id: '1',
  title: 'Electromagnetic Induction',
  subject: 'Physics',
  chapter: 'Electromagnetism',
  description: "Electromagnetic induction is the production of an electromotive force across an electrical conductor in a changing magnetic field. It's one of the most critical concepts in electromagnetism with numerous practical applications.",
  difficultyLevel: 'medium',
  tags: ['Electromagnetism', 'Induction', 'Magnetic Field', 'Faraday\'s Law', 'Lenz\'s Law'],
  progress: 65,
  hasFormula: true,
  hasVideo: true,
  has3DModel: true,
  totalExamples: 8,
  examMistakes: 5,
  lastStudied: '3 days ago',
  importance: 'high',
  content: {
    summary: `
      Electromagnetic induction is the production of an electromotive force (EMF) across an electrical conductor when it is exposed to a varying magnetic field. This process converts mechanical energy into electrical energy and is the fundamental operating principle of generators, transformers, and many types of motors.
      
      The phenomenon was first discovered by Michael Faraday in 1831, and independently by Joseph Henry in 1832. Faraday's experiments showed that when a magnet is moved through a coil of wire, an electric current flows in the circuit.
    `,
    explanation: `
      <h3>Faraday's Law of Induction</h3>
      <p>Faraday's law states that the induced electromotive force (EMF) in a circuit is equal to the negative of the rate of change of magnetic flux through the circuit:</p>
      <p>EMF = -dΦ/dt</p>
      <p>Where Φ is the magnetic flux, and dΦ/dt is the rate of change of flux with time.</p>
      
      <h3>Lenz's Law</h3>
      <p>Lenz's law provides the direction of the induced current. It states that the direction of the induced current is such that it opposes the change in magnetic flux that produced it.</p>
      
      <h3>Factors Affecting Induced EMF</h3>
      <ul>
        <li>The strength of the magnetic field</li>
        <li>The area of the loop or coil</li>
        <li>The angle between the magnetic field and the plane of the loop</li>
        <li>The rate of change of the magnetic field or the motion of the conductor</li>
      </ul>
    `,
    formulas: [
      {
        name: "Faraday's Law",
        equation: "EMF = -N·(dΦ/dt)",
        variables: [
          { symbol: "EMF", meaning: "Electromotive force (voltage)", unit: "Volts (V)" },
          { symbol: "N", meaning: "Number of turns in the coil", unit: "Dimensionless" },
          { symbol: "dΦ/dt", meaning: "Rate of change of magnetic flux", unit: "Weber/second (Wb/s)" }
        ]
      },
      {
        name: "Magnetic Flux",
        equation: "Φ = B·A·cos(θ)",
        variables: [
          { symbol: "Φ", meaning: "Magnetic flux", unit: "Weber (Wb)" },
          { symbol: "B", meaning: "Magnetic field strength", unit: "Tesla (T)" },
          { symbol: "A", meaning: "Area of the loop", unit: "Square meters (m²)" },
          { symbol: "θ", meaning: "Angle between field and loop normal", unit: "Radians or degrees" }
        ]
      },
      {
        name: "Lenz's Law",
        equation: "Direction of induced current opposes change in flux",
        variables: []
      }
    ],
    examples: [
      {
        id: 1,
        title: "Basic Generator",
        description: "A coil with 100 turns and area 0.05 m² rotates in a magnetic field of 0.2 T. Calculate the maximum EMF induced.",
        solution: "Using EMF = NBA·ω·sin(ωt), the maximum EMF is when sin(ωt) = 1, so EMF_max = NBA·ω = 100·0.2·0.05·2π·50 = 314.16 V"
      },
      {
        id: 2,
        title: "Falling Magnet",
        description: "A magnet falls through a coil. Explain the direction of the induced current as it approaches, passes through, and exits the coil.",
        solution: "Approaching: Current flows to create an upward magnetic field to oppose the increasing downward flux. Passing through: Current reverses to create a downward field to oppose the decreasing downward flux. Exiting: Current flows to create a downward field to oppose the decreasing downward flux."
      }
    ],
    commonMistakes: [
      {
        mistake: "Confusing the direction of induced current",
        correction: "Remember Lenz's law: the induced current creates a magnetic field that opposes the change that produced it, not the field itself."
      },
      {
        mistake: "Forgetting the negative sign in Faraday's law",
        correction: "The negative sign in EMF = -dΦ/dt is critical as it represents Lenz's law mathematically."
      },
      {
        mistake: "Ignoring the angle in flux calculations",
        correction: "The magnetic flux depends on the angle between the field and the loop normal: Φ = B·A·cos(θ)."
      }
    ],
    examQuestions: [
      {
        question: "A circular loop of radius 10 cm is placed in a region with a magnetic field that varies with time as B(t) = (0.5 T/s)·t perpendicular to the loop. Find the EMF induced in the loop at t = 3s.",
        answer: "EMF = -π·r²·dB/dt = -π·(0.1 m)²·0.5 T/s = -0.016 V"
      },
      {
        question: "A conducting rod of length L slides with velocity v on two parallel conducting rails in a uniform magnetic field B perpendicular to the plane. Derive an expression for the EMF induced in the rod.",
        answer: "EMF = B·L·v (The changing area sweeps through the magnetic field, inducing an EMF)"
      }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video URL
    model3DUrl: "https://example.com/3d-model-electromagnetic-induction" // Replace with actual 3D model URL
  }
};

interface TabContentProps {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ children, title, icon }) => {
  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

const SummaryTabContent: React.FC<{ summary: string; handleReadAloud: (text: string) => void }> = ({ summary, handleReadAloud }) => (
  <TabContent title="Summary" icon={<BookOpen className="h-5 w-5" />}>
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleReadAloud(summary)}
          className="flex items-center gap-1"
        >
          <Volume2 className="h-4 w-4" />
          Read Aloud
        </Button>
      </div>
      <div className="text-base whitespace-pre-line">
        {summary}
      </div>
    </div>
  </TabContent>
);

const ExplanationTabContent: React.FC<{ explanation: string; handleReadAloud: (text: string) => void }> = ({ explanation, handleReadAloud }) => (
  <TabContent title="Detailed Explanation" icon={<Brain className="h-5 w-5" />}>
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleReadAloud(explanation.replace(/<[^>]*>/g, ''))}
          className="flex items-center gap-1"
        >
          <Volume2 className="h-4 w-4" />
          Read Aloud
        </Button>
      </div>
      <div className="text-base" dangerouslySetInnerHTML={{ __html: explanation }} />
    </div>
  </TabContent>
);

const FormulaTabContent: React.FC<{ formulas: any[] }> = ({ formulas }) => (
  <TabContent title="Formula Lab" icon={<Lab className="h-5 w-5" />}>
    <div className="space-y-6">
      {formulas.map((formula, index) => (
        <div key={index} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
          <h3 className="font-bold text-lg mb-2">{formula.name}</h3>
          <div className="p-3 bg-white dark:bg-gray-900 rounded border mb-4 text-center font-mono text-xl">
            {formula.equation}
          </div>
          
          {formula.variables.length > 0 && (
            <>
              <h4 className="font-semibold mb-2">Variables:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {formula.variables.map((variable: any, vIndex: number) => (
                  <div key={vIndex} className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <span className="font-mono font-medium">{variable.symbol}</span>: {variable.meaning}
                    {variable.unit && <div className="text-xs text-muted-foreground mt-1">Unit: {variable.unit}</div>}
                  </div>
                ))}
              </div>
            </>
          )}
          
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm">
              <Lab className="h-4 w-4 mr-2" />
              Interactive Playground
            </Button>
          </div>
        </div>
      ))}
    </div>
  </TabContent>
);

const VideoTabContent: React.FC<{ videoUrl: string }> = ({ videoUrl }) => (
  <TabContent title="Video Explanation" icon={<Video className="h-5 w-5" />}>
    <div className="space-y-4">
      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <iframe 
          src={videoUrl} 
          className="w-full h-full" 
          title="Video explanation" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Watch this video for a visual explanation of electromagnetic induction.
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button variant="default" size="sm">
            <FileText className="h-4 w-4 mr-1" />
            Notes
          </Button>
        </div>
      </div>
    </div>
  </TabContent>
);

const VisualizationTabContent: React.FC<{ has3DModel: boolean }> = ({ has3DModel }) => (
  <TabContent title="3D Visualization" icon={<Lightbulb className="h-5 w-5" />}>
    {has3DModel ? (
      <div className="space-y-4">
        <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <Microscope className="h-20 w-20 text-gray-400" />
          <p className="text-gray-500 absolute">Interactive 3D model would appear here</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Interact with this 3D model to better understand electromagnetic induction.
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Undo2 className="h-4 w-4 mr-1" />
              Reset View
            </Button>
            <Button variant="default" size="sm">
              <Lightbulb className="h-4 w-4 mr-1" />
              Show Animation
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
          <XCircle className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium mb-2">No 3D Model Available</h3>
        <p className="text-muted-foreground text-center max-w-md">
          This concept doesn't have a 3D visualization yet. We're continuously adding new interactive models.
        </p>
      </div>
    )}
  </TabContent>
);

const ExamplesTabContent: React.FC<{ examples: any[] }> = ({ examples }) => (
  <TabContent title="Examples" icon={<FileText className="h-5 w-5" />}>
    <div className="space-y-4">
      {examples.map((example) => (
        <div key={example.id} className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-4">
            <h3 className="font-medium text-lg mb-1">{example.title}</h3>
            <p>{example.description}</p>
          </div>
          <div className="border-t p-4">
            <h4 className="font-medium mb-2">Solution:</h4>
            <p className="text-sm">{example.solution}</p>
          </div>
        </div>
      ))}
    </div>
  </TabContent>
);

const MistakesTabContent: React.FC<{ mistakes: any[] }> = ({ mistakes }) => (
  <TabContent title="Common Mistakes" icon={<AlertTriangle className="h-5 w-5" />}>
    <div className="space-y-4">
      {mistakes.map((mistake, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 flex items-start gap-3">
            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-base mb-1">{mistake.mistake}</h3>
            </div>
          </div>
          <div className="border-t bg-green-50 dark:bg-green-900/20 p-4 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-base mb-1">Correct Approach:</h3>
              <p className="text-sm">{mistake.correction}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </TabContent>
);

const ExamQuestionsTabContent: React.FC<{ questions: any[] }> = ({ questions }) => (
  <TabContent title="Practice Questions" icon={<BarChart className="h-5 w-5" />}>
    <div className="space-y-6">
      {questions.map((question, index) => (
        <div key={index} className="space-y-3">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Question {index + 1}:</h3>
            <p>{question.question}</p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4 ml-4">
            <h4 className="font-medium text-sm mb-1 text-green-600">Answer:</h4>
            <p className="text-sm">{question.answer}</p>
          </div>
        </div>
      ))}
      
      <div className="flex justify-end">
        <Button>
          <BarChart className="h-4 w-4 mr-2" />
          More Practice Questions
        </Button>
      </div>
    </div>
  </TabContent>
);

const MyNotesTabContent: React.FC<{ conceptId: string }> = ({ conceptId }) => {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    // Simulate loading saved notes
    const savedNotesFromStorage = localStorage.getItem(`concept_notes_${conceptId}`);
    if (savedNotesFromStorage) {
      setNotes(savedNotesFromStorage);
      setSavedNotes(savedNotesFromStorage);
    }
  }, [conceptId]);
  
  const handleSaveNotes = () => {
    setIsSaving(true);
    // Simulate saving to backend
    setTimeout(() => {
      localStorage.setItem(`concept_notes_${conceptId}`, notes);
      setSavedNotes(notes);
      setIsSaving(false);
    }, 800);
  };
  
  return (
    <TabContent title="My Notes" icon={<PenLine className="h-5 w-5" />}>
      <div className="space-y-4">
        <Textarea 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
          placeholder="Add your notes here..."
          className="min-h-[200px] resize-y"
        />
        
        <div className="flex justify-between items-center">
          <div>
            {savedNotes !== notes && (
              <span className="text-sm text-yellow-600 dark:text-yellow-400">Unsaved changes</span>
            )}
          </div>
          <Button onClick={handleSaveNotes} disabled={isSaving || notes === savedNotes}>
            {isSaving ? (
              <>Saving...</>
            ) : (
              <>
                <PenLine className="h-4 w-4 mr-2" />
                Save Notes
              </>
            )}
          </Button>
        </div>
      </div>
    </TabContent>
  );
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [concept, setConcept] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('summary');
  
  useEffect(() => {
    // Simulate loading concept data from API
    const loadConcept = async () => {
      try {
        // In a real app, fetch from API with conceptId
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        setConcept(conceptData);
      } catch (error) {
        console.error("Error loading concept:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadConcept();
  }, [conceptId]);
  
  const handleReadAloud = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.lang = 'en-IN';
      speech.rate = 0.9;
      window.speechSynthesis.speak(speech);
    }
  };
  
  const handleGoBack = () => {
    navigate('/dashboard/student/concepts');
  };
  
  if (loading) {
    return (
      <SharedPageLayout
        title="Loading Concept..."
        subtitle="Please wait while we fetch the concept details"
        showBackButton={true}
        backButtonUrl="/dashboard/student/concepts"
      >
        <div className="space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          
          <div className="h-12">
            <Skeleton className="h-full w-full" />
          </div>
          
          <Skeleton className="h-[400px] w-full" />
        </div>
      </SharedPageLayout>
    );
  }
  
  if (!concept) {
    return (
      <SharedPageLayout
        title="Concept Not Found"
        subtitle="The requested concept could not be found"
        showBackButton={true}
        backButtonUrl="/dashboard/student/concepts"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <XCircle className="h-20 w-20 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Concept Not Found</h2>
          <p className="text-muted-foreground mb-6">The concept you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Concepts
          </Button>
        </div>
      </SharedPageLayout>
    );
  }
  
  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} • ${concept.chapter}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="space-y-6">
        {/* Concept header with badges */}
        <div className="flex flex-wrap gap-2 items-center">
          <Badge className={`${concept.difficultyLevel === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : ''} capitalize`}>
            {concept.difficultyLevel} Difficulty
          </Badge>
          
          {concept.importance === 'high' && (
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> High Importance
            </Badge>
          )}
          
          {concept.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
          
          {concept.tags.length > 3 && (
            <Badge variant="outline">+{concept.tags.length - 3} more</Badge>
          )}
        </div>
        
        {/* Progress bar */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Mastery Progress</span>
            <span className="text-sm">{concept.progress}%</span>
          </div>
          <Progress value={concept.progress} className="h-3 bg-gray-200 dark:bg-gray-700" />
        </div>
        
        {/* Content tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <ScrollArea className="pb-4">
            <div className="inline-flex min-w-full">
              <TabsList className="h-10 p-1">
                <TabsTrigger value="summary" className="rounded-sm flex items-center gap-1 px-3">
                  <BookOpen className="h-4 w-4" />
                  <span>Summary</span>
                </TabsTrigger>
                <TabsTrigger value="explanation" className="rounded-sm flex items-center gap-1 px-3">
                  <Brain className="h-4 w-4" />
                  <span>Explanation</span>
                </TabsTrigger>
                {concept.hasFormula && (
                  <TabsTrigger value="formulas" className="rounded-sm flex items-center gap-1 px-3">
                    <Lab className="h-4 w-4" />
                    <span>Formula Lab</span>
                  </TabsTrigger>
                )}
                {concept.hasVideo && (
                  <TabsTrigger value="video" className="rounded-sm flex items-center gap-1 px-3">
                    <Video className="h-4 w-4" />
                    <span>Video</span>
                  </TabsTrigger>
                )}
                {concept.has3DModel && (
                  <TabsTrigger value="visualization" className="rounded-sm flex items-center gap-1 px-3">
                    <Lightbulb className="h-4 w-4" />
                    <span>3D Model</span>
                  </TabsTrigger>
                )}
                <TabsTrigger value="examples" className="rounded-sm flex items-center gap-1 px-3">
                  <FileText className="h-4 w-4" />
                  <span>Examples</span>
                </TabsTrigger>
                <TabsTrigger value="mistakes" className="rounded-sm flex items-center gap-1 px-3">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Mistakes</span>
                </TabsTrigger>
                <TabsTrigger value="exam" className="rounded-sm flex items-center gap-1 px-3">
                  <BarChart className="h-4 w-4" />
                  <span>Practice</span>
                </TabsTrigger>
                <TabsTrigger value="notes" className="rounded-sm flex items-center gap-1 px-3">
                  <PenLine className="h-4 w-4" />
                  <span>My Notes</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </ScrollArea>
          
          <TabsContent value="summary">
            <SummaryTabContent summary={concept.content.summary} handleReadAloud={handleReadAloud} />
          </TabsContent>
          
          <TabsContent value="explanation">
            <ExplanationTabContent explanation={concept.content.explanation} handleReadAloud={handleReadAloud} />
          </TabsContent>
          
          <TabsContent value="formulas">
            <FormulaTabContent formulas={concept.content.formulas} />
          </TabsContent>
          
          <TabsContent value="video">
            <VideoTabContent videoUrl={concept.content.videoUrl} />
          </TabsContent>
          
          <TabsContent value="visualization">
            <VisualizationTabContent has3DModel={concept.has3DModel} />
          </TabsContent>
          
          <TabsContent value="examples">
            <ExamplesTabContent examples={concept.content.examples} />
          </TabsContent>
          
          <TabsContent value="mistakes">
            <MistakesTabContent mistakes={concept.content.commonMistakes} />
          </TabsContent>
          
          <TabsContent value="exam">
            <ExamQuestionsTabContent questions={concept.content.examQuestions} />
          </TabsContent>
          
          <TabsContent value="notes">
            <MyNotesTabContent conceptId={concept.id} />
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;

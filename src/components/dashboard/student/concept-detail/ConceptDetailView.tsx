
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';
import { BookOpen, Award, FileCheck, Video, BookText, FlaskConical, Brain, FileText, PlayCircle, ExternalLink, ArrowLeft } from 'lucide-react';
import LoadingState from '@/components/common/LoadingState';
import { useToast } from '@/hooks/use-toast';

// Sample concept data - replace with actual API fetch
const CONCEPT_DATA = {
  'concept-1': {
    id: 'concept-1',
    title: 'Cell Structure and Functions',
    description: 'Understanding the fundamental unit of life, its structure and key functions',
    subject: 'Biology',
    chapter: 'Cell Biology',
    topic: 'Eukaryotic Cells',
    difficulty: 'medium',
    progress: 65,
    keyPoints: [
      'Cell is the structural and functional unit of life',
      'Robert Hooke discovered cells in 1665',
      'Cell theory was proposed by Schleiden and Schwann',
      'All cells arise from pre-existing cells',
      'Eukaryotic cells contain membrane-bound organelles'
    ],
    formulas: [
      { id: 'f1', name: 'Cell Magnification', formula: 'M = Image Size / Object Size', explanation: 'Used to calculate how much larger an object appears under a microscope than its actual size' },
      { id: 'f2', name: 'Surface Area to Volume Ratio', formula: 'SA/V = Surface Area / Volume', explanation: 'Explains why cells are small - as a cell grows, its volume increases faster than its surface area' }
    ],
    examRelevance: 'High priority for NEET. Frequently tested with 3-5 questions per exam.',
    recallAccuracy: 72,
    videoResources: [
      { id: 'v1', title: 'Cell Structure and Function', url: 'https://example.com/video1', duration: '10:25' },
      { id: 'v2', title: 'Cell Organelles in Detail', url: 'https://example.com/video2', duration: '15:37' }
    ],
    questions: [
      { 
        id: 'q1', 
        question: 'Which of the following organelles is known as the powerhouse of the cell?',
        options: ['Mitochondria', 'Golgi apparatus', 'Lysosome', 'Endoplasmic reticulum'],
        correctAnswer: 'Mitochondria',
        explanation: 'Mitochondria generate most of the cell\'s supply of ATP, used as an energy source for cellular processes.'
      },
      { 
        id: 'q2', 
        question: 'Which of these is NOT a function of the cell membrane?',
        options: ['Protection', 'Selective permeability', 'Energy production', 'Cell recognition'],
        correctAnswer: 'Energy production',
        explanation: 'Energy production primarily occurs in the mitochondria, not in the cell membrane.'
      }
    ],
    notes: [
      { id: 'n1', content: 'Remember the differences between animal and plant cells', timestamp: '2023-10-15' },
      { id: 'n2', content: 'Review the functions of lysosomes before the test', timestamp: '2023-10-16' }
    ]
  },
  'concept-2': {
    id: 'concept-2',
    title: 'Cellular Respiration',
    description: 'The process of breaking down glucose to release energy in the form of ATP',
    subject: 'Biology',
    chapter: 'Cell Biology',
    topic: 'Cell Metabolism',
    difficulty: 'hard',
    progress: 45,
    keyPoints: [
      'Cellular respiration is the process of breaking down glucose to release energy',
      'The complete breakdown of glucose yields 38 ATP molecules',
      'The process occurs in three main stages: glycolysis, Krebs cycle, and electron transport chain',
      'Aerobic respiration requires oxygen, while anaerobic does not',
      'The final electron acceptor in aerobic respiration is oxygen'
    ],
    formulas: [
      { id: 'f1', name: 'Net ATP Production', formula: 'C6H12O6 + 6O2 → 6CO2 + 6H2O + 38 ATP', explanation: 'The complete balanced equation for aerobic respiration of glucose' },
      { id: 'f2', name: 'Anaerobic Respiration', formula: 'C6H12O6 → 2C3H6O3 + 2 ATP', explanation: 'The equation for anaerobic respiration (lactic acid fermentation)' }
    ],
    examRelevance: 'Very high priority for NEET. A favorite topic for numerical problems and MCQs.',
    recallAccuracy: 58,
    videoResources: [
      { id: 'v1', title: 'Overview of Cellular Respiration', url: 'https://example.com/video3', duration: '12:15' },
      { id: 'v2', title: 'Glycolysis Explained', url: 'https://example.com/video4', duration: '08:42' }
    ],
    questions: [
      { 
        id: 'q1', 
        question: 'Where does glycolysis take place in the cell?',
        options: ['Cytoplasm', 'Mitochondria', 'Chloroplast', 'Nucleus'],
        correctAnswer: 'Cytoplasm',
        explanation: 'Glycolysis, the first stage of cellular respiration, occurs in the cytoplasm of all cells.'
      },
      { 
        id: 'q2', 
        question: 'What is the net ATP production from glycolysis alone?',
        options: ['2 ATP', '4 ATP', '32 ATP', '38 ATP'],
        correctAnswer: '2 ATP',
        explanation: 'Glycolysis produces a net gain of 2 ATP molecules per glucose molecule.'
      }
    ],
    notes: [
      { id: 'n1', content: 'Focus on understanding the electron transport chain', timestamp: '2023-11-01' }
    ]
  }
};

interface ConceptDetailViewProps {
  conceptId?: string;
}

const ConceptDetailView: React.FC<ConceptDetailViewProps> = ({ conceptId }) => {
  const [concept, setConcept] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [speaking, setSpeaking] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, fetch the concept data from an API
    setLoading(true);
    
    setTimeout(() => {
      if (conceptId && CONCEPT_DATA[conceptId]) {
        setConcept(CONCEPT_DATA[conceptId]);
      } else {
        setConcept(CONCEPT_DATA['concept-1']); // Default to first concept if not found
      }
      setLoading(false);
    }, 500);
  }, [conceptId]);
  
  const handleReadAloud = () => {
    if (!concept) return;
    
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    
    let speech = new SpeechSynthesisUtterance();
    speech.text = `${concept.title}. ${concept.description}. Key points: ${concept.keyPoints.join('. ')}`;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    
    speech.onend = () => {
      setSpeaking(false);
    };
    
    window.speechSynthesis.speak(speech);
    setSpeaking(true);
    
    toast({
      title: "Reading concept aloud",
      description: "Adjust volume as needed",
    });
  };
  
  const handleAddNote = () => {
    toast({
      title: "Note added",
      description: "Your note has been saved successfully",
    });
  };
  
  const handleOpenFormulaLab = (formulaId: string) => {
    if (conceptId) {
      navigate(`/dashboard/student/concepts/${conceptId}/formula-lab?formula=${formulaId}`);
    }
  };
  
  if (loading) {
    return <LoadingState message="Loading concept details..." />;
  }
  
  if (!concept) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold">Concept not found</h2>
        <p className="mt-2 text-gray-500">The concept you're looking for doesn't exist</p>
        <Button className="mt-4" onClick={() => navigate('/dashboard/student/concepts')}>
          Go Back to Concepts
        </Button>
      </div>
    );
  }
  
  const difficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">{concept.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{concept.description}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <Badge className={difficultyColor(concept.difficulty)}>
              {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
            </Badge>
            <Button variant="outline" size="sm" onClick={handleReadAloud}>
              {speaking ? 'Stop Reading' : 'Read Aloud'}
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="border-blue-300 text-blue-700 dark:text-blue-400">
            {concept.subject}
          </Badge>
          {concept.chapter && (
            <Badge variant="outline" className="border-purple-300 text-purple-700 dark:text-purple-400">
              {concept.chapter}
            </Badge>
          )}
          {concept.topic && (
            <Badge variant="outline" className="border-green-300 text-green-700 dark:text-green-400">
              {concept.topic}
            </Badge>
          )}
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1 text-blue-600" />
              <span className="text-sm font-medium">Mastery Progress</span>
            </div>
            <span className="text-sm font-medium">{concept.progress}%</span>
          </div>
          <Progress value={concept.progress} className="h-2" />
        </div>
        
        <div className="text-sm text-blue-600 dark:text-blue-400 mt-4">
          <span className="font-medium">{concept.examRelevance}</span>
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="formulas">Formulas</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center text-lg font-medium mb-3">
                    <Brain className="mr-2 h-5 w-5 text-blue-600" /> Key Points
                  </h3>
                  <ul className="space-y-2">
                    {concept.keyPoints?.map((point: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-medium mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="flex items-center text-lg font-medium mb-3">
                    <Award className="mr-2 h-5 w-5 text-amber-600" /> Exam Relevance
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{concept.examRelevance}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="formulas" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="flex items-center text-lg font-medium mb-3">
                  <FlaskConical className="mr-2 h-5 w-5 text-purple-600" /> Important Formulas
                </h3>
                
                {concept.formulas?.map((formula: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{formula.name}</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleOpenFormulaLab(formula.id)}
                      >
                        Try in Formula Lab
                      </Button>
                    </div>
                    <div className="mt-2 bg-white dark:bg-gray-900 border p-3 rounded-md font-mono text-center">
                      {formula.formula}
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{formula.explanation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="practice" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="flex items-center text-lg font-medium mb-3">
                  <FileCheck className="mr-2 h-5 w-5 text-green-600" /> NEET-Style Questions
                </h3>
                
                {concept.questions?.map((question: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4 mb-4">
                    <p className="font-medium mb-3">{index + 1}. {question.question}</p>
                    <div className="space-y-2 ml-4 mb-4">
                      {question.options.map((option: string, optIndex: number) => (
                        <div key={optIndex} className="flex items-center space-x-2">
                          <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                            option === question.correctAnswer ? 'bg-green-100 border-green-500 text-green-700' : 'border-gray-300'
                          }`}>
                            {option === question.correctAnswer && <span className="text-xs">✓</span>}
                          </div>
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="flex items-center text-lg font-medium mb-3">
                  <Video className="mr-2 h-5 w-5 text-red-600" /> Video Resources
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {concept.videoResources?.map((video: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full mr-3">
                          <PlayCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">{video.title}</p>
                          <p className="text-sm text-gray-500">{video.duration}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="flex items-center text-lg font-medium">
                    <FileText className="mr-2 h-5 w-5 text-gray-600" /> Your Notes
                  </h3>
                  <Button size="sm" onClick={handleAddNote}>Add Note</Button>
                </div>
                
                {concept.notes && concept.notes.length > 0 ? (
                  <div className="space-y-3">
                    {concept.notes?.map((note: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                        <p>{note.content}</p>
                        <p className="text-xs text-gray-500 mt-2">{note.timestamp}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed rounded-lg">
                    <FileText className="h-10 w-10 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">No notes yet. Add your first note!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptDetailView;

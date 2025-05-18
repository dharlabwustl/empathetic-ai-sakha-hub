
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  ArrowLeft, 
  Bookmark, 
  Volume2, 
  Edit, 
  CheckCircle, 
  Info, 
  Calculator, 
  Lightbulb,
  Pencil,
  Video,
  FileCheck,
  Star,
  MessageSquare
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

// Mock data for testing
const mockConceptData = {
  id: 'concept-1',
  title: 'Cell Structure and Functions',
  subject: 'Biology',
  chapter: 'Cell Biology',
  topic: 'Cell Organelles',
  description: 'Fundamental understanding of cells, their structures and functions',
  difficulty: 'medium',
  content: `<p>The cell is the basic structural and functional unit of life. All living organisms are made up of cells. Cells are the building blocks of life.</p>
  <p>Cell theory states that:</p>
  <ul>
    <li>All living organisms are composed of cells and their products</li>
    <li>All cells arise from pre-existing cells</li>
    <li>The cell is the basic unit of structure, function, and organization in all organisms</li>
  </ul>`,
  keyPoints: [
    'Cells are the basic structural and functional units of life',
    'All living organisms are composed of cells',
    'Cell membrane regulates what enters and leaves the cell',
    'Nucleus contains genetic material and controls cellular activities',
    'Mitochondria are the powerhouse of the cell, generating energy through ATP'
  ],
  formulas: [
    { 
      name: 'Surface Area to Volume Ratio', 
      formula: 'SA:V = Surface Area ÷ Volume', 
      explanation: 'As cells grow, their volume increases faster than their surface area, limiting diffusion efficiency.'
    }
  ],
  exampleQuestions: [
    {
      question: 'Which organelle is responsible for protein synthesis in a cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosomes', 'Golgi Apparatus'],
      answer: 'Ribosomes',
      explanation: 'Ribosomes are cellular structures that translate mRNA into proteins, making them responsible for protein synthesis.'
    },
    {
      question: 'Which of the following statements about mitochondria is INCORRECT?',
      options: [
        'They contain their own DNA',
        'They are involved in ATP production',
        'They are found only in plant cells',
        'They are often referred to as the powerhouse of the cell'
      ],
      answer: 'They are found only in plant cells',
      explanation: 'Mitochondria are found in most eukaryotic cells, including animal cells, not just plant cells.'
    }
  ],
  commonMistakes: [
    'Confusing prokaryotic and eukaryotic cell structures',
    'Mixing up the functions of different cellular organelles',
    'Forgetting that plant cells have both cell wall and cell membrane',
    'Misunderstanding the process of osmosis and diffusion in cells'
  ],
  examRelevance: 'High - appears frequently in NEET exams, particularly questions about organelle functions',
  neetReferences: {
    previousYearQuestions: 3,
    importanceLevel: 'High',
    conceptWeight: 8
  },
  videos: [
    {
      title: 'Cell Structure and Function',
      url: 'https://www.youtube.com/watch?v=URUJD5NEXC8',
      duration: '12:30',
      source: 'Khan Academy'
    },
    {
      title: 'Cell Organelles and their Functions',
      url: 'https://www.youtube.com/watch?v=8IlzKri08kk',
      duration: '15:45',
      source: 'Bozeman Science'
    }
  ],
  recallAccuracy: 65,
  quizScore: 72,
  masteryLevel: 'Intermediate',
  progress: 70,
  notes: [
    {
      id: 'note-1',
      text: 'Remember that mitochondria have their own DNA',
      date: '2023-04-15'
    },
    {
      id: 'note-2',
      text: 'Review the difference between smooth and rough endoplasmic reticulum',
      date: '2023-04-16'
    }
  ],
  relatedConcepts: [
    {
      id: 'concept-2',
      title: 'Cell Division',
      subject: 'Biology'
    },
    {
      id: 'concept-3',
      title: 'Transport Across Cell Membrane',
      subject: 'Biology'
    }
  ]
};

interface ConceptDetailViewProps {
  conceptId?: string;
}

const ConceptDetailView: React.FC<ConceptDetailViewProps> = ({ conceptId: propConceptId }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Use passed conceptId or get from URL params
  const conceptId = propConceptId || params.conceptId || 'concept-1';
  
  // In a real app, you'd fetch this data based on the conceptId
  const conceptData = mockConceptData;
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleBookmark = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Bookmark removed" : "Bookmark added",
      description: isSaved ? "Concept removed from your saved items" : "Concept saved for later review",
    });
  };
  
  const handleReadAloud = () => {
    if (!isReadingAloud) {
      // Start reading
      setIsReadingAloud(true);
      const utterance = new SpeechSynthesisUtterance(
        `${conceptData.title}. ${stripHtmlTags(conceptData.content)}`
      );
      utterance.onend = () => setIsReadingAloud(false);
      window.speechSynthesis.speak(utterance);
    } else {
      // Stop reading
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
    }
  };
  
  const handleAddNote = () => {
    toast({
      title: "Note added",
      description: "Your note has been saved to this concept",
    });
  };
  
  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <SharedPageLayout
      title={conceptData.title}
      subtitle={`${conceptData.subject} > ${conceptData.chapter} > ${conceptData.topic}`}
      showBackButton={true}
      onBackButtonClick={handleGoBack}
    >
      <div className="space-y-6">
        {/* Top card with concept overview and controls */}
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CardTitle>{conceptData.title}</CardTitle>
                  <Badge className={
                    conceptData.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    conceptData.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }>
                    {conceptData.difficulty.charAt(0).toUpperCase() + conceptData.difficulty.slice(1)}
                  </Badge>
                </div>
                <CardDescription>
                  {conceptData.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {conceptData.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    {conceptData.chapter}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {conceptData.topic}
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReadAloud}
                  className={isReadingAloud ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                >
                  <Volume2 className="h-4 w-4 mr-1" />
                  {isReadingAloud ? "Stop" : "Read Aloud"}
                </Button>
                <Button
                  size="sm"
                  variant={isSaved ? "default" : "outline"}
                  onClick={handleBookmark}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? "" : "mr-1"}`} />
                  {!isSaved && "Save"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-1">
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Mastery Level:</span>
                <span>{conceptData.masteryLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{conceptData.progress}%</span>
                <Progress value={conceptData.progress} className="w-20" />
              </div>
            </div>
          </CardContent>
          <CardContent className="pb-4 pt-0">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Quiz Score: {conceptData.quizScore}%</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-blue-500" />
                <span>Recall Accuracy: {conceptData.recallAccuracy}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-500" />
                <span>NEET Importance: {conceptData.neetReferences.importanceLevel}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main content tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="key-points">Key Points</TabsTrigger>
            <TabsTrigger value="formulas">Formulas</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: conceptData.content }} />
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium flex items-center">
                    <FileCheck className="h-4 w-4 mr-2" />
                    NEET Exam Relevance
                  </h4>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {conceptData.examRelevance}
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Previous Year Questions</p>
                      <p className="text-lg font-medium">{conceptData.neetReferences.previousYearQuestions}</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Importance Level</p>
                      <p className="text-lg font-medium">{conceptData.neetReferences.importanceLevel}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Concept Weight</p>
                      <p className="text-lg font-medium">{conceptData.neetReferences.conceptWeight}/10</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Notes section */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Pencil className="h-5 w-5 mr-2" />
                    Your Notes
                  </div>
                  <Button size="sm" variant="outline" onClick={handleAddNote}>
                    <Edit className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {conceptData.notes && conceptData.notes.length > 0 ? (
                  <div className="space-y-3">
                    {conceptData.notes.map(note => (
                      <div key={note.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                        <p className="text-gray-700 dark:text-gray-300">{note.text}</p>
                        <p className="text-xs text-gray-500 mt-1">Added on {note.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    You haven't added any notes yet. Click "Add Note" to get started.
                  </p>
                )}
              </CardContent>
            </Card>
            
            {/* Common mistakes */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                  Common Mistakes to Avoid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {conceptData.commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-red-100 text-red-600 rounded-full h-5 w-5 text-xs mr-2 mt-0.5">
                        !
                      </span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Key Points Tab */}
          <TabsContent value="key-points">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Key Points to Remember
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {conceptData.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-green-100 text-green-600 rounded-full h-5 w-5 text-xs mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <Button className="w-full">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Create Flashcards from Key Points
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Formulas Tab */}
          <TabsContent value="formulas">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    Important Formulas
                  </div>
                  <Button size="sm">
                    Practice Formulas
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {conceptData.formulas && conceptData.formulas.length > 0 ? (
                  <div className="space-y-4">
                    {conceptData.formulas.map((formula, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h3 className="font-medium text-blue-600 dark:text-blue-400">{formula.name}</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 my-2 font-mono text-center">
                          {formula.formula}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{formula.explanation}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No formulas available for this concept.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Practice Tab */}
          <TabsContent value="practice">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileCheck className="h-5 w-5 mr-2" />
                  NEET-Style Practice Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {conceptData.exampleQuestions.map((q, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <p className="font-medium mb-3">
                        Question {index + 1}: {q.question}
                      </p>
                      <div className="space-y-2 ml-2">
                        {q.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center">
                            <div className={`h-5 w-5 rounded-full border mr-2 flex items-center justify-center
                              ${option === q.answer ? 'bg-green-100 border-green-500 text-green-700' : 'border-gray-300'}`}>
                              {option === q.answer && <CheckCircle className="h-3 w-3" />}
                            </div>
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Explanation:</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{q.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-2">
                  <Button className="w-full">
                    Practice More Questions
                  </Button>
                  <Button variant="outline" className="w-full">
                    Take a Quiz on this Concept
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="space-y-4">
              {/* Video Resources */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Video className="h-5 w-5 mr-2" />
                    Video Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conceptData.videos && conceptData.videos.map((video, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{video.title}</h3>
                          <Badge variant="outline">{video.duration}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Source: {video.source}</p>
                        <div className="mt-3">
                          <Button size="sm" variant="outline" asChild className="w-full">
                            <a href={video.url} target="_blank" rel="noopener noreferrer">
                              Watch Video
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Related Concepts */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Related Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {conceptData.relatedConcepts.map((concept) => (
                      <Button 
                        key={concept.id} 
                        variant="outline" 
                        className="justify-start h-auto py-3"
                        onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}
                      >
                        <div className="text-left">
                          <p className="font-medium">{concept.title}</p>
                          <p className="text-xs text-gray-500">{concept.subject}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Community Discussion */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Community Discussion
                    </div>
                    <Button size="sm">
                      Ask a Question
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-500 py-8">
                    Join the discussion about this concept with other students preparing for NEET.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Bottom action buttons */}
        <div className="flex flex-wrap gap-2 justify-between">
          <Button variant="outline" onClick={handleGoBack} className="flex-shrink-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Study with Flashcards
            </Button>
            
            <Button>
              <FileCheck className="h-4 w-4 mr-2" />
              Test Your Knowledge
            </Button>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailView;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ConceptCard } from '@/types/user/conceptCard';
import { SharedPageLayout } from '../SharedPageLayout';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  BookOpen, Video, FileText, Brain, 
  Bookmark, BookmarkPlus, Volume2, MessageCircle, 
  Flag, FlagTriangleRight, FileCheck, Share2, 
  ExternalLink, Download
} from 'lucide-react';

// Placeholder for loading spinner component
const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
    <p className="text-gray-500">{message}</p>
  </div>
);

// Placeholder for error state component
const ErrorState = ({ title, message, action }) => (
  <div className="flex flex-col items-center justify-center h-64 text-center">
    <div className="text-red-500 mb-2 text-5xl">!</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-500 mb-4">{message}</p>
    {action}
  </div>
);

// ConceptMasteryCard component
const ConceptMasteryCard = ({ mastery, onPractice }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-sm font-medium">Your Mastery</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">{mastery.level}</span>
          <span className="text-sm text-muted-foreground">{mastery.percentage}%</span>
        </div>
        <Progress value={mastery.percentage} className="h-2" />
      </div>
      <Button 
        variant="outline"
        size="sm"
        className="w-full mt-4"
        onClick={onPractice}
      >
        Practice to improve
      </Button>
    </CardContent>
  </Card>
);

// VideoLessonsTab component
const VideoLessonsTab = ({ videos }) => (
  <div className="space-y-4">
    {videos && videos.length > 0 ? (
      videos.map((video) => (
        <Card key={video.id}>
          <CardContent className="p-4">
            <h3 className="mb-2 font-medium">{video.title}</h3>
            <div className="aspect-video w-full">
              <iframe 
                src={video.url} 
                className="w-full h-full rounded-md"
                allowFullScreen
                title={video.title}
              />
            </div>
            <p className="text-sm mt-2 text-muted-foreground">Duration: {video.duration}</p>
          </CardContent>
        </Card>
      ))
    ) : (
      <p className="text-center text-muted-foreground">No video lessons available for this concept.</p>
    )}
  </div>
);

// NotesTab component
const NotesTab = ({ notes = [], onAddNote }) => {
  const [newNote, setNewNote] = useState('');

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">Add a New Note</h3>
          <textarea
            className="w-full p-2 border rounded-md"
            rows={4}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Type your notes here..."
          />
          <Button 
            className="mt-2" 
            onClick={() => {
              if (newNote.trim()) {
                onAddNote(newNote);
                setNewNote('');
              }
            }}
          >
            Save Note
          </Button>
        </CardContent>
      </Card>

      {notes.length > 0 ? (
        notes.map((note, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <p className="whitespace-pre-wrap">{note}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-muted-foreground">No notes yet. Add your first note above.</p>
      )}
    </div>
  );
};

// PracticeTab component
const PracticeTab = ({ conceptId, questions = [], onMasteryUpdate }) => (
  <div className="space-y-4">
    <h3 className="font-medium">Practice Questions</h3>
    {questions && questions.length > 0 ? (
      questions.map((question, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="mb-4">
              <h4 className="font-medium">Question {index + 1}</h4>
              <p>{question.question || question.text}</p>
            </div>
            <div className="space-y-2">
              {question.options && question.options.map((option, optIndex) => (
                <div 
                  key={optIndex}
                  className="flex items-center gap-2 p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <input 
                    type="radio" 
                    id={`q${index}-opt${optIndex}`} 
                    name={`question-${index}`} 
                  />
                  <label htmlFor={`q${index}-opt${optIndex}`} className="cursor-pointer flex-1">{option}</label>
                </div>
              ))}
            </div>
            
            <Button className="mt-4 w-full" size="sm">Submit Answer</Button>
          </CardContent>
        </Card>
      ))
    ) : (
      <p className="text-center text-muted-foreground">No practice questions available for this concept.</p>
    )}
  </div>
);

// ResourcesTab component
const ResourcesTab = ({ resources = [], conceptId }) => (
  <div className="space-y-4">
    <h3 className="font-medium">Helpful Resources</h3>
    {resources && resources.length > 0 ? (
      resources.map((resource, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <h4 className="font-medium">{resource.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
            <Button variant="outline" size="sm" asChild>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" /> Open Resource
              </a>
            </Button>
          </CardContent>
        </Card>
      ))
    ) : (
      <p className="text-center text-muted-foreground">No additional resources available for this concept.</p>
    )}
  </div>
);

const ConceptCardDetailPage = () => {
  const { toast } = useToast();
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [concept, setConcept] = useState<ConceptCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch concept details
  useEffect(() => {
    // Log to confirm the component is being mounted with the right conceptId
    console.log("ConceptCardDetailPage - Loading concept:", conceptId);
    
    // Simulate fetching concept data
    setLoading(true);
    setTimeout(() => {
      try {
        // Mock concept data
        const mockConcept: ConceptCard = {
          id: conceptId || 'concept-1',
          title: 'Cell Structure and Functions',
          subject: 'Biology',
          chapter: 'Cell Biology',
          description: 'Comprehensive understanding of cell structure, organelles and their functions',
          difficulty: 'medium',
          completed: false,
          progress: 35,
          content: `A cell is the smallest unit of life. Cells are often called the "building blocks of life". The study of cells is called cell biology, cellular biology, or cytology.

          Cells consist of cytoplasm enclosed within a membrane, which contains many biomolecules such as proteins and nucleic acids. Most plant and animal cells are only visible under a light microscope, with dimensions between 1 and 100 micrometres.

          Cells were discovered by Robert Hooke in 1665, who named them for their resemblance to cells inhabited by Christian monks in a monastery.`,
          keyPoints: [
            'Cells are the basic structural and functional units of life',
            'All cells arise from pre-existing cells',
            'Cell membrane regulates what enters and exits the cell',
            'The nucleus contains genetic material and controls cell activities',
            'Mitochondria are the powerhouse of the cell generating ATP'
          ],
          formulas: [
            'Surface area to volume ratio = Surface Area / Volume',
            'Cell potential = RT/F × ln([ion]outside/[ion]inside)'
          ],
          examples: [
            'Red blood cells are specialized for oxygen transport by losing their nucleus to make room for hemoglobin.',
            'Nerve cells have long extensions for transmitting signals over distances in the body.'
          ],
          commonMistakes: [
            'Confusing prokaryotic and eukaryotic cell structures',
            'Misunderstanding the functions of cell organelles',
            'Incorrectly describing the cell membrane as a solid barrier'
          ],
          notes: [],
          examRelevance: 'Fundamental concept for biology sections in NEET exams. Questions about cell organelles and their functions appear frequently.',
          mastery: {
            level: 'Intermediate',
            percentage: 60
          },
          videos: [
            {
              id: "vid-1",
              title: "Introduction to Cell Structure",
              url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              duration: "10:21",
              thumbnail: "https://picsum.photos/640/360"
            },
            {
              id: "vid-2",
              title: "Cell Organelles and Functions",
              url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              duration: "8:45",
              thumbnail: "https://picsum.photos/640/360"
            }
          ],
          resources: [
            {
              id: "res-1",
              title: "Khan Academy: Cell Structure",
              type: "website",
              url: "https://www.khanacademy.org/science/biology/structure-of-a-cell"
            },
            {
              id: "res-2",
              title: "NCERT Biology Chapter 8",
              type: "pdf",
              url: "#"
            }
          ],
          practiceQuestions: [
            {
              id: "q1",
              question: "What is the primary function of mitochondria?",
              options: [
                "Protein synthesis",
                "ATP production",
                "Lipid metabolism",
                "Waste removal"
              ],
              correctAnswer: "ATP production",
              explanation: "Mitochondria are known as the powerhouse of the cell because they generate most of the cell's supply of ATP, which is used as a source of chemical energy.",
              difficulty: "easy"
            },
            {
              id: "q2",
              question: "Which of the following is NOT a component of the cell membrane?",
              options: [
                "Phospholipids",
                "Cholesterol",
                "Glycoproteins",
                "Ribosomes"
              ],
              correctAnswer: "Ribosomes",
              explanation: "Ribosomes are not components of the cell membrane. They are cellular structures that synthesize proteins and are found either free in the cytoplasm or attached to the endoplasmic reticulum.",
              difficulty: "medium"
            },
            {
              id: "q3",
              question: "In the NEET 2023 exam, a question about cell organelles asked: Which organelle is responsible for detoxification of drugs and poisons in liver cells?",
              options: [
                "Mitochondria",
                "Smooth Endoplasmic Reticulum",
                "Lysosomes",
                "Peroxisomes"
              ],
              correctAnswer: "Smooth Endoplasmic Reticulum",
              explanation: "The smooth endoplasmic reticulum is involved in the synthesis of lipids and steroids, and in drug detoxification, especially in liver cells.",
              difficulty: "hard"
            }
          ]
        };
        
        setConcept(mockConcept);
      } catch (err) {
        setError("Failed to load concept details");
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, [conceptId]);

  // Handle view increment
  useEffect(() => {
    if (conceptId && !loading && concept) {
      console.log("View incremented for concept:", conceptId);
    }
  }, [conceptId, loading, concept]);

  // Toggle bookmark action
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? "Bookmark removed" : "Concept bookmarked",
      description: isBookmarked 
        ? "Removed from your saved items" 
        : "Added to your saved concepts",
    });
  };

  // Toggle flag for revision
  const handleFlagToggle = () => {
    setIsFlagged(!isFlagged);
    
    toast({
      title: isFlagged ? "Removed from revision" : "Flagged for revision",
      description: isFlagged 
        ? "Removed from your revision list" 
        : "Added to your revision list for later review",
    });
  };

  // Navigate to formula practice lab
  const handleOpenFormulaLab = () => {
    if (conceptId) {
      navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
    }
  };

  // Start reading the concept content aloud
  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      toast({
        title: "Read aloud stopped",
        description: "Text-to-speech has been stopped"
      });
      return;
    }
    
    if (concept) {
      const textToRead = typeof concept.content === 'string' 
        ? `${concept.title}. ${concept.description}. ${concept.content}`
        : `${concept.title}. ${concept.description}.`;
      
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.9;
      utterance.onend = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
      
      toast({
        title: "Reading aloud",
        description: "The content is being read aloud. Click again to stop."
      });
    }
  };

  // Handle notes addition
  const handleAddNote = (note: string) => {
    if (concept && note.trim()) {
      const updatedNotes = [...(concept.notes || []), note];
      setConcept({...concept, notes: updatedNotes});
      
      toast({
        title: "Note added",
        description: "Your note has been saved to this concept"
      });
    }
  };

  // Navigate to flashcards related to this concept
  const handleGoToFlashcards = () => {
    if (conceptId) {
      toast({
        title: "Opening flashcards",
        description: "Navigating to flashcards for this concept"
      });
      navigate(`/dashboard/student/flashcards?concept=${conceptId}`);
    }
  };

  // Navigate to practice exam with this concept
  const handleGoToExam = () => {
    if (conceptId) {
      toast({
        title: "Opening practice exam",
        description: "Creating practice exam with this concept"
      });
      navigate(`/dashboard/student/practice-exam?concept=${conceptId}`);
    }
  };

  // Share concept
  const handleShareConcept = () => {
    if (navigator.share && conceptId) {
      navigator.share({
        title: concept?.title || 'Concept Study',
        text: concept?.description || 'Check out this concept!',
        url: window.location.href
      }).then(() => {
        toast({
          title: "Concept shared",
          description: "The concept has been shared"
        });
      }).catch((error) => {
        console.log('Error sharing:', error);
        // Fallback
        handleCopyLink();
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      handleCopyLink();
    }
  };

  // Copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        toast({
          title: "Link copied",
          description: "Concept link copied to clipboard"
        });
      },
      () => {
        toast({
          title: "Failed to copy",
          description: "Could not copy the link to clipboard",
          variant: "destructive"
        });
      }
    );
  };

  // Download concept as PDF
  const handleDownloadPDF = () => {
    toast({
      title: "Downloading PDF",
      description: "Your PDF is being generated"
    });
    
    // This would be implemented with a proper PDF generation service
    setTimeout(() => {
      toast({
        title: "Download ready",
        description: "Your PDF has been downloaded"
      });
    }, 2000);
  };

  // If loading, show loading spinner
  if (loading) {
    return <LoadingSpinner message="Loading concept details..." />;
  }

  // If error, show error state
  if (error || !concept) {
    return (
      <ErrorState 
        title="Could not load concept" 
        message={error || "Concept not found"} 
        action={<Button onClick={() => navigate(-1)}>Go Back</Button>}
      />
    );
  }

  // Format concept key points for display
  const formattedKeyPoints = concept.keyPoints?.length 
    ? concept.keyPoints 
    : concept.description?.split('. ').filter(point => point.trim().length > 0);

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} › ${concept.chapter || 'Chapter'}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="space-y-4 sm:space-y-6">
        {/* Concept intro card */}
        <Card className="overflow-hidden">
          <CardHeader className={`bg-gradient-to-r from-violet-100 to-blue-50 dark:from-violet-950/50 dark:to-blue-950/30 ${isMobile ? 'p-4' : 'p-6'}`}>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'}`}>{concept.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {concept.subject} · {concept.difficulty} · {concept.chapter}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleReadAloud}
                  title={isReading ? "Stop reading" : "Read aloud"}
                  className={isReading ? "text-green-500" : ""}
                >
                  <Volume2 />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleFlagToggle}
                  title={isFlagged ? "Remove from revision" : "Flag for revision"}
                  className={isFlagged ? "text-yellow-500" : ""}
                >
                  {isFlagged ? <Flag /> : <FlagTriangleRight />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleBookmarkToggle}
                  title={isBookmarked ? "Remove bookmark" : "Bookmark this concept"}
                  className={isBookmarked ? "text-blue-500" : ""}
                >
                  {isBookmarked ? <Bookmark /> : <BookmarkPlus />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleShareConcept}
                  title="Share concept"
                >
                  <Share2 />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
            <div className="grid gap-6 md:grid-cols-12">
              {/* Left content */}
              <div className="space-y-4 md:col-span-8">
                <div>
                  <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium mb-2`}>Description</h3>
                  <p className="text-muted-foreground">{concept.description}</p>
                </div>
                
                <div>
                  <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium mb-2`}>Key Points</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    {formattedKeyPoints?.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
                
                {concept.formulas && concept.formulas.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium mb-2`}>Key Formulas</h3>
                      <Button variant="ghost" size="sm" onClick={handleOpenFormulaLab}>
                        Practice formulas
                      </Button>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-3 font-mono text-sm">
                      {concept.formulas.map((formula, index) => (
                        <div key={index} className="py-1">
                          {formula}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right sidebar - stack on mobile */}
              <div className="md:col-span-4 space-y-4">
                <ConceptMasteryCard 
                  mastery={{ 
                    level: concept.mastery?.level || 'Beginner', 
                    percentage: concept.mastery?.percentage || 20 
                  }}
                  onPractice={() => setActiveTab('practice')}
                />
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Exam Relevance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{concept.examRelevance || "High importance for NEET exams. Frequently appears in MCQs and numerical questions."}</p>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <Badge variant="secondary">High Importance</Badge>
                      <Badge variant="outline">10+ Questions/Year</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Quick action buttons */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button size="sm" className="w-full" variant="outline" onClick={handleGoToFlashcards}>
                      Practice Flashcards
                    </Button>
                    <Button size="sm" className="w-full" variant="outline" onClick={handleGoToExam}>
                      Take Practice Quiz
                    </Button>
                    <Button size="sm" className="w-full" variant="outline" onClick={handleDownloadPDF}>
                      <Download className="h-4 w-4 mr-1" /> Download PDF
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 py-4">
            <div className="w-full">
              <p className="text-sm text-muted-foreground mb-2">Your mastery progress</p>
              <div className="flex items-center gap-4">
                <Progress value={concept.mastery?.percentage || 20} className="flex-1" />
                <span className="text-sm font-medium">{concept.mastery?.percentage || 20}%</span>
              </div>
            </div>
          </CardFooter>
        </Card>
        
        {/* Learning tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`w-full justify-start overflow-x-auto ${isMobile ? 'flex-wrap' : ''}`}>
            <TabsTrigger value="overview" className="flex gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex gap-1">
              <Video className="h-4 w-4" />
              <span>Video Lessons</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex gap-1">
              <FileText className="h-4 w-4" />
              <span>Notes</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex gap-1">
              <Brain className="h-4 w-4" />
              <span>Practice</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>Resources</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Overview tab */}
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Content</h3>
                  {typeof concept.content === 'string' ? 
                    concept.content.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    )) : <p>{concept.content}</p>
                  }
                  
                  {concept.examples && concept.examples.length > 0 && (
                    <>
                      <h3>Examples</h3>
                      {concept.examples.map((example, i) => (
                        <div key={i} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md my-2">
                          <p>{example}</p>
                        </div>
                      ))}
                    </>
                  )}
                  
                  {concept.commonMistakes && concept.commonMistakes.length > 0 && (
                    <>
                      <h3>Common Mistakes</h3>
                      <ul>
                        {concept.commonMistakes.map((mistake, i) => (
                          <li key={i}>{mistake}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </CardContent>
              
              {/* Sample NEET questions */}
              <CardHeader className="pb-3 border-t">
                <CardTitle className="text-sm font-medium">NEET Questions (2023-2024)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-md">
                  <h4 className="font-medium mb-2">NEET 2023 Question</h4>
                  <p className="mb-3">Which of the following organelles does not contain DNA?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 border rounded-md">A. Mitochondria</div>
                    <div className="p-2 border rounded-md">B. Chloroplast</div>
                    <div className="p-2 border border-green-500 bg-green-50 dark:bg-green-950/30 rounded-md">C. Lysosome</div>
                    <div className="p-2 border rounded-md">D. Nucleus</div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">Answer: C. Lysosome is the correct answer as it does not contain DNA, unlike mitochondria and chloroplasts which have their own DNA.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-md mt-4">
                  <h4 className="font-medium mb-2">NEET 2024 Question</h4>
                  <p className="mb-3">Which of the following best describes the fluid mosaic model of plasma membrane?</p>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-2 border rounded-md">A. Fixed arrangement of phospholipids with embedded proteins</div>
                    <div className="p-2 border rounded-md">B. Continuous layer of carbohydrates with scattered lipids</div>
                    <div className="p-2 border border-green-500 bg-green-50 dark:bg-green-950/30 rounded-md">C. Dynamic phospholipid bilayer with floating proteins</div>
                    <div className="p-2 border rounded-md">D. Static cholesterol layer with fixed protein channels</div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">Answer: C. The fluid mosaic model describes the plasma membrane as a dynamic phospholipid bilayer where proteins can move laterally, giving it a fluid-like character.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Video lessons tab */}
          <TabsContent value="videos" className="mt-4">
            <VideoLessonsTab videos={concept.videos} />
          </TabsContent>
          
          {/* Notes tab */}
          <TabsContent value="notes" className="mt-4">
            <NotesTab notes={concept.notes} onAddNote={handleAddNote} />
          </TabsContent>
          
          {/* Practice tab */}
          <TabsContent value="practice" className="mt-4">
            <PracticeTab
              conceptId={concept.id}
              questions={concept.practiceQuestions}
              onMasteryUpdate={(percentage) => setConcept({
                ...concept, 
                mastery: { ...concept.mastery, percentage }
              })}
            />
          </TabsContent>
          
          {/* Resources tab */}
          <TabsContent value="resources" className="mt-4">
            <ResourcesTab resources={concept.resources} conceptId={concept.id} />
          </TabsContent>
        </Tabs>
        
        {/* Fixed action bar for mobile */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t p-2 flex justify-around items-center z-40">
            <Button variant="ghost" size="sm" onClick={handleReadAloud} className={isReading ? "text-green-500" : ""}>
              <Volume2 className="h-4 w-4 mb-1" />
              <span className="text-xs">Read</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleFlagToggle} className={isFlagged ? "text-yellow-500" : ""}>
              {isFlagged ? <Flag className="h-4 w-4 mb-1" /> : <FlagTriangleRight className="h-4 w-4 mb-1" />}
              <span className="text-xs">Flag</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleBookmarkToggle} className={isBookmarked ? "text-blue-500" : ""}>
              {isBookmarked ? <Bookmark className="h-4 w-4 mb-1" /> : <BookmarkPlus className="h-4 w-4 mb-1" />}
              <span className="text-xs">Save</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleGoToFlashcards}>
              <FileCheck className="h-4 w-4 mb-1" />
              <span className="text-xs">Cards</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShareConcept}>
              <Share2 className="h-4 w-4 mb-1" />
              <span className="text-xs">Share</span>
            </Button>
          </div>
        )}
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetailPage;

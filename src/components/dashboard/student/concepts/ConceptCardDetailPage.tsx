
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ShareIcon, BookOpen, Video, FileText, Brain, Bookmark, BookmarkPlus, Volume2, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ConceptCard } from '@/types/user/conceptCard';
import { SharedPageLayout } from '../SharedPageLayout';
import { useIsMobile } from '@/hooks/use-mobile';

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

// Placeholder components for tabs
const VideoLessonsTab = ({ videos }) => (
  <div className="space-y-4">
    {videos.map((video) => (
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
    ))}
  </div>
);

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

const PracticeTab = ({ conceptId, questions = [], onMasteryUpdate }) => (
  <div className="space-y-4">
    <h3 className="font-medium">Practice Questions</h3>
    {questions.length > 0 ? (
      questions.map((question, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="mb-4">
              <h4 className="font-medium">Question {index + 1}</h4>
              <p>{question.text}</p>
            </div>
            <div className="space-y-2">
              {question.options.map((option, optIndex) => (
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
          </CardContent>
        </Card>
      ))
    ) : (
      <p className="text-center text-muted-foreground">No practice questions available for this concept.</p>
    )}
  </div>
);

const ResourcesTab = ({ resources = [], conceptId }) => (
  <div className="space-y-4">
    <h3 className="font-medium">Helpful Resources</h3>
    {resources.length > 0 ? (
      resources.map((resource, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <h4 className="font-medium">{resource.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
            <Button variant="outline" size="sm" asChild>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">Open Resource</a>
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
  const [concept, setConcept] = useState<ConceptCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch concept details
  useEffect(() => {
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
          estimatedTime: 30,
          scheduledFor: 'today',
          completed: false,
          mastery: {
            level: 'Intermediate',
            percentage: 60
          },
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
          examRelevance: 'Fundamental concept for biology sections in NEET exams. Questions about cell organelles and their functions appear frequently.'
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
                >
                  <Volume2 className={isReading ? "text-green-500" : ""} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleBookmarkToggle}
                  title={isBookmarked ? "Remove bookmark" : "Bookmark this concept"}
                >
                  {isBookmarked ? <Bookmark className="text-blue-500" /> : <BookmarkPlus />}
                </Button>
                <Button variant="ghost" size="icon" title="Share concept">
                  <ShareIcon />
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
            </Card>
          </TabsContent>
          
          {/* Video lessons tab */}
          <TabsContent value="videos" className="mt-4">
            <VideoLessonsTab 
              videos={concept.videos || [
                {
                  id: "vid-1",
                  title: "Introduction to " + concept.title,
                  url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                  duration: "10:21",
                  thumbnail: "https://picsum.photos/640/360"
                }
              ]} 
            />
          </TabsContent>
          
          {/* Notes tab */}
          <TabsContent value="notes" className="mt-4">
            <NotesTab 
              notes={concept.notes || []} 
              onAddNote={handleAddNote}
            />
          </TabsContent>
          
          {/* Practice tab */}
          <TabsContent value="practice" className="mt-4">
            <PracticeTab
              conceptId={concept.id}
              questions={concept.practiceQuestions || [
                {
                  id: "q1",
                  text: "What is the primary function of mitochondria?",
                  options: [
                    "Protein synthesis",
                    "ATP production",
                    "Lipid metabolism",
                    "Waste removal"
                  ],
                  correctAnswer: 1
                }
              ]}
              onMasteryUpdate={(percentage) => setConcept({
                ...concept, 
                mastery: { ...concept.mastery, percentage }
              })}
            />
          </TabsContent>
          
          {/* Resources tab */}
          <TabsContent value="resources" className="mt-4">
            <ResourcesTab 
              resources={concept.resources || [
                {
                  title: "Khan Academy: Cell Structure",
                  description: "Comprehensive tutorial on cell biology fundamentals",
                  url: "https://www.khanacademy.org/science/biology/structure-of-a-cell"
                }
              ]}
              conceptId={concept.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetailPage;

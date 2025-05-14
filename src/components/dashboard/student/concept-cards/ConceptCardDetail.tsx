
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  Video, 
  FileText, 
  MessageSquare, 
  BookOpen,
  CheckSquare,
  ArrowLeft,
  Share2
} from 'lucide-react';
import VideoContentTab from './tab-components/VideoContentTab';
import NotesTab from './tab-components/NotesTab';
import DoubtsTab from './tab-components/DoubtsTab';
import ResourcesTab from './tab-components/ResourcesTab';
import ReviewTab from './tab-components/ReviewTab';
import { toast } from '@/hooks/use-toast';

interface ConceptCardDetailProps {
  // Optional props for testing or direct use
  conceptId?: string;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({ conceptId: propConceptId }) => {
  const navigate = useNavigate();
  const { id: urlConceptId } = useParams<{ id: string }>();
  const finalConceptId = propConceptId || urlConceptId;
  
  const [loading, setLoading] = useState<boolean>(true);
  const [concept, setConcept] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("video");
  
  useEffect(() => {
    // In a real app, fetch concept data from API
    // For now, we'll mock the data
    setTimeout(() => {
      setConcept({
        id: finalConceptId,
        title: "Cell Structure and Function",
        subject: "Biology",
        chapter: "Cell Biology",
        description: "Learn about the structures inside cells and how they work together to support life.",
        difficulty: "medium",
        estimatedTime: 45,
        progress: 65,
        lastAccessed: "2023-06-15T10:30:00Z",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        notes: "Cells are the basic structural and functional units of life. They come in various shapes and sizes depending on their function. All cells are surrounded by a cell membrane that regulates what enters and leaves the cell.\n\nEukaryotic cells (like those in animals and plants) have a nucleus and other membrane-bound organelles. Prokaryotic cells (like bacteria) lack a nucleus and membrane-bound organelles.\n\nKey organelles include:\n- Nucleus: Contains genetic material\n- Mitochondria: Energy production\n- Endoplasmic reticulum: Protein and lipid synthesis\n- Golgi apparatus: Processes and packages proteins\n- Lysosomes: Digest cellular waste\n- Chloroplasts (in plants): Photosynthesis",
        imageUrl: "/images/concepts/cell-structure.jpg"
      });
      setLoading(false);
    }, 600);
  }, [finalConceptId]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!concept) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-2">Concept Not Found</h2>
        <p className="text-muted-foreground mb-4">The concept you are looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate('/dashboard/student/concepts')}>
          Back to Concepts
        </Button>
      </div>
    );
  }

  const handleShareConcept = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "The link to this concept has been copied to your clipboard."
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Could not copy the link. Please try again.",
          variant: "destructive"
        });
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button and header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/dashboard/student/concepts')}
            className="mr-3"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{concept.title}</h1>
            <p className="text-muted-foreground">
              {concept.subject} • {concept.chapter}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShareConcept}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>
      
      {/* Content tabs */}
      <Tabs 
        defaultValue="video" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-muted/50 p-1 h-auto">
          <TabsTrigger 
            value="video" 
            className="flex items-center gap-1 py-3 data-[state=active]:bg-card"
            onClick={() => setActiveTab("video")}
          >
            <Video className="h-4 w-4" />
            <span className="hidden md:inline">Video</span>
          </TabsTrigger>
          <TabsTrigger 
            value="notes" 
            className="flex items-center gap-1 py-3 data-[state=active]:bg-card"
            onClick={() => setActiveTab("notes")}
          >
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Notes</span>
          </TabsTrigger>
          <TabsTrigger 
            value="doubts" 
            className="flex items-center gap-1 py-3 data-[state=active]:bg-card"
            onClick={() => setActiveTab("doubts")}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden md:inline">Doubts</span>
          </TabsTrigger>
          <TabsTrigger 
            value="resources" 
            className="flex items-center gap-1 py-3 data-[state=active]:bg-card"
            onClick={() => setActiveTab("resources")}
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Resources</span>
          </TabsTrigger>
          <TabsTrigger 
            value="review" 
            className="flex items-center gap-1 py-3 data-[state=active]:bg-card"
            onClick={() => setActiveTab("review")}
          >
            <CheckSquare className="h-4 w-4" />
            <span className="hidden md:inline">Review</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="p-1">
          <TabsContent value="video" className="mt-0">
            <VideoContentTab concept={concept} />
          </TabsContent>
          
          <TabsContent value="notes" className="mt-0">
            <NotesTab concept={concept} />
          </TabsContent>
          
          <TabsContent value="doubts" className="mt-0">
            <DoubtsTab concept={concept} />
          </TabsContent>
          
          <TabsContent value="resources" className="mt-0">
            <ResourcesTab concept={concept} />
          </TabsContent>
          
          <TabsContent value="review" className="mt-0">
            <ReviewTab concept={concept} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ConceptCardDetail;

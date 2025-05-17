
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import ConceptCardDetail from './ConceptCardDetail';
import useVoiceAnnouncer from '@/hooks/useVoiceAnnouncer';
import { useToast } from '@/hooks/use-toast';

// Mock data service - in a real app this would be an API call
const getConceptById = async (id: string) => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id,
    title: `Concept ${id}`,
    description: "This is an important concept that you should understand thoroughly.",
    content: `
      <h2>Introduction</h2>
      <p>This concept is fundamental to understanding this subject area. It builds upon previous concepts and serves as a foundation for more advanced topics.</p>
      
      <h3>Key Points</h3>
      <ul>
        <li>The first key aspect is understanding the basic principles.</li>
        <li>Second, you need to know how this applies in different scenarios.</li>
        <li>Finally, practice with different examples is essential.</li>
      </ul>
      
      <h3>Applications</h3>
      <p>This concept can be applied to solve numerous problems in the field, such as:</p>
      <ol>
        <li>Problem domain A</li>
        <li>Problem domain B</li>
        <li>Problem domain C</li>
      </ol>
      
      <h3>Conclusion</h3>
      <p>Mastering this concept will significantly improve your understanding of the subject area and prepare you for more advanced topics.</p>
    `,
    difficulty: 'medium' as const,
    category: "Mathematics",
    subCategory: "Algebra",
    relatedConcepts: [
      { id: "c1", title: "Related Concept 1" },
      { id: "c2", title: "Related Concept 2" }
    ],
    formulaIds: ["f1", "f2"]
  };
};

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [concept, setConcept] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { speakMessage } = useVoiceAnnouncer({});
  
  useEffect(() => {
    const loadConcept = async () => {
      if (!conceptId) {
        toast({
          title: "Error",
          description: "No concept ID provided",
          variant: "destructive"
        });
        navigate('/dashboard/student/concepts');
        return;
      }
      
      try {
        setLoading(true);
        const conceptData = await getConceptById(conceptId);
        setConcept(conceptData);
        
        // Announce to the user that the concept has been loaded
        speakMessage(`Concept ${conceptData.title} loaded. You can use the read aloud feature to have this content read to you.`);
      } catch (error) {
        console.error("Error loading concept:", error);
        toast({
          title: "Error",
          description: "Failed to load concept data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadConcept();
  }, [conceptId, navigate, toast, speakMessage]);
  
  const handleBack = () => {
    navigate('/dashboard/student/concepts');
  };
  
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40 mt-2" />
          </div>
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Concepts
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Skeleton className="h-[400px] w-full" />
          </div>
          <div>
            <Skeleton className="h-[150px] w-full mb-4" />
            <Skeleton className="h-[150px] w-full mb-4" />
            <Skeleton className="h-[100px] w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!concept) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-bold">Concept Not Found</h2>
        <p className="mb-4">The concept you're looking for doesn't exist or has been moved.</p>
        <Button onClick={handleBack}>Go Back to Concepts</Button>
      </div>
    );
  }
  
  return <ConceptCardDetail concept={concept} onBack={handleBack} />;
};

export default ConceptCardDetailPage;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, Share2, Mic, Volume2 } from 'lucide-react';
import { ConceptStudyData } from '@/types/student/study';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import ConceptExplanationContent from '@/components/dashboard/student/concept-cards/ConceptExplanationContent';

const ConceptStudyPage = () => {
  const { conceptId } = useParams();
  const { toast } = useToast();
  const [isReading, setIsReading] = useState(false);
  const [concept, setConcept] = useState<ConceptStudyData | null>(null);
  const [activeTab, setActiveTab] = useState('simple');

  useEffect(() => {
    // TODO: Fetch concept data using conceptId
    // This is mock data for now
    setConcept({
      id: conceptId || '',
      title: "Newton's Laws of Motion",
      subject: "Physics",
      content: {
        simple: "Newton's laws describe how forces affect motion...",
        detailed: "A detailed explanation of Newton's three laws...",
        examples: ["A car braking", "Rocket propulsion"],
        diagrams: ["diagram1.png", "diagram2.png"],
        examRelevance: "Frequently asked in mechanics section...",
        commonMistakes: ["Confusing mass and weight", "Ignoring friction"],
        videoUrl: "https://example.com/video"
      },
      relatedConcepts: ["Force", "Energy", "Momentum"],
      isBookmarked: false,
      notes: []
    });
  }, [conceptId]);

  const toggleVoiceRead = () => {
    setIsReading(!isReading);
    toast({
      title: isReading ? "Voice Read Stopped" : "Voice Read Started",
      duration: 2000
    });
  };

  if (!concept) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{concept.title}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <BookmarkIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleVoiceRead}
              >
                {isReading ? <Mic className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ConceptExplanationContent conceptTitle={concept.title} />
        </CardContent>
      </Card>

      {/* Related Concepts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Related Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concept.relatedConcepts.map((related, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button variant="outline" className="w-full justify-start">
                  {related}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptStudyPage;

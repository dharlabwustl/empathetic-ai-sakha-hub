import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, Share2, Mic, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import ConceptExplanationContent from '@/components/dashboard/student/concept-cards/ConceptExplanationContent';

interface ConceptStudyProps {
  conceptId?: string;
}

const ConceptStudyPage: React.FC<ConceptStudyProps> = () => {
  const { conceptId } = useParams();
  const { toast } = useToast();
  const [isReading, setIsReading] = useState(false);

  const toggleVoiceRead = () => {
    setIsReading(!isReading);
    toast({
      title: isReading ? "Voice Read Stopped" : "Voice Read Started",
      duration: 2000
    });
  };

  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Concept Study</CardTitle>
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
          <ConceptExplanationContent conceptTitle="Concept Title" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptStudyPage;

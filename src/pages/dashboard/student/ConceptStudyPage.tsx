
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { speakMessage } from '@/components/dashboard/student/voice/voiceUtils';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("ConceptStudyPage - Loading concept with ID:", conceptId);
    
    if (conceptId) {
      // Navigate to the new concept card detail page
      navigate(`/dashboard/student/concepts/${conceptId}`, { replace: true });
      
      toast({
        title: "Loading concept details",
        description: "Please wait while we prepare your concept study materials",
      });
      
      // Enhanced multilingual voice announcement
      const language = localStorage.getItem('voiceAssistantLanguage') || 'hi-IN';
      const voiceSettings = {
        volume: 0.8,
        rate: 0.9,
        pitch: 1.0,
        language: language,
        enabled: true,
        muted: false,
        voice: null,
        autoGreet: true
      };
      
      if (language === 'hi-IN') {
        speakMessage("कॉन्सेप्ट स्टडी पेज लोड हो रहा है। कृपया प्रतीक्षा करें जबकि हम आपके अध्ययन सामग्री तैयार करते हैं।", voiceSettings);
      } else {
        speakMessage("Loading concept study page. Please wait while we prepare your study materials.", voiceSettings);
      }
    }
  }, [conceptId, navigate, toast]);
  
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-primary">
          Loading Concept
        </h2>
        <p className="text-muted-foreground mt-2">
          Please wait while we prepare your study materials...
        </p>
      </div>
    </div>
  );
};

export default ConceptStudyPage;

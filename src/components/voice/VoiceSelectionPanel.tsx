
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Volume2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export type VoiceLanguageType = 'en-US' | 'en-GB' | 'en-IN';

interface VoiceSelectionPanelProps {
  onClose?: () => void;
  showFooter?: boolean;
}

const VoiceSelectionPanel: React.FC<VoiceSelectionPanelProps> = ({ 
  onClose,
  showFooter = true
}) => {
  const { toast } = useToast();
  
  // Get saved value from local storage or default to UK English
  const getSavedVoice = () => {
    const saved = localStorage.getItem('preferred_voice_language');
    return (saved as VoiceLanguageType) || 'en-GB';
  };
  
  const [selectedVoice, setSelectedVoice] = useState<VoiceLanguageType>(getSavedVoice());
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [testingVoice, setTestingVoice] = useState(false);
  
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Get available voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };
      
      loadVoices();
      
      // Chrome loads voices asynchronously
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);
  
  const handleVoiceChange = (value: VoiceLanguageType) => {
    setSelectedVoice(value);
  };
  
  const handleSavePreference = () => {
    localStorage.setItem('preferred_voice_language', selectedVoice);
    
    toast({
      title: "Voice preference saved",
      description: `Voice assistant will now speak in ${getLanguageLabel(selectedVoice)}`,
    });
    
    if (onClose) {
      onClose();
    }
  };
  
  const getLanguageLabel = (code: string): string => {
    switch (code) {
      case 'en-US': return 'American English';
      case 'en-GB': return 'British English';
      case 'en-IN': return 'Indian English';
      default: return 'English';
    }
  };
  
  const getAvailableVoicesForLanguage = (langCode: string): number => {
    return voices.filter(voice => voice.lang?.startsWith(langCode)).length;
  };
  
  const testVoice = (language: VoiceLanguageType) => {
    if (!('speechSynthesis' in window)) return;
    
    setTestingVoice(true);
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = "This is a sample of how I'll sound when speaking to you.";
    utterance.lang = language;
    utterance.rate = 0.98;
    utterance.pitch = 1.05;
    
    // Get voices for the selected language
    const languageVoices = voices.filter(voice => voice.lang?.startsWith(language));
    
    // Prefer female voices for consistency
    const preferredVoice = languageVoices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      !voice.name.toLowerCase().includes('male')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    } else if (languageVoices.length > 0) {
      utterance.voice = languageVoices[0];
    }
    
    // Events
    utterance.onend = () => setTestingVoice(false);
    utterance.onerror = () => setTestingVoice(false);
    
    // Speak
    window.speechSynthesis.speak(utterance);
  };
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Voice Selection</CardTitle>
        <CardDescription>
          Choose which voice accent you prefer for the voice assistant
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <RadioGroup
          value={selectedVoice}
          onValueChange={(value) => handleVoiceChange(value as VoiceLanguageType)}
          className="space-y-4"
        >
          <div className="flex items-center justify-between space-x-2 border rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="en-GB" id="en-GB" />
              <Label htmlFor="en-GB" className="flex flex-col">
                <span className="font-medium">British English</span>
                <span className="text-xs text-muted-foreground">
                  {getAvailableVoicesForLanguage('en-GB')} voices available
                </span>
              </Label>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => testVoice('en-GB')}
              disabled={testingVoice}
              className="h-8 px-2"
            >
              <Volume2 className="h-4 w-4 mr-1" />
              Test
            </Button>
            {selectedVoice === 'en-GB' && (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
          </div>
          
          <div className="flex items-center justify-between space-x-2 border rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="en-IN" id="en-IN" />
              <Label htmlFor="en-IN" className="flex flex-col">
                <span className="font-medium">Indian English</span>
                <span className="text-xs text-muted-foreground">
                  {getAvailableVoicesForLanguage('en-IN')} voices available
                </span>
              </Label>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => testVoice('en-IN')}
              disabled={testingVoice}
              className="h-8 px-2"
            >
              <Volume2 className="h-4 w-4 mr-1" />
              Test
            </Button>
            {selectedVoice === 'en-IN' && (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
          </div>
          
          <div className="flex items-center justify-between space-x-2 border rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="en-US" id="en-US" />
              <Label htmlFor="en-US" className="flex flex-col">
                <span className="font-medium">American English</span>
                <span className="text-xs text-muted-foreground">
                  {getAvailableVoicesForLanguage('en-US')} voices available
                </span>
              </Label>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => testVoice('en-US')}
              disabled={testingVoice}
              className="h-8 px-2"
            >
              <Volume2 className="h-4 w-4 mr-1" />
              Test
            </Button>
            {selectedVoice === 'en-US' && (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
          </div>
        </RadioGroup>
        
        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm">
          <p>The selected voice will be used consistently across the entire application, including the homepage and dashboard.</p>
        </div>
      </CardContent>
      
      {showFooter && (
        <CardFooter className="flex justify-end gap-3">
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          
          <Button onClick={handleSavePreference}>
            Save Preference
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default VoiceSelectionPanel;

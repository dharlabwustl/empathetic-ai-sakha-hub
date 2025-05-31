
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import VoiceControls from '@/components/dashboard/student/tutor/VoiceControls';
import FeatureSelectionPanel from '@/components/dashboard/student/tutor/FeatureSelectionPanel';
import ChatInterface from '@/components/dashboard/student/tutor/ChatInterface';
import CreditSystem from '@/components/dashboard/student/tutor/CreditSystem';
import { useToast } from '@/hooks/use-toast';

const Enhanced24x7TutorView = () => {
  const [selectedFeature, setSelectedFeature] = useState('chat');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [userCredits, setUserCredits] = useState(15);
  
  const { toast } = useToast();

  const handleToggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Voice Recognition Started",
        description: "I'm listening... speak now!",
      });
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Voice Unmuted" : "Voice Muted",
      description: isMuted ? "You'll now hear AI responses" : "AI responses are muted",
    });
  };

  const handleFeatureSelect = (featureId: string) => {
    setSelectedFeature(featureId);
    
    // Simulate credit usage for premium features
    const creditCosts = {
      'chat': 0,
      'search': 1,
      'insights': 1,
      '3d-models': 2,
      'interactive-visuals': 3,
      'advanced-analysis': 5
    };
    
    const cost = creditCosts[featureId as keyof typeof creditCosts] || 0;
    
    if (cost > 0 && userCredits >= cost) {
      setUserCredits(prev => prev - cost);
      toast({
        title: "Feature Activated",
        description: `Using ${featureId.replace('-', ' ')} (${cost} credits)`,
      });
    } else if (cost > userCredits) {
      toast({
        title: "Insufficient Credits",
        description: "Please purchase more credits to use this feature",
        variant: "destructive"
      });
    }
  };

  const handleMessageSend = (message: string) => {
    // Handle message sending logic here
    console.log('Message sent:', message);
  };

  const handlePurchaseCredits = () => {
    toast({
      title: "Redirect to Purchase",
      description: "Opening credit purchase page...",
    });
    // Implement credit purchase logic
  };

  return (
    <SharedPageLayout
      title="24/7 AI Tutor"
      subtitle="Your intelligent study companion with advanced AI features"
      showBackButton={true}
    >
      <div className="space-y-6">
        {/* Voice Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VoiceControls
            isListening={isListening}
            isSpeaking={isSpeaking}
            isMuted={isMuted}
            onToggleListening={handleToggleListening}
            onToggleMute={handleToggleMute}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Feature Selection Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <FeatureSelectionPanel
              selectedFeature={selectedFeature}
              onFeatureSelect={handleFeatureSelect}
              userCredits={userCredits}
            />
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <ChatInterface
              selectedFeature={selectedFeature}
              onMessageSend={handleMessageSend}
            />
          </motion.div>

          {/* Credit System */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <CreditSystem
              userCredits={userCredits}
              onPurchaseCredits={handlePurchaseCredits}
            />
          </motion.div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default Enhanced24x7TutorView;

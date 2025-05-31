
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import VoiceControls from '@/components/dashboard/student/tutor/VoiceControls';
import FeatureSelectionPanel from '@/components/dashboard/student/tutor/FeatureSelectionPanel';
import ChatInterface from '@/components/dashboard/student/tutor/ChatInterface';
import CreditSystem from '@/components/dashboard/student/tutor/CreditSystem';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Enhanced24x7TutorView = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('chat');
  const [userCredits, setUserCredits] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  const handleToggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Voice Recognition Started",
        description: "Listening for your questions..."
      });
    } else {
      toast({
        title: "Voice Recognition Stopped",
        description: "You can start again anytime"
      });
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Audio Enabled" : "Audio Muted",
      description: isMuted ? "You'll hear AI responses" : "AI responses are muted"
    });
  };

  const handleFeatureSelect = (featureId: string) => {
    setSelectedFeature(featureId);
    
    // Deduct credits for premium features
    const premiumFeatures = {
      '3d-models': 2,
      'interactive-visuals': 3,
      'advanced-analysis': 5
    };
    
    const cost = premiumFeatures[featureId as keyof typeof premiumFeatures];
    if (cost && userCredits >= cost) {
      setUserCredits(prev => prev - cost);
      toast({
        title: "Feature Activated",
        description: `${cost} credits used. ${userCredits - cost} credits remaining.`
      });
    }
  };

  const handleSendMessage = (message: string, feature: string) => {
    setIsLoading(true);
    // Simulate processing time
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handlePurchaseCredits = (packId?: string) => {
    toast({
      title: "Credit Purchase",
      description: "Redirecting to payment gateway...",
    });
    // Here you would integrate with payment gateway
  };

  return (
    <SharedPageLayout
      title="24/7 AI Tutor"
      subtitle="Your intelligent exam preparation companion with advanced AI features"
      showBackButton={true}
    >
      <div className="space-y-6">
        {/* Voice Controls */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
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
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <FeatureSelectionPanel
              selectedFeature={selectedFeature}
              onFeatureSelect={handleFeatureSelect}
              userCredits={userCredits}
              onPurchaseCredits={() => handlePurchaseCredits()}
            />
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <ChatInterface
              selectedFeature={selectedFeature}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Credit System */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <CreditSystem
              userCredits={userCredits}
              onPurchaseCredits={handlePurchaseCredits}
            />
          </motion.div>
        </div>

        {/* Feature Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-900/50"
        >
          <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-300">
            🎯 Exam-Focused AI Features
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">🆓 Free Features</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• AI Chat Support</li>
                <li>• Smart Search</li>
                <li>• Study Insights</li>
                <li>• Basic Analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">💎 Premium Features</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 3D Molecular Models</li>
                <li>• Interactive Visuals</li>
                <li>• Advanced Analytics</li>
                <li>• Priority Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">🚀 Voice Controls</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Voice Questions</li>
                <li>• Audio Responses</li>
                <li>• Hands-free Learning</li>
                <li>• Real-time Feedback</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </SharedPageLayout>
  );
};

export default Enhanced24x7TutorView;

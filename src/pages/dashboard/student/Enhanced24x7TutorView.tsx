
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import VoiceControls from '@/components/dashboard/student/tutor/VoiceControls';
import FeatureSelectionPanel, { FeatureType } from '@/components/dashboard/student/tutor/FeatureSelectionPanel';
import ChatInterface from '@/components/dashboard/student/tutor/ChatInterface';
import CreditSystem from '@/components/dashboard/student/tutor/CreditSystem';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const Enhanced24x7TutorView = () => {
  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Feature states
  const [selectedFeature, setSelectedFeature] = useState<FeatureType>('chat');
  const [userCredits, setUserCredits] = useState(12);
  
  // Chat states
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI tutor. I\'m here to help you excel in your NEET preparation. How can I assist you today?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleListening = () => {
    setIsListening(!isListening);
    // In a real implementation, you would start/stop speech recognition here
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    // In a real implementation, you would mute/unmute the audio output here
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'That\'s a great question! Let me help you understand this concept better. Would you like me to explain it step by step or show you a visual representation?',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handlePurchaseCredits = () => {
    console.log('Opening credit purchase dialog...');
    // In a real implementation, you would open a payment modal here
  };

  const renderFeatureContent = () => {
    switch (selectedFeature) {
      case 'chat':
        return (
          <ChatInterface
            messages={messages}
            currentMessage={currentMessage}
            isLoading={isLoading}
            onMessageChange={setCurrentMessage}
            onSendMessage={handleSendMessage}
          />
        );
      
      case 'search':
        return (
          <Card className="h-[500px]">
            <CardContent className="p-6 text-center">
              <div className="text-gray-500">Search functionality coming soon...</div>
            </CardContent>
          </Card>
        );
      
      case 'insights':
        return (
          <Card className="h-[500px]">
            <CardContent className="p-6 text-center">
              <div className="text-gray-500">Insights dashboard coming soon...</div>
            </CardContent>
          </Card>
        );
      
      case '3d-models':
        return (
          <Card className="h-[500px] border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-purple-600">3D Models (2 credits per use)</div>
              <div className="text-gray-500 mt-2">Interactive 3D visualizations coming soon...</div>
            </CardContent>
          </Card>
        );
      
      case 'interactive-visuals':
        return (
          <Card className="h-[500px] border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-purple-600">Interactive Visuals (3 credits per use)</div>
              <div className="text-gray-500 mt-2">Dynamic visual learning tools coming soon...</div>
            </CardContent>
          </Card>
        );
      
      case 'advanced-analysis':
        return (
          <Card className="h-[500px] border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-purple-600">Advanced Analysis (5 credits per use)</div>
              <div className="text-gray-500 mt-2">Deep performance insights coming soon...</div>
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <SharedPageLayout
      title="24/7 AI Tutor"
      subtitle="World-class exam preparation with AI assistance"
      showBackButton={true}
    >
      <div className="space-y-6">
        {/* Header with Voice Controls */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="h-6 w-6 text-purple-600" />
                </motion.div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Tutor Assistant
                </span>
                <Sparkles className="h-5 w-5 text-yellow-500" />
              </div>
              <VoiceControls
                isListening={isListening}
                isSpeaking={isSpeaking}
                isMuted={isMuted}
                onToggleListening={handleToggleListening}
                onToggleMute={handleToggleMute}
              />
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Feature Selection Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select AI Feature</CardTitle>
          </CardHeader>
          <CardContent>
            <FeatureSelectionPanel
              selectedFeature={selectedFeature}
              onFeatureSelect={setSelectedFeature}
              userCredits={userCredits}
            />
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat/Feature Interface */}
          <div className="lg:col-span-2">
            {renderFeatureContent()}
          </div>

          {/* Credit System Sidebar */}
          <div className="space-y-6">
            <CreditSystem
              userCredits={userCredits}
              onPurchaseCredits={handlePurchaseCredits}
            />
            
            {/* Quick Tips */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <CardHeader>
                <CardTitle className="text-sm">💡 Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>• Use voice commands for hands-free learning</div>
                <div>• Try 3D models for complex concepts</div>
                <div>• Ask for step-by-step explanations</div>
                <div>• Request practice problems</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default Enhanced24x7TutorView;

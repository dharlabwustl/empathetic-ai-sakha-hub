
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Sparkles, 
  MessageSquare, 
  CreditCard,
  ArrowLeft,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import VoiceControls from "@/components/dashboard/student/tutor/VoiceControls";
import FeatureSelectionPanel from "@/components/dashboard/student/tutor/FeatureSelectionPanel";
import ChatInterface, { ChatMessage } from "@/components/dashboard/student/tutor/ChatInterface";
import CreditSystem from "@/components/dashboard/student/tutor/CreditSystem";
import useVoiceAssistant from "@/hooks/useVoiceAssistant";

const Enhanced24x7TutorView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState('chat');
  const [userCredits, setUserCredits] = useState(15);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Voice assistant hook
  const {
    settings: voiceSettings,
    isListening,
    isSpeaking,
    transcript,
    speakText,
    startListening,
    stopListening,
    toggleMute,
    toggleEnabled
  } = useVoiceAssistant({
    userName: 'student',
    initialSettings: {
      enabled: true,
      muted: false,
      autoRestart: false
    }
  });

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI tutor, ready to help you learn and grow. How can I assist you today?',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  // Handle voice transcript
  useEffect(() => {
    if (transcript) {
      handleSendMessage(transcript);
    }
  }, [transcript]);

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
        description: `${cost} credits used for premium feature`,
      });
    }
  };

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(content, selectedFeature),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Speak the response if voice is enabled
      if (!voiceSettings.muted) {
        speakText(assistantMessage.content);
      }
    }, 1500);
  };

  const generateAIResponse = (userInput: string, feature: string): string => {
    const responses = {
      'chat': [
        "That's a great question! Let me help you understand this concept better.",
        "I can see you're working on this topic. Here's what you need to know:",
        "Excellent! Let me break this down for you step by step."
      ],
      'search': [
        "I found several relevant resources for your query. Here are the most important ones:",
        "Based on your search, here are the key concepts you should focus on:",
        "I've located some excellent materials that match what you're looking for."
      ],
      'insights': [
        "Based on your learning patterns, I recommend focusing on these areas:",
        "Here's a personalized insight for your study journey:",
        "Your progress suggests you should prioritize these concepts next."
      ],
      '3d-models': [
        "Let me create a 3D visualization to help you understand this concept better.",
        "I'm generating an interactive 3D model that shows how this works:",
        "Here's a detailed 3D representation of what you're studying."
      ],
      'interactive-visuals': [
        "I'm creating an interactive diagram to illustrate this concept:",
        "Let me show you a dynamic visualization that explains this process:",
        "Here's an interactive chart that demonstrates the relationships."
      ],
      'advanced-analysis': [
        "Based on advanced analytics, here's what I predict about your learning:",
        "My deep analysis suggests these optimization strategies:",
        "Advanced insights reveal these important patterns in your progress."
      ]
    };
    
    const featureResponses = responses[feature as keyof typeof responses] || responses.chat;
    return featureResponses[Math.floor(Math.random() * featureResponses.length)];
  };

  const handlePurchaseCredits = (packId?: string) => {
    toast({
      title: "Credit Purchase",
      description: "Redirecting to payment page...",
    });
    // Simulate credit purchase
    setTimeout(() => {
      setUserCredits(prev => prev + 25);
      toast({
        title: "Credits Added!",
        description: "25 credits have been added to your account",
      });
    }, 2000);
  };

  const handleToggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleToggleSpeaker = () => {
    toggleMute();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard/student')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <div className="flex items-center gap-3">
              <motion.div
                className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Brain className="h-6 w-6" />
              </motion.div>
              
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  24/7 AI Tutor
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Your personal AI learning companion
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <VoiceControls
              isListening={isListening}
              isSpeaking={isSpeaking}
              isMuted={voiceSettings.muted}
              onToggleMic={handleToggleMic}
              onToggleSpeaker={handleToggleSpeaker}
            />
            
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <Zap className="h-3 w-3 mr-1" />
              {userCredits} Credits
            </Badge>
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="tutor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tutor" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Tutor
            </TabsTrigger>
            <TabsTrigger value="credits" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Credits & Plans
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tutor" className="space-y-6">
            <FeatureSelectionPanel
              selectedFeature={selectedFeature}
              onFeatureSelect={handleFeatureSelect}
              userCredits={userCredits}
              onPurchaseCredits={handlePurchaseCredits}
            />
            
            <ChatInterface
              messages={messages}
              isTyping={isTyping}
              onSendMessage={handleSendMessage}
              selectedFeature={selectedFeature}
            />
          </TabsContent>

          <TabsContent value="credits">
            <CreditSystem
              userCredits={userCredits}
              onPurchaseCredits={handlePurchaseCredits}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Enhanced24x7TutorView;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import VoiceControls from '@/components/dashboard/student/tutor/VoiceControls';
import FeatureSelectionPanel from '@/components/dashboard/student/tutor/FeatureSelectionPanel';
import ChatInterface from '@/components/dashboard/student/tutor/ChatInterface';
import CreditSystem from '@/components/dashboard/student/tutor/CreditSystem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Enhanced24x7TutorView = () => {
  const [selectedFeature, setSelectedFeature] = useState('chat');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userCredits, setUserCredits] = useState(12);
  const [activeTab, setActiveTab] = useState('tutor');
  
  const { toast } = useToast();

  const handleToggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Voice Recognition Started",
        description: "Speak clearly and I'll help you learn!",
      });
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (isSpeaking && !isMuted) {
      setIsSpeaking(false);
    }
  };

  const handleFeatureSelect = (featureId: string) => {
    setSelectedFeature(featureId);
    
    // Deduct credits for premium features
    const premiumFeatures = {
      '3d-models': 2,
      'interactive-visuals': 3,
      'advanced-analysis': 5
    };
    
    const creditsNeeded = premiumFeatures[featureId as keyof typeof premiumFeatures];
    if (creditsNeeded && userCredits >= creditsNeeded) {
      setUserCredits(prev => prev - creditsNeeded);
    }
  };

  const handleSendMessage = (message: string) => {
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      if (!isMuted) {
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 3000);
      }
    }, 1500);
  };

  const handlePurchaseCredits = () => {
    toast({
      title: "Credits Purchase",
      description: "Redirecting to payment page...",
    });
    // In a real app, this would open a payment modal or redirect
  };

  const statsCards = [
    {
      title: "Study Sessions",
      value: "47",
      icon: <Clock className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      title: "Concepts Learned",
      value: "156",
      icon: <Brain className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      title: "AI Insights",
      value: "23",
      icon: <Sparkles className="h-5 w-5" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
      title: "Study Streak",
      value: "12 days",
      icon: <Users className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30"
    }
  ];

  return (
    <SharedPageLayout
      title="24/7 AI Tutor"
      subtitle="Your personal AI companion for exam preparation"
      showBackButton={true}
    >
      {/* Header Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <div className={stat.color}>
                      {stat.icon}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-lg font-semibold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Voice Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Voice-Powered Learning</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Speak naturally with your AI tutor for an interactive learning experience
                </p>
              </div>
              <VoiceControls
                isListening={isListening}
                isSpeaking={isSpeaking}
                onToggleListening={handleToggleListening}
                onToggleMute={handleToggleMute}
                isMuted={isMuted}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="tutor" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              AI Tutor
            </TabsTrigger>
            <TabsTrigger value="features" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              Features
            </TabsTrigger>
            <TabsTrigger value="credits" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              Credits ({userCredits})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tutor" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Feature Selection */}
              <div className="lg:col-span-1">
                <FeatureSelectionPanel
                  selectedFeature={selectedFeature}
                  onFeatureSelect={handleFeatureSelect}
                  userCredits={userCredits}
                  onPurchaseCredits={handlePurchaseCredits}
                />
              </div>
              
              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <ChatInterface
                  selectedFeature={selectedFeature}
                  onSendMessage={handleSendMessage}
                  isProcessing={isProcessing}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features">
            <FeatureSelectionPanel
              selectedFeature={selectedFeature}
              onFeatureSelect={handleFeatureSelect}
              userCredits={userCredits}
              onPurchaseCredits={handlePurchaseCredits}
            />
          </TabsContent>

          <TabsContent value="credits">
            <div className="max-w-4xl mx-auto">
              <CreditSystem
                currentCredits={userCredits}
                totalCredits={50}
                onPurchaseCredits={handlePurchaseCredits}
              />
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Premium Features Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Unlock Premium AI Features</h3>
                <p className="opacity-90">
                  Access 3D models, interactive visualizations, and advanced analysis to supercharge your learning
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    3D Models - 2 credits
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Visuals - 3 credits
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Analysis - 5 credits
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </SharedPageLayout>
  );
};

export default Enhanced24x7TutorView;

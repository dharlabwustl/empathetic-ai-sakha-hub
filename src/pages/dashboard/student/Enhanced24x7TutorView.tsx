
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Headphones, 
  CreditCard, 
  Settings,
  BookOpen,
  Target,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import VoiceControls from '@/components/dashboard/student/tutor/VoiceControls';
import FeatureSelectionPanel from '@/components/dashboard/student/tutor/FeatureSelectionPanel';
import ChatInterface from '@/components/dashboard/student/tutor/ChatInterface';
import CreditSystem from '@/components/dashboard/student/tutor/CreditSystem';

const Enhanced24x7TutorView = () => {
  const [selectedFeature, setSelectedFeature] = useState('chat');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userCredits, setUserCredits] = useState(15);

  const handleToggleListening = () => {
    setIsListening(!isListening);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleFeatureSelect = (featureId: string) => {
    setSelectedFeature(featureId);
  };

  const handleSendMessage = (message: string, feature: string) => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const handlePurchaseCredits = (packId?: string) => {
    console.log('Purchase credits:', packId);
  };

  const stats = [
    { label: 'Questions Asked', value: '127', icon: Brain, color: 'blue' },
    { label: 'Study Hours', value: '34.5', icon: BookOpen, color: 'green' },
    { label: 'Goals Achieved', value: '8', icon: Target, color: 'purple' },
    { label: 'Improvement', value: '+23%', icon: TrendingUp, color: 'orange' }
  ];

  return (
    <SharedPageLayout
      title="24/7 AI Tutor"
      subtitle="Your personal AI companion for exam preparation"
      showBackButton={true}
    >
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Voice Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <VoiceControls
            isListening={isListening}
            isSpeaking={isSpeaking}
            isMuted={isMuted}
            onToggleListening={handleToggleListening}
            onToggleMute={handleToggleMute}
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Feature Selection Panel */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <FeatureSelectionPanel
              selectedFeature={selectedFeature}
              onFeatureSelect={handleFeatureSelect}
              userCredits={userCredits}
              onPurchaseCredits={handlePurchaseCredits}
            />
          </motion.div>

          {/* Chat Interface */}
          <motion.div 
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ChatInterface
              selectedFeature={selectedFeature}
              isTyping={isTyping}
              onSendMessage={handleSendMessage}
            />
          </motion.div>

          {/* Right Sidebar - Credits & Tools */}
          <motion.div 
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Tabs defaultValue="credits" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="credits" className="text-xs">
                  <CreditCard className="h-4 w-4 mr-1" />
                  Credits
                </TabsTrigger>
                <TabsTrigger value="tools" className="text-xs">
                  <Settings className="h-4 w-4 mr-1" />
                  Tools
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="credits" className="mt-4">
                <CreditSystem
                  userCredits={userCredits}
                  onPurchaseCredits={handlePurchaseCredits}
                />
              </TabsContent>
              
              <TabsContent value="tools" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Quick Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Headphones className="h-4 w-4 mr-2" />
                      Voice Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Brain className="h-4 w-4 mr-2" />
                      Learning Preferences
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Personality
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Feature-Specific Content */}
        {selectedFeature === '3d-models' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
              <div className="text-center">
                <Brain className="h-16 w-16 mx-auto text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">3D Models Active</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Interactive 3D visualizations are now available. Ask me about any complex concept!
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {selectedFeature === 'interactive-visuals' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
              <div className="text-center">
                <Sparkles className="h-16 w-16 mx-auto text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Interactive Visuals Ready</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Dynamic diagrams and simulations are active. Perfect for understanding complex processes!
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </SharedPageLayout>
  );
};

export default Enhanced24x7TutorView;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Search, Brain, Box, Eye, BarChart3, Crown, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  isPremium: boolean;
  credits?: number;
  status: 'available' | 'coming-soon' | 'premium';
}

interface FeatureSelectionPanelProps {
  selectedFeature: string;
  onFeatureSelect: (featureId: string) => void;
  userCredits: number;
  onPurchaseCredits: () => void;
}

const FeatureSelectionPanel: React.FC<FeatureSelectionPanelProps> = ({
  selectedFeature,
  onFeatureSelect,
  userCredits,
  onPurchaseCredits
}) => {
  const features: Feature[] = [
    {
      id: 'chat',
      name: 'AI Chat',
      icon: <MessageSquare className="h-5 w-5" />,
      description: 'Ask questions and get instant answers',
      isPremium: false,
      status: 'available'
    },
    {
      id: 'search',
      name: 'Smart Search',
      icon: <Search className="h-5 w-5" />,
      description: 'Find specific concepts and topics',
      isPremium: false,
      status: 'available'
    },
    {
      id: 'insights',
      name: 'Study Insights',
      icon: <Brain className="h-5 w-5" />,
      description: 'Personalized learning recommendations',
      isPremium: false,
      status: 'available'
    },
    {
      id: '3d-models',
      name: '3D Models',
      icon: <Box className="h-5 w-5" />,
      description: 'Interactive 3D visualizations',
      isPremium: true,
      credits: 2,
      status: 'premium'
    },
    {
      id: 'interactive-visuals',
      name: 'Interactive Visuals',
      icon: <Eye className="h-5 w-5" />,
      description: 'Dynamic charts and animations',
      isPremium: true,
      credits: 3,
      status: 'premium'
    },
    {
      id: 'advanced-analysis',
      name: 'Advanced Analysis',
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Deep performance insights',
      isPremium: true,
      credits: 5,
      status: 'premium'
    }
  ];

  const handleFeatureClick = (feature: Feature) => {
    if (feature.isPremium && feature.credits && userCredits < feature.credits) {
      onPurchaseCredits();
      return;
    }
    onFeatureSelect(feature.id);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-500" />
          AI Features
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Credits Available:</span>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {userCredits}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant={selectedFeature === feature.id ? "default" : "outline"}
              className={`w-full justify-start h-auto p-4 relative ${
                feature.isPremium 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 hover:from-yellow-100 hover:to-orange-100' 
                  : ''
              } ${
                selectedFeature === feature.id 
                  ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white border-blue-500' 
                  : ''
              }`}
              onClick={() => handleFeatureClick(feature)}
              disabled={feature.status === 'coming-soon'}
            >
              <div className="flex items-start gap-3 w-full">
                <div className={`mt-1 ${selectedFeature === feature.id ? 'text-white' : 'text-blue-500'}`}>
                  {feature.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{feature.name}</span>
                    {feature.isPremium && (
                      <Crown className="h-4 w-4 text-yellow-500" />
                    )}
                    {feature.credits && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-orange-100 text-orange-700"
                      >
                        {feature.credits} credits
                      </Badge>
                    )}
                  </div>
                  <p className={`text-xs ${
                    selectedFeature === feature.id ? 'text-white/80' : 'text-muted-foreground'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {feature.isPremium && feature.credits && userCredits < feature.credits && (
                <div className="absolute top-2 right-2">
                  <Badge variant="destructive" className="text-xs">
                    Need {feature.credits - userCredits} more
                  </Badge>
                </div>
              )}
            </Button>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-4"
        >
          <Button
            variant="outline"
            className="w-full bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100"
            onClick={onPurchaseCredits}
          >
            <Crown className="h-4 w-4 mr-2 text-yellow-500" />
            Purchase More Credits
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default FeatureSelectionPanel;

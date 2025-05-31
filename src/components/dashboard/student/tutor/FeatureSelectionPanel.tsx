
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Search, 
  Brain, 
  Cube, 
  Eye, 
  BarChart3,
  Lock,
  Zap,
  Crown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TutorFeature } from '@/types/creditPack';

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
  const features: TutorFeature[] = [
    {
      id: 'chat',
      name: 'AI Chat',
      description: 'Ask questions and get instant answers',
      icon: 'MessageCircle',
      credits: 0,
      isFree: true,
      isPremium: false
    },
    {
      id: 'search',
      name: 'Smart Search',
      description: 'Find concepts and topics instantly',
      icon: 'Search',
      credits: 0,
      isFree: true,
      isPremium: false
    },
    {
      id: 'insights',
      name: 'AI Insights',
      description: 'Get personalized study recommendations',
      icon: 'Brain',
      credits: 0,
      isFree: true,
      isPremium: false
    },
    {
      id: '3d-models',
      name: '3D Models',
      description: 'Interactive 3D visualizations',
      icon: 'Cube',
      credits: 2,
      isFree: false,
      isPremium: true
    },
    {
      id: 'interactive-visuals',
      name: 'Interactive Visuals',
      description: 'Dynamic diagrams and simulations',
      icon: 'Eye',
      credits: 3,
      isFree: false,
      isPremium: true
    },
    {
      id: 'advanced-analysis',
      name: 'Advanced Analysis',
      description: 'Deep performance analytics',
      icon: 'BarChart3',
      credits: 5,
      isFree: false,
      isPremium: true
    }
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      MessageCircle,
      Search,
      Brain,
      Cube,
      Eye,
      BarChart3
    };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : <Brain className="h-5 w-5" />;
  };

  return (
    <Card className="h-full">
      <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          AI Tutor Features
        </CardTitle>
        <div className="flex items-center justify-between text-sm">
          <span>Available Credits: {userCredits}</span>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={onPurchaseCredits}
            className="bg-white text-violet-600 hover:bg-gray-100"
          >
            <Crown className="h-4 w-4 mr-1" />
            Buy Credits
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant={selectedFeature === feature.id ? "default" : "outline"}
              className={`w-full p-4 h-auto text-left justify-start relative overflow-hidden transition-all duration-300 ${
                selectedFeature === feature.id 
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg' 
                  : 'hover:shadow-md'
              } ${
                feature.isPremium && userCredits < feature.credits 
                  ? 'opacity-60 cursor-not-allowed' 
                  : ''
              }`}
              onClick={() => {
                if (!feature.isPremium || userCredits >= feature.credits) {
                  onFeatureSelect(feature.id);
                }
              }}
              disabled={feature.isPremium && userCredits < feature.credits}
            >
              <div className="flex items-start gap-3 w-full">
                <div className={`p-2 rounded-lg ${
                  selectedFeature === feature.id 
                    ? 'bg-white/20' 
                    : feature.isPremium 
                      ? 'bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600' 
                      : 'bg-blue-100 text-blue-600'
                }`}>
                  {getIcon(feature.icon)}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{feature.name}</span>
                    {feature.isFree && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        FREE
                      </Badge>
                    )}
                    {feature.isPremium && (
                      <Badge variant="secondary" className="text-xs bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                        {feature.credits} Credits
                      </Badge>
                    )}
                  </div>
                  <p className={`text-xs mt-1 ${
                    selectedFeature === feature.id ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {feature.description}
                  </p>
                </div>
                {feature.isPremium && userCredits < feature.credits && (
                  <Lock className="h-4 w-4 text-gray-400" />
                )}
              </div>
              
              {feature.isPremium && (
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-amber-400 border-r-transparent">
                  <Crown className="h-3 w-3 text-white absolute -top-4 -right-4" />
                </div>
              )}
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FeatureSelectionPanel;

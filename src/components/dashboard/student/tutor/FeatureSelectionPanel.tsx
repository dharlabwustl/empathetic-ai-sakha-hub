
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Search, Brain, Cube, Eye, BarChart3, Lock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export type FeatureType = 'chat' | 'search' | 'insights' | '3d-models' | 'interactive-visuals' | 'advanced-analysis';

interface Feature {
  id: FeatureType;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  credits?: number;
  isPremium: boolean;
}

interface FeatureSelectionPanelProps {
  selectedFeature: FeatureType;
  onFeatureSelect: (feature: FeatureType) => void;
  userCredits: number;
}

const FeatureSelectionPanel: React.FC<FeatureSelectionPanelProps> = ({
  selectedFeature,
  onFeatureSelect,
  userCredits
}) => {
  const features: Feature[] = [
    {
      id: 'chat',
      name: 'Chat',
      icon: MessageSquare,
      description: 'Real-time conversation with AI tutor',
      isPremium: false
    },
    {
      id: 'search',
      name: 'Search',
      icon: Search,
      description: 'Find specific topics and concepts',
      isPremium: false
    },
    {
      id: 'insights',
      name: 'Insights',
      icon: Brain,
      description: 'Personalized learning analytics',
      isPremium: false
    },
    {
      id: '3d-models',
      name: '3D Models',
      icon: Cube,
      description: 'Interactive 3D visualizations',
      credits: 2,
      isPremium: true
    },
    {
      id: 'interactive-visuals',
      name: 'Interactive Visuals',
      icon: Eye,
      description: 'Dynamic visual learning tools',
      credits: 3,
      isPremium: true
    },
    {
      id: 'advanced-analysis',
      name: 'Advanced Analysis',
      icon: BarChart3,
      description: 'Deep performance insights',
      credits: 5,
      isPremium: true
    }
  ];

  const canUseFeature = (feature: Feature) => {
    return !feature.isPremium || (feature.credits && userCredits >= feature.credits);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {features.map((feature) => {
        const IconComponent = feature.icon;
        const isSelected = selectedFeature === feature.id;
        const canUse = canUseFeature(feature);
        
        return (
          <motion.div
            key={feature.id}
            whileHover={{ scale: canUse ? 1.02 : 1 }}
            whileTap={{ scale: canUse ? 0.98 : 1 }}
          >
            <Card
              className={`cursor-pointer transition-all h-full ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : canUse
                    ? 'hover:border-gray-300 hover:shadow-md'
                    : 'opacity-60 cursor-not-allowed'
              } ${
                feature.isPremium 
                  ? 'border-gradient-to-r from-purple-200 to-pink-200' 
                  : ''
              }`}
              onClick={() => canUse && onFeatureSelect(feature.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className={`p-2 rounded-lg ${
                    isSelected 
                      ? 'bg-blue-100 text-blue-600' 
                      : feature.isPremium
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600'
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="font-medium text-sm">{feature.name}</h3>
                      {feature.isPremium && !canUse && (
                        <Lock className="h-3 w-3 text-gray-400" />
                      )}
                    </div>
                    
                    {feature.credits && (
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          canUse 
                            ? 'border-green-300 text-green-700 bg-green-50' 
                            : 'border-red-300 text-red-700 bg-red-50'
                        }`}
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        {feature.credits} credits
                      </Badge>
                    )}
                    
                    <p className="text-xs text-gray-500 leading-tight">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FeatureSelectionPanel;

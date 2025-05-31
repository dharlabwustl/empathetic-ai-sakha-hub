
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Lightbulb, 
  Cube, 
  BarChart3, 
  Brain,
  Lock,
  Zap,
  Crown,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isPremium: boolean;
  credits?: number;
  category: 'communication' | 'analysis' | 'visual';
}

const features: Feature[] = [
  {
    id: 'chat',
    name: 'AI Chat',
    description: 'Ask questions and get instant answers',
    icon: <MessageSquare className="h-6 w-6" />,
    isPremium: false,
    category: 'communication'
  },
  {
    id: 'search',
    name: 'Smart Search',
    description: 'Find relevant study materials quickly',
    icon: <Search className="h-6 w-6" />,
    isPremium: false,
    category: 'communication'
  },
  {
    id: 'insights',
    name: 'Study Insights',
    description: 'Get personalized learning recommendations',
    icon: <Lightbulb className="h-6 w-6" />,
    isPremium: false,
    category: 'analysis'
  },
  {
    id: '3d-models',
    name: '3D Models',
    description: 'Interactive 3D visualizations for complex concepts',
    icon: <Cube className="h-6 w-6" />,
    isPremium: true,
    credits: 2,
    category: 'visual'
  },
  {
    id: 'interactive-visuals',
    name: 'Interactive Visuals',
    description: 'Dynamic charts and interactive diagrams',
    icon: <BarChart3 className="h-6 w-6" />,
    isPremium: true,
    credits: 3,
    category: 'visual'
  },
  {
    id: 'advanced-analysis',
    name: 'Advanced Analysis',
    description: 'Deep learning analytics and performance insights',
    icon: <Brain className="h-6 w-6" />,
    isPremium: true,
    credits: 5,
    category: 'analysis'
  }
];

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
  const { toast } = useToast();
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const handleFeatureClick = (feature: Feature) => {
    if (feature.isPremium && feature.credits && userCredits < feature.credits) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${feature.credits} credits to use ${feature.name}. Purchase more credits to continue.`,
        variant: "destructive"
      });
      return;
    }

    onFeatureSelect(feature.id);
    
    if (feature.isPremium && feature.credits) {
      toast({
        title: "Premium Feature Activated",
        description: `${feature.name} activated. ${feature.credits} credits will be deducted.`,
      });
    }
  };

  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  const categoryTitles = {
    communication: 'Communication & Support',
    analysis: 'Analysis & Insights',
    visual: 'Visual Learning Tools'
  };

  const categoryIcons = {
    communication: <MessageSquare className="h-5 w-5" />,
    analysis: <Brain className="h-5 w-5" />,
    visual: <Cube className="h-5 w-5" />
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Choose Your Learning Tool
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Select the perfect AI-powered feature for your study session
        </p>
      </div>

      {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
        <div key={category} className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            {categoryIcons[category as keyof typeof categoryIcons]}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {categoryTitles[category as keyof typeof categoryTitles]}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryFeatures.map((feature) => {
              const isSelected = selectedFeature === feature.id;
              const canAfford = !feature.isPremium || !feature.credits || userCredits >= feature.credits;
              
              return (
                <motion.div
                  key={feature.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setHoveredFeature(feature.id)}
                  onHoverEnd={() => setHoveredFeature(null)}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' 
                        : 'hover:shadow-md'
                    } ${
                      feature.isPremium && !canAfford
                        ? 'opacity-60 cursor-not-allowed'
                        : ''
                    }`}
                    onClick={() => handleFeatureClick(feature)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            isSelected 
                              ? 'bg-blue-500 text-white' 
                              : feature.isPremium 
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                          }`}>
                            {feature.icon}
                          </div>
                          <div>
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                              {feature.name}
                              {feature.isPremium && (
                                <Crown className="h-4 w-4 text-yellow-500" />
                              )}
                            </CardTitle>
                          </div>
                        </div>
                        
                        {feature.isPremium && (
                          <div className="flex flex-col items-end gap-1">
                            <Badge 
                              variant="secondary" 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs"
                            >
                              <Star className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                            {feature.credits && (
                              <Badge variant="outline" className="text-xs">
                                {feature.credits} credits
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {feature.isPremium && !canAfford && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                          <Lock className="h-4 w-4" />
                          <span>Need {feature.credits} more credits</span>
                        </div>
                      )}
                      
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium"
                        >
                          <Zap className="h-4 w-4" />
                          <span>Active</span>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Credits Purchase CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-purple-800 dark:text-purple-200">
              Unlock Premium Features
            </h4>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
              Get access to 3D models, interactive visuals, and advanced analysis
            </p>
          </div>
          <Button 
            onClick={onPurchaseCredits}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Crown className="h-4 w-4 mr-2" />
            Buy Credits
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureSelectionPanel;

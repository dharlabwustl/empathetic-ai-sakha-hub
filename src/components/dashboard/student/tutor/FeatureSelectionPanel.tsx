
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Lightbulb, 
  Box, 
  BarChart3, 
  Brain,
  Lock,
  Zap,
  Crown,
  Star,
  Sparkles
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
  benefits: string[];
}

const features: Feature[] = [
  {
    id: 'chat',
    name: 'AI Chat',
    description: 'Ask questions and get instant answers from your personal AI tutor',
    icon: <MessageSquare className="h-5 w-5" />,
    isPremium: false,
    category: 'communication',
    benefits: ['Instant responses', 'Context-aware answers', 'Study guidance']
  },
  {
    id: 'search',
    name: 'Smart Search',
    description: 'Find relevant study materials quickly with AI-powered search',
    icon: <Search className="h-5 w-5" />,
    isPremium: false,
    category: 'communication',
    benefits: ['Fast results', 'Relevant content', 'Smart filtering']
  },
  {
    id: 'insights',
    name: 'Study Insights',
    description: 'Get personalized learning recommendations based on your performance',
    icon: <Lightbulb className="h-5 w-5" />,
    isPremium: false,
    category: 'analysis',
    benefits: ['Personalized tips', 'Performance tracking', 'Smart recommendations']
  },
  {
    id: '3d-models',
    name: '3D Models',
    description: 'Interactive 3D visualizations for complex concepts and structures',
    icon: <Box className="h-5 w-5" />,
    isPremium: true,
    credits: 2,
    category: 'visual',
    benefits: ['Interactive models', 'Better understanding', 'Visual learning']
  },
  {
    id: 'interactive-visuals',
    name: 'Interactive Visuals',
    description: 'Dynamic charts, graphs, and interactive diagrams',
    icon: <BarChart3 className="h-5 w-5" />,
    isPremium: true,
    credits: 3,
    category: 'visual',
    benefits: ['Dynamic charts', 'Interactive elements', 'Data visualization']
  },
  {
    id: 'advanced-analysis',
    name: 'Advanced Analysis',
    description: 'Deep learning analytics and comprehensive performance insights',
    icon: <Brain className="h-5 w-5" />,
    isPremium: true,
    credits: 5,
    category: 'analysis',
    benefits: ['Deep insights', 'Performance analytics', 'Predictive learning']
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
    communication: 'AI Communication',
    analysis: 'Smart Analysis',
    visual: 'Visual Learning'
  };

  const categoryIcons = {
    communication: <MessageSquare className="h-4 w-4" />,
    analysis: <Brain className="h-4 w-4" />,
    visual: <Box className="h-4 w-4" />
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Learning Tools
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          Choose your perfect study companion
        </p>
      </div>

      {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
        <div key={category} className="space-y-2">
          <div className="flex items-center gap-2 px-2">
            {categoryIcons[category as keyof typeof categoryIcons]}
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {categoryTitles[category as keyof typeof categoryTitles]}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {categoryFeatures.map((feature) => {
              const isSelected = selectedFeature === feature.id;
              const canAfford = !feature.isPremium || !feature.credits || userCredits >= feature.credits;
              
              return (
                <motion.div
                  key={feature.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onHoverStart={() => setHoveredFeature(feature.id)}
                  onHoverEnd={() => setHoveredFeature(null)}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 shadow-md bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' 
                        : 'hover:shadow-sm'
                    } ${
                      feature.isPremium && !canAfford
                        ? 'opacity-60 cursor-not-allowed'
                        : ''
                    }`}
                    onClick={() => handleFeatureClick(feature)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`p-2 rounded-lg flex-shrink-0 ${
                            isSelected 
                              ? 'bg-blue-500 text-white' 
                              : feature.isPremium 
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                          }`}>
                            {feature.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-semibold truncate">
                                {feature.name}
                              </h4>
                              {feature.isPremium && (
                                <Crown className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                              {feature.description}
                            </p>
                            
                            {/* Compact Benefits */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {feature.benefits.slice(0, 2).map((benefit, index) => (
                                <div key={index} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                  <Sparkles className="h-2 w-2 text-blue-500" />
                                  <span className="truncate">{benefit}</span>
                                  {index < 1 && <span className="text-gray-300">•</span>}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          {feature.isPremium && (
                            <>
                              <Badge 
                                variant="secondary" 
                                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs"
                              >
                                <Star className="h-2 w-2 mr-1" />
                                Pro
                              </Badge>
                              {feature.credits && (
                                <Badge variant="outline" className="text-xs">
                                  {feature.credits}cr
                                </Badge>
                              )}
                            </>
                          )}
                          
                          {feature.isPremium && !canAfford && (
                            <Lock className="h-3 w-3 text-amber-500" />
                          )}
                          
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium"
                            >
                              <Zap className="h-3 w-3" />
                              <span>Active</span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Compact Credits CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-purple-800 dark:text-purple-200">
              Unlock Premium
            </h4>
            <p className="text-xs text-purple-600 dark:text-purple-400">
              Access 3D models & advanced features
            </p>
          </div>
          <Button 
            onClick={onPurchaseCredits}
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs"
          >
            <Crown className="h-3 w-3 mr-1" />
            Buy Credits
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureSelectionPanel;

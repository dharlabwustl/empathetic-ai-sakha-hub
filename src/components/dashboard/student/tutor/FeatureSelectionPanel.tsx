
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
  CheckCircle,
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
    icon: <Box className="h-6 w-6" />,
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
    visual: <Box className="h-5 w-5" />
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Choose Your AI Learning Tool
          </h2>
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </motion.div>
        </motion.div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Select the perfect AI-powered feature for your study session
        </p>
      </div>

      {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
        <motion.div 
          key={category} 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 px-1">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {categoryIcons[category as keyof typeof categoryIcons]}
            </div>
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
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setHoveredFeature(feature.id)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  className="h-full"
                >
                  <Card 
                    className={`cursor-pointer h-full transition-all duration-300 overflow-hidden ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 transform scale-102' 
                        : 'hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20'
                    } ${
                      feature.isPremium && !canAfford
                        ? 'opacity-60 cursor-not-allowed'
                        : ''
                    } ${
                      feature.isPremium 
                        ? 'border-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800'
                        : ''
                    }`}
                    onClick={() => handleFeatureClick(feature)}
                  >
                    {/* Premium Banner */}
                    {feature.isPremium && (
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-bl-lg">
                        <Star className="h-3 w-3 inline mr-1" />
                        Premium
                      </div>
                    )}

                    <CardHeader className="pb-3 relative">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <motion.div 
                            className={`p-3 rounded-xl transition-all duration-300 ${
                              isSelected 
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                                : feature.isPremium 
                                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                  : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                            }`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {feature.icon}
                          </motion.div>
                          <div>
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                              {feature.name}
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </motion.div>
                              )}
                            </CardTitle>
                          </div>
                        </div>
                        
                        {feature.isPremium && feature.credits && (
                          <Badge 
                            variant="outline" 
                            className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300"
                          >
                            {feature.credits} credits
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 pb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                        {feature.description}
                      </p>

                      {/* Feature Benefits */}
                      {feature.isPremium && (
                        <div className="space-y-2 mb-3">
                          <div className="text-xs font-medium text-purple-600 dark:text-purple-400">
                            Premium Benefits:
                          </div>
                          <div className="grid grid-cols-1 gap-1 text-xs">
                            {feature.id === '3d-models' && (
                              <>
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  <span>Interactive 3D visualizations</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  <span>Complex concept simplification</span>
                                </div>
                              </>
                            )}
                            {feature.id === 'interactive-visuals' && (
                              <>
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  <span>Dynamic charts & diagrams</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  <span>Real-time data visualization</span>
                                </div>
                              </>
                            )}
                            {feature.id === 'advanced-analysis' && (
                              <>
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  <span>Deep learning insights</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  <span>Performance predictions</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {feature.isPremium && !canAfford && (
                        <motion.div 
                          className="mt-3 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Lock className="h-4 w-4" />
                          <span>Need {feature.credits} more credits</span>
                        </motion.div>
                      )}
                      
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 flex items-center gap-2 text-sm bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-2 rounded-lg"
                        >
                          <Zap className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-blue-600 dark:text-blue-400">Currently Active</span>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* Enhanced Credits Purchase CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white overflow-hidden relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20"
            animate={{ 
              background: [
                "linear-gradient(45deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))",
                "linear-gradient(135deg, rgba(236,72,153,0.2), rgba(168,85,247,0.2))",
                "linear-gradient(225deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <CardContent className="p-6 relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Crown className="h-6 w-6" />
                  Unlock Premium AI Features
                </h4>
                <p className="opacity-90 mb-3">
                  Access 3D models, interactive visualizations, and advanced analysis to supercharge your learning
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    3D Models - 2 credits
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Visuals - 3 credits
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Analysis - 5 credits
                  </Badge>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={onPurchaseCredits}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full shadow-lg"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  Buy Credits Now
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FeatureSelectionPanel;

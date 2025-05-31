
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
  Sparkles,
  CheckCircle
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
  benefits?: string[];
}

const features: Feature[] = [
  {
    id: 'chat',
    name: 'AI Chat',
    description: 'Ask questions and get instant answers with voice support',
    icon: <MessageSquare className="h-6 w-6" />,
    isPremium: false,
    category: 'communication',
    benefits: ['Instant responses', 'Voice interaction', '24/7 availability', 'Context awareness']
  },
  {
    id: 'search',
    name: 'Smart Search',
    description: 'Find relevant study materials quickly with AI assistance',
    icon: <Search className="h-6 w-6" />,
    isPremium: false,
    category: 'communication',
    benefits: ['Lightning fast search', 'Relevant results', 'Smart filtering', 'Content discovery']
  },
  {
    id: 'insights',
    name: 'Study Insights',
    description: 'Get personalized learning recommendations and analytics',
    icon: <Lightbulb className="h-6 w-6" />,
    isPremium: false,
    category: 'analysis',
    benefits: ['Personalized tips', 'Progress tracking', 'Learning patterns', 'Goal optimization']
  },
  {
    id: '3d-models',
    name: '3D Models',
    description: 'Interactive 3D visualizations for complex concepts',
    icon: <Box className="h-6 w-6" />,
    isPremium: true,
    credits: 2,
    category: 'visual',
    benefits: ['Immersive learning', 'Complex visualization', 'Interactive exploration', 'Better retention']
  },
  {
    id: 'interactive-visuals',
    name: 'Interactive Visuals',
    description: 'Dynamic charts, graphs, and interactive diagrams',
    icon: <BarChart3 className="h-6 w-6" />,
    isPremium: true,
    credits: 3,
    category: 'visual',
    benefits: ['Dynamic charts', 'Interactive diagrams', 'Data visualization', 'Visual learning']
  },
  {
    id: 'advanced-analysis',
    name: 'Advanced Analysis',
    description: 'Deep learning analytics and performance insights',
    icon: <Brain className="h-6 w-6" />,
    isPremium: true,
    credits: 5,
    category: 'analysis',
    benefits: ['Deep analytics', 'Performance insights', 'Predictive modeling', 'Advanced metrics']
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
          className="mb-4"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Choose Your AI Learning Tool
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Select the perfect AI-powered feature for your study session
          </p>
        </motion.div>
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
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600"></div>
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
                  className="relative"
                >
                  {feature.isPremium && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Crown className="h-3 w-3" />
                        PREMIUM
                      </div>
                    </div>
                  )}
                  
                  <Card 
                    className={`cursor-pointer transition-all duration-300 h-full relative overflow-hidden ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200' 
                        : feature.isPremium
                        ? 'hover:shadow-lg bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 border-purple-200 dark:border-purple-800'
                        : 'hover:shadow-lg border-gray-200 dark:border-gray-700'
                    } ${
                      feature.isPremium && !canAfford
                        ? 'opacity-70 cursor-not-allowed'
                        : ''
                    }`}
                    onClick={() => handleFeatureClick(feature)}
                  >
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <motion.div 
                            className={`p-3 rounded-xl ${
                              isSelected 
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                                : feature.isPremium 
                                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                  : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                            }`}
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {feature.icon}
                          </motion.div>
                          <div>
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                              {feature.name}
                              {feature.isPremium && (
                                <Sparkles className="h-4 w-4 text-yellow-500" />
                              )}
                            </CardTitle>
                          </div>
                        </div>
                        
                        {feature.credits && (
                          <Badge 
                            variant="outline" 
                            className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300 text-purple-700 text-xs font-medium"
                          >
                            {feature.credits} credits
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {feature.benefits && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Key Benefits</p>
                          <div className="grid grid-cols-2 gap-1">
                            {feature.benefits.slice(0, 4).map((benefit, index) => (
                              <div key={index} className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                                <span className="truncate">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {feature.isPremium && !canAfford && (
                        <motion.div 
                          className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Lock className="h-4 w-4" />
                          <span>Need {feature.credits} more credits</span>
                        </motion.div>
                      )}
                      
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg"
                        >
                          <Zap className="h-4 w-4" />
                          <span>Active & Ready</span>
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
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
            animate={{ 
              background: [
                "linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))",
                "linear-gradient(45deg, rgba(236, 72, 153, 0.2), rgba(251, 146, 60, 0.2))",
                "linear-gradient(45deg, rgba(251, 146, 60, 0.2), rgba(147, 51, 234, 0.2))"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <CardContent className="p-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Crown className="h-6 w-6" />
                  Unlock Premium AI Features
                </h4>
                <p className="opacity-90 mb-4">
                  Experience the future of learning with 3D models, interactive visualizations, and advanced AI analysis
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    🎯 3D Models - 2 credits
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    📊 Interactive Visuals - 3 credits
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    🧠 Advanced Analysis - 5 credits
                  </Badge>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={onPurchaseCredits}
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 shadow-lg"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  Get Premium Credits
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


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
  Check
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
    benefits: ['Real-time responses', 'Voice interaction', 'Context awareness']
  },
  {
    id: 'search',
    name: 'Smart Search',
    description: 'Find relevant study materials quickly with AI-powered search',
    icon: <Search className="h-6 w-6" />,
    isPremium: false,
    category: 'communication',
    benefits: ['Instant results', 'Contextual suggestions', 'Multi-format content']
  },
  {
    id: 'insights',
    name: 'Study Insights',
    description: 'Get personalized learning recommendations and analytics',
    icon: <Lightbulb className="h-6 w-6" />,
    isPremium: false,
    category: 'analysis',
    benefits: ['Performance tracking', 'Weakness identification', 'Study optimization']
  },
  {
    id: '3d-models',
    name: '3D Models',
    description: 'Interactive 3D visualizations for complex concepts',
    icon: <Box className="h-6 w-6" />,
    isPremium: true,
    credits: 2,
    category: 'visual',
    benefits: ['360° visualization', 'Interactive exploration', 'Enhanced understanding']
  },
  {
    id: 'interactive-visuals',
    name: 'Interactive Visuals',
    description: 'Dynamic charts, graphs, and interactive diagrams',
    icon: <BarChart3 className="h-6 w-6" />,
    isPremium: true,
    credits: 3,
    category: 'visual',
    benefits: ['Real-time data visualization', 'Interactive manipulation', 'Custom simulations']
  },
  {
    id: 'advanced-analysis',
    name: 'Advanced Analysis',
    description: 'Deep learning analytics and performance insights',
    icon: <Brain className="h-6 w-6" />,
    isPremium: true,
    credits: 5,
    category: 'analysis',
    benefits: ['Predictive analytics', 'Detailed reports', 'Personalized recommendations']
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
    visual: 'Premium Visual Tools'
  };

  const categoryIcons = {
    communication: <MessageSquare className="h-5 w-5" />,
    analysis: <Brain className="h-5 w-5" />,
    visual: <Box className="h-5 w-5" />
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Choose Your AI Learning Tool
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 mt-2 text-lg"
        >
          Unlock the perfect AI-powered feature for your study session
        </motion.p>
      </div>

      {Object.entries(groupedFeatures).map(([category, categoryFeatures], categoryIndex) => (
        <motion.div 
          key={category} 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 px-1">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {categoryIcons[category as keyof typeof categoryIcons]}
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {categoryTitles[category as keyof typeof categoryTitles]}
            </h3>
            {category === 'visual' && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryFeatures.map((feature, index) => {
              const isSelected = selectedFeature === feature.id;
              const canAfford = !feature.isPremium || !feature.credits || userCredits >= feature.credits;
              
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (categoryIndex * categoryFeatures.length + index) * 0.05 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setHoveredFeature(feature.id)}
                  onHoverEnd={() => setHoveredFeature(null)}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 h-full relative overflow-hidden ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' 
                        : 'hover:shadow-lg border-gray-200 dark:border-gray-700'
                    } ${
                      feature.isPremium && !canAfford
                        ? 'opacity-60 cursor-not-allowed'
                        : ''
                    } ${
                      feature.isPremium
                        ? 'border-2 border-gradient-to-r from-purple-300 to-pink-300'
                        : ''
                    }`}
                    onClick={() => handleFeatureClick(feature)}
                  >
                    {/* Premium Shine Effect */}
                    {feature.isPremium && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{
                          x: hoveredFeature === feature.id ? ['-100%', '100%'] : '-100%'
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
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
                                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white'
                                  : 'bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 text-blue-600 dark:text-blue-400'
                            }`}
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {feature.icon}
                          </motion.div>
                          <div>
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                              {feature.name}
                              {feature.isPremium && (
                                <motion.div
                                  animate={{ rotate: [0, 10, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Crown className="h-4 w-4 text-yellow-500" />
                                </motion.div>
                              )}
                            </CardTitle>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          {feature.isPremium && (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="flex flex-col items-end gap-1"
                            >
                              <Badge 
                                variant="secondary" 
                                className="bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 text-white text-xs font-bold shadow-md"
                              >
                                <Sparkles className="h-3 w-3 mr-1" />
                                Premium
                              </Badge>
                              {feature.credits && (
                                <Badge variant="outline" className="text-xs border-purple-300 text-purple-700 dark:text-purple-300">
                                  <Zap className="h-3 w-3 mr-1" />
                                  {feature.credits} credits
                                </Badge>
                              )}
                            </motion.div>
                          )}
                          
                          {!feature.isPremium && (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                              <Check className="h-3 w-3 mr-1" />
                              FREE
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                        {feature.description}
                      </p>
                      
                      {/* Benefits List */}
                      {feature.benefits && (
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                            Key Benefits:
                          </p>
                          <div className="space-y-1">
                            {feature.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {feature.isPremium && !canAfford && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-4 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg"
                        >
                          <Lock className="h-4 w-4" />
                          <span>Need {feature.credits} more credits</span>
                        </motion.div>
                      )}
                      
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <Zap className="h-4 w-4 text-blue-500" />
                          </motion.div>
                          <span>Currently Active</span>
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
        transition={{ delay: 0.5 }}
        className="mt-8 p-6 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 rounded-xl shadow-2xl relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 80%, #ffffff 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, #ffffff 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, #ffffff 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="relative z-10 flex items-center justify-between text-white">
          <div className="flex-1">
            <motion.h4 
              className="text-2xl font-bold mb-2"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🚀 Unlock Premium AI Features
            </motion.h4>
            <p className="text-lg opacity-90 mb-4">
              Transform your learning with cutting-edge 3D models, interactive visualizations, and advanced AI analysis
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                ✨ 3D Learning Models
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                📊 Interactive Charts
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                🧠 Advanced Analytics
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
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-8 py-3 shadow-xl"
            >
              <Crown className="h-5 w-5 mr-2" />
              Get Premium Credits
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureSelectionPanel;

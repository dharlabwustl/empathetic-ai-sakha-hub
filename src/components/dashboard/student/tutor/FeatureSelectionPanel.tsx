
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Search, Brain, Cube, Eye, BarChart3, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  credits: number;
  isPremium: boolean;
}

interface FeatureSelectionPanelProps {
  selectedFeature: string;
  onFeatureSelect: (featureId: string) => void;
  userCredits: number;
}

const features: Feature[] = [
  {
    id: 'chat',
    name: 'AI Chat',
    icon: MessageSquare,
    description: 'Get instant answers to your questions',
    credits: 0,
    isPremium: false
  },
  {
    id: 'search',
    name: 'Smart Search',
    icon: Search,
    description: 'Find relevant content across all subjects',
    credits: 1,
    isPremium: false
  },
  {
    id: 'insights',
    name: 'AI Insights',
    icon: Brain,
    description: 'Get personalized study recommendations',
    credits: 1,
    isPremium: false
  },
  {
    id: '3d-models',
    name: '3D Models',
    icon: Cube,
    description: 'Interactive 3D visualizations for complex concepts',
    credits: 2,
    isPremium: true
  },
  {
    id: 'interactive-visuals',
    name: 'Interactive Visuals',
    icon: Eye,
    description: 'Dynamic diagrams and simulations',
    credits: 3,
    isPremium: true
  },
  {
    id: 'advanced-analysis',
    name: 'Advanced Analysis',
    icon: BarChart3,
    description: 'Deep performance insights and predictions',
    credits: 5,
    isPremium: true
  }
];

const FeatureSelectionPanel: React.FC<FeatureSelectionPanelProps> = ({
  selectedFeature,
  onFeatureSelect,
  userCredits
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">AI Features</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const canAfford = userCredits >= feature.credits;
          const isSelected = selectedFeature === feature.id;
          
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => onFeatureSelect(feature.id)}
                variant={isSelected ? "default" : "outline"}
                className={`w-full justify-start h-auto p-4 ${
                  feature.isPremium && !canAfford 
                    ? 'opacity-60 cursor-not-allowed' 
                    : ''
                } ${
                  feature.isPremium 
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700' 
                    : ''
                }`}
                disabled={feature.isPremium && !canAfford}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className={`p-2 rounded-lg ${
                    isSelected 
                      ? 'bg-white/20' 
                      : feature.isPremium 
                        ? 'bg-purple-100 dark:bg-purple-800' 
                        : 'bg-blue-100 dark:bg-blue-800'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{feature.name}</span>
                      {feature.isPremium && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                      {feature.credits > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {feature.credits} credits
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                    {feature.isPremium && !canAfford && (
                      <p className="text-xs text-red-500 mt-1">
                        Insufficient credits
                      </p>
                    )}
                  </div>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default FeatureSelectionPanel;

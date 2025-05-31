
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Search, 
  Brain, 
  Cube, 
  Eye, 
  BarChart3,
  Sparkles,
  Lock,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

export interface TutorFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isPremium: boolean;
  credits?: number;
  isPopular?: boolean;
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
  const features: TutorFeature[] = [
    {
      id: 'chat',
      name: 'Chat',
      description: 'Ask questions and get instant responses',
      icon: <MessageSquare className="h-5 w-5" />,
      isPremium: false,
      isPopular: true
    },
    {
      id: 'search',
      name: 'Search',
      description: 'Find specific topics and concepts',
      icon: <Search className="h-5 w-5" />,
      isPremium: false
    },
    {
      id: 'insights',
      name: 'Insights',
      description: 'Get personalized learning recommendations',
      icon: <Brain className="h-5 w-5" />,
      isPremium: false
    },
    {
      id: '3d-models',
      name: '3D Models',
      description: 'Interactive 3D visualizations',
      icon: <Cube className="h-5 w-5" />,
      isPremium: true,
      credits: 2
    },
    {
      id: 'interactive-visuals',
      name: 'Interactive Visuals',
      description: 'Dynamic charts and diagrams',
      icon: <Eye className="h-5 w-5" />,
      isPremium: true,
      credits: 3
    },
    {
      id: 'advanced-analysis',
      name: 'Advanced Analysis',
      description: 'Deep performance insights and predictions',
      icon: <BarChart3 className="h-5 w-5" />,
      isPremium: true,
      credits: 5,
      isPopular: true
    }
  ];

  const canUseFeature = (feature: TutorFeature) => {
    if (!feature.isPremium) return true;
    return userCredits >= (feature.credits || 0);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          AI Tutor Features
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose how you'd like to interact with your AI tutor
          </p>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">{userCredits} credits</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  selectedFeature === feature.id
                    ? "border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "hover:border-gray-300 hover:shadow-md"
                } ${
                  !canUseFeature(feature) 
                    ? "opacity-60 cursor-not-allowed" 
                    : ""
                }`}
                onClick={() => {
                  if (canUseFeature(feature)) {
                    onFeatureSelect(feature.id);
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${
                      selectedFeature === feature.id
                        ? "bg-blue-500 text-white"
                        : feature.isPremium 
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}>
                      {feature.icon}
                    </div>
                    
                    <div className="flex flex-col items-end gap-1">
                      {feature.isPopular && (
                        <Badge variant="secondary" className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs">
                          Popular
                        </Badge>
                      )}
                      {feature.isPremium && (
                        <Badge variant="outline" className="text-xs border-purple-300 text-purple-600">
                          <Lock className="h-3 w-3 mr-1" />
                          {feature.credits} credits
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{feature.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {feature.description}
                  </p>
                  
                  {feature.isPremium && !canUseFeature(feature) && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPurchaseCredits();
                      }}
                    >
                      Buy Credits
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureSelectionPanel;

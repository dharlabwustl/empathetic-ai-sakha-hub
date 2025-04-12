
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Settings, RefreshCw, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LearningStyleSection from "../personalization/LearningStyleSection";
import AdaptiveDifficultySection from "../personalization/AdaptiveDifficultySection";
import StudyPlanSection from "../personalization/StudyPlanSection";
import FeelGoodSection from "../personalization/FeelGoodSection";
import AIModelConfiguration from "../personalization/AIModelConfiguration";

const AIPersonalizationTab = () => {
  const { toast } = useToast();

  const handleOptimizeAI = () => {
    toast({
      title: "AI Optimization",
      description: "Connecting to Flask environment for AI optimization...",
      variant: "default"
    });
    
    // Simulate API call to Flask backend
    setTimeout(() => {
      toast({
        title: "AI Optimization Complete",
        description: "AI models have been optimized successfully",
        variant: "default"
      });
    }, 2000);
  };

  const handleSyncData = () => {
    toast({
      title: "Syncing Data",
      description: "Syncing personalization data with Flask environment...",
      variant: "default"
    });
    
    // Simulate API call to Flask backend
    setTimeout(() => {
      toast({
        title: "Data Synced",
        description: "All personalization data has been synchronized",
        variant: "default"
      });
    }, 1500);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">AI Personalization Engine</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Configure and manage AI models for personalized learning
          </p>
        </div>
        
        <div className="flex gap-2 self-end sm:self-auto">
          <Button 
            variant="outline" 
            onClick={handleSyncData}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} />
            <span>Sync Data</span>
          </Button>
          
          <Button 
            onClick={handleOptimizeAI}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center gap-2"
          >
            <Settings size={16} />
            <span>Optimize AI</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LearningStyleSection />
        <AdaptiveDifficultySection />
        <StudyPlanSection />
        <FeelGoodSection />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>AI Model Configuration</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                toast({
                  title: "Advanced Settings",
                  description: "Opening advanced AI configuration panel",
                  variant: "default"
                });
              }}
            >
              Advanced Settings
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AIModelConfiguration />
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPersonalizationTab;

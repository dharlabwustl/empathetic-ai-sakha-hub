
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Settings, RefreshCw, Save, Power } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
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

  const handleModelToggle = (modelName: string, enabled: boolean) => {
    toast({
      title: `${modelName} ${enabled ? 'Enabled' : 'Disabled'}`,
      description: `${modelName} has been ${enabled ? 'enabled' : 'disabled'} successfully`,
      variant: "default"
    });
  };

  const handleConfigureModel = (modelName: string) => {
    toast({
      title: `Configure ${modelName}`,
      description: `Opening configuration panel for ${modelName}`,
      variant: "default"
    });
    
    // Simulate API call to Flask backend
    setTimeout(() => {
      toast({
        title: "Model Configuration Updated",
        description: `${modelName} has been configured successfully`,
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
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 flex items-center gap-2"
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">AI Module</th>
                  <th className="text-left py-3 px-4 font-medium">Current Model</th>
                  <th className="text-left py-3 px-4 font-medium">Accuracy</th>
                  <th className="text-left py-3 px-4 font-medium">Latency</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Enable/Disable</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Learning Style Detector</td>
                  <td className="py-3 px-4">GPT-4 + Custom Classifier</td>
                  <td className="py-3 px-4">92%</td>
                  <td className="py-3 px-4">1.2s</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Switch id="learning-style" defaultChecked onCheckedChange={(checked) => handleModelToggle("Learning Style Detector", checked)} />
                      <label htmlFor="learning-style" className="text-xs">
                        <Power size={14} className={`inline ${true ? 'text-green-600' : 'text-gray-400'}`} />
                      </label>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleConfigureModel("Learning Style Detector")}
                    >
                      Configure
                    </Button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Study Planner</td>
                  <td className="py-3 px-4">GPT-4 + Scheduling Algorithm</td>
                  <td className="py-3 px-4">86%</td>
                  <td className="py-3 px-4">2.4s</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Switch id="study-planner" defaultChecked onCheckedChange={(checked) => handleModelToggle("Study Planner", checked)} />
                      <label htmlFor="study-planner" className="text-xs">
                        <Power size={14} className={`inline ${true ? 'text-green-600' : 'text-gray-400'}`} />
                      </label>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleConfigureModel("Study Planner")}
                    >
                      Configure
                    </Button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Mood Analysis</td>
                  <td className="py-3 px-4">Sentiment Model v2</td>
                  <td className="py-3 px-4">78%</td>
                  <td className="py-3 px-4">0.8s</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">Needs Tuning</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Switch id="mood-analysis" defaultChecked onCheckedChange={(checked) => handleModelToggle("Mood Analysis", checked)} />
                      <label htmlFor="mood-analysis" className="text-xs">
                        <Power size={14} className={`inline ${true ? 'text-green-600' : 'text-gray-400'}`} />
                      </label>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleConfigureModel("Mood Analysis")}
                    >
                      Tune Model
                    </Button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Doubt Resolver</td>
                  <td className="py-3 px-4">GPT-4 + KB Integration</td>
                  <td className="py-3 px-4">94%</td>
                  <td className="py-3 px-4">1.8s</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Switch id="doubt-resolver" defaultChecked onCheckedChange={(checked) => handleModelToggle("Doubt Resolver", checked)} />
                      <label htmlFor="doubt-resolver" className="text-xs">
                        <Power size={14} className={`inline ${true ? 'text-green-600' : 'text-gray-400'}`} />
                      </label>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleConfigureModel("Doubt Resolver")}
                    >
                      Configure
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                toast({
                  title: "Settings Reset",
                  description: "AI model configurations have been reset to defaults",
                  variant: "default"
                });
              }}
            >
              Reset to Defaults
            </Button>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
              onClick={() => {
                toast({
                  title: "Settings Saved",
                  description: "AI model configurations have been saved successfully",
                  variant: "default"
                });
              }}
            >
              <Save size={16} className="mr-2" />
              Save Configurations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPersonalizationTab;

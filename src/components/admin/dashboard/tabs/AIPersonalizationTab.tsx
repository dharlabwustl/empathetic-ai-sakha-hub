import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  Settings, 
  RefreshCw, 
  Save, 
  Power, 
  MessageCircle,
  Smile,
  Users,
  Gauge,
  MessageSquare,
  ThumbsUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import LearningStyleSection from "../personalization/LearningStyleSection";
import AdaptiveDifficultySection from "../personalization/AdaptiveDifficultySection";
import StudyPlanSection from "../personalization/StudyPlanSection";
import FeelGoodSection from "../personalization/FeelGoodSection";
import AIModelConfiguration from "../personalization/AIModelConfiguration";

// New components for additional features
import MoodBasedSuggestionsSection from "../personalization/MoodBasedSuggestionsSection";
import SurroundingInfluenceSection from "../personalization/SurroundingInfluenceSection";
import PeerCommunityFeedSection from "../personalization/PeerCommunityFeedSection";
import LearningPulseSection from "../personalization/LearningPulseSection";
import DoubtResponderSection from "../personalization/DoubtResponderSection";
import TutorChatSection from "../personalization/TutorChatSection";

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

      {/* Original features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <LearningStyleSection />
        <AdaptiveDifficultySection />
        <StudyPlanSection />
        <FeelGoodSection />
      </div>

      {/* New additional features */}
      <h3 className="text-xl font-semibold mb-4 mt-8">Advanced AI Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Mood-Based Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Smile className="mr-2 h-5 w-5 text-pink-500" />
                <span>Mood-Based Suggestions</span>
              </div>
              <Switch id="mood-suggestions" defaultChecked onCheckedChange={(checked) => handleModelToggle("Mood Suggestions", checked)} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Provides content suggestions based on student's emotional state</p>
            <div className="space-y-4">
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <p className="font-medium">Lightweight emotion model + GPT</p>
                <div className="flex justify-between items-center mt-2">
                  <span>Trigger accuracy:</span>
                  <span className="text-pink-600 font-medium">86%</span>
                </div>
              </div>
              <div className="flex justify-between">
                <Button size="sm" variant="outline" onClick={() => handleConfigureModel("Mood Suggestions")}>
                  Track Alerts
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleConfigureModel("Mood Engine")}>
                  Tune Engine
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Surrounding Influence Meter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Gauge className="mr-2 h-5 w-5 text-purple-500" />
                <span>Influence Meter</span>
              </div>
              <Switch id="influence-meter" defaultChecked onCheckedChange={(checked) => handleModelToggle("Influence Meter", checked)} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Tracks confidence, peer influence and exposure</p>
            <div className="space-y-4">
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <p className="font-medium">Hybrid behavior+LLM model</p>
                <div className="flex justify-between items-center mt-2">
                  <span>Data points tracked:</span>
                  <span className="text-purple-600 font-medium">12</span>
                </div>
              </div>
              <Button size="sm" className="w-full" onClick={() => handleConfigureModel("Influence Meter")}>
                View Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Peer Community Feed Tuner */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                <span>Peer Feed Tuner</span>
              </div>
              <Switch id="peer-feed" defaultChecked onCheckedChange={(checked) => handleModelToggle("Peer Feed", checked)} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Filter peer content by influence level</p>
            <div className="space-y-4">
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <p className="font-medium">NLP filter + Mood Engine</p>
                <div className="flex justify-between items-center mt-2">
                  <span>Moderation accuracy:</span>
                  <span className="text-blue-600 font-medium">92%</span>
                </div>
              </div>
              <Button size="sm" className="w-full" onClick={() => handleConfigureModel("Moderation Controls")}>
                Moderation Controls
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Learning Pulse Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                <span>Learning Pulse</span>
              </div>
              <Switch id="learning-pulse" defaultChecked onCheckedChange={(checked) => handleModelToggle("Learning Pulse", checked)} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">30-sec mood + readiness summary</p>
            <div className="space-y-4">
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <p className="font-medium">LLM + mood scoring</p>
                <div className="flex justify-between items-center mt-2">
                  <span>Reports generated:</span>
                  <span className="text-green-600 font-medium">458</span>
                </div>
              </div>
              <Button size="sm" className="w-full" onClick={() => handleConfigureModel("Learning Pulse")}>
                Access Report Logs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Doubt Auto-Responder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-yellow-500" />
                <span>Doubt Responder</span>
              </div>
              <Switch id="doubt-responder" defaultChecked onCheckedChange={(checked) => handleModelToggle("Doubt Responder", checked)} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">GPT answers from knowledge base</p>
            <div className="space-y-4">
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <p className="font-medium">GPT + curated KB</p>
                <div className="flex justify-between items-center mt-2">
                  <span>Response accuracy:</span>
                  <span className="text-yellow-600 font-medium">94%</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => handleConfigureModel("View Logs")}>
                  View Logs
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => handleConfigureModel("Approve KB")}>
                  Approve KB
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 24x7 Tutor Chat */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5 text-pink-500" />
                <span>24x7 Tutor Chat</span>
              </div>
              <Switch id="tutor-chat" defaultChecked onCheckedChange={(checked) => handleModelToggle("Tutor Chat", checked)} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Conversational learning assistant</p>
            <div className="space-y-4">
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <p className="font-medium">GPT + Chat Layer</p>
                <div className="flex justify-between items-center mt-2">
                  <span>Total conversations:</span>
                  <span className="text-pink-600 font-medium">1,248</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => handleConfigureModel("View Chats")}>
                  View Chats
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => handleConfigureModel("Escalate Issues")}>
                  Escalate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
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
                
                {/* Add more rows for other models like in the original */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Mood-Based Suggestions</td>
                  <td className="py-3 px-4">Sentiment Model v3</td>
                  <td className="py-3 px-4">86%</td>
                  <td className="py-3 px-4">0.9s</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Switch id="mood-suggestions-switch" defaultChecked onCheckedChange={(checked) => handleModelToggle("Mood Suggestions", checked)} />
                      <label htmlFor="mood-suggestions-switch" className="text-xs">
                        <Power size={14} className={`inline ${true ? 'text-green-600' : 'text-gray-400'}`} />
                      </label>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleConfigureModel("Mood Suggestions")}
                    >
                      Configure
                    </Button>
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">24x7 Tutor Chat</td>
                  <td className="py-3 px-4">GPT-4 + Edu Context</td>
                  <td className="py-3 px-4">95%</td>
                  <td className="py-3 px-4">1.5s</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Switch id="tutor-chat-switch" defaultChecked onCheckedChange={(checked) => handleModelToggle("Tutor Chat", checked)} />
                      <label htmlFor="tutor-chat-switch" className="text-xs">
                        <Power size={14} className={`inline ${true ? 'text-green-600' : 'text-gray-400'}`} />
                      </label>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleConfigureModel("Tutor Chat")}
                    >
                      Configure
                    </Button>
                  </td>
                </tr>

                {/* Keep other existing rows */}
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
                {/* ... other rows ... */}
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

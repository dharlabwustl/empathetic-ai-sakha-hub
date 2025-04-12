
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIPersonalizationTab = () => {
  const { toast } = useToast();

  const handleTestAlgorithm = (feature: string) => {
    toast({
      title: "Testing " + feature,
      description: "Connecting to model for testing...",
      variant: "default"
    });
    
    // Simulate testing delay
    setTimeout(() => {
      toast({
        title: "Test Complete",
        description: `${feature} test completed successfully`,
        variant: "default"
      });
    }, 1500);
  };

  const handleConfigureFeature = (feature: string) => {
    toast({
      title: "Configure " + feature,
      description: "Opening configuration panel",
      variant: "default"
    });
  };
  
  const handleToggleFeature = (feature: string, enabled: boolean) => {
    toast({
      title: feature + (enabled ? " Enabled" : " Disabled"),
      description: `${feature} has been ${enabled ? "enabled" : "disabled"}`,
      variant: "default"
    });
  };

  const handleSaveSettings = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been saved`,
      variant: "default" 
    });
  };
  
  const handleResetSettings = (section: string) => {
    toast({
      title: "Settings Reset",
      description: `${section} settings have been reset to default`,
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      {/* Learning Style Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Learning Style Detection</span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Allow Manual Override</span>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer dark:bg-gray-700">
                  <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1"></span>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => handleConfigureFeature("Learning Style Detection")}
              >
                Configure
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Key Learning Styles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Visual Learning</h4>
                    <p className="text-sm text-gray-500">Image-based learning patterns</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleConfigureFeature("Visual Learning")}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auditory Learning</h4>
                    <p className="text-sm text-gray-500">Sound-based learning patterns</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleConfigureFeature("Auditory Learning")}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Reading/Writing</h4>
                    <p className="text-sm text-gray-500">Text-based learning patterns</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleConfigureFeature("Reading/Writing Learning")}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Kinesthetic Learning</h4>
                    <p className="text-sm text-gray-500">Interactive learning patterns</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleConfigureFeature("Kinesthetic Learning")}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={() => handleTestAlgorithm("Classification Algorithm")}
              >
                Test Classification Algorithm
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => handleResetSettings("Learning Style Detection")}
                >
                  Reset to Default
                </Button>
                <Button 
                  onClick={() => handleSaveSettings("Learning Style Detection")}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Concept Reinforcement Triggers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Concept Reinforcement Triggers</span>
            <Button 
              variant="outline"
              onClick={() => handleConfigureFeature("Concept Reinforcement")}
            >
              Configure
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Trigger Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Time-Based Triggers</h4>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Reinforce concepts after specific time intervals</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleConfigureFeature("Time-Based Triggers")}
                  >
                    Configure
                  </Button>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Quiz Performance Triggers</h4>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Reinforce based on quiz results</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleConfigureFeature("Quiz Performance Triggers")}
                  >
                    Configure
                  </Button>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Mistake-Based Triggers</h4>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Reinforce concepts with high error rates</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleConfigureFeature("Mistake-Based Triggers")}
                  >
                    Configure
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={() => handleTestAlgorithm("Reinforcement Algorithm")}
              >
                Test Reinforcement Algorithm
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => handleResetSettings("Concept Reinforcement Triggers")}
                >
                  Reset to Default
                </Button>
                <Button 
                  onClick={() => handleSaveSettings("Concept Reinforcement Triggers")}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goal-Based Personal Planner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Goal-Based Personal Planner</span>
            <Button 
              variant="outline"
              onClick={() => handleConfigureFeature("Goal-Based Planner")}
            >
              Configure
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Plan Structure Controls</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Adaptive Milestone Setting</h4>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Automatically adjust milestones based on progress</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleConfigureFeature("Adaptive Milestone Setting")}
                  >
                    Configure
                  </Button>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Dynamic Difficulty Scaling</h4>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Adjust study plan difficulty based on performance</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleConfigureFeature("Dynamic Difficulty Scaling")}
                  >
                    Configure
                  </Button>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Exam-Specific Optimization</h4>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Tailor study plans for specific exam patterns</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleConfigureFeature("Exam-Specific Optimization")}
                  >
                    Configure
                  </Button>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Spaced Repetition System</h4>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Schedule review sessions following forgetting curve</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleConfigureFeature("Spaced Repetition System")}
                  >
                    Configure
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={() => handleTestAlgorithm("Planner Algorithm")}
              >
                Test AI Model
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => handleResetSettings("Goal-Based Personal Planner")}
                >
                  Reset to Default
                </Button>
                <Button 
                  onClick={() => handleSaveSettings("Goal-Based Personal Planner")}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Smart Study Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Daily Smart Study Plan</span>
            <Button 
              variant="outline"
              onClick={() => handleConfigureFeature("Daily Study Plan")}
            >
              Configure
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-3">Current Model</h4>
                <div className="text-sm text-gray-500 mb-4">
                  <p>GPT-4 with custom fine-tuning for educational content planning and sequencing</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy:</span>
                    <span>92%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>User Satisfaction:</span>
                    <span>89%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Adaptive Score:</span>
                    <span>85%</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => handleTestAlgorithm("Daily Plan Generator")}
                >
                  Test AI Model
                </Button>
              </div>
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-3">Model Parameters</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Time Sensitivity</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value="75" 
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Difficulty Bias</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value="60" 
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>Easy</span>
                      <span>Hard</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Variety Factor</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value="80" 
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>Focused</span>
                      <span>Varied</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button 
                variant="outline"
                onClick={() => handleResetSettings("Daily Smart Study Plan")}
              >
                Reset to Default
              </Button>
              <Button 
                onClick={() => handleSaveSettings("Daily Smart Study Plan")}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Adaptive Difficulty Engine */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Adaptive Difficulty Engine</span>
            <Button 
              variant="outline"
              onClick={() => handleConfigureFeature("Adaptive Difficulty Engine")}
            >
              Configure
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Performance-Based Adjustment</h4>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                    <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-3">Adjust question difficulty based on student performance</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleConfigureFeature("Performance-Based Adjustment")}
                >
                  Configure
                </Button>
              </div>
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Emotional State Adaptation</h4>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                    <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-3">Consider emotional state when setting difficulty</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleConfigureFeature("Emotional State Adaptation")}
                >
                  Configure
                </Button>
              </div>
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Topic-Specific Scaling</h4>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                    <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-3">Apply different difficulty curves per topic</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleConfigureFeature("Topic-Specific Scaling")}
                >
                  Configure
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={() => handleTestAlgorithm("Difficulty Algorithm")}
              >
                Test Difficulty Algorithm
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => handleResetSettings("Adaptive Difficulty Engine")}
                >
                  Reset to Default
                </Button>
                <Button 
                  onClick={() => handleSaveSettings("Adaptive Difficulty Engine")}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Smart Suggestions</span>
            <Button 
              variant="outline"
              onClick={() => handleConfigureFeature("Smart Suggestions")}
            >
              Configure
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Suggestion Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Study Break Reminders</h4>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleConfigureFeature("Study Break Reminders")}
                  >
                    Configure
                  </Button>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Resource Recommendations</h4>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleConfigureFeature("Resource Recommendations")}
                  >
                    Configure
                  </Button>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Technique Suggestions</h4>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleConfigureFeature("Technique Suggestions")}
                  >
                    Configure
                  </Button>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Motivational Messages</h4>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                      <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-1 translate-x-[1.25rem]"></span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleConfigureFeature("Motivational Messages")}
                  >
                    Configure
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Override Controls</h3>
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => handleConfigureFeature("Override Rules")}
              >
                <Code size={16} />
                <span>Manage Override Rules</span>
              </Button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={() => handleTestAlgorithm("Suggestion Algorithm")}
              >
                Test Suggestion Engine
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => handleResetSettings("Smart Suggestions")}
                >
                  Reset to Default
                </Button>
                <Button 
                  onClick={() => handleSaveSettings("Smart Suggestions")}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>System Documentation</span>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => handleConfigureFeature("AI System Documentation")}
            >
              <FileText size={16} />
              <span>View Full Documentation</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none dark:prose-invert">
            <p className="text-sm text-gray-500">
              The AI Personalization system uses a combination of supervised learning models, reinforcement learning, 
              and natural language processing to create adaptive learning experiences. The system continuously updates 
              its understanding of each student's learning patterns and preferences through their interactions with the platform.
            </p>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 mt-4"
              onClick={() => handleConfigureFeature("System Architecture")}
            >
              <BookOpen size={16} />
              <span>System Architecture Details</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPersonalizationTab;

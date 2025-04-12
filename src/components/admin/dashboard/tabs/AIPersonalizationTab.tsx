
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  Brain,
  Settings,
  Save,
  RotateCcw,
  Check,
  AlertTriangle,
  Target,
  BookOpen,
  Calendar,
  Github,
  Wand2,
  ListChecks,
  BookCheck,
  Clock,
  ArrowRight,
  BarChart2
} from "lucide-react";

const AIPersonalizationTab = () => {
  const [testingModel, setTestingModel] = useState(false);
  
  // State for Learning Style Detection
  const [learningStyleSettings, setLearningStyleSettings] = useState({
    manualOverride: false,
    styles: {
      visual: true,
      auditory: true,
      reading: true,
      kinesthetic: true
    }
  });
  
  // State for Concept Reinforcement
  const [reinforcementSettings, setReinforcementSettings] = useState({
    triggers: {
      timeBased: true,
      quizPerformance: true,
      mistakeBased: true,
    }
  });
  
  // State for Goal-Based Planner
  const [plannerSettings, setPlannerSettings] = useState({
    structure: {
      adaptivePacing: true,
      milestones: true,
      progressTracking: true,
    }
  });
  
  // State for Daily Study Plan
  const [dailyPlanSettings, setDailyPlanSettings] = useState({
    active: true,
    aiModel: "GPT-4"
  });
  
  // State for Adaptive Difficulty
  const [difficultySettings, setDifficultySettings] = useState({
    dynamicAdjustment: true,
    performanceAnalysis: true,
    userFeedback: true
  });
  
  // State for Smart Suggestions
  const [suggestionSettings, setSuggestionSettings] = useState({
    types: {
      content: true,
      timeManagement: true,
      studyBreaks: true,
      resources: true
    }
  });

  // State for Feel-Good Corner
  const [feelGoodSettings, setFeelGoodSettings] = useState({
    active: true,
    contentTypes: {
      humor: true,
      puzzles: true,
      motivationalContent: true
    }
  });

  // State for Surrounding Influence Meter
  const [influenceSettings, setInfluenceSettings] = useState({
    active: true,
    trackingTypes: {
      confidence: true,
      peerInfluence: true,
      environment: true
    }
  });

  // State for other AI features
  const [otherFeatureSettings, setOtherFeatureSettings] = useState({
    peerCommunity: true,
    learningPulse: true,
    doubtResponder: true,
    tutorChat: true,
    moodSuggestions: true
  });

  const testAIModel = (modelName: string) => {
    setTestingModel(true);
    toast({
      title: "Testing AI Model",
      description: `Connecting to Flask API to test the ${modelName} model...`
    });
    
    // Simulate API call to test model
    setTimeout(() => {
      setTestingModel(false);
      toast({
        title: "AI Model Test Complete",
        description: `${modelName} model is connected and functioning correctly.`,
        variant: "success"
      });
    }, 2000);
  };

  const handleSaveSettings = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
      variant: "success"
    });
  };

  const handleResetSettings = (section: string) => {
    toast({
      title: "Settings Reset",
      description: `${section} settings have been reset to default values.`,
      variant: "default"
    });
  };

  const toggleSetting = (setting: any, setSetting: React.Dispatch<React.SetStateAction<any>>, path: string[]) => {
    const newSettings = {...setting};
    let current = newSettings;
    
    // Navigate to the nested property
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    
    // Toggle the value
    const lastKey = path[path.length - 1];
    current[lastKey] = !current[lastKey];
    
    // Update state
    setSetting(newSettings);
  };

  const renderConfigureButton = (label: string = "Configure") => (
    <Button variant="outline" size="sm" className="ml-2">
      <Settings size={14} className="mr-1" />
      {label}
    </Button>
  );

  const renderSaveResetButtons = (section: string) => (
    <div className="flex justify-end gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => handleResetSettings(section)}
      >
        <RotateCcw size={14} />
        <span>Reset</span>
      </Button>
      <Button
        variant="default"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => handleSaveSettings(section)}
      >
        <Save size={14} />
        <span>Save Changes</span>
      </Button>
    </div>
  );

  // Helper to render toggle sections
  const renderToggleItem = (
    label: string,
    isActive: boolean,
    onToggle: () => void,
    configAction?: () => void
  ) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <Switch 
          checked={isActive} 
          onCheckedChange={onToggle}
          id={`toggle-${label.replace(/\s+/g, '-').toLowerCase()}`}
        />
        <Label 
          htmlFor={`toggle-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className="ml-2 text-sm"
        >
          {label}
        </Label>
      </div>
      {configAction && renderConfigureButton()}
    </div>
  );

  return (
    <div>
      <Tabs defaultValue="learning-style">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
          <TabsTrigger value="learning-style">Learning & Personalization</TabsTrigger>
          <TabsTrigger value="difficulty">Adaptive Systems</TabsTrigger>
          <TabsTrigger value="emotional">Emotional Intelligence</TabsTrigger>
        </TabsList>
        
        {/* Learning Style & Personalization Tab */}
        <TabsContent value="learning-style" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-indigo-500" />
                  <span>Learning Style Detection</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Manual Override Toggle */}
                {renderToggleItem(
                  "Allow Manual Override",
                  learningStyleSettings.manualOverride,
                  () => toggleSetting(
                    learningStyleSettings,
                    setLearningStyleSettings,
                    ['manualOverride']
                  )
                )}
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-3">Key Learning Styles</h4>
                  
                  {renderToggleItem(
                    "Visual Learning",
                    learningStyleSettings.styles.visual,
                    () => toggleSetting(
                      learningStyleSettings,
                      setLearningStyleSettings,
                      ['styles', 'visual']
                    ),
                    () => {}
                  )}
                  
                  {renderToggleItem(
                    "Auditory Learning",
                    learningStyleSettings.styles.auditory,
                    () => toggleSetting(
                      learningStyleSettings,
                      setLearningStyleSettings,
                      ['styles', 'auditory']
                    ),
                    () => {}
                  )}
                  
                  {renderToggleItem(
                    "Reading/Writing",
                    learningStyleSettings.styles.reading,
                    () => toggleSetting(
                      learningStyleSettings,
                      setLearningStyleSettings,
                      ['styles', 'reading']
                    ),
                    () => {}
                  )}
                  
                  {renderToggleItem(
                    "Kinesthetic Learning",
                    learningStyleSettings.styles.kinesthetic,
                    () => toggleSetting(
                      learningStyleSettings,
                      setLearningStyleSettings,
                      ['styles', 'kinesthetic']
                    ),
                    () => {}
                  )}
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-3">AI Model</h4>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="gpt-4">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select AI Model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="custom">Custom Classification Model</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      disabled={testingModel}
                      onClick={() => testAIModel("Learning Style Detection")}
                    >
                      {testingModel ? "Testing..." : "Test Classification Algorithm"}
                    </Button>
                  </div>
                </div>
                
                {renderSaveResetButtons("Learning Style Detection")}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-indigo-500" />
                  <span>Concept Reinforcement Triggers</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Trigger Settings</h4>
                
                {renderToggleItem(
                  "Time-Based Triggers",
                  reinforcementSettings.triggers.timeBased,
                  () => toggleSetting(
                    reinforcementSettings,
                    setReinforcementSettings,
                    ['triggers', 'timeBased']
                  ),
                  () => {}
                )}
                
                {renderToggleItem(
                  "Quiz Performance Triggers",
                  reinforcementSettings.triggers.quizPerformance,
                  () => toggleSetting(
                    reinforcementSettings,
                    setReinforcementSettings,
                    ['triggers', 'quizPerformance']
                  ),
                  () => {}
                )}
                
                {renderToggleItem(
                  "Mistake-Based Triggers",
                  reinforcementSettings.triggers.mistakeBased,
                  () => toggleSetting(
                    reinforcementSettings,
                    setReinforcementSettings,
                    ['triggers', 'mistakeBased']
                  ),
                  () => {}
                )}
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-3">AI Model</h4>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="gpt-4">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select AI Model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="reinforcement-model">Reinforcement Learning Model</SelectItem>
                        <SelectItem value="custom">Custom Model</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      disabled={testingModel}
                      onClick={() => testAIModel("Reinforcement Algorithm")}
                    >
                      {testingModel ? "Testing..." : "Test Reinforcement Algorithm"}
                    </Button>
                  </div>
                </div>
                
                {renderSaveResetButtons("Concept Reinforcement")}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-500" />
                  <span>Goal-Based Personal Planner</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Plan Structure Controls</h4>
                
                {renderToggleItem(
                  "Adaptive Pacing",
                  plannerSettings.structure.adaptivePacing,
                  () => toggleSetting(
                    plannerSettings,
                    setPlannerSettings,
                    ['structure', 'adaptivePacing']
                  ),
                  () => {}
                )}
                
                {renderToggleItem(
                  "Milestone Creation",
                  plannerSettings.structure.milestones,
                  () => toggleSetting(
                    plannerSettings,
                    setPlannerSettings,
                    ['structure', 'milestones']
                  ),
                  () => {}
                )}
                
                {renderToggleItem(
                  "Progress Tracking",
                  plannerSettings.structure.progressTracking,
                  () => toggleSetting(
                    plannerSettings,
                    setPlannerSettings,
                    ['structure', 'progressTracking']
                  ),
                  () => {}
                )}
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-3">AI Model</h4>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="planner-model">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select AI Model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planner-model">Goal-Based Planner Model</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="custom">Custom Planning Model</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      disabled={testingModel}
                      onClick={() => testAIModel("Planner Algorithm")}
                    >
                      {testingModel ? "Testing..." : "Test Planning Algorithm"}
                    </Button>
                  </div>
                </div>
                
                {renderSaveResetButtons("Goal-Based Planning")}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Adaptive Systems Tab */}
        <TabsContent value="difficulty" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-indigo-500" />
                  <span>Daily Smart Study Plan</span>
                </div>
                <Badge className={dailyPlanSettings.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                  {dailyPlanSettings.active ? "Active" : "Inactive"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Switch 
                      checked={dailyPlanSettings.active} 
                      onCheckedChange={() => {
                        setDailyPlanSettings({
                          ...dailyPlanSettings,
                          active: !dailyPlanSettings.active
                        });
                      }}
                      id="toggle-daily-plan"
                    />
                    <Label htmlFor="toggle-daily-plan" className="ml-2">Enable Daily Smart Study Plan</Label>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-3">Plan Generation Settings</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Look-ahead Days</Label>
                      <Slider defaultValue={[7]} max={14} step={1} className="w-full" />
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">Minimum Sessions Per Day</Label>
                      <Slider defaultValue={[2]} max={6} step={1} className="w-full" />
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-3">AI Model</h4>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="gpt-4">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select AI Model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="planner-model">Daily Plan Generator</SelectItem>
                        <SelectItem value="custom">Custom Planning Model</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      disabled={testingModel}
                      onClick={() => testAIModel("Daily Plan Algorithm")}
                    >
                      {testingModel ? "Testing..." : "Test Planning Algorithm"}
                    </Button>
                  </div>
                </div>
                
                {renderSaveResetButtons("Daily Planning")}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-indigo-500" />
                  <span>Adaptive Difficulty Engine</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Difficulty Controls</h4>
                
                {renderToggleItem(
                  "Dynamic Difficulty Adjustment",
                  difficultySettings.dynamicAdjustment,
                  () => toggleSetting(
                    difficultySettings,
                    setDifficultySettings,
                    ['dynamicAdjustment']
                  ),
                  () => {}
                )}
                
                {renderToggleItem(
                  "Performance Analysis",
                  difficultySettings.performanceAnalysis,
                  () => toggleSetting(
                    difficultySettings,
                    setDifficultySettings,
                    ['performanceAnalysis']
                  ),
                  () => {}
                )}
                
                {renderToggleItem(
                  "User Feedback Integration",
                  difficultySettings.userFeedback,
                  () => toggleSetting(
                    difficultySettings,
                    setDifficultySettings,
                    ['userFeedback']
                  ),
                  () => {}
                )}
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-3">AI Model</h4>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="difficulty-model">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select AI Model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="difficulty-model">Adaptive Difficulty Model</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="custom">Custom Model</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      disabled={testingModel}
                      onClick={() => testAIModel("Difficulty Algorithm")}
                    >
                      {testingModel ? "Testing..." : "Test Difficulty Algorithm"}
                    </Button>
                  </div>
                </div>
                
                {renderSaveResetButtons("Adaptive Difficulty")}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookCheck className="h-5 w-5 text-indigo-500" />
                  <span>Smart Suggestions</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Suggestion Types</h4>
                
                {renderToggleItem(
                  "Content Suggestions",
                  suggestionSettings.types.content,
                  () => toggleSetting(
                    suggestionSettings,
                    setSuggestionSettings,
                    ['types', 'content']
                  ),
                  () => {}
                )}
                
                {renderToggleItem(
                  "Time Management Suggestions",
                  suggestionSettings.types.timeManagement,
                  () => toggleSetting(
                    suggestionSettings,
                    setSuggestionSettings,
                    ['types', 'timeManagement']
                  ),
                  () => {}
                )}
                
                {renderToggleItem(
                  "Study Break Suggestions",
                  suggestionSettings.types.studyBreaks,
                  () => toggleSetting(
                    suggestionSettings,
                    setSuggestionSettings,
                    ['types', 'studyBreaks']
                  ),
                  () => {}
                )}
                
                {renderToggleItem(
                  "Resource Recommendations",
                  suggestionSettings.types.resources,
                  () => toggleSetting(
                    suggestionSettings,
                    setSuggestionSettings,
                    ['types', 'resources']
                  ),
                  () => {}
                )}
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-3">Override Controls</h4>
                  <Button variant="outline" size="sm">
                    <ListChecks size={14} className="mr-1" />
                    Manage Override Rules
                  </Button>
                </div>
                
                {renderSaveResetButtons("Smart Suggestions")}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Emotional Intelligence Tab */}
        <TabsContent value="emotional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-indigo-500" />
                  <span>Feel-Good Corner</span>
                </div>
                <Badge className={feelGoodSettings.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                  {feelGoodSettings.active ? "Active" : "Inactive"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Switch 
                      checked={feelGoodSettings.active} 
                      onCheckedChange={() => {
                        setFeelGoodSettings({
                          ...feelGoodSettings,
                          active: !feelGoodSettings.active
                        });
                      }}
                      id="toggle-feel-good"
                    />
                    <Label htmlFor="toggle-feel-good" className="ml-2">Enable Feel-Good Corner</Label>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium">Content Controls</h4>
                  
                  {renderToggleItem(
                    "Humor (Memes, Jokes)",
                    feelGoodSettings.contentTypes.humor,
                    () => toggleSetting(
                      feelGoodSettings,
                      setFeelGoodSettings,
                      ['contentTypes', 'humor']
                    ),
                    () => {}
                  )}
                  
                  {renderToggleItem(
                    "Puzzles and Brain Teasers",
                    feelGoodSettings.contentTypes.puzzles,
                    () => toggleSetting(
                      feelGoodSettings,
                      setFeelGoodSettings,
                      ['contentTypes', 'puzzles']
                    ),
                    () => {}
                  )}
                  
                  {renderToggleItem(
                    "Motivational Content",
                    feelGoodSettings.contentTypes.motivationalContent,
                    () => toggleSetting(
                      feelGoodSettings,
                      setFeelGoodSettings,
                      ['contentTypes', 'motivationalContent']
                    ),
                    () => {}
                  )}
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-3">AI Model</h4>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="emotional-model">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select AI Model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emotional-model">Emotional Intelligence Model</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="custom">Custom Model</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      disabled={testingModel}
                      onClick={() => testAIModel("Feel-Good Algorithm")}
                    >
                      {testingModel ? "Testing..." : "Test Content Algorithm"}
                    </Button>
                  </div>
                </div>
                
                {renderSaveResetButtons("Feel-Good Corner")}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-500" />
                  <span>Surrounding Influence Meter</span>
                </div>
                <Badge className={influenceSettings.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                  {influenceSettings.active ? "Active" : "Inactive"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Switch 
                      checked={influenceSettings.active} 
                      onCheckedChange={() => {
                        setInfluenceSettings({
                          ...influenceSettings,
                          active: !influenceSettings.active
                        });
                      }}
                      id="toggle-influence"
                    />
                    <Label htmlFor="toggle-influence" className="ml-2">Enable Influence Meter</Label>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium">Tracking Types</h4>
                  
                  {renderToggleItem(
                    "Confidence Tracking",
                    influenceSettings.trackingTypes.confidence,
                    () => toggleSetting(
                      influenceSettings,
                      setInfluenceSettings,
                      ['trackingTypes', 'confidence']
                    ),
                    () => {}
                  )}
                  
                  {renderToggleItem(
                    "Peer Influence",
                    influenceSettings.trackingTypes.peerInfluence,
                    () => toggleSetting(
                      influenceSettings,
                      setInfluenceSettings,
                      ['trackingTypes', 'peerInfluence']
                    ),
                    () => {}
                  )}
                  
                  {renderToggleItem(
                    "Environmental Factors",
                    influenceSettings.trackingTypes.environment,
                    () => toggleSetting(
                      influenceSettings,
                      setInfluenceSettings,
                      ['trackingTypes', 'environment']
                    ),
                    () => {}
                  )}
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-3">AI Model</h4>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="influence-model">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select AI Model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="influence-model">Influence Analysis Model</SelectItem>
                        <SelectItem value="sentiment-model">Sentiment Analysis Model</SelectItem>
                        <SelectItem value="custom">Custom Model</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      disabled={testingModel}
                      onClick={() => testAIModel("Influence Analysis")}
                    >
                      {testingModel ? "Testing..." : "Test Analysis Algorithm"}
                    </Button>
                  </div>
                </div>
                
                {renderSaveResetButtons("Surrounding Influence")}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Github className="h-5 w-5 text-indigo-500" />
                  <span>Additional AI Personalization Features</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Peer Community Feed Tuner */}
                <div className="border-b pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={otherFeatureSettings.peerCommunity} 
                        onCheckedChange={() => {
                          setOtherFeatureSettings({
                            ...otherFeatureSettings,
                            peerCommunity: !otherFeatureSettings.peerCommunity
                          });
                        }}
                        id="toggle-peer-community"
                      />
                      <div>
                        <Label htmlFor="toggle-peer-community" className="font-medium">Peer Community Feed Tuner</Label>
                        <p className="text-xs text-gray-500 ml-1">Control social and peer content recommendations</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Peer Feed Settings
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
                
                {/* Learning Pulse Generator */}
                <div className="border-b pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={otherFeatureSettings.learningPulse} 
                        onCheckedChange={() => {
                          setOtherFeatureSettings({
                            ...otherFeatureSettings,
                            learningPulse: !otherFeatureSettings.learningPulse
                          });
                        }}
                        id="toggle-learning-pulse"
                      />
                      <div>
                        <Label htmlFor="toggle-learning-pulse" className="font-medium">Learning Pulse Generator</Label>
                        <p className="text-xs text-gray-500 ml-1">30-second mood and readiness summaries</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Pulse Settings
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
                
                {/* Doubt Auto-Responder */}
                <div className="border-b pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={otherFeatureSettings.doubtResponder} 
                        onCheckedChange={() => {
                          setOtherFeatureSettings({
                            ...otherFeatureSettings,
                            doubtResponder: !otherFeatureSettings.doubtResponder
                          });
                        }}
                        id="toggle-doubt-responder"
                      />
                      <div>
                        <Label htmlFor="toggle-doubt-responder" className="font-medium">Doubt Auto-Responder</Label>
                        <p className="text-xs text-gray-500 ml-1">AI answers to student doubts from knowledge base</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Auto-Responder Settings
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
                
                {/* 24x7 Tutor Chat */}
                <div className="border-b pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={otherFeatureSettings.tutorChat} 
                        onCheckedChange={() => {
                          setOtherFeatureSettings({
                            ...otherFeatureSettings,
                            tutorChat: !otherFeatureSettings.tutorChat
                          });
                        }}
                        id="toggle-tutor-chat"
                      />
                      <div>
                        <Label htmlFor="toggle-tutor-chat" className="font-medium">24x7 Tutor Chat</Label>
                        <p className="text-xs text-gray-500 ml-1">Conversational AI tutor capabilities</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Tutor Chat Settings
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
                
                {/* Mood-Based Suggestions */}
                <div className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={otherFeatureSettings.moodSuggestions} 
                        onCheckedChange={() => {
                          setOtherFeatureSettings({
                            ...otherFeatureSettings,
                            moodSuggestions: !otherFeatureSettings.moodSuggestions
                          });
                        }}
                        id="toggle-mood-suggestions"
                      />
                      <div>
                        <Label htmlFor="toggle-mood-suggestions" className="font-medium">Mood-Based Suggestions</Label>
                        <p className="text-xs text-gray-500 ml-1">Content recommendations based on emotional state</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Mood Engine Settings
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {renderSaveResetButtons("Additional Features")}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIPersonalizationTab;

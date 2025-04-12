
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Brain,
  Settings,
  Save,
  RotateCcw,
  Zap,
  AlertCircle,
  BookOpen,
  Clock,
  Target,
  Calendar,
  Lightbulb,
  Sparkles
} from "lucide-react";

const AIPersonalizationTab = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState("learning");
  
  // Learning style detection switches
  const [manualOverride, setManualOverride] = useState(false);
  const [visualEnabled, setVisualEnabled] = useState(true);
  const [auditoryEnabled, setAuditoryEnabled] = useState(true);
  const [readingEnabled, setReadingEnabled] = useState(true);
  const [kinestheticEnabled, setKinestheticEnabled] = useState(true);

  // Reinforcement triggers
  const [timeBasedEnabled, setTimeBasedEnabled] = useState(true);
  const [quizPerformanceEnabled, setQuizPerformanceEnabled] = useState(true);
  const [mistakeBasedEnabled, setMistakeBasedEnabled] = useState(true);

  // Goal-based planner
  const [dailyGoalsEnabled, setDailyGoalsEnabled] = useState(true);
  const [weeklyMilestonesEnabled, setWeeklyMilestonesEnabled] = useState(true);
  const [adaptivePathEnabled, setAdaptivePathEnabled] = useState(true);

  // Smart suggestions
  const [conceptSuggEnabled, setSuggConceptEnabled] = useState(true);
  const [resourceSuggEnabled, setSuggResourceEnabled] = useState(true);
  const [practiceSuggEnabled, setSuggPracticeEnabled] = useState(true);
  const [breakSuggEnabled, setSuggBreakEnabled] = useState(true);

  // Difficulty engine
  const [progressiveEnabled, setProgressiveEnabled] = useState(true);
  const [topicMappingEnabled, setTopicMappingEnabled] = useState(true);
  const [performanceBasedEnabled, setPerformanceBasedEnabled] = useState(true);

  const handleConfigureOption = (option) => {
    toast({
      title: `Configure ${option}`,
      description: `Opening configuration panel for ${option}`,
      variant: "default"
    });
  };

  const handleTestAlgorithm = (algorithmName) => {
    toast({
      title: "Testing Algorithm",
      description: `Connecting to Flask environment to test ${algorithmName}...`,
      variant: "default"
    });
    
    // Simulate testing process
    setTimeout(() => {
      toast({
        title: "Testing Complete",
        description: `${algorithmName} algorithm tested successfully`,
        variant: "default"
      });
    }, 2000);
  };

  const handleSaveSettings = (section) => {
    toast({
      title: "Saving Settings",
      description: `Saving ${section} settings...`,
      variant: "default"
    });
    
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: `${section} settings have been saved successfully`,
        variant: "default"
      });
    }, 1000);
  };

  const handleResetDefaults = (section) => {
    toast({
      title: "Reset to Defaults",
      description: `Resetting ${section} to default settings...`,
      variant: "default"
    });
    
    setTimeout(() => {
      toast({
        title: "Reset Complete",
        description: `${section} has been reset to default settings`,
        variant: "default"
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="learning" value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="learning" className="text-sm">Learning Style</TabsTrigger>
          <TabsTrigger value="reinforcement" className="text-sm">Reinforcement</TabsTrigger>
          <TabsTrigger value="planner" className="text-sm">Goal Planner</TabsTrigger>
          <TabsTrigger value="difficulty" className="text-sm">Difficulty Engine</TabsTrigger>
          <TabsTrigger value="suggestions" className="text-sm">Smart Suggestions</TabsTrigger>
        </TabsList>
        
        {/* Learning Style Detection Tab */}
        <TabsContent value="learning">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">Learning Style Detection</CardTitle>
              <Brain className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="space-y-0.5">
                  <Label className="text-base">Allow Manual Override</Label>
                  <p className="text-sm text-muted-foreground">
                    Enables students to manually select their preferred learning style
                  </p>
                </div>
                <Switch 
                  checked={manualOverride} 
                  onCheckedChange={setManualOverride}
                />
              </div>
              
              <div className="space-y-3 mt-2">
                <h3 className="font-medium">Key Learning Styles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <p className="font-medium">Visual Learning</p>
                      <p className="text-sm text-muted-foreground">Images, diagrams, videos</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={visualEnabled} 
                        onCheckedChange={setVisualEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Visual Learning")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <p className="font-medium">Auditory Learning</p>
                      <p className="text-sm text-muted-foreground">Spoken explanations, discussions</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={auditoryEnabled} 
                        onCheckedChange={setAuditoryEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Auditory Learning")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <p className="font-medium">Reading/Writing</p>
                      <p className="text-sm text-muted-foreground">Text-based materials</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={readingEnabled} 
                        onCheckedChange={setReadingEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Reading/Writing Learning")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <p className="font-medium">Kinesthetic</p>
                      <p className="text-sm text-muted-foreground">Hands-on activities</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={kinestheticEnabled} 
                        onCheckedChange={setKinestheticEnabled} 
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Kinesthetic Learning")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t mt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => handleTestAlgorithm("Learning Style Classification")}
                >
                  <Zap size={16} className="mr-2" /> Test Classification Algorithm
                </Button>
                <div className="flex items-center gap-2 mt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => handleSaveSettings("Learning Style Detection")}
                  >
                    <Save size={16} className="mr-2" /> Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleResetDefaults("Learning Style Detection")}
                  >
                    <RotateCcw size={16} className="mr-2" /> Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Concept Reinforcement Triggers Tab */}
        <TabsContent value="reinforcement">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">Concept Reinforcement Triggers</CardTitle>
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium">Trigger Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-muted-foreground" />
                        <p className="font-medium">Time-Based Triggers</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Spaced repetition over time</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={timeBasedEnabled} 
                        onCheckedChange={setTimeBasedEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Time-Based Triggers")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <Target size={16} className="text-muted-foreground" />
                        <p className="font-medium">Quiz Performance Triggers</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Based on test results</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={quizPerformanceEnabled} 
                        onCheckedChange={setQuizPerformanceEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Quiz Performance Triggers")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-muted-foreground" />
                        <p className="font-medium">Mistake-Based Triggers</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Triggered by common errors</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={mistakeBasedEnabled} 
                        onCheckedChange={setMistakeBasedEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Mistake-Based Triggers")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t mt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => handleTestAlgorithm("Reinforcement Algorithm")}
                >
                  <Zap size={16} className="mr-2" /> Test Reinforcement Algorithm
                </Button>
                <div className="flex items-center gap-2 mt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => handleSaveSettings("Reinforcement Triggers")}
                  >
                    <Save size={16} className="mr-2" /> Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleResetDefaults("Reinforcement Triggers")}
                  >
                    <RotateCcw size={16} className="mr-2" /> Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Goal-Based Personal Planner Tab */}
        <TabsContent value="planner">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">Goal-Based Personal Planner</CardTitle>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1 pb-2">
                <p className="text-sm text-muted-foreground">
                  Customizes study plans based on individual exam goals and learning pace
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium">Plan Structure Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <Target size={16} className="text-muted-foreground" />
                        <p className="font-medium">Daily Goals</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Short-term achievement targets</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={dailyGoalsEnabled} 
                        onCheckedChange={setDailyGoalsEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Daily Goals")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-muted-foreground" />
                        <p className="font-medium">Weekly Milestones</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Progress checkpoints</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={weeklyMilestonesEnabled} 
                        onCheckedChange={setWeeklyMilestonesEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Weekly Milestones")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-muted-foreground" />
                        <p className="font-medium">Adaptive Path</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Adjusts based on performance</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={adaptivePathEnabled} 
                        onCheckedChange={setAdaptivePathEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Adaptive Path")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t mt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => handleTestAlgorithm("Goal-Based Planner")}
                >
                  <Zap size={16} className="mr-2" /> Test Planner Algorithm
                </Button>
                <div className="flex items-center gap-2 mt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => handleSaveSettings("Goal-Based Planner")}
                  >
                    <Save size={16} className="mr-2" /> Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleResetDefaults("Goal-Based Planner")}
                  >
                    <RotateCcw size={16} className="mr-2" /> Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">Daily Smart Study Plan</CardTitle>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1 pb-2">
                <p className="text-sm text-muted-foreground">
                  AI-powered daily schedule generation based on student availability and optimal learning times
                </p>
              </div>
              
              <div className="pt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => handleTestAlgorithm("Daily Smart Study Plan")}
                >
                  <Zap size={16} className="mr-2" /> Test Planning Algorithm
                </Button>
                <div className="flex items-center gap-2 mt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => handleSaveSettings("Daily Smart Study Plan")}
                  >
                    <Save size={16} className="mr-2" /> Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleResetDefaults("Daily Smart Study Plan")}
                  >
                    <RotateCcw size={16} className="mr-2" /> Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Adaptive Difficulty Engine Tab */}
        <TabsContent value="difficulty">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">Adaptive Difficulty Engine</CardTitle>
              <Target className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium">Difficulty Adaptation Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <p className="font-medium">Progressive Difficulty</p>
                      <p className="text-sm text-muted-foreground">Gradually increases challenge</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={progressiveEnabled} 
                        onCheckedChange={setProgressiveEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Progressive Difficulty")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <p className="font-medium">Topic-Based Mapping</p>
                      <p className="text-sm text-muted-foreground">Adapts by subject complexity</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={topicMappingEnabled} 
                        onCheckedChange={setTopicMappingEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Topic-Based Mapping")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <p className="font-medium">Performance-Based</p>
                      <p className="text-sm text-muted-foreground">Adjusts to user's skill level</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={performanceBasedEnabled} 
                        onCheckedChange={setPerformanceBasedEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Performance-Based Difficulty")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t mt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => handleTestAlgorithm("Difficulty Engine")}
                >
                  <Zap size={16} className="mr-2" /> Test Difficulty Algorithm
                </Button>
                <div className="flex items-center gap-2 mt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => handleSaveSettings("Difficulty Engine")}
                  >
                    <Save size={16} className="mr-2" /> Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleResetDefaults("Difficulty Engine")}
                  >
                    <RotateCcw size={16} className="mr-2" /> Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Smart Suggestions Tab */}
        <TabsContent value="suggestions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">Smart Suggestions</CardTitle>
              <Lightbulb className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium">Suggestion Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-muted-foreground" />
                        <p className="font-medium">Concept Suggestions</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Related topics to explore</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={conceptSuggEnabled} 
                        onCheckedChange={setSuggConceptEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Concept Suggestions")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-muted-foreground" />
                        <p className="font-medium">Resource Suggestions</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Helpful learning materials</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={resourceSuggEnabled} 
                        onCheckedChange={setSuggResourceEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Resource Suggestions")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <Target size={16} className="text-muted-foreground" />
                        <p className="font-medium">Practice Suggestions</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Personalized practice exercises</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={practiceSuggEnabled} 
                        onCheckedChange={setSuggPracticeEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Practice Suggestions")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-muted-foreground" />
                        <p className="font-medium">Break Suggestions</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Optimal rest timing</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={breakSuggEnabled} 
                        onCheckedChange={setSuggBreakEnabled}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureOption("Break Suggestions")}
                      >
                        <Settings size={14} className="mr-1" /> Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Override Controls</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConfigureOption("Override Rules")}
                  >
                    <Settings size={14} className="mr-1" /> Manage Override Rules
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t mt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => handleTestAlgorithm("Smart Suggestions")}
                >
                  <Zap size={16} className="mr-2" /> Test Suggestions Algorithm
                </Button>
                <div className="flex items-center gap-2 mt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => handleSaveSettings("Smart Suggestions")}
                  >
                    <Save size={16} className="mr-2" /> Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleResetDefaults("Smart Suggestions")}
                  >
                    <RotateCcw size={16} className="mr-2" /> Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* AI Model Integration Panel */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-lg font-medium">AI Model Integration</CardTitle>
          <Sparkles className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect AI models from your Flask environment to power personalization features
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                <Brain size={24} />
                <p>Connect Learning Style Model</p>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                <Target size={24} />
                <p>Connect Difficulty Model</p>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                <Lightbulb size={24} />
                <p>Connect Suggestions Model</p>
              </Button>
            </div>
            
            <div className="pt-4 border-t mt-4">
              <Button onClick={() => handleSaveSettings("All AI Personalization Settings")}>
                <Save size={16} className="mr-2" /> Save All Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPersonalizationTab;

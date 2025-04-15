
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { RocketIcon, BrainCircuit, Wand2, Settings2, RotateCcw } from "lucide-react";

interface TabContentPromptsProps {
  handleEditPrompt: (promptType: string) => void;
  handleManageAllPrompts: () => void;
  handleTestContentGeneration: () => void;
  handleSaveSettings: () => void;
  handleResetSettings: () => void;
}

const TabContentPrompts = ({
  handleEditPrompt,
  handleManageAllPrompts,
  handleTestContentGeneration,
  handleSaveSettings,
  handleResetSettings
}: TabContentPromptsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30"
          onClick={handleTestContentGeneration}
        >
          <RocketIcon size={16} className="text-purple-600 dark:text-purple-400" />
          <span>Test Content Generation</span>
        </Button>
        <Button
          variant="outline"
          onClick={handleManageAllPrompts}
        >
          <span>Manage All Prompts</span>
        </Button>
      </div>
      
      <Tabs defaultValue="concept">
        <TabsList>
          <TabsTrigger value="concept">Concept Card</TabsTrigger>
          <TabsTrigger value="flashcard">Flashcard</TabsTrigger>
          <TabsTrigger value="quiz">Quiz Generation</TabsTrigger>
          <TabsTrigger value="settings">AI Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="concept">
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <Label htmlFor="concept-prompt">Concept Card Generation Prompt</Label>
                    <Textarea 
                      id="concept-prompt"
                      className="h-40"
                      placeholder="Enter the prompt template for generating concept cards..."
                      defaultValue="Create a structured concept card on {{topic}} for {{examName}} preparation level. Include: 1) Core concept definition, 2) Key formulas, 3) Step-by-step explanation with visual cues, 4) Common misconceptions, 5) Example problem with solution, 6) Related concepts."
                    />
                  </div>
                  <div>
                    <Label htmlFor="concept-system">System Instruction</Label>
                    <Textarea 
                      id="concept-system"
                      className="h-20"
                      placeholder="Enter system instructions for the AI model..."
                      defaultValue="You are an expert educational content creator specializing in creating clear, concise concept cards that help students understand complex topics quickly."
                    />
                  </div>
                  <Button
                    onClick={() => handleEditPrompt("concept")}
                    className="w-full"
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    Edit Concept Card Prompt
                  </Button>
                </div>
                
                <div className="md:col-span-4">
                  <div className="bg-muted p-4 rounded-lg h-full space-y-4">
                    <h4 className="font-medium flex items-center">
                      <BrainCircuit className="mr-2 h-5 w-5 text-primary" />
                      Settings
                    </h4>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="temperature">Temperature</Label>
                          <span className="text-sm text-muted-foreground">0.7</span>
                        </div>
                        <Slider defaultValue={[0.7]} max={1} step={0.1} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="add-examples">Include Examples</Label>
                        <Switch id="add-examples" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="visual-aids">Generate Visual Aids</Label>
                        <Switch id="visual-aids" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="multi-difficulty">Multi-Difficulty Versions</Label>
                        <Switch id="multi-difficulty" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="flashcard">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="flashcard-prompt">Flashcard Generation Prompt</Label>
                  <Textarea 
                    id="flashcard-prompt"
                    className="h-40"
                    placeholder="Enter the prompt template for generating flashcards..."
                    defaultValue="Create a set of 10 flashcards for {{topic}} for {{examName}} preparation. Each flashcard should have a clear question on one side and a concise answer on the other. Focus on key definitions, formulas, and concepts that are commonly tested."
                  />
                </div>
                <Button
                  onClick={() => handleEditPrompt("flashcard")}
                >
                  Edit Flashcard Prompt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quiz">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quiz-prompt">Quiz Generation Prompt</Label>
                  <Textarea 
                    id="quiz-prompt"
                    className="h-40"
                    placeholder="Enter the prompt template for generating quizzes..."
                    defaultValue="Create a set of 5 multiple-choice questions on {{topic}} suitable for {{examName}}. Each question should have 4 options with one correct answer. Include a mix of conceptual questions, calculation problems, and application scenarios at {{difficultyLevel}} difficulty."
                  />
                </div>
                <Button
                  onClick={() => handleEditPrompt("quiz")}
                >
                  Edit Quiz Generation Prompt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center">
                    <Settings2 className="mr-2 h-5 w-5 text-primary" />
                    Global AI Settings
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-generate">Auto-Generate on Upload</Label>
                      <Switch id="auto-generate" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="multi-modal">Multi-Modal Content</Label>
                      <Switch id="multi-modal" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="quality-check">AI Quality Check</Label>
                      <Switch id="quality-check" defaultChecked />
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <Label htmlFor="model-version">Model Version</Label>
                        <span className="text-sm text-muted-foreground">GPT-4 Turbo</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Safety & Review</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content-review">Require Review</Label>
                      <Switch id="content-review" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="safety-filter">Content Safety Filter</Label>
                      <Switch id="safety-filter" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="fact-check">Fact Check</Label>
                      <Switch id="fact-check" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="safety-level">Safety Level</Label>
                        <span className="text-sm text-muted-foreground">Medium</span>
                      </div>
                      <Slider defaultValue={[0.5]} max={1} step={0.25} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleResetSettings}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset to Defaults
                </Button>
                
                <Button
                  onClick={handleSaveSettings}
                >
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabContentPrompts;

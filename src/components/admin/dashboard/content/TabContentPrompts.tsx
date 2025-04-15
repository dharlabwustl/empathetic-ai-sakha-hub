
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Pencil,
  Save,
  Zap,
  Code,
  Book,
  BookOpen,
  LineChart,
  Wand2,
  Clipboard,
  RefreshCcw,
  Settings,
} from "lucide-react";

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
  handleResetSettings,
}: TabContentPromptsProps) => {
  const promptTypes = [
    {
      type: "conceptCard",
      name: "Concept Card Generator",
      description: "Creates structured concept cards with key points and examples",
      icon: <BookOpen className="h-6 w-6 text-purple-500" />,
      prompt: "Generate a structured concept card for [concept] in [subject] at [difficulty_level] level with key points, examples, and common mistakes...",
      lastUpdated: "2025-04-10",
    },
    {
      type: "flashcard",
      name: "Flashcard Generator",
      description: "Creates question-answer pairs for spaced repetition",
      icon: <Book className="h-6 w-6 text-blue-500" />,
      prompt: "Create a set of flashcards for [topic] in [subject] at [difficulty_level] with questions on one side and concise answers on the other...",
      lastUpdated: "2025-04-05",
    },
    {
      type: "practiceExam",
      name: "Practice Exam Generator",
      description: "Creates full practice tests with varied question types",
      icon: <Clipboard className="h-6 w-6 text-green-500" />,
      prompt: "Generate a [duration] minute practice exam for [exam_name] with [num_questions] questions covering [topics] at [difficulty_level]...",
      lastUpdated: "2025-04-12",
    },
    {
      type: "studyPlan",
      name: "Study Plan Generator",
      description: "Creates personalized study schedules and plans",
      icon: <LineChart className="h-6 w-6 text-orange-500" />,
      prompt: "Create a personalized study plan for [exam_name] exam preparation with [time_available] time available daily, focusing on [weak_topics]...",
      lastUpdated: "2025-04-08",
    },
    {
      type: "contentAnalyzer",
      name: "Content Analyzer",
      description: "Analyzes and rates content difficulty and relevance",
      icon: <Code className="h-6 w-6 text-indigo-500" />,
      prompt: "Analyze this [content_type] for [exam_name] preparation and provide a difficulty rating, relevance score, and improvement suggestions...",
      lastUpdated: "2025-04-14",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">GPT Prompt Tuner</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleManageAllPrompts}
          >
            <Settings size={16} />
            <span>Manage All Prompts</span>
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center gap-2"
            onClick={handleTestContentGeneration}
          >
            <Zap size={16} />
            <span>Test Generation</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {promptTypes.map((prompt) => (
          <Card key={prompt.type} className="overflow-hidden">
            <CardHeader className="bg-gray-50 dark:bg-gray-800/50 flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                {prompt.icon}
                <CardTitle className="text-lg">{prompt.name}</CardTitle>
              </div>
              <Badge variant="outline">Last updated: {prompt.lastUpdated}</Badge>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {prompt.description}
              </p>
              <div className="mb-4">
                <Label className="text-xs text-gray-500 mb-1 block">
                  Prompt Template
                </Label>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded border text-xs font-mono h-20 overflow-auto">
                  {prompt.prompt}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => navigator.clipboard.writeText(prompt.prompt)}
                >
                  <Clipboard className="h-3 w-3 mr-1" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleEditPrompt(prompt.type)}
                >
                  <Pencil className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs"
                  onClick={() => handleTestContentGeneration()}
                >
                  <Wand2 className="h-3 w-3 mr-1" />
                  Test
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            GPT Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div>
            <Label className="mb-2 block">Global Configuration</Label>
            <Textarea
              placeholder="Enter global configuration for all prompts..."
              className="min-h-32"
              defaultValue={
                "You are an educational content creator AI for Sakha. Create content that is accurate, educational, and aligned with the exam syllabus. Content should be engaging and tailored to the student's level. Use simple language for beginners and more technical language for advanced users."
              }
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleResetSettings}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button onClick={handleSaveSettings}>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TabContentPrompts;

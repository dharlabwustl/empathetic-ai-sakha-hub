
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Brain, Settings, Zap, ChevronRight, BarChart2 } from "lucide-react";

const AIPersonalizationTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Personalization Engine Controls</h2>
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
          <div className="flex items-center gap-1">
            <Zap size={12} className="animate-pulse" />
            <span>Engine Active</span>
          </div>
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Learning Style Detection */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Student Learning Style Detection</span>
              <Switch checked={true} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="font-medium">AI Model:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">LLM (GPT) + classifier</span>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Analyzes onboarding questions to determine optimal learning style preferences.
              </p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Settings size={14} />
                  <span>Edit Tags</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <BarChart2 size={14} />
                  <span>View Data</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Concept Reinforcement */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Concept Reinforcement Triggers</span>
              <Switch checked={true} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="font-medium">AI Model:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">GPT + performance model</span>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Suggests review cycles and timings based on forgetting curves and performance.
              </p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Settings size={14} />
                  <span>Tune Thresholds</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <BarChart2 size={14} />
                  <span>View Insights</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goal-Based Planner */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Goal-Based Personal Planner</span>
              <Switch checked={true} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="font-medium">AI Model:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">LLM + planning logic</span>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Creates full exam study plan based on goal, available time, and current level.
              </p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Settings size={14} />
                  <span>Adjust Structure</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <BarChart2 size={14} />
                  <span>Plan Stats</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart Study Plan */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Daily Smart Study Plan</span>
              <Switch checked={true} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="font-medium">AI Model:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">GPT + adaptive logic</span>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generates cards/exams per subject & topic based on student progress.
              </p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Settings size={14} />
                  <span>View Logs</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <BarChart2 size={14} />
                  <span>Plan Stats</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Personalization Engine Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">Flask API Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md border">
                  <div>
                    <p className="font-medium">Study Planner Engine</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">URL: /api/planner/generate</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md border">
                  <div>
                    <p className="font-medium">Suggestion Engine</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">URL: /api/suggestions</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md border">
                  <div>
                    <p className="font-medium">Emotional Model Settings</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">URL: /api/emotion/config</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md border">
                  <div>
                    <p className="font-medium">Pulse Summary</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">URL: /api/pulse/summary</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-base font-medium">AI Model Status</span>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">All Systems Operational</Badge>
            </div>

            <div className="flex justify-end">
              <Button className="flex items-center gap-1">
                <Brain size={16} />
                <span>Advanced AI Settings</span>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPersonalizationTab;


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Mic, 
  Volume2, 
  Bot, 
  MessageSquare,
  TrendingUp,
  Clock,
  Users,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VoiceAssistantTab = () => {
  const { toast } = useToast();

  const voiceMetrics = [
    { metric: "Daily Voice Interactions", value: 3456, change: "+18%" },
    { metric: "Avg Session Duration", value: "4.2 min", change: "+12%" },
    { metric: "Voice Recognition Accuracy", value: "96.8%", change: "+2.1%" },
    { metric: "User Satisfaction", value: "92.4%", change: "+5.3%" }
  ];

  const voiceFeatures = [
    { 
      feature: "Study Navigation", 
      enabled: true, 
      usage: 2341, 
      description: "Voice commands to navigate between concepts, flashcards, and exams" 
    },
    { 
      feature: "Question Answering", 
      enabled: true, 
      usage: 1876, 
      description: "Ask questions about any concept and get instant voice responses" 
    },
    { 
      feature: "Study Plan Updates", 
      enabled: true, 
      usage: 567, 
      description: "Modify study plans and schedules using voice commands" 
    },
    { 
      feature: "Mood Check-ins", 
      enabled: true, 
      usage: 1234, 
      description: "Daily mood logging through natural voice conversations" 
    },
    { 
      feature: "Progress Reports", 
      enabled: true, 
      usage: 890, 
      description: "Get verbal progress updates and performance summaries" 
    },
    { 
      feature: "Break Reminders", 
      enabled: true, 
      usage: 3456, 
      description: "Smart voice reminders for breaks and wellness checks" 
    }
  ];

  const commonCommands = [
    { command: "Show me Physics concepts", usage: 1234, category: "Navigation" },
    { command: "Explain thermodynamics", usage: 987, category: "Learning" },
    { command: "How is my progress?", usage: 567, category: "Progress" },
    { command: "I'm feeling stressed", usage: 890, category: "Mood" },
    { command: "Take a practice exam", usage: 432, category: "Assessment" },
    { command: "Review my flashcards", usage: 654, category: "Revision" }
  ];

  const voiceAnalytics = [
    { metric: "Peak Usage Hours", value: "7-9 PM", impact: "42% of daily interactions" },
    { metric: "Most Used Feature", value: "Question Answering", impact: "38% of all commands" },
    { metric: "Avg Query Length", value: "8.3 words", impact: "Natural conversation style" },
    { metric: "Voice vs Text Preference", value: "65% voice", impact: "Strong voice adoption" }
  ];

  const handleToggleFeature = (featureName: string) => {
    toast({
      title: "Voice Feature Updated",
      description: `${featureName} configuration updated`,
      variant: "default"
    });
  };

  const handleOptimizeVoice = () => {
    toast({
      title: "Optimizing Voice AI",
      description: "Running voice recognition optimization...",
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Intelligent Voice Assistant Management</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Monitor and configure the 24/7 AI voice assistant helping students navigate and learn
          </p>
        </div>
        <Button 
          onClick={handleOptimizeVoice}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
        >
          <Mic className="h-4 w-4 mr-2" />
          Optimize Voice AI
        </Button>
      </div>

      {/* Voice Assistant Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {voiceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Mic className="h-5 w-5 text-muted-foreground" />
                <Badge variant="outline" className="text-green-600">
                  {metric.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">{metric.value}</div>
              <p className="text-sm text-muted-foreground">{metric.metric}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Voice Features Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Voice Features Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {voiceFeatures.map((feature, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{feature.feature}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {feature.usage.toLocaleString()} uses
                    </Badge>
                    <Switch 
                      checked={feature.enabled} 
                      onCheckedChange={() => handleToggleFeature(feature.feature)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Voice Commands */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-green-600" />
            Most Popular Voice Commands
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {commonCommands.map((command, index) => (
              <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-green-900 dark:text-green-100">"{command.command}"</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Category: {command.category}</div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {command.usage.toLocaleString()} uses
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Voice Analytics Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Voice Usage Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {voiceAnalytics.map((analytic, index) => (
              <div key={index} className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100">{analytic.metric}</h4>
                  <Badge variant="outline" className="bg-purple-100 text-purple-800">
                    Insight
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Value:</span>
                    <div className="font-semibold text-purple-600">{analytic.value}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Impact:</span>
                    <div className="font-semibold text-green-600">{analytic.impact}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Voice Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Real-time Voice Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Active Voice Sessions</div>
                  <div className="text-2xl font-bold text-blue-600">187</div>
                </div>
                <Mic className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Commands Processed</div>
                  <div className="text-2xl font-bold text-green-600">1,423</div>
                </div>
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Avg Response Time</div>
                  <div className="text-2xl font-bold text-purple-600">1.3s</div>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voice Assistant Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">96.8%</div>
                  <div className="text-sm text-muted-foreground">Recognition Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1.3s</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">92.4%</div>
                  <div className="text-sm text-muted-foreground">User Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">89.1%</div>
                  <div className="text-sm text-muted-foreground">Task Completion</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceAssistantTab;

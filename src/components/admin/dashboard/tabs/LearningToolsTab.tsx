
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Lightbulb,
  TrendingUp,
  Users,
  Clock,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LearningToolsTab = () => {
  const { toast } = useToast();

  const learningTools = [
    { name: "Concept Cards", totalCreated: 15234, activeUsers: 2341, avgRating: 4.8, icon: BookOpen },
    { name: "Interactive Flashcards", totalCreated: 8967, activeUsers: 1876, avgRating: 4.6, icon: Brain },
    { name: "Practice Exams", totalCreated: 1234, activeUsers: 987, avgRating: 4.9, icon: FileText },
    { name: "Formula Practice", totalCreated: 3456, activeUsers: 1234, avgRating: 4.7, icon: Lightbulb }
  ];

  const contentGenerationStats = [
    { type: "Text Explanations", generated: 12456, approved: 11234, pending: 1222 },
    { type: "Visual Diagrams", generated: 3456, approved: 3201, pending: 255 },
    { type: "3D Models", generated: 567, approved: 523, pending: 44 },
    { type: "Interactive Videos", generated: 234, approved: 198, pending: 36 }
  ];

  const handleGenerateContent = (contentType: string) => {
    toast({
      title: "Content Generation",
      description: `Generating new ${contentType}...`,
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Learning Tools Management</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage and monitor AI-generated learning content and tools
          </p>
        </div>
        <Button 
          onClick={() => handleGenerateContent("content")}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Brain className="h-4 w-4 mr-2" />
          Generate Content
        </Button>
      </div>

      {/* Learning Tools Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {learningTools.map((tool, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <tool.icon className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-sm font-semibold">{tool.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Created:</span>
                  <span className="font-semibold">{tool.totalCreated.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Users:</span>
                  <span className="font-semibold text-green-600">{tool.activeUsers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg Rating:</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                    ⭐ {tool.avgRating}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Generation Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle>AI Content Generation Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contentGenerationStats.map((stat, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{stat.type}</span>
                  <div className="flex space-x-2">
                    <Badge variant="outline">{stat.generated} total</Badge>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      {stat.approved} approved
                    </Badge>
                    <Badge variant="secondary">{stat.pending} pending</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{stat.generated}</div>
                    <div className="text-muted-foreground">Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{stat.approved}</div>
                    <div className="text-muted-foreground">Approved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{stat.pending}</div>
                    <div className="text-muted-foreground">Pending Review</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Usage Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Concept Cards Viewed</div>
                  <div className="text-2xl font-bold text-blue-600">4,567</div>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Flashcards Completed</div>
                  <div className="text-2xl font-bold text-green-600">2,341</div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Exams Taken</div>
                  <div className="text-2xl font-bold text-purple-600">189</div>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Quality Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">94.2%</div>
                  <div className="text-sm text-muted-foreground">Content Approval Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4.7</div>
                  <div className="text-sm text-muted-foreground">Avg User Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">87%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">12min</div>
                  <div className="text-sm text-muted-foreground">Avg Engagement Time</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearningToolsTab;

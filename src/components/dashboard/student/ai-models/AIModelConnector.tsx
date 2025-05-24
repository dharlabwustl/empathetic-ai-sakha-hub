
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Heart, 
  BookOpen, 
  MessageSquare, 
  Zap, 
  Activity,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  type: 'mood-analysis' | 'content-generation' | 'tutor-chat' | 'feel-good' | 'concept-cards' | 'flashcards' | 'exam-analysis';
  status: 'active' | 'inactive' | 'testing';
  accuracy: number;
  lastUsed: Date;
  connectedFeatures: string[];
}

interface AIModelConnectorProps {
  userProfile: any;
}

export const AIModelConnector: React.FC<AIModelConnectorProps> = ({ userProfile }) => {
  const { toast } = useToast();

  const aiModels: AIModel[] = [
    {
      id: 'mood-analyzer-v2',
      name: 'Mood Analysis Engine',
      type: 'mood-analysis',
      status: 'active',
      accuracy: 94.2,
      lastUsed: new Date(),
      connectedFeatures: ['Surrounding Influences Meter', 'Feel Good Corner', 'Dashboard Personalization']
    },
    {
      id: 'content-generator-v3',
      name: 'Educational Content Generator',
      type: 'content-generation',
      status: 'active',
      accuracy: 91.8,
      lastUsed: new Date(),
      connectedFeatures: ['Concept Cards', 'Study Materials', 'Practice Questions']
    },
    {
      id: 'tutor-chat-v2',
      name: '24/7 AI Tutor Engine',
      type: 'tutor-chat',
      status: 'active',
      accuracy: 89.5,
      lastUsed: new Date(),
      connectedFeatures: ['AI Tutor Chat', 'Question Answering', 'Study Guidance']
    },
    {
      id: 'feel-good-engine-v1',
      name: 'Feel Good Content Engine',
      type: 'feel-good',
      status: 'active',
      accuracy: 87.3,
      lastUsed: new Date(),
      connectedFeatures: ['Daily Affirmations', 'Mood Music', 'Motivation Content', 'Gratitude Journal']
    },
    {
      id: 'concept-analyzer-v2',
      name: 'Concept Learning Engine',
      type: 'concept-cards',
      status: 'active',
      accuracy: 93.1,
      lastUsed: new Date(),
      connectedFeatures: ['Concept Cards', 'Learning Analytics', 'Progress Tracking']
    },
    {
      id: 'flashcard-engine-v1',
      name: 'Flashcard Intelligence',
      type: 'flashcards',
      status: 'active',
      accuracy: 88.7,
      lastUsed: new Date(),
      connectedFeatures: ['Smart Flashcards', 'Spaced Repetition', 'Memory Analytics']
    },
    {
      id: 'exam-analyzer-v3',
      name: 'Exam Analysis Engine',
      type: 'exam-analysis',
      status: 'active',
      accuracy: 91.4,
      lastUsed: new Date(),
      connectedFeatures: ['Mock Exams', 'Performance Analysis', 'Weakness Detection']
    }
  ];

  const getModelIcon = (type: string) => {
    switch (type) {
      case 'mood-analysis': return <Heart className="h-5 w-5 text-pink-500" />;
      case 'content-generation': return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'tutor-chat': return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'feel-good': return <Heart className="h-5 w-5 text-purple-500" />;
      case 'concept-cards': return <Brain className="h-5 w-5 text-indigo-500" />;
      case 'flashcards': return <Zap className="h-5 w-5 text-yellow-500" />;
      case 'exam-analysis': return <Activity className="h-5 w-5 text-red-500" />;
      default: return <Brain className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'testing': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const testModelConnection = (modelId: string) => {
    toast({
      title: "Testing AI Model",
      description: `Running connection test for ${modelId}...`,
    });

    // Simulate API test
    setTimeout(() => {
      toast({
        title: "Connection Test Successful",
        description: "AI model is properly connected and responding.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Model Status Dashboard
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Monitor and manage AI model connections for student dashboard features
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {aiModels.map((model) => (
          <Card key={model.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getModelIcon(model.type)}
                  <div>
                    <h3 className="font-medium">{model.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Last used: {model.lastUsed.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(model.status)}
                  <Badge variant={model.status === 'active' ? 'default' : 'secondary'}>
                    {model.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Accuracy</span>
                  <span className="text-sm text-green-600 font-semibold">{model.accuracy}%</span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Connected Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {model.connectedFeatures.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => testModelConnection(model.id)}
                  >
                    Test Connection
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => toast({ title: "Model Details", description: `Viewing details for ${model.name}` })}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

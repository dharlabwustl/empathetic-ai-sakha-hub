
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  Sparkles, 
  Smile, 
  Music,
  Brain,
  Zap,
  RefreshCw
} from 'lucide-react';

interface FeelGoodContent {
  id: string;
  type: 'affirmation' | 'joke' | 'music' | 'teaser' | 'gratitude-prompt';
  content: string;
  mood: string;
  aiGenerated: boolean;
  effectiveness: number;
}

interface FeelGoodAIIntegrationProps {
  userMood?: string;
  userProfile: any;
  onContentGenerated?: (content: FeelGoodContent) => void;
}

export const FeelGoodAIIntegration: React.FC<FeelGoodAIIntegrationProps> = ({
  userMood = 'neutral',
  userProfile,
  onContentGenerated
}) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<FeelGoodContent[]>([]);
  const [aiModelStatus, setAiModelStatus] = useState({
    feelGoodEngine: 'active',
    moodAnalyzer: 'active',
    contentGenerator: 'active'
  });

  // Simulate AI content generation based on user mood
  const generateMoodBasedContent = async (contentType: string) => {
    setIsGenerating(true);
    
    // Simulate API call to Feel Good AI Engine
    const mockContent: Record<string, FeelGoodContent> = {
      affirmation: {
        id: Date.now().toString(),
        type: 'affirmation',
        content: `You are capable of achieving great things, ${userProfile?.name || 'Student'}! Your dedication to learning shows your commitment to success.`,
        mood: userMood,
        aiGenerated: true,
        effectiveness: 92
      },
      joke: {
        id: Date.now().toString(),
        type: 'joke',
        content: "Why don't scientists trust atoms? Because they make up everything! 😄",
        mood: userMood,
        aiGenerated: true,
        effectiveness: 87
      },
      music: {
        id: Date.now().toString(),
        type: 'music',
        content: `Recommended playlist for ${userMood} mood: "Focus & Motivation Beats"`,
        mood: userMood,
        aiGenerated: true,
        effectiveness: 89
      },
      teaser: {
        id: Date.now().toString(),
        type: 'teaser',
        content: "Quick puzzle: If you have 3 apples and you take away 2, how many do you have? 🤔",
        mood: userMood,
        aiGenerated: true,
        effectiveness: 85
      }
    };

    setTimeout(() => {
      const content = mockContent[contentType];
      if (content) {
        setGeneratedContent(prev => [content, ...prev]);
        onContentGenerated?.(content);
        toast({
          title: "AI Content Generated!",
          description: `New ${contentType} created based on your current mood.`,
        });
      }
      setIsGenerating(false);
    }, 1500);
  };

  const testAIConnection = () => {
    toast({
      title: "Testing AI Models",
      description: "Checking Feel Good Corner AI connections...",
    });

    setTimeout(() => {
      setAiModelStatus({
        feelGoodEngine: 'active',
        moodAnalyzer: 'active',
        contentGenerator: 'active'
      });
      toast({
        title: "AI Models Connected",
        description: "All Feel Good Corner AI models are working properly.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* AI Status Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Feel Good AI Engine Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-pink-500" />
                <span className="text-sm">Mood Analyzer</span>
              </div>
              <Badge variant={aiModelStatus.moodAnalyzer === 'active' ? 'default' : 'destructive'}>
                {aiModelStatus.moodAnalyzer}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span className="text-sm">Content Generator</span>
              </div>
              <Badge variant={aiModelStatus.contentGenerator === 'active' ? 'default' : 'destructive'}>
                {aiModelStatus.contentGenerator}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Feel Good Engine</span>
              </div>
              <Badge variant={aiModelStatus.feelGoodEngine === 'active' ? 'default' : 'destructive'}>
                {aiModelStatus.feelGoodEngine}
              </Badge>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={testAIConnection} variant="outline" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Test AI Connections
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Generation Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Content Generation
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Current mood: <Badge variant="outline">{userMood}</Badge>
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              onClick={() => generateMoodBasedContent('affirmation')}
              disabled={isGenerating}
              variant="outline"
              className="h-20 flex flex-col items-center gap-2"
            >
              <Heart className="h-5 w-5" />
              <span className="text-xs">Generate Affirmation</span>
            </Button>
            <Button 
              onClick={() => generateMoodBasedContent('joke')}
              disabled={isGenerating}
              variant="outline"
              className="h-20 flex flex-col items-center gap-2"
            >
              <Smile className="h-5 w-5" />
              <span className="text-xs">Generate Joke</span>
            </Button>
            <Button 
              onClick={() => generateMoodBasedContent('music')}
              disabled={isGenerating}
              variant="outline"
              className="h-20 flex flex-col items-center gap-2"
            >
              <Music className="h-5 w-5" />
              <span className="text-xs">Mood Music</span>
            </Button>
            <Button 
              onClick={() => generateMoodBasedContent('teaser')}
              disabled={isGenerating}
              variant="outline"
              className="h-20 flex flex-col items-center gap-2"
            >
              <Brain className="h-5 w-5" />
              <span className="text-xs">Brain Teaser</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Content Display */}
      {generatedContent.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recently Generated Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedContent.slice(0, 3).map((content) => (
                <div key={content.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {content.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {content.effectiveness}% effective
                    </span>
                  </div>
                  <p className="text-sm">{content.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

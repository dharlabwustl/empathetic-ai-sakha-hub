
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight, Brain, BookOpen, Target, Zap } from 'lucide-react';

interface AIInsightsProps {
  conceptName: string;
}

const AIInsights: React.FC<AIInsightsProps> = ({ conceptName }) => {
  return (
    <Card className="border-l-4 border-l-indigo-500 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          Sakha AI Insights
        </CardTitle>
        <CardDescription>
          Personalized learning insights for {conceptName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3 border-l-2 border-indigo-200 pl-3">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-indigo-500" />
              <h3 className="font-medium">Learning Pattern</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on your interactions, you learn this concept best through visual examples and practice problems. Consider spending more time on the Formula Lab section.
            </p>
          </div>
          
          <div className="space-y-3 border-l-2 border-emerald-200 pl-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-500" />
              <h3 className="font-medium">Mastery Prediction</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              At your current rate, you'll reach 85% mastery in approximately 3 more study sessions. Focus on the common misconceptions to accelerate your progress.
            </p>
          </div>
          
          <div className="space-y-3 border-l-2 border-amber-200 pl-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <h3 className="font-medium">Connection Insight</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              This concept connects strongly with "Kirchhoff's Laws" and "Electrical Resistance" which you've previously studied. Reviewing these relationships will strengthen your understanding.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, Sparkles, ArrowRight } from 'lucide-react';

interface AIInsightsProps {
  conceptName: string;
}

const AIInsights: React.FC<AIInsightsProps> = ({ conceptName }) => {
  return (
    <Card className="border-indigo-200 dark:border-indigo-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-indigo-600" />
          <span>AI Insights for {conceptName}</span>
          <Badge variant="outline" className="ml-auto bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/50">
            Personalized
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="border border-blue-100 dark:border-blue-900/50 rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-1">Understanding Gap</h4>
                <p className="text-slate-700 dark:text-slate-300">
                  You're struggling with the application of Newton's Third Law in real-world scenarios. Focus on action-reaction pairs in examples.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border border-emerald-100 dark:border-emerald-900/50 rounded-lg p-4 bg-emerald-50 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-1">Learning Focus</h4>
                <p className="text-slate-700 dark:text-slate-300">
                  Recommended to use visual diagrams to reinforce your understanding of force pairs. Matches your visual learning style.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border border-purple-100 dark:border-purple-900/50 rounded-lg p-4 bg-purple-50 dark:bg-purple-950/20">
            <div className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-1">Next Step</h4>
                <p className="text-slate-700 dark:text-slate-300">
                  After mastering this concept, proceed to Momentum Conservation principles, which builds directly on Newton's Laws.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;

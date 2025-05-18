
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Lightbulb, Info, AlertCircle } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExamReadinessSectionProps {
  score: number;
  previousScore?: number;
  weeklyTrends?: Array<{week: string, score: number}>;
  weakAreas?: string[];
  strongAreas?: string[];
}

const ExamReadinessSection: React.FC<ExamReadinessSectionProps> = ({
  score = 0,
  previousScore,
  weeklyTrends = [],
  weakAreas = [],
  strongAreas = []
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Calculate score change
  const scoreChange = previousScore !== undefined ? score - previousScore : 0;
  const scoreIncreased = scoreChange > 0;
  const scoreUnchanged = scoreChange === 0;
  
  // Generate tips based on the score and areas
  const generateTips = () => {
    const tips = [];
    
    if (score < 30) {
      tips.push("Focus on building core concepts before moving to advanced topics.");
      tips.push("Create a daily study routine to establish consistency.");
      tips.push("Use more flashcards to improve basic knowledge retention.");
    } else if (score < 60) {
      tips.push("Add more practice tests to identify and address weak areas.");
      tips.push("Spend more time reviewing previous errors to avoid repeating them.");
      tips.push("Try different study methods to find what works best for you.");
    } else if (score < 80) {
      tips.push("Take timed practice tests to improve your speed and accuracy.");
      tips.push("Revisit concepts you've mastered to ensure long-term retention.");
      tips.push("Start focusing on exam strategy along with content knowledge.");
    } else {
      tips.push("Focus on maintaining your strong performance with regular reviews.");
      tips.push("Help others explain concepts to solidify your understanding.");
      tips.push("Practice under exam-like conditions to build stamina and focus.");
    }
    
    // Add personalized tips based on weak areas
    if (weakAreas.length > 0) {
      tips.push(`Focus on improving your understanding of ${weakAreas.join(", ")}.`);
    }
    
    return tips;
  };
  
  const tips = generateTips();
  
  // Determine progress color based on score
  const getProgressColor = (score: number) => {
    if (score < 30) return "bg-red-500";
    if (score < 60) return "bg-yellow-500";
    if (score < 80) return "bg-blue-500";
    return "bg-green-500";
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Exam Readiness Score</CardTitle>
            <CardDescription>
              Your current preparedness level for upcoming exams
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="h-8 w-8 p-0 rounded-full"
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-2xl font-bold">{score}%</div>
            {scoreChange !== 0 && (
              <div className={`flex items-center text-sm ${scoreIncreased ? 'text-green-600' : 'text-red-600'}`}>
                {scoreIncreased ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span>{Math.abs(scoreChange)}% {scoreIncreased ? 'increase' : 'decrease'}</span>
              </div>
            )}
          </div>
          
          <Progress 
            value={score} 
            max={100} 
            className="h-2"
            indicatorClassName={getProgressColor(score)}
          />
        </div>
        
        {expanded && (
          <div className="space-y-4 mt-4 animate-fade-in">
            {/* Weekly Trends */}
            {weeklyTrends.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Weekly Progress
                </h4>
                <div className="flex items-end h-20 gap-1">
                  {weeklyTrends.map((week, idx) => (
                    <TooltipProvider key={idx}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex flex-col items-center">
                            <div 
                              className={`w-6 transition-all duration-300 ${getProgressColor(week.score)}`} 
                              style={{ height: `${Math.max(week.score, 5)}%` }}
                            ></div>
                            <span className="text-xs mt-1">{week.week}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Week {week.week}: {week.score}%</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            )}
            
            {/* Improvement Tips */}
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" /> Tips to Improve
              </h4>
              <ul className="space-y-2">
                {tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2 text-xs">
                    <AlertCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Areas of Strength and Weakness */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-green-600">
                  <TrendingUp className="h-4 w-4" /> Strong Areas
                </h4>
                <ul className="space-y-1">
                  {strongAreas.length > 0 ? (
                    strongAreas.map((area, idx) => (
                      <li key={idx} className="text-xs">{area}</li>
                    ))
                  ) : (
                    <li className="text-xs text-muted-foreground">No strong areas identified yet</li>
                  )}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-red-600">
                  <TrendingDown className="h-4 w-4" /> Needs Improvement
                </h4>
                <ul className="space-y-1">
                  {weakAreas.length > 0 ? (
                    weakAreas.map((area, idx) => (
                      <li key={idx} className="text-xs">{area}</li>
                    ))
                  ) : (
                    <li className="text-xs text-muted-foreground">No weak areas identified yet</li>
                  )}
                </ul>
              </div>
            </div>
            
            {/* Footer with info */}
            <div className="flex items-center gap-2 pt-2 border-t text-xs text-muted-foreground">
              <Info className="h-4 w-4" />
              <p>Calculated based on test scores, study consistency, and engagement with materials.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExamReadinessSection;

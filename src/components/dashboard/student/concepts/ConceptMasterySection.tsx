
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Brain, Calendar, CheckCircle2, Clock, RefreshCw, TrendingUp } from 'lucide-react';

interface ConceptMasterySectionProps {
  conceptId: string;
  recallAccuracy?: number;
  quizScore?: number;
  lastPracticed?: string;
}

export const ConceptMasterySection: React.FC<ConceptMasterySectionProps> = ({ 
  conceptId,
  recallAccuracy,
  quizScore,
  lastPracticed
}) => {
  const { toast } = useToast();
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  const startRecallPractice = () => {
    toast({
      title: "Recall Practice",
      description: "Starting spaced repetition practice session",
    });
    // Implement recall practice functionality
  };
  
  const startQuiz = () => {
    toast({
      title: "Quiz Starting",
      description: "Testing your knowledge of this concept",
    });
    // Implement quiz functionality
  };
  
  const getMasteryLevel = () => {
    const score = recallAccuracy || quizScore || 0;
    
    if (score >= 90) return { level: 'Expert', color: 'text-green-600' };
    if (score >= 75) return { level: 'Advanced', color: 'text-blue-600' };
    if (score >= 50) return { level: 'Intermediate', color: 'text-amber-600' };
    if (score >= 25) return { level: 'Basic', color: 'text-orange-600' };
    return { level: 'Beginner', color: 'text-red-600' };
  };
  
  const masteryLevel = getMasteryLevel();
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Brain className="mr-2 h-6 w-6 text-purple-600" />
        Concept Mastery
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recall Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Your recall strength</span>
                <span className={`font-medium ${masteryLevel.color}`}>{masteryLevel.level}</span>
              </div>
              
              <Progress value={recallAccuracy || 0} className="h-2" />
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
              
              <div className="pt-2">
                <p className="text-sm mb-4">
                  Last practiced: <span className="font-medium">{formatDate(lastPracticed)}</span>
                </p>
                
                <Button onClick={startRecallPractice} className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Practice Recall
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quiz Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Quiz score</span>
                <span className="font-medium">{quizScore ? `${quizScore}%` : 'Not attempted'}</span>
              </div>
              
              <div className="flex items-center justify-center">
                {quizScore ? (
                  <div className="w-32 h-32 rounded-full bg-blue-50 dark:bg-blue-900/20 border-4 border-blue-200 dark:border-blue-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">{quizScore}%</div>
                      <div className="text-xs text-blue-600 dark:text-blue-500">Score</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-full h-32 w-32 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">No quiz data</p>
                  </div>
                )}
              </div>
              
              <div className="pt-2">
                <Button onClick={startQuiz} className="w-full" variant={quizScore ? "outline" : "default"}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  {quizScore ? 'Retake Quiz' : 'Take Quiz'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Spaced Repetition Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800 text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold">Next Review</h4>
                  <p className="text-sm">{lastPracticed ? "Tomorrow" : "Today"}</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold">Review Time</h4>
                  <p className="text-sm">5 minutes</p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800 text-center">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-semibold">Learning Curve</h4>
                  <p className="text-sm">{recallAccuracy ? "Improving" : "Not started"}</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                Based on your current recall accuracy, we recommend reviewing this concept regularly 
                to strengthen your long-term memory and mastery of the material.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

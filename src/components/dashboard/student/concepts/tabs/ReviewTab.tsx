
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Star, AlignLeft, Edit, Heart, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewTabProps {
  conceptId: string;
  conceptTitle: string;
}

const ReviewTab: React.FC<ReviewTabProps> = ({ conceptId, conceptTitle }) => {
  // Mock data for concept review
  const reviewData = {
    understanding: 82, // percentage
    completionTime: 45, // minutes
    lastReviewed: '2 days ago',
    mastered: false,
    weakPoints: [
      'Application in complex scenarios',
      'Specific formula derivation',
    ],
    strengths: [
      'Basic principles understanding',
      'Problem solving approach',
    ],
    rating: 4, // out of 5
    notes: "Remember to focus on the edge cases and exceptions. Review the numerical problems at least once more before the exam.",
  };
  
  const recommendedNextSteps = [
    { text: "Attempt practice test", completed: true },
    { text: "Review weak areas with instructor", completed: false },
    { text: "Solve 10 advanced problems", completed: false },
    { text: "Take a final revision quiz", completed: false },
  ];

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-5 w-5",
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Concept Review & Progress</h3>
        <p className="text-sm text-muted-foreground">
          Track your understanding and identify areas for improvement.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500" />
              Understanding Level
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Your understanding of this concept</span>
                <span className="font-medium">{reviewData.understanding}%</span>
              </div>
              <Progress value={reviewData.understanding} className="h-2" />
              
              <div className="pt-2 flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Concept Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${reviewData.mastered ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                  {reviewData.mastered ? 'Mastered' : 'In Progress'}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Last reviewed:</span>
                <span>{reviewData.lastReviewed}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Avg. completion time:</span>
                <span>{reviewData.completionTime} minutes</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Your rating:</span>
                {renderStarRating(reviewData.rating)}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Weak Points</h4>
                <ul className="space-y-2">
                  {reviewData.weakPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full border border-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="h-1.5 w-1.5 bg-amber-500 rounded-full"></span>
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Strengths</h4>
                <ul className="space-y-2">
                  {reviewData.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full border border-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-green-500" />
                      </div>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Your Notes</h4>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                </div>
                <div className="bg-muted/50 p-2 rounded-md text-sm">
                  <AlignLeft className="h-4 w-4 float-left mr-2 text-muted-foreground" />
                  {reviewData.notes}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <ul className="space-y-3">
            {recommendedNextSteps.map((step, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className={`h-5 w-5 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-500 text-white' 
                        : 'border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {step.completed && <Check className="h-3 w-3" />}
                  </div>
                  <span className={`text-sm ${step.completed ? 'line-through text-muted-foreground' :''}`}>
                    {step.text}
                  </span>
                </div>
                {!step.completed && (
                  <Button size="sm" className="h-7">Start</Button>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewTab;

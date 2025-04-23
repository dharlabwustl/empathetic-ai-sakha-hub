
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'quiz' | 'resource' | 'concept';
  url?: string;
  iconColor?: string;
}

interface RecommendationCardProps {
  recommendations: Recommendation[];
  className?: string;
  onViewAll?: () => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendations = [],
  className = "",
  onViewAll
}) => {
  const getIconColor = (type: string): string => {
    switch (type) {
      case 'video': return 'text-red-500';
      case 'article': return 'text-blue-500';
      case 'quiz': return 'text-green-500';
      case 'resource': return 'text-purple-500';
      case 'concept': return 'text-amber-500';
      default: return 'text-gray-500';
    }
  };
  
  // Take the first 3 recommendations to display
  const displayRecommendations = recommendations.slice(0, 3);
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>Recommended For You</span>
          {recommendations.length > 3 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-muted-foreground"
              onClick={onViewAll}
            >
              View All <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="space-y-3">
          {displayRecommendations.length > 0 ? (
            displayRecommendations.map((recommendation) => (
              <div 
                key={recommendation.id} 
                className="p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-1.5 rounded-full ${getIconColor(recommendation.type)} bg-opacity-20 flex items-center justify-center`}>
                    <BookOpen className={`h-4 w-4 ${getIconColor(recommendation.type)}`} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-sm">{recommendation.title}</h3>
                    <p className="text-xs text-muted-foreground">{recommendation.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">No recommendations yet.</p>
              <p className="text-xs text-muted-foreground mt-1">
                Complete more activities to get personalized recommendations.
              </p>
            </div>
          )}
          
          {/* View more button at the bottom */}
          {recommendations.length > 0 && (
            <Button 
              variant="outline" 
              className="w-full text-sm mt-2"
              onClick={onViewAll}
            >
              View More Recommendations
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;

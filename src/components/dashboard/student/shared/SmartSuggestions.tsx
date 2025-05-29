
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Clock, 
  TrendingUp, 
  Target,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SmartSuggestionsProps {
  className?: string;
  userProfile?: any;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ 
  className = "",
  userProfile 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Generate dynamic suggestions based on time of day
  useEffect(() => {
    const hour = currentTime.getHours();
    let timeBasedSuggestions: any[] = [];

    if (hour >= 5 && hour < 12) {
      // Morning suggestions
      timeBasedSuggestions = [
        {
          id: 'morning-1',
          title: 'Start with Physics Concepts',
          description: 'Morning is best for complex problem-solving',
          icon: Target,
          priority: 'high',
          time: '30 min',
          type: 'study'
        },
        {
          id: 'morning-2',
          title: 'Review Yesterday\'s Notes',
          description: 'Reinforce what you learned yesterday',
          icon: TrendingUp,
          priority: 'medium',
          time: '15 min',
          type: 'review'
        }
      ];
    } else if (hour >= 12 && hour < 17) {
      // Afternoon suggestions
      timeBasedSuggestions = [
        {
          id: 'afternoon-1',
          title: 'Practice MCQs',
          description: 'Perfect time for active practice',
          icon: Target,
          priority: 'high',
          time: '45 min',
          type: 'practice'
        },
        {
          id: 'afternoon-2',
          title: 'Chemistry Lab Simulations',
          description: 'Interactive learning works best now',
          icon: Sparkles,
          priority: 'medium',
          time: '20 min',
          type: 'interactive'
        }
      ];
    } else if (hour >= 17 && hour < 21) {
      // Evening suggestions
      timeBasedSuggestions = [
        {
          id: 'evening-1',
          title: 'Biology Revision',
          description: 'Great time for memorization',
          icon: TrendingUp,
          priority: 'high',
          time: '40 min',
          type: 'memorize'
        },
        {
          id: 'evening-2',
          title: 'Formula Practice',
          description: 'Strengthen your formula knowledge',
          icon: Target,
          priority: 'medium',
          time: '25 min',
          type: 'formula'
        }
      ];
    } else {
      // Night suggestions
      timeBasedSuggestions = [
        {
          id: 'night-1',
          title: 'Light Reading',
          description: 'Review concepts without strain',
          icon: Lightbulb,
          priority: 'low',
          time: '20 min',
          type: 'review'
        },
        {
          id: 'night-2',
          title: 'Plan Tomorrow',
          description: 'Set goals for tomorrow\'s study',
          icon: Clock,
          priority: 'medium',
          time: '10 min',
          type: 'planning'
        }
      ];
    }

    setSuggestions(timeBasedSuggestions);
  }, [currentTime]);

  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 21) return 'Evening';
    return 'Night';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="relative">
            <Lightbulb className="h-5 w-5 text-purple-600" />
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-purple-500 rounded-full animate-ping" />
          </div>
          Smart Suggestions
          <Badge variant="outline" className="text-xs">
            {getTimeOfDay()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => {
            const IconComponent = suggestion.icon;
            return (
              <div
                key={suggestion.id}
                className={cn(
                  "group relative p-3 rounded-lg border transition-all duration-300",
                  "hover:shadow-md hover:scale-[1.02] cursor-pointer",
                  "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-lg transition-colors duration-300",
                    getPriorityColor(suggestion.priority)
                  )}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm truncate">
                        {suggestion.title}
                      </h4>
                      <Badge variant="secondary" className="text-xs ml-2">
                        {suggestion.time}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {suggestion.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs", getPriorityColor(suggestion.priority))}
                      >
                        {suggestion.priority} priority
                      </Badge>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        Start
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Suggestions update based on optimal learning times
          </p>
          <div className="flex justify-center mt-2">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-1 w-6 bg-purple-200 dark:bg-purple-800 rounded-full overflow-hidden"
                >
                  <div 
                    className="h-full bg-purple-500 rounded-full animate-pulse"
                    style={{ 
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: '2s'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestions;

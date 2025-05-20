
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ChevronDown, ChevronUp, Users, Home, BookOpen, Clock, Brain, Coffee, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from '@/hooks/use-mobile';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  const isMobile = useIsMobile();

  const toggleCollapsed = () => {
    setInfluenceMeterCollapsed(!influenceMeterCollapsed);
  };

  // Mock data for surrounding influences
  const influences = {
    social: { score: 75, status: 'positive' },
    environment: { score: 60, status: 'neutral' },
    academic: { score: 82, status: 'positive' },
    time: { score: 45, status: 'negative' },
    cognitive: { score: 68, status: 'neutral' },
    physical: { score: 53, status: 'neutral' },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'positive':
        return 'bg-green-500';
      case 'neutral':
        return 'bg-yellow-500';
      case 'negative':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Helper function to render the progress bar with appropriate styles
  const renderProgressBar = (value: number, status: string) => {
    const statusColor = getStatusColor(status);

    return (
      <div className="flex items-center gap-2">
        <Progress
          value={value}
          className="h-1.5 flex-grow"
          indicatorClassName={statusColor}
        />
        <span className="text-xs font-medium w-7 text-right">{value}%</span>
      </div>
    );
  };

  return (
    <Collapsible
      open={!influenceMeterCollapsed}
      onOpenChange={() => toggleCollapsed()}
      className="mb-4"
    >
      <Card>
        <CardHeader className="py-3 px-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'} font-medium flex items-center`}>
                Surrounding Influences Meter
              </CardTitle>
              <CardDescription className={isMobile ? 'text-xs' : 'text-sm'}>
                Factors affecting your learning journey
              </CardDescription>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                {influenceMeterCollapsed ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="pt-0 pb-3 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-4">
                {/* Social Influence */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Users className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-blue-500`} />
                      <h4 className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Social Influence</h4>
                    </div>
                    <Badge
                      variant="outline"
                      className={influences.social.status === 'positive' ? 'bg-green-100 text-green-800' : 
                                influences.social.status === 'neutral' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}
                    >
                      {influences.social.status}
                    </Badge>
                  </div>
                  {renderProgressBar(influences.social.score, influences.social.status)}
                  <p className="text-xs text-gray-500 mt-1">
                    Your peers and study groups are positively influencing your studies.
                  </p>
                </div>

                {/* Environment Influence */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Home className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-green-500`} />
                      <h4 className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Environment</h4>
                    </div>
                    <Badge
                      variant="outline"
                      className={influences.environment.status === 'positive' ? 'bg-green-100 text-green-800' : 
                                influences.environment.status === 'neutral' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}
                    >
                      {influences.environment.status}
                    </Badge>
                  </div>
                  {renderProgressBar(influences.environment.score, influences.environment.status)}
                  <p className="text-xs text-gray-500 mt-1">
                    Your study environment has room for improvement to enhance focus.
                  </p>
                </div>

                {/* Academic Influence */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BookOpen className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-purple-500`} />
                      <h4 className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Academic Support</h4>
                    </div>
                    <Badge
                      variant="outline"
                      className={influences.academic.status === 'positive' ? 'bg-green-100 text-green-800' : 
                                influences.academic.status === 'neutral' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}
                    >
                      {influences.academic.status}
                    </Badge>
                  </div>
                  {renderProgressBar(influences.academic.score, influences.academic.status)}
                  <p className="text-xs text-gray-500 mt-1">
                    You have excellent academic resources and support systems.
                  </p>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                {/* Time Management */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-orange-500`} />
                      <h4 className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Time Management</h4>
                    </div>
                    <Badge
                      variant="outline"
                      className={influences.time.status === 'positive' ? 'bg-green-100 text-green-800' : 
                                influences.time.status === 'neutral' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}
                    >
                      {influences.time.status}
                    </Badge>
                  </div>
                  {renderProgressBar(influences.time.score, influences.time.status)}
                  <p className="text-xs text-gray-500 mt-1">
                    Your time management needs improvement. Try using the Pomodoro technique.
                  </p>
                </div>

                {/* Cognitive State */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Brain className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-blue-500`} />
                      <h4 className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Cognitive State</h4>
                    </div>
                    <Badge
                      variant="outline"
                      className={influences.cognitive.status === 'positive' ? 'bg-green-100 text-green-800' : 
                                influences.cognitive.status === 'neutral' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}
                    >
                      {influences.cognitive.status}
                    </Badge>
                  </div>
                  {renderProgressBar(influences.cognitive.score, influences.cognitive.status)}
                  <p className="text-xs text-gray-500 mt-1">
                    Your focus and mental clarity is moderate. Consider mindfulness practices.
                  </p>
                </div>

                {/* Physical Well-being */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Moon className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-indigo-500`} />
                      <h4 className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Physical Well-being</h4>
                    </div>
                    <Badge
                      variant="outline"
                      className={influences.physical.status === 'positive' ? 'bg-green-100 text-green-800' : 
                                influences.physical.status === 'neutral' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}
                    >
                      {influences.physical.status}
                    </Badge>
                  </div>
                  {renderProgressBar(influences.physical.score, influences.physical.status)}
                  <p className="text-xs text-gray-500 mt-1">
                    Your sleep and exercise routines need attention to optimize learning.
                  </p>
                </div>
              </div>
            </div>

            {/* Improvement tips */}
            <Card className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-3">
                <h3 className="text-xs md:text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                  💡 Suggestions to improve your surrounding influences:
                </h3>
                <ul className="text-xs text-blue-700 dark:text-blue-400 list-disc list-inside space-y-0.5">
                  <li>Set up a dedicated distraction-free study space</li>
                  <li>Use the Pomodoro technique (25 min work, 5 min break)</li>
                  <li>Schedule regular short exercise breaks between study sessions</li>
                  <li>Ensure you get 7-8 hours of quality sleep each night</li>
                </ul>
              </CardContent>
            </Card>
          </CardContent>

          <CardFooter className="px-4 py-3 border-t flex justify-between">
            <Button 
              variant="ghost" 
              size={isMobile ? "sm" : "default"}
              className={isMobile ? "text-xs" : ""}
            >
              Take Assessment
            </Button>
            <Button 
              variant="ghost" 
              size={isMobile ? "sm" : "default"} 
              className={`${isMobile ? 'text-xs' : ''} text-primary`}
            >
              View Detailed Report <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default SurroundingInfluencesSection;

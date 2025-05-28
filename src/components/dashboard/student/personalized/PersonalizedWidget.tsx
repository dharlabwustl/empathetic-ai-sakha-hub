
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { DashboardWidget } from '@/types/personalization';
import { UserProfileBase } from '@/types/user/base';
import { BookOpen, Target, Clock, TrendingUp, Users } from 'lucide-react';

interface PersonalizedWidgetProps {
  widget: DashboardWidget;
  userProfile: UserProfileBase;
}

const PersonalizedWidget: React.FC<PersonalizedWidgetProps> = ({ widget, userProfile }) => {
  const getWidgetIcon = (type: string) => {
    switch (type) {
      case 'kpi': return <TrendingUp className="h-5 w-5" />;
      case 'action': return <Target className="h-5 w-5" />;
      case 'content': return <BookOpen className="h-5 w-5" />;
      case 'progress': return <Clock className="h-5 w-5" />;
      case 'social': return <Users className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'kpi':
        return (
          <div className="space-y-4">
            {widget.content.subjects?.map((subject: string, index: number) => (
              <div key={subject} className="flex items-center justify-between">
                <span className="text-sm font-medium">{subject}</span>
                <Progress value={65 + index * 10} className="w-24" />
              </div>
            ))}
            <div className="text-center pt-2">
              <span className="text-2xl font-bold text-primary">
                {widget.content.targetScore || 'N/A'}
              </span>
              <p className="text-xs text-muted-foreground">Target Score</p>
            </div>
          </div>
        );

      case 'action':
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {widget.content.message || 'Ready to take action?'}
            </p>
            {widget.content.type === 'study-start' && (
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{widget.content.duration} minutes</span>
              </div>
            )}
            <Button className="w-full" size="sm">
              {widget.content.type === 'study-start' ? 'Start Session' : 'Begin Challenge'}
            </Button>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-3">
            {widget.content.type === 'weak-subject-focus' && (
              <>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{widget.content.subject}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {widget.content.recommendedTime}min
                  </span>
                </div>
                <div className="space-y-2">
                  {widget.content.concepts?.map((concept: string) => (
                    <div key={concept} className="flex items-center justify-between text-sm">
                      <span>{concept}</span>
                      <Button variant="ghost" size="sm">Practice</Button>
                    </div>
                  ))}
                </div>
              </>
            )}
            {widget.content.type === 'wellness' && (
              <div className="space-y-2">
                {widget.content.activities?.map((activity: string) => (
                  <Button key={activity} variant="outline" size="sm" className="w-full">
                    {activity}
                  </Button>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center text-muted-foreground">
            <p>Widget content loading...</p>
          </div>
        );
    }
  };

  return (
    <Card className="h-full border-l-4 border-l-primary/50 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          {getWidgetIcon(widget.type)}
          {widget.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {renderWidgetContent()}
      </CardContent>
    </Card>
  );
};

export default PersonalizedWidget;

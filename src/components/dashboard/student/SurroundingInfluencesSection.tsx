
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Users, MapPin, Clock, Star } from 'lucide-react';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed,
}) => {
  const influences = [
    {
      category: "Study Group",
      members: ["Alex", "Sarah", "Mike"],
      location: "Library Room 204",
      time: "4:00 PM - 6:00 PM",
      impact: "positive",
      score: 85
    },
    {
      category: "Social Media",
      apps: ["Instagram", "Twitter", "TikTok"],
      timeSpent: "2.5 hours today",
      impact: "negative",
      score: 45
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Surrounding Influences
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
          >
            {influenceMeterCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      {!influenceMeterCollapsed && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {influences.map((influence, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{influence.category}</h4>
                  <Badge variant={influence.impact === 'positive' ? 'default' : 'destructive'}>
                    {influence.score}%
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  {influence.category === "Study Group" && (
                    <>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{(influence as any).members.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{(influence as any).location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{(influence as any).time}</span>
                      </div>
                    </>
                  )}
                  
                  {influence.category === "Social Media" && (
                    <>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        <span>{(influence as any).apps.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{(influence as any).timeSpent}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SurroundingInfluencesSection;

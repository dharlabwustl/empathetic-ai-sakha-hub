
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, MessageCircle, TrendingUp, Calendar } from 'lucide-react';

interface SurroundingInfluencesSectionProps {
  className?: string;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({ className }) => {
  const [selectedInfluence, setSelectedInfluence] = useState<string | null>(null);

  const influences = [
    {
      id: 'family',
      title: 'Family Support',
      description: 'Encouragement from family members',
      impact: 'positive',
      strength: 85
    },
    {
      id: 'peers',
      title: 'Study Group',
      description: 'Collaborative learning with classmates',
      impact: 'positive',
      strength: 70
    }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Surrounding Influences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {influences.map(influence => (
            <div 
              key={influence.id}
              className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
              onClick={() => setSelectedInfluence(influence.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{influence.title}</h3>
                <Badge variant={influence.impact === 'positive' ? 'default' : 'destructive'}>
                  {influence.impact}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {influence.description}
              </p>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-sm">Strength: {influence.strength}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SurroundingInfluencesSection;

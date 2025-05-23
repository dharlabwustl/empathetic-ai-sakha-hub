
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Target, TrendingUp } from 'lucide-react';
import { ConceptCard } from '@/types/user/conceptCard';

interface ConceptSidebarProps {
  concept: ConceptCard;
}

const ConceptSidebar: React.FC<ConceptSidebarProps> = ({ concept }) => {
  return (
    <div className="space-y-6">
      {/* Concept Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Concept Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Est. Time</span>
            </div>
            <span className="text-sm font-medium">15 min</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Difficulty</span>
            </div>
            <Badge variant="outline">{concept.difficulty}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Progress</span>
            </div>
            <span className="text-sm font-medium">{concept.progress || 0}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Related Concepts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Related Concepts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start text-left">
            Integration Techniques
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-left">
            Derivatives
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-left">
            Limits
          </Button>
        </CardContent>
      </Card>

      {/* Study Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Study Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-xs text-gray-600">Target Mastery: 80%</div>
            <div className="text-xs text-gray-600">Due: Tomorrow</div>
            <Button size="sm" className="w-full mt-3">
              Mark Complete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptSidebar;

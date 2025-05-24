
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Surrounding Influences</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
          >
            {influenceMeterCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {!influenceMeterCollapsed && (
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Study Environment</span>
              <span className="text-sm font-medium text-green-600">Optimal</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Focus Level</span>
              <span className="text-sm font-medium text-blue-600">High</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Motivation</span>
              <span className="text-sm font-medium text-purple-600">Strong</span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SurroundingInfluencesSection;

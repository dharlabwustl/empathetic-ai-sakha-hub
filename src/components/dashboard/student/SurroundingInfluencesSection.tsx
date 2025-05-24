
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Surrounding Influences</CardTitle>
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
          <div className="text-sm text-muted-foreground">
            Track environmental factors affecting your study performance
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SurroundingInfluencesSection;

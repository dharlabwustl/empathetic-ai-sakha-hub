import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const SurroundingInfluencesSection: React.FC<{ influenceMeterCollapsed: boolean; setInfluenceMeterCollapsed: React.Dispatch<React.SetStateAction<boolean>>; }> = ({ influenceMeterCollapsed, setInfluenceMeterCollapsed }) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Surrounding Influences</h2>
          <Button variant="ghost" size="icon" onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}>
            {influenceMeterCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>
        {!influenceMeterCollapsed && (
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-32 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-600/80 rounded-lg hover:opacity-90 transition-opacity opacity-80 flex items-center justify-center">
                <div className="text-white font-semibold text-lg">TIME MANAGEMENT</div>
              </div>
            </div>
            <div className="relative h-32 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-600/80 rounded-lg hover:opacity-90 transition-opacity opacity-80 flex items-center justify-center">
                <div className="text-white font-semibold text-lg">ENVIRONMENT</div>
              </div>
            </div>
            <div className="relative h-32 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-violet-600/80 rounded-lg hover:opacity-90 transition-opacity opacity-80 flex items-center justify-center">
                <div className="text-white font-semibold text-lg">HEALTH</div>
              </div>
            </div>
            <div className="relative h-32 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-violet-600/80 rounded-lg hover:opacity-90 transition-opacity opacity-80 flex items-center justify-center">
                <div className="text-white font-semibold text-lg">MENTAL STATE</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SurroundingInfluencesSection;

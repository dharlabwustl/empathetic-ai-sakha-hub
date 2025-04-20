
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Feature } from "./types";
import { FeaturesTable } from "./table/FeaturesTable";

interface FeatureManagementCardProps {
  features: Feature[];
  onToggleFeature: (id: string, isPremium: boolean) => void;
  onEditFeature: (feature: Feature) => void;
  onAddFeature: () => void;
}

const FeatureManagementCard: React.FC<FeatureManagementCardProps> = ({
  features,
  onToggleFeature,
  onEditFeature,
  onAddFeature
}) => {
  return (
    <Card className="shadow-md border-muted-foreground/20">
      <CardHeader className="flex flex-row items-center justify-between bg-muted/30">
        <CardTitle>Platform Features</CardTitle>
        <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={onAddFeature}>
          <Plus size={16} />
          <span>Add Feature</span>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <FeaturesTable 
          features={features}
          onToggleFeature={onToggleFeature}
          onEditFeature={onEditFeature}
        />
      </CardContent>
    </Card>
  );
};

export default FeatureManagementCard;

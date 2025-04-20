
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import { PlanType } from "@/services/featureService";

export interface Feature {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  isPremium: boolean;
  allowedPlans?: PlanType[];
  freeAccessLimit?: {
    type: "time" | "usage" | "content";
    limit: number;
  };
}

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
  const getPlanBadges = (feature: Feature) => {
    if (!feature.allowedPlans || feature.allowedPlans.length === 0) {
      return <Badge variant="outline">All Plans</Badge>;
    }
    
    return (
      <div className="flex flex-wrap gap-1">
        {feature.allowedPlans.map(plan => (
          <Badge key={plan} variant="outline" className="capitalize">{plan}</Badge>
        ))}
      </div>
    );
  };

  const getAccessDescription = (feature: Feature) => {
    if (!feature.freeAccessLimit) return "Full Access";
    
    switch (feature.freeAccessLimit.type) {
      case "time":
        return `${feature.freeAccessLimit.limit} days free access`;
      case "usage":
        return `${feature.freeAccessLimit.limit} free uses`;
      case "content":
        return `${feature.freeAccessLimit.limit}% free content`;
      default:
        return "Limited Access";
    }
  };

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
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/70">
              <TableHead>Feature</TableHead>
              <TableHead>Path</TableHead>
              <TableHead>Access Type</TableHead>
              <TableHead>Free Limit</TableHead>
              <TableHead>Allowed Plans</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="font-medium">{feature.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{feature.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{feature.path}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={feature.isPremium} 
                      onCheckedChange={(checked) => onToggleFeature(feature.id, checked)}
                    />
                    <span className={feature.isPremium ? "text-amber-600 font-medium" : "text-green-600 font-medium"}>
                      {feature.isPremium ? 'Premium' : 'Basic'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {feature.freeAccessLimit ? (
                    <Badge variant="secondary">
                      {getAccessDescription(feature)}
                    </Badge>
                  ) : (
                    <span className="text-gray-500">None</span>
                  )}
                </TableCell>
                <TableCell>
                  {getPlanBadges(feature)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditFeature(feature)}
                  >
                    <Edit size={16} />
                    <span className="sr-only">Edit feature</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FeatureManagementCard;

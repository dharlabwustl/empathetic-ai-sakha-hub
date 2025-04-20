
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit } from "lucide-react";
import { FeatureAccessBadge } from "./FeatureAccessBadge";
import { FeatureAccessLimit } from "./FeatureAccessLimit";
import { FeatureRowProps } from "./types";

export const FeatureTableRow: React.FC<FeatureRowProps> = ({
  feature,
  onToggleFeature,
  onEditFeature,
}) => {
  return (
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
            onCheckedChange={(checked) => onToggleFeature(feature.id!, checked)}
          />
          <span className={feature.isPremium ? "text-amber-600 font-medium" : "text-green-600 font-medium"}>
            {feature.isPremium ? 'Premium' : 'Basic'}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <FeatureAccessLimit feature={feature} />
      </TableCell>
      <TableCell>
        <FeatureAccessBadge allowedPlans={feature.allowedPlans} />
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
  );
};

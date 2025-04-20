
import React from "react";
import { Badge } from "@/components/ui/badge";
import { PlanType } from "@/services/featureService";

interface FeatureAccessBadgeProps {
  allowedPlans?: PlanType[];
}

export const FeatureAccessBadge: React.FC<FeatureAccessBadgeProps> = ({ allowedPlans }) => {
  if (!allowedPlans || allowedPlans.length === 0) {
    return <Badge variant="outline">All Plans</Badge>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {allowedPlans.map(plan => (
        <Badge key={plan} variant="outline" className="capitalize">{plan}</Badge>
      ))}
    </div>
  );
};

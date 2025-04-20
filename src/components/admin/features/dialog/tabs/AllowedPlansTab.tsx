
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlanType } from "@/services/featureService";
import { TabProps } from "../types";

export const AllowedPlansTab: React.FC<TabProps> = ({ editedFeature, onChange }) => {
  const isPlanAllowed = (plan: PlanType): boolean => {
    if (!editedFeature.allowedPlans) return true;
    return editedFeature.allowedPlans.includes(plan);
  };

  return (
    <div className="space-y-4">
      <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription>
          Specify which subscription plans can access this feature. If none are selected, all plans have access.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(PlanType).map(([key, plan]) => (
          <div key={key} className="flex items-center space-x-2">
            <Switch 
              id={`plan-${plan}`}
              checked={isPlanAllowed(plan)}
              onCheckedChange={() => {
                const currentPlans = editedFeature.allowedPlans || [];
                const planIndex = currentPlans.indexOf(plan);
                
                if (planIndex >= 0) {
                  const newPlans = [...currentPlans];
                  newPlans.splice(planIndex, 1);
                  onChange("allowedPlans", newPlans.length ? newPlans : undefined);
                } else {
                  onChange("allowedPlans", [...currentPlans, plan]);
                }
              }}
            />
            <Label htmlFor={`plan-${plan}`} className="capitalize">{key} Plan</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

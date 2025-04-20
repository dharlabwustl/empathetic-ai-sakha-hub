
import { useState } from "react";
import { Feature } from "../types";
import { PlanType } from "@/services/featureService";

export const useFeatureEditForm = (initialFeature: Feature, onSave: (feature: Feature) => void) => {
  const [editedFeature, setEditedFeature] = useState<Feature>(initialFeature);

  const handleChange = (field: string, value: any) => {
    setEditedFeature(prev => ({ ...prev, [field]: value }));
  };

  const handleTogglePremium = (checked: boolean) => {
    setEditedFeature(prev => ({ ...prev, isPremium: checked }));
  };

  const handleFreeLimitTypeChange = (value: string) => {
    if (value === "none") {
      setEditedFeature(prev => ({ ...prev, freeAccessLimit: undefined }));
      return;
    }

    setEditedFeature(prev => ({
      ...prev,
      freeAccessLimit: {
        type: value as "time" | "usage" | "content",
        limit: prev.freeAccessLimit?.limit || 0
      }
    }));
  };

  const handleFreeLimitValueChange = (value: string) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) return;

    setEditedFeature(prev => ({
      ...prev,
      freeAccessLimit: prev.freeAccessLimit 
        ? { ...prev.freeAccessLimit, limit: numValue }
        : { type: "usage", limit: numValue }
    }));
  };

  const handleAllowedPlanToggle = (plan: PlanType) => {
    setEditedFeature(prev => {
      const currentPlans = prev.allowedPlans || [];
      const planIndex = currentPlans.indexOf(plan);
      
      if (planIndex >= 0) {
        const newPlans = [...currentPlans];
        newPlans.splice(planIndex, 1);
        return { ...prev, allowedPlans: newPlans.length ? newPlans : undefined };
      } else {
        return { ...prev, allowedPlans: [...currentPlans, plan] };
      }
    });
  };

  const handleSaveFeature = () => {
    onSave(editedFeature);
  };

  return {
    editedFeature,
    handleChange,
    handleTogglePremium,
    handleFreeLimitTypeChange,
    handleFreeLimitValueChange,
    handleAllowedPlanToggle,
    handleSaveFeature
  };
};

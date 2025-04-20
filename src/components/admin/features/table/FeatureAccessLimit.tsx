
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Feature } from "../types";

interface FeatureAccessLimitProps {
  feature: Feature;
}

export const FeatureAccessLimit: React.FC<FeatureAccessLimitProps> = ({ feature }) => {
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

  return feature.freeAccessLimit ? (
    <Badge variant="secondary">
      {getAccessDescription(feature)}
    </Badge>
  ) : (
    <span className="text-gray-500">None</span>
  );
};

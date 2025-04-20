
import { Feature } from "../types";

export interface FeatureTableProps {
  features: Feature[];
  onToggleFeature: (id: string, isPremium: boolean) => void;
  onEditFeature: (feature: Feature) => void;
}

export interface FeatureRowProps {
  feature: Feature;
  onToggleFeature: (id: string, isPremium: boolean) => void;
  onEditFeature: (feature: Feature) => void;
}


import { Feature } from "../types";

export interface FeatureEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  feature: Feature;
  onSave: (editedFeature: Feature) => void;
}

export interface TabProps {
  editedFeature: Feature;
  onChange: (field: string, value: any) => void;
}

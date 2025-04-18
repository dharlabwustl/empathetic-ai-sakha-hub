
import { getFeatures } from "@/pages/dashboard/student/utils/FeatureManager";

export interface Feature {
  title: string;
  description: string;
  path: string;
  isPremium: boolean;
  icon: React.ReactNode;
}

export const featureService = {
  getAllFeatures: async (): Promise<Feature[]> => {
    // In a real application, this would be fetched from an API
    // For now, we'll use our local utility function
    return getFeatures();
  },
  
  updateFeature: async (updatedFeature: Feature): Promise<Feature> => {
    // In a real application, this would update the feature in a database
    // For now, we'll just return the updated feature
    return updatedFeature;
  },
  
  toggleFeaturePremium: async (featureTitle: string, isPremium: boolean): Promise<boolean> => {
    // In a real application, this would update the feature's premium status in a database
    // For now, we'll just return success
    return true;
  }
};

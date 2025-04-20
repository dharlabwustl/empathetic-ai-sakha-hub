
import { Feature } from "@/components/admin/features/types";

// Mock feature service for the admin panel
class FeatureService {
  async getFeatures(): Promise<Feature[]> {
    // Mock implementation
    return [
      {
        id: "1",
        title: "AI Personalized Study Plan",
        description: "Customized study plans based on user performance and goals",
        path: "/dashboard/study-plan",
        icon: "📊",
        isPremium: true,
        allowedPlans: ["premium", "enterprise"]
      },
      {
        id: "2",
        title: "Mock Tests",
        description: "Practice tests with real exam-like questions",
        path: "/dashboard/mock-tests",
        icon: "📝",
        isPremium: false
      }
    ];
  }

  async updateFeature(feature: Feature): Promise<Feature> {
    console.log("Feature updated:", feature);
    return feature;
  }

  async createFeature(feature: Partial<Feature>): Promise<Feature> {
    const newFeature = {
      ...feature,
      id: Math.random().toString(36).substring(7)
    } as Feature;
    
    console.log("Feature created:", newFeature);
    return newFeature;
  }

  async deleteFeature(id: string): Promise<void> {
    console.log("Feature deleted:", id);
    return;
  }

  async toggleFeature(id: string, enabled: boolean): Promise<void> {
    console.log("Feature toggled:", id, enabled);
    return;
  }
}

// Create and export singleton instance
export const featureService = new FeatureService();

export default featureService;

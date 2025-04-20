
import { useState, useEffect } from "react";
import { Feature, FeatureStats } from "../types";
import { PlanType, featureService } from "@/services/featureService";
import { useToast } from "@/hooks/use-toast";

export const useFeatureManagement = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState<PlanType | "all">("all");
  const [premiumFilter, setPremiumFilter] = useState<"all" | "premium" | "free">("all");
  const [activeTab, setActiveTab] = useState("all");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    try {
      const data = await featureService.getAllFeatures();
      setFeatures(data);
    } catch (error) {
      console.error("Failed to load features:", error);
      toast({
        title: "Error",
        description: "Failed to load features",
        variant: "destructive"
      });
    }
  };

  const handleToggleFeature = async (id: string, isPremium: boolean) => {
    try {
      const updatedFeatures = features.map(feature => 
        feature.id === id ? {...feature, isPremium} : feature
      );
      
      const featureToUpdate = features.find(f => f.id === id);
      if (featureToUpdate) {
        await featureService.toggleFeaturePremium(featureToUpdate.title, isPremium);
        setFeatures(updatedFeatures);
        
        toast({
          title: "Feature Updated",
          description: `${featureToUpdate.title} is now ${isPremium ? 'premium' : 'basic'}.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update feature",
        variant: "destructive"
      });
    }
  };

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPlan = planFilter === "all" || 
                        !feature.allowedPlans || 
                        feature.allowedPlans.includes(planFilter as PlanType);
    
    const matchesPremium = premiumFilter === "all" ||
                          (premiumFilter === "premium" && feature.isPremium) ||
                          (premiumFilter === "free" && !feature.isPremium);

    const hasFreeLimits = !!feature.freeAccessLimit;
    const matchesTab = activeTab === "all" ||
                      (activeTab === "premium" && feature.isPremium) ||
                      (activeTab === "free" && !feature.isPremium) ||
                      (activeTab === "limited" && hasFreeLimits);
    
    return matchesSearch && matchesPlan && matchesPremium && matchesTab;
  });

  const stats: FeatureStats = {
    total: features.length,
    premium: features.filter(f => f.isPremium).length,
    free: features.filter(f => !f.isPremium).length,
    limited: features.filter(f => !!f.freeAccessLimit).length
  };

  return {
    features: filteredFeatures,
    stats,
    searchQuery,
    setSearchQuery,
    planFilter,
    setPlanFilter,
    premiumFilter,
    setPremiumFilter,
    activeTab,
    setActiveTab,
    isEditDialogOpen,
    setIsEditDialogOpen,
    selectedFeature,
    setSelectedFeature,
    handleToggleFeature,
    loadFeatures
  };
};

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import FeatureFilters from "@/components/admin/features/FeatureFilters";
import StatsCards from "@/components/admin/features/StatsCards";
import { Feature } from "@/components/admin/features/types";
import FeatureManagementCard from "@/components/admin/features/FeatureManagementCard";
import FeatureEditDialog from "@/components/admin/features/FeatureEditDialog";
import { useFeatureManagement } from "@/components/admin/features/hooks/useFeatureManagement";
import { PlanType, featureService } from "@/services/featureService";
import { useToast } from "@/hooks/use-toast";

const FeaturesManagementPage = () => {
  const {
    features,
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
  } = useFeatureManagement();

  const { toast } = useToast();
  const [isAddFeatureOpen, setIsAddFeatureOpen] = useState(false);
  
  const newFeatureTemplate: Feature = {
    title: "",
    description: "",
    path: "",
    icon: "✨",
    isPremium: false,
  };
  
  const handleAddFeature = () => {
    setSelectedFeature(newFeatureTemplate);
    setIsAddFeatureOpen(true);
  };
  
  const handleEditFeature = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsEditDialogOpen(true);
  };
  
  const handleSaveFeature = async (editedFeature: Feature) => {
    try {
      if (!selectedFeature?.id) {
        await featureService.createFeature(editedFeature);
        toast({
          title: "Feature Created",
          description: `${editedFeature.title} has been created successfully.`,
        });
      } else {
        await featureService.updateFeature(editedFeature);
        toast({
          title: "Feature Updated",
          description: `${editedFeature.title} has been updated successfully.`,
        });
      }
      
      loadFeatures();
      
      setIsEditDialogOpen(false);
      setIsAddFeatureOpen(false);
    } catch (error) {
      console.error("Error saving feature:", error);
      toast({
        title: "Error",
        description: "Failed to save feature",
        variant: "destructive",
      });
    }
  };
  
  const handleExport = () => {
    const featureData = features.map(f => ({
      title: f.title,
      description: f.description,
      path: f.path,
      isPremium: f.isPremium,
      allowedPlans: f.allowedPlans?.join(", ") || "All Plans",
    }));
    
    const headers = Object.keys(featureData[0]).join(",");
    const csv = [
      headers,
      ...featureData.map(row => 
        Object.values(row).map(value => 
          typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value
        ).join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "features_export.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Complete",
      description: `${features.length} features exported to CSV.`,
    });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Features Management</h1>
          <p className="text-muted-foreground">Manage platform features and access control</p>
        </div>

        <StatsCards stats={stats} setActiveTab={setActiveTab} activeTab={activeTab} />
        
        <FeatureFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          planFilter={planFilter}
          onPlanFilterChange={setPlanFilter as any}
          premiumFilter={premiumFilter}
          onPremiumFilterChange={setPremiumFilter}
          onExport={handleExport}
        />
        
        <FeatureManagementCard
          features={features}
          onToggleFeature={handleToggleFeature}
          onEditFeature={handleEditFeature}
          onAddFeature={handleAddFeature}
        />

        {selectedFeature && isEditDialogOpen && (
          <FeatureEditDialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            feature={selectedFeature}
            onSave={handleSaveFeature}
          />
        )}
        
        {selectedFeature && isAddFeatureOpen && (
          <FeatureEditDialog
            isOpen={isAddFeatureOpen}
            onClose={() => setIsAddFeatureOpen(false)}
            feature={selectedFeature}
            onSave={handleSaveFeature}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default FeaturesManagementPage;

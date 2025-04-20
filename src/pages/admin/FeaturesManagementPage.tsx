
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useFeatureManagement } from "@/components/admin/features/hooks/useFeatureManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import FeatureEditDialog from "@/components/admin/features/FeatureEditDialog";
import FeatureManagementCard from "@/components/admin/features/FeatureManagementCard";
import StatsCards from "@/components/admin/features/StatsCards";
import FeatureFilters from "@/components/admin/features/FeatureFilters";
import { Feature } from "@/components/admin/features/types";

const FeaturesManagementPage = () => {
  const { toast } = useToast();
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

  const handleExportFeatures = () => {
    const headers = ["Title", "Description", "Path", "Premium", "Allowed Plans"];
    const csvData = [
      headers.join(","),
      ...features.map(feature => [
        `"${feature.title}"`,
        `"${feature.description}"`,
        feature.path,
        feature.isPremium ? "Yes" : "No",
        feature.allowedPlans ? feature.allowedPlans.join(", ") : "All"
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "features-export.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Complete",
      description: "Features data has been exported to CSV",
    });
  };

  const handleEditFeature = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsEditDialogOpen(true);
  };

  const handleAddFeature = () => {
    const newFeature: Feature = {
      title: "",
      description: "",
      path: "",
      icon: "📱",
      isPremium: false,
    };
    setSelectedFeature(newFeature);
    setIsEditDialogOpen(true);
  };

  const handleSaveFeature = async (editedFeature: Feature) => {
    try {
      if (editedFeature.id) {
        await featureService.updateFeature(editedFeature);
      }
      await loadFeatures();
      setIsEditDialogOpen(false);
      setSelectedFeature(null);
      
      toast({
        title: editedFeature.id ? "Feature Updated" : "Feature Created",
        description: `${editedFeature.title} has been ${editedFeature.id ? 'updated' : 'added'}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save feature changes",
        variant: "destructive"
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Feature Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage features and subscriptions for student dashboard
          </p>
        </div>
      </div>
      
      <StatsCards stats={stats} />
      
      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 bg-muted/50 p-1 w-full max-w-xl">
            <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              All Features
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              Premium Only
            </TabsTrigger>
            <TabsTrigger value="free" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              Free Features
            </TabsTrigger>
            <TabsTrigger value="limited" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              Limited Access
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <FeatureFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        planFilter={planFilter}
        onPlanFilterChange={(value) => setPlanFilter(value as any)}
        premiumFilter={premiumFilter}
        onPremiumFilterChange={(value: any) => setPremiumFilter(value)}
        onExport={handleExportFeatures}
      />
      
      <FeatureManagementCard
        features={features}
        onToggleFeature={handleToggleFeature}
        onEditFeature={handleEditFeature}
        onAddFeature={handleAddFeature}
      />
      
      {selectedFeature && (
        <FeatureEditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          feature={selectedFeature}
          onSave={handleSaveFeature}
        />
      )}
    </AdminLayout>
  );
};

export default FeaturesManagementPage;

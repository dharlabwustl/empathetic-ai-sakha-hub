
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import FeatureEditDialog from "@/components/admin/features/FeatureEditDialog";
import { featureService, Feature, PlanType } from "@/services/featureService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FeatureManagementCard from "@/components/admin/features/FeatureManagementCard";

const FeaturesManagementPage = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [planFilter, setPlanFilter] = useState<PlanType | "all">("all");
  const [premiumFilter, setPremiumFilter] = useState<"all" | "premium" | "free">("all");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
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
    
    loadFeatures();
  }, [toast]);

  const filteredFeatures = features.filter(feature => {
    // Text search
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Plan filter
    const matchesPlan = planFilter === "all" || 
                       !feature.allowedPlans || 
                       feature.allowedPlans.includes(planFilter as PlanType);
    
    // Premium filter
    const matchesPremium = premiumFilter === "all" ||
                          (premiumFilter === "premium" && feature.isPremium) ||
                          (premiumFilter === "free" && !feature.isPremium);

    // Tab filter
    const hasFreeLimits = !!feature.freeAccessLimit;
    const matchesTab = activeTab === "all" ||
                      (activeTab === "premium" && feature.isPremium) ||
                      (activeTab === "free" && !feature.isPremium) ||
                      (activeTab === "limited" && hasFreeLimits);
    
    return matchesSearch && matchesPlan && matchesPremium && matchesTab;
  });

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
          variant: "default"
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

  const handleEditFeature = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsEditDialogOpen(true);
  };

  const handleAddFeature = () => {
    // Create an empty feature template
    const newFeature: Feature = {
      id: "",
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
        
        const updatedFeatures = features.map(f => 
          f.id === editedFeature.id ? editedFeature : f
        );
        setFeatures(updatedFeatures);
        
        toast({
          title: "Feature Updated",
          description: `Changes to ${editedFeature.title} have been saved.`,
          variant: "default"
        });
      } else {
        // This is a new feature
        const newFeature = {
          ...editedFeature,
          id: `feature-${Date.now()}`
        };
        await featureService.createFeature(newFeature);
        
        setFeatures([...features, newFeature]);
        
        toast({
          title: "Feature Created",
          description: `${newFeature.title} has been added.`,
          variant: "default"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save feature changes",
        variant: "destructive"
      });
    } finally {
      setIsEditDialogOpen(false);
      setSelectedFeature(null);
    }
  };

  const handleExportFeatures = () => {
    // Create CSV data
    const headers = ["Title", "Description", "Path", "Premium", "Allowed Plans"];
    const csvData = [
      headers.join(","),
      ...filteredFeatures.map(feature => [
        `"${feature.title}"`,
        `"${feature.description}"`,
        feature.path,
        feature.isPremium ? "Yes" : "No",
        feature.allowedPlans ? feature.allowedPlans.join(", ") : "All"
      ].join(","))
    ].join("\n");
    
    // Create and download blob
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

  const stats = {
    total: features.length,
    premium: features.filter(f => f.isPremium).length,
    free: features.filter(f => !f.isPremium).length,
    limited: features.filter(f => !!f.freeAccessLimit).length
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
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Features</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-xl">🧩</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Premium Features</p>
              <p className="text-2xl font-bold">{stats.premium}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Free Features</p>
              <p className="text-2xl font-bold">{stats.free}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <span className="text-xl">🎁</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Limited Access</p>
              <p className="text-2xl font-bold">{stats.limited}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <span className="text-xl">⏱️</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 bg-muted/50 p-1 w-full max-w-xl">
            <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">All Features</TabsTrigger>
            <TabsTrigger value="premium" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Premium Only</TabsTrigger>
            <TabsTrigger value="free" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Free Features</TabsTrigger>
            <TabsTrigger value="limited" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Limited Access</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search features..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Select value={premiumFilter} onValueChange={(value: "all" | "premium" | "free") => setPremiumFilter(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="premium">Premium Only</SelectItem>
              <SelectItem value="free">Free Only</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={planFilter} onValueChange={(value) => setPlanFilter(value as PlanType | "all")}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value={PlanType.Free}>Free Plan</SelectItem>
              <SelectItem value={PlanType.Basic}>Basic Plan</SelectItem>
              <SelectItem value={PlanType.Premium}>Premium Plan</SelectItem>
              <SelectItem value={PlanType.Group}>Group Plan</SelectItem>
              <SelectItem value={PlanType.Institute}>Institute Plan</SelectItem>
              <SelectItem value={PlanType.Corporate}>Corporate Plan</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleExportFeatures}
          >
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <FeatureManagementCard
        features={filteredFeatures}
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

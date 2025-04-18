
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Edit, Search, Filter, Download } from "lucide-react";
import { getFeatures } from "@/pages/dashboard/student/utils/FeatureManager";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import FeatureEditDialog from "@/components/admin/features/FeatureEditDialog";

const FeaturesManagementPage = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState(getFeatures());
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  const filteredFeatures = features.filter(
    (feature) => 
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleFeature = (index: number, isPremium: boolean) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = {...updatedFeatures[index], isPremium};
    setFeatures(updatedFeatures);
    
    toast({
      title: "Feature Updated",
      description: `${updatedFeatures[index].title} is now ${isPremium ? 'premium' : 'basic'}.`,
      variant: "default"
    });
  };

  const handleEditFeature = (feature: any) => {
    setSelectedFeature(feature);
    setIsEditDialogOpen(true);
  };

  const handleSaveFeature = (editedFeature: any) => {
    const updatedFeatures = features.map(f => 
      f.title === editedFeature.title ? editedFeature : f
    );
    setFeatures(updatedFeatures);
    
    toast({
      title: "Feature Updated",
      description: `Changes to ${editedFeature.title} have been saved.`,
      variant: "default"
    });
    
    setIsEditDialogOpen(false);
    setSelectedFeature(null);
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
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter size={16} />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Platform Features</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Subscription Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeatures.map((feature, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                        {feature.icon}
                      </div>
                      <span>{feature.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{feature.description}</TableCell>
                  <TableCell className="text-sm text-gray-500">{feature.path}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={feature.isPremium} 
                        onCheckedChange={(checked) => handleToggleFeature(index, checked)}
                      />
                      <span>{feature.isPremium ? 'Premium' : 'Basic'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={feature.isPremium ? "outline" : "default"}>
                      {feature.isPremium ? 'Restricted' : 'Available'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditFeature(feature)}
                    >
                      <Edit size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
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

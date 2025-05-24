
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Check, X, Settings, Edit, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ActionDialog from "@/components/admin/dialogs/ActionDialog";
import { useActionDialog } from "@/hooks/useActionDialog";

// Expanded feature data that includes more comprehensive student dashboard features
const featureData = [
  {
    id: "feature-1",
    name: "Student Dashboard",
    description: "Core student dashboard interface",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-10-15"
  },
  {
    id: "feature-2",
    name: "Concept Cards",
    description: "Study concepts with interactive cards",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-10-12"
  },
  {
    id: "feature-3",
    name: "Flashcards",
    description: "Memorize with smart flashcards",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-10-10"
  },
  {
    id: "feature-4",
    name: "Academic Advisor",
    description: "AI-powered academic guidance",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-10-08"
  },
  {
    id: "feature-5",
    name: "Practice Exams",
    description: "Take practice tests and track progress",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-10-05"
  },
  {
    id: "feature-6",
    name: "Mood-Based Learning",
    description: "Adapt learning based on student mood",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-10-03"
  },
  {
    id: "feature-7",
    name: "Study Plans",
    description: "Create and manage study plans",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-10-01"
  },
  {
    id: "feature-8",
    name: "Welcome Tour",
    description: "Onboarding tour for new students",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-09-28"
  },
  {
    id: "feature-9",
    name: "Formula Repository",
    description: "Access comprehensive formula collections",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-09-25"
  },
  {
    id: "feature-10",
    name: "Progress Tracking",
    description: "Monitor learning progress and achievements",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-09-22"
  },
  {
    id: "feature-11",
    name: "Study Groups",
    description: "Collaborate with peers in study groups",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-09-20"
  },
  {
    id: "feature-12",
    name: "Performance Analytics",
    description: "Detailed analytics on study performance",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-09-18"
  },
  {
    id: "feature-13",
    name: "Voice Commands",
    description: "Control dashboard with voice commands",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-09-15"
  },
  {
    id: "feature-14",
    name: "Stress Tracker",
    description: "Monitor and manage stress levels",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-09-12"
  },
  {
    id: "feature-15",
    name: "Smart Recommendations",
    description: "AI-powered study recommendations",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-09-10"
  },
  {
    id: "feature-16",
    name: "Time Management",
    description: "Track and optimize study time",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-09-08"
  }
];

const FeatureManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const { toast } = useToast();
  const { dialogState, openDialog, closeDialog } = useActionDialog();
  
  // Filter features based on search query
  const filteredFeatures = featureData.filter(feature => 
    feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle feature status toggle
  const handleToggleFeature = (featureId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    toast({
      title: `Feature ${newStatus === 'active' ? 'Activated' : 'Deactivated'}`,
      description: `Feature has been ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully.`
    });
    
    // In a real app, you would update the feature status in the database
    console.log(`Feature ${featureId} status changed to ${newStatus}`);
  };
  
  // Handle feature selection
  const handleSelectFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };
  
  // Handle bulk actions
  const handleBulkAction = (action: 'activate' | 'deactivate') => {
    if (selectedFeatures.length === 0) {
      toast({
        title: "No features selected",
        description: "Please select features to perform this action.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: `Features ${action === 'activate' ? 'Activated' : 'Deactivated'}`,
      description: `${selectedFeatures.length} features have been ${action === 'activate' ? 'activated' : 'deactivated'}.`
    });
    
    // In a real app, you would update the features status in the database
    setSelectedFeatures([]);
  };
  
  // Add proper action handlers
  const handleViewFeature = (feature: any) => {
    openDialog('view', feature.name, {
      id: feature.id,
      name: feature.name,
      description: feature.description,
      status: feature.status,
      availableIn: feature.availableIn,
      lastUpdated: feature.lastUpdated
    });
  };

  const handleEditFeature = (feature: any) => {
    openDialog('edit', feature.name, {
      id: feature.id,
      name: feature.name,
      description: feature.description,
      status: feature.status,
      availableIn: feature.availableIn
    });
  };

  const handleFeatureSettings = (feature: any) => {
    openDialog('settings', feature.name, {
      id: feature.id,
      name: feature.name,
      activeStatus: feature.status === 'active',
      permissions: 'Standard Access',
      notifications: 'Enabled'
    });
  };

  const handleSave = (data: any) => {
    toast({
      title: "Feature Updated",
      description: `${data.name} has been updated successfully.`,
    });
  };

  // Handle adding a new feature
  const handleAddFeature = () => {
    openDialog('add', 'New Feature', {
      name: '',
      description: '',
      status: 'active',
      availableIn: ['student']
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Feature Management</h2>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search features..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-[250px]"
              />
            </div>
            <Button onClick={handleAddFeature}>
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Student Dashboard Features ({filteredFeatures.length} total)</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('activate')}
                  disabled={selectedFeatures.length === 0}
                >
                  <Check className="h-4 w-4 mr-1" /> Activate
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('deactivate')}
                  disabled={selectedFeatures.length === 0}
                >
                  <X className="h-4 w-4 mr-1" /> Deactivate
                </Button>
              </div>
            </div>
            <CardDescription>
              Manage all features available on the student dashboard - currently showing {filteredFeatures.length} features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Feature</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeatures.map((feature) => (
                  <TableRow key={feature.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedFeatures.includes(feature.id)}
                        onChange={() => handleSelectFeature(feature.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{feature.name}</p>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={feature.status === 'active' ? 'default' : 'secondary'}>
                        {feature.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>{feature.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewFeature(feature)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditFeature(feature)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`feature-toggle-${feature.id}`}
                            checked={feature.status === 'active'}
                            onCheckedChange={() => handleToggleFeature(feature.id, feature.status)}
                          />
                          <Label htmlFor={`feature-toggle-${feature.id}`} className="sr-only">
                            Toggle {feature.name}
                          </Label>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleFeatureSettings(feature)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredFeatures.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No features found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <p className="text-sm text-gray-500">
              Showing {filteredFeatures.length} of {featureData.length} features
            </p>
          </CardFooter>
        </Card>
      </div>

      <ActionDialog
        type={dialogState.type!}
        title={dialogState.title}
        data={dialogState.data}
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        onSave={handleSave}
      />
    </>
  );
};

export default FeatureManager;

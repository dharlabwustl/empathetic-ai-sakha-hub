
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Settings, 
  Trash2,
  Brain,
  Users,
  BookOpen,
  CreditCard,
  Calendar,
  Palette,
  Box,
  Bell,
  PieChart,
  Shield
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ActionDialog from "@/components/admin/dialogs/ActionDialog";
import { useActionDialog } from "@/hooks/useActionDialog";

interface Feature {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'ai' | 'content' | 'premium' | 'experimental';
  status: 'active' | 'inactive' | 'beta';
  isPremium: boolean;
  icon: React.ReactNode;
  path: string;
  lastUpdated: string;
  usageCount?: number;
}

const UnifiedFeaturesManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { toast } = useToast();
  const { dialogState, openDialog, closeDialog } = useActionDialog();

  const allFeatures: Feature[] = [
    // Core Features
    {
      id: "dashboard-overview",
      name: "Dashboard Overview",
      description: "Main student dashboard with KPIs and overview",
      category: "core",
      status: "active",
      isPremium: false,
      icon: <PieChart className="h-4 w-4" />,
      path: "/dashboard",
      lastUpdated: "2024-01-15",
      usageCount: 15420
    },
    {
      id: "todays-plan",
      name: "Today's Plan",
      description: "Personalized daily study schedule",
      category: "core",
      status: "active",
      isPremium: false,
      icon: <Calendar className="h-4 w-4" />,
      path: "/dashboard/today",
      lastUpdated: "2024-01-14",
      usageCount: 12350
    },
    {
      id: "concept-cards",
      name: "Concept Cards",
      description: "Interactive learning concept cards",
      category: "content",
      status: "active",
      isPremium: false,
      icon: <BookOpen className="h-4 w-4" />,
      path: "/dashboard/concepts",
      lastUpdated: "2024-01-13",
      usageCount: 9800
    },
    {
      id: "flashcards",
      name: "Flashcards",
      description: "Smart spaced repetition flashcards",
      category: "content",
      status: "active",
      isPremium: false,
      icon: <Brain className="h-4 w-4" />,
      path: "/dashboard/flashcards",
      lastUpdated: "2024-01-12",
      usageCount: 8750
    },
    {
      id: "practice-exams",
      name: "Practice Exams",
      description: "Mock tests and practice examinations",
      category: "content",
      status: "active",
      isPremium: true,
      icon: <BookOpen className="h-4 w-4" />,
      path: "/dashboard/practice-exam",
      lastUpdated: "2024-01-11",
      usageCount: 6420
    },
    
    // AI Features
    {
      id: "academic-advisor",
      name: "Academic Advisor",
      description: "AI-powered academic guidance and planning",
      category: "ai",
      status: "active",
      isPremium: true,
      icon: <Brain className="h-4 w-4" />,
      path: "/dashboard/academic",
      lastUpdated: "2024-01-10",
      usageCount: 5240
    },
    {
      id: "ai-tutor",
      name: "24/7 AI Tutor",
      description: "Round-the-clock AI tutoring assistance",
      category: "ai",
      status: "active",
      isPremium: true,
      icon: <Brain className="h-4 w-4" />,
      path: "/dashboard/tutor",
      lastUpdated: "2024-01-09",
      usageCount: 7890
    },
    {
      id: "mood-based-learning",
      name: "Mood-Based Learning",
      description: "Adaptive learning based on student mood",
      category: "ai",
      status: "beta",
      isPremium: true,
      icon: <Palette className="h-4 w-4" />,
      path: "/dashboard/mood-learning",
      lastUpdated: "2024-01-08",
      usageCount: 1240
    },
    
    // Premium Features
    {
      id: "batch-management",
      name: "Batch Management",
      description: "Group study and batch collaboration",
      category: "premium",
      status: "active",
      isPremium: true,
      icon: <Users className="h-4 w-4" />,
      path: "/dashboard/batch",
      lastUpdated: "2024-01-07",
      usageCount: 890
    },
    {
      id: "3d-models",
      name: "3D Models & Visualization",
      description: "Interactive 3D models for science concepts",
      category: "experimental",
      status: "beta",
      isPremium: true,
      icon: <Box className="h-4 w-4" />,
      path: "/dashboard/3d-models",
      lastUpdated: "2024-01-06",
      usageCount: 450
    },
    {
      id: "subscription-management",
      name: "Subscription Management",
      description: "Manage subscription plans and billing",
      category: "premium",
      status: "active",
      isPremium: false,
      icon: <CreditCard className="h-4 w-4" />,
      path: "/dashboard/subscription",
      lastUpdated: "2024-01-05",
      usageCount: 2340
    },
    {
      id: "billing-history",
      name: "Billing & Payment History",
      description: "Track payments and billing history",
      category: "premium",
      status: "active",
      isPremium: false,
      icon: <CreditCard className="h-4 w-4" />,
      path: "/dashboard/billing",
      lastUpdated: "2024-01-04",
      usageCount: 1890
    },
    {
      id: "notifications",
      name: "Smart Notifications",
      description: "Intelligent notification system",
      category: "core",
      status: "active",
      isPremium: false,
      icon: <Bell className="h-4 w-4" />,
      path: "/dashboard/notifications",
      lastUpdated: "2024-01-03",
      usageCount: 3450
    },
    {
      id: "progress-analytics",
      name: "Advanced Progress Analytics",
      description: "Detailed analytics and progress tracking",
      category: "premium",
      status: "active",
      isPremium: true,
      icon: <PieChart className="h-4 w-4" />,
      path: "/dashboard/analytics",
      lastUpdated: "2024-01-02",
      usageCount: 2180
    },
    {
      id: "parental-controls",
      name: "Parental Controls",
      description: "Parent dashboard and monitoring tools",
      category: "premium",
      status: "inactive",
      isPremium: true,
      icon: <Shield className="h-4 w-4" />,
      path: "/dashboard/parental",
      lastUpdated: "2024-01-01",
      usageCount: 0
    }
  ];

  const filteredFeatures = allFeatures.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || feature.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddFeature = () => {
    openDialog('add', 'New Feature', {
      name: '',
      description: '',
      category: 'core',
      status: 'active',
      isPremium: false,
      path: ''
    });
  };

  const handleViewFeature = (feature: Feature) => {
    openDialog('view', feature.name, {
      id: feature.id,
      name: feature.name,
      description: feature.description,
      category: feature.category,
      status: feature.status,
      isPremium: feature.isPremium,
      path: feature.path,
      lastUpdated: feature.lastUpdated,
      usageCount: feature.usageCount
    });
  };

  const handleEditFeature = (feature: Feature) => {
    openDialog('edit', feature.name, {
      id: feature.id,
      name: feature.name,
      description: feature.description,
      category: feature.category,
      status: feature.status,
      isPremium: feature.isPremium,
      path: feature.path
    });
  };

  const handleFeatureSettings = (feature: Feature) => {
    openDialog('settings', feature.name, {
      id: feature.id,
      name: feature.name,
      activeStatus: feature.status === 'active',
      permissions: 'Standard Access',
      notifications: 'Enabled'
    });
  };

  const handleDeleteFeature = (feature: Feature) => {
    openDialog('delete', feature.name, {
      id: feature.id,
      name: feature.name
    });
  };

  const handleToggleFeature = (featureId: string) => {
    toast({
      title: "Feature Updated",
      description: "Feature status has been updated successfully.",
    });
  };

  const handleSave = (data: any) => {
    toast({
      title: "Success",
      description: `${data.name} has been saved successfully.`,
    });
  };

  const handleConfirm = () => {
    const actionType = dialogState.type === 'delete' ? 'deleted' : 'processed';
    toast({
      title: "Success",
      description: `${dialogState.title} has been ${actionType}.`,
      variant: dialogState.type === 'delete' ? 'destructive' : 'default'
    });
  };

  const getCategoryStats = () => {
    const stats = {
      total: allFeatures.length,
      active: allFeatures.filter(f => f.status === 'active').length,
      premium: allFeatures.filter(f => f.isPremium).length,
      beta: allFeatures.filter(f => f.status === 'beta').length
    };
    return stats;
  };

  const categoryTabs = [
    { id: "all", label: "All Features", count: allFeatures.length },
    { id: "core", label: "Core", count: allFeatures.filter(f => f.category === 'core').length },
    { id: "ai", label: "AI Features", count: allFeatures.filter(f => f.category === 'ai').length },
    { id: "content", label: "Content", count: allFeatures.filter(f => f.category === 'content').length },
    { id: "premium", label: "Premium", count: allFeatures.filter(f => f.category === 'premium').length },
    { id: "experimental", label: "Experimental", count: allFeatures.filter(f => f.category === 'experimental').length }
  ];

  const stats = getCategoryStats();

  return (
    <>
      <div className="space-y-6">
        {/* Header with stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Features</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Settings className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Premium</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.premium}</p>
                </div>
                <CreditCard className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Beta</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.beta}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Unified Features Management
              </CardTitle>
              <Button onClick={handleAddFeature}>
                <Plus className="mr-2 h-4 w-4" />
                Add Feature
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search features..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
              <TabsList className="grid w-full grid-cols-6">
                {categoryTabs.map(tab => (
                  <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
                    {tab.label} ({tab.count})
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <div className="rounded-md border">
              <div className="grid grid-cols-9 gap-4 p-4 bg-muted/50 font-medium text-sm">
                <div>Feature</div>
                <div>Category</div>
                <div>Status</div>
                <div>Type</div>
                <div>Path</div>
                <div>Usage</div>
                <div>Last Updated</div>
                <div>Toggle</div>
                <div>Actions</div>
              </div>
              
              {filteredFeatures.map((feature) => (
                <div key={feature.id} className="grid grid-cols-9 gap-4 p-4 border-t">
                  <div className="flex items-center gap-2">
                    {feature.icon}
                    <div>
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{feature.description}</div>
                    </div>
                  </div>
                  <div>
                    <Badge variant="outline" className="capitalize">
                      {feature.category}
                    </Badge>
                  </div>
                  <div>
                    <Badge 
                      variant="outline" 
                      className={
                        feature.status === 'active' ? 'bg-green-100 text-green-700' :
                        feature.status === 'beta' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }
                    >
                      {feature.status}
                    </Badge>
                  </div>
                  <div>
                    <Badge variant={feature.isPremium ? "default" : "secondary"}>
                      {feature.isPremium ? "Premium" : "Free"}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">{feature.path}</div>
                  <div className="text-sm">{feature.usageCount?.toLocaleString() || '0'}</div>
                  <div className="text-sm text-muted-foreground">{feature.lastUpdated}</div>
                  <div>
                    <Switch
                      checked={feature.status === 'active'}
                      onCheckedChange={() => handleToggleFeature(feature.id)}
                    />
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleViewFeature(feature)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditFeature(feature)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleFeatureSettings(feature)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteFeature(feature)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ActionDialog
        type={dialogState.type!}
        title={dialogState.title}
        data={dialogState.data}
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        onSave={handleSave}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default UnifiedFeaturesManagementTab;

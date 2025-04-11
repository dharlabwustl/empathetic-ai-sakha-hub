
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminService } from "@/services/adminService";
import { AdminSettings } from "@/types/admin";

const SettingsPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await adminService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    
    setIsSaving(true);
    try {
      await adminService.updateSettings(settings);
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully."
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      [field]: value
    });
  };

  const handleModelChange = (index: number, field: string, value: any) => {
    if (!settings) return;
    
    const updatedModels = [...settings.aiModels];
    updatedModels[index] = {
      ...updatedModels[index],
      [field]: value
    };
    
    setSettings({
      ...settings,
      aiModels: updatedModels
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-medium">Loading settings...</h2>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-gray-500">Configure your Sakha AI admin portal settings</p>
      </div>
      
      <Tabs defaultValue="api" className="space-y-6">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <TabsTrigger value="api">API Configuration</TabsTrigger>
          <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
          <TabsTrigger value="content">Content Controls</TabsTrigger>
          <TabsTrigger value="database">Database Settings</TabsTrigger>
        </TabsList>
        
        {settings && (
          <>
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="apiUrl">Flask API URL</Label>
                        <Input
                          id="apiUrl"
                          value={settings.flaskApiUrl}
                          onChange={(e) => handleInputChange('flaskApiUrl', e.target.value)}
                          placeholder="https://api.example.com"
                        />
                        <p className="text-xs text-gray-500">The base URL for the Flask API endpoint</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="apiKey">API Key</Label>
                        <Input
                          id="apiKey"
                          value={settings.apiKey}
                          onChange={(e) => handleInputChange('apiKey', e.target.value)}
                          type="password"
                        />
                        <p className="text-xs text-gray-500">Used for authenticating API requests</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">AI Model Configurations</h3>
                    {settings.aiModels.map((model, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor={`model-${index}-name`}>Model Name</Label>
                              <Input
                                id={`model-${index}-name`}
                                value={model.modelName}
                                onChange={(e) => handleModelChange(index, 'modelName', e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`model-${index}-key`}>API Key</Label>
                              <Input
                                id={`model-${index}-key`}
                                value={model.apiKey}
                                onChange={(e) => handleModelChange(index, 'apiKey', e.target.value)}
                                type="password"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`model-${index}-temp`}>Temperature</Label>
                              <Input
                                id={`model-${index}-temp`}
                                value={model.temperature}
                                onChange={(e) => handleModelChange(index, 'temperature', parseFloat(e.target.value))}
                                type="number"
                                min="0"
                                max="1"
                                step="0.1"
                              />
                              <p className="text-xs text-gray-500">Controls randomness (0-1)</p>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`model-${index}-tokens`}>Max Tokens</Label>
                              <Input
                                id={`model-${index}-tokens`}
                                value={model.maxTokens}
                                onChange={(e) => handleModelChange(index, 'maxTokens', parseInt(e.target.value))}
                                type="number"
                                min="1"
                              />
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`model-${index}-active`}
                                checked={model.active}
                                onCheckedChange={(checked) => handleModelChange(index, 'active', checked)}
                              />
                              <Label htmlFor={`model-${index}-active`}>Active</Label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button variant="outline">Add Model</Button>
                  </div>
                  
                  <Button 
                    className="w-full sm:w-auto"
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save API Settings"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="maxNotifications">Maximum Notifications Per Day</Label>
                      <Input
                        id="maxNotifications"
                        type="number"
                        value={settings.notificationSettings.maxPerDay}
                        onChange={(e) => handleInputChange('notificationSettings', {
                          ...settings.notificationSettings,
                          maxPerDay: parseInt(e.target.value)
                        })}
                      />
                      <p className="text-xs text-gray-500">Max notifications a user can receive per day</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quietStart">Quiet Hours Start</Label>
                        <Input
                          id="quietStart"
                          type="number"
                          min="0"
                          max="23"
                          value={settings.notificationSettings.quietHoursStart}
                          onChange={(e) => handleInputChange('notificationSettings', {
                            ...settings.notificationSettings,
                            quietHoursStart: parseInt(e.target.value)
                          })}
                        />
                        <p className="text-xs text-gray-500">24-hour format (0-23)</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="quietEnd">Quiet Hours End</Label>
                        <Input
                          id="quietEnd"
                          type="number"
                          min="0"
                          max="23"
                          value={settings.notificationSettings.quietHoursEnd}
                          onChange={(e) => handleInputChange('notificationSettings', {
                            ...settings.notificationSettings,
                            quietHoursEnd: parseInt(e.target.value)
                          })}
                        />
                        <p className="text-xs text-gray-500">24-hour format (0-23)</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full sm:w-auto"
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Notification Settings"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="approvalRequired"
                        checked={settings.contentApprovalRequired}
                        onCheckedChange={(checked) => handleInputChange('contentApprovalRequired', checked)}
                      />
                      <Label htmlFor="approvalRequired">Require Manual Approval for AI-Generated Content</Label>
                    </div>
                    <p className="text-sm text-gray-500">
                      When enabled, all AI-generated content (flashcards, concepts, questions) must be approved by an admin before being shown to students.
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full sm:w-auto"
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Content Settings"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="database">
              <Card>
                <CardHeader>
                  <CardTitle>Database Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="dbHost">Database Host</Label>
                      <Input
                        id="dbHost"
                        placeholder="localhost"
                        disabled
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dbPort">Database Port</Label>
                      <Input
                        id="dbPort"
                        placeholder="3306"
                        disabled
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dbName">Database Name</Label>
                      <Input
                        id="dbName"
                        placeholder="sakha_ai_db"
                        disabled
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dbUser">Database User</Label>
                      <Input
                        id="dbUser"
                        placeholder="sakha_admin"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded border border-amber-200 text-amber-800 text-sm">
                    <p className="font-medium">Database settings are currently managed via Flask config files</p>
                    <p className="mt-1">Please contact your system administrator to modify database connection settings.</p>
                  </div>
                  
                  <div className="bg-emerald-50 p-4 rounded border border-emerald-200 text-emerald-800 text-sm">
                    <p className="font-medium">Database status: Connected</p>
                    <p className="mt-1">Last backup: Today at 04:00 AM</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button variant="outline">
                      Trigger Manual Backup
                    </Button>
                    <Button variant="outline" className="text-amber-600 hover:text-amber-700">
                      Clear Cache
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </AdminLayout>
  );
};

export default SettingsPage;

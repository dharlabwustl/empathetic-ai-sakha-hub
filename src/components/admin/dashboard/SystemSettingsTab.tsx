
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import DocumentationGenerator from '../documentation/DocumentationGenerator';
import { 
  Settings, 
  Database, 
  Shield, 
  Bell, 
  Mail, 
  Globe, 
  Palette,
  FileText,
  Save,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

const SystemSettingsTab: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    maintenance: false,
    registration: true,
    notifications: true,
    emailVerification: true,
    aiGeneration: true,
    dataRetention: 365,
    maxFileSize: 50,
    sessionTimeout: 30
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully",
    });
  };

  const resetSettings = () => {
    setSettings({
      maintenance: false,
      registration: true,
      notifications: true,
      emailVerification: true,
      aiGeneration: true,
      dataRetention: 365,
      maxFileSize: 50,
      sessionTimeout: 30
    });
    
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to defaults",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Settings & Documentation
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure system-wide settings and generate documentation
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="ai-settings">AI Settings</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Maintenance Mode</label>
                  <p className="text-sm text-gray-500">Enable to temporarily disable the platform</p>
                </div>
                <Switch
                  checked={settings.maintenance}
                  onCheckedChange={(checked) => handleSettingChange('maintenance', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">User Registration</label>
                  <p className="text-sm text-gray-500">Allow new users to register</p>
                </div>
                <Switch
                  checked={settings.registration}
                  onCheckedChange={(checked) => handleSettingChange('registration', checked)}
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Session Timeout (minutes)</label>
                <Input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  className="max-w-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Max File Upload Size (MB)</label>
                <Input
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                  className="max-w-xs"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Email Verification Required</label>
                  <p className="text-sm text-gray-500">Require email verification for new accounts</p>
                </div>
                <Switch
                  checked={settings.emailVerification}
                  onCheckedChange={(checked) => handleSettingChange('emailVerification', checked)}
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Data Retention Period (days)</label>
                <Input
                  type="number"
                  value={settings.dataRetention}
                  onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                  className="max-w-xs"
                />
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Security Notice</h4>
                    <p className="text-sm text-yellow-700">
                      Changes to security settings will affect all users. Please review carefully before saving.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">System Notifications</label>
                  <p className="text-sm text-gray-500">Enable system-wide notifications</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Email Notifications</h4>
                  <div className="space-y-2">
                    <Badge variant="outline">Study Reminders</Badge>
                    <Badge variant="outline">Payment Alerts</Badge>
                    <Badge variant="outline">Content Updates</Badge>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Push Notifications</h4>
                  <div className="space-y-2">
                    <Badge variant="outline">Mood Check-ins</Badge>
                    <Badge variant="outline">Study Streaks</Badge>
                    <Badge variant="outline">Goal Achievements</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                AI Model Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">AI Content Generation</label>
                  <p className="text-sm text-gray-500">Enable AI-powered content generation</p>
                </div>
                <Switch
                  checked={settings.aiGeneration}
                  onCheckedChange={(checked) => handleSettingChange('aiGeneration', checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Content Generation</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span>GPT-4</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accuracy:</span>
                      <span>94%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Mood Analysis</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span>Sentiment-v2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accuracy:</span>
                      <span>91%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Study Planning</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span>Planning-v3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accuracy:</span>
                      <span>89%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Database Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2.1GB</div>
                  <div className="text-sm text-gray-500">Database Size</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">1,234</div>
                  <div className="text-sm text-gray-500">Total Users</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">45,678</div>
                  <div className="text-sm text-gray-500">Content Items</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Backup Database
                </Button>
                <Button variant="outline" className="gap-2">
                  <Database className="h-4 w-4" />
                  Optimize
                </Button>
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Export Schema
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <DocumentationGenerator />
        </TabsContent>
      </Tabs>

      {/* Save/Reset Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">System Configuration</h3>
              <p className="text-sm text-gray-500">Save changes or reset to defaults</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetSettings}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button onClick={saveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettingsTab;

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminSettings } from "@/types/admin";

const mockSettings: AdminSettings = {
  notificationsEnabled: true,
  emailAlerts: true,
  dashboardRefreshInterval: 5,
  theme: 'light',
  analyticsEnabled: true,
  autoLogout: false,
  logoutTimeoutMinutes: 30,
  aiModels: ['gpt-3.5-turbo', 'gpt-4'],
  flaskApiUrl: 'https://api.example.com',
  apiKey: '***************',
  notificationSettings: {
    userSignup: true,
    paymentSuccess: true,
    systemErrors: true
  },
  contentApprovalRequired: false
};

interface AiModelSettings {
  modelName: string;
  apiKey: string;
  temperature: number;
  maxTokens: number;
  active: boolean;
}

const SettingsPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<AdminSettings>(mockSettings);
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [aiModels, setAiModels] = useState<AiModelSettings[]>([
    {
      modelName: "gpt-3.5-turbo",
      apiKey: "sk-**********",
      temperature: 0.7,
      maxTokens: 1000,
      active: true
    },
    {
      modelName: "gpt-4",
      apiKey: "sk-**********",
      temperature: 0.8,
      maxTokens: 2000,
      active: false
    }
  ]);
  
  const [apiSettings, setApiSettings] = useState({
    flaskApiUrl: "https://api.example.com",
    apiKey: "api-key-12345",
    enableRateLimiting: true,
    maxRequestsPerMinute: 100
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: 587,
    smtpUser: "notifications@example.com",
    smtpPassword: "**********",
    senderName: "Study App Notifications",
    senderEmail: "notifications@example.com"
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setSettings(mockSettings);
      
      toast({
        title: "Settings Loaded",
        description: "Admin settings have been loaded successfully"
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Error loading settings:", error);
      toast({
        title: "Error",
        description: "Failed to load admin settings",
        variant: "destructive"
      });
      
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings Saved",
        description: "Admin settings have been updated successfully"
      });
      
      setSaving(false);
    } catch (error) {
      console.error("Error saving settings:", error);
      
      toast({
        title: "Error",
        description: "Failed to save admin settings",
        variant: "destructive"
      });
      
      setSaving(false);
    }
  };

  const handleSettingsChange = (key: keyof AdminSettings, value: any) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };
  
  const handleAiModelChange = (index: number, field: keyof AiModelSettings, value: string | number | boolean) => {
    const updatedModels = [...aiModels];
    updatedModels[index] = {
      ...updatedModels[index],
      [field]: value
    };
    setAiModels(updatedModels);
  };
  
  const handleApiSettingsChange = (field: string, value: string | number | boolean) => {
    setApiSettings({
      ...apiSettings,
      [field]: value
    });
  };
  
  const handleEmailSettingsChange = (field: string, value: string | number) => {
    setEmailSettings({
      ...emailSettings,
      [field]: value
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          <p>Loading settings...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <Button onClick={handleSaveSettings} disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="ai-models">AI Models</TabsTrigger>
            <TabsTrigger value="api">API & Integration</TabsTrigger>
            <TabsTrigger value="emails">Email Settings</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic settings for the admin dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications-enabled">Enable Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Show notifications in the admin dashboard
                      </p>
                    </div>
                    <Switch
                      id="notifications-enabled"
                      checked={settings.notificationsEnabled}
                      onCheckedChange={(checked) => handleSettingsChange('notificationsEnabled', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-alerts">Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive critical alerts via email
                      </p>
                    </div>
                    <Switch
                      id="email-alerts"
                      checked={settings.emailAlerts}
                      onCheckedChange={(checked) => handleSettingsChange('emailAlerts', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analytics-enabled">Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Collect usage data for analytics
                      </p>
                    </div>
                    <Switch
                      id="analytics-enabled"
                      checked={settings.analyticsEnabled}
                      onCheckedChange={(checked) => handleSettingsChange('analyticsEnabled', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="refresh-interval">Dashboard Refresh Interval (minutes)</Label>
                    <Input
                      id="refresh-interval"
                      type="number"
                      min="1"
                      max="60"
                      value={settings.dashboardRefreshInterval}
                      onChange={(e) => handleSettingsChange('dashboardRefreshInterval', Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="theme-light"
                          name="theme"
                          value="light"
                          checked={settings.theme === 'light'}
                          onChange={() => handleSettingsChange('theme', 'light')}
                          className="h-4 w-4"
                        />
                        <Label htmlFor="theme-light">Light</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="theme-dark"
                          name="theme"
                          value="dark"
                          checked={settings.theme === 'dark'}
                          onChange={() => handleSettingsChange('theme', 'dark')}
                          className="h-4 w-4"
                        />
                        <Label htmlFor="theme-dark">Dark</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="theme-system"
                          name="theme"
                          value="system"
                          checked={settings.theme === 'system'}
                          onChange={() => handleSettingsChange('theme', 'system')}
                          className="h-4 w-4"
                        />
                        <Label htmlFor="theme-system">System</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Content Settings</CardTitle>
                <CardDescription>
                  Configure content moderation and approval
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="content-approval">Content Approval Required</Label>
                    <p className="text-sm text-muted-foreground">
                      Require admin approval for new content
                    </p>
                  </div>
                  <Switch
                    id="content-approval"
                    checked={settings.contentApprovalRequired || false}
                    onCheckedChange={(checked) => handleSettingsChange('contentApprovalRequired', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai-models" className="space-y-4">
            {aiModels.map((model, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>AI Model Configuration</CardTitle>
                  <CardDescription>
                    {model.modelName} settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor={`model-name-${index}`}>Model Name</Label>
                    <Input
                      id={`model-name-${index}`}
                      value={model.modelName}
                      onChange={(e) => handleAiModelChange(index, 'modelName', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`api-key-${index}`}>API Key</Label>
                    <Input
                      id={`api-key-${index}`}
                      type="password"
                      value={model.apiKey}
                      onChange={(e) => handleAiModelChange(index, 'apiKey', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`temperature-${index}`}>Temperature (0.0 - 1.0)</Label>
                    <Input
                      id={`temperature-${index}`}
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={model.temperature}
                      onChange={(e) => handleAiModelChange(index, 'temperature', parseFloat(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`max-tokens-${index}`}>Max Tokens</Label>
                    <Input
                      id={`max-tokens-${index}`}
                      type="number"
                      value={model.maxTokens}
                      onChange={(e) => handleAiModelChange(index, 'maxTokens', parseInt(e.target.value, 10))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor={`active-${index}`}>Active</Label>
                      <p className="text-sm text-muted-foreground">
                        Is this model currently in use?
                      </p>
                    </div>
                    <Switch
                      id={`active-${index}`}
                      checked={model.active}
                      onCheckedChange={(checked) => handleAiModelChange(index, 'active', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API & Integration</CardTitle>
                <CardDescription>
                  Configure API settings and integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="flask-api-url">Flask API URL</Label>
                      <p className="text-sm text-muted-foreground">
                        The base URL for the Flask API endpoint
                      </p>
                    </div>
                    <Input
                      id="flask-api-url"
                      value={apiSettings.flaskApiUrl}
                      onChange={(e) => handleApiSettingsChange('flaskApiUrl', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="api-key">API Key</Label>
                      <p className="text-sm text-muted-foreground">
                        Used for authenticating API requests
                      </p>
                    </div>
                    <Input
                      id="api-key"
                      type="password"
                      value={apiSettings.apiKey}
                      onChange={(e) => handleApiSettingsChange('apiKey', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-rate-limiting">Enable Rate Limiting</Label>
                      <p className="text-sm text-muted-foreground">
                        Limit the number of requests per minute
                      </p>
                    </div>
                    <Switch
                      id="enable-rate-limiting"
                      checked={apiSettings.enableRateLimiting}
                      onCheckedChange={(checked) => handleApiSettingsChange('enableRateLimiting', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="max-requests-per-minute">Max Requests Per Minute</Label>
                      <p className="text-sm text-muted-foreground">
                        Maximum number of requests allowed per minute
                      </p>
                    </div>
                    <Input
                      id="max-requests-per-minute"
                      type="number"
                      value={apiSettings.maxRequestsPerMinute}
                      onChange={(e) => handleApiSettingsChange('maxRequestsPerMinute', Number(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="emails" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>
                  Configure email settings for notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="smtp-server">SMTP Server</Label>
                      <p className="text-sm text-muted-foreground">
                        The SMTP server address
                      </p>
                    </div>
                    <Input
                      id="smtp-server"
                      value={emailSettings.smtpServer}
                      onChange={(e) => handleEmailSettingsChange('smtpServer', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <p className="text-sm text-muted-foreground">
                        The SMTP port number
                      </p>
                    </div>
                    <Input
                      id="smtp-port"
                      type="number"
                      value={emailSettings.smtpPort}
                      onChange={(e) => handleEmailSettingsChange('smtpPort', Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="smtp-user">SMTP User</Label>
                      <p className="text-sm text-muted-foreground">
                        The SMTP username
                      </p>
                    </div>
                    <Input
                      id="smtp-user"
                      value={emailSettings.smtpUser}
                      onChange={(e) => handleEmailSettingsChange('smtpUser', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="smtp-password">SMTP Password</Label>
                      <p className="text-sm text-muted-foreground">
                        The SMTP password
                      </p>
                    </div>
                    <Input
                      id="smtp-password"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => handleEmailSettingsChange('smtpPassword', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sender-name">Sender Name</Label>
                      <p className="text-sm text-muted-foreground">
                        The name to display in email notifications
                      </p>
                    </div>
                    <Input
                      id="sender-name"
                      value={emailSettings.senderName}
                      onChange={(e) => handleEmailSettingsChange('senderName', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sender-email">Sender Email</Label>
                      <p className="text-sm text-muted-foreground">
                        The email address to use for sending notifications
                      </p>
                    </div>
                    <Input
                      id="sender-email"
                      value={emailSettings.senderEmail}
                      onChange={(e) => handleEmailSettingsChange('senderEmail', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Configure security settings for the admin dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-logout">Auto Logout</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out users after a certain period
                      </p>
                    </div>
                    <Switch
                      id="auto-logout"
                      checked={settings.autoLogout}
                      onCheckedChange={(checked) => handleSettingsChange('autoLogout', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="logout-timeout">Logout Timeout (minutes)</Label>
                      <p className="text-sm text-muted-foreground">
                        The duration before a user is automatically logged out
                      </p>
                    </div>
                    <Input
                      id="logout-timeout"
                      type="number"
                      value={settings.logoutTimeoutMinutes}
                      onChange={(e) => handleSettingsChange('logoutTimeoutMinutes', Number(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;

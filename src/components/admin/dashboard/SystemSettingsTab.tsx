
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Database, Globe, Bell, Shield, Zap, Save, RotateCcw } from 'lucide-react';

const SystemSettingsTab: React.FC = () => {
  const [settings, setSettings] = useState({
    // General Settings
    systemName: 'PrepZR Admin Dashboard',
    systemVersion: '2.1.0',
    maintenanceMode: false,
    debugMode: false,
    
    // Database Settings
    dbHost: 'localhost',
    dbPort: '5432',
    dbName: 'prepzr_db',
    maxConnections: 100,
    connectionTimeout: 30,
    
    // API Settings
    apiBaseUrl: 'https://api.prepzr.com',
    rateLimitEnabled: true,
    maxRequestsPerHour: 1000,
    apiTimeout: 30,
    
    // Flask Integration
    flaskHost: 'localhost',
    flaskPort: '5000',
    flaskDebug: false,
    secretKey: '***************',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    slackWebhook: '',
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    passwordComplexity: true,
    
    // Performance Settings
    cacheEnabled: true,
    cacheTimeout: 300,
    compressionEnabled: true,
    cdnEnabled: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // In real implementation, this would make an API call to save settings
  };

  const handleReset = () => {
    // Reset to default values
    console.log('Resetting settings to defaults');
  };

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Settings</CardTitle>
              <p className="text-sm text-gray-600">Configure system-wide settings and integrations</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Settings Tabs */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="flask">Flask</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">System Name</label>
                  <Input
                    value={settings.systemName}
                    onChange={(e) => handleSettingChange('systemName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">System Version</label>
                  <Input
                    value={settings.systemVersion}
                    onChange={(e) => handleSettingChange('systemVersion', e.target.value)}
                    disabled
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Maintenance Mode</span>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Debug Mode</span>
                  <Switch
                    checked={settings.debugMode}
                    onCheckedChange={(checked) => handleSettingChange('debugMode', checked)}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Database Settings */}
            <TabsContent value="database" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Database Host</label>
                  <Input
                    value={settings.dbHost}
                    onChange={(e) => handleSettingChange('dbHost', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Database Port</label>
                  <Input
                    value={settings.dbPort}
                    onChange={(e) => handleSettingChange('dbPort', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Database Name</label>
                  <Input
                    value={settings.dbName}
                    onChange={(e) => handleSettingChange('dbName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Connections</label>
                  <Input
                    type="number"
                    value={settings.maxConnections}
                    onChange={(e) => handleSettingChange('maxConnections', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Connection Timeout (seconds)</label>
                  <Input
                    type="number"
                    value={settings.connectionTimeout}
                    onChange={(e) => handleSettingChange('connectionTimeout', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* API Settings */}
            <TabsContent value="api" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">API Base URL</label>
                  <Input
                    value={settings.apiBaseUrl}
                    onChange={(e) => handleSettingChange('apiBaseUrl', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">API Timeout (seconds)</label>
                  <Input
                    type="number"
                    value={settings.apiTimeout}
                    onChange={(e) => handleSettingChange('apiTimeout', parseInt(e.target.value))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Rate Limiting Enabled</span>
                  <Switch
                    checked={settings.rateLimitEnabled}
                    onCheckedChange={(checked) => handleSettingChange('rateLimitEnabled', checked)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Requests Per Hour</label>
                  <Input
                    type="number"
                    value={settings.maxRequestsPerHour}
                    onChange={(e) => handleSettingChange('maxRequestsPerHour', parseInt(e.target.value))}
                    disabled={!settings.rateLimitEnabled}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Flask Integration */}
            <TabsContent value="flask" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Flask Host</label>
                  <Input
                    value={settings.flaskHost}
                    onChange={(e) => handleSettingChange('flaskHost', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Flask Port</label>
                  <Input
                    value={settings.flaskPort}
                    onChange={(e) => handleSettingChange('flaskPort', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Secret Key</label>
                  <Input
                    type="password"
                    value={settings.secretKey}
                    onChange={(e) => handleSettingChange('secretKey', e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Flask Debug Mode</span>
                  <Switch
                    checked={settings.flaskDebug}
                    onCheckedChange={(checked) => handleSettingChange('flaskDebug', checked)}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email Notifications</span>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">SMS Notifications</span>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Push Notifications</span>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slack Webhook URL</label>
                  <Input
                    value={settings.slackWebhook}
                    onChange={(e) => handleSettingChange('slackWebhook', e.target.value)}
                    placeholder="https://hooks.slack.com/..."
                  />
                </div>
              </div>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Two-Factor Authentication</span>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Timeout (minutes)</label>
                  <Input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Login Attempts</label>
                  <Input
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Password Complexity Required</span>
                  <Switch
                    checked={settings.passwordComplexity}
                    onCheckedChange={(checked) => handleSettingChange('passwordComplexity', checked)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Performance Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cache Enabled</span>
              <Switch
                checked={settings.cacheEnabled}
                onCheckedChange={(checked) => handleSettingChange('cacheEnabled', checked)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cache Timeout (seconds)</label>
              <Input
                type="number"
                value={settings.cacheTimeout}
                onChange={(e) => handleSettingChange('cacheTimeout', parseInt(e.target.value))}
                disabled={!settings.cacheEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Compression Enabled</span>
              <Switch
                checked={settings.compressionEnabled}
                onCheckedChange={(checked) => handleSettingChange('compressionEnabled', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">CDN Enabled</span>
              <Switch
                checked={settings.cdnEnabled}
                onCheckedChange={(checked) => handleSettingChange('cdnEnabled', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettingsTab;

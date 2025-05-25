
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, Database, Server, FileText, Download, Upload, 
  RefreshCw, CheckCircle, AlertTriangle, Globe, Shield,
  Code, BookOpen, FileJson, FileSpreadsheet, FileCode,
  Monitor, Bell, Zap, Users
} from 'lucide-react';
import ApiManagementTab from './settings/ApiManagementTab';
import DatabaseManagementTab from './settings/DatabaseManagementTab';
import DocumentationTab from './settings/DocumentationTab';
import SystemConfigurationTab from './settings/SystemConfigurationTab';

const SettingsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState("system");
  const { toast } = useToast();

  const settingsTabs = [
    { id: "system", label: "System Configuration", icon: Settings },
    { id: "api", label: "API Management", icon: Server },
    { id: "database", label: "Database Management", icon: Database },
    { id: "documentation", label: "Documentation", icon: FileText },
    { id: "integrations", label: "Integrations", icon: Globe },
    { id: "security", label: "Security", icon: Shield }
  ];

  const handleExportSettings = async () => {
    toast({
      title: "Settings Exported",
      description: "All settings have been exported successfully",
    });
  };

  const handleImportSettings = async () => {
    toast({
      title: "Settings Imported",
      description: "Settings configuration has been imported",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Configure system settings, APIs, database, and documentation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImportSettings} className="gap-2">
            <Upload className="h-4 w-4" />
            Import Settings
          </Button>
          <Button onClick={handleExportSettings} className="gap-2">
            <Download className="h-4 w-4" />
            Export Settings
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 mb-8">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="system">
          <SystemConfigurationTab />
        </TabsContent>

        <TabsContent value="api">
          <ApiManagementTab />
        </TabsContent>

        <TabsContent value="database">
          <DatabaseManagementTab />
        </TabsContent>

        <TabsContent value="documentation">
          <DocumentationTab />
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Integration Management
              </CardTitle>
              <CardDescription>
                Manage external integrations and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Flask Backend</CardTitle>
                    <CardDescription>Python Flask ML/AI backend integration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <p className="text-sm text-gray-600">API URL: http://localhost:5000</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Student Dashboard API</CardTitle>
                    <CardDescription>Student portal integration endpoints</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                    <p className="text-sm text-gray-600">Sync Status: Real-time</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage security configurations and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Require 2FA for admin access</p>
                  </div>
                  <Switch id="two-factor" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="api-rate-limit">API Rate Limiting</Label>
                    <p className="text-sm text-gray-600">Enable rate limiting for API endpoints</p>
                  </div>
                  <Switch id="api-rate-limit" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audit-logging">Audit Logging</Label>
                    <p className="text-sm text-gray-600">Log all admin actions</p>
                  </div>
                  <Switch id="audit-logging" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsModule;

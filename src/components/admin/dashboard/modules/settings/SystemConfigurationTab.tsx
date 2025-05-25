
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { Settings, Monitor, Bell, Zap, RefreshCw, CheckCircle } from 'lucide-react';

const SystemConfigurationTab: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings Saved",
        description: "System configuration has been updated successfully",
      });
    }, 1000);
  };

  const systemMetrics = [
    { label: "System Uptime", value: "99.9%", status: "healthy" },
    { label: "Active Users", value: "1,247", status: "healthy" },
    { label: "API Response Time", value: "142ms", status: "healthy" },
    { label: "Database Performance", value: "Optimal", status: "healthy" },
    { label: "Memory Usage", value: "68%", status: "warning" },
    { label: "Storage Used", value: "42%", status: "healthy" }
  ];

  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            System Status
          </CardTitle>
          <CardDescription>Real-time system health and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{metric.label}</p>
                  <p className="text-lg font-bold">{metric.value}</p>
                </div>
                <Badge 
                  variant={metric.status === 'healthy' ? 'default' : 'destructive'}
                  className={metric.status === 'healthy' ? 'bg-green-100 text-green-800' : ''}
                >
                  {metric.status === 'healthy' ? 'Healthy' : 'Warning'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            General Configuration
          </CardTitle>
          <CardDescription>Configure general system settings and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="app-name">Application Name</Label>
                <Input id="app-name" defaultValue="PREPZR Admin Dashboard" />
              </div>
              
              <div>
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" type="email" defaultValue="admin@prepzr.com" />
              </div>
              
              <div>
                <Label htmlFor="timezone">System Timezone</Label>
                <Input id="timezone" defaultValue="UTC" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-gray-600">Enable system maintenance mode</p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <p className="text-sm text-gray-600">Enable detailed error logging</p>
                </div>
                <Switch id="debug-mode" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-backup">Auto Backup</Label>
                  <p className="text-sm text-gray-600">Automatic daily database backups</p>
                </div>
                <Switch id="auto-backup" defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>Configure system notifications and alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Send email alerts for system events</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="slack-notifications">Slack Integration</Label>
                  <p className="text-sm text-gray-600">Send alerts to Slack channels</p>
                </div>
                <Switch id="slack-notifications" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-alerts">SMS Alerts</Label>
                  <p className="text-sm text-gray-600">Critical alerts via SMS</p>
                </div>
                <Switch id="sms-alerts" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-gray-600">Browser push notifications</p>
                </div>
                <Switch id="push-notifications" defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Performance Settings
          </CardTitle>
          <CardDescription>Optimize system performance and resource usage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="cache-duration">Cache Duration (minutes)</Label>
                <Input id="cache-duration" type="number" defaultValue="30" />
              </div>
              
              <div>
                <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                <Input id="session-timeout" type="number" defaultValue="24" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="max-upload-size">Max Upload Size (MB)</Label>
                <Input id="max-upload-size" type="number" defaultValue="50" />
              </div>
              
              <div>
                <Label htmlFor="api-rate-limit">API Rate Limit (requests/minute)</Label>
                <Input id="api-rate-limit" type="number" defaultValue="1000" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isLoading} className="gap-2">
          {isLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};

export default SystemConfigurationTab;

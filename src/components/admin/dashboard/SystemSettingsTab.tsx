
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings, Database, Globe, Mail, Shield, Cpu, Bell, Save } from 'lucide-react';

interface SystemSetting {
  id: string;
  category: string;
  name: string;
  description: string;
  type: 'boolean' | 'string' | 'number' | 'select';
  value: any;
  options?: string[];
  required?: boolean;
}

const SystemSettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<SystemSetting[]>([
    // General Settings
    {
      id: '1',
      category: 'General',
      name: 'Site Name',
      description: 'The name of your application',
      type: 'string',
      value: 'PREPZR',
      required: true
    },
    {
      id: '2',
      category: 'General',
      name: 'Maintenance Mode',
      description: 'Put the site in maintenance mode',
      type: 'boolean',
      value: false
    },
    {
      id: '3',
      category: 'General',
      name: 'Max Users Per Exam',
      description: 'Maximum number of users that can register for an exam',
      type: 'number',
      value: 1000
    },

    // Email Settings
    {
      id: '4',
      category: 'Email',
      name: 'SMTP Host',
      description: 'SMTP server hostname',
      type: 'string',
      value: 'smtp.gmail.com',
      required: true
    },
    {
      id: '5',
      category: 'Email',
      name: 'Email Notifications',
      description: 'Enable email notifications',
      type: 'boolean',
      value: true
    },
    {
      id: '6',
      category: 'Email',
      name: 'Daily Email Limit',
      description: 'Maximum emails to send per day',
      type: 'number',
      value: 10000
    },

    // Security Settings
    {
      id: '7',
      category: 'Security',
      name: 'Two Factor Authentication',
      description: 'Require 2FA for admin accounts',
      type: 'boolean',
      value: false
    },
    {
      id: '8',
      category: 'Security',
      name: 'Session Timeout',
      description: 'Auto-logout time in minutes',
      type: 'number',
      value: 30
    },
    {
      id: '9',
      category: 'Security',
      name: 'Password Policy',
      description: 'Password complexity requirements',
      type: 'select',
      value: 'strong',
      options: ['basic', 'medium', 'strong', 'enterprise']
    },

    // Database Settings
    {
      id: '10',
      category: 'Database',
      name: 'Auto Backup',
      description: 'Automatically backup database',
      type: 'boolean',
      value: true
    },
    {
      id: '11',
      category: 'Database',
      name: 'Backup Retention',
      description: 'Days to keep backup files',
      type: 'number',
      value: 30
    },

    // Performance Settings
    {
      id: '12',
      category: 'Performance',
      name: 'Cache Enabled',
      description: 'Enable application caching',
      type: 'boolean',
      value: true
    },
    {
      id: '13',
      category: 'Performance',
      name: 'API Rate Limit',
      description: 'Requests per hour per IP',
      type: 'number',
      value: 1000
    }
  ]);

  const updateSetting = (id: string, newValue: any) => {
    setSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === id ? { ...setting, value: newValue } : setting
      )
    );
  };

  const saveSettings = () => {
    // In a real app, this would save to the backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      'General': <Settings className="h-5 w-5" />,
      'Email': <Mail className="h-5 w-5" />,
      'Security': <Shield className="h-5 w-5" />,
      'Database': <Database className="h-5 w-5" />,
      'Performance': <Cpu className="h-5 w-5" />
    };
    return icons[category] || <Settings className="h-5 w-5" />;
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, SystemSetting[]>);

  const renderSettingControl = (setting: SystemSetting) => {
    switch (setting.type) {
      case 'boolean':
        return (
          <Switch
            checked={setting.value}
            onCheckedChange={(checked) => updateSetting(setting.id, checked)}
          />
        );
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => updateSetting(setting.id, e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md text-sm min-w-32"
          >
            {setting.options?.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        );
      case 'number':
        return (
          <Input
            type="number"
            value={setting.value}
            onChange={(e) => updateSetting(setting.id, parseInt(e.target.value) || 0)}
            className="w-32"
          />
        );
      default:
        return (
          <Input
            type="text"
            value={setting.value}
            onChange={(e) => updateSetting(setting.id, e.target.value)}
            className="w-64"
            required={setting.required}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Configure your application settings and preferences</p>
        </div>
        <Button onClick={saveSettings} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-xl font-bold text-green-600">Online</div>
              <div className="text-xs text-gray-500">System Status</div>
            </div>
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-xl font-bold text-blue-600">99.9%</div>
              <div className="text-xs text-gray-500">Uptime</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-xl font-bold text-purple-600">v2.1.4</div>
              <div className="text-xs text-gray-500">Version</div>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-xl font-bold text-orange-600">2.4GB</div>
              <div className="text-xs text-gray-500">Storage Used</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Categories */}
      {Object.entries(groupedSettings).map(([category, categorySettings]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getCategoryIcon(category)}
              {category} Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {categorySettings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{setting.name}</span>
                      {setting.required && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {setting.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    {renderSettingControl(setting)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Environment Variables */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Environment Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Database URL</label>
                <Input type="password" defaultValue="postgresql://..." />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Redis URL</label>
                <Input type="password" defaultValue="redis://..." />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">JWT Secret</label>
                <Input type="password" defaultValue="secret_key_here" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">API Base URL</label>
                <Input defaultValue="https://api.prepzr.com" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline">
                Update Environment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettingsTab;

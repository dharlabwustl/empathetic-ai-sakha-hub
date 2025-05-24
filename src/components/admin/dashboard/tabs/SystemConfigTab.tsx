
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Database, 
  Shield, 
  Server,
  Activity,
  CheckCircle,
  AlertTriangle,
  Wifi
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SystemConfigTab = () => {
  const { toast } = useToast();

  const flaskBackendStatus = [
    { service: "Authentication API", status: "online", uptime: "99.9%", responseTime: "120ms" },
    { service: "Study Plan Generator", status: "online", uptime: "99.7%", responseTime: "180ms" },
    { service: "Content Creation API", status: "online", uptime: "99.8%", responseTime: "200ms" },
    { service: "Mood Analysis Service", status: "online", uptime: "99.5%", responseTime: "95ms" },
    { service: "Voice Assistant API", status: "online", uptime: "99.6%", responseTime: "140ms" },
    { service: "Analytics Engine", status: "warning", uptime: "98.2%", responseTime: "250ms" }
  ];

  const systemSettings = [
    { setting: "AI Content Auto-Approval", enabled: true, description: "Automatically approve AI-generated content with >95% confidence" },
    { setting: "Adaptive Difficulty", enabled: true, description: "Dynamically adjust content difficulty based on performance" },
    { setting: "Mood-Based Adaptations", enabled: true, description: "Modify study plans based on student mood data" },
    { setting: "Predictive Analytics", enabled: true, description: "Enable predictive modeling for student outcomes" },
    { setting: "Voice Assistant", enabled: true, description: "24/7 intelligent voice assistant for all users" },
    { setting: "Auto Backup", enabled: true, description: "Automatic daily backups of all user data" }
  ];

  const securityMetrics = [
    { metric: "Failed Login Attempts", value: "12 (24h)", status: "normal" },
    { metric: "API Rate Limits Hit", value: "3 (1h)", status: "normal" },
    { metric: "Suspicious Activities", value: "0 (7d)", status: "secure" },
    { metric: "Data Encryption", value: "AES-256", status: "secure" }
  ];

  const handleRestartService = (serviceName: string) => {
    toast({
      title: "Restarting Service",
      description: `Restarting ${serviceName}...`,
      variant: "default"
    });
  };

  const handleToggleSetting = (settingName: string) => {
    toast({
      title: "Setting Updated",
      description: `${settingName} configuration updated`,
      variant: "default"
    });
  };

  const getStatusIcon = (status: string) => {
    return status === "online" || status === "secure" || status === "normal" ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  };

  const getStatusColor = (status: string) => {
    return status === "online" || status === "secure" || status === "normal" ? "text-green-600" : "text-yellow-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">System Configuration & Backend</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Flask backend services, security settings, and system configuration management
        </p>
      </div>

      {/* Flask Backend Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-blue-600" />
            Flask Backend Services Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flaskBackendStatus.map((service, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(service.status)}
                    <h4 className="font-semibold">{service.service}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={service.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {service.status}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => handleRestartService(service.service)}>
                      Restart
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Uptime:</span>
                    <div className={`font-semibold ${getStatusColor(service.status)}`}>{service.uptime}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Response Time:</span>
                    <div className="font-semibold text-blue-600">{service.responseTime}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-600" />
            AI System Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <div className="font-semibold">{setting.setting}</div>
                  <div className="text-sm text-muted-foreground">{setting.description}</div>
                </div>
                <Switch 
                  checked={setting.enabled} 
                  onCheckedChange={() => handleToggleSetting(setting.setting)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security & Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Security Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div>
                    <div className="font-semibold text-green-900 dark:text-green-100">{metric.metric}</div>
                    <div className="text-sm text-green-700 dark:text-green-300">{metric.value}</div>
                  </div>
                  {getStatusIcon(metric.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-600" />
              Database & Infrastructure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Database Health</div>
                  <div className="text-2xl font-bold text-purple-600">98.7%</div>
                </div>
                <Database className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">API Response Time</div>
                  <div className="text-2xl font-bold text-blue-600">127ms</div>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Network Uptime</div>
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                </div>
                <Wifi className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Overall System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">99.8%</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">147ms</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2.4TB</div>
              <div className="text-sm text-muted-foreground">Data Processed</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">15K</div>
              <div className="text-sm text-muted-foreground">API Calls/hour</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemConfigTab;

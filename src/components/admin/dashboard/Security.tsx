
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle, Lock, Key, UserCheck, Activity } from 'lucide-react';

const Security: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98%</div>
            <p className="text-xs text-muted-foreground">Excellent security posture</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,847</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">2FA Enabled</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">Of all users</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'warning', message: 'Multiple failed login attempts detected', time: '5 minutes ago' },
                { type: 'info', message: 'SSL certificate renewal due in 30 days', time: '2 hours ago' },
                { type: 'success', message: 'Security scan completed successfully', time: '1 day ago' },
                { type: 'warning', message: 'Unusual API activity detected', time: '2 days ago' }
              ].map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                  alert.type === 'success' ? 'border-green-500 bg-green-50' :
                  'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex items-start space-x-3">
                    {alert.type === 'warning' ? <AlertTriangle className="h-5 w-5 text-yellow-600" /> :
                     alert.type === 'success' ? <CheckCircle className="h-5 w-5 text-green-600" /> :
                     <Shield className="h-5 w-5 text-blue-600" />}
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm text-gray-600">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Access Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <UserCheck className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Admin Users</span>
                </div>
                <span className="font-bold">5</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Key className="h-5 w-5 text-green-600" />
                  <span className="font-medium">API Keys</span>
                </div>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Lock className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Active Tokens</span>
                </div>
                <span className="font-bold">847</span>
              </div>
              <Button className="w-full">Manage Permissions</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Authentication Settings</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Password Complexity</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Session Timeout</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Failed Login Lockout</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex justify-between items-center">
                  <span>2FA Enforcement</span>
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">System Security</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>SSL/TLS Encryption</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Database Encryption</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Backup Encryption</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Audit Logging</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;

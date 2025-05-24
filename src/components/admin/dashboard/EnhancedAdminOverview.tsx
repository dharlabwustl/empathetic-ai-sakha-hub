
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Activity, 
  DollarSign, 
  UserCheck, 
  Clock,
  Brain,
  Target,
  Heart,
  Zap
} from 'lucide-react';
import EnhancedKpiDashboard from '@/components/dashboard/EnhancedKpiDashboard';
import { useNavigate } from 'react-router-dom';

const EnhancedAdminOverview: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage student accounts and permissions',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      action: () => navigate('/admin/users'),
      color: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      title: 'Content Management',
      description: 'Upload and manage study materials',
      icon: <BookOpen className="w-6 h-6 text-green-600" />,
      action: () => navigate('/admin/content'),
      color: 'bg-green-50 hover:bg-green-100'
    },
    {
      title: 'Analytics & Reports',
      description: 'View detailed performance analytics',
      icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
      action: () => navigate('/admin/analytics'),
      color: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      title: 'Revenue Tracking',
      description: 'Monitor subscription and revenue metrics',
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      action: () => navigate('/admin/revenue'),
      color: 'bg-emerald-50 hover:bg-emerald-100'
    },
    {
      title: 'Study Plan Management',
      description: 'Create and manage study plans',
      icon: <Target className="w-6 h-6 text-orange-600" />,
      action: () => navigate('/admin/study-plans'),
      color: 'bg-orange-50 hover:bg-orange-100'
    },
    {
      title: 'Wellness Monitoring',
      description: 'Track student stress and wellness metrics',
      icon: <Heart className="w-6 h-6 text-pink-600" />,
      action: () => navigate('/admin/wellness'),
      color: 'bg-pink-50 hover:bg-pink-100'
    }
  ];

  const systemStatus = [
    { name: 'API Services', status: 'operational', uptime: '99.9%' },
    { name: 'Database', status: 'operational', uptime: '99.8%' },
    { name: 'Content Delivery', status: 'operational', uptime: '99.9%' },
    { name: 'Payment Gateway', status: 'maintenance', uptime: '98.5%' },
    { name: 'AI Services', status: 'operational', uptime: '99.7%' }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'High CPU usage detected on server cluster 2',
      time: '5 minutes ago',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'info',
      message: 'New feature deployment completed successfully',
      time: '1 hour ago',
      priority: 'low'
    },
    {
      id: 3,
      type: 'success',
      message: 'Monthly backup completed without errors',
      time: '2 hours ago',
      priority: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'down':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      case 'success':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced KPI Dashboard */}
      <div>
        <EnhancedKpiDashboard isAdmin={true} />
      </div>

      {/* Quick Actions Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                onClick={action.action}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${action.color}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-white shadow-sm">
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{action.title}</h3>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemStatus.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      service.status === 'operational' ? 'bg-green-500' :
                      service.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="font-medium text-sm">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{service.uptime}</span>
                    <Badge variant="outline" className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        alert.priority === 'high' ? 'border-red-200 text-red-700' :
                        alert.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                        'border-gray-200 text-gray-700'
                      }`}
                    >
                      {alert.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedAdminOverview;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Users, Server, CreditCard, Activity, Eye, Edit, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { AdminDashboardStats } from '@/types/admin';
import ActionDialog from '@/components/admin/dialogs/ActionDialog';
import { useActionDialog } from '@/hooks/useActionDialog';

interface DashboardStatsProps {
  stats: AdminDashboardStats;
}

const DashboardStatsComponent: React.FC<DashboardStatsProps> = ({ stats }) => {
  const { toast } = useToast();
  const { dialogState, openDialog, closeDialog } = useActionDialog();
  
  const {
    totalUsers,
    activeUsers,
    totalRevenue,
    newUsersToday,
    dailyActiveUsers
  } = stats;

  const handleAction = (action: string, metric: string, data?: any) => {
    const actionType = action.toLowerCase() as 'view' | 'edit' | 'settings';
    openDialog(actionType, metric, data || {
      metric,
      value: getMetricValue(metric),
      description: getMetricDescription(metric),
      lastUpdated: new Date().toISOString(),
      status: 'active'
    });
  };

  const getMetricValue = (metric: string) => {
    switch (metric) {
      case 'Total Users': return totalUsers;
      case 'Active Users': return activeUsers;
      case 'Total Revenue': return totalRevenue;
      case 'Server Status': return 'Operational';
      default: return 'N/A';
    }
  };

  const getMetricDescription = (metric: string) => {
    switch (metric) {
      case 'Total Users': return 'Total number of registered users on the platform';
      case 'Active Users': return 'Users who have been active in the last 30 days';
      case 'Total Revenue': return 'Total revenue generated from all subscriptions';
      case 'Server Status': return 'Current operational status of all servers';
      default: return 'No description available';
    }
  };

  const handleSave = (data: any) => {
    toast({
      title: "Changes Saved",
      description: `${data.metric} has been updated successfully.`,
    });
    console.log('Saved data:', data);
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAction("View", "Total Users")}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAction("Edit", "Total Users")}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAction("Settings", "Total Users")}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{(newUsersToday / totalUsers * 100).toFixed(1)}% from last 24h
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAction("View", "Active Users")}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAction("Edit", "Active Users")}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAction("Settings", "Active Users")}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {(activeUsers / totalUsers * 100).toFixed(1)}% of total users
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAction("View", "Total Revenue")}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAction("Edit", "Total Revenue")}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAction("Settings", "Total Revenue")}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <div className="flex items-center pt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500 ml-1">+12.5%</span>
              <span className="text-xs text-muted-foreground ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Status</CardTitle>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAction("View", "Server Status")}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAction("Edit", "Server Status")}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAction("Settings", "Server Status")}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Server className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Operational</div>
            <div className="flex items-center space-x-2 pt-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">All systems normal</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <ActionDialog
        type={dialogState.type!}
        title={dialogState.title}
        data={dialogState.data}
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        onSave={handleSave}
      />
    </>
  );
};

export default DashboardStatsComponent;

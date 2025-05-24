
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Users, Server, CreditCard, Activity, Eye, Edit, Settings } from "lucide-react";
import type { AdminDashboardStats } from '@/types/admin';
import EnhancedDashboardStats from './EnhancedDashboardStats';

interface DashboardStatsProps {
  stats: AdminDashboardStats;
}

const DashboardStatsComponent: React.FC<DashboardStatsProps> = ({ stats }) => {
  const handleAction = (action: string, item: string) => {
    console.log(`${action} action triggered for ${item}`);
    // Navigation or modal logic would go here
  };

  return (
    <div className="space-y-6">
      {/* Enhanced KPI Dashboard */}
      <EnhancedDashboardStats stats={stats} />
      
      {/* Legacy Stats Cards with Action Buttons */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{(stats.newUsersToday / stats.totalUsers * 100).toFixed(1)}% from last 24h
            </p>
            <div className="flex gap-1 mt-2">
              <Button size="sm" variant="outline" onClick={() => handleAction('View', 'Users')}>
                <Eye className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleAction('Edit', 'Users')}>
                <Edit className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleAction('Settings', 'Users')}>
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {(stats.activeUsers / stats.totalUsers * 100).toFixed(1)}% of total users
            </p>
            <div className="flex gap-1 mt-2">
              <Button size="sm" variant="outline" onClick={() => handleAction('View', 'Active Users')}>
                <Eye className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleAction('Edit', 'Active Users')}>
                <Edit className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleAction('Settings', 'Active Users')}>
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center pt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500 ml-1">+12.5%</span>
              <span className="text-xs text-muted-foreground ml-2">from last month</span>
            </div>
            <div className="flex gap-1 mt-2">
              <Button size="sm" variant="outline" onClick={() => handleAction('View', 'Revenue')}>
                <Eye className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleAction('Edit', 'Revenue')}>
                <Edit className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleAction('Settings', 'Revenue')}>
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Status</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Operational</div>
            <div className="flex items-center space-x-2 pt-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">All systems normal</span>
            </div>
            <div className="flex gap-1 mt-2">
              <Button size="sm" variant="outline" onClick={() => handleAction('View', 'Server')}>
                <Eye className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleAction('Edit', 'Server')}>
                <Edit className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleAction('Settings', 'Server')}>
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStatsComponent;

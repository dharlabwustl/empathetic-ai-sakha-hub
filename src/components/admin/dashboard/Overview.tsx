
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, UserCheck, TrendingUp, BarChart } from "lucide-react";

// Import the KpiCard component
import { KpiCard } from '@/components/dashboard/KpiCard';

const Overview = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Total Users"
          value={2543}
          unit="users"
          icon={<Users className="h-5 w-5 text-primary" />}
          change={12}
          changeType="increase"
        />
        
        <KpiCard 
          title="Active Users"
          value={1876}
          unit="users"
          icon={<UserCheck className="h-5 w-5 text-primary" />}
          change={8}
          changeType="increase"
        />
        
        <KpiCard 
          title="Revenue"
          value={15840}
          unit="USD"
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          change={24}
          changeType="increase"
        />
        
        <KpiCard 
          title="Conversion Rate"
          value={12.8}
          unit="%"
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          change={2.3}
          changeType="increase"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New user registrations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20">
              <BarChart className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Chart will be displayed here</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
            <CardDescription>Monthly revenue breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20">
              <BarChart className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Chart will be displayed here</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;

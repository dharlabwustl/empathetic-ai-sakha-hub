
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageSquare, Book, LineChart, ArrowUp } from "lucide-react";
import { AdminDashboardStats } from "@/types/admin";
import { useNavigate } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: string;
  route?: string;
  iconColor: string;
  bgColor: string;
}

interface DashboardStatsProps {
  stats: AdminDashboardStats | null;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const navigate = useNavigate();
  
  if (!stats) return null;

  const StatCard = ({ title, value, icon, trend = '', route = '', iconColor, bgColor }: StatCardProps) => (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer border-gray-200 dark:border-gray-800" 
      onClick={() => route && navigate(route)}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
            {trend && (
              <p className="flex items-center text-xs mt-2 text-green-600 dark:text-green-400">
                <ArrowUp size={14} className="mr-1" />
                {trend}
              </p>
            )}
          </div>
          <div className={`${bgColor} p-3 rounded-full`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total Users" 
        value="2,350" 
        icon={<Users size={24} className="text-blue-600" />}
        trend="+12% from last month"
        route="/admin/users"
        iconColor="text-blue-600"
        bgColor="bg-blue-100 dark:bg-blue-900/20"
      />
      <StatCard 
        title="Active Sessions" 
        value="186" 
        icon={<LineChart size={24} className="text-green-600" />}
        trend="+3% from yesterday"
        iconColor="text-green-600"
        bgColor="bg-green-100 dark:bg-green-900/20"
      />
      <StatCard 
        title="Content Items" 
        value="12,543" 
        icon={<Book size={24} className="text-amber-600" />}
        trend="+8% from last week"
        route="/admin/content"
        iconColor="text-amber-600"
        bgColor="bg-amber-100 dark:bg-amber-900/20"
      />
      <StatCard 
        title="AI Interactions" 
        value="32,842" 
        icon={<MessageSquare size={24} className="text-purple-600" />}
        trend="+24% from last month"
        iconColor="text-purple-600"
        bgColor="bg-purple-100 dark:bg-purple-900/20"
      />
    </div>
  );
};

export default DashboardStats;

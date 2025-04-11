
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Activity, Book, Brain } from "lucide-react";
import { AdminDashboardStats } from "@/types/admin";
import { useNavigate } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: string;
  route?: string;
}

interface DashboardStatsProps {
  stats: AdminDashboardStats | null;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const navigate = useNavigate();
  
  if (!stats) return null;

  const StatCard = ({ title, value, icon, trend = '', route = '' }: StatCardProps) => (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer" 
      onClick={() => route && navigate(route)}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
            {trend && (
              <p className="flex items-center text-xs mt-2 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                {trend} from last week
              </p>
            )}
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total Students" 
        value={stats.totalStudents} 
        icon={<Users size={24} className="text-indigo-500" />}
        trend="+5.2%"
        route="/admin/students"
      />
      <StatCard 
        title="Active Students" 
        value={stats.activeStudents} 
        icon={<Activity size={24} className="text-indigo-500" />}
        trend="+3.1%"
      />
      <StatCard 
        title="Content Items" 
        value={stats.totalQuestions + stats.totalConcepts + stats.totalFlashcards} 
        icon={<Book size={24} className="text-indigo-500" />}
        trend="+8.3%"
        route="/admin/content"
      />
      <StatCard 
        title="Avg. Mood Score" 
        value={stats.averageMoodScore.toFixed(1) + "/10"} 
        icon={<Brain size={24} className="text-indigo-500" />}
        trend="+0.7"
      />
    </div>
  );
};

export default DashboardStats;

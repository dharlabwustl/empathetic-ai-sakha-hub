
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DashboardTabs from '@/components/admin/dashboard/DashboardTabs';
import { getAllStudents } from '@/services/adminService';
import { StudentData } from '@/types/admin/studentData';
import { SystemLog } from '@/types/admin/systemLog';
import { getSystemLogs } from '@/services/adminService';

interface AdminDashboardStats {
  totalStudents: number;
  activeStudents: number;
  revenueMonthly: number;
  revenueTotal: number;
  completionRate: number;
  averageRating: number;
  studentGrowthRate: number;
  churnRate: number;
  newSignupsThisWeek: number;
  activeSubscriptions: number;
  monthlyRecurringRevenue: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminDashboardStats>({
    totalStudents: 0,
    activeStudents: 0,
    revenueMonthly: 0,
    revenueTotal: 0,
    completionRate: 0,
    averageRating: 0,
    studentGrowthRate: 0,
    churnRate: 0,
    newSignupsThisWeek: 0,
    activeSubscriptions: 0,
    monthlyRecurringRevenue: 0,
  });
  
  const [students, setStudents] = useState<StudentData[]>([]);
  const [recentStudents, setRecentStudents] = useState<StudentData[]>([]);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const location = useLocation();
  const locationState = location.state as { activeTab?: string } | undefined;
  const [activeTab, setActiveTab] = useState(locationState?.activeTab || 'overview');
  
  useEffect(() => {
    if (locationState?.activeTab) {
      setActiveTab(locationState.activeTab);
    }
  }, [locationState]);

  useEffect(() => {
    // Fetch students
    const fetchStudents = async () => {
      try {
        const fetchedStudents = await getAllStudents();
        // Convert any date fields to string to ensure compatibility
        const processedStudents: StudentData[] = fetchedStudents.map(student => ({
          ...student,
          registrationDate: student.registrationDate.toString(),
          joinedDate: student.joinedDate.toString(),
          lastActive: student.lastActive.toString()
        }));
        
        setStudents(processedStudents);
        
        // Get most recent students
        const sortedStudents = [...processedStudents].sort((a, b) => 
          new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()
        );
        
        setRecentStudents(sortedStudents.slice(0, 5));
        
        // Update stats
        setStats(prev => ({
          ...prev,
          totalStudents: processedStudents.length,
          activeStudents: processedStudents.filter(s => s.status === 'active').length,
          newSignupsThisWeek: processedStudents.filter(s => {
            const registrationDate = new Date(s.registrationDate);
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            return registrationDate >= oneWeekAgo;
          }).length
        }));
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    
    // Fetch system logs
    const fetchSystemLogs = async () => {
      try {
        const fetchedLogs = await getSystemLogs();
        // Convert system logs to the correct type
        const processedLogs: SystemLog[] = fetchedLogs.map(log => ({
          id: log.id,
          timestamp: log.timestamp,
          source: log.source,
          level: log.level as "info" | "warning" | "error" | "critical",
          message: log.message
        }));
        
        setSystemLogs(processedLogs);
      } catch (error) {
        console.error('Error fetching system logs:', error);
      }
    };
    
    fetchStudents();
    fetchSystemLogs();
    
    // Set mock stats
    setStats({
      totalStudents: 1285,
      activeStudents: 873,
      revenueMonthly: 52450,
      revenueTotal: 246890,
      completionRate: 68,
      averageRating: 4.7,
      studentGrowthRate: 12.8,
      churnRate: 3.2,
      newSignupsThisWeek: 78,
      activeSubscriptions: 921,
      monthlyRecurringRevenue: 62450
    });
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Monitor and manage all aspects of your platform
          </p>
        </div>
        <Button>Generate Report</Button>
      </div>
      
      <DashboardTabs 
        students={recentStudents} 
        systemLogs={systemLogs} 
      />
    </AdminLayout>
  );
};

export default AdminDashboard;

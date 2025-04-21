import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import KpiCard from "@/components/admin/KpiCard";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import adminStudentService from "@/services/admin/adminStudentService";
import { Users, BookText, CreditCard, BookOpen, UserCheck, Layers, Award } from "lucide-react";

const AdminDashboard = () => {
  const { adminUser } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<"content" | "students" | "subscriptions">("students");

  const [kpis, setKpis] = useState({
    totalStudents: 0,
    activeStudents: 0,
    newStudents: 0,
    totalContent: 0,
    totalSubscriptions: 0,
    totalRevenue: 0
  });

  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    // Fetch data for KPIs
    const fetchData = async () => {
      try {
        // Simulate API call
        setKpis({
          totalStudents: 2460,
          activeStudents: 1823,
          newStudents: 128,
          totalContent: 560,
          totalSubscriptions: 1550,
          totalRevenue: 283500
        });

        // Fetch student data
        const students = await adminStudentService.getStudents();
        console.log("Fetched students:", students);
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Mock chart data
  const chartData = [
    { name: "Jan", students: 400, revenue: 24000 },
    { name: "Feb", students: 450, revenue: 26000 },
    { name: "Mar", students: 580, revenue: 35000 },
    { name: "Apr", students: 620, revenue: 40000 },
    { name: "May", students: 700, revenue: 43000 },
    { name: "Jun", students: 800, revenue: 48000 },
    { name: "Jul", students: 920, revenue: 55000 }
  ];

  const handleTabChange = (value: "content" | "students" | "subscriptions") => {
    setActiveTab(value);
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {adminUser?.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KpiCard 
            title="Total Students" 
            value={kpis.totalStudents} 
            change={+5.2}
            icon={<Users className="h-8 w-8 text-blue-500" />}
          />
          <KpiCard 
            title="Active Students" 
            value={kpis.activeStudents} 
            change={+3.1}
            icon={<UserCheck className="h-8 w-8 text-green-500" />}
          />
          <KpiCard 
            title="Content Items" 
            value={kpis.totalContent} 
            change={+12.5}
            icon={<BookText className="h-8 w-8 text-purple-500" />}
          />
          <KpiCard 
            title="Total Revenue" 
            value={`₹${kpis.totalRevenue.toLocaleString()}`} 
            change={+8.4}
            icon={<CreditCard className="h-8 w-8 text-amber-500" />}
          />
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Growth Metrics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="students" stroke="#3b82f6" name="Students" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" name="Revenue (₹)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as any)}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="students">
              <Users className="h-4 w-4 mr-2" />
              Students
            </TabsTrigger>
            <TabsTrigger value="content">
              <BookOpen className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="subscriptions">
              <CreditCard className="h-4 w-4 mr-2" />
              Subscriptions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="students">
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Students Overview</h3>
                <p>Manage and view student data.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="content">
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Content Overview</h3>
                <p>Manage and view content data.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="subscriptions">
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Subscriptions Overview</h3>
                <p>Manage and view subscription data.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;

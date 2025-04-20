import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StudentData } from '@/types/admin';
import { adminStudentService } from '@/services/admin/adminStudentService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from '@/hooks/use-toast';
import SubscriptionTab from '@/components/admin/dashboard/tabs/SubscriptionTab';

const AdminDashboard = () => {
  const { admin, isAuthenticated, loading, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"students" | "content" | "subscriptions">("students");
  const [students, setStudents] = useState<StudentData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const fetchedStudents = await adminStudentService.getAllStudents();
        
        const studentsWithRequiredFields = fetchedStudents.map(student => ({
          ...student,
          joinDate: student.joinedDate || student.registrationDate || new Date().toISOString(),
          subscriptionTier: student.subscriptionTier || 'Free',
          studyTime: student.studyTime || 0,
          completedLessons: student.completedLessons || 0,
          targetScore: student.targetScore || 0
        }));
        
        setStudents(studentsWithRequiredFields);
      } catch (error: any) {
        toast({
          title: "Error fetching students",
          description: error.message || "Failed to retrieve student data.",
          variant: "destructive"
        });
      }
    };

    if (isAuthenticated) {
      fetchStudents();
    }
  }, [isAuthenticated, toast]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!admin) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Student Management</h2>
            <Button><Plus className="mr-2" /> Add Student</Button>
          </div>
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Study Time</TableHead>
                  <TableHead>Completed Lessons</TableHead>
                  <TableHead>Target Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={student.avatarUrl} alt={student.name} />
                          <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span>{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{new Date(student.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{student.subscriptionTier}</Badge>
                    </TableCell>
                    <TableCell>{student.studyTime} hours</TableCell>
                    <TableCell>{student.completedLessons}</TableCell>
                    <TableCell>{student.targetScore}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="content">
          <div>Content Management</div>
        </TabsContent>
        <TabsContent value="subscriptions">
          <SubscriptionTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Database,
  User,
  BookOpen,
  Target
} from 'lucide-react';

interface StudentSyncStatus {
  id: string;
  name: string;
  email: string;
  profileCompleteness: number;
  onboardingStatus: 'complete' | 'incomplete' | 'pending';
  lastSynced: string;
  pendingUpdates: number;
  academicData: {
    examGoal: string;
    subjects: string[];
    targetDate: string;
  };
}

const StudentDataSyncTab: React.FC = () => {
  const { toast } = useToast();
  const [syncingAll, setSyncingAll] = useState(false);
  
  const [students] = useState<StudentSyncStatus[]>([
    {
      id: '1',
      name: 'Aryan Sharma',
      email: 'aryan.s@example.com',
      profileCompleteness: 85,
      onboardingStatus: 'complete',
      lastSynced: '2 minutes ago',
      pendingUpdates: 0,
      academicData: {
        examGoal: 'IIT-JEE',
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        targetDate: '2024-05-15'
      }
    },
    {
      id: '2', 
      name: 'Priya Patel',
      email: 'priya.p@example.com',
      profileCompleteness: 60,
      onboardingStatus: 'incomplete',
      lastSynced: '15 minutes ago',
      pendingUpdates: 3,
      academicData: {
        examGoal: 'NEET',
        subjects: ['Biology', 'Chemistry'],
        targetDate: '2024-06-20'
      }
    }
  ]);

  const handleSyncAll = async () => {
    setSyncingAll(true);
    
    // Simulate sync process
    setTimeout(() => {
      setSyncingAll(false);
      toast({
        title: "Sync Complete",
        description: "All student data has been synchronized successfully.",
      });
    }, 2000);
  };

  const handleSyncStudent = (studentId: string) => {
    toast({
      title: "Student Synced",
      description: "Student data has been synchronized.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-100 text-green-800';
      case 'incomplete': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sync Status</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98%</div>
            <p className="text-xs text-muted-foreground">Data synchronized</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Updates</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {students.reduce((sum, s) => sum + s.pendingUpdates, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting sync</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Profile Completion</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(students.reduce((sum, s) => sum + s.profileCompleteness, 0) / students.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Profile data complete</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sync-status" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="sync-status">Sync Status</TabsTrigger>
            <TabsTrigger value="profile-management">Profile Management</TabsTrigger>
            <TabsTrigger value="onboarding-data">Onboarding Data</TabsTrigger>
          </TabsList>
          
          <Button 
            onClick={handleSyncAll}
            disabled={syncingAll}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${syncingAll ? 'animate-spin' : ''}`} />
            {syncingAll ? 'Syncing...' : 'Sync All'}
          </Button>
        </div>

        <TabsContent value="sync-status">
          <Card>
            <CardHeader>
              <CardTitle>Student Data Synchronization</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Profile Status</TableHead>
                    <TableHead>Onboarding</TableHead>
                    <TableHead>Last Synced</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${student.profileCompleteness}%` }}
                            />
                          </div>
                          <span className="text-sm">{student.profileCompleteness}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.onboardingStatus)}>
                          {student.onboardingStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {student.lastSynced}
                      </TableCell>
                      <TableCell>
                        {student.pendingUpdates > 0 ? (
                          <Badge variant="outline" className="bg-orange-100 text-orange-800">
                            {student.pendingUpdates} updates
                          </Badge>
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSyncStudent(student.id)}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Sync
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile-management">
          <Card>
            <CardHeader>
              <CardTitle>Profile Data Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{student.name}</h4>
                      <Badge className={getStatusColor(student.onboardingStatus)}>
                        {student.onboardingStatus}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Exam Goal:</span>
                        <p>{student.academicData.examGoal}</p>
                      </div>
                      <div>
                        <span className="font-medium">Target Date:</span>
                        <p>{student.academicData.targetDate}</p>
                      </div>
                      <div>
                        <span className="font-medium">Subjects:</span>
                        <p>{student.academicData.subjects.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">View Full Profile</Button>
                      <Button size="sm" variant="outline">Edit Data</Button>
                      <Button size="sm" variant="outline">Export</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onboarding-data">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Data Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Complete</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {students.filter(s => s.onboardingStatus === 'complete').length}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium">Incomplete</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {students.filter(s => s.onboardingStatus === 'incomplete').length}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Pending</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {students.filter(s => s.onboardingStatus === 'pending').length}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDataSyncTab;

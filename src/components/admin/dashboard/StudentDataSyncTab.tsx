
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, RefreshCw, Eye, Edit, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { UserProfileType, MoodType } from '@/types/user/base';
import { useToast } from "@/hooks/use-toast";

interface OnboardingData {
  personalDetails: {
    age?: number;
    grade?: string;
    location?: string;
    institute?: string;
  };
  academicBackground: {
    examGoal?: string;
    examDate?: string;
    subjects?: string[];
    weakSubjects?: string[];
    strongSubjects?: string[];
  };
  studyPreferences: {
    pace?: string;
    dailyHours?: number;
    preferredTime?: string;
    studyEnvironment?: string;
  };
  lastUpdated: string;
  syncStatus: 'synced' | 'pending' | 'error';
}

const StudentDataSyncTab: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [syncingStudents, setSyncingStudents] = useState<Set<string>>(new Set());

  const mockStudentData: (UserProfileType & { onboardingData: OnboardingData })[] = [
    {
      id: '1',
      name: 'Aryan Sharma',
      email: 'aryan.s@example.com',
      examPreparation: 'IIT-JEE',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      mood: MoodType.Motivated,
      onboardingData: {
        personalDetails: {
          age: 17,
          grade: '12th',
          location: 'Mumbai',
          institute: 'ABC International School'
        },
        academicBackground: {
          examGoal: 'IIT-JEE Advanced',
          examDate: '2024-05-26',
          subjects: ['Physics', 'Chemistry', 'Mathematics'],
          weakSubjects: ['Organic Chemistry'],
          strongSubjects: ['Algebra', 'Mechanics']
        },
        studyPreferences: {
          pace: 'Moderate',
          dailyHours: 6,
          preferredTime: 'Evening',
          studyEnvironment: 'Quiet room'
        },
        lastUpdated: '2024-01-15T10:30:00Z',
        syncStatus: 'synced'
      }
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya.p@example.com',
      examPreparation: 'NEET',
      subjects: ['Biology', 'Chemistry', 'Physics'],
      mood: MoodType.Focused,
      onboardingData: {
        personalDetails: {
          age: 18,
          grade: '12th',
          location: 'Delhi',
          institute: 'XYZ Public School'
        },
        academicBackground: {
          examGoal: 'NEET UG',
          examDate: '2024-05-05',
          subjects: ['Biology', 'Chemistry', 'Physics'],
          weakSubjects: ['Physics'],
          strongSubjects: ['Biology', 'Inorganic Chemistry']
        },
        studyPreferences: {
          pace: 'Fast',
          dailyHours: 8,
          preferredTime: 'Morning',
          studyEnvironment: 'Library'
        },
        lastUpdated: '2024-01-10T15:45:00Z',
        syncStatus: 'pending'
      }
    }
  ];

  const handleSync = async (studentId: string) => {
    setSyncingStudents(prev => new Set([...prev, studentId]));
    
    // Simulate API call
    setTimeout(() => {
      setSyncingStudents(prev => {
        const newSet = new Set(prev);
        newSet.delete(studentId);
        return newSet;
      });
      
      toast({
        title: "Data Synchronized",
        description: "Student profile data has been synchronized successfully.",
      });
    }, 2000);
  };

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case 'synced': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredStudents = mockStudentData.filter(student =>
    student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Student Data Synchronization</h2>
          <p className="text-muted-foreground">Monitor and sync student profile data in real-time</p>
        </div>
        <Button 
          onClick={() => handleSync('all')}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Sync All Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudentData.length}</div>
            <p className="text-xs text-muted-foreground">Registered profiles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Synced Profiles</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStudentData.filter(s => s.onboardingData.syncStatus === 'synced').length}
            </div>
            <p className="text-xs text-muted-foreground">Up to date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Sync</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStudentData.filter(s => s.onboardingData.syncStatus === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Needs update</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sync Errors</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStudentData.filter(s => s.onboardingData.syncStatus === 'error').length}
            </div>
            <p className="text-xs text-muted-foreground">Failed syncs</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search students..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Student Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Profile Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Exam Goal</TableHead>
                <TableHead>Grade/Institute</TableHead>
                <TableHead>Study Preferences</TableHead>
                <TableHead>Sync Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{student.onboardingData.academicBackground.examGoal}</div>
                      <div className="text-sm text-gray-500">{student.onboardingData.academicBackground.examDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{student.onboardingData.personalDetails.grade}</div>
                      <div className="text-sm text-gray-500">{student.onboardingData.personalDetails.institute}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{student.onboardingData.studyPreferences.pace}</div>
                      <div className="text-sm text-gray-500">
                        {student.onboardingData.studyPreferences.dailyHours}h/day, {student.onboardingData.studyPreferences.preferredTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSyncStatusColor(student.onboardingData.syncStatus)}>
                      <div className="flex items-center gap-1">
                        {getSyncStatusIcon(student.onboardingData.syncStatus)}
                        {student.onboardingData.syncStatus}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(student.onboardingData.lastUpdated).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSync(student.id)}
                        disabled={syncingStudents.has(student.id)}
                      >
                        <RefreshCw className={`h-4 w-4 ${syncingStudents.has(student.id) ? 'animate-spin' : ''}`} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDataSyncTab;

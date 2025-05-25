
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Eye, Download, Filter, Users, UserPlus } from 'lucide-react';
import OnboardingDataViewer from './OnboardingDataViewer';
import { StudentData } from "@/types/admin/studentData";

const StudentManagement: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock student data
  const mockStudents: StudentData[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 9876543210",
      joinedDate: "2024-01-15",
      role: "Student",
      status: "active",
      subjects: ["Physics", "Chemistry", "Mathematics"],
      examPrep: "IIT-JEE",
      lastActive: "2024-01-20",
      progress: { completedTopics: 45, totalTopics: 100 },
      subscription: "Premium",
      mood: "Motivated",
      studyStreak: 15,
      onboardingData: {
        role: "Student",
        examGoal: "IIT-JEE",
        age: 17,
        grade: "12th",
        location: "Delhi",
        institute: "ABC Public School",
        personalityType: "INTJ",
        mood: "Motivated",
        learningStyle: "Visual",
        dailyStudyHours: 8,
        preferredStudyTime: "Morning",
        studyPace: "Fast",
        studyEnvironment: "Quiet room",
        interests: ["Physics", "Mathematics", "Technology"],
        weakSubjects: ["Organic Chemistry"],
        preferredSubjects: ["Physics", "Mathematics"],
        sleepSchedule: "10 PM - 6 AM",
        focusHours: 4,
        stressManagement: "Meditation",
        breakRoutine: "15 minutes every hour",
        breakFrequency: "Hourly"
      }
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 9876543211",
      joinedDate: "2024-01-18",
      role: "Student",
      status: "active",
      subjects: ["Biology", "Chemistry", "Physics"],
      examPrep: "NEET",
      lastActive: "2024-01-19",
      progress: { completedTopics: 32, totalTopics: 80 },
      subscription: "Basic",
      mood: "Focused",
      studyStreak: 12,
      onboardingData: {
        role: "Student",
        examGoal: "NEET",
        age: 18,
        grade: "12th",
        location: "Mumbai",
        institute: "XYZ Junior College",
        personalityType: "ENFP",
        mood: "Focused",
        learningStyle: "Auditory",
        dailyStudyHours: 6,
        preferredStudyTime: "Evening",
        studyPace: "Medium",
        studyEnvironment: "Study group",
        interests: ["Biology", "Medicine", "Research"],
        weakSubjects: ["Physics"],
        preferredSubjects: ["Biology", "Chemistry"],
        sleepSchedule: "11 PM - 7 AM",
        focusHours: 3,
        stressManagement: "Exercise",
        breakRoutine: "30 minutes every 2 hours",
        breakFrequency: "Every 2 hours"
      }
    }
  ];

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleViewStudent = (student: StudentData) => {
    setSelectedStudent(student);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage student accounts and view their onboarding data
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding Data</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Student Directory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterStatus === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterStatus === "active" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("active")}
                  >
                    Active
                  </Button>
                  <Button
                    variant={filterStatus === "inactive" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("inactive")}
                  >
                    Inactive
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left p-4 font-medium">Student</th>
                      <th className="text-left p-4 font-medium">Exam Prep</th>
                      <th className="text-left p-4 font-medium">Progress</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Last Active</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{student.examPrep}</Badge>
                        </td>
                        <td className="p-4">
                          {typeof student.progress === 'object' ? (
                            <div className="text-sm">
                              {student.progress.completedTopics}/{student.progress.totalTopics} topics
                            </div>
                          ) : (
                            <div className="text-sm">{student.progress}%</div>
                          )}
                        </td>
                        <td className="p-4">
                          <Badge 
                            variant={student.status === 'active' ? 'default' : 'secondary'}
                          >
                            {student.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-gray-500">{student.lastActive}</td>
                        <td className="p-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewStudent(student)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-4">
          {selectedStudent ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Onboarding Data for {selectedStudent.name}</h2>
                <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                  Back to List
                </Button>
              </div>
              <OnboardingDataViewer studentData={selectedStudent} />
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Select a student from the overview tab to view their onboarding data</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockStudents.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {mockStudents.filter(s => s.status === 'active').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">67%</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentManagement;

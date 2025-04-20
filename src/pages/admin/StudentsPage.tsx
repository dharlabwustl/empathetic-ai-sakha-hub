import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { StudentData } from "@/types/admin/studentData";
import { formatDateTime } from "@/utils/dateUtils";
import { MoreHorizontal, Search, Plus, Filter, Download } from "lucide-react";

// Mock data instead of using adminService
const mockStudents: StudentData[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.s@example.com",
    role: "student",
    status: "active",
    joinedDate: "2023-01-15T00:00:00Z", 
    lastActive: "2023-08-10T14:30:00Z",
    examType: "IIT-JEE",
    studyHours: 25,
    progress: {
      completedTopics: 45,
      totalTopics: 100,
      lastActiveDate: "2023-08-10T14:30:00Z"
    }
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.p@example.com",
    role: "student",
    status: "inactive",
    joinedDate: "2023-02-20T00:00:00Z",
    lastActive: "2023-07-25T09:15:00Z",
    examType: "NEET",
    studyHours: 18,
    progress: {
      completedTopics: 30,
      totalTopics: 100,
      lastActiveDate: "2023-07-25T09:15:00Z"
    }
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit.k@example.com",
    role: "student",
    status: "pending",
    joinedDate: "2023-07-10T00:00:00Z",
    lastActive: "2023-08-12T16:45:00Z",
    examType: "CAT",
    studyHours: 12,
    progress: {
      completedTopics: 15,
      totalTopics: 100,
      lastActiveDate: "2023-08-12T16:45:00Z"
    }
  }
];

const StudentsPage = () => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    examType: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // Using mock data directly instead of service
      setStudents(mockStudents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast({
        title: "Error",
        description: "Failed to load student data",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const searchRegex = new RegExp(searchQuery, "i");
    const nameMatch = searchRegex.test(student.name);
    const emailMatch = searchRegex.test(student.email);

    let statusMatch = true;
    if (statusFilter) {
      statusMatch = student.status === statusFilter;
    }

    return (nameMatch || emailMatch) && statusMatch;
  });

  const handleAddStudent = () => {
    // Fix the date issue - use ISO string instead of Date object
    const now = new Date().toISOString();
    
    const student: StudentData = {
      id: `student-${Date.now()}`,
      name: newStudent.name,
      email: newStudent.email,
      role: "student",
      status: "pending",
      joinedDate: now,
      lastActive: now,
      examType: newStudent.examType,
      progress: {
        completedTopics: 0,
        totalTopics: 100
      }
    };

    setStudents([...students, student]);
    setIsAddStudentOpen(false);
    setNewStudent({ name: "", email: "", examType: "" });

    toast({
      title: "Student Added",
      description: `${newStudent.name} has been added successfully.`,
    });
  };

  const handleExport = () => {
    const csvData = students.map(student => ({
      id: student.id,
      name: student.name,
      email: student.email,
      role: student.role,
      status: student.status,
      joinedDate: student.joinedDate,
      lastActive: student.lastActive,
      examType: student.examType,
      studyHours: student.studyHours,
      completedTopics: student.progress?.completedTopics,
      totalTopics: student.progress?.totalTopics
    }));

    const csvHeaders = Object.keys(csvData[0]).join(",");
    const csvRows = csvData.map(student => Object.values(student).join(",")).join("\n");
    const csvContent = `${csvHeaders}\n${csvRows}`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "students.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Complete",
      description: "Student data exported to CSV",
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          <p>Loading student data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Students Management</h1>
          <p className="text-muted-foreground">Manage student accounts and profiles</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                  Inactive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  Pending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={handleExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>

            <Button onClick={() => setIsAddStudentOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Students List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Exam Type</TableHead>
                  <TableHead>Study Hours</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          student.status === "active"
                            ? "secondary"
                            : student.status === "inactive"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDateTime(student.joinedDate)}</TableCell>
                    <TableCell>{formatDateTime(student.lastActive)}</TableCell>
                    <TableCell>{student.examType}</TableCell>
                    <TableCell>{student.studyHours}</TableCell>
                    <TableCell>
                      {student.progress?.completedTopics}/{student.progress?.totalTopics}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Student</DialogTitle>
              <DialogDescription>
                Create a new student account
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={newStudent.email}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="examType" className="text-right">
                  Exam Type
                </label>
                <Input
                  type="text"
                  id="examType"
                  value={newStudent.examType}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, examType: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddStudent}>
                Create Student
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default StudentsPage;

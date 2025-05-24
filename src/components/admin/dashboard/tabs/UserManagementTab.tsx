import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Filter, Download, UserPlus, UserX, Check, X, Eye, Edit, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StudentProfileModal from "../students/StudentProfileModal";
import { StudentData } from "@/types/admin/studentData";
import ActionDialog from "@/components/admin/dialogs/ActionDialog";
import { useActionDialog } from "@/hooks/useActionDialog";

const studentsData: StudentData[] = [
  {
    id: "std-001",
    name: "Aryan Sharma",
    email: "aryan.s@example.com",
    joinedDate: "2023-09-15",
    role: "Student",
    status: "active",
    subjects: ["Physics", "Mathematics", "Chemistry"],
    examPrep: "IIT-JEE",
    lastActive: "2023-10-01",
    progress: {
      completedTopics: 68,
      totalTopics: 100
    }
  },
  {
    id: "std-002",
    name: "Priya Patel",
    email: "priya.p@example.com",
    joinedDate: "2023-08-22",
    role: "Student",
    status: "active",
    subjects: ["Biology", "Chemistry", "Physics"],
    examPrep: "NEET",
    lastActive: "2023-10-02",
    progress: {
      completedTopics: 75,
      totalTopics: 100
    }
  },
  {
    id: "std-003",
    name: "Vikram Singh",
    email: "vikram.s@example.com",
    joinedDate: "2023-07-12",
    role: "Student",
    status: "inactive",
    subjects: ["Economics", "Political Science", "History"],
    examPrep: "UPSC",
    lastActive: "2023-09-15",
    progress: {
      completedTopics: 42,
      totalTopics: 100
    }
  },
  {
    id: "std-004",
    name: "Ananya Desai",
    email: "ananya.d@example.com",
    joinedDate: "2023-09-30",
    role: "Student",
    status: "pending",
    subjects: ["Mathematics", "Computer Science"],
    examPrep: "CAT",
    lastActive: "2023-10-01",
    progress: {
      completedTopics: 20,
      totalTopics: 100
    }
  },
  {
    id: "std-005",
    name: "Rahul Kumar",
    email: "rahul.k@example.com",
    joinedDate: "2023-06-18",
    role: "Student",
    status: "active",
    subjects: ["Physics", "Mathematics"],
    examPrep: "IIT-JEE",
    lastActive: "2023-09-28",
    progress: {
      completedTopics: 90,
      totalTopics: 100
    }
  },
];

interface UserManagementTabProps {
  recentStudents?: StudentData[];
}

const UserManagementTab = ({ recentStudents = studentsData }: UserManagementTabProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { dialogState, openDialog, closeDialog } = useActionDialog();

  const filteredStudents = recentStudents.filter(student => {
    const query = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.examPrep?.toLowerCase().includes(query) ||
      student.subjects?.some(subj => subj.toLowerCase().includes(query))
    );
  });

  const handleViewStudent = (student: StudentData) => {
    openDialog('view', student.name, {
      id: student.id,
      name: student.name,
      email: student.email,
      phoneNumber: student.phoneNumber,
      examPrep: student.examPrep,
      status: student.status,
      subjects: student.subjects,
      joinedDate: student.joinedDate,
      lastActive: student.lastActive,
      progress: `${student.progress?.completedTopics || 0}/${student.progress?.totalTopics || 0} topics`
    });
  };

  const handleEditStudent = (student: StudentData) => {
    openDialog('edit', student.name, {
      id: student.id,
      name: student.name,
      email: student.email,
      phoneNumber: student.phoneNumber,
      examPrep: student.examPrep,
      status: student.status === 'active',
      subjects: student.subjects?.join(', ')
    });
  };

  const handleStudentSettings = (student: StudentData) => {
    openDialog('settings', student.name, {
      id: student.id,
      name: student.name,
      activeStatus: student.status === 'active',
      permissions: 'Standard Access',
      notifications: 'Enabled'
    });
  };

  const handleDeleteStudent = (student: StudentData) => {
    openDialog('delete', student.name, { id: student.id });
  };

  const handleAddStudent = () => {
    openDialog('add', 'New Student', {
      name: '',
      email: '',
      role: 'Student',
      active: true
    });
  };

  const handleSave = (data: any) => {
    toast({
      title: "Success",
      description: `${data.name} has been updated successfully.`,
    });
  };

  const handleConfirm = () => {
    const actionType = dialogState.type === 'delete' ? 'deleted' : 'processed';
    toast({
      title: "Success",
      description: `${dialogState.title} has been ${actionType}.`,
      variant: dialogState.type === 'delete' ? 'destructive' : 'default'
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Students",
      description: "Exporting student data to CSV",
    });
    console.log("Exporting student data");
  };

  const handleFilter = () => {
    toast({
      title: "Filter Students",
      description: "Opening filter options",
    });
    console.log("Opening filter dialog");
  };

  const formatDate = (date: string) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleFilter}>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={handleAddStudent}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Exam Prep</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.examPrep}</TableCell>
                  <TableCell>{formatDate(student.joinedDate || '')}</TableCell>
                  <TableCell>
                    {student.status === "active" && (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Active
                      </Badge>
                    )}
                    {student.status === "inactive" && (
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                        Inactive
                      </Badge>
                    )}
                    {student.status === "pending" && (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(student.lastActive || '')}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 dark:bg-gray-700">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${student.progress ? (student.progress.completedTopics / student.progress.totalTopics) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">
                        {student.progress ? Math.round((student.progress.completedTopics / student.progress.totalTopics) * 100) : 0}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewStudent(student)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditStudent(student)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleStudentSettings(student)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditStudent(student)}>
                            Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStudentSettings(student)}>
                            Settings
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600" 
                            onClick={() => handleDeleteStudent(student)}
                          >
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <ActionDialog
        type={dialogState.type!}
        title={dialogState.title}
        data={dialogState.data}
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        onSave={handleSave}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default UserManagementTab;

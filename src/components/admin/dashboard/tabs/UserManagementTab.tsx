
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Download, Plus, Search } from "lucide-react";
import { StudentData } from "@/types/admin";
import { Input } from "@/components/ui/input";
import StudentProfileModal from "../students/StudentProfileModal";

interface UserManagementTabProps {
  recentStudents: StudentData[];
}

const UserManagementTab = ({ recentStudents }: UserManagementTabProps) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const viewStudentProfile = (student: StudentData) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setSelectedStudent(null);
  };

  return (
    <Card className="p-6 bg-white dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Students Directory</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700">
            <Plus size={16} />
            <span>Add User</span>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <span className="text-sm font-medium my-auto">Filter by:</span>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-md p-1">
            <Button 
              variant={filterStatus === "all" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setFilterStatus("all")}
              className={filterStatus === "all" ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}
            >
              All
            </Button>
            <Button 
              variant={filterStatus === "active" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setFilterStatus("active")}
              className={filterStatus === "active" ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}
            >
              Active
            </Button>
            <Button 
              variant={filterStatus === "new" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setFilterStatus("new")}
              className={filterStatus === "new" ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}
            >
              New
            </Button>
            <Button 
              variant={filterStatus === "inactive" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setFilterStatus("inactive")}
              className={filterStatus === "inactive" ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}
            >
              Inactive
            </Button>
          </div>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search students..." className="pl-8" />
        </div>
      </div>
      
      <div className="rounded-md border overflow-hidden bg-white dark:bg-slate-900">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-slate-800">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Registration Date</TableHead>
                <TableHead className="font-semibold">Exam Goal</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentStudents.map((student) => (
                <TableRow key={student.id} className="border-b hover:bg-gray-50 dark:hover:bg-slate-800/50">
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phoneNumber}</TableCell>
                  <TableCell>{formatDate(student.registrationDate)}</TableCell>
                  <TableCell>{student.examType}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${student.lastActive > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'}`
                    }>
                      {student.lastActive > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                      onClick={() => viewStudentProfile(student)}
                    >
                      <Eye size={14} />
                      <span>View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {showProfileModal && selectedStudent && (
        <StudentProfileModal 
          student={selectedStudent} 
          onClose={closeProfileModal} 
        />
      )}
    </Card>
  );
};

export default UserManagementTab;

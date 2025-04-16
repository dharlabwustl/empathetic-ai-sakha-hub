
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface StudentData {
  id: string;
  name: string;
  email: string;
  joinedDate: Date | string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  subjects?: string[];
  examPrep?: string;
  lastActive?: Date | string;
  progress?: number;
}

export interface StudentProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentData: StudentData;
}

const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  open,
  onOpenChange,
  studentData
}) => {
  const formatDate = (date: Date | string) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Student Profile: {studentData.name}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
              {studentData.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{studentData.name}</h3>
              <p className="text-gray-500">{studentData.email}</p>
              <div className="mt-1">
                <Badge variant={
                  studentData.status === "active" ? "default" : 
                  studentData.status === "inactive" ? "secondary" : "outline"
                }>
                  {studentData.status.charAt(0).toUpperCase() + studentData.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <span className="font-medium">Joined Date:</span> {formatDate(studentData.joinedDate)}
              </div>
              <div>
                <span className="font-medium">Last Active:</span> {formatDate(studentData.lastActive || "")}
              </div>
              <div>
                <span className="font-medium">Exam Prep:</span> {studentData.examPrep || "N/A"}
              </div>
              <div>
                <span className="font-medium">Role:</span> {studentData.role}
              </div>
            </div>
          </div>

          {studentData.subjects && studentData.subjects.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {studentData.subjects.map((subject, index) => (
                  <Badge key={index} variant="outline">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {typeof studentData.progress === "number" && (
            <div>
              <h4 className="font-semibold mb-2">Overall Progress</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{studentData.progress}%</span>
                </div>
                <Progress value={studentData.progress || 0} />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProfileModal;

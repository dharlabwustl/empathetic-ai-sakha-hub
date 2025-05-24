
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  Target, 
  TrendingUp,
  Clock,
  Award,
  Edit,
  Ban,
  MessageCircle
} from 'lucide-react';
import { StudentData } from '@/types/admin/studentData';

interface StudentProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentData: StudentData;
}

const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  open,
  onOpenChange,
  studentData
}) => {
  const formatDate = (date: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const progressPercentage = studentData.progress 
    ? (studentData.progress.completedTopics / studentData.progress.totalTopics) * 100 
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <User className="h-6 w-6" />
            Student Profile: {studentData.name}
          </DialogTitle>
          <DialogDescription>
            Detailed information and analytics for {studentData.name}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <Badge className={getStatusColor(studentData.status)}>
                  {studentData.status}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Email</span>
                <span className="text-sm flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {studentData.email}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Joined</span>
                <span className="text-sm flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(studentData.joinedDate || '')}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Last Active</span>
                <span className="text-sm flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(studentData.lastActive || '')}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Exam Prep</span>
                <span className="text-sm flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {studentData.examPrep}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Academic Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Academic Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-semibold">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>
                    {studentData.progress?.completedTopics || 0} completed
                  </span>
                  <span>
                    {studentData.progress?.totalTopics || 0} total topics
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {studentData.progress?.completedTopics || 0}
                  </div>
                  <div className="text-xs text-gray-500">Topics Completed</div>
                </div>
                
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">85</div>
                  <div className="text-xs text-gray-500">Study Sessions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subjects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Subjects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {studentData.subjects?.map((subject, index) => (
                  <Badge key={index} variant="outline" className="py-1">
                    {subject}
                  </Badge>
                )) || <span className="text-sm text-gray-500">No subjects assigned</span>}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Completed Physics Chapter 5</span>
                <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
              </div>
              
              <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Attempted Mock Test</span>
                <span className="text-xs text-gray-500 ml-auto">3 days ago</span>
              </div>
              
              <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Updated Study Plan</span>
                <span className="text-xs text-gray-500 ml-auto">1 week ago</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Button className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Send Message
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2 text-red-600 hover:text-red-700">
            <Ban className="h-4 w-4" />
            Suspend Account
          </Button>
          
          <Button variant="outline" onClick={() => onOpenChange(false)} className="ml-auto">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProfileModal;

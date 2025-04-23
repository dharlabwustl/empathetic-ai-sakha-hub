import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminDashboardStats } from "@/types/admin";
import { StudentData } from "@/types/admin/studentData";
import { useToast } from "@/hooks/use-toast";
import { Eye } from "lucide-react";
import StudentProfileModal from "./students/StudentProfileModal";

interface UsersTabProps {
  stats: AdminDashboardStats | null;
  recentStudents: StudentData[];
}

const UsersTab = ({ stats, recentStudents }: UsersTabProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const formatDate = (date: Date | string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleViewProfile = (student: StudentData) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setSelectedStudent(null);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recently Registered Students</span>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/students')}>
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Exam Type</th>
                  <th className="text-left py-3 px-4 font-medium">Registration Date</th>
                  <th className="text-left py-3 px-4 font-medium">Learning Style</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4">{student.email}</td>
                    <td className="py-3 px-4">{student.examType}</td>
                    <td className="py-3 px-4">{formatDate(student.registrationDate)}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                        {["Visual", "Auditory", "Reading", "Kinesthetic"][Math.floor(Math.random() * 4)]}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleViewProfile(student)}
                      >
                        <Eye size={14} /> View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Daily Active Users</h3>
                <div className="h-32 bg-primary/10 rounded-md flex items-end justify-between px-4 pb-4">
                  {Array.from({length: 7}).map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-primary w-6 rounded-t-sm" 
                      style={{height: `${Math.floor(Math.random() * 70) + 20}%`}}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">User Journey</h3>
                  <span className="text-xs text-primary">View Details</span>
                </div>
                <div className="grid grid-cols-4 gap-1 mt-2">
                  <div className="text-center p-2">
                    <div className="font-bold">{stats?.totalStudents || 0}</div>
                    <div className="text-xs text-gray-600">Total</div>
                  </div>
                  <div className="text-center p-2">
                    <div className="font-bold">{stats?.activeStudents || 0}</div>
                    <div className="text-xs text-gray-600">Active</div>
                  </div>
                  <div className="text-center p-2">
                    <div className="font-bold">{Math.floor((stats?.activeStudents || 0) * 0.8)}</div>
                    <div className="text-xs text-gray-600">Engaged</div>
                  </div>
                  <div className="text-center p-2">
                    <div className="font-bold">{Math.floor((stats?.activeStudents || 0) * 0.2)}</div>
                    <div className="text-xs text-gray-600">At Risk</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emotional Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Mood Distribution</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-green-100 p-3 rounded-md text-center">
                    <div className="text-lg font-bold text-green-700">42%</div>
                    <div className="text-xs text-green-700">Positive</div>
                  </div>
                  <div className="bg-amber-100 p-3 rounded-md text-center">
                    <div className="text-lg font-bold text-amber-700">45%</div>
                    <div className="text-xs text-amber-700">Neutral</div>
                  </div>
                  <div className="bg-red-100 p-3 rounded-md text-center">
                    <div className="text-lg font-bold text-red-700">13%</div>
                    <div className="text-xs text-red-700">Stressed</div>
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Flagged Students</h3>
                <div className="space-y-2">
                  <div className="bg-red-50 p-2 rounded-md flex items-center justify-between">
                    <div>
                      <span className="font-medium">Aryan Sharma</span>
                      <p className="text-xs text-gray-600">High stress for 5 days</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8" onClick={() => {
                      toast({
                        title: "Student Profile",
                        description: "Viewing student profile: Aryan Sharma",
                        variant: "default"
                      });
                    }}>View</Button>
                  </div>
                  <div className="bg-red-50 p-2 rounded-md flex items-center justify-between">
                    <div>
                      <span className="font-medium">Priya Patel</span>
                      <p className="text-xs text-gray-600">Mood dropped by 40%</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8" onClick={() => {
                      toast({
                        title: "Student Profile",
                        description: "Viewing student profile: Priya Patel",
                        variant: "default"
                      });
                    }}>View</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Profile Modal */}
      {showProfileModal && selectedStudent && (
        <StudentProfileModal 
          open={showProfileModal}
          onOpenChange={setShowProfileModal}
          studentData={selectedStudent}
        />
      )}
    </div>
  );
};

export default UsersTab;

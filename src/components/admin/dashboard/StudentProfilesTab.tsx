
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  MoreHorizontal,
  Calendar,
  BookOpen,
  TrendingUp,
  Users
} from 'lucide-react';
import { adminService } from '@/services/adminService';
import { useToast } from "@/hooks/use-toast";

interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  examType: string;
  studyStreak: StudyStreak;
  performance: {
    averageScore: number;
    conceptsMastered: number;
    totalStudyHours: number;
  };
  lastActive: string;
  registrationDate: string;
  moodTrend: string;
  status: 'active' | 'inactive' | 'pending';
}

const StudentProfilesTab = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchStudentProfiles();
  }, []);

  const fetchStudentProfiles = async () => {
    setLoading(true);
    try {
      // Simulate API call - in real implementation, this would fetch from admin service
      const mockStudents: StudentProfile[] = [
        {
          id: '1',
          name: 'Amit Kumar',
          email: 'amit@example.com',
          examType: 'JEE Advanced',
          studyStreak: {
            currentStreak: 12,
            longestStreak: 25,
            lastActiveDate: '2024-01-15'
          },
          performance: {
            averageScore: 85,
            conceptsMastered: 234,
            totalStudyHours: 156
          },
          lastActive: '2024-01-15',
          registrationDate: '2023-12-01',
          moodTrend: 'Motivated',
          status: 'active'
        },
        {
          id: '2',
          name: 'Priya Sharma',
          email: 'priya@example.com',
          examType: 'NEET',
          studyStreak: {
            currentStreak: 8,
            longestStreak: 18,
            lastActiveDate: '2024-01-14'
          },
          performance: {
            averageScore: 78,
            conceptsMastered: 189,
            totalStudyHours: 98
          },
          lastActive: '2024-01-14',
          registrationDate: '2023-11-15',
          moodTrend: 'Focused',
          status: 'active'
        },
        {
          id: '3',
          name: 'Rohit Singh',
          email: 'rohit@example.com',
          examType: 'JEE Main',
          studyStreak: {
            currentStreak: 5,
            longestStreak: 15,
            lastActiveDate: '2024-01-13'
          },
          performance: {
            averageScore: 72,
            conceptsMastered: 156,
            totalStudyHours: 78
          },
          lastActive: '2024-01-13',
          registrationDate: '2023-10-20',
          moodTrend: 'Anxious',
          status: 'inactive'
        }
      ];
      
      setStudents(mockStudents);
    } catch (error) {
      console.error('Error fetching student profiles:', error);
      toast({
        title: "Error",
        description: "Failed to load student profiles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Student Profiles</h2>
          <p className="text-muted-foreground">Detailed view of student academic profiles and progress</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{students.length}</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{students.filter(s => s.status === 'active').length}</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(students.reduce((acc, s) => acc + s.performance.averageScore, 0) / students.length)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg. Performance</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(students.reduce((acc, s) => acc + s.studyStreak.currentStreak, 0) / students.length)}
                </div>
                <div className="text-sm text-muted-foreground">Avg. Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Student Directory</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://avatar.vercel.sh/${student.email}`} />
                      <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{student.name}</h3>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                      <p className="text-sm text-muted-foreground">{student.examType}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-8 text-center">
                    <div>
                      <div className="text-lg font-semibold">{student.studyStreak.currentStreak}</div>
                      <div className="text-xs text-muted-foreground">Current Streak</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{student.performance.averageScore}%</div>
                      <div className="text-xs text-muted-foreground">Avg Score</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{student.performance.conceptsMastered}</div>
                      <div className="text-xs text-muted-foreground">Concepts</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{student.performance.totalStudyHours}h</div>
                      <div className="text-xs text-muted-foreground">Study Time</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfilesTab;

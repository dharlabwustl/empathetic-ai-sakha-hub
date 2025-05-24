
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserProfileBase, MoodType } from '@/types/user/base';
import { Search, Filter, MoreHorizontal, Eye, Edit, UserX } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Extended student profile type
type ExtendedStudentProfile = UserProfileBase & {
  studyHoursToday: number;
  mood: MoodType;
  completionRate: number;
  lastActive: string;
  studyStreak: number;
};

const mockStudents: ExtendedStudentProfile[] = [
  {
    id: 'std-001',
    name: 'Aryan Sharma',
    email: 'aryan.sharma@example.com',
    examPreparation: 'IIT-JEE',
    studyHoursToday: 4.5,
    mood: MoodType.MOTIVATED,
    completionRate: 78,
    lastActive: '2024-01-15T10:30:00Z',
    studyStreak: 12,
    currentMood: MoodType.MOTIVATED
  },
  {
    id: 'std-002',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    examPreparation: 'NEET',
    studyHoursToday: 6.2,
    mood: MoodType.FOCUSED,
    completionRate: 85,
    lastActive: '2024-01-15T09:15:00Z',
    studyStreak: 8,
    currentMood: MoodType.FOCUSED
  },
  {
    id: 'std-003',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    examPreparation: 'UPSC',
    studyHoursToday: 3.1,
    mood: MoodType.TIRED,
    completionRate: 62,
    lastActive: '2024-01-14T20:45:00Z',
    studyStreak: 5,
    currentMood: MoodType.TIRED
  }
];

const moodColors: Record<MoodType, string> = {
  [MoodType.HAPPY]: 'bg-yellow-100 text-yellow-800',
  [MoodType.MOTIVATED]: 'bg-green-100 text-green-800',
  [MoodType.FOCUSED]: 'bg-blue-100 text-blue-800',
  [MoodType.TIRED]: 'bg-gray-100 text-gray-800',
  [MoodType.ANXIOUS]: 'bg-red-100 text-red-800',
  [MoodType.STRESSED]: 'bg-orange-100 text-orange-800',
  [MoodType.CONFIDENT]: 'bg-purple-100 text-purple-800',
  [MoodType.EXCITED]: 'bg-pink-100 text-pink-800'
};

const StudentProfilesTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<ExtendedStudentProfile | null>(null);

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.examPreparation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (student: ExtendedStudentProfile) => {
    setSelectedStudent(student);
    console.log('Viewing profile for:', student.name);
  };

  const handleEditProfile = (student: ExtendedStudentProfile) => {
    console.log('Editing profile for:', student.name);
  };

  const handleDeleteProfile = (student: ExtendedStudentProfile) => {
    console.log('Deleting profile for:', student.name);
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getMoodDisplayName = (mood: MoodType) => {
    return mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Student Profiles</h2>
          <p className="text-muted-foreground">Manage and monitor student progress and profiles</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            Add Student
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search students..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{mockStudents.length}</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {mockStudents.filter(s => s.mood === MoodType.MOTIVATED || s.mood === MoodType.FOCUSED || s.mood === MoodType.HAPPY || s.mood === MoodType.CONFIDENT || s.mood === MoodType.EXCITED).length}
              </div>
              <div className="text-sm text-muted-foreground">Positive Mood</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(mockStudents.reduce((acc, s) => acc + s.completionRate, 0) / mockStudents.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Completion</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(mockStudents.reduce((acc, s) => acc + s.studyStreak, 0) / mockStudents.length)}
              </div>
              <div className="text-sm text-muted-foreground">Avg Streak (days)</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">{student.examPreparation}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewProfile(student)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditProfile(student)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteProfile(student)}
                      className="text-red-600"
                    >
                      <UserX className="mr-2 h-4 w-4" />
                      Delete Profile
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Mood */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Mood</span>
                  <Badge className={moodColors[student.mood] || 'bg-gray-100 text-gray-800'}>
                    {getMoodDisplayName(student.mood)}
                  </Badge>
                </div>

                {/* Study Hours Today */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Study Hours Today</span>
                  <span className="text-sm font-bold">{student.studyHoursToday}h</span>
                </div>

                {/* Completion Rate */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Completion Rate</span>
                  <span className={`text-sm font-bold ${getCompletionColor(student.completionRate)}`}>
                    {student.completionRate}%
                  </span>
                </div>

                {/* Study Streak */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Study Streak</span>
                  <span className="text-sm font-bold">{student.studyStreak} days</span>
                </div>

                {/* Last Active */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Active</span>
                  <span className="text-sm text-muted-foreground">
                    {formatLastActive(student.lastActive)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${student.completionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No students found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentProfilesTab;

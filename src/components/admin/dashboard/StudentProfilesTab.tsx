
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Download, Eye, Edit, BarChart3, BookOpen, Calendar } from 'lucide-react';

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  examType: string;
  grade: string;
  joinDate: string;
  studyStreak: number;
  completedTopics: number;
  totalTopics: number;
  averageScore: number;
  lastActive: string;
  subscription: string;
  avatar?: string;
}

const StudentProfilesTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState('all');

  const mockStudents: StudentProfile[] = [
    {
      id: '1',
      name: 'Aryan Sharma',
      email: 'aryan.s@example.com',
      examType: 'IIT-JEE',
      grade: '12th',
      joinDate: '2024-01-15',
      studyStreak: 25,
      completedTopics: 142,
      totalTopics: 200,
      averageScore: 85.5,
      lastActive: '2 hours ago',
      subscription: 'Pro Monthly'
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya.p@example.com',
      examType: 'NEET',
      grade: '12th',
      joinDate: '2024-02-10',
      studyStreak: 18,
      completedTopics: 98,
      totalTopics: 180,
      averageScore: 78.2,
      lastActive: '1 day ago',
      subscription: 'Free'
    },
    {
      id: '3',
      name: 'Vikram Singh',
      email: 'vikram.s@example.com',
      examType: 'UPSC',
      grade: 'Graduate',
      joinDate: '2024-01-05',
      studyStreak: 45,
      completedTopics: 234,
      totalTopics: 300,
      averageScore: 92.1,
      lastActive: '30 mins ago',
      subscription: 'Pro Yearly'
    }
  ];

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExam = selectedExam === 'all' || student.examType === selectedExam;
    return matchesSearch && matchesExam;
  });

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSubscriptionBadge = (subscription: string) => {
    const variants: Record<string, string> = {
      'Free': 'bg-gray-100 text-gray-800',
      'Pro Monthly': 'bg-blue-100 text-blue-800',
      'Pro Yearly': 'bg-purple-100 text-purple-800'
    };
    return variants[subscription] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <p className="text-xs text-muted-foreground">+3.2% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,847</div>
            <p className="text-xs text-muted-foreground">72% of total users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.3%</div>
            <p className="text-xs text-muted-foreground">+1.8% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Student Profiles</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <select 
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md text-sm"
              >
                <option value="all">All Exams</option>
                <option value="IIT-JEE">IIT-JEE</option>
                <option value="NEET">NEET</option>
                <option value="UPSC">UPSC</option>
                <option value="CAT">CAT</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Exam</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Streak</TableHead>
                  <TableHead>Avg Score</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => {
                  const progressPercentage = Math.round((student.completedTopics / student.totalTopics) * 100);
                  return (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.examType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{student.completedTopics}/{student.totalTopics}</span>
                            <span className={getProgressColor(progressPercentage)}>{progressPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-orange-600">{student.studyStreak} days</span>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${getProgressColor(student.averageScore)}`}>
                          {student.averageScore}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSubscriptionBadge(student.subscription)}>
                          {student.subscription}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {student.lastActive}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfilesTab;

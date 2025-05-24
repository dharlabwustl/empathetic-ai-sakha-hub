
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, FileText, Users, Calendar, BookOpen } from 'lucide-react';

interface ExamType {
  id: string;
  name: string;
  fullName: string;
  category: string;
  subjects: string[];
  totalQuestions: number;
  duration: number;
  activeStudents: number;
  contentStatus: 'complete' | 'partial' | 'draft';
  lastUpdated: string;
}

const ExamManagementTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const examTypes: ExamType[] = [
    {
      id: '1',
      name: 'IIT-JEE',
      fullName: 'Indian Institute of Technology Joint Entrance Examination',
      category: 'Engineering',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      totalQuestions: 2500,
      duration: 180,
      activeStudents: 1247,
      contentStatus: 'complete',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      name: 'NEET',
      fullName: 'National Eligibility cum Entrance Test',
      category: 'Medical',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      totalQuestions: 1800,
      duration: 180,
      activeStudents: 923,
      contentStatus: 'complete',
      lastUpdated: '2024-01-14'
    },
    {
      id: '3',
      name: 'UPSC',
      fullName: 'Union Public Service Commission',
      category: 'Civil Services',
      subjects: ['General Studies', 'Current Affairs', 'History', 'Geography'],
      totalQuestions: 3200,
      duration: 120,
      activeStudents: 456,
      contentStatus: 'partial',
      lastUpdated: '2024-01-12'
    },
    {
      id: '4',
      name: 'CAT',
      fullName: 'Common Admission Test',
      category: 'Management',
      subjects: ['Quantitative Aptitude', 'Verbal Ability', 'Data Interpretation'],
      totalQuestions: 1200,
      duration: 180,
      activeStudents: 234,
      contentStatus: 'draft',
      lastUpdated: '2024-01-10'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'complete': 'bg-green-100 text-green-800',
      'partial': 'bg-yellow-100 text-yellow-800',
      'draft': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredExams = examTypes.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exam.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examTypes.length}</div>
            <p className="text-xs text-muted-foreground">4 categories available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examTypes.reduce((sum, exam) => sum + exam.totalQuestions, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all exam types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examTypes.reduce((sum, exam) => sum + exam.activeStudents, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Currently preparing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Complete</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examTypes.filter(e => e.contentStatus === 'complete').length}</div>
            <p className="text-xs text-muted-foreground">Out of {examTypes.length} exams</p>
          </CardContent>
        </Card>
      </div>

      {/* Exam Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Exam Types Management</CardTitle>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Exam
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Engineering">Engineering</option>
              <option value="Medical">Medical</option>
              <option value="Civil Services">Civil Services</option>
              <option value="Management">Management</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Content Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{exam.name}</div>
                        <div className="text-sm text-gray-500">{exam.fullName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{exam.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {exam.subjects.slice(0, 2).join(', ')}
                        {exam.subjects.length > 2 && ` +${exam.subjects.length - 2} more`}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{exam.totalQuestions.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{exam.activeStudents.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(exam.contentStatus)}>
                        {exam.contentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {exam.lastUpdated}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamManagementTab;

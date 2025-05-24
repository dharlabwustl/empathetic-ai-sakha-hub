
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  BookOpen,
  FileText,
  Brain,
  Calculator,
  BarChart3
} from 'lucide-react';

interface RepositoryItem {
  id: string;
  title: string;
  type: 'concept-card' | 'flashcard' | 'exam' | 'formula';
  format: 'text' | 'visual' | 'interactive' | '3d' | 'video';
  subject: string;
  exam: string;
  difficulty: 'easy' | 'medium' | 'hard';
  usage: number;
  rating: number;
  status: 'active' | 'draft' | 'archived';
  createdAt: Date;
  lastUsed: Date;
  tags: string[];
}

const ContentRepositoryTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterExam, setFilterExam] = useState('all');

  // Mock repository data
  const [repositoryItems] = useState<RepositoryItem[]>([
    {
      id: '1',
      title: 'Newton\'s Laws of Motion - Interactive Simulation',
      type: 'concept-card',
      format: 'interactive',
      subject: 'Physics',
      exam: 'IIT JEE',
      difficulty: 'medium',
      usage: 1245,
      rating: 4.8,
      status: 'active',
      createdAt: new Date('2024-01-15'),
      lastUsed: new Date('2024-01-20'),
      tags: ['mechanics', 'forces', 'motion']
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions Flashcards',
      type: 'flashcard',
      format: 'visual',
      subject: 'Chemistry',
      exam: 'NEET',
      difficulty: 'hard',
      usage: 892,
      rating: 4.6,
      status: 'active',
      createdAt: new Date('2024-01-14'),
      lastUsed: new Date('2024-01-19'),
      tags: ['organic', 'reactions', 'mechanisms']
    },
    {
      id: '3',
      title: 'Calculus Integration Practice Exam',
      type: 'exam',
      format: 'text',
      subject: 'Mathematics',
      exam: 'IIT JEE',
      difficulty: 'hard',
      usage: 567,
      rating: 4.5,
      status: 'active',
      createdAt: new Date('2024-01-13'),
      lastUsed: new Date('2024-01-18'),
      tags: ['calculus', 'integration', 'practice']
    },
    {
      id: '4',
      title: 'Thermodynamics Formula Sheet',
      type: 'formula',
      format: 'text',
      subject: 'Physics',
      exam: 'IIT JEE',
      difficulty: 'medium',
      usage: 1123,
      rating: 4.9,
      status: 'active',
      createdAt: new Date('2024-01-12'),
      lastUsed: new Date('2024-01-20'),
      tags: ['thermodynamics', 'formulas', 'reference']
    },
  ]);

  const getTypeIcon = (type: string) => {
    const icons = {
      'concept-card': <BookOpen className="h-4 w-4" />,
      'flashcard': <FileText className="h-4 w-4" />,
      'exam': <Brain className="h-4 w-4" />,
      'formula': <Calculator className="h-4 w-4" />
    };
    return icons[type as keyof typeof icons] || <FileText className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'draft': 'bg-yellow-100 text-yellow-800',
      'archived': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'easy': 'bg-blue-100 text-blue-800',
      'medium': 'bg-orange-100 text-orange-800',
      'hard': 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredItems = repositoryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSubject = filterSubject === 'all' || item.subject === filterSubject;
    const matchesExam = filterExam === 'all' || item.exam === filterExam;

    return matchesSearch && matchesType && matchesSubject && matchesExam;
  });

  const stats = {
    total: repositoryItems.length,
    conceptCards: repositoryItems.filter(i => i.type === 'concept-card').length,
    flashcards: repositoryItems.filter(i => i.type === 'flashcard').length,
    exams: repositoryItems.filter(i => i.type === 'exam').length,
    formulas: repositoryItems.filter(i => i.type === 'formula').length,
    totalUsage: repositoryItems.reduce((sum, item) => sum + item.usage, 0),
    avgRating: (repositoryItems.reduce((sum, item) => sum + item.rating, 0) / repositoryItems.length).toFixed(1)
  };

  return (
    <div className="space-y-6">
      {/* Repository Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Items in repository</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsage.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Student interactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Badge className="h-4 w-4 bg-yellow-100 text-yellow-800">★</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgRating}</div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Content</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {repositoryItems.filter(i => i.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Published items</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Type Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Content Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.conceptCards}</div>
              <div className="text-sm text-blue-800">Concept Cards</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.flashcards}</div>
              <div className="text-sm text-green-800">Flashcards</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.exams}</div>
              <div className="text-sm text-purple-800">Practice Exams</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{stats.formulas}</div>
              <div className="text-sm text-orange-800">Formula Sheets</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Content Repository</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="concept-card">Concept Cards</SelectItem>
                <SelectItem value="flashcard">Flashcards</SelectItem>
                <SelectItem value="exam">Exams</SelectItem>
                <SelectItem value="formula">Formulas</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterExam} onValueChange={setFilterExam}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                <SelectItem value="IIT JEE">IIT JEE</SelectItem>
                <SelectItem value="NEET">NEET</SelectItem>
                <SelectItem value="UPSC">UPSC</SelectItem>
                <SelectItem value="CAT">CAT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      {getTypeIcon(item.type)}
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="flex gap-1 mt-1">
                          {item.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {item.type.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {item.format}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>
                    <Badge className={getDifficultyColor(item.difficulty)}>
                      {item.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.usage.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>{item.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No content found matching your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentRepositoryTab;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Settings, 
  Eye, 
  Shield,
  Zap,
  Users,
  BookOpen,
  MessageSquare
} from 'lucide-react';

interface FeatureAudit {
  id: string;
  featureName: string;
  studentAccess: boolean;
  adminControl: boolean;
  category: 'learning' | 'social' | 'assessment' | 'wellness' | 'content';
  usage: number;
  lastUpdated: string;
  status: 'synced' | 'missing-control' | 'deprecated';
  description: string;
}

const FeatureAuditTab: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const [features] = useState<FeatureAudit[]>([
    {
      id: '1',
      featureName: 'AI Tutor Chat',
      studentAccess: true,
      adminControl: true,
      category: 'learning',
      usage: 2847,
      lastUpdated: '2024-01-15',
      status: 'synced',
      description: '24/7 intelligent tutoring system'
    },
    {
      id: '2',
      featureName: 'Mood Tracking',
      studentAccess: true,
      adminControl: true,
      category: 'wellness',
      usage: 1923,
      lastUpdated: '2024-01-14',
      status: 'synced',
      description: 'Student mood monitoring and analytics'
    },
    {
      id: '3',
      featureName: 'Group Study Sessions',
      studentAccess: true,
      adminControl: false,
      category: 'social',
      usage: 856,
      lastUpdated: '2024-01-10',
      status: 'missing-control',
      description: 'Collaborative study features'
    },
    {
      id: '4',
      featureName: 'Concept Cards',
      studentAccess: true,
      adminControl: true,
      category: 'content',
      usage: 3421,
      lastUpdated: '2024-01-12',
      status: 'synced',
      description: 'Interactive learning cards'
    },
    {
      id: '5',
      featureName: 'Practice Exams',
      studentAccess: true,
      adminControl: true,
      category: 'assessment',
      usage: 2156,
      lastUpdated: '2024-01-13',
      status: 'synced',
      description: 'Mock tests and assessments'
    }
  ]);

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.featureName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || feature.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'bg-green-100 text-green-800';
      case 'missing-control': return 'bg-red-100 text-red-800';
      case 'deprecated': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning': return <BookOpen className="h-4 w-4" />;
      case 'social': return <Users className="h-4 w-4" />;
      case 'assessment': return <CheckCircle className="h-4 w-4" />;
      case 'wellness': return <Shield className="h-4 w-4" />;
      case 'content': return <MessageSquare className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const handleCreateAdminControl = (featureId: string) => {
    toast({
      title: "Admin Control Created",
      description: "Admin oversight for this feature has been implemented.",
    });
  };

  const syncedFeatures = features.filter(f => f.status === 'synced').length;
  const missingControls = features.filter(f => f.status === 'missing-control').length;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Features</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{features.length}</div>
            <p className="text-xs text-muted-foreground">Student-facing features</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Synced Features</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{syncedFeatures}</div>
            <p className="text-xs text-muted-foreground">With admin control</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missing Controls</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{missingControls}</div>
            <p className="text-xs text-muted-foreground">Need admin oversight</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coverage Rate</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((syncedFeatures / features.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Admin coverage</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search features..."
              className="pl-9 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md text-sm"
          >
            <option value="all">All Categories</option>
            <option value="learning">Learning</option>
            <option value="social">Social</option>
            <option value="assessment">Assessment</option>
            <option value="wellness">Wellness</option>
            <option value="content">Content</option>
          </select>
        </div>
      </div>

      {/* Feature Audit Table */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Audit & Control Mapping</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Student Access</TableHead>
                <TableHead>Admin Control</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeatures.map((feature) => (
                <TableRow key={feature.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{feature.featureName}</div>
                      <div className="text-sm text-gray-500">{feature.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(feature.category)}
                      <span className="capitalize">{feature.category}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {feature.studentAccess ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                  </TableCell>
                  <TableCell>
                    {feature.adminControl ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                  </TableCell>
                  <TableCell>{feature.usage.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(feature.status)}>
                      {feature.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {!feature.adminControl && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCreateAdminControl(feature.id)}
                        >
                          <Settings className="h-4 w-4 mr-1" />
                          Add Control
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureAuditTab;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, AlertTriangle, Settings, Eye, BarChart3 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface FeatureAudit {
  id: string;
  featureName: string;
  studentAccess: boolean;
  adminControl: boolean;
  monitoringAvailable: boolean;
  lastAuditDate: string;
  status: 'compliant' | 'partial' | 'missing';
  description: string;
  studentPath: string;
  adminPath: string;
}

const FeatureAuditTab: React.FC = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featureAudits: FeatureAudit[] = [
    {
      id: '1',
      featureName: 'Concept Cards',
      studentAccess: true,
      adminControl: true,
      monitoringAvailable: true,
      lastAuditDate: '2024-01-15',
      status: 'compliant',
      description: 'Interactive learning cards for concept mastery',
      studentPath: '/dashboard/student/concepts',
      adminPath: '/admin/dashboard?tab=content'
    },
    {
      id: '2',
      featureName: 'Flashcards',
      studentAccess: true,
      adminControl: true,
      monitoringAvailable: true,
      lastAuditDate: '2024-01-15',
      status: 'compliant',
      description: 'Spaced repetition flashcard system',
      studentPath: '/dashboard/student/flashcards',
      adminPath: '/admin/dashboard?tab=content'
    },
    {
      id: '3',
      featureName: 'Practice Exams',
      studentAccess: true,
      adminControl: true,
      monitoringAvailable: true,
      lastAuditDate: '2024-01-15',
      status: 'compliant',
      description: 'Comprehensive practice examination system',
      studentPath: '/dashboard/student/practice-exam',
      adminPath: '/admin/dashboard?tab=exams'
    },
    {
      id: '4',
      featureName: 'AI Tutor',
      studentAccess: true,
      adminControl: true,
      monitoringAvailable: false,
      lastAuditDate: '2024-01-15',
      status: 'partial',
      description: '24/7 AI-powered tutoring assistance',
      studentPath: '/dashboard/student/tutor',
      adminPath: '/admin/dashboard?tab=ai-features'
    },
    {
      id: '5',
      featureName: 'Study Plans',
      studentAccess: true,
      adminControl: true,
      monitoringAvailable: true,
      lastAuditDate: '2024-01-15',
      status: 'compliant',
      description: 'Personalized AI-generated study plans',
      studentPath: '/dashboard/student/today',
      adminPath: '/admin/dashboard?tab=study-plan-management'
    },
    {
      id: '6',
      featureName: 'Mood Tracking',
      studentAccess: true,
      adminControl: true,
      monitoringAvailable: true,
      lastAuditDate: '2024-01-15',
      status: 'compliant',
      description: 'Student mood and wellbeing tracking',
      studentPath: '/dashboard/student/feel-good-corner',
      adminPath: '/admin/dashboard?tab=mood-analytics'
    },
    {
      id: '7',
      featureName: 'Progress Analytics',
      studentAccess: true,
      adminControl: false,
      monitoringAvailable: false,
      lastAuditDate: '2024-01-15',
      status: 'missing',
      description: 'Detailed progress tracking and analytics',
      studentPath: '/dashboard/student/analytics',
      adminPath: 'Not Available'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'missing': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <Check className="h-4 w-4" />;
      case 'partial': return <AlertTriangle className="h-4 w-4" />;
      case 'missing': return <X className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const filteredFeatures = featureAudits.filter(feature => {
    if (selectedCategory === 'all') return true;
    return feature.status === selectedCategory;
  });

  const handleCreateAdminControl = (featureId: string) => {
    toast({
      title: "Creating Admin Control",
      description: "Admin control interface is being created for this feature.",
    });
  };

  const handleEnableMonitoring = (featureId: string) => {
    toast({
      title: "Enabling Monitoring",
      description: "Monitoring capabilities are being enabled for this feature.",
    });
  };

  const stats = {
    total: featureAudits.length,
    compliant: featureAudits.filter(f => f.status === 'compliant').length,
    partial: featureAudits.filter(f => f.status === 'partial').length,
    missing: featureAudits.filter(f => f.status === 'missing').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Feature Audit & Mapping</h2>
        <p className="text-muted-foreground">
          Comprehensive audit of student features and their admin oversight capabilities
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Features</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Student-facing features</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.compliant}</div>
            <p className="text-xs text-muted-foreground">Full admin oversight</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partial</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.partial}</div>
            <p className="text-xs text-muted-foreground">Limited oversight</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missing</CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.missing}</div>
            <p className="text-xs text-muted-foreground">No admin control</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Audit Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Feature Audit Results</CardTitle>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="compliant">Compliant</TabsTrigger>
                <TabsTrigger value="partial">Partial</TabsTrigger>
                <TabsTrigger value="missing">Missing</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature Name</TableHead>
                <TableHead>Student Access</TableHead>
                <TableHead>Admin Control</TableHead>
                <TableHead>Monitoring</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Audit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                    <Badge className={feature.studentAccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {feature.studentAccess ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                      {feature.studentAccess ? 'Available' : 'Not Available'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={feature.adminControl ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {feature.adminControl ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                      {feature.adminControl ? 'Available' : 'Missing'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={feature.monitoringAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {feature.monitoringAvailable ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                      {feature.monitoringAvailable ? 'Available' : 'Missing'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(feature.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(feature.status)}
                        {feature.status}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {feature.lastAuditDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" title="View Feature">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {!feature.adminControl && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleCreateAdminControl(feature.id)}
                          title="Create Admin Control"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      )}
                      {!feature.monitoringAvailable && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEnableMonitoring(feature.id)}
                          title="Enable Monitoring"
                        >
                          <BarChart3 className="h-4 w-4" />
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

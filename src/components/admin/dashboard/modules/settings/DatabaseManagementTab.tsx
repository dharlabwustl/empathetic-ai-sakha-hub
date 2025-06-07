
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';
import { Database, Download, RefreshCw, FileJson, FileSpreadsheet, FileCode, Upload, CheckCircle } from 'lucide-react';

const DatabaseManagementTab: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const databaseTables = [
    // Core User Tables
    { name: "users", records: 1580, size: "45.2 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Profile, Dashboard Header", analytics: "Login tracking, subscription metrics" },
    { name: "student_profiles", records: 1208, size: "38.7 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Profile Page, Onboarding", analytics: "Learning preferences, goal tracking" },
    
    // Study Plan & Analytics Tables
    { name: "study_plans", records: 3460, size: "125.8 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Study Plan Page, Dashboard Cards", analytics: "Progress tracking, time allocation" },
    { name: "study_sessions", records: 12568, size: "256.4 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Today's Plan, Analytics", analytics: "Session duration, completion rates" },
    { name: "student_goals", records: 4520, size: "78.9 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Goals Tab, Academic Advisor", analytics: "Goal achievement, milestone tracking" },
    
    // Content & Learning Tables
    { name: "concept_cards", records: 2156, size: "156.7 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Concepts Grid, Detail Pages", analytics: "Completion, mastery, time spent, views" },
    { name: "concept_analytics", records: 15420, size: "89.3 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Concept Detail Analytics", analytics: "Mastery level, average time, understanding score" },
    { name: "flashcard_sets", records: 5670, size: "234.1 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Flashcards Grid, Interactive", analytics: "Accuracy rate, attempts, time per card" },
    { name: "flashcard_analytics", records: 28350, size: "145.6 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Flashcard Performance", analytics: "Streak count, confidence level, mastery" },
    { name: "practice_exams", records: 98, size: "45.6 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Practice Exams Grid", analytics: "Scores, completion rate, time efficiency" },
    { name: "exam_analytics", records: 2940, size: "167.8 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Exam Performance Dashboard", analytics: "Subject-wise performance, improvement trends" },
    
    // AI & Personalization Tables
    { name: "ai_tutor_sessions", records: 9850, size: "567.8 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "AI Tutor Chat, Session History", analytics: "Session duration, satisfaction, effectiveness" },
    { name: "ai_recommendations", records: 5420, size: "78.9 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "AI Recommendations Section", analytics: "Recommendation acceptance, effectiveness" },
    { name: "formula_practice_sessions", records: 7650, size: "123.4 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Formula Lab, Practice Stats", analytics: "Accuracy rate, mastery level, practice streak" },
    
    // Mood & Engagement Tables
    { name: "mood_logs", records: 8540, size: "67.8 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Mood Widget, Timeline", analytics: "Mood trends, study correlation, duration" },
    { name: "feel_good_content", records: 325, size: "23.7 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Feel Good Corner Cards", analytics: "Engagement score, view count, effectiveness" },
    
    // Dashboard & Metrics Tables
    { name: "dashboard_cards", records: 45, size: "2.1 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Dashboard Overview Cards", analytics: "Card interactions, trend data, refresh rates" },
    { name: "performance_metrics", records: 9830, size: "178.9 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Performance Dashboard", analytics: "Overall progress, subject performance" },
    
    // System & Management Tables
    { name: "notifications", records: 12450, size: "234.6 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Notifications Page", analytics: "Read rates, action clicks, engagement" },
    { name: "system_logs", records: 25680, size: "456.8 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Admin Dashboard", analytics: "System performance, error tracking" },
    { name: "user_sessions", records: 18930, size: "298.7 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Admin Analytics", analytics: "Session duration, page views, activity" },
    
    // Subscription & Commerce Tables
    { name: "subscriptions", records: 980, size: "34.5 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Subscription Page, Billing", analytics: "Subscription metrics, upgrade rates" },
    { name: "credit_transactions", records: 3450, size: "67.8 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Credit Purchase, Usage", analytics: "Credit usage patterns, purchase behavior" },
    { name: "payment_history", records: 2890, size: "89.7 MB", lastModified: "2024-01-15", status: "healthy", uiMapping: "Payment History", analytics: "Payment success rates, method preferences" }
  ];

  const handleExportDatabase = async (format: 'csv' | 'json' | 'sql') => {
    setIsExporting(true);
    
    let content = '';
    let filename = '';
    let mimeType = '';

    if (format === 'csv') {
      content = "Table Name,Records,Size,Last Modified,Status,UI Mapping,Analytics Tracked\n" +
        databaseTables.map(table => 
          `"${table.name}","${table.records}","${table.size}","${table.lastModified}","${table.status}","${table.uiMapping}","${table.analytics}"`
        ).join('\n');
      filename = 'prepzr_enhanced_database_schema.csv';
      mimeType = 'text/csv';
    } else if (format === 'json') {
      content = JSON.stringify({
        exportDate: new Date().toISOString(),
        totalTables: databaseTables.length,
        totalRecords: databaseTables.reduce((sum, table) => sum + table.records, 0),
        analytics: {
          conceptCardAnalytics: "Completion rate, mastery level, average study time, view count, understanding score",
          flashcardAnalytics: "Accuracy rate, attempts count, time per card, streak count, confidence level",
          examAnalytics: "Score trends, completion rate, subject-wise performance, improvement tracking",
          dashboardAnalytics: "Card interaction rates, metric trends, user engagement patterns"
        },
        tables: databaseTables.map(table => ({
          ...table,
          schema: {
            primaryKey: 'id',
            indexes: ['created_at', 'updated_at', 'user_id'],
            foreignKeys: table.name.includes('analytics') ? ['user_id', 'content_id'] : ['user_id'],
            analyticsFields: table.analytics
          }
        }))
      }, null, 2);
      filename = 'prepzr_enhanced_database_schema.json';
      mimeType = 'application/json';
    } else if (format === 'sql') {
      content = databaseTables.map(table => {
        return `-- Table: ${table.name} (UI: ${table.uiMapping})
-- Analytics: ${table.analytics}
CREATE TABLE ${table.name} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Analytics fields
  view_count INTEGER DEFAULT 0,
  interaction_count INTEGER DEFAULT 0,
  completion_rate DECIMAL(5,2) DEFAULT 0.00,
  performance_score DECIMAL(5,2) DEFAULT 0.00
);

-- Indexes for ${table.name}
CREATE INDEX idx_${table.name}_user_id ON ${table.name} (user_id);
CREATE INDEX idx_${table.name}_created_at ON ${table.name} (created_at);
CREATE INDEX idx_${table.name}_performance ON ${table.name} (performance_score);

`;
      }).join('\n');
      filename = 'prepzr_enhanced_database_schema.sql';
      mimeType = 'text/plain';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "Export Complete",
        description: `Enhanced database schema with UI mappings exported as ${format.toUpperCase()}`,
      });
    }, 1000);
  };

  const totalRecords = databaseTables.reduce((sum, table) => sum + table.records, 0);
  const totalSize = databaseTables.reduce((sum, table) => {
    const size = parseFloat(table.size.split(' ')[0]);
    return sum + size;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Enhanced Database Management</h3>
          <p className="text-sm text-gray-600">Monitor database with comprehensive UI mappings and analytics tracking</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleExportDatabase('csv')} 
            disabled={isExporting}
            className="gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export CSV
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExportDatabase('json')} 
            disabled={isExporting}
            className="gap-2"
          >
            <FileJson className="h-4 w-4" />
            Export JSON
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExportDatabase('sql')} 
            disabled={isExporting}
            className="gap-2"
          >
            <FileCode className="h-4 w-4" />
            Export SQL
          </Button>
        </div>
      </div>

      {/* Database Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tables</p>
                <p className="text-2xl font-bold">{databaseTables.length}</p>
              </div>
              <Database className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Records</p>
                <p className="text-2xl font-bold">{totalRecords.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Size</p>
                <p className="text-2xl font-bold">{(totalSize / 1000).toFixed(1)} GB</p>
              </div>
              <Upload className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Analytics Tables</p>
                <p className="text-2xl font-bold">{databaseTables.filter(t => t.name.includes('analytics')).length}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Database Tables with UI Mappings */}
      <Card>
        <CardHeader>
          <CardTitle>Database Tables with UI Mappings & Analytics</CardTitle>
          <CardDescription>Complete overview of all database tables with their UI components and analytics tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Table Name</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>UI Mapping</TableHead>
                <TableHead>Analytics Tracked</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {databaseTables.map((table, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{table.name}</TableCell>
                  <TableCell>{table.records.toLocaleString()}</TableCell>
                  <TableCell>{table.size}</TableCell>
                  <TableCell className="text-xs text-blue-600">{table.uiMapping}</TableCell>
                  <TableCell className="text-xs text-green-600">{table.analytics}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      {table.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
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

export default DatabaseManagementTab;

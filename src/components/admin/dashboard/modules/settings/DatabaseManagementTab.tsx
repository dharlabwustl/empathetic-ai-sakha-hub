
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
    // Core Tables
    { name: "users", records: 1247, size: "45.2 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "admin_users", records: 25, size: "1.2 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "student_profiles", records: 1208, size: "38.7 MB", lastModified: "2024-01-15", status: "healthy" },
    
    // Study Plan Tables
    { name: "study_plans", records: 3460, size: "125.8 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "study_sessions", records: 12568, size: "256.4 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "student_goals", records: 4520, size: "78.9 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "study_progress", records: 8950, size: "189.2 MB", lastModified: "2024-01-15", status: "healthy" },
    
    // Content Tables
    { name: "concept_cards", records: 2156, size: "156.7 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "flashcards", records: 5670, size: "234.1 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "practice_exams", records: 98, size: "45.6 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "exam_questions", records: 8750, size: "298.3 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "exam_results", records: 6420, size: "134.2 MB", lastModified: "2024-01-15", status: "healthy" },
    
    // Mood & Analytics Tables
    { name: "mood_logs", records: 8540, size: "67.8 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "mood_analytics", records: 2890, size: "45.3 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "performance_metrics", records: 9830, size: "178.9 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "study_habits", records: 2980, size: "89.4 MB", lastModified: "2024-01-15", status: "healthy" },
    
    // Feel Good Corner Tables
    { name: "feel_good_content", records: 325, size: "23.7 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "jokes_content", records: 156, size: "5.4 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "quotes_content", records: 289, size: "8.9 MB", lastModified: "2024-01-15", status: "healthy" },
    
    // AI & Personalization Tables
    { name: "ai_tutor_chats", records: 9850, size: "567.8 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "ai_model_settings", records: 15, size: "0.8 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "personalization_data", records: 1208, size: "45.6 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "surrounding_influences", records: 7650, size: "123.4 MB", lastModified: "2024-01-15", status: "healthy" },
    
    // Subscription & Credits Tables
    { name: "subscriptions", records: 980, size: "34.5 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "credit_transactions", records: 3450, size: "67.8 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "payment_history", records: 2890, size: "89.7 MB", lastModified: "2024-01-15", status: "healthy" },
    
    // System Tables
    { name: "notifications", records: 12450, size: "234.6 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "system_logs", records: 25680, size: "456.8 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "feature_flags", records: 42, size: "1.2 MB", lastModified: "2024-01-15", status: "healthy" },
    { name: "access_logs", records: 15680, size: "289.4 MB", lastModified: "2024-01-15", status: "healthy" }
  ];

  const handleExportDatabase = async (format: 'csv' | 'json' | 'sql') => {
    setIsExporting(true);
    
    let content = '';
    let filename = '';
    let mimeType = '';

    if (format === 'csv') {
      content = "Table Name,Records,Size,Last Modified,Status\n" +
        databaseTables.map(table => 
          `${table.name},${table.records},${table.size},${table.lastModified},${table.status}`
        ).join('\n');
      filename = 'prepzr_database_schema.csv';
      mimeType = 'text/csv';
    } else if (format === 'json') {
      content = JSON.stringify({
        exportDate: new Date().toISOString(),
        totalTables: databaseTables.length,
        totalRecords: databaseTables.reduce((sum, table) => sum + table.records, 0),
        tables: databaseTables.map(table => ({
          ...table,
          schema: {
            primaryKey: 'id',
            indexes: ['created_at', 'updated_at'],
            foreignKeys: table.name.includes('student') ? ['user_id'] : []
          }
        }))
      }, null, 2);
      filename = 'prepzr_database_schema.json';
      mimeType = 'application/json';
    } else if (format === 'sql') {
      content = databaseTables.map(table => {
        return `-- Table: ${table.name}
CREATE TABLE ${table.name} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for ${table.name}
CREATE INDEX idx_${table.name}_created_at ON ${table.name} (created_at);
CREATE INDEX idx_${table.name}_updated_at ON ${table.name} (updated_at);

`;
      }).join('\n');
      filename = 'prepzr_database_schema.sql';
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
        description: `Database schema exported as ${format.toUpperCase()}`,
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
          <h3 className="text-lg font-medium">Database Management</h3>
          <p className="text-sm text-gray-600">Monitor and export database schema and content</p>
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
                <p className="text-2xl font-bold">{totalSize.toFixed(1)} GB</p>
              </div>
              <Upload className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Health Status</p>
                <p className="text-2xl font-bold text-green-600">100%</p>
              </div>
              <RefreshCw className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Database Tables */}
      <Card>
        <CardHeader>
          <CardTitle>Database Tables</CardTitle>
          <CardDescription>Complete overview of all database tables and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Table Name</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Last Modified</TableHead>
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
                  <TableCell>{table.lastModified}</TableCell>
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


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
    // Core User & Admin Tables
    { name: "users", records: 1247, size: "45.2 MB", lastModified: "2024-01-15", status: "healthy", category: "Core" },
    { name: "admin_users", records: 25, size: "1.2 MB", lastModified: "2024-01-15", status: "healthy", category: "Core" },
    { name: "student_profiles", records: 1208, size: "38.7 MB", lastModified: "2024-01-15", status: "healthy", category: "Core" },
    
    // Enhanced Study Plan Tables
    { name: "study_plans", records: 3460, size: "125.8 MB", lastModified: "2024-01-15", status: "healthy", category: "Study Plans" },
    { name: "study_sessions", records: 12568, size: "256.4 MB", lastModified: "2024-01-15", status: "healthy", category: "Study Plans" },
    { name: "student_goals", records: 4520, size: "78.9 MB", lastModified: "2024-01-15", status: "healthy", category: "Study Plans" },
    { name: "study_progress", records: 8950, size: "189.2 MB", lastModified: "2024-01-15", status: "healthy", category: "Study Plans" },
    { name: "adaptive_learning_paths", records: 2340, size: "89.5 MB", lastModified: "2024-01-15", status: "healthy", category: "Study Plans" },
    
    // Enhanced Concept Cards Tables
    { name: "concept_cards", records: 2156, size: "156.7 MB", lastModified: "2024-01-15", status: "healthy", category: "Content" },
    { name: "concept_card_analytics", records: 15680, size: "234.5 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "concept_visual_content", records: 1890, size: "445.6 MB", lastModified: "2024-01-15", status: "healthy", category: "Content" },
    { name: "concept_3d_models", records: 567, size: "1.2 GB", lastModified: "2024-01-15", status: "healthy", category: "Content" },
    { name: "concept_formula_labs", records: 890, size: "67.8 MB", lastModified: "2024-01-15", status: "healthy", category: "Content" },
    { name: "concept_interactions", records: 25670, size: "345.8 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    
    // Enhanced Flashcards Tables
    { name: "flashcards", records: 5670, size: "234.1 MB", lastModified: "2024-01-15", status: "healthy", category: "Content" },
    { name: "flashcard_analytics", records: 34560, size: "456.7 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "flashcard_attempts", records: 89450, size: "567.8 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "flashcard_accuracy_tracking", records: 67890, size: "234.5 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "flashcard_timing_data", records: 78920, size: "345.6 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    
    // Enhanced Exam & Practice Tables
    { name: "practice_exams", records: 98, size: "45.6 MB", lastModified: "2024-01-15", status: "healthy", category: "Exams" },
    { name: "exam_questions", records: 8750, size: "298.3 MB", lastModified: "2024-01-15", status: "healthy", category: "Exams" },
    { name: "exam_results", records: 6420, size: "134.2 MB", lastModified: "2024-01-15", status: "healthy", category: "Exams" },
    { name: "exam_analytics", records: 12340, size: "278.9 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "exam_performance_tracking", records: 18960, size: "345.7 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "exam_question_analytics", records: 45670, size: "567.8 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    
    // Mood & Wellness Tables
    { name: "mood_logs", records: 8540, size: "67.8 MB", lastModified: "2024-01-15", status: "healthy", category: "Wellness" },
    { name: "mood_analytics", records: 2890, size: "45.3 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "performance_metrics", records: 9830, size: "178.9 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "study_habits", records: 2980, size: "89.4 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    
    // Feel Good Corner Tables
    { name: "feel_good_content", records: 325, size: "23.7 MB", lastModified: "2024-01-15", status: "healthy", category: "Wellness" },
    { name: "feel_good_analytics", records: 4560, size: "78.9 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "jokes_content", records: 156, size: "5.4 MB", lastModified: "2024-01-15", status: "healthy", category: "Wellness" },
    { name: "quotes_content", records: 289, size: "8.9 MB", lastModified: "2024-01-15", status: "healthy", category: "Wellness" },
    { name: "motivational_content", records: 445, size: "12.7 MB", lastModified: "2024-01-15", status: "healthy", category: "Wellness" },
    { name: "feel_good_interactions", records: 12340, size: "156.8 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    
    // AI Tutor Tables
    { name: "ai_tutor_chats", records: 9850, size: "567.8 MB", lastModified: "2024-01-15", status: "healthy", category: "AI Tutor" },
    { name: "ai_tutor_analytics", records: 15670, size: "234.5 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "ai_model_settings", records: 15, size: "0.8 MB", lastModified: "2024-01-15", status: "healthy", category: "AI Tutor" },
    { name: "tutor_response_quality", records: 23450, size: "345.6 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "tutor_session_data", records: 18920, size: "278.9 MB", lastModified: "2024-01-15", status: "healthy", category: "AI Tutor" },
    { name: "tutor_knowledge_base", records: 5670, size: "456.7 MB", lastModified: "2024-01-15", status: "healthy", category: "AI Tutor" },
    
    // Formula Practice Tables
    { name: "formula_practice_sessions", records: 7890, size: "123.4 MB", lastModified: "2024-01-15", status: "healthy", category: "Formula Practice" },
    { name: "formula_analytics", records: 12340, size: "234.5 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "formula_mastery_tracking", records: 15670, size: "189.6 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "formula_attempt_history", records: 34560, size: "456.7 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "formula_difficulty_progression", records: 8920, size: "145.8 MB", lastModified: "2024-01-15", status: "healthy", category: "Formula Practice" },
    
    // Dashboard Analytics Tables
    { name: "dashboard_cards_analytics", records: 23450, size: "345.6 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "user_interaction_tracking", records: 56780, size: "678.9 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "feature_usage_analytics", records: 34560, size: "456.7 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "navigation_analytics", records: 78920, size: "567.8 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    { name: "time_spent_analytics", records: 45670, size: "345.6 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    
    // Personalization Tables
    { name: "personalization_data", records: 1208, size: "45.6 MB", lastModified: "2024-01-15", status: "healthy", category: "Personalization" },
    { name: "surrounding_influences", records: 7650, size: "123.4 MB", lastModified: "2024-01-15", status: "healthy", category: "Personalization" },
    { name: "learning_preferences", records: 3450, size: "67.8 MB", lastModified: "2024-01-15", status: "healthy", category: "Personalization" },
    { name: "adaptive_difficulty_settings", records: 4560, size: "89.7 MB", lastModified: "2024-01-15", status: "healthy", category: "Personalization" },
    
    // Subscription & Payment Tables
    { name: "subscriptions", records: 980, size: "34.5 MB", lastModified: "2024-01-15", status: "healthy", category: "Billing" },
    { name: "credit_transactions", records: 3450, size: "67.8 MB", lastModified: "2024-01-15", status: "healthy", category: "Billing" },
    { name: "payment_history", records: 2890, size: "89.7 MB", lastModified: "2024-01-15", status: "healthy", category: "Billing" },
    { name: "subscription_analytics", records: 5670, size: "123.4 MB", lastModified: "2024-01-15", status: "healthy", category: "Analytics" },
    
    // System Tables
    { name: "notifications", records: 12450, size: "234.6 MB", lastModified: "2024-01-15", status: "healthy", category: "System" },
    { name: "system_logs", records: 25680, size: "456.8 MB", lastModified: "2024-01-15", status: "healthy", category: "System" },
    { name: "feature_flags", records: 42, size: "1.2 MB", lastModified: "2024-01-15", status: "healthy", category: "System" },
    { name: "access_logs", records: 15680, size: "289.4 MB", lastModified: "2024-01-15", status: "healthy", category: "System" },
    { name: "error_logs", records: 8920, size: "145.7 MB", lastModified: "2024-01-15", status: "healthy", category: "System" }
  ];

  const handleExportDatabase = async (format: 'csv' | 'json' | 'sql') => {
    setIsExporting(true);
    
    let content = '';
    let filename = '';
    let mimeType = '';

    if (format === 'csv') {
      content = "Table Name,Records,Size,Last Modified,Status,Category\n" +
        databaseTables.map(table => 
          `${table.name},${table.records},${table.size},${table.lastModified},${table.status},${table.category}`
        ).join('\n');
      filename = 'prepzr_enhanced_database_schema.csv';
      mimeType = 'text/csv';
    } else if (format === 'json') {
      content = JSON.stringify({
        exportDate: new Date().toISOString(),
        totalTables: databaseTables.length,
        totalRecords: databaseTables.reduce((sum, table) => sum + table.records, 0),
        categories: [...new Set(databaseTables.map(t => t.category))],
        tables: databaseTables.map(table => ({
          ...table,
          schema: {
            primaryKey: 'id',
            indexes: ['created_at', 'updated_at', 'user_id'],
            foreignKeys: table.name.includes('student') || table.name.includes('user') ? ['user_id'] : [],
            analyticsFields: table.category === 'Analytics' ? [
              'completion_rate', 'accuracy_percentage', 'average_time', 'attempt_count',
              'mastery_level', 'difficulty_progression', 'performance_trend'
            ] : []
          }
        }))
      }, null, 2);
      filename = 'prepzr_enhanced_database_schema.json';
      mimeType = 'application/json';
    } else if (format === 'sql') {
      content = databaseTables.map(table => {
        let fields = `
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()`;

        // Add category-specific fields
        if (table.category === 'Analytics') {
          fields += `,
  completion_rate DECIMAL(5,2),
  accuracy_percentage DECIMAL(5,2),
  average_time_seconds INTEGER,
  attempt_count INTEGER DEFAULT 0,
  mastery_level INTEGER CHECK (mastery_level >= 0 AND mastery_level <= 100),
  performance_trend TEXT,
  difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 5)`;
        }

        if (table.name.includes('concept')) {
          fields += `,
  concept_id UUID,
  visual_content_url TEXT,
  has_3d_model BOOLEAN DEFAULT FALSE,
  formula_lab_available BOOLEAN DEFAULT FALSE,
  interactive_elements JSONB`;
        }

        if (table.name.includes('flashcard')) {
          fields += `,
  flashcard_id UUID,
  correct_answers INTEGER DEFAULT 0,
  total_attempts INTEGER DEFAULT 0,
  average_response_time DECIMAL(8,2),
  streak_count INTEGER DEFAULT 0`;
        }

        return `-- Table: ${table.name} (${table.category})
CREATE TABLE ${table.name} (${fields}
);

-- Indexes for ${table.name}
CREATE INDEX idx_${table.name}_created_at ON ${table.name} (created_at);
CREATE INDEX idx_${table.name}_updated_at ON ${table.name} (updated_at);
CREATE INDEX idx_${table.name}_user_id ON ${table.name} (user_id);
${table.category === 'Analytics' ? `CREATE INDEX idx_${table.name}_performance ON ${table.name} (completion_rate, accuracy_percentage);` : ''}

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
        description: `Enhanced database schema exported as ${format.toUpperCase()}`,
      });
    }, 1000);
  };

  const totalRecords = databaseTables.reduce((sum, table) => sum + table.records, 0);
  const totalSize = databaseTables.reduce((sum, table) => {
    const sizeValue = parseFloat(table.size.split(' ')[0]);
    const unit = table.size.split(' ')[1];
    return sum + (unit === 'GB' ? sizeValue * 1024 : sizeValue);
  }, 0);

  const categories = [...new Set(databaseTables.map(t => t.category))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Enhanced Database Management</h3>
          <p className="text-sm text-gray-600">Comprehensive database schema with analytics and detailed tracking</p>
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

      {/* Enhanced Database Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                <p className="text-2xl font-bold">{(totalSize / 1024).toFixed(1)} GB</p>
              </div>
              <Upload className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Analytics Tables</p>
                <p className="text-2xl font-bold">{databaseTables.filter(t => t.category === 'Analytics').length}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Database Categories</CardTitle>
          <CardDescription>Tables organized by functionality</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(category => {
              const categoryTables = databaseTables.filter(t => t.category === category);
              const categoryRecords = categoryTables.reduce((sum, t) => sum + t.records, 0);
              
              return (
                <div key={category} className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm">{category}</h4>
                  <p className="text-xs text-gray-600">{categoryTables.length} tables</p>
                  <p className="text-xs text-gray-600">{categoryRecords.toLocaleString()} records</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Database Tables */}
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Database Tables</CardTitle>
          <CardDescription>Complete overview with analytics tracking and detailed schema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Table Name</TableHead>
                <TableHead>Category</TableHead>
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
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${
                      table.category === 'Analytics' ? 'bg-purple-100 text-purple-700' :
                      table.category === 'Core' ? 'bg-blue-100 text-blue-700' :
                      table.category === 'Content' ? 'bg-green-100 text-green-700' :
                      table.category === 'Wellness' ? 'bg-pink-100 text-pink-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {table.category}
                    </Badge>
                  </TableCell>
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

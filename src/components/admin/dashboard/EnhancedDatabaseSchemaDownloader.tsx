
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  RefreshCw, 
  Database, 
  Server, 
  FileJson, 
  FileSpreadsheet, 
  FileText,
  FileImage,
  CheckCircle,
  ExternalLink,
  Copy,
  Code
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AVAILABLE_EXPORTS, API_ENDPOINTS } from '@/services/api/apiConfig';
import apiEndpointService from '@/services/admin/apiEndpointService';
import databaseSyncService from '@/services/admin/databaseSync';

export const EnhancedDatabaseSchemaDownloader = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("endpoints");
  const [apiEndpoints, setApiEndpoints] = useState<any[]>([]);
  const [databaseModules, setDatabaseModules] = useState<any[]>([]);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLoadEndpoints = async () => {
    setIsChecking(true);
    try {
      const endpoints = await apiEndpointService.getApiEndpoints();
      setApiEndpoints(endpoints);
      toast({
        title: "Endpoints Loaded",
        description: "API endpoints have been loaded successfully",
      });
    } catch (error) {
      console.error("Error loading endpoints:", error);
      toast({
        title: "Error",
        description: "Failed to load API endpoints",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleLoadDatabaseModules = async () => {
    setIsChecking(true);
    try {
      const modules = await databaseSyncService.getDatabaseModules();
      setDatabaseModules(modules);
      toast({
        title: "Database Modules Loaded",
        description: "Database modules have been loaded successfully",
      });
    } catch (error) {
      console.error("Error loading database modules:", error);
      toast({
        title: "Error",
        description: "Failed to load database modules",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleExport = async (exportItem: any) => {
    setIsExporting(exportItem.endpoint);
    try {
      let blob: Blob;
      let filename: string;

      switch (exportItem.format) {
        case 'csv':
          const csvData = await generateCSVData();
          blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
          filename = 'prepzr_database_schema.csv';
          break;
        
        case 'json':
          const jsonData = await generateJSONData();
          blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json;charset=utf-8;' });
          filename = 'prepzr_database_schema.json';
          break;
        
        case 'pdf':
          const pdfData = await generatePDFData(exportItem);
          blob = new Blob([pdfData], { type: 'application/pdf' });
          filename = `prepzr_${exportItem.title.toLowerCase().replace(/\s+/g, '_')}.pdf`;
          break;
        
        case 'docx':
          const docxData = await generateDOCXData(exportItem);
          blob = new Blob([docxData], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
          filename = `prepzr_${exportItem.title.toLowerCase().replace(/\s+/g, '_')}.docx`;
          break;
        
        default:
          throw new Error('Unsupported export format');
      }

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setExportSuccess(exportItem.endpoint);
      setTimeout(() => setExportSuccess(null), 3000);

      toast({
        title: "Export Complete",
        description: `${exportItem.title} has been downloaded successfully`,
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: `Failed to export ${exportItem.title}`,
        variant: "destructive",
      });
    } finally {
      setIsExporting(null);
    }
  };

  const generateCSVData = async () => {
    return `table_name,column_name,data_type,is_nullable,column_default,is_primary_key,foreign_key_table,foreign_key_column
users,id,UUID,NO,gen_random_uuid(),YES,,
users,email,VARCHAR(255),NO,,NO,,
users,password,VARCHAR(255),NO,,NO,,
users,name,VARCHAR(255),NO,,NO,,
users,role,VARCHAR(50),NO,'student',NO,,
users,created_at,TIMESTAMP,NO,CURRENT_TIMESTAMP,NO,,
users,updated_at,TIMESTAMP,NO,CURRENT_TIMESTAMP,NO,,
student_profiles,id,UUID,NO,gen_random_uuid(),YES,,
student_profiles,user_id,UUID,NO,,NO,users,id
student_profiles,study_preference,VARCHAR(50),YES,,NO,,
student_profiles,target_exam,VARCHAR(100),YES,,NO,,
student_profiles,learning_style,VARCHAR(50),YES,,NO,,
student_profiles,mood_preferences,JSONB,YES,,NO,,
concepts,id,UUID,NO,gen_random_uuid(),YES,,
concepts,title,VARCHAR(255),NO,,NO,,
concepts,description,TEXT,YES,,NO,,
concepts,subject,VARCHAR(100),NO,,NO,,
concepts,difficulty_level,VARCHAR(20),NO,'medium',NO,,
concepts,content,JSONB,YES,,NO,,
concepts,created_at,TIMESTAMP,NO,CURRENT_TIMESTAMP,NO,,
flashcards,id,UUID,NO,gen_random_uuid(),YES,,
flashcards,concept_id,UUID,YES,,NO,concepts,id
flashcards,front_content,TEXT,NO,,NO,,
flashcards,back_content,TEXT,NO,,NO,,
flashcards,difficulty,VARCHAR(20),NO,'medium',NO,,
flashcards,created_at,TIMESTAMP,NO,CURRENT_TIMESTAMP,NO,,
practice_exams,id,UUID,NO,gen_random_uuid(),YES,,
practice_exams,title,VARCHAR(255),NO,,NO,,
practice_exams,description,TEXT,YES,,NO,,
practice_exams,exam_type,VARCHAR(50),NO,,NO,,
practice_exams,total_questions,INTEGER,NO,,NO,,
practice_exams,time_limit,INTEGER,YES,,NO,,
practice_exams,created_at,TIMESTAMP,NO,CURRENT_TIMESTAMP,NO,,
questions,id,UUID,NO,gen_random_uuid(),YES,,
questions,exam_id,UUID,YES,,NO,practice_exams,id
questions,question_text,TEXT,NO,,NO,,
questions,question_type,VARCHAR(20),NO,'multiple_choice',NO,,
questions,options,JSONB,YES,,NO,,
questions,correct_answer,TEXT,NO,,NO,,
questions,explanation,TEXT,YES,,NO,,
questions,difficulty,VARCHAR(20),NO,'medium',NO,,
study_sessions,id,UUID,NO,gen_random_uuid(),YES,,
study_sessions,user_id,UUID,NO,,NO,users,id
study_sessions,concept_id,UUID,YES,,NO,concepts,id
study_sessions,session_type,VARCHAR(50),NO,,NO,,
study_sessions,duration_minutes,INTEGER,NO,,NO,,
study_sessions,progress_percentage,DECIMAL(5,2),YES,,NO,,
study_sessions,mood_before,INTEGER,YES,,NO,,
study_sessions,mood_after,INTEGER,YES,,NO,,
study_sessions,created_at,TIMESTAMP,NO,CURRENT_TIMESTAMP,NO,,
mood_logs,id,UUID,NO,gen_random_uuid(),YES,,
mood_logs,user_id,UUID,NO,,NO,users,id
mood_logs,mood_score,INTEGER,NO,,NO,,
mood_logs,mood_type,VARCHAR(50),YES,,NO,,
mood_logs,context,TEXT,YES,,NO,,
mood_logs,created_at,TIMESTAMP,NO,CURRENT_TIMESTAMP,NO,,
subscriptions,id,UUID,NO,gen_random_uuid(),YES,,
subscriptions,user_id,UUID,NO,,NO,users,id
subscriptions,plan_type,VARCHAR(50),NO,'free',NO,,
subscriptions,status,VARCHAR(20),NO,'active',NO,,
subscriptions,start_date,DATE,NO,,NO,,
subscriptions,end_date,DATE,YES,,NO,,
subscriptions,created_at,TIMESTAMP,NO,CURRENT_TIMESTAMP,NO,,`;
  };

  const generateJSONData = async () => {
    return {
      database: "prepzr_platform",
      version: "1.0.0",
      generated_at: new Date().toISOString(),
      tables: {
        users: {
          description: "Core user accounts table",
          columns: {
            id: { type: "UUID", primary_key: true, nullable: false },
            email: { type: "VARCHAR(255)", unique: true, nullable: false },
            password: { type: "VARCHAR(255)", nullable: false },
            name: { type: "VARCHAR(255)", nullable: false },
            role: { type: "VARCHAR(50)", default: "student", nullable: false },
            created_at: { type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", nullable: false },
            updated_at: { type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", nullable: false }
          },
          relationships: {
            student_profiles: { type: "one_to_one", foreign_key: "user_id" },
            study_sessions: { type: "one_to_many", foreign_key: "user_id" },
            mood_logs: { type: "one_to_many", foreign_key: "user_id" },
            subscriptions: { type: "one_to_one", foreign_key: "user_id" }
          }
        },
        student_profiles: {
          description: "Extended student information",
          columns: {
            id: { type: "UUID", primary_key: true, nullable: false },
            user_id: { type: "UUID", foreign_key: "users.id", nullable: false },
            study_preference: { type: "VARCHAR(50)", nullable: true },
            target_exam: { type: "VARCHAR(100)", nullable: true },
            learning_style: { type: "VARCHAR(50)", nullable: true },
            mood_preferences: { type: "JSONB", nullable: true }
          }
        },
        concepts: {
          description: "Learning concepts and topics",
          columns: {
            id: { type: "UUID", primary_key: true, nullable: false },
            title: { type: "VARCHAR(255)", nullable: false },
            description: { type: "TEXT", nullable: true },
            subject: { type: "VARCHAR(100)", nullable: false },
            difficulty_level: { type: "VARCHAR(20)", default: "medium", nullable: false },
            content: { type: "JSONB", nullable: true },
            created_at: { type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", nullable: false }
          },
          relationships: {
            flashcards: { type: "one_to_many", foreign_key: "concept_id" },
            study_sessions: { type: "one_to_many", foreign_key: "concept_id" }
          }
        },
        flashcards: {
          description: "Flashcard content for learning",
          columns: {
            id: { type: "UUID", primary_key: true, nullable: false },
            concept_id: { type: "UUID", foreign_key: "concepts.id", nullable: true },
            front_content: { type: "TEXT", nullable: false },
            back_content: { type: "TEXT", nullable: false },
            difficulty: { type: "VARCHAR(20)", default: "medium", nullable: false },
            created_at: { type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", nullable: false }
          }
        },
        practice_exams: {
          description: "Practice examination definitions",
          columns: {
            id: { type: "UUID", primary_key: true, nullable: false },
            title: { type: "VARCHAR(255)", nullable: false },
            description: { type: "TEXT", nullable: true },
            exam_type: { type: "VARCHAR(50)", nullable: false },
            total_questions: { type: "INTEGER", nullable: false },
            time_limit: { type: "INTEGER", nullable: true },
            created_at: { type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", nullable: false }
          },
          relationships: {
            questions: { type: "one_to_many", foreign_key: "exam_id" }
          }
        },
        questions: {
          description: "Questions for practice exams",
          columns: {
            id: { type: "UUID", primary_key: true, nullable: false },
            exam_id: { type: "UUID", foreign_key: "practice_exams.id", nullable: true },
            question_text: { type: "TEXT", nullable: false },
            question_type: { type: "VARCHAR(20)", default: "multiple_choice", nullable: false },
            options: { type: "JSONB", nullable: true },
            correct_answer: { type: "TEXT", nullable: false },
            explanation: { type: "TEXT", nullable: true },
            difficulty: { type: "VARCHAR(20)", default: "medium", nullable: false }
          }
        },
        study_sessions: {
          description: "Student study session tracking",
          columns: {
            id: { type: "UUID", primary_key: true, nullable: false },
            user_id: { type: "UUID", foreign_key: "users.id", nullable: false },
            concept_id: { type: "UUID", foreign_key: "concepts.id", nullable: true },
            session_type: { type: "VARCHAR(50)", nullable: false },
            duration_minutes: { type: "INTEGER", nullable: false },
            progress_percentage: { type: "DECIMAL(5,2)", nullable: true },
            mood_before: { type: "INTEGER", nullable: true },
            mood_after: { type: "INTEGER", nullable: true },
            created_at: { type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", nullable: false }
          }
        },
        mood_logs: {
          description: "Student mood tracking",
          columns: {
            id: { type: "UUID", primary_key: true, nullable: false },
            user_id: { type: "UUID", foreign_key: "users.id", nullable: false },
            mood_score: { type: "INTEGER", nullable: false },
            mood_type: { type: "VARCHAR(50)", nullable: true },
            context: { type: "TEXT", nullable: true },
            created_at: { type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", nullable: false }
          }
        },
        subscriptions: {
          description: "User subscription management",
          columns: {
            id: { type: "UUID", primary_key: true, nullable: false },
            user_id: { type: "UUID", foreign_key: "users.id", nullable: false },
            plan_type: { type: "VARCHAR(50)", default: "free", nullable: false },
            status: { type: "VARCHAR(20)", default: "active", nullable: false },
            start_date: { type: "DATE", nullable: false },
            end_date: { type: "DATE", nullable: true },
            created_at: { type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", nullable: false }
          }
        }
      },
      api_endpoints: apiEndpoints,
      student_admin_modules: Object.keys(API_ENDPOINTS.ADMIN.STUDENT_MODULES)
    };
  };

  const generatePDFData = async (exportItem: any) => {
    // Mock PDF generation - in real implementation, this would use a PDF library
    const content = `PREPZR Platform - ${exportItem.title}

Generated on: ${new Date().toLocaleDateString()}

This document contains comprehensive information about the PREPZR platform architecture, API endpoints, and database schema.

Database Schema Overview:
- Users table: Core user authentication and profile data
- Student Profiles: Extended student information and preferences
- Concepts: Learning materials and topics
- Flashcards: Interactive learning cards
- Practice Exams: Assessment and testing framework
- Study Sessions: Learning progress tracking
- Mood Logs: Emotional state monitoring
- Subscriptions: Payment and access management

API Endpoints:
${Object.entries(API_ENDPOINTS).map(([category, endpoints]) => 
  `${category}:\n${JSON.stringify(endpoints, null, 2)}\n`
).join('\n')}

Student-Admin Module Integration:
All student dashboard modules are connected to corresponding admin management interfaces for comprehensive platform oversight.`;

    return content;
  };

  const generateDOCXData = async (exportItem: any) => {
    // Mock DOCX generation - in real implementation, this would use a DOCX library
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p><w:r><w:t>PREPZR Platform - ${exportItem.title}</w:t></w:r></w:p>
    <w:p><w:r><w:t>Generated: ${new Date().toLocaleDateString()}</w:t></w:r></w:p>
    <w:p><w:r><w:t>${exportItem.description}</w:t></w:r></w:p>
  </w:body>
</w:document>`;
    
    return content;
  };

  const copyEndpoint = (endpoint: string) => {
    navigator.clipboard.writeText(endpoint);
    toast({
      title: "Copied",
      description: "Endpoint copied to clipboard",
    });
  };

  React.useEffect(() => {
    handleLoadEndpoints();
    handleLoadDatabaseModules();
  }, []);

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardTitle className="flex items-center gap-2">
          <Database className="text-blue-600" size={20} />
          Enhanced Database & Documentation Manager
        </CardTitle>
        <CardDescription>
          Comprehensive database schema, API documentation, and export management
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6 pt-6">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="endpoints" className="flex items-center gap-2">
              <Server size={16} />
              <span>API Endpoints</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database size={16} />
              <span>Database Schema</span>
            </TabsTrigger>
            <TabsTrigger value="exports" className="flex items-center gap-2">
              <Download size={16} />
              <span>Export Center</span>
            </TabsTrigger>
            <TabsTrigger value="documentation" className="flex items-center gap-2">
              <FileText size={16} />
              <span>Documentation</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="mt-4">
          <TabsContent value="endpoints" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">API Endpoints Overview</h3>
              <Button 
                variant="outline" 
                onClick={handleLoadEndpoints} 
                disabled={isChecking}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            
            <div className="grid gap-4">
              {apiEndpoints.map((category) => (
                <Card key={category.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      {category.name}
                      <Badge variant="outline">{category.status}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.endpoints.map((endpoint: any) => (
                        <div key={endpoint.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={
                              endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                              endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                              endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm">{endpoint.path}</code>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyEndpoint(endpoint.path)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="database" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Database Modules</h3>
              <Button 
                variant="outline" 
                onClick={handleLoadDatabaseModules} 
                disabled={isChecking}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            
            <div className="grid gap-4">
              {databaseModules.map((module) => (
                <Card key={module.id} className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      {module.name}
                      <Badge variant="outline">{module.status}</Badge>
                    </CardTitle>
                    <CardDescription>
                      Last synced: {new Date(module.lastSynced).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {module.tables.map((table: string) => (
                        <Badge key={table} variant="secondary" className="text-xs">
                          {table}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="exports" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Export Center</h3>
              <p className="text-sm text-gray-600 mb-4">
                Download comprehensive documentation and database schemas in various formats
              </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {AVAILABLE_EXPORTS.map((exportItem) => (
                <Card key={exportItem.endpoint} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      {exportItem.format === 'csv' && <FileSpreadsheet className="h-5 w-5 text-green-600" />}
                      {exportItem.format === 'json' && <FileJson className="h-5 w-5 text-blue-600" />}
                      {exportItem.format === 'pdf' && <FileImage className="h-5 w-5 text-red-600" />}
                      {exportItem.format === 'docx' && <FileText className="h-5 w-5 text-purple-600" />}
                      {exportItem.title}
                    </CardTitle>
                    <CardDescription>{exportItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => handleExport(exportItem)}
                      disabled={isExporting === exportItem.endpoint}
                      className="w-full gap-2"
                    >
                      {exportSuccess === exportItem.endpoint ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : isExporting === exportItem.endpoint ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      {isExporting === exportItem.endpoint ? 'Exporting...' : 'Download'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="documentation" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform Documentation</h3>
              <p className="text-sm text-gray-600 mb-4">
                Access comprehensive platform documentation and integration guides
              </p>
            </div>
            
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Flask Integration Guide</CardTitle>
                  <CardDescription>
                    Complete guide for integrating Flask backend with PREPZR admin dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-3 w-3" />
                      View Online
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Code className="h-3 w-3" />
                      Code Examples
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">API Reference</CardTitle>
                  <CardDescription>
                    Complete API documentation with request/response examples
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-3 w-3" />
                      View Online
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Code className="h-3 w-3" />
                      Postman Collection
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Student-Admin Module Mapping</CardTitle>
                  <CardDescription>
                    Documentation of how student dashboard modules connect to admin management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="font-medium">Student Module</div>
                      <div className="font-medium">Admin Management</div>
                      {Object.keys(API_ENDPOINTS.ADMIN.STUDENT_MODULES).map((module) => (
                        <React.Fragment key={module}>
                          <div className="p-2 bg-blue-50 rounded">{module.replace(/_/g, ' ')}</div>
                          <div className="p-2 bg-green-50 rounded">Admin {module.replace(/_/g, ' ')} Management</div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default EnhancedDatabaseSchemaDownloader;

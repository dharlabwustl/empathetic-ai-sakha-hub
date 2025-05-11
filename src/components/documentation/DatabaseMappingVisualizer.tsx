
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { pageDatabaseMappings, PageDatabaseMapping, DatabaseFieldMapping } from '@/utils/page-database-mapping';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Database, Server, Layout, Table2 } from 'lucide-react';

interface DatabaseMappingVisualizerProps {
  initialPage?: string;
}

const DatabaseMappingVisualizer: React.FC<DatabaseMappingVisualizerProps> = ({ initialPage }) => {
  const [selectedPage, setSelectedPage] = useState<string>(initialPage || pageDatabaseMappings[0].pageName);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  
  const pageMapping = pageDatabaseMappings.find(p => p.pageName === selectedPage);
  
  // Helper function to get a component by name
  const getComponent = (componentName: string): DatabaseFieldMapping | undefined => {
    return pageMapping?.components.find(c => c.component === componentName);
  };
  
  // Set first component when page changes
  const handlePageChange = (pageName: string) => {
    setSelectedPage(pageName);
    const firstComponent = pageDatabaseMappings.find(p => p.pageName === pageName)?.components[0];
    setSelectedComponent(firstComponent?.component || null);
  };
  
  // Currently selected component details
  const selectedComponentData = selectedComponent 
    ? getComponent(selectedComponent) 
    : pageMapping?.components[0];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                Database Mapping Visualization
              </CardTitle>
              <CardDescription>
                Explore how frontend pages connect to the database
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-white dark:bg-gray-800">
                {pageMapping?.components.length || 0} Components
              </Badge>
              <Badge variant="outline" className="bg-white dark:bg-gray-800">
                {new Set(pageMapping?.components.map(c => c.databaseTable)).size || 0} Tables
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="w-full md:w-1/3">
                <label className="text-sm font-medium mb-1 block">Select Page</label>
                <Select value={selectedPage} onValueChange={handlePageChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select page" />
                  </SelectTrigger>
                  <SelectContent>
                    {pageDatabaseMappings.map((page) => (
                      <SelectItem key={page.pageName} value={page.pageName}>
                        <div className="flex items-center gap-2">
                          <Layout className="h-4 w-4" />
                          {page.pageName}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-2/3">
                <label className="text-sm font-medium mb-1 block">Select Component</label>
                <Select 
                  value={selectedComponent || (pageMapping?.components[0]?.component || '')}
                  onValueChange={setSelectedComponent}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select component" />
                  </SelectTrigger>
                  <SelectContent>
                    {pageMapping?.components.map((component) => (
                      <SelectItem key={component.component} value={component.component}>
                        <div className="flex items-center gap-2">
                          <Table2 className="h-4 w-4" />
                          {component.component}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {pageMapping && selectedComponentData && (
              <Tabs defaultValue="fields" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="fields" className="flex-1">
                    <div className="flex items-center gap-2">
                      <Table2 className="h-4 w-4" />
                      <span>Fields Mapping</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="database" className="flex-1">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <span>Database Details</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="api" className="flex-1">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4" />
                      <span>API Endpoint</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="fields" className="border rounded-md mt-6">
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <span className="text-blue-600">{selectedComponentData.component}</span>
                      <span className="text-gray-400 text-sm">fields mapping</span>
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      How frontend fields map to database columns
                    </p>
                    
                    <div className="overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted">
                            <TableHead className="w-1/4">Frontend Field</TableHead>
                            <TableHead className="w-1/4">Database Field</TableHead>
                            <TableHead className="w-1/6">Data Type</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedComponentData.fields.map((field) => (
                            <TableRow key={field.frontendField}>
                              <TableCell className="font-medium">{field.frontendField}</TableCell>
                              <TableCell className="font-mono text-sm">{field.databaseField}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{field.dataType}</Badge>
                              </TableCell>
                              <TableCell className="text-sm text-gray-600 dark:text-gray-400">{field.description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="database" className="border rounded-md mt-6">
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <Database className="h-4 w-4 text-blue-600" />
                      <span>Database Table:</span>
                      <span className="font-mono">{selectedComponentData.databaseTable}</span>
                    </h3>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mt-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap">
{`CREATE TABLE ${selectedComponentData.databaseTable} (
  id UUID PRIMARY KEY,
${selectedComponentData.fields.map(f => `  ${f.databaseField} ${f.dataType.toUpperCase()},`).join('\n')}
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);`}
                      </pre>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Related Tables</h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(pageMapping.components.map(c => c.databaseTable)))
                          .filter(table => table !== selectedComponentData.databaseTable)
                          .map(table => (
                            <Badge key={table} variant="secondary" className="font-mono text-xs">
                              {table}
                            </Badge>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="api" className="border rounded-md mt-6">
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <Server className="h-4 w-4 text-blue-600" />
                      <span>API Endpoint</span>
                    </h3>
                    
                    {selectedComponentData.apiEndpoint ? (
                      <>
                        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md font-mono">
                          {selectedComponentData.apiEndpoint}
                        </div>
                        
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">GET Request Example</h4>
                            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md font-mono text-xs">
  <pre className="whitespace-pre-wrap">{`// Example API fetch request
const fetchData = async () => {
  const response = await fetch(
    \`\${API_BASE_URL}${selectedComponentData.apiEndpoint.replace(':studentId', '{userId}')
      .replace(':conceptId', '{conceptId}')
      .replace(':examId', '{examId}')
      .replace(':deckId', '{deckId}')
      .replace(':formulaId', '{formulaId}')
      .replace(':paperId', '{paperId}')
      .replace(':planId', '{planId}')}\`,
    {
      headers: {
        Authorization: \`Bearer \${authToken}\`
      }
    }
  );
  return await response.json();
};`}</pre>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-yellow-500">No API endpoint defined for this component</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseMappingVisualizer;

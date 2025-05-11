
import React, { useState } from 'react';
import { getDatabaseMappingData } from '@/utils/page-database-mapping';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Database, Table2, Link2, FileJson, ArrowRightLeft } from "lucide-react";
import { motion } from 'framer-motion';

const DatabaseMappingVisualizer = () => {
  const [selectedPage, setSelectedPage] = useState('Dashboard');
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tables' | 'api'>('tables');
  
  const mappingData = getDatabaseMappingData();
  const currentPage = mappingData.find(page => page.name === selectedPage);
  
  // Set initial active component when page changes
  React.useEffect(() => {
    if (currentPage && currentPage.components.length > 0) {
      setActiveComponent(currentPage.components[0].name);
    } else {
      setActiveComponent(null);
    }
  }, [selectedPage, currentPage]);

  const currentComponent = currentPage?.components.find(comp => comp.name === activeComponent);
  
  const handlePageChange = (newPage: string) => {
    setSelectedPage(newPage);
  };
  
  const handleComponentChange = (componentName: string) => {
    setActiveComponent(componentName);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  if (!currentPage) {
    return <div>No page data available</div>;
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="page-select" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Select a Page
              </label>
              <Select value={selectedPage} onValueChange={handlePageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent>
                  {mappingData.map(page => (
                    <SelectItem key={page.name} value={page.name}>
                      {page.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {currentPage.components.length > 0 && (
              <div className="flex-1">
                <label htmlFor="component-select" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Select a Component
                </label>
                <Select value={activeComponent || ''} onValueChange={handleComponentChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a component" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentPage.components.map(comp => (
                      <SelectItem key={comp.name} value={comp.name}>
                        {comp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          {/* Current Page Info */}
          <div className="mb-6">
            <h3 className="text-lg font-medium flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-2">
                <Link2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </span>
              Page Route: <code className="ml-2 text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{currentPage.route}</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{currentPage.description}</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Component View */}
      {currentComponent && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Card>
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50">
              <motion.div variants={itemVariants} className="flex items-start gap-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                  <FileJson className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle>{currentComponent.name}</CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Located at: <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">{currentComponent.location}</code>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{currentComponent.description}</p>
                </div>
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div variants={itemVariants}>
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'tables' | 'api')}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="tables" className="flex items-center gap-2">
                      <Table2 className="h-4 w-4" />
                      Database Tables
                    </TabsTrigger>
                    <TabsTrigger value="api" className="flex items-center gap-2">
                      <ArrowRightLeft className="h-4 w-4" />
                      API Endpoints
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tables" className="space-y-6">
                    {currentComponent.databaseTables.map((table, tableIndex) => (
                      <motion.div 
                        key={table.name}
                        variants={itemVariants}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-b">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                                <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-lg">{table.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{table.description}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800/50">
                              Primary Key: {table.primaryKey}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h5 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Fields Mapping</h5>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Frontend Field</TableHead>
                                  <TableHead>Database Column</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Required</TableHead>
                                  <TableHead>Description</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {table.fields.map((field, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{field.frontendField}</TableCell>
                                    <TableCell><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">{field.databaseColumn}</code></TableCell>
                                    <TableCell>{field.type}</TableCell>
                                    <TableCell>
                                      {field.isRequired ? (
                                        <span className="text-green-600 dark:text-green-400">Yes</span>
                                      ) : (
                                        <span className="text-gray-500">No</span>
                                      )}
                                    </TableCell>
                                    <TableCell>{field.description}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          
                          {table.relationships && table.relationships.length > 0 && (
                            <div className="mt-4">
                              <h5 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Relationships</h5>
                              <ul className="space-y-2">
                                {table.relationships.map((rel, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <Badge variant="outline" className="mt-0.5 bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/50">
                                      {rel.type}
                                    </Badge>
                                    <span>
                                      <strong>{rel.table}</strong>: {rel.description}
                                      {rel.throughTable && (
                                        <span className="block text-sm text-gray-500 dark:text-gray-400">
                                          Through table: <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">{rel.throughTable}</code>
                                        </span>
                                      )}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="api">
                    <motion.div
                      variants={itemVariants}
                      className="border rounded-lg overflow-hidden p-4"
                    >
                      <h4 className="font-medium mb-4 flex items-center gap-2">
                        <ArrowRightLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
                        API Endpoints
                      </h4>
                      
                      <ul className="space-y-4">
                        {currentComponent.apiEndpoints.map((endpoint, idx) => (
                          <li key={idx} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className={
                                endpoint.method === 'GET' 
                                  ? "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50"
                                  : endpoint.method === 'POST'
                                    ? "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50"
                                    : endpoint.method === 'PUT' || endpoint.method === 'PATCH'
                                      ? "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800/50"
                                      : "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50"
                              }>
                                {endpoint.method}
                              </Badge>
                              <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{endpoint.path}</code>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 pl-6 text-sm">{endpoint.description}</p>
                            
                            {endpoint.parameters && endpoint.parameters.length > 0 && (
                              <div className="mt-2 pl-6">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Parameters:</p>
                                <ul className="space-y-1">
                                  {endpoint.parameters.map((param, pIdx) => (
                                    <li key={pIdx} className="text-sm flex items-start gap-2">
                                      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">{param.name}</code>
                                      <span className="text-gray-500 dark:text-gray-400">
                                        ({param.type}, {param.isRequired ? 'required' : 'optional'}): {param.description}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default DatabaseMappingVisualizer;

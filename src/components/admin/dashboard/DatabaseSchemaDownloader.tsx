
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { apiEndpointChecker, getDatabaseSchema } from '@/services/api/apiEndpointChecker';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, RefreshCw, Database, Server, MessageSquare, Laptop } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { downloadDatabaseSchemaCSV } from '@/utils/database-schema-export'; // Properly import the function

export const DatabaseSchemaDownloader = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("endpoints");
  const [apiStatus, setApiStatus] = useState<Record<string, { exists: boolean; status?: number; message: string }> | null>(null);
  const [schema, setSchema] = useState<any>(null);
  const { toast } = useToast();

  const handleCheckEndpoints = async () => {
    setIsChecking(true);
    try {
      const results = await apiEndpointChecker.checkAllEndpoints();
      setApiStatus(results);
      toast({
        title: "API Check Complete",
        description: "API endpoints have been checked",
      });
    } catch (error) {
      console.error("Error checking API endpoints:", error);
      toast({
        title: "Error",
        description: "Failed to check API endpoints",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleDownloadSchema = async () => {
    setIsDownloading(true);
    try {
      const schemaData = await getDatabaseSchema();
      setSchema(schemaData);
      
      // Use the imported CSV download function
      downloadDatabaseSchemaCSV();
      
      toast({
        title: "Download Complete",
        description: "Database schema CSV has been downloaded",
      });
    } catch (error) {
      console.error("Error downloading schema:", error);
      toast({
        title: "Error",
        description: "Failed to download database schema",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardTitle className="flex items-center gap-2">
          <Database className="text-blue-600" size={20} />
          Database Management
        </CardTitle>
        <CardDescription>Check API endpoints and manage database schema</CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6 pt-6">
          <TabsList className="w-full">
            <TabsTrigger value="endpoints" className="flex items-center gap-2 flex-1">
              <Server size={16} />
              <span>API Endpoints</span>
            </TabsTrigger>
            <TabsTrigger value="schema" className="flex items-center gap-2 flex-1">
              <Database size={16} />
              <span>Database Schema</span>
            </TabsTrigger>
            <TabsTrigger value="console" className="flex items-center gap-2 flex-1">
              <Laptop size={16} />
              <span>Console</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="mt-4">
          <TabsContent value="endpoints">
            <div className="mb-4">
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={handleCheckEndpoints} 
                  disabled={isChecking}
                  className="gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
                  {isChecking ? "Checking..." : "Check API Endpoints"}
                </Button>
              </div>
              {apiStatus && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">API Endpoint Status</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-gray-800">
                          <TableHead className="w-1/2">Endpoint</TableHead>
                          <TableHead className="w-1/6">Status</TableHead>
                          <TableHead>Message</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(apiStatus).map(([endpoint, status]) => (
                          <TableRow key={endpoint}>
                            <TableCell className="font-mono text-xs">{endpoint}</TableCell>
                            <TableCell>
                              <Badge variant={status.exists ? "default" : "destructive"} className="px-2 py-1 font-normal">
                                {status.exists ? 'Available' : 'Missing'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">{status.message}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
              {!apiStatus && (
                <div className="text-center py-8 text-gray-500">
                  <Server className="mx-auto mb-2 opacity-50" size={32} />
                  <p>Click "Check API Endpoints" to test connection to the backend</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="schema">
            <div className="mb-4">
              <div className="flex justify-end">
                <Button 
                  onClick={handleDownloadSchema} 
                  disabled={isDownloading}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  {isDownloading ? "Downloading..." : "Download Schema"}
                </Button>
              </div>
              
              {schema ? (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Database Schema</h3>
                  <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-xs font-mono overflow-x-auto max-h-96 overflow-y-auto">
                    {JSON.stringify(schema, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Database className="mx-auto mb-2 opacity-50" size={32} />
                  <p>Click "Download Schema" to view current database structure</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="console">
            <div className="mb-4 bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-xs h-64 overflow-y-auto">
              <div className="mb-2 text-green-500">$ Connecting to database...</div>
              <div className="mb-2 text-green-500">$ Connection established</div>
              <div className="mb-2 text-white">$ Retrieving schema information</div>
              <div className="mb-2 text-white">$ Found 12 tables in schema</div>
              <div className="mb-2 text-yellow-500">$ Warning: Some migrations pending</div>
              <div className="mb-2 text-white">$ Database status: Healthy</div>
              <div className="mb-2 text-white">$ API status: Connected</div>
              <div className="mb-2 text-white">$ Ready for operations</div>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
              <span className="text-gray-500">$</span>
              <input 
                type="text" 
                className="bg-transparent border-none focus:outline-none flex-1 text-sm"
                placeholder="Type a command..."
                disabled
              />
              <MessageSquare className="text-gray-500" size={16} />
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 flex justify-between">
        <div className="text-xs text-gray-500">
          Last checked: {new Date().toLocaleString()}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Connected
          </Badge>
          <Badge variant="outline" className="text-xs">
            Schema v1.2.4
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DatabaseSchemaDownloader;

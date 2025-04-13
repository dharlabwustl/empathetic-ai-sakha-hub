
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { apiEndpointChecker, getDatabaseSchema } from '@/services/api/apiEndpointChecker';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DatabaseSchemaDownloader = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [apiStatus, setApiStatus] = useState<Record<string, { exists: boolean; status?: number; message: string }> | null>(null);
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
      const schema = await getDatabaseSchema();
      
      // Create a downloadable JSON file
      const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create an anchor element and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'database-schema.json';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Complete",
        description: "Database schema has been downloaded",
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
      <CardHeader>
        <CardTitle>Database Management</CardTitle>
        <CardDescription>Check API endpoints and download database schema</CardDescription>
      </CardHeader>
      
      <CardContent>
        {apiStatus && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">API Endpoint Status</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(apiStatus).map(([endpoint, status]) => (
                  <TableRow key={endpoint}>
                    <TableCell className="font-mono text-xs">{endpoint}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${status.exists ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {status.exists ? 'Available' : 'Missing'}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{status.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500 mb-2">
            You can check API endpoints to verify connection to the backend services and download the current database schema for reference.
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleCheckEndpoints} 
          disabled={isChecking}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
          {isChecking ? "Checking..." : "Check API Endpoints"}
        </Button>
        
        <Button 
          onClick={handleDownloadSchema} 
          disabled={isDownloading}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          {isDownloading ? "Downloading..." : "Download Schema"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DatabaseSchemaDownloader;

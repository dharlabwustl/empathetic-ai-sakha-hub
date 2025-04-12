
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DoubtResponderSection = () => {
  const { toast } = useToast();
  
  const handleViewLogs = () => {
    toast({
      title: "Doubt Responder Logs",
      description: "Opening doubt responder interaction logs",
      variant: "default"
    });
  };
  
  const handleManageKB = () => {
    toast({
      title: "Knowledge Base Management",
      description: "Opening knowledge base management interface",
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Doubt Auto-Responder</span>
          <Button variant="outline" size="sm" onClick={handleViewLogs}>Logs</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center">
                <Database className="h-4 w-4 mr-2 text-yellow-500" />
                Knowledge Base
              </h3>
              <span className="text-sm text-yellow-600">94% accuracy</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Total Entries:</span>
                <p className="font-bold">2,458</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Doubts Resolved:</span>
                <p className="font-bold">9,872</p>
              </div>
            </div>
          </div>
          <Button size="sm" className="w-full" onClick={handleManageKB}>Manage Knowledge Base</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoubtResponderSection;

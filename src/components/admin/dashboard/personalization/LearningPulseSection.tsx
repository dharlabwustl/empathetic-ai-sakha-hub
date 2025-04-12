
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, BarChart2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LearningPulseSection = () => {
  const { toast } = useToast();
  
  const handleViewReports = () => {
    toast({
      title: "Learning Pulse Reports",
      description: "Opening learning pulse report logs",
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Learning Pulse Generator</span>
          <Button variant="outline" size="sm" onClick={handleViewReports}>Reports</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center">
                <BarChart2 className="h-4 w-4 mr-2 text-green-500" />
                Pulse Analytics
              </h3>
              <span className="text-sm text-green-600">458 reports</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Avg. Mood Score:</span>
                <p className="font-bold">7.4/10</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Readiness Rate:</span>
                <p className="font-bold">82%</p>
              </div>
            </div>
          </div>
          <Button size="sm" className="w-full">Configure Alerts</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningPulseSection;

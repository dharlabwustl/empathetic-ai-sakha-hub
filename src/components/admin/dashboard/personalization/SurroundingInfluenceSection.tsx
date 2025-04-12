
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SurroundingInfluenceSection = () => {
  const { toast } = useToast();
  
  const handleConfigure = () => {
    toast({
      title: "Configure Surrounding Influence Meter",
      description: "Opening configuration panel for influence measurement",
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Surrounding Influence Meter</span>
          <Button variant="outline" size="sm" onClick={handleConfigure}>Configure</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center">
                <Activity className="h-4 w-4 mr-2 text-purple-500" />
                Influence Factors
              </h3>
              <span className="text-sm text-purple-600">12 metrics</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Positive Influence:</span>
                <p className="font-bold">68%</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Negative Influence:</span>
                <p className="font-bold">32%</p>
              </div>
            </div>
          </div>
          <Button size="sm" className="w-full">View Influence Dashboard</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurroundingInfluenceSection;

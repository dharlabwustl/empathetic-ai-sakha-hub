
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PeerCommunityFeedSection = () => {
  const { toast } = useToast();
  
  const handleManageContent = () => {
    toast({
      title: "Manage Peer Content",
      description: "Opening peer content management interface",
      variant: "default"
    });
  };
  
  const handleConfigureFilters = () => {
    toast({
      title: "Configure Content Filters",
      description: "Opening filter configuration for peer content",
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Peer Community Feed Tuner</span>
          <Button variant="outline" size="sm" onClick={handleManageContent}>Manage</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center">
                <Shield className="h-4 w-4 mr-2 text-blue-500" />
                Content Moderation
              </h3>
              <span className="text-sm text-blue-600">92% accuracy</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-xl font-bold">428</div>
                <div className="text-xs text-gray-600">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">24</div>
                <div className="text-xs text-gray-600">Flagged</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">8</div>
                <div className="text-xs text-gray-600">Removed</div>
              </div>
            </div>
          </div>
          <Button size="sm" className="w-full" onClick={handleConfigureFilters}>Configure Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeerCommunityFeedSection;

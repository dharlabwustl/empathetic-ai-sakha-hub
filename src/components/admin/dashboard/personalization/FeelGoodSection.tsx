
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const FeelGoodSection = () => {
  const { toast } = useToast();
  
  const handleManage = () => {
    toast({
      title: "Feel-Good Corner",
      description: "Opening feel-good content management interface",
      variant: "default"
    });
  };
  
  const handleUploadContent = () => {
    toast({
      title: "Upload Content",
      description: "Opening content upload interface for feel-good corner",
      variant: "default"
    });
  };
  
  const handleReviewFlagged = () => {
    toast({
      title: "Review Flagged Content",
      description: "Opening flagged content review interface",
      variant: "default"
    });
    
    // Simulate API call to Flask backend
    setTimeout(() => {
      toast({
        title: "Content Reviewed",
        description: "Flagged content has been reviewed and updated",
        variant: "default"
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Feel-Good Corner</span>
          <Button variant="outline" size="sm" onClick={handleManage}>Manage</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Content Engagement</h3>
              <span className="text-sm text-green-600">+12% this week</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-xl font-bold">285</div>
                <div className="text-xs text-gray-600">Memes</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">142</div>
                <div className="text-xs text-gray-600">Puzzles</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">364</div>
                <div className="text-xs text-gray-600">Jokes</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={handleUploadContent}>Upload Content</Button>
            <Button variant="outline" size="sm" onClick={handleReviewFlagged}>Review Flagged</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeelGoodSection;


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MoodBasedSuggestionsSection = () => {
  const { toast } = useToast();
  
  const handleConfigure = () => {
    toast({
      title: "Configure Mood-Based Suggestions",
      description: "Opening configuration panel for mood-based content suggestions",
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Mood-Based Suggestions</span>
          <Button variant="outline" size="sm" onClick={handleConfigure}>Configure</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center">
                <Smile className="h-4 w-4 mr-2 text-pink-500" />
                Sentiment Analysis
              </h3>
              <span className="text-sm text-green-600">93% accuracy</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Content Triggers:</span>
                <p className="font-bold">582</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Feedback Rate:</span>
                <p className="font-bold">76%</p>
              </div>
            </div>
          </div>
          <Button size="sm" className="w-full">View Mood Analytics</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodBasedSuggestionsSection;

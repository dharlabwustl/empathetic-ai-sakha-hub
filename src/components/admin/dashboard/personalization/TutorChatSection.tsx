
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TutorChatSection = () => {
  const { toast } = useToast();
  
  const handleViewChats = () => {
    toast({
      title: "Tutor Chat Logs",
      description: "Opening tutor chat interaction logs",
      variant: "default"
    });
  };
  
  const handleEscalateIssues = () => {
    toast({
      title: "Escalate Issues",
      description: "Opening issue escalation interface",
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>24x7 Tutor Chat</span>
          <Button variant="outline" size="sm" onClick={handleViewChats}>View Chats</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center">
                <Clock className="h-4 w-4 mr-2 text-pink-500" />
                Activity Stats
              </h3>
              <span className="text-sm text-pink-600">24/7 active</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Total Chats:</span>
                <p className="font-bold">1,248</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Avg. Rating:</span>
                <p className="font-bold">4.8/5</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-md col-span-2">
                <span className="text-sm text-gray-600">Issues Escalated:</span>
                <p className="font-bold">42 <span className="text-xs text-gray-500">(3.4%)</span></p>
              </div>
            </div>
          </div>
          <Button size="sm" className="w-full" onClick={handleEscalateIssues}>Escalate Issues</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorChatSection;


import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Trophy, Gift, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BrainTeaserPromo: React.FC = () => {
  const navigate = useNavigate();

  const handleParticipate = () => {
    navigate("/dashboard/student/feel-good-corner");
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-sm">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-purple-800 text-sm">Brain Teasers</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 text-purple-500" />
            <span className="text-xs text-purple-700">Weekly: Bags, Gym Passes</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span className="text-xs text-purple-700">Monthly: Laptops & More!</span>
          </div>
        </div>

        <Button 
          onClick={handleParticipate}
          size="sm" 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs"
        >
          <Zap className="h-3 w-3 mr-1" />
          Participate & Win
        </Button>
      </CardContent>
    </Card>
  );
};

export default BrainTeaserPromo;

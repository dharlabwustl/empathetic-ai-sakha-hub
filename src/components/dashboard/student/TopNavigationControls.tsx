
import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, Zap } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
}

const TopNavigationControls: React.FC<TopNavigationControlsProps> = ({
  hideSidebar,
  onToggleSidebar,
  formattedDate,
  formattedTime
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center justify-between mb-4">
      {/* Empty div to balance layout on small screens */}
      <div></div>

      {/* Date and Time display */}
      <div className="hidden sm:flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{formattedDate}</span>
        <span className="text-sm text-muted-foreground">•</span>
        <span className="text-sm text-muted-foreground">{formattedTime}</span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <Button
          onClick={() => navigate('/dashboard/student/tutor')}
          variant="outline"
          className="flex items-center gap-2 text-violet-600 border-violet-200 hover:bg-violet-50"
          size="sm"
        >
          <Zap size={16} className="text-violet-500" />
          <span className="hidden sm:inline">24/7 AI Tutor</span>
          <span className="sm:hidden">AI Tutor</span>
        </Button>
        
        <Button
          onClick={() => navigate('/dashboard/student/feel-good')}
          variant="outline"
          className="flex items-center gap-2 bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100"
          size="sm"
        >
          <Heart size={16} className="text-pink-500" />
          <span className="hidden sm:inline">Feel Good Corner</span>
          <span className="sm:hidden">Feel Good</span>
        </Button>
      </div>
    </div>
  );
};

export default TopNavigationControls;

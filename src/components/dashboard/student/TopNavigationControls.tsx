
import React from 'react';
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
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
          variant="default"
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 text-white flex items-center gap-2"
          size="sm"
        >
          <Zap size={16} className="text-yellow-300" />
          <span className="hidden sm:inline">24/7 AI Tutor</span>
          <span className="sm:hidden">AI Tutor</span>
        </Button>
      </div>
    </div>
  );
};

export default TopNavigationControls;

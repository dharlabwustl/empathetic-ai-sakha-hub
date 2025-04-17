
import React from "react";
import { Button } from "@/components/ui/button";

interface ExplanationTabButtonProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

export const ExplanationTabButton: React.FC<ExplanationTabButtonProps> = ({
  title,
  isActive,
  onClick
}) => {
  return (
    <Button 
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={isActive ? "bg-violet-600" : ""}
    >
      {title}
    </Button>
  );
};

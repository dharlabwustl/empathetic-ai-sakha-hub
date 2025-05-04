
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { EnhancedTooltip } from "./enhanced-tooltip";

interface BackButtonProps {
  to: string;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to, label = "Back" }) => {
  return (
    <EnhancedTooltip content="Go back to the previous page">
      <Button
        variant="outline"
        size="sm"
        className="mb-4 flex items-center gap-1"
        asChild
      >
        <Link to={to}>
          <ArrowLeft className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      </Button>
    </EnhancedTooltip>
  );
};

export default BackButton;

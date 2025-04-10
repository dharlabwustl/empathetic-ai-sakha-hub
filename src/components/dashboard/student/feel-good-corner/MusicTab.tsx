
import { Button } from "@/components/ui/button";
import { Coffee, Wind, Music } from "lucide-react";

export function MusicTab() {
  return (
    <div className="p-4 flex flex-col items-center">
      <div className="text-center mb-4">
        <p className="text-sm font-medium">Mood-Based Music</p>
        <p className="text-xs text-muted-foreground">Focus & Relaxation</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Coffee size={14} /> <span>LoFi</span>
        </Button>
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Wind size={14} /> <span>Nature</span>
        </Button>
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Music size={14} /> <span>Classical</span>
        </Button>
      </div>
    </div>
  );
}

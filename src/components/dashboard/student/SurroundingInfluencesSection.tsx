
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SurroundingInfluencesMeter } from "./SurroundingInfluencesMeter";
import { useToast } from "@/hooks/use-toast";

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed,
}) => {
  const [showStoryDialog, setShowStoryDialog] = useState(false);
  const [story, setStory] = useState("");
  const { toast } = useToast();
  
  const handlePostStory = () => {
    if (!story.trim()) {
      toast({
        title: "Story cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Story posted!",
      description: "Thank you for sharing your experience.",
    });
    
    setStory("");
    setShowStoryDialog(false);
    
    // Here you would typically save the story to your backend
    // For now, we'll just simulate by storing it to localStorage
    const existingStories = JSON.parse(localStorage.getItem("influenceStories") || "[]");
    existingStories.push({
      id: Date.now().toString(),
      content: story,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("influenceStories", JSON.stringify(existingStories));
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Surrounding Influences Meter</h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowStoryDialog(true)}
          >
            Share Your Story
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
          >
            {influenceMeterCollapsed ? "Expand" : "Collapse"}
          </Button>
        </div>
      </div>
      
      {!influenceMeterCollapsed && (
        <SurroundingInfluencesMeter />
      )}
      
      {/* Share Story Dialog */}
      <Dialog open={showStoryDialog} onOpenChange={setShowStoryDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Share Your Story</DialogTitle>
            <DialogDescription>
              Let others know how external factors are affecting your studies. Your story might help someone else!
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Type your story here... What's influencing your study habits right now?"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={5}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStoryDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePostStory}>
              Post Story
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SurroundingInfluencesSection;

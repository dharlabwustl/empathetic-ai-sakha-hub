
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Share2, Send } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import SurroundingInfluencesMeter from '@/components/dashboard/student/SurroundingInfluencesMeter';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  const [showStoryForm, setShowStoryForm] = React.useState(false);
  const [storyText, setStoryText] = React.useState('');
  
  const handleShareStory = () => {
    if (storyText.trim()) {
      // Here we would typically save the story to backend
      console.log("Sharing story:", storyText);
      setStoryText('');
      setShowStoryForm(false);
      
      // Show toast or feedback (would typically use toast here)
      alert("Your story has been shared with the community!");
    }
  };
  
  return (
    <Collapsible className="mt-4 sm:mt-6 mb-0 sm:mb-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Surrounding Influences</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 text-gray-600"
            onClick={() => setShowStoryForm(!showStoryForm)}
          >
            <Share2 width={16} height={16} />
            <span>Share Your Story</span>
          </Button>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-1 text-gray-600"
              onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
            >
              {influenceMeterCollapsed ? (
                <>
                  <ChevronDown width={16} height={16} />
                  <span>Expand</span>
                </>
              ) : (
                <>
                  <ChevronUp width={16} height={16} />
                  <span>Collapse</span>
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>

      {/* Story sharing form */}
      <AnimatePresence>
        {showStoryForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-sm font-medium mb-2">Share your experience with others</h3>
              <Textarea
                placeholder="What's your learning story? How did someone influence your education journey?"
                className="min-h-[100px] mb-3"
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowStoryForm(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleShareStory}
                  disabled={!storyText.trim()}
                  className="gap-1"
                >
                  <Send size={16} />
                  Share Story
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CollapsibleContent className="overflow-hidden">
        <AnimatePresence>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SurroundingInfluencesMeter />
          </motion.div>
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SurroundingInfluencesSection;

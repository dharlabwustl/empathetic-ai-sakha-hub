
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Textarea,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, ChevronUp, Share2, Edit, Users, Video, MessageCircle, Home, Globe, Cloud, Send } from "lucide-react";
import { Input } from '@/components/ui/input';

interface InfluenceMetricProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  status: 'positive' | 'neutral' | 'negative';
  description: string;
}

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const InfluenceMetric: React.FC<InfluenceMetricProps> = ({ title, value, icon, status, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getStatusColor = () => {
    switch (status) {
      case 'positive':
        return 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-800';
      case 'negative':
        return 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 border-red-200 dark:border-red-800';
      default:
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-800';
    }
  };
  
  return (
    <>
      <div 
        className={`rounded-lg border shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow ${getStatusColor()}`}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm">
              {icon}
            </div>
            <h4 className="font-medium text-sm">{title}</h4>
          </div>
          <span className="text-lg font-bold">{value}</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    
      {/* Detailed metric view dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {icon} {title}
            </DialogTitle>
            <DialogDescription>
              Impact on your study environment and performance
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-inner overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Current Status</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  status === 'positive' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  status === 'negative' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                }`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">{value}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">/ 10</span>
              </div>
              
              <p className="mt-3 text-sm">{description}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Recommended Actions</h4>
              <ul className="space-y-2">
                <li className="text-sm flex items-start gap-2">
                  <div className="rounded-full p-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-300 mt-0.5">
                    <Check size={12} />
                  </div>
                  <span>Set clear boundaries with your surroundings</span>
                </li>
                <li className="text-sm flex items-start gap-2">
                  <div className="rounded-full p-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-300 mt-0.5">
                    <Check size={12} />
                  </div>
                  <span>Create a dedicated study environment</span>
                </li>
                <li className="text-sm flex items-start gap-2">
                  <div className="rounded-full p-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-300 mt-0.5">
                    <Check size={12} />
                  </div>
                  <span>Share your schedule with family/roommates</span>
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Check icon component for lists
const Check = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  const [shareStoryOpen, setShareStoryOpen] = useState(false);
  const [storyTitle, setStoryTitle] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const [storyType, setStoryType] = useState('personal');
  const { toast } = useToast();
  
  const handleShareStory = () => {
    // In a real app, this would send the story to a backend
    toast({
      title: "Story Shared",
      description: "Your story has been shared with the Sakha community.",
    });
    
    // Clear form and close dialog
    setStoryTitle('');
    setStoryContent('');
    setShareStoryOpen(false);
  };
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Surrounding Influences</h2>
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
            Beta
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setShareStoryOpen(true)}
          >
            <Share2 size={14} />
            <span className="hidden sm:inline">Share Your Story</span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
          >
            {influenceMeterCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </Button>
        </div>
      </div>
      
      {!influenceMeterCollapsed && (
        <Card className="mt-2 bg-gradient-to-r from-sky-50/50 via-white to-violet-50/50 dark:from-sky-900/20 dark:via-gray-900 dark:to-violet-900/20">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Understanding how your environment affects your learning can help you optimize your study sessions.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3">
              <InfluenceMetric 
                title="Social Circle" 
                value="7.2"
                icon={<Users size={18} className="text-violet-600" />}
                status="positive"
                description="Your friends are supportive of your academic goals"
              />
              <InfluenceMetric 
                title="Family" 
                value="6.8"
                icon={<Home size={18} className="text-pink-600" />}
                status="positive"
                description="Family environment is mostly conducive for studying"
              />
              <InfluenceMetric 
                title="Online Time" 
                value="4.3"
                icon={<Globe size={18} className="text-blue-600" />}
                status="negative"
                description="Digital distractions reducing your productivity"
              />
              <InfluenceMetric 
                title="Media Consumption" 
                value="5.1"
                icon={<Video size={18} className="text-red-600" />}
                status="neutral"
                description="Moderate impact; consider educational content"
              />
              <InfluenceMetric 
                title="Community" 
                value="8.5"
                icon={<MessageCircle size={18} className="text-green-600" />}
                status="positive"
                description="Active participation in study communities"
              />
              <InfluenceMetric 
                title="Environment" 
                value="6.2"
                icon={<Cloud size={18} className="text-teal-600" />}
                status="neutral"
                description="Your physical study space has moderate impact"
              />
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Share Story Dialog */}
      <Dialog open={shareStoryOpen} onOpenChange={setShareStoryOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Story</DialogTitle>
            <DialogDescription>
              Share your experience with the community. Your story might inspire others facing similar challenges.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="storyTitle" className="text-sm font-medium">Title</label>
              <Input
                id="storyTitle"
                placeholder="Give your story a title..."
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="storyType" className="text-sm font-medium">Story Type</label>
              <select 
                id="storyType"
                className="w-full p-2 border rounded-md"
                value={storyType}
                onChange={(e) => setStoryType(e.target.value)}
              >
                <option value="personal">Personal Experience</option>
                <option value="challenge">Challenge Overcome</option>
                <option value="success">Success Story</option>
                <option value="tip">Study Tip</option>
                <option value="question">Question for Community</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="storyContent" className="text-sm font-medium">Your Story</label>
              <textarea
                id="storyContent"
                className="w-full p-2 border rounded-md min-h-[120px]"
                placeholder="Share your experience, challenge, or tip..."
                value={storyContent}
                onChange={(e) => setStoryContent(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={handleShareStory}
              disabled={!storyTitle || !storyContent}
            >
              <Send size={14} className="mr-2" />
              Share Story
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SurroundingInfluencesSection;

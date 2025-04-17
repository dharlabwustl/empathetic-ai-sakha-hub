
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  ChevronUp, 
  ChevronDown, 
  Share2, 
  MessageCircle, 
  PlusCircle,
  ArrowRight,
  MapPin,
  Tv,
  Home,
  Send
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

interface InfluenceCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: {
    id: string;
    name: string;
    impact: "positive" | "negative" | "neutral";
    description?: string;
  }[];
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed,
}) => {
  const [showStoryDialog, setShowStoryDialog] = useState(false);
  const [story, setStory] = useState("");
  const [showCommunityStories, setShowCommunityStories] = useState(false);
  const { toast } = useToast();
  
  // Mock data for the influences
  const influenceCategories: InfluenceCategory[] = [
    {
      id: "social",
      name: "Social",
      icon: <Users size={18} />,
      items: [
        { id: "s1", name: "Peer Study Groups", impact: "positive", description: "Regular study sessions with classmates" },
        { id: "s2", name: "Family Distractions", impact: "negative", description: "Interruptions during study time" },
        { id: "s3", name: "Mentor Support", impact: "positive", description: "Weekly guidance from seniors" },
      ]
    },
    {
      id: "academic",
      name: "Academic",
      icon: <GraduationCap size={18} />,
      items: [
        { id: "a1", name: "Upcoming Exams", impact: "neutral", description: "Tests scheduled for next week" },
        { id: "a2", name: "Project Deadlines", impact: "negative", description: "Three projects due soon" },
        { id: "a3", name: "Learning Resources", impact: "positive", description: "Access to premium study materials" }
      ]
    },
    {
      id: "environmental",
      name: "Environmental",
      icon: <MapPin size={18} />,
      items: [
        { id: "e1", name: "Study Space", impact: "positive", description: "Quiet dedicated area for studying" },
        { id: "e2", name: "Noise Level", impact: "neutral", description: "Moderate background noise" },
        { id: "e3", name: "Weather Conditions", impact: "negative", description: "Rainy season affecting commute" }
      ]
    },
    {
      id: "digital",
      name: "Digital",
      icon: <Tv size={18} />,
      items: [
        { id: "d1", name: "Social Media", impact: "negative", description: "Frequent distractions from notifications" },
        { id: "d2", name: "Productivity Apps", impact: "positive", description: "Using study timer and focus tools" },
        { id: "d3", name: "Online Learning Platforms", impact: "positive", description: "Access to video lectures" }
      ]
    }
  ];
  
  // Mock community stories
  const communityStories = [
    {
      id: "story1",
      author: "Ravi K.",
      content: "Creating a dedicated study space at home transformed my learning experience. I converted a small corner of my room with proper lighting, a comfortable chair, and zero distractions. My concentration has improved by 70%!",
      timestamp: "2 hours ago",
      likes: 24
    },
    {
      id: "story2",
      author: "Priya M.",
      content: "My family constantly interrupted my study time, affecting my preparation for NEET. I had an honest conversation with them about my goals and we set up 'do not disturb' hours. It's been a game-changer for my focus!",
      timestamp: "1 day ago",
      likes: 37
    },
    {
      id: "story3",
      author: "Aditya S.",
      content: "The competitive atmosphere at my coaching center was causing extreme anxiety. I started supplementing with online courses where I could learn at my own pace. Now I get the best of both worlds!",
      timestamp: "3 days ago",
      likes: 56
    }
  ];
  
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
      author: "You",
      content: story,
      timestamp: "Just now",
      likes: 0
    });
    localStorage.setItem("influenceStories", JSON.stringify(existingStories));
  };

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-lg">Surrounding Influences</CardTitle>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs bg-white dark:bg-gray-800 border-blue-200"
                onClick={() => setShowCommunityStories(true)}
              >
                <MessageCircle className="h-3.5 w-3.5 mr-1" />
                Community Stories
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs bg-white dark:bg-gray-800 border-blue-200"
                onClick={() => setShowStoryDialog(true)}
              >
                <Share2 className="h-3.5 w-3.5 mr-1" />
                Share Your Story
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
                className="text-xs"
              >
                {influenceMeterCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <AnimatePresence>
          {!influenceMeterCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {influenceCategories.map((category) => (
                    <div key={category.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          {category.icon}
                        </div>
                        <h3 className="font-medium">{category.name}</h3>
                      </div>
                      
                      <div className="space-y-2">
                        {category.items.map((item) => (
                          <div key={item.id} className="flex items-start gap-2 text-sm">
                            <Badge 
                              className={`mt-0.5 ${
                                item.impact === 'positive' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                                item.impact === 'negative' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 
                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                              }`}
                            >
                              {item.impact}
                            </Badge>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              {item.description && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full mt-2 text-xs text-blue-600 dark:text-blue-400"
                        >
                          <PlusCircle className="h-3.5 w-3.5 mr-1" />
                          Add New Factor
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Understanding your surrounding influences can help you optimize your study environment
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Generate Personalized Study Environment Tips
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
      
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
          <DialogFooter className="flex flex-row items-center space-x-2 justify-end">
            <Button variant="outline" onClick={() => setShowStoryDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handlePostStory}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <Send className="h-4 w-4 mr-1" />
              Post Story
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Community Stories Dialog */}
      <Dialog open={showCommunityStories} onOpenChange={setShowCommunityStories}>
        <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Community Stories</DialogTitle>
            <DialogDescription>
              Learn how others are managing their surrounding influences
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {communityStories.map((story) => (
              <div key={story.id} className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-medium">
                      {story.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{story.author}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{story.timestamp}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {story.likes} helpful
                  </Badge>
                </div>
                <p className="text-sm">{story.content}</p>
                <div className="flex items-center justify-end mt-3 gap-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <MessageCircle className="h-3.5 w-3.5 mr-1" />
                    Reply
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                    <ArrowRight className="h-3.5 w-3.5 mr-1" />
                    Apply to My Situation
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setShowStoryDialog(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Share Your Story
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default SurroundingInfluencesSection;


import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Activity, Home, School, UserPlus, Users, Zap,
  TrendingUp, TrendingDown, Clock, Share2, Wifi
} from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("metrics");
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
        >
          {influenceMeterCollapsed ? "Expand" : "Collapse"}
        </Button>
      </div>
      
      {!influenceMeterCollapsed && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">External factors impacting your studies</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="metrics" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="metrics">Influence Metrics</TabsTrigger>
                <TabsTrigger value="community">Community Insights</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="stories">Stories</TabsTrigger>
              </TabsList>
              
              <TabsContent value="metrics">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Family Environment Card */}
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5 text-blue-500" />
                        <h4 className="font-medium">Family Environment</h4>
                      </div>
                      <span className="text-green-600 font-medium flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" /> High
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your family environment is highly conducive for studying. Low noise, good support system.
                    </p>
                  </div>
                  
                  {/* Peer Influence Card */}
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-violet-500" />
                        <h4 className="font-medium">Peer Influence</h4>
                      </div>
                      <span className="text-amber-600 font-medium flex items-center">
                        <Activity className="h-4 w-4 mr-1" /> Medium
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Mixed influence from peers. Some study partners boost productivity, others distract.
                    </p>
                  </div>
                  
                  {/* School/Institute Card */}
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <School className="h-5 w-5 text-emerald-500" />
                        <h4 className="font-medium">School/Institute</h4>
                      </div>
                      <span className="text-green-600 font-medium flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" /> High
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Strong academic environment with good teacher support and resources.
                    </p>
                  </div>
                  
                  {/* Internet Distractions Card */}
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-5 w-5 text-red-500" />
                        <h4 className="font-medium">Internet Distractions</h4>
                      </div>
                      <span className="text-red-600 font-medium flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" /> High
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Significant time spent on social media and entertainment platforms affecting focus.
                    </p>
                  </div>
                  
                  {/* Time Management Card */}
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-amber-500" />
                        <h4 className="font-medium">Time Management</h4>
                      </div>
                      <span className="text-amber-600 font-medium flex items-center">
                        <Activity className="h-4 w-4 mr-1" /> Medium
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Some scheduled study time, but room for improvement in consistency and planning.
                    </p>
                  </div>
                  
                  {/* External Activities Card */}
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-orange-500" />
                        <h4 className="font-medium">External Activities</h4>
                      </div>
                      <span className="text-amber-600 font-medium flex items-center">
                        <Activity className="h-4 w-4 mr-1" /> Medium
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Balanced extracurricular activities that provide good breaks from studies.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="community">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Community Insights</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Based on 500+ students with similar profiles, these factors most significantly impact study effectiveness:
                  </p>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center">
                      <div className="w-48 text-sm font-medium">Consistent study time:</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">85%</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-48 text-sm font-medium">Reduced phone usage:</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '78%'}}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">78%</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-48 text-sm font-medium">Study environment:</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{width: '72%'}}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">72%</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-48 text-sm font-medium">Peer study groups:</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{width: '65%'}}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">65%</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-48 text-sm font-medium">Family support:</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{width: '60%'}}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">60%</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-green-500 border-y border-r border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-green-700 dark:text-green-500 mb-2">Device Management</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Try using app blockers during study hours to limit social media distractions.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-blue-500 border-y border-r border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-blue-700 dark:text-blue-500 mb-2">Study Group</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Form a small study group (2-3 people) with classmates who have similar goals.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-purple-500 border-y border-r border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-purple-700 dark:text-purple-500 mb-2">Environmental Setup</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Create a dedicated study corner with good lighting and minimal distractions.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-orange-500 border-y border-r border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-orange-700 dark:text-orange-500 mb-2">Family Communication</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Share your study schedule with family members to help them respect your focus time.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="stories">
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Student Stories</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowStoryDialog(true)}
                      className="flex items-center gap-1"
                    >
                      <Share2 size={16} />
                      <span>Share Your Story</span>
                    </Button>
                  </div>
                  
                  {/* Sample stories */}
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-3">
                      <img 
                        src="https://i.pravatar.cc/150?img=4" 
                        alt="Student" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h5 className="font-medium">Aditya M.</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          I struggled with phone distractions until I started using a focus app. Now I'm able to concentrate for 2-hour blocks without checking my phone. It's made a huge difference in my JEE preparation!
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          Posted 2 days ago
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-3">
                      <img 
                        src="https://i.pravatar.cc/150?img=28" 
                        alt="Student" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h5 className="font-medium">Riya S.</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Moving my study space from the living room to a quiet corner in my bedroom improved my concentration significantly. Now my family knows not to disturb me when I'm at my desk.
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          Posted 5 days ago
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
      
      {/* Share Story Dialog */}
      <Dialog open={showStoryDialog} onOpenChange={setShowStoryDialog}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-900">
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


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Users, BookOpen, Activity, Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (value: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  const [activeInfluence, setActiveInfluence] = useState<string | null>(null);
  const [showTooltips, setShowTooltips] = useState(true);

  // Define surrounding influences
  const influences = [
    {
      id: "peers",
      name: "Peer Group",
      icon: Users,
      value: 78,
      description: "Your peer group's motivation and study habits positively impact your learning environment.",
      actions: [
        { label: "Join Study Group", handler: () => console.log("Joining study group"), route: "/dashboard/student/study-groups" },
        { label: "Find Study Partner", handler: () => console.log("Finding study partner"), route: "/dashboard/student/study-groups" }
      ],
      className: "bg-blue-500"
    },
    {
      id: "resources",
      name: "Learning Resources",
      icon: BookOpen,
      value: 85,
      description: "High-quality learning materials enhance your understanding and retention.",
      actions: [
        { label: "Access Premium Content", handler: () => console.log("Accessing premium content"), route: "/dashboard/student/subscription" },
        { label: "Recommended Resources", handler: () => console.log("Viewing recommended resources"), route: "/dashboard/student/concepts" }
      ],
      className: "bg-violet-500"
    },
    {
      id: "consistency",
      name: "Study Consistency",
      icon: Activity,
      value: 62,
      description: "Regular study habits help build momentum and improve long-term retention.",
      actions: [
        { label: "View Study Streak", handler: () => console.log("Viewing study streak"), route: "/dashboard/student/today" },
        { label: "Set Study Schedule", handler: () => console.log("Setting study schedule"), route: "/dashboard/student/study-plan" }
      ],
      className: "bg-emerald-500"
    },
    {
      id: "mindset",
      name: "Growth Mindset",
      icon: Brain,
      value: 70,
      description: "Your belief in your ability to improve through effort affects your learning outcomes.",
      actions: [
        { label: "Take Mindset Quiz", handler: () => console.log("Taking mindset quiz"), route: "/dashboard/student/feel-good-corner" },
        { label: "Motivation Resources", handler: () => console.log("Viewing motivation resources"), route: "/dashboard/student/feel-good-corner" }
      ],
      className: "bg-amber-500"
    }
  ];

  const toggleInfluenceMeter = () => {
    setInfluenceMeterCollapsed(!influenceMeterCollapsed);
    
    // Only show tooltips when expanding
    if (influenceMeterCollapsed) {
      setShowTooltips(true);
      setTimeout(() => setShowTooltips(false), 5000); // Hide tooltips after 5 seconds
    }
  };

  const handleInfluenceClick = (id: string) => {
    setActiveInfluence(activeInfluence === id ? null : id);
  };
  
  const handleActionClick = (route: string) => {
    window.location.href = route;
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2 cursor-pointer" onClick={toggleInfluenceMeter}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            Surrounding Influences
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            {influenceMeterCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
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
            <CardContent className="pb-4">
              <p className="text-sm text-muted-foreground mb-4">
                The Prepzr Influence Meter shows factors that impact your learning success. 
                Understanding these influences helps you optimize your study environment.
              </p>
              
              <div className="space-y-4">
                {influences.map((influence) => (
                  <div key={influence.id} className="space-y-2">
                    <div className="flex justify-between items-center gap-2">
                      <div 
                        className="flex items-center gap-2 cursor-pointer" 
                        onClick={() => handleInfluenceClick(influence.id)}
                      >
                        <div className={cn("p-1.5 rounded-md", `bg-${influence.id}-100`)}>
                          <influence.icon className={cn("h-4 w-4", `text-${influence.id}-600`)} />
                        </div>
                        <span className="font-medium">{influence.name}</span>
                      </div>
                      <span className="text-sm font-medium">{influence.value}%</span>
                    </div>
                    
                    <TooltipProvider>
                      <Tooltip open={showTooltips && activeInfluence === null}>
                        <TooltipTrigger asChild>
                          <div className="w-full h-2 bg-gray-100 rounded-full">
                            <div 
                              className={cn("h-full rounded-full", influence.className)}
                              style={{ width: `${influence.value}%` }}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click on an influence to see details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <AnimatePresence>
                      {activeInfluence === influence.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md text-sm"
                        >
                          <p className="mb-3">{influence.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {influence.actions.map((action, idx) => (
                              <Button 
                                key={idx} 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleActionClick(action.route)}
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-2 border-t">
                <p className="text-xs text-center text-muted-foreground">
                  Prepzr's data-driven insights help you create an optimal learning environment
                </p>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default SurroundingInfluencesSection;

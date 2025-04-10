
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent
} from "@/components/ui/card";
import { Smile, Heart, Music, Quote, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeelGoodCorner = () => {
  const [activeTab, setActiveTab] = React.useState<string>("quote");

  const tabs = [
    { id: "quote", label: "Quote", icon: Quote },
    { id: "music", label: "Music", icon: Music },
    { id: "wellness", label: "Wellness", icon: Heart }
  ];

  const TabContent = () => {
    switch (activeTab) {
      case "quote":
        return (
          <div className="p-6 text-center">
            <blockquote className="italic text-lg mb-2">
              "The best way to predict your future is to create it."
            </blockquote>
            <cite className="text-sm text-muted-foreground">- Abraham Lincoln</cite>
          </div>
        );
      case "music":
        return (
          <div className="p-6 text-center">
            <p className="mb-3">Focus better with study music</p>
            <div className="flex justify-center">
              <Button variant="outline" className="mx-1">Lofi</Button>
              <Button variant="outline" className="mx-1">Classical</Button>
              <Button variant="outline" className="mx-1">Nature</Button>
            </div>
          </div>
        );
      case "wellness":
        return (
          <div className="p-6 text-center">
            <p className="mb-3">Take a 5-minute breather</p>
            <Button variant="outline" className="w-full">Start Breathing Exercise</Button>
          </div>
        );
      default:
        return <div className="p-6">Select a tab</div>;
    }
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20">
      <CardHeader className="pb-3 bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smile className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-lg text-violet-700 dark:text-violet-300">Feel Good Corner</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">Your Pocket Smile Buddy</span>
        </div>
      </CardHeader>
      
      <div className="flex border-b">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1 py-2 text-sm transition-colors
                ${activeTab === tab.id 
                  ? "border-b-2 border-violet-500 text-violet-600 font-medium" 
                  : "text-muted-foreground hover:text-violet-500"}`
              }
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      
      <CardContent className="p-0">
        <TabContent />
      </CardContent>
    </Card>
  );
};

export default FeelGoodCorner;

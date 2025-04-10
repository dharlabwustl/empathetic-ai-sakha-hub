
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Laugh, Music, Brain, Quote, Wind, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JokeTab } from "./JokeTab";
import { MusicTab } from "./MusicTab";
import { TeaserTab } from "./TeaserTab";
import { QuoteTab } from "./QuoteTab";
import { WellnessTab } from "./WellnessTab";
import { FeelGoodTabType } from "./types";

interface FeelGoodTabsProps {
  defaultTab?: FeelGoodTabType;
}

export function FeelGoodTabs({ defaultTab = 'joke' }: FeelGoodTabsProps) {
  const [activeTab, setActiveTab] = useState<FeelGoodTabType>(defaultTab);

  return (
    <>
      <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as FeelGoodTabType)} className="p-1">
        <TabsList className="grid grid-cols-5 h-auto p-1 bg-violet-100/50 dark:bg-violet-900/20">
          <TabsTrigger value="joke" className="py-1.5">
            <Laugh className="h-4 w-4 mr-1" />
            <span className="sr-only sm:not-sr-only sm:text-xs">Joke</span>
          </TabsTrigger>
          <TabsTrigger value="music" className="py-1.5">
            <Music className="h-4 w-4 mr-1" />
            <span className="sr-only sm:not-sr-only sm:text-xs">Music</span>
          </TabsTrigger>
          <TabsTrigger value="teaser" className="py-1.5">
            <Brain className="h-4 w-4 mr-1" />
            <span className="sr-only sm:not-sr-only sm:text-xs">Teaser</span>
          </TabsTrigger>
          <TabsTrigger value="quote" className="py-1.5">
            <Quote className="h-4 w-4 mr-1" />
            <span className="sr-only sm:not-sr-only sm:text-xs">Quote</span>
          </TabsTrigger>
          <TabsTrigger value="wellness" className="py-1.5">
            <Wind className="h-4 w-4 mr-1" />
            <span className="sr-only sm:not-sr-only sm:text-xs">Wellness</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="joke">
          <JokeTab />
        </TabsContent>
        
        <TabsContent value="music">
          <MusicTab />
        </TabsContent>
        
        <TabsContent value="teaser">
          <TeaserTab />
        </TabsContent>
        
        <TabsContent value="quote">
          <QuoteTab />
        </TabsContent>
        
        <TabsContent value="wellness">
          <WellnessTab />
        </TabsContent>
      </Tabs>

      <div className="bg-violet-50/50 dark:bg-violet-900/10 p-3 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          Need more? Talk to Sakha in chill mode
        </span>
        <Button 
          size="sm" 
          variant="ghost"
          className="flex items-center gap-1 text-violet-600 dark:text-violet-400"
        >
          <MessageSquare className="h-3.5 w-3.5" /> 
          <span className="text-xs">Chat</span>
        </Button>
      </div>
    </>
  );
}

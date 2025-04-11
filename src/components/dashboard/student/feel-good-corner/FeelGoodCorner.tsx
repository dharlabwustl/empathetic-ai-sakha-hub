
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Smile, 
  Heart, 
  Video, 
  Lightbulb, 
  PencilLine, 
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

// Import tab components
import JokesTab from "./JokesTab";
import VideosTab from "./VideosTab";
import TeasersTab from "./TeasersTab";
import DoodleTab from "./DoodleTab";
import ChatTab from "./ChatTab";

const FeelGoodCorner: React.FC = () => {
  const [activeTab, setActiveTab] = useState("jokes");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="overflow-hidden border-t-4 border-t-violet-500">
        <CardHeader className="pb-3 bg-gradient-to-r from-violet-500/10 to-sky-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div 
                className="bg-violet-100 p-2 rounded-full"
                whileHover={{ rotate: 20 }}
              >
                <Smile className="text-violet-600" />
              </motion.div>
              <div>
                <CardTitle className="text-lg gradient-text">Feel Good Corner</CardTitle>
                <CardDescription>Your Pocket Smile Buddy</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-violet-100 text-violet-700 border-violet-200">
              Mood Booster
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="jokes" className="flex-1 gap-1 rounded-none">
                <Smile size={14} /> Jokes
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex-1 gap-1 rounded-none">
                <Video size={14} /> Videos
              </TabsTrigger>
              <TabsTrigger value="teasers" className="flex-1 gap-1 rounded-none">
                <Lightbulb size={14} /> Teasers
              </TabsTrigger>
              <TabsTrigger value="doodle" className="flex-1 gap-1 rounded-none">
                <PencilLine size={14} /> Doodle
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex-1 gap-1 rounded-none">
                <MessageCircle size={14} /> Sakha
              </TabsTrigger>
            </TabsList>
            
            <AnimatePresence mode="wait">
              {/* JOKES TAB */}
              <TabsContent value="jokes" className="p-4">
                <JokesTab />
              </TabsContent>

              {/* VIDEOS TAB */}
              <TabsContent value="videos" className="p-4">
                <VideosTab />
              </TabsContent>

              {/* BRAIN TEASERS TAB */}
              <TabsContent value="teasers" className="p-4">
                <TeasersTab />
              </TabsContent>

              {/* DOODLE TAB */}
              <TabsContent value="doodle" className="p-4">
                <DoodleTab />
              </TabsContent>

              {/* SAKHA CHAT TAB */}
              <TabsContent value="chat" className="p-4">
                <ChatTab />
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-gradient-to-r from-violet-500/5 to-sky-500/5 border-t px-3 py-2">
          <p className="text-xs text-gray-500 w-full text-center">
            <Heart className="h-3 w-3 inline mr-1 text-pink-500" />
            Personalized mood boosters based on your study patterns and preferences
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FeelGoodCorner;

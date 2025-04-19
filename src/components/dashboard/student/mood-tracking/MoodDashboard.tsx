
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import MoodTracking from "./MoodTracking";
import EmotionalContentDelivery from "./EmotionalContentDelivery";
import EmotionBasedPlanner from "./EmotionBasedPlanner";
import { useMoodContext } from "@/contexts/MoodContext";

const MoodDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Emotional Learning Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mood" className="space-y-4">
            <TabsList>
              <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
              <TabsTrigger value="content">Personalized Content</TabsTrigger>
              <TabsTrigger value="planner">Adaptive Planner</TabsTrigger>
            </TabsList>
            
            <AnimatePresence mode="wait">
              <TabsContent value="mood">
                <MoodTracking />
              </TabsContent>
              
              <TabsContent value="content">
                <EmotionalContentDelivery />
              </TabsContent>
              
              <TabsContent value="planner">
                <EmotionBasedPlanner />
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MoodDashboard;

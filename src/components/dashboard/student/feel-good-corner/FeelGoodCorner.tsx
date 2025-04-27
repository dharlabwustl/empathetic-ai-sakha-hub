
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Music, BookOpen, Brain, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const FeelGoodCorner = () => {
  const [activeTab, setActiveTab] = useState("relaxation");

  return (
    <SharedPageLayout title="Feel Good Corner" subtitle="Take a break and recharge your mind">
      <div className="space-y-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="relaxation">Relaxation</TabsTrigger>
            <TabsTrigger value="motivation">Motivation</TabsTrigger>
            <TabsTrigger value="games">Brain Games</TabsTrigger>
          </TabsList>

          <TabsContent value="relaxation" className="mt-0">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 h-16 w-16 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center">
                    <Heart size={32} className="text-pink-600 dark:text-pink-400" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Relax & Unwind</h2>
                  <p className="text-muted-foreground max-w-lg mb-6">
                    Take a moment to relax with guided meditations, calming music, or breathing exercises.
                    Regular breaks improve focus and retention.
                  </p>
                  <Button className="gap-2 bg-pink-600 hover:bg-pink-700">
                    <Music size={16} />
                    Start Relaxation Session
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <Music size={20} className="text-pink-500" />
                  <div>
                    <h4 className="font-medium">Calming Sounds</h4>
                    <p className="text-sm text-muted-foreground">Ambient sounds to help you focus</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <BookOpen size={20} className="text-pink-500" />
                  <div>
                    <h4 className="font-medium">Reading Corner</h4>
                    <p className="text-sm text-muted-foreground">Short inspiring stories</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="motivation" className="mt-0">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                    <Smile size={32} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Motivation Station</h2>
                  <p className="text-muted-foreground max-w-lg mb-6">
                    Find inspiration and motivation to keep pushing forward with your studies.
                    Discover stories from successful students and tips to stay motivated.
                  </p>
                  <Button className="gap-2 bg-amber-600 hover:bg-amber-700">
                    <MessageCircle size={16} />
                    Get Motivational Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games" className="mt-0">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Brain size={32} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Brain Games & Puzzles</h2>
                  <p className="text-muted-foreground max-w-lg mb-6">
                    Take a productive break with games designed to enhance cognitive abilities
                    while giving your mind a refreshing change of pace.
                  </p>
                  <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Brain size={16} />
                    Play Brain Games
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCorner;

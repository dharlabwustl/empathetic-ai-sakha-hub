
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Music, BookOpen, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const FeelGoodCornerView = () => {
  return (
    <SharedPageLayout title="Feel Good Corner" subtitle="Take care of your mental wellbeing">
      <div className="space-y-6">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center">
                <Heart size={32} className="text-pink-600 dark:text-pink-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your Wellness Space</h2>
              <p className="text-muted-foreground max-w-lg mb-6">
                Take a break, recharge, and find balance. Your mental wellbeing matters just as much as your academic success.
              </p>
            </div>
            
            <Tabs defaultValue="relax" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="relax">Relax</TabsTrigger>
                <TabsTrigger value="inspire">Inspiration</TabsTrigger>
                <TabsTrigger value="recharge">Recharge</TabsTrigger>
              </TabsList>
              
              <TabsContent value="relax" className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <Music className="text-purple-500" />
                      <div>
                        <h3 className="font-medium">Relaxing Playlist</h3>
                        <p className="text-sm text-muted-foreground">Calm your mind with soothing music</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <Coffee className="text-amber-500" />
                      <div>
                        <h3 className="font-medium">Mindfulness Break</h3>
                        <p className="text-sm text-muted-foreground">5-minute guided session</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="inspire" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-2">Quote of the Day</h3>
                    <blockquote className="border-l-4 border-primary pl-4 italic">
                      "Education is the most powerful weapon which you can use to change the world."
                      <footer className="text-sm text-muted-foreground mt-2">— Nelson Mandela</footer>
                    </blockquote>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recharge" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-2">Quick Exercise</h3>
                    <p>Try this 2-minute desk stretch to boost your energy and focus:</p>
                    <ol className="list-decimal list-inside mt-2 space-y-2">
                      <li>Sit up straight and roll your shoulders back 5 times</li>
                      <li>Gently tilt your head side to side</li>
                      <li>Take 5 deep breaths, focusing on each exhale</li>
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCornerView;

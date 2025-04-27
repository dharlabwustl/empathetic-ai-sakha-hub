
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Music, BookOpen, Brain, Smile, Video, Puzzle, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const FeelGoodCorner = () => {
  const [activeTab, setActiveTab] = useState("relaxation");

  return (
    <SharedPageLayout title="Feel Good Corner" subtitle="Take a break and recharge your mind">
      <div className="space-y-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-8 mb-6">
            <TabsTrigger value="relaxation">Relaxation</TabsTrigger>
            <TabsTrigger value="motivation">Motivation</TabsTrigger>
            <TabsTrigger value="games">Brain Games</TabsTrigger>
            <TabsTrigger value="jokes">Jokes</TabsTrigger>
            <TabsTrigger value="teasers">Teasers</TabsTrigger>
            <TabsTrigger value="puzzles">Puzzles</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="doodle">Doodling</TabsTrigger>
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
          
          <TabsContent value="jokes" className="mt-0">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Smile size={32} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Laugh a Little</h2>
                  <p className="text-muted-foreground max-w-lg mb-6">
                    Take a break with some humor. Laughter increases endorphins and helps reduce stress.
                    Perfect for a quick study break!
                  </p>
                  <Button className="gap-2 bg-green-600 hover:bg-green-700">
                    <Smile size={16} />
                    Get a Random Joke
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="teasers" className="mt-0">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Brain size={32} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Brain Teasers</h2>
                  <p className="text-muted-foreground max-w-lg mb-6">
                    Challenge yourself with thought-provoking brain teasers. 
                    Participate and get recognized for your creative solutions!
                  </p>
                  <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                    <Brain size={16} />
                    Try a Brain Teaser
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="puzzles" className="mt-0">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                    <Puzzle size={32} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Puzzle Challenge</h2>
                  <p className="text-muted-foreground max-w-lg mb-6">
                    Solve puzzles to improve your logical thinking and problem-solving skills.
                    Complete challenges and compare your scores with other students!
                  </p>
                  <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                    <Puzzle size={16} />
                    Start a Puzzle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-0">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <Video size={32} className="text-red-600 dark:text-red-400" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Inspirational Videos</h2>
                  <p className="text-muted-foreground max-w-lg mb-6">
                    Take a short break with inspiring and educational videos that refresh your mind
                    while still keeping you in a learning mindset.
                  </p>
                  <Button className="gap-2 bg-red-600 hover:bg-red-700">
                    <Video size={16} />
                    Watch a Short Video
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="doodle" className="mt-0">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 h-16 w-16 rounded-full bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center">
                    <File size={32} className="text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Creative Doodling</h2>
                  <p className="text-muted-foreground max-w-lg mb-6">
                    Express yourself through doodling! Our analyzer can capture your emotional state
                    and provide personalized suggestions based on your artwork.
                  </p>
                  <Button className="gap-2 bg-cyan-600 hover:bg-cyan-700">
                    <File size={16} />
                    Start Doodling
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6 border border-cyan-200">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Emotion Analyzer</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI can analyze your doodles to understand your emotional state and provide personalized recommendations.
                </p>
                <div className="bg-cyan-50 p-3 rounded-md">
                  <p className="text-sm text-cyan-700">Submit your doodles to receive personalized suggestions and recommendations based on your emotional expression.</p>
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

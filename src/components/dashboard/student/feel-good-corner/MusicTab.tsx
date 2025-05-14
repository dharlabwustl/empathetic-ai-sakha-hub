
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, List, Heart } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MusicTab = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  const musicTracks = [
    { id: '1', title: 'Focus Flow', artist: 'Study Beats', duration: '3:45', category: 'focus' },
    { id: '2', title: 'Deep Concentration', artist: 'Mind Tunes', duration: '4:20', category: 'focus' },
    { id: '3', title: 'Ambient Study', artist: 'Calm Collective', duration: '5:12', category: 'focus' },
    { id: '4', title: 'Peaceful Piano', artist: 'Classical Focus', duration: '4:30', category: 'relaxation' },
    { id: '5', title: 'Nature Sounds', artist: 'Ambient World', duration: '6:15', category: 'relaxation' },
    { id: '6', title: 'Evening Calm', artist: 'Sleep Ready', duration: '5:45', category: 'relaxation' },
  ];
  
  const playingTrack = musicTracks[currentTrack];
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
  };
  
  const prevTrack = () => {
    setCurrentTrack((prev) => (prev === 0 ? musicTracks.length - 1 : prev - 1));
  };
  
  return (
    <div className="space-y-4">
      <Card className="border-gray-200 dark:border-gray-800 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-md flex items-center justify-center">
              <Music className="h-8 w-8 text-white" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium">{playingTrack.title}</h3>
              <p className="text-sm text-muted-foreground">{playingTrack.artist}</p>
              
              <div className="mt-2">
                <Slider 
                  defaultValue={[30]} 
                  max={100} 
                  step={1} 
                  className="h-1"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1:05</span>
                  <span>{playingTrack.duration}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-4 mt-4">
            <Button variant="ghost" size="icon" onClick={prevTrack}>
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button 
              variant="default" 
              size="icon" 
              className="h-10 w-10 rounded-full"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={nextTrack}>
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider 
              value={[volume * 100]} 
              onValueChange={(vals) => setVolume(vals[0] / 100)} 
              max={100} 
              step={1} 
              className="h-1.5"
            />
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="focus">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="focus">Focus</TabsTrigger>
          <TabsTrigger value="relax">Relaxation</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="focus" className="mt-4 space-y-2">
          {musicTracks.filter(track => track.category === 'focus').map((track) => (
            <div key={track.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => {
                    const index = musicTracks.findIndex(t => t.id === track.id);
                    setCurrentTrack(index);
                    setIsPlaying(true);
                  }}
                >
                  <Play className="h-4 w-4" />
                </Button>
                <div>
                  <p className="text-sm font-medium">{track.title}</p>
                  <p className="text-xs text-muted-foreground">{track.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{track.duration}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Heart className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="relax" className="mt-4 space-y-2">
          {musicTracks.filter(track => track.category === 'relaxation').map((track) => (
            <div key={track.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => {
                    const index = musicTracks.findIndex(t => t.id === track.id);
                    setCurrentTrack(index);
                    setIsPlaying(true);
                  }}
                >
                  <Play className="h-4 w-4" />
                </Button>
                <div>
                  <p className="text-sm font-medium">{track.title}</p>
                  <p className="text-xs text-muted-foreground">{track.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{track.duration}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Heart className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="saved" className="mt-4">
          <div className="text-center py-8">
            <List className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-muted-foreground">Your saved tracks will appear here</p>
            <Button variant="link" className="mt-2">Browse library</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MusicTab;

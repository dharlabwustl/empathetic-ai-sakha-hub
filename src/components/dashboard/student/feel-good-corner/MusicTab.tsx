
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface MusicTabProps {
  mood: string;
}

const MusicTab: React.FC<MusicTabProps> = ({ mood }) => {
  const playlists = [
    { title: "Focus Beats", description: "Instrumental music for concentration", tracks: 15 },
    { title: "Chill Vibes", description: "Relaxing tunes to calm your mind", tracks: 20 },
    { title: "Energy Boost", description: "Upbeat songs to motivate you", tracks: 12 },
    { title: "Nature Sounds", description: "Peaceful sounds from nature", tracks: 8 }
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {playlists.map((playlist, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">{playlist.title}</CardTitle>
            <CardDescription>{playlist.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{playlist.tracks} tracks</span>
              <Button size="sm">
                <Play className="w-4 h-4 mr-1" />
                Play
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MusicTab;

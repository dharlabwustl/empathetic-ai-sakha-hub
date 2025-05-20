
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, ThumbsUp
} from 'lucide-react';

interface MoodMusicPlayerProps {
  onLike: () => void;
}

const MoodMusicPlayer: React.FC<MoodMusicPlayerProps> = ({ onLike }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [currentTrack, setCurrentTrack] = useState(0);
  
  const tracks = [
    { 
      title: "Calm Waters", 
      artist: "Mindful Melodies", 
      duration: "3:45", 
      mood: "Relaxing",
      coverUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
    },
    { 
      title: "Focus Flow", 
      artist: "Study Beats", 
      duration: "4:12", 
      mood: "Concentrative",
      coverUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },
    { 
      title: "Energy Boost", 
      artist: "Motivation Mix", 
      duration: "3:28", 
      mood: "Energizing",
      coverUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    }
  ];
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };
  
  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <Card className="overflow-hidden">
        <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-black">
          <img 
            src={tracks[currentTrack].coverUrl} 
            alt={`Cover for ${tracks[currentTrack].title}`}
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold">{tracks[currentTrack].title}</h3>
              <p className="text-muted-foreground">{tracks[currentTrack].artist}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {tracks[currentTrack].mood}
                </span>
                <span className="text-sm text-muted-foreground">
                  {tracks[currentTrack].duration}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={prevTrack}>
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button 
                className="h-14 w-14 rounded-full"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-1" />
                )}
              </Button>
              <Button variant="outline" size="icon" onClick={nextTrack}>
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="h-1 w-full bg-gray-200 rounded-full">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '35%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1:19</span>
              <span>{tracks[currentTrack].duration}</span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <Volume2 className="h-5 w-5 text-muted-foreground" />
            <Slider
              value={volume}
              min={0}
              max={100}
              step={1}
              className="w-32"
              onValueChange={setVolume}
            />
            <span className="text-xs text-muted-foreground">{volume[0]}%</span>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Music designed to match and enhance your mood
        </p>
        <Button variant="outline" onClick={onLike}>
          <ThumbsUp className="h-4 w-4 mr-2" /> Like This Activity
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {tracks.map((track, index) => (
          <Card 
            key={index} 
            className={`overflow-hidden cursor-pointer transition-all ${
              currentTrack === index ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setCurrentTrack(index)}
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={track.coverUrl} 
                alt={`Cover for ${track.title}`}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-3">
              <h4 className="font-medium">{track.title}</h4>
              <p className="text-sm text-muted-foreground">{track.artist}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                  {track.mood}
                </span>
                <span className="text-xs text-muted-foreground">{track.duration}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MoodMusicPlayer;

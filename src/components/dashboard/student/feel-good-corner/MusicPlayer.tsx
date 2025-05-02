
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX
} from "lucide-react";
import { Badge } from '@/components/ui/badge';

interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  duration: string;
  category: string;
}

const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Lo-Fi Study Beat',
    artist: 'Study Music',
    src: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
    duration: '1:30',
    category: 'Focus'
  },
  {
    id: '2',
    title: 'Ambient Calm',
    artist: 'Relaxing Tunes',
    src: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-99.mp3',
    duration: '2:15',
    category: 'Calm'
  },
  {
    id: '3',
    title: 'Morning Energy',
    artist: 'Motivation Beats',
    src: 'https://assets.mixkit.co/music/preview/mixkit-spirit-of-the-woods-127.mp3',
    duration: '1:45',
    category: 'Energize'
  }
];

const MusicPlayer: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>(mockTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [progress, setProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = tracks[currentTrackIndex];
  
  useEffect(() => {
    // Create audio element
    const audio = new Audio(currentTrack.src);
    audioRef.current = audio;
    audio.volume = volume / 100;
    
    // Set up event listeners
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleTrackEnded);
    
    // Cleanup on component unmount
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleTrackEnded);
    };
  }, [currentTrackIndex]);
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);
  
  const updateProgress = () => {
    if (!audioRef.current) return;
    
    const duration = audioRef.current.duration || 1;
    const currentTime = audioRef.current.currentTime;
    setProgress((currentTime / duration) * 100);
  };
  
  const handleTrackEnded = () => {
    playNextTrack();
  };
  
  const playPauseTrack = () => {
    setIsPlaying(!isPlaying);
  };
  
  const playPreviousTrack = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTrackIndex(prev => 
      prev === 0 ? tracks.length - 1 : prev - 1
    );
    setTimeout(() => setIsPlaying(true), 300);
  };
  
  const playNextTrack = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTrackIndex(prev => 
      prev === tracks.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsPlaying(true), 300);
  };
  
  const handleProgressChange = (value: number[]) => {
    if (!audioRef.current) return;
    
    const newProgress = value[0];
    setProgress(newProgress);
    
    const newCurrentTime = (newProgress / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newCurrentTime;
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0 && isMuted) {
      setIsMuted(false);
    }
  };
  
  const filterByCategory = (category: string | null) => {
    setSelectedCategory(category);
    if (!category) {
      setTracks(mockTracks);
    } else {
      setTracks(mockTracks.filter(track => track.category === category));
    }
    setCurrentTrackIndex(0);
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Mood Music</h3>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={selectedCategory === null ? "default" : "outline"} 
            onClick={() => filterByCategory(null)}
          >
            All
          </Button>
          <Button 
            size="sm" 
            variant={selectedCategory === "Focus" ? "default" : "outline"} 
            onClick={() => filterByCategory("Focus")}
          >
            Focus
          </Button>
          <Button 
            size="sm" 
            variant={selectedCategory === "Calm" ? "default" : "outline"} 
            onClick={() => filterByCategory("Calm")}
          >
            Calm
          </Button>
          <Button 
            size="sm" 
            variant={selectedCategory === "Energize" ? "default" : "outline"} 
            onClick={() => filterByCategory("Energize")}
          >
            Energize
          </Button>
        </div>
      </div>
      
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-0">
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-1">{currentTrack.title}</h3>
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">{currentTrack.artist}</p>
              <Badge variant="outline">{currentTrack.category}</Badge>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Slider 
                value={[progress]} 
                min={0} 
                max={100} 
                step={1} 
                onValueChange={handleProgressChange} 
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime((progress / 100) * (audioRef.current?.duration || 0))}</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={toggleMute}>
                  {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </Button>
                <Slider 
                  value={[isMuted ? 0 : volume]} 
                  min={0} 
                  max={100} 
                  step={1} 
                  onValueChange={handleVolumeChange} 
                  className="w-24"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={playPreviousTrack}>
                  <SkipBack size={20} />
                </Button>
                <Button className="h-12 w-12 rounded-full" onClick={playPauseTrack}>
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </Button>
                <Button variant="ghost" size="icon" onClick={playNextTrack}>
                  <SkipForward size={20} />
                </Button>
              </div>
              
              <div className="w-24"></div> {/* For balance */}
            </div>
          </div>
        </div>
      </Card>
      
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Playlist</h4>
        {tracks.map((track, index) => (
          <div 
            key={track.id} 
            className={`p-3 rounded-md flex justify-between items-center cursor-pointer hover:bg-muted/50 
              ${currentTrackIndex === index ? 'bg-muted' : ''}`}
            onClick={() => {
              setCurrentTrackIndex(index);
              setIsPlaying(true);
            }}
          >
            <div>
              <p className="font-medium">{track.title}</p>
              <p className="text-sm text-muted-foreground">{track.artist}</p>
            </div>
            <Badge variant="outline">{track.duration}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to format time in MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default MusicPlayer;


import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  audioSrc: string;
}

const songs: Song[] = [
  {
    id: '1',
    title: 'Calm Study',
    artist: 'Relaxation',
    duration: '3:45',
    cover: '/lovable-uploads/cld6vr2vt0002kl9aw4hj0auj.jpg',
    audioSrc: 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-4.mp3'
  },
  {
    id: '2',
    title: 'Focus Mind',
    artist: 'Mindfulness',
    duration: '4:20',
    cover: '/lovable-uploads/cld6vr2vt0002kl9aw4hj0auj.jpg',
    audioSrc: 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-3.mp3'
  },
  {
    id: '3',
    title: 'Deep Concentration',
    artist: 'Study Music',
    duration: '5:10',
    cover: '/lovable-uploads/cld6vr2vt0002kl9aw4hj0auj.jpg',
    audioSrc: 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-2.mp3'
  },
];

export const MusicPanel = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      // Toggle play/pause if it's the same song
      togglePlayPause();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      // Let the useEffect handle playback after updating the state
    }
  };
  
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handlePrevious = () => {
    if (!currentSong) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[previousIndex]);
    setIsPlaying(true);
  };
  
  const handleNext = () => {
    if (!currentSong) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume / 100;
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };
  
  const handleSeek = (values: number[]) => {
    const seekTime = values[0];
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  React.useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
    
    // Set the volume
    audioRef.current.volume = volume / 100;
    
    // Update currentTime and duration when the audio is loaded
    const updateDuration = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };
    
    audioRef.current.addEventListener('loadedmetadata', updateDuration);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', updateDuration);
      }
    };
  }, [currentSong, isPlaying, volume]);

  return (
    <div className="p-4 space-y-6">
      {/* Audio element */}
      <audio 
        ref={audioRef} 
        src={currentSong?.audioSrc} 
        onEnded={() => handleNext()}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />
    
      {/* Music Player */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Cover Image */}
          <div className="w-48 h-48 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={currentSong?.cover || '/lovable-uploads/cld6vr2vt0002kl9aw4hj0auj.jpg'} 
              alt="Album Cover" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Player Controls */}
          <div className="flex-1 w-full">
            <div className="mb-4 text-center md:text-left">
              <h3 className="text-xl font-bold">{currentSong?.title || 'Select a song'}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{currentSong?.artist || 'Artist'}</p>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{duration ? formatTime(duration) : '0:00'}</span>
              </div>
              <Slider 
                value={[currentTime]} 
                min={0} 
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                disabled={!currentSong}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-center md:justify-start items-center gap-4">
              <button onClick={handlePrevious} disabled={!currentSong} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50">
                <SkipBack size={24} />
              </button>
              
              <button 
                onClick={togglePlayPause} 
                className="p-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50"
                disabled={!currentSong}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <button onClick={handleNext} disabled={!currentSong} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50">
                <SkipForward size={24} />
              </button>
              
              <div className="flex items-center gap-2 ml-4">
                <button onClick={toggleMute}>
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Song List */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg mb-3">Study & Focus Music</h3>
        
        {songs.map((song) => (
          <Card 
            key={song.id} 
            className={`hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${
              currentSong?.id === song.id ? 'border-primary' : ''
            }`}
            onClick={() => handlePlaySong(song)}
          >
            <CardContent className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow">
                <p className="font-medium line-clamp-1">{song.title}</p>
                <p className="text-xs text-muted-foreground">{song.artist}</p>
              </div>
              
              <div className="text-sm text-muted-foreground">{song.duration}</div>
              
              {currentSong?.id === song.id && isPlaying && (
                <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MusicPanel;

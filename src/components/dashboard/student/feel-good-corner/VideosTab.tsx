
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Clock, ThumbsUp } from 'lucide-react';
import { Video } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock video data
const motivationalVideos: Video[] = [
  {
    id: 1,
    title: "5 Tips to Stay Motivated While Studying",
    thumbnail: "/assets/feel-good/motivation-1.jpg",
    duration: "4:15"
  },
  {
    id: 2,
    title: "How to Overcome Exam Anxiety",
    thumbnail: "/assets/feel-good/motivation-2.jpg",
    duration: "3:45"
  },
  {
    id: 3,
    title: "The Power of Positive Thinking",
    thumbnail: "/assets/feel-good/motivation-3.jpg",
    duration: "5:20"
  }
];

const funnyVideos: Video[] = [
  {
    id: 4,
    title: "When Students Try to Complete Assignments at the Last Minute",
    thumbnail: "/assets/feel-good/funny-1.jpg",
    duration: "2:30"
  },
  {
    id: 5,
    title: "The Different Types of Students During Exams",
    thumbnail: "/assets/feel-good/funny-2.jpg",
    duration: "3:10"
  },
  {
    id: 6,
    title: "What Teachers Really Think About",
    thumbnail: "/assets/feel-good/funny-3.jpg",
    duration: "4:05"
  }
];

const educationalVideos: Video[] = [
  {
    id: 7,
    title: "The Science of Effective Learning",
    thumbnail: "/assets/feel-good/educational-1.jpg",
    duration: "6:20"
  },
  {
    id: 8,
    title: "How Memory Works - And How to Make It Work For You",
    thumbnail: "/assets/feel-good/educational-2.jpg",
    duration: "7:45"
  },
  {
    id: 9,
    title: "5 Study Techniques Backed By Science",
    thumbnail: "/assets/feel-good/educational-3.jpg",
    duration: "5:35"
  }
];

const VideosTab: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videoCategory, setVideoCategory] = useState('motivational');
  const isMobile = useIsMobile();
  
  const handlePlayVideo = (video: Video) => {
    setSelectedVideo(video);
    
    // In a real app, this would trigger a video player modal or redirect to a video player page
    console.log(`Playing video: ${video.title}`);
  };
  
  const getVideoList = () => {
    switch (videoCategory) {
      case 'motivational':
        return motivationalVideos;
      case 'funny':
        return funnyVideos;
      case 'educational':
        return educationalVideos;
      default:
        return motivationalVideos;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold mb-1`}>
          Mood-Boosting Videos
        </h3>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
          Short videos to inspire, entertain, and recharge your mind
        </p>
      </div>
      
      <Tabs defaultValue={videoCategory} onValueChange={setVideoCategory} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="motivational" className={isMobile ? 'text-xs' : ''}>Motivational</TabsTrigger>
          <TabsTrigger value="funny" className={isMobile ? 'text-xs' : ''}>Funny</TabsTrigger>
          <TabsTrigger value="educational" className={isMobile ? 'text-xs' : ''}>Educational</TabsTrigger>
        </TabsList>
        
        {['motivational', 'funny', 'educational'].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getVideoList().map((video) => (
                <Card 
                  key={video.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handlePlayVideo(video)}
                >
                  <div className="relative">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      {/* In a real app, this would be an actual image */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Button 
                          size="icon" 
                          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
                        >
                          <Play className="h-5 w-5" fill="white" />
                        </Button>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium line-clamp-2`}>{video.title}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-muted-foreground">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        <span className={`${isMobile ? 'text-[10px]' : 'text-xs'}`}>{Math.floor(Math.random() * 500) + 100}</span>
                      </div>
                      <Button variant="ghost" size="sm" className={isMobile ? 'h-7 text-xs px-2' : ''}>
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className={`${isMobile ? 'text-sm' : 'text-base'} font-medium mb-2`}>Why Watch {videoCategory.charAt(0).toUpperCase() + videoCategory.slice(1)} Videos?</h4>
              <ul className={`list-disc pl-5 space-y-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                {videoCategory === 'motivational' && (
                  <>
                    <li>Boost your confidence before exams</li>
                    <li>Renew your commitment to your academic goals</li>
                    <li>Find inspiration when feeling overwhelmed</li>
                  </>
                )}
                {videoCategory === 'funny' && (
                  <>
                    <li>Reduce stress hormones through laughter</li>
                    <li>Boost endorphins and improve mood</li>
                    <li>Take a mental break from intense studying</li>
                  </>
                )}
                {videoCategory === 'educational' && (
                  <>
                    <li>Learn evidence-based study techniques</li>
                    <li>Optimize your learning approach</li>
                    <li>Discover how your brain works for better retention</li>
                  </>
                )}
              </ul>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="flex justify-center mt-6">
        <Button size={isMobile ? "sm" : "default"} className={isMobile ? 'text-xs' : ''}>
          Browse More Videos
        </Button>
      </div>
    </div>
  );
};

export default VideosTab;

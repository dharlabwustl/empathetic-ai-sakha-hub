
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Video } from 'lucide-react';
import VideoTabContent from './VideoTabContent';

const VideoContent: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Button 
        variant="outline" 
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-blue-600" />
            Video Learning Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <VideoTabContent conceptName="Newton's Second Law" />
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoContent;

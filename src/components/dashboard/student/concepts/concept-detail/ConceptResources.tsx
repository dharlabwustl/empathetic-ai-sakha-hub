
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Zap, Video, FileText, Book, ExternalLink, 
  PlayCircle, Clock, Download, Link2
} from 'lucide-react';

interface ConceptResourcesProps {
  conceptId: string;
}

const ConceptResources: React.FC<ConceptResourcesProps> = ({ conceptId }) => {
  // Mock resources - in a real app this would come from an API
  const videos = [
    {
      id: "v1",
      title: "Understanding Newton's Second Law",
      duration: "5:24",
      thumbnail: "https://i.imgur.com/KQpBZtG.jpg",
      url: "#"
    },
    {
      id: "v2",
      title: "Force, Mass and Acceleration Demo",
      duration: "7:15",
      thumbnail: "https://i.imgur.com/5q8KJ3b.jpg",
      url: "#"
    }
  ];
  
  const documents = [
    {
      id: "d1",
      title: "Newton's Second Law PDF Notes",
      type: "PDF",
      fileSize: "1.2 MB",
      url: "#"
    },
    {
      id: "d2",
      title: "Physics Motion Cheat Sheet",
      type: "PDF",
      fileSize: "800 KB",
      url: "#"
    }
  ];
  
  const websites = [
    {
      id: "w1",
      title: "Khan Academy: Newton's Laws",
      domain: "khanacademy.org",
      url: "#"
    },
    {
      id: "w2",
      title: "Physics Classroom: Force and Acceleration",
      domain: "physicsclassroom.com",
      url: "#"
    }
  ];
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 }
        }
      }}
      className="space-y-8"
    >
      {/* Video resources */}
      <motion.div variants={itemVariants}>
        <div className="mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Video className="h-5 w-5 mr-2 text-red-600" /> 
            Video Resources
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Visual explanations of Newton's Second Law
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map(video => (
            <Card 
              key={video.id} 
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <PlayCircle className="h-12 w-12 text-white opacity-80" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs text-white flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> {video.duration}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium mb-1">{video.title}</h3>
                <Button variant="outline" size="sm" className="w-full mt-2 flex items-center gap-1">
                  <PlayCircle className="h-4 w-4" /> Watch Video
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
      
      {/* Document resources */}
      <motion.div variants={itemVariants}>
        <div className="mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" /> 
            Documents & Notes
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Downloadable study materials
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map(doc => (
            <Card 
              key={doc.id} 
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{doc.title}</h3>
                  <div className="text-xs text-gray-500 mt-1">
                    {doc.type} • {doc.fileSize}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" /> Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
      
      {/* External websites */}
      <motion.div variants={itemVariants}>
        <div className="mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Book className="h-5 w-5 mr-2 text-green-600" /> 
            External Resources
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Helpful websites for additional learning
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {websites.map(site => (
            <Card 
              key={site.id} 
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{site.title}</h3>
                  <div className="text-xs text-gray-500 mt-1 flex items-center">
                    <Link2 className="h-3 w-3 mr-1" /> {site.domain}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ExternalLink className="h-4 w-4" /> Visit
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConceptResources;

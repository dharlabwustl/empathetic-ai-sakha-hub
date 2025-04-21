
import React from 'react';
import { UserProfileType } from "@/types/user/base";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Video, Download, ExternalLink } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface ResourcesTabProps {
  userProfile: UserProfileType;
}

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'article' | 'book';
  subject: string;
  description: string;
  url: string;
  isPremium: boolean;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ userProfile }) => {
  // Sample resources
  const resources: Resource[] = [
    {
      id: 'resource-1',
      title: 'Introduction to Physics',
      type: 'pdf',
      subject: 'Physics',
      description: 'A comprehensive guide to basic physics concepts',
      url: '#',
      isPremium: false
    },
    {
      id: 'resource-2',
      title: 'Advanced Mathematics Formulas',
      type: 'pdf',
      subject: 'Mathematics',
      description: 'Collection of important formulas for advanced mathematics',
      url: '#',
      isPremium: true
    },
    {
      id: 'resource-3',
      title: 'Chemistry Lab Techniques',
      type: 'video',
      subject: 'Chemistry',
      description: 'Video tutorial on essential chemistry lab techniques',
      url: '#',
      isPremium: false
    },
    {
      id: 'resource-4',
      title: 'Biology Study Guide',
      type: 'article',
      subject: 'Biology',
      description: 'Comprehensive study guide for biology exam preparation',
      url: '#',
      isPremium: false
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-blue-500" />;
      case 'article':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'book':
        return <BookOpen className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Learning Resources</h2>
          <p className="text-muted-foreground mt-2">
            Access your study materials, reference books, and online resources.
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <motion.div 
            key={resource.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {getResourceIcon(resource.type)}
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </div>
                  {resource.isPremium && (
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                      Premium
                    </Badge>
                  )}
                </div>
                <Badge variant="outline" className="w-fit mt-2">
                  {resource.subject}
                </Badge>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  {resource.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={resource.isPremium ? "secondary" : "default"} 
                  className="w-full"
                  disabled={resource.isPremium && userProfile.subscription === SubscriptionType.Free}
                >
                  {resource.isPremium && userProfile.subscription === SubscriptionType.Free ? (
                    <>
                      Upgrade to Access
                    </>
                  ) : (
                    <>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {resource.type === 'pdf' ? 'Download PDF' : 'Open Resource'}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesTab;

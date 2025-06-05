
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, Video, ExternalLink, Star, HelpCircle } from 'lucide-react';

const ResourcesNotesSection: React.FC = () => {
  const resources = [
    {
      type: 'video',
      title: 'Thermodynamics Fundamentals',
      subject: 'Physics',
      duration: '45 min',
      rating: 4.8,
      url: '#'
    },
    {
      type: 'pdf',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      pages: 24,
      rating: 4.6,
      url: '#'
    },
    {
      type: 'notes',
      title: 'Human Physiology Notes',
      subject: 'Biology',
      pages: 18,
      rating: 4.9,
      url: '#'
    }
  ];

  const bookmarkedTopics = [
    { topic: 'Newton\'s Laws', subject: 'Physics', lastStudied: '2 days ago' },
    { topic: 'Periodic Table', subject: 'Chemistry', lastStudied: '1 day ago' },
    { topic: 'Cell Division', subject: 'Biology', lastStudied: '3 days ago' }
  ];

  const doubts = [
    { question: 'Why does specific heat vary with temperature?', subject: 'Physics', status: 'resolved' },
    { question: 'Mechanism of SN1 vs SN2 reactions?', subject: 'Chemistry', status: 'pending' },
    { question: 'Difference between mitosis and meiosis?', subject: 'Biology', status: 'resolved' }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'pdf': return FileText;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Daily Study Materials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resources.map((resource, index) => {
              const IconComponent = getIcon(resource.type);
              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline">{resource.subject}</Badge>
                        <span>
                          {resource.type === 'video' ? `${resource.duration}` : `${resource.pages} pages`}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Open
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-600" />
            Bookmarked Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bookmarkedTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{topic.topic}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Badge variant="outline">{topic.subject}</Badge>
                    <span>Last studied: {topic.lastStudied}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Study Again
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-purple-600" />
            Doubt Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {doubts.map((doubt, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{doubt.question}</h4>
                  <Badge 
                    className={doubt.status === 'resolved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {doubt.status}
                  </Badge>
                </div>
                <Badge variant="outline" className="text-xs">{doubt.subject}</Badge>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4" variant="outline">
            Ask New Doubt
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesNotesSection;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Video, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecommendationItem {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'video' | 'quiz' | 'practice';
}

interface RecommendationCardProps {
  recommendationType: 'resource' | 'quiz' | 'practice';
  title: string;
  items: RecommendationItem[];
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ 
  recommendationType,
  title,
  items
}) => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'pdf':
      case 'doc':
        return <FileText className="h-4 w-4 text-primary" />;
      case 'video':
        return <Video className="h-4 w-4 text-primary" />;
      default:
        return <BookOpen className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center">
                <div className="mr-3 p-2 rounded-full bg-primary/10">
                  {getIcon(item.type)}
                </div>
                <span className="text-sm">{item.title}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          ))}

          {items.length > 3 && (
            <Button variant="outline" className="w-full mt-2">
              View All {items.length} Items
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;

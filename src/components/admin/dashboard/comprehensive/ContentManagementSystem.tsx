
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Upload, Brain, Tag, Search } from 'lucide-react';

const ContentManagementSystem = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI-Driven Content Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded">
              <Upload className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-medium">Upload Materials</h3>
              <p className="text-sm text-muted-foreground">Reference materials for AI analysis</p>
              <Button size="sm" className="mt-2">Upload</Button>
            </div>
            <div className="text-center p-4 border rounded">
              <Brain className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-medium">Generate Content</h3>
              <p className="text-sm text-muted-foreground">AI-powered content creation</p>
              <Button size="sm" className="mt-2">Generate</Button>
            </div>
            <div className="text-center p-4 border rounded">
              <Tag className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-medium">Tag & Categorize</h3>
              <p className="text-sm text-muted-foreground">Organize by exam/subject/difficulty</p>
              <Button size="sm" className="mt-2">Manage Tags</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Content Repository</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Badge variant="secondary">2,456 Content Items</Badge>
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Search Repository
            </Button>
          </div>
          <p className="text-muted-foreground">Centralized repository accessible for creating and updating study plans.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagementSystem;

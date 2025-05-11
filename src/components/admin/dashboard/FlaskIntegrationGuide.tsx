
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Markdown from 'react-markdown';
import flaskGuideContent from '@/documentation/FlaskBackendIntegration.md';

const FlaskIntegrationGuide: React.FC = () => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
          <Markdown className="prose dark:prose-invert max-w-none">
            {flaskGuideContent}
          </Markdown>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FlaskIntegrationGuide;


import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import flaskGuideContent from '@/documentation/FlaskBackendIntegration.md';

const PublicFlaskGuidePage = () => {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <Link to="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Flask Backend Integration Guide</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Complete documentation for connecting Flask backend to PREPZR frontend
          </p>
        </div>
        
        <Card className="w-full">
          <CardContent className="p-6">
            <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: flaskGuideContent }} />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicFlaskGuidePage;

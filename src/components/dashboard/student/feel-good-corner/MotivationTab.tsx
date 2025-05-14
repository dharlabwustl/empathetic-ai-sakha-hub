
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, ThumbsUp, Share2, Bookmark, MessageSquare } from "lucide-react";

const MotivationTab = () => {
  const quotes = [
    {
      id: '1',
      text: "The difference between ordinary and extraordinary is that little extra.",
      author: "Jimmy Johnson",
      likes: 145,
      saved: true,
    },
    {
      id: '2',
      text: "Success is the sum of small efforts, repeated day in and day out.",
      author: "Robert Collier",
      likes: 112,
      saved: false,
    },
    {
      id: '3',
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
      likes: 96,
      saved: true,
    }
  ];
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Inspirational content to keep you motivated through your study journey.
      </p>
      
      {quotes.map((quote) => (
        <Card key={quote.id} className="overflow-hidden border-gray-200 hover:border-indigo-200 dark:border-gray-700 dark:hover:border-indigo-900 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Quote className="h-4 w-4 text-indigo-500" /> Daily Inspiration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="border-l-4 border-indigo-200 dark:border-indigo-800 pl-4 italic mb-2">
              <p className="text-base">{quote.text}</p>
            </blockquote>
            <p className="text-sm font-medium text-right">- {quote.author}</p>
            
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>{quote.likes}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Comment</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                <Share2 className="h-3.5 w-3.5" />
                <span>Share</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className={`gap-1 text-xs ${quote.saved ? 'text-yellow-500' : ''}`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>{quote.saved ? 'Saved' : 'Save'}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="text-center pt-2">
        <Button variant="outline" className="w-full">
          More Motivation
        </Button>
      </div>
    </div>
  );
};

export default MotivationTab;

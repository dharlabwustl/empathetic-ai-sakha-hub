
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Bookmark, Share2 } from "lucide-react";

interface NotesTabProps {
  notes?: string;
  title?: string;
}

const NotesTab: React.FC<NotesTabProps> = ({
  notes = "These are comprehensive notes for the concept. They include definitions, formulas, examples, and practice questions to help you master the concept.\n\nDefinition: [concept definition]\n\nKey formulas:\n- Formula 1: explanation\n- Formula 2: explanation\n\nExamples:\n1. Example problem and solution\n2. Example problem and solution\n\nPractice questions:\n1. Question 1\n2. Question 2",
  title = "Concept Notes"
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
      
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="prose max-w-none">
            {notes.split('\n\n').map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph.includes(':') ? (
                  <React.Fragment>
                    <h4>{paragraph.split(':')[0]}:</h4>
                    <p>{paragraph.split(':').slice(1).join(':')}</p>
                  </React.Fragment>
                ) : paragraph.startsWith('- ') ? (
                  <ul>
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i}>{item.substring(2)}</li>
                    ))}
                  </ul>
                ) : paragraph.match(/^\d\./) ? (
                  <ol>
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i}>{item.substring(item.indexOf(' ') + 1)}</li>
                    ))}
                  </ol>
                ) : (
                  <p>{paragraph}</p>
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesTab;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Edit, Save, Download, Share2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface NotesTabProps {
  conceptId: string;
  conceptTitle: string;
}

const NotesTab: React.FC<NotesTabProps> = ({ conceptId, conceptTitle }) => {
  const [editMode, setEditMode] = useState(false);
  const [personalNotes, setPersonalNotes] = useState(
    `These are my personal notes for ${conceptTitle}.\n\n` +
    `Key points to remember:\n` +
    `- First important point\n` +
    `- Second important concept\n` +
    `- Example calculations\n\n` +
    `Questions to ask teacher:\n` +
    `1. How does this relate to other topics?\n` +
    `2. Will this be important for the exam?`
  );

  const handleSaveNotes = () => {
    setEditMode(false);
    // In a real app, save to backend/localStorage
    console.log("Saving notes:", personalNotes);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="provided" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="provided">Provided Notes</TabsTrigger>
          <TabsTrigger value="personal">My Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="provided" className="pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
              {conceptTitle} - Study Notes
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
          
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2 bg-muted/50">
              <CardTitle className="text-base">Key Concepts</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h4>Introduction</h4>
                <p>
                  This comprehensive note covers all aspects of {conceptTitle} as required for your exam preparation. 
                  The material is organized according to the latest syllabus and exam pattern.
                </p>
                
                <h4>Definition and Core Principles</h4>
                <p>
                  {conceptTitle} refers to the foundational principles that govern this subject area. 
                  Understanding these principles is essential for solving complex problems.
                </p>
                
                <ul>
                  <li>First principle: Description of the first important principle</li>
                  <li>Second principle: Description of the second important principle</li>
                  <li>Third principle: Description of the third important principle</li>
                </ul>
                
                <h4>Mathematical Formulation</h4>
                <p>
                  The mathematical representation of this concept can be expressed as:
                </p>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
                  E = mc²
                </pre>
                <p>
                  Where:
                </p>
                <ul>
                  <li>E represents energy</li>
                  <li>m represents mass</li>
                  <li>c represents the speed of light</li>
                </ul>
                
                <h4>Applications</h4>
                <p>
                  This concept has numerous applications in real-world scenarios:
                </p>
                <ol>
                  <li>Application in medical diagnosis</li>
                  <li>Application in energy production</li>
                  <li>Application in modern technology</li>
                </ol>
                
                <h4>Common Mistakes to Avoid</h4>
                <p>
                  Students often make these mistakes when working with this concept:
                </p>
                <ul>
                  <li>Mistake 1: Description and correction</li>
                  <li>Mistake 2: Description and correction</li>
                </ul>
                
                <h4>Practice Problems</h4>
                <p>
                  Try these practice problems to reinforce your understanding:
                </p>
                <ol>
                  <li>Problem statement 1</li>
                  <li>Problem statement 2</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="personal" className="pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium flex items-center">
              <Edit className="mr-2 h-5 w-5 text-purple-600" />
              My Personal Notes
            </h3>
            <Button
              variant={editMode ? "default" : "outline"}
              onClick={() => editMode ? handleSaveNotes() : setEditMode(true)}
              size="sm"
              className="h-8"
            >
              {editMode ? (
                <>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </>
              )}
            </Button>
          </div>
          
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardContent className="pt-6">
              {editMode ? (
                <Textarea
                  value={personalNotes}
                  onChange={(e) => setPersonalNotes(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
              ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-mono">
                  {personalNotes}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotesTab;

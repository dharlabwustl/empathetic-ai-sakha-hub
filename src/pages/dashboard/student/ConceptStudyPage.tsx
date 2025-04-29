
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight, BookMarked, MessageSquare, Video, Share, Bookmark } from 'lucide-react';

const ConceptStudyPage = () => {
  const { conceptId } = useParams();

  return (
    <SharedPageLayout 
      title="Concept Study" 
      subtitle="Master key concepts with detailed explanations"
      showQuickAccess={false}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold">Pythagorean Theorem</h2>
                <p className="text-gray-500">Mathematics • Geometry • Chapter 5</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Bookmark size={16} className="mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share size={16} className="mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="simple" className="p-6">
            <TabsList className="mb-6">
              <TabsTrigger value="simple">Simple</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>
            
            <TabsContent value="simple">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Simple Explanation</h3>
                
                <p>
                  The Pythagorean theorem is a key mathematical formula that relates the sides of a right triangle. It states that in a right-angled triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides.
                </p>
                
                <div className="my-6 text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-xl font-mono">a² + b² = c²</p>
                  <p className="text-sm text-gray-600 mt-2">where c is the hypotenuse and a and b are the other two sides</p>
                </div>
                
                <p>
                  This theorem is foundational in geometry and has applications in distance calculations, construction, navigation and many scientific fields.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="detailed">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Detailed Explanation</h3>
                <p>Coming soon. The detailed explanation tab is under development.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="examples">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Examples</h3>
                <p>Coming soon. The examples tab is under development.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="video">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Video Explanation</h3>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Video player coming soon</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="practice">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Practice Problems</h3>
                <p>Coming soon. Practice problems are under development.</p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="p-6 border-t bg-gray-50 flex justify-between">
            <Button variant="outline">
              <ArrowLeft size={16} className="mr-2" />
              Previous Concept
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <MessageSquare size={16} className="mr-2" />
                Ask Question
              </Button>
              <Button>Mark as Complete</Button>
            </div>
            <Button variant="outline">
              Next Concept
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Related Concepts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow">
              <h4 className="font-medium">Similar Triangles</h4>
              <p className="text-sm text-gray-500">Geometry • Chapter 6</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow">
              <h4 className="font-medium">Trigonometric Ratios</h4>
              <p className="text-sm text-gray-500">Trigonometry • Chapter 3</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow">
              <h4 className="font-medium">Distance Formula</h4>
              <p className="text-sm text-gray-500">Coordinate Geometry • Chapter 2</p>
            </div>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptStudyPage;

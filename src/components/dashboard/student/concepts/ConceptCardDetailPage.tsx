import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, CheckCircle, Clock, Star, Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ConceptCardDetailPageProps {
  // Add props if needed
}

const ConceptCardDetailPage: React.FC<ConceptCardDetailPageProps> = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data - in a real app, this would be fetched based on the conceptId
  const conceptData = {
    id: conceptId || 'concept-1',
    title: 'Cell Structure and Function',
    subject: 'Biology',
    chapter: 'Cell Biology',
    difficulty: 'medium',
    progress: 65,
    masteryScore: 72,
    lastStudied: '2023-11-10T14:30:00',
    timeSpent: '3h 45m',
    description: 'Learn about the structure and function of cells, including cell organelles, cell membrane, and cellular processes.',
    keyTopics: [
      'Cell organelles and their functions',
      'Cell membrane structure',
      'Transport mechanisms across cell membrane',
      'Cellular respiration',
      'Cell division and cell cycle'
    ],
    related: [
      { id: 'concept-2', title: 'Cell Division' },
      { id: 'concept-3', title: 'Cellular Metabolism' }
    ],
    resources: [
      { type: 'video', title: 'Cell Structure Introduction', duration: '12:35' },
      { type: 'pdf', title: 'Cell Organelles Chart', pages: 4 },
      { type: 'practice', title: 'Cell Transport Quiz', questions: 15 }
    ]
  };
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  // Format date for display
  const formatLastStudied = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header with Back Button */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBackClick} 
          className="flex items-center text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to All Concepts
        </Button>
        
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl md:text-3xl font-bold">{conceptData.title}</h1>
        </div>
        
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="px-2 py-1">
            {conceptData.subject}
          </Badge>
          <Badge variant="outline" className="px-2 py-1">
            {conceptData.chapter}
          </Badge>
          <Badge 
            variant="outline" 
            className={
              conceptData.difficulty === 'easy' ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400' :
              conceptData.difficulty === 'medium' ? 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
              'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400'
            }
          >
            {conceptData.difficulty} difficulty
          </Badge>
        </div>
        
        {/* Progress and Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="mb-2 text-muted-foreground text-sm">Progress</div>
              <div className="relative w-16 h-16 mb-1">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-medium">{conceptData.progress}%</span>
                </div>
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="3" />
                  <circle 
                    cx="18" cy="18" r="16" fill="none" stroke="currentColor" 
                    strokeWidth="3" strokeDasharray={`${conceptData.progress} 100`} 
                    className="text-primary"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <div>
                  <div className="text-sm text-muted-foreground">Mastery Score</div>
                  <div className="font-medium">{conceptData.masteryScore}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <div className="text-sm text-muted-foreground">Time Spent</div>
                  <div className="font-medium">{conceptData.timeSpent}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <div className="text-sm text-muted-foreground">Last Studied</div>
                  <div className="font-medium">{formatLastStudied(conceptData.lastStudied)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white dark:bg-gray-850 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-200 dark:border-gray-800">
            <TabsList className="h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="overview" 
                className="px-6 py-3 font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="content" 
                className="px-6 py-3 font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
              >
                Content
              </TabsTrigger>
              <TabsTrigger 
                value="formulas" 
                className="px-6 py-3 font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
              >
                Formulas
              </TabsTrigger>
              <TabsTrigger 
                value="practice" 
                className="px-6 py-3 font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
              >
                Practice
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="p-6 focus-visible:outline-none focus-visible:ring-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-gray-700 dark:text-gray-300">{conceptData.description}</p>
                  </div>
                  
                  {/* Key Topics */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Key Topics</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                      {conceptData.keyTopics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Learning Path */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Learning Path</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mr-3">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">Introduction to Cell Biology</div>
                          <div className="text-sm text-muted-foreground">Completed</div>
                        </div>
                      </div>
                      <div className="ml-4 w-0.5 h-6 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mr-3">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">Cell Organelles</div>
                          <div className="text-sm text-muted-foreground">Completed</div>
                        </div>
                      </div>
                      <div className="ml-4 w-0.5 h-6 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3">
                          <div className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                        </div>
                        <div>
                          <div className="font-medium">Cell Transport</div>
                          <div className="text-sm text-muted-foreground">In Progress (65%)</div>
                        </div>
                      </div>
                      <div className="ml-4 w-0.5 h-6 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center mr-3">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        </div>
                        <div>
                          <div className="font-medium">Cellular Respiration</div>
                          <div className="text-sm text-muted-foreground">Not Started</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Resources */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {conceptData.resources.map((resource, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center">
                            {resource.type === 'video' ? (
                              <Video className="h-5 w-5 text-red-500 mr-3" />
                            ) : resource.type === 'pdf' ? (
                              <BookOpen className="h-5 w-5 text-blue-500 mr-3" />
                            ) : (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                            )}
                            <div>
                              <div className="font-medium">{resource.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {resource.type === 'video' && `${resource.duration} min`}
                                {resource.type === 'pdf' && `${resource.pages} pages`}
                                {resource.type === 'practice' && `${resource.questions} questions`}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Related Concepts */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Related Concepts</CardTitle>
                    <CardDescription>Explore connected topics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {conceptData.related.map((item) => (
                        <Button 
                          key={item.id}
                          variant="outline"
                          className="w-full justify-start text-left h-auto py-2"
                          onClick={() => navigate(`/dashboard/student/concepts/card/${item.id}`)}
                        >
                          <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{item.title}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Study Actions */}
                <div className="space-y-3">
                  <Button className="w-full">
                    Start Practice Test
                  </Button>
                  <Button variant="outline" className="w-full">
                    Add to Study Plan
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Other Tabs (content shown as placeholders) */}
          <TabsContent value="content" className="p-6 space-y-6 focus-visible:outline-none focus-visible:ring-0">
            <div className="text-center py-10">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium">Content Coming Soon</h3>
              <p className="text-muted-foreground">Detailed content for this concept is being prepared.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="formulas" className="p-6 space-y-6 focus-visible:outline-none focus-visible:ring-0">
            <div className="text-center py-10">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium">Formula Reference Coming Soon</h3>
              <p className="text-muted-foreground">Key formulas and equations for this concept are being prepared.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="practice" className="p-6 space-y-6 focus-visible:outline-none focus-visible:ring-0">
            <div className="text-center py-10">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium">Practice Questions Coming Soon</h3>
              <p className="text-muted-foreground">Interactive practice questions for this concept are being prepared.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConceptCardDetailPage;


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, BookOpen, Brain, CheckCircle, Clock, Play, Star, Lightbulb, FileText, Video, Zap } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import SidebarLayout from '@/components/dashboard/SidebarLayout';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock concept data - in real app, fetch based on conceptId
  const concept = {
    id: conceptId || '1',
    title: 'Photosynthesis',
    subject: 'Biology',
    chapter: 'Life Processes',
    difficulty: 'Medium',
    estimatedTime: '45 min',
    progress: 65,
    description: 'Learn about the process by which plants convert light energy into chemical energy',
    keyPoints: [
      'Light-dependent reactions occur in thylakoids',
      'Calvin cycle happens in the stroma',
      'Chlorophyll absorbs light energy',
      'Oxygen is produced as a byproduct'
    ],
    examples: [
      {
        title: 'Leaf Structure',
        description: 'Understanding how leaf anatomy supports photosynthesis'
      },
      {
        title: 'Light Reactions',
        description: 'Step-by-step breakdown of photosystem I and II'
      }
    ],
    relatedConcepts: [
      { id: '2', title: 'Cellular Respiration', subject: 'Biology' },
      { id: '3', title: 'Plant Anatomy', subject: 'Biology' },
      { id: '4', title: 'Energy Transfer', subject: 'Physics' }
    ]
  };

  const handleStartPractice = () => {
    navigate(`/dashboard/student/flashcards/photosynthesis/interactive`);
  };

  const handleTakeQuiz = () => {
    navigate(`/dashboard/student/practice-exam/photosynthesis-quiz/start`);
  };

  const ContentSection = ({ children }: { children: React.ReactNode }) => (
    <div className={`${isMobile ? 'px-3 py-4' : 'px-6 py-6'}`}>
      {children}
    </div>
  );

  return (
    <SidebarLayout>
      <div className={`min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-green-50/50 dark:from-blue-900/10 dark:via-gray-900 dark:to-green-900/10 ${isMobile ? 'pb-20' : ''}`}>
        <Helmet>
          <title>{concept.title} - PREPZR Concepts</title>
          <meta name="description" content={concept.description} />
        </Helmet>

        <ContentSection>
          {/* Mobile-optimized Header */}
          <div className={`${isMobile ? 'space-y-4' : 'space-y-6'}`}>
            <div className={`flex items-center gap-3 ${isMobile ? 'flex-col sm:flex-row' : ''}`}>
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                onClick={() => navigate('/dashboard/student/concepts')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                {isMobile ? 'Back' : 'Back to Concepts'}
              </Button>
              
              <div className={`flex items-center gap-2 ${isMobile ? 'w-full justify-between' : 'ml-auto'}`}>
                <Button
                  variant="outline"
                  size={isMobile ? "sm" : "default"}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`${isBookmarked ? 'text-yellow-600 border-yellow-600' : ''}`}
                >
                  <Star className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} ${isBookmarked ? 'fill-current' : ''}`} />
                  {!isMobile && (isBookmarked ? 'Bookmarked' : 'Bookmark')}
                </Button>
                
                <Button 
                  size={isMobile ? "sm" : "default"}
                  onClick={handleStartPractice}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                >
                  <Play className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
                  {isMobile ? 'Practice' : 'Start Practice'}
                </Button>
              </div>
            </div>

            {/* Concept Header Card - Mobile Optimized */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500/10 to-green-500/10">
              <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                <div className={`${isMobile ? 'space-y-3' : 'space-y-4'}`}>
                  <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-start justify-between'}`}>
                    <div>
                      <h1 className={`font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent ${isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'}`}>
                        {concept.title}
                      </h1>
                      <div className={`flex gap-2 mt-2 ${isMobile ? 'flex-wrap' : ''}`}>
                        <Badge variant="secondary" className={`${isMobile ? 'text-xs' : ''}`}>
                          {concept.subject}
                        </Badge>
                        <Badge variant="outline" className={`${isMobile ? 'text-xs' : ''}`}>
                          {concept.chapter}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`${concept.difficulty === 'Easy' ? 'border-green-500 text-green-600' : 
                                     concept.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-600' : 
                                     'border-red-500 text-red-600'} ${isMobile ? 'text-xs' : ''}`}
                        >
                          {concept.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-4 ${isMobile ? 'text-sm' : ''}`}>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                        <span>{concept.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className={`text-gray-600 dark:text-gray-300 ${isMobile ? 'text-sm' : ''}`}>
                    {concept.description}
                  </p>
                  
                  {/* Progress Section */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>Progress</span>
                      <span className={`text-blue-600 font-semibold ${isMobile ? 'text-sm' : ''}`}>
                        {concept.progress}%
                      </span>
                    </div>
                    <Progress value={concept.progress} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile-Optimized Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-4 h-auto' : 'grid-cols-4'}`}>
              <TabsTrigger 
                value="overview" 
                className={`${isMobile ? 'text-xs px-2 py-2' : ''} flex items-center gap-1`}
              >
                <BookOpen className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                {isMobile ? 'Learn' : 'Overview'}
              </TabsTrigger>
              <TabsTrigger 
                value="examples" 
                className={`${isMobile ? 'text-xs px-2 py-2' : ''} flex items-center gap-1`}
              >
                <Lightbulb className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                {isMobile ? 'Examples' : 'Examples'}
              </TabsTrigger>
              <TabsTrigger 
                value="practice" 
                className={`${isMobile ? 'text-xs px-2 py-2' : ''} flex items-center gap-1`}
              >
                <Brain className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                {isMobile ? 'Practice' : 'Practice'}
              </TabsTrigger>
              <TabsTrigger 
                value="related" 
                className={`${isMobile ? 'text-xs px-2 py-2' : ''} flex items-center gap-1`}
              >
                <Zap className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                {isMobile ? 'Related' : 'Related'}
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents - Mobile Optimized */}
            <div className="mt-4">
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader className={`${isMobile ? 'p-4 pb-2' : ''}`}>
                    <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-lg' : ''}`}>
                      <BookOpen className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                      Key Concepts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${isMobile ? 'p-4 pt-0' : ''}`}>
                    <ul className="space-y-3">
                      {concept.keyPoints.map((point, index) => (
                        <li key={index} className={`flex items-start gap-2 ${isMobile ? 'text-sm' : ''}`}>
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="examples" className="space-y-4">
                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {concept.examples.map((example, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className={`${isMobile ? 'p-4 pb-2' : ''}`}>
                        <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                          <FileText className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                          {example.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className={`${isMobile ? 'p-4 pt-0' : ''}`}>
                        <p className={`text-gray-600 dark:text-gray-300 ${isMobile ? 'text-sm' : ''}`}>
                          {example.description}
                        </p>
                        <Button 
                          variant="outline" 
                          size={isMobile ? "sm" : "default"}
                          className="mt-3 w-full"
                        >
                          <Video className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
                          View Example
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="practice" className="space-y-4">
                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleStartPractice}>
                    <CardContent className={`${isMobile ? 'p-4' : 'p-6'} text-center`}>
                      <Brain className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} mx-auto text-blue-500 mb-3`} />
                      <h3 className={`font-semibold mb-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
                        Interactive Flashcards
                      </h3>
                      <p className={`text-gray-600 dark:text-gray-300 mb-4 ${isMobile ? 'text-sm' : ''}`}>
                        Practice with smart flashcards
                      </p>
                      <Button className="w-full" size={isMobile ? "sm" : "default"}>
                        Start Practice
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleTakeQuiz}>
                    <CardContent className={`${isMobile ? 'p-4' : 'p-6'} text-center`}>
                      <FileText className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} mx-auto text-green-500 mb-3`} />
                      <h3 className={`font-semibold mb-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
                        Concept Quiz
                      </h3>
                      <p className={`text-gray-600 dark:text-gray-300 mb-4 ${isMobile ? 'text-sm' : ''}`}>
                        Test your understanding
                      </p>
                      <Button variant="outline" className="w-full" size={isMobile ? "sm" : "default"}>
                        Take Quiz
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="related" className="space-y-4">
                <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                  {concept.relatedConcepts.map((related) => (
                    <Card 
                      key={related.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/dashboard/student/concepts/${related.id}`)}
                    >
                      <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className={`font-medium ${isMobile ? 'text-sm' : ''}`}>
                              {related.title}
                            </h4>
                            <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              {related.subject}
                            </p>
                          </div>
                          <ArrowLeft className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} rotate-180 text-gray-400`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </ContentSection>
      </div>
    </SidebarLayout>
  );
};

export default ConceptDetailPage;

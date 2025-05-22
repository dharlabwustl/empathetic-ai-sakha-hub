
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConceptsPageLayout } from '@/components/dashboard/student/concept-cards/ConceptsPageLayout';
import ConceptHeader from '@/components/dashboard/student/concepts/concept-detail/ConceptHeader';
import { Shield, BookOpen, Video, FlaskConical, Lightbulb, Brain, PenTool, BarChart, RotateCw, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormulaTabContent } from '@/components/dashboard/student/concepts/FormulaTabContent';
import AIInsightsSection from '@/components/dashboard/student/concepts/AIInsightsSection';
import ConceptAnalyticsSection from '@/components/dashboard/student/concepts/ConceptAnalyticsSection';

// Simulated data (in a real app, this would come from an API)
const conceptData = {
  id: 'concept-1',
  title: 'Newton\'s Laws of Motion',
  subject: 'Physics',
  topic: 'Classical Mechanics',
  difficulty: 'medium' as const,
  content: `
    <h2>First Law of Motion</h2>
    <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.</p>

    <h2>Second Law of Motion</h2>
    <p>The acceleration of an object depends on the mass of the object and the amount of force applied. F = ma</p>

    <h2>Third Law of Motion</h2>
    <p>For every action, there is an equal and opposite reaction.</p>
  `,
  keyPoints: [
    'Objects in motion tend to stay in motion unless acted upon by a force',
    'Force equals mass times acceleration (F = ma)',
    'For every action, there is an equal and opposite reaction'
  ],
  masteryLevel: 65,
  recallAccuracy: 70,
  quizScore: 80,
  videos: [
    {
      id: 'video-1',
      title: 'Understanding Newton\'s First Law',
      url: 'https://example.com/video1',
      duration: '5:30',
      thumbnail: 'https://via.placeholder.com/320x180'
    },
    {
      id: 'video-2',
      title: 'Newton\'s Second Law in Action',
      url: 'https://example.com/video2',
      duration: '7:15',
      thumbnail: 'https://via.placeholder.com/320x180'
    }
  ]
};

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');
  const [formulaLabOpen, setFormulaLabOpen] = useState(false);
  
  // Toggle bookmark
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  // Open formula lab
  const handleOpenFormulaLab = () => {
    setFormulaLabOpen(true);
  };
  
  return (
    <ConceptsPageLayout
      title="Concept Details"
      subtitle="Master each concept with personalized resources"
      showBackButton={true}
    >
      <div className="space-y-6">
        {/* Concept Header */}
        <ConceptHeader
          title={conceptData.title}
          subject={conceptData.subject}
          topic={conceptData.topic}
          difficulty={conceptData.difficulty}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />
        
        {/* Mastery & Recall Tracker */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-bold">Mastery & Recall Tracker</h2>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RotateCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
              <Button size="sm" variant="default">
                <Brain className="h-4 w-4 mr-2" />
                Take Quiz
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mastery Level */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-4 border border-indigo-100 dark:border-indigo-800/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-indigo-800 dark:text-indigo-300">Mastery Level</h3>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{conceptData.masteryLevel}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${conceptData.masteryLevel}%` }}></div>
              </div>
            </div>
            
            {/* Recall Accuracy */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-4 border border-green-100 dark:border-green-800/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-green-800 dark:text-green-300">Recall Accuracy</h3>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">{conceptData.recallAccuracy}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${conceptData.recallAccuracy}%` }}></div>
              </div>
            </div>
            
            {/* Quiz Performance */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-blue-800 dark:text-blue-300">Quiz Performance</h3>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{conceptData.quizScore}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${conceptData.quizScore}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Insights Section */}
        <AIInsightsSection 
          conceptId={conceptId || ''} 
          conceptTitle={conceptData.title} 
        />
        
        {/* Main Concept Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6 pt-6">
              <TabsList className="w-full grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-2">
                <TabsTrigger value="learn" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden md:inline">Learn</span>
                </TabsTrigger>
                <TabsTrigger value="visual" className="flex items-center gap-1">
                  <Lightbulb className="h-4 w-4" />
                  <span className="hidden md:inline">Visual</span>
                </TabsTrigger>
                <TabsTrigger value="simulation" className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span className="hidden md:inline">3D Simulation</span>
                </TabsTrigger>
                <TabsTrigger value="formula" className="flex items-center gap-1">
                  <FlaskConical className="h-4 w-4" />
                  <span className="hidden md:inline">Formula Lab</span>
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  <span className="hidden md:inline">Video</span>
                </TabsTrigger>
                <TabsTrigger value="mistakes" className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span className="hidden md:inline">Common Mistakes</span>
                </TabsTrigger>
                <TabsTrigger value="recall" className="flex items-center gap-1">
                  <Brain className="h-4 w-4" />
                  <span className="hidden md:inline">Recall</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-1">
                  <BarChart className="h-4 w-4" />
                  <span className="hidden md:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="revision" className="flex items-center gap-1">
                  <RotateCw className="h-4 w-4" />
                  <span className="hidden md:inline">Revision</span>
                </TabsTrigger>
                <TabsTrigger value="discuss" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden md:inline">Discuss</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Learn Tab Content */}
            <TabsContent value="learn" className="p-0 m-0">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                  {conceptData.title}
                </h2>
                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: conceptData.content }} />
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Key Points</h3>
                  <ul className="space-y-2">
                    {conceptData.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-indigo-600 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            {/* Visual Tab Content */}
            <TabsContent value="visual" className="p-0 m-0">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-amber-600" />
                  Visual Learning
                </h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Visual representations would appear here</p>
                    <p className="text-sm">Diagrams, mind maps, and interactive visuals</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* 3D Simulation Tab Content */}
            <TabsContent value="simulation" className="p-0 m-0">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                  3D Simulation
                </h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">3D simulation would render here</p>
                    <p className="text-sm">Interactive 3D models and animations</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Formula Lab Tab Content */}
            <TabsContent value="formula" className="p-0 m-0">
              <FormulaTabContent 
                conceptId={conceptId || ''} 
                conceptTitle={conceptData.title}
                handleOpenFormulaLab={handleOpenFormulaLab}
              />
            </TabsContent>
            
            {/* Video Tab Content */}
            <TabsContent value="video" className="p-0 m-0">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Video className="h-6 w-6 text-red-600" />
                  Video Explanations
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {conceptData.videos.map((video) => (
                    <div key={video.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                      <div className="aspect-video bg-gray-200 relative">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                              <Video className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-1">{video.title}</h3>
                        <p className="text-sm text-gray-500">{video.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Common Mistakes Tab Content */}
            <TabsContent value="mistakes" className="p-0 m-0">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-red-600" />
                  Common Mistakes
                </h2>
                <div className="space-y-4">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Misunderstanding Newton's First Law</h3>
                    <p className="text-red-700 dark:text-red-300">Many students think objects naturally slow down without a force, but they actually maintain constant velocity unless acted upon by a force.</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Confusing Mass and Weight</h3>
                    <p className="text-red-700 dark:text-red-300">Students often use mass and weight interchangeably. Mass is a measure of matter (kg), while weight is a force due to gravity (N).</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Incorrect Application of F=ma</h3>
                    <p className="text-red-700 dark:text-red-300">A common error is applying F=ma to situations where multiple forces act. Remember to use the net force in the equation.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Recall Tab Content */}
            <TabsContent value="recall" className="p-0 m-0">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Brain className="h-6 w-6 text-purple-600" />
                  Recall Training
                </h2>
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 rounded-lg p-8 mb-6">
                  <h3 className="text-lg font-medium text-purple-800 dark:text-purple-300 mb-4 text-center">Quick Recall Challenge</h3>
                  <div className="flex justify-center mb-4">
                    <Button className="bg-purple-600 hover:bg-purple-700">Start Recall Challenge</Button>
                  </div>
                  <p className="text-center text-sm text-purple-600 dark:text-purple-400">
                    Recommended: Complete this 2-minute recall exercise daily for best results
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Flashcards</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">12 flashcards available</p>
                    <Button variant="outline" className="w-full">Review Flashcards</Button>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Spaced Repetition</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Next review: Tomorrow</p>
                    <Button variant="outline" className="w-full">View Schedule</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Analytics Tab Content */}
            <TabsContent value="analytics" className="p-0 m-0">
              <ConceptAnalyticsSection
                conceptId={conceptId || ''}
                masteryPercent={conceptData.masteryLevel}
                recallAccuracy={conceptData.recallAccuracy}
                quizScore={conceptData.quizScore}
              />
            </TabsContent>
            
            {/* Revision Tab Content */}
            <TabsContent value="revision" className="p-0 m-0">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <RotateCw className="h-6 w-6 text-green-600" />
                  Revision Plan
                </h2>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">Personalized Revision Strategy</h3>
                  <p className="text-green-700 dark:text-green-400 mb-4">
                    Based on your learning data, we recommend reviewing this concept in <span className="font-semibold">3 days</span>.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="border-green-200 text-green-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Revision
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <RotateCw className="h-4 w-4 mr-2" />
                      Revise Now
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Revision Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all">
                      <h4 className="font-medium mb-2">Summary Notes</h4>
                      <p className="text-sm text-gray-500 mb-4">1-page concept summary</p>
                      <Button variant="outline" size="sm" className="w-full">View Summary</Button>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all">
                      <h4 className="font-medium mb-2">Practice Quiz</h4>
                      <p className="text-sm text-gray-500 mb-4">10 questions (5 min)</p>
                      <Button variant="outline" size="sm" className="w-full">Take Quiz</Button>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all">
                      <h4 className="font-medium mb-2">Mind Map</h4>
                      <p className="text-sm text-gray-500 mb-4">Visual concept connections</p>
                      <Button variant="outline" size="sm" className="w-full">View Mind Map</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Notes Tab Content */}
            <TabsContent value="notes" className="p-0 m-0">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <PenTool className="h-6 w-6 text-cyan-600" />
                    Your Notes
                  </h2>
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <PenTool className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
                
                <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800/30 rounded-lg p-4 mb-6">
                  <p className="text-cyan-700 dark:text-cyan-400 text-center">
                    Notes help reinforce learning! Add important points and personal insights here.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Exam Example: Car Crash Analysis</h3>
                      <span className="text-xs text-gray-500">3 days ago</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      In a car crash, the car stops but the passenger continues moving forward due to Newton's first law.
                      This is why seat belts are essential - they provide the force needed to stop the passenger.
                    </p>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline" className="text-red-500">Delete</Button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Formula Application</h3>
                      <span className="text-xs text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Remember to convert all units to SI before applying F=ma. Common mistake: using kg for mass but g for acceleration.
                    </p>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline" className="text-red-500">Delete</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Discuss Tab Content */}
            <TabsContent value="discuss" className="p-0 m-0">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-orange-600" />
                  Discussion Forum
                </h2>
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/30 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-medium text-orange-800 dark:text-orange-300 mb-2">Join the Conversation</h3>
                  <p className="text-orange-700 dark:text-orange-400 mb-4">
                    Ask questions, share insights, or discuss examples related to {conceptData.title}.
                  </p>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Post a Question
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
                        RS
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">Rahul S.</h3>
                          <span className="text-xs text-gray-500">2 days ago</span>
                        </div>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">
                          Can someone explain how Newton's laws apply to circular motion?
                        </p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <button className="text-gray-500 flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>Reply (3)</span>
                          </button>
                          <button className="text-gray-500 flex items-center gap-1">
                            <Shield className="h-4 w-4" />
                            <span>Helpful (5)</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
                        AP
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">Ananya P.</h3>
                          <span className="text-xs text-gray-500">5 days ago</span>
                        </div>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">
                          I'm struggling with problems involving multiple forces. Any tips?
                        </p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <button className="text-gray-500 flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>Reply (7)</span>
                          </button>
                          <button className="text-gray-500 flex items-center gap-1">
                            <Shield className="h-4 w-4" />
                            <span>Helpful (12)</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ConceptsPageLayout>
  );
};

export default ConceptDetailPage;

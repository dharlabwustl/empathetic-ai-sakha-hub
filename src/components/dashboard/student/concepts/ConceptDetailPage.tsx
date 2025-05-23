
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptContent from './concept-detail/ConceptContent';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import AIInsights from './AIInsights';
import { Card, CardContent } from '@/components/ui/card';
import DiscussSection from './DiscussSection';
import NoteSection from './concept-detail/NoteSection';
import ReadAloudSection from './concept-detail/ReadAloudSection';
import LinkedConceptsSection from './concept-detail/LinkedConceptsSection';
import AskTutorSection from './concept-detail/AskTutorSection';
import FormulaReference from './concept-detail/FormulaReference';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');
  const [activeSecondaryTab, setActiveSecondaryTab] = useState('notes');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  
  // Mock data (in a real app this would come from API)
  const conceptData = {
    id: conceptId || 'c1',
    title: "Newton's Second Law of Motion",
    subject: "Physics",
    topic: "Classical Mechanics",
    difficulty: "medium" as const,
    description: "Newton's second law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. The law is often expressed as F = ma, where F is the net force, m is the mass, and a is the acceleration.",
    content: `
      <h2>Newton's Second Law of Motion</h2>
      <p>Newton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to the object's mass.</p>
      
      <p>This relationship is expressed by the equation:</p>
      <p><strong>F = m × a</strong></p>
      
      <p>Where:</p>
      <ul>
        <li>F is the net force acting on the object (measured in Newtons, N)</li>
        <li>m is the mass of the object (measured in kilograms, kg)</li>
        <li>a is the acceleration produced (measured in meters per second squared, m/s²)</li>
      </ul>
      
      <h3>Implications of the Law</h3>
      <p>Newton's Second Law has several important implications:</p>
      <ol>
        <li>If the net force on an object is zero, its acceleration is zero, meaning it will maintain constant velocity (which could be zero).</li>
        <li>The direction of acceleration is always in the direction of the net force.</li>
        <li>The same force applied to objects of different masses will produce different accelerations.</li>
        <li>The law works in all reference frames that are not accelerating (inertial reference frames).</li>
      </ol>
      
      <h3>Applications</h3>
      <p>This law is fundamental to classical mechanics and has countless applications:</p>
      <ul>
        <li>Vehicle design and safety systems</li>
        <li>Rocket propulsion</li>
        <li>Sports physics</li>
        <li>Engineering structural analysis</li>
        <li>Everyday motion analysis</li>
      </ul>
    `,
    masteryLevel: 68,
    recallStrength: 72,
    studyTime: "4h 30m",
    nextReview: "Tomorrow",
    isExamReady: false,
    visualContent: "Interactive graph showing the relationship between force, mass, and acceleration.",
    simulation3D: "3D simulation of objects with different masses responding to the same force.",
    videoURL: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    commonMistakes: [
      "Confusing weight and mass in the formula",
      "Forgetting vector direction of forces",
      "Not accounting for all forces in the system",
      "Applying the law in non-inertial reference frames"
    ],
    formulas: [
      { 
        id: "f1", 
        name: "Newton's Second Law", 
        latex: "F = m × a", 
        description: "The fundamental equation relating force, mass, and acceleration" 
      },
      { 
        id: "f2", 
        name: "Force in terms of momentum", 
        latex: "F = dp/dt", 
        description: "The rate of change of momentum equals the applied force" 
      },
      { 
        id: "f3", 
        name: "Weight calculation", 
        latex: "W = m × g", 
        description: "Weight is the force due to gravity, where g is gravitational acceleration" 
      }
    ],
    relatedConcepts: [
      { 
        id: "c1", 
        title: "Newton's First Law of Motion", 
        masteryLevel: 85 
      },
      { 
        id: "c2", 
        title: "Newton's Third Law of Motion", 
        masteryLevel: 45 
      },
      { 
        id: "c3", 
        title: "Momentum Conservation", 
        masteryLevel: 30 
      }
    ]
  };

  // Event handlers
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Concept bookmarked",
      description: isBookmarked ? "Removed from your saved items" : "Added to your saved concepts",
    });
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Stop any ongoing reading when changing tabs
    if (isReadingAloud) {
      setIsReadingAloud(false);
      speechSynthesis.cancel();
    }
  };
  
  const handleSecondaryTabChange = (value: string) => {
    setActiveSecondaryTab(value);
  };
  
  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully",
    });
  };
  
  const handleStopReading = () => {
    setIsReadingAloud(false);
  };
  
  const handleOpenFormulaLab = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
  };

  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto">
      {/* Concept Header */}
      <ConceptHeader
        title={conceptData.title}
        subject={conceptData.subject}
        topic={conceptData.topic}
        difficulty={conceptData.difficulty}
        isBookmarked={isBookmarked}
        onBookmarkToggle={handleBookmarkToggle}
      />
      
      {/* Mastery and Recall Tracker Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="text-sm text-muted-foreground mb-1">Mastery Level</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{conceptData.masteryLevel}%</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 mt-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full" 
              style={{ width: `${conceptData.masteryLevel}%` }}
            />
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="text-sm text-muted-foreground mb-1">Recall Strength</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{conceptData.recallStrength}%</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 mt-2 rounded-full overflow-hidden">
            <div 
              className="bg-green-600 h-full rounded-full" 
              style={{ width: `${conceptData.recallStrength}%` }}
            />
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="text-sm text-muted-foreground mb-1">Study Time</div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{conceptData.studyTime}</div>
          <div className="text-xs text-muted-foreground mt-2">Total time spent learning this concept</div>
        </motion.div>
        
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="text-sm text-muted-foreground mb-1">Next Review</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{conceptData.nextReview}</div>
          <div className="text-xs text-muted-foreground mt-2">Optimal time for spaced repetition</div>
        </motion.div>
      </div>
      
      {/* AI Insights */}
      <div className="mt-6">
        <AIInsights conceptName={conceptData.title} />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Primary content column */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* Primary Learning Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-muted grid grid-cols-3 md:grid-cols-6 h-auto p-1">
              <TabsTrigger value="learn" className="py-2">Learn</TabsTrigger>
              <TabsTrigger value="visual" className="py-2">Visual</TabsTrigger>
              <TabsTrigger value="3d" className="py-2">3D Simulation</TabsTrigger>
              <TabsTrigger value="formula" className="py-2">Formula Lab</TabsTrigger>
              <TabsTrigger value="video" className="py-2">Video</TabsTrigger>
              <TabsTrigger value="mistakes" className="py-2">Common Mistakes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="learn" className="mt-4">
              {isReadingAloud && (
                <ReadAloudSection 
                  text={conceptData.content.replace(/<[^>]*>?/gm, '')}
                  isActive={isReadingAloud}
                  onStop={handleStopReading}
                />
              )}
              <ConceptContent content={conceptData.content} />
            </TabsContent>
            
            <TabsContent value="visual" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Visual Representation</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{conceptData.visualContent}</p>
                  <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-80 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-center">Interactive visual representation would render here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="3d" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">3D Simulation</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{conceptData.simulation3D}</p>
                  <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-80 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-center">3D simulation would render here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="formula" className="mt-4">
              <FormulaReference 
                formulas={conceptData.formulas} 
                conceptTitle={conceptData.title}
                handleOpenFormulaLab={handleOpenFormulaLab}
              />
            </TabsContent>
            
            <TabsContent value="video" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Video Tutorial</h3>
                  <div className="aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <iframe
                      src={conceptData.videoURL}
                      className="w-full h-full"
                      title={`Video tutorial for ${conceptData.title}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="mistakes" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Common Mistakes</h3>
                  <ul className="space-y-4">
                    {conceptData.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <h4 className="font-medium text-lg mb-4">Previous Year Questions</h4>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-lg p-4 text-amber-800 dark:text-amber-300">
                      <p className="mb-2 font-medium">Example Question (JEE Advanced 2022):</p>
                      <p>A box of mass 2 kg is placed on a horizontal surface with coefficient of friction 0.2. A force of 5 N is applied horizontally. Calculate the acceleration of the box.</p>
                      <p className="mt-4 text-sm">This question tests your understanding of Newton's Second Law with friction forces.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Secondary Management Tabs */}
          <Tabs value={activeSecondaryTab} onValueChange={handleSecondaryTabChange} className="w-full">
            <TabsList className="bg-muted grid grid-cols-2 md:grid-cols-6 h-auto p-1">
              <TabsTrigger value="notes" className="py-2">Notes</TabsTrigger>
              <TabsTrigger value="recall" className="py-2">Recall</TabsTrigger>
              <TabsTrigger value="analytics" className="py-2">Analytics</TabsTrigger>
              <TabsTrigger value="revision" className="py-2">Revision</TabsTrigger>
              <TabsTrigger value="discuss" className="py-2">Discuss</TabsTrigger>
              <TabsTrigger value="linked" className="py-2">Linked</TabsTrigger>
            </TabsList>
            
            <TabsContent value="notes" className="mt-4">
              <NoteSection 
                userNotes={userNotes}
                setUserNotes={setUserNotes}
                handleSaveNotes={handleSaveNotes}
              />
            </TabsContent>
            
            <TabsContent value="recall" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Recall Tests</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Test your understanding of {conceptData.title} with these quick recall questions.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4">
                      <h4 className="font-medium mb-2">What is the formula for Newton's Second Law?</h4>
                      <div className="mt-4 space-x-2">
                        <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">F = ma</button>
                        <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">F = m/a</button>
                        <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">F = a/m</button>
                        <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">F = m*v</button>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4">
                      <h4 className="font-medium mb-2">What happens to acceleration if the mass increases but the force remains constant?</h4>
                      <div className="mt-4 space-x-2">
                        <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">Acceleration increases</button>
                        <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">Acceleration decreases</button>
                        <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">Acceleration remains the same</button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Performance Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-base font-medium mb-2">Study Time Distribution</h4>
                      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-40 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground text-center">Study time chart would render here</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium mb-2">Quiz Performance</h4>
                      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-40 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground text-center">Quiz performance chart would render here</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium mb-2">Recall Strength Over Time</h4>
                      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-40 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground text-center">Recall strength chart would render here</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium mb-2">Comparisons to Peers</h4>
                      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-40 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground text-center">Peer comparison chart would render here</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="revision" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Revision Schedule</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your personalized revision schedule based on spaced repetition techniques.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-green-100 dark:border-green-900/30 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div>
                        <h4 className="font-medium">First Review</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Completed on May 15, 2023</p>
                      </div>
                      <div className="bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                        Completed
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-green-100 dark:border-green-900/30 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div>
                        <h4 className="font-medium">Second Review</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Completed on May 18, 2023</p>
                      </div>
                      <div className="bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                        Completed
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-amber-100 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <div>
                        <h4 className="font-medium">Third Review</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Due tomorrow</p>
                      </div>
                      <div className="bg-amber-100 dark:bg-amber-800/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded text-xs font-medium">
                        Due Soon
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium">Fourth Review</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Due in 7 days</p>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium">
                        Scheduled
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="discuss" className="mt-4">
              <DiscussSection conceptName={conceptData.title} />
            </TabsContent>
            
            <TabsContent value="linked" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-0">
                    <LinkedConceptsSection 
                      conceptId={conceptData.id} 
                      subject={conceptData.subject}
                      topic={conceptData.topic}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-0">
                    <AskTutorSection 
                      conceptId={conceptData.id}
                      title={conceptData.title}
                      subject={conceptData.subject}
                      topic={conceptData.topic}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <ConceptSidebar 
            masteryLevel={conceptData.masteryLevel}
            relatedConcepts={conceptData.relatedConcepts}
            examReady={conceptData.isExamReady}
          />
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;

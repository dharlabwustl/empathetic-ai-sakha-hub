import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Code, 
  Microscope, 
  Video, 
  AlertTriangle, 
  Brain, 
  BarChart4, 
  RefreshCw, 
  MessageCircle,
  Cube
} from 'lucide-react';
import { ConceptMasterySection } from '@/components/dashboard/student/concepts/ConceptMasterySection';
import ConceptContent from '@/components/dashboard/student/concepts/concept-detail/ConceptContent';
import AIInsightsSection from '@/components/dashboard/student/concepts/AIInsightsSection';
import ConceptAnalyticsSection from '@/components/dashboard/student/concepts/ConceptAnalyticsSection';
import { FormulaTabContent } from '@/components/dashboard/student/concepts/FormulaTabContent';
import { useParams } from 'react-router-dom';

const ConceptDetailPage = () => {
  const { conceptId = '1' } = useParams<{ conceptId: string }>();
  const [activeMainTab, setActiveMainTab] = useState<string>('learn');
  const [activeSubTab, setActiveSubTab] = useState<string>('content');
  
  const [userNotes, setUserNotes] = useState<string>('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  
  // Mock data
  const conceptTitle = "Newton's Laws of Motion";
  const recallAccuracy = 75;
  const quizScore = 82;
  const lastPracticed = new Date().toISOString();
  
  const handleSaveNotes = () => {
    console.log("Saving notes:", userNotes);
    // Save notes logic would go here
  };
  
  const handleOpenFormulaLab = () => {
    console.log("Opening formula lab");
    // Open formula lab logic would go here
  };
  
  // Sample content for the concept
  const conceptContent = `
    <h1>Newton's Laws of Motion</h1>
    <p>Newton's laws of motion are three physical laws that together laid the foundation for classical mechanics. They describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.</p>
    
    <h2 id="first-law">First Law: Law of Inertia</h2>
    <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</p>
    
    <h2 id="second-law">Second Law: F = ma</h2>
    <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
    
    <h3 id="formula">Mathematical Formula</h3>
    <p>F = ma, where F is the net force, m is mass, and a is acceleration.</p>
    
    <h2 id="third-law">Third Law: Action and Reaction</h2>
    <p>For every action, there is an equal and opposite reaction.</p>
    
    <h3 id="examples">Real-world Examples</h3>
    <ul>
      <li>Rocket propulsion</li>
      <li>Walking</li>
      <li>Swimming</li>
    </ul>
  `;

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{conceptTitle}</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Master this fundamental physics concept to understand motion and forces
        </p>
      </div>
      
      {/* Mastery & Recall Tracker Section */}
      <div className="mb-8">
        <ConceptMasterySection 
          conceptId={conceptId}
          recallAccuracy={recallAccuracy}
          quizScore={quizScore}
          lastPracticed={lastPracticed}
        />
      </div>
      
      {/* AI Insights Section */}
      <div className="mb-8">
        <AIInsightsSection 
          conceptId={conceptId}
          conceptTitle={conceptTitle}
        />
      </div>
      
      {/* Main Tabs */}
      <Tabs 
        value={activeMainTab} 
        onValueChange={setActiveMainTab} 
        className="mb-8"
      >
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
          <TabsTrigger value="learn" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Learn</span>
          </TabsTrigger>
          <TabsTrigger value="visual" className="flex items-center gap-2">
            <Microscope className="h-4 w-4" />
            <span>Visual</span>
          </TabsTrigger>
          <TabsTrigger value="simulation" className="flex items-center gap-2">
            <Cube className="h-4 w-4" />
            <span>3D Simulation</span>
          </TabsTrigger>
          <TabsTrigger value="formula" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>Formula Lab</span>
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>Video</span>
          </TabsTrigger>
          <TabsTrigger value="mistakes" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Common Mistakes</span>
          </TabsTrigger>
          <TabsTrigger value="recall" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Recall</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart4 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="revision" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Revision</span>
          </TabsTrigger>
          <TabsTrigger value="discuss" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Discuss</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Learn Content Tab */}
        <TabsContent value="learn" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
            <TabsList className="px-4 pt-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="notes">My Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content">
              <ConceptContent
                content={conceptContent}
                conceptId={conceptId}
                userNotes={userNotes}
                setUserNotes={setUserNotes}
                handleSaveNotes={handleSaveNotes}
                isReadingAloud={isReadingAloud}
                setIsReadingAloud={setIsReadingAloud}
              />
            </TabsContent>
            
            <TabsContent value="notes">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">My Notes</h3>
                <textarea
                  className="w-full h-64 p-4 border rounded-lg"
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Type your notes here..."
                />
                <div className="flex justify-end mt-4">
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    onClick={handleSaveNotes}
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        {/* Visual Content Tab */}
        <TabsContent value="visual" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Microscope className="mr-2 h-6 w-6 text-indigo-600" />
              Visual Learning
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-12 rounded-lg text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Interactive visualizations will appear here to help you understand the concept visually.
              </p>
            </div>
          </div>
        </TabsContent>
        
        {/* 3D Simulation Tab */}
        <TabsContent value="simulation" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Cube className="mr-2 h-6 w-6 text-indigo-600" />
              3D Simulation
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-12 rounded-lg text-center">
              <p className="text-gray-600 dark:text-gray-300">
                3D simulation of Newton's Laws of Motion will appear here.
              </p>
            </div>
          </div>
        </TabsContent>
        
        {/* Formula Lab Tab */}
        <TabsContent value="formula" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <FormulaTabContent 
            conceptId={conceptId}
            conceptTitle={conceptTitle}
            handleOpenFormulaLab={handleOpenFormulaLab}
          />
        </TabsContent>
        
        {/* Video Tab */}
        <TabsContent value="video" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Video className="mr-2 h-6 w-6 text-indigo-600" />
              Video Explanations
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-12 rounded-lg text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Video explanations will appear here.
              </p>
            </div>
          </div>
        </TabsContent>
        
        {/* Common Mistakes Tab */}
        <TabsContent value="mistakes" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6 text-amber-600" />
              Common Mistakes
            </h2>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Avoid these common errors</h3>
              <ul className="list-disc pl-5 space-y-2 text-amber-700 dark:text-amber-300">
                <li>Confusing mass and weight</li>
                <li>Forgetting that Newton's laws apply in inertial reference frames</li>
                <li>Misidentifying action-reaction pairs in the third law</li>
                <li>Assuming friction is always negligible</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        {/* Recall Tab */}
        <TabsContent value="recall" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Brain className="mr-2 h-6 w-6 text-purple-600" />
              Active Recall Practice
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-12 rounded-lg text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Active recall exercises will appear here.
              </p>
            </div>
          </div>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <ConceptAnalyticsSection
            conceptId={conceptId}
            masteryPercent={76}
            recallAccuracy={recallAccuracy}
            quizScore={quizScore}
            practiceAttempts={5}
          />
        </TabsContent>
        
        {/* Revision Tab */}
        <TabsContent value="revision" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <RefreshCw className="mr-2 h-6 w-6 text-green-600" />
              Spaced Revision
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-12 rounded-lg text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Spaced revision schedule and activities will appear here.
              </p>
            </div>
          </div>
        </TabsContent>
        
        {/* Discuss Tab */}
        <TabsContent value="discuss" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <MessageCircle className="mr-2 h-6 w-6 text-blue-600" />
              Discussion Forum
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-12 rounded-lg text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Discussion forum for this concept will appear here.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptDetailPage;


import React, { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, ArrowLeft, Volume2, VolumeX, MessageCircle, 
  Calendar, CheckSquare, Clock, BookMarked, Lightbulb, 
  AlertTriangle, Trophy, CircleCheck, BrainCircuit
} from "lucide-react";
import { motion } from "framer-motion";
import ConceptExplanationContent from '@/components/dashboard/student/concept-cards/ConceptExplanationContent';
import DashboardLayout from "./DashboardLayout";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import RecommendedConcepts from "@/components/dashboard/student/concept-cards/RecommendedConcepts";
import ConceptStudyPlanSection from "@/components/dashboard/student/concept-cards/ConceptStudyPlanSection";

interface ConceptCardDetailPageProps {}

const ConceptCardDetailPage: React.FC<ConceptCardDetailPageProps> = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { userProfile } = useUserProfile(UserRole.Student);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [completedStatus, setCompletedStatus] = useState(false);
  const { toast } = useToast();
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Mock data - in a real app, fetch this from API based on conceptId
  const concept = {
    id: conceptId || "concept-1",
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Laws of Motion",
    difficulty: "Medium",
    examGoal: userProfile?.examPreparation || "JEE",
    importanceLevel: "High",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    completedAt: null,
    description: "Understand Newton's three laws of motion that form the foundation of classical mechanics.",
    prerequisites: ["Basic Kinematics", "Force Concept Introduction"],
    relatedConcepts: [
      { id: "concept-2", title: "Conservation of Momentum", subject: "Physics", difficulty: "Medium" },
      { id: "concept-3", title: "Work and Energy", subject: "Physics", difficulty: "Medium" },
      { id: "concept-4", title: "Circular Motion", subject: "Physics", difficulty: "Hard" }
    ]
  };

  // Handle voice reading
  const handleVoiceReading = (textToRead: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(textToRead);
    
    // Set voice (optional - use a voice with good English pronunciation)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes("Google") || voice.name.includes("English")
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 0.9; // Slightly slower than default
    utterance.pitch = 1;
    
    // Store reference to control playback
    speechSynthesisRef.current = utterance;
    
    // Handle playback end
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Handle mark as complete
  const handleMarkComplete = () => {
    setCompletedStatus(!completedStatus);
    
    toast({
      title: completedStatus ? "Concept marked as incomplete" : "Concept marked as complete!",
      description: completedStatus 
        ? "This concept is back on your study list."
        : "Great job! This concept has been marked as completed.",
      variant: completedStatus ? "default" : "success",
    });

    // In a real app, you would make an API call to update the status in the database
  };

  // Function to read the concept explanation
  const readConceptExplanation = () => {
    const mainText = `${concept.title}. ${concept.description} This concept is part of ${concept.chapter} in ${concept.subject} and is important for ${concept.examGoal} preparation.`;
    handleVoiceReading(mainText);
  };

  return (
    <DashboardLayout
      userProfile={userProfile!}
      hideSidebar={false}
      hideTabsNav={false}
      activeTab="concepts"
      kpis={[]}
      nudges={[]}
      markNudgeAsRead={() => {}}
      showWelcomeTour={false}
      onTabChange={() => navigate('/dashboard/student/concepts')}
      onViewStudyPlan={() => {}}
      onToggleSidebar={() => {}}
      onToggleTabsNav={() => {}}
      onSkipTour={() => {}}
      onCompleteTour={() => {}}
      showStudyPlan={false}
      onCloseStudyPlan={() => {}}
    >
      <div className="space-y-6">
        {/* Header with navigation and actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/dashboard/student/concepts')}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Concepts</span>
            </Button>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-500/20 text-blue-600 border-blue-300/30">
                {concept.subject}
              </Badge>
              <Badge variant="outline" className="bg-purple-500/20 text-purple-600 border-purple-300/30">
                {concept.examGoal}
              </Badge>
              <Badge variant="outline" className={`
                ${concept.difficulty === 'Easy' && 'bg-green-500/20 text-green-600 border-green-300/30'}
                ${concept.difficulty === 'Medium' && 'bg-yellow-500/20 text-yellow-600 border-yellow-300/30'}
                ${concept.difficulty === 'Hard' && 'bg-red-500/20 text-red-600 border-red-300/30'}
              `}>
                {concept.difficulty}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={readConceptExplanation}
              className="flex items-center gap-1"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span>Stop Reading</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span>Read Aloud</span>
                </>
              )}
            </Button>
            
            <Button
              size="sm"
              variant={completedStatus ? "default" : "outline"}
              className={`flex items-center gap-1 ${completedStatus ? 'bg-green-600 hover:bg-green-700' : ''}`}
              onClick={handleMarkComplete}
            >
              <CheckSquare className="h-4 w-4" />
              <span>{completedStatus ? 'Completed' : 'Mark as Complete'}</span>
            </Button>
          </div>
        </div>
        
        {/* Concept card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden border-0 shadow-lg bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white pb-6 relative">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">{concept.title}</CardTitle>
                  <p className="text-blue-100 mt-1">Chapter: {concept.chapter}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end">
                    <Badge variant="outline" className="bg-indigo-500/30 text-white border-indigo-300/30 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {concept.dueDate ? new Date(concept.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No due date'}
                    </Badge>
                    <span className="text-xs text-blue-100 mt-1">
                      <Clock className="h-3 w-3 inline mr-1" />
                      Est. study time: 45 mins
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="mt-3 text-sm text-blue-50">
                {concept.description}
              </p>
            </CardHeader>

            <CardContent className="p-0">
              <Tabs defaultValue="explanation" className="w-full">
                <div className="bg-gradient-to-r from-gray-50 to-slate-100 border-b border-gray-200 px-4 py-3">
                  <TabsList className="grid grid-cols-4 bg-transparent h-auto gap-2">
                    <TabsTrigger 
                      value="explanation" 
                      className="py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-1.5"
                    >
                      <Lightbulb className="h-4 w-4" />
                      <span>Explanation</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="examples" 
                      className="py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-1.5"
                    >
                      <CircleCheck className="h-4 w-4" />
                      <span>Real-world Examples</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="mistakes" 
                      className="py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-1.5"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <span>Common Mistakes</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="exam" 
                      className="py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-1.5"
                    >
                      <Trophy className="h-4 w-4" />
                      <span>Exam Relevance</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-6">
                  <TabsContent value="explanation" className="mt-0">
                    <ConceptExplanationContent conceptTitle={concept.title} handleVoiceReading={handleVoiceReading} />
                  </TabsContent>
                  
                  <TabsContent value="examples" className="mt-0">
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-emerald-100">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-lg text-emerald-800">Real-world Examples of {concept.title}</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-emerald-700"
                            onClick={() => handleVoiceReading("Real-world examples of Newton's Laws of Motion include inertia in vehicle safety, rocket propulsion, and elevator physics.")}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                            <h4 className="font-medium text-emerald-700">Inertia in Vehicle Safety</h4>
                            <p className="mt-1 text-gray-700">When a car suddenly stops, passengers continue to move forward (First Law). This is why seat belts are crucial—they apply the force needed to stop the passenger's forward motion.</p>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                            <h4 className="font-medium text-emerald-700">Rocket Propulsion</h4>
                            <p className="mt-1 text-gray-700">Rockets work based on Newton's Third Law. The engine expels gas at high speed in one direction, creating an equal and opposite force that propels the rocket in the opposite direction.</p>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                            <h4 className="font-medium text-emerald-700">Elevator Physics</h4>
                            <p className="mt-1 text-gray-700">When an elevator accelerates upward, you feel heavier (apparent weight increases). This demonstrates Newton's Second Law as the floor exerts extra force to give you upward acceleration.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="mistakes" className="mt-0">
                    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-lg text-amber-800">Common Mistakes with {concept.title}</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-amber-700"
                            onClick={() => handleVoiceReading("Common mistakes with Newton's Laws include confusing mass and weight, ignoring friction, and misapplying the third law.")}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
                            <h4 className="font-medium text-amber-700">Confusing Mass and Weight</h4>
                            <p className="mt-1 text-gray-700">Students often confuse mass (an object's resistance to acceleration) with weight (the gravitational force on an object). Remember that mass is constant, while weight changes with gravity.</p>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
                            <h4 className="font-medium text-amber-700">Ignoring Friction</h4>
                            <p className="mt-1 text-gray-700">A common mistake is neglecting friction forces in problems. In the real world, friction is almost always present and significantly affects motion.</p>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
                            <h4 className="font-medium text-amber-700">Misapplying the Third Law</h4>
                            <p className="mt-1 text-gray-700">Students often think action-reaction forces act on the same object. Remember that action-reaction forces always act on different objects.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="exam" className="mt-0">
                    <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-lg text-violet-800">Exam Relevance of {concept.title}</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-violet-700"
                            onClick={() => handleVoiceReading("Newton's Laws are highly important in JEE physics, typically worth 10-15% of physics questions in JEE Main and Advanced.")}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-violet-100">
                            <h4 className="font-medium text-violet-700">High Importance in {concept.examGoal}</h4>
                            <p className="mt-1 text-gray-700">Newton's Laws are fundamental concepts in {concept.examGoal} Physics, typically worth 10-15% of physics questions in JEE Main and Advanced.</p>
                            <div className="mt-2 flex items-center gap-1">
                              <Trophy className="h-3 w-3 text-amber-500" />
                              <span className="text-xs font-medium text-amber-600">Consistently appears in {concept.examGoal}</span>
                            </div>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-violet-100">
                            <h4 className="font-medium text-violet-700">Question Types</h4>
                            <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 space-y-1">
                              <li>Numerical problems involving multiple forces</li>
                              <li>Conceptual questions on inertia</li>
                              <li>Application of F=ma in complex scenarios</li>
                              <li>Action-reaction pair identification</li>
                            </ul>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-violet-100 md:col-span-2">
                            <h4 className="font-medium text-violet-700">Related Topics to Study</h4>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline" className="bg-violet-50 text-violet-700">Friction</Badge>
                              <Badge variant="outline" className="bg-violet-50 text-violet-700">Circular Motion</Badge>
                              <Badge variant="outline" className="bg-violet-50 text-violet-700">Work & Energy</Badge>
                              <Badge variant="outline" className="bg-violet-50 text-violet-700">Momentum</Badge>
                              <Badge variant="outline" className="bg-violet-50 text-violet-700">Rotational Dynamics</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Study Plan Progress Section */}
        <ConceptStudyPlanSection conceptTitle={concept.title} />
        
        {/* Recommended Concepts Section */}
        <RecommendedConcepts relatedConcepts={concept.relatedConcepts} />
      </div>
    </DashboardLayout>
  );
};

export default ConceptCardDetailPage;

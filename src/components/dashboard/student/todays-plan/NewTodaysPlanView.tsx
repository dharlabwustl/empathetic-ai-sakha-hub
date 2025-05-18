
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';

interface PlanData {
  date: string;
  weekDay: string;
  weekNumber: number;
  priority: string;
  dailyQuote: string;
  timeAllocation: {
    concepts: number;
    practice: number;
    revision: number;
    break: number;
  };
  conceptCards: Array<{
    id: string;
    title: string;
    description: string;
    completed: boolean;
    estimatedTime: number;
    subject: string;
  }>;
  assignments: Array<{
    id: string;
    title: string;
    description: string;
    completed: boolean;
    estimatedTime: number;
    dueDate: string;
  }>;
  flashcards: Array<{
    id: string;
    title: string;
    count: number;
    completed: boolean;
    estimatedTime: number;
  }>;
}

interface NewTodaysPlanViewProps {
  planData: PlanData;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ planData, onConceptClick, isMobile = false }) => {
  const navigate = useNavigate();
  
  if (!planData) {
    return (
      <div className="text-center py-12">
        <p>No study plan data available</p>
      </div>
    );
  }

  const handleConceptClick = (conceptId: string) => {
    // Navigate to the concept-1 detail page as requested
    navigate(`/dashboard/student/concepts/concept-1`);
  };

  return (
    <Tabs defaultValue="breakdown" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="breakdown">Plan Breakdown</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>
      
      <TabsContent value="breakdown" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Concept Cards */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-violet-600 dark:text-violet-400 text-lg">🧠</span>
                Concept Cards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {planData.conceptCards && planData.conceptCards.length > 0 ? (
                  planData.conceptCards.map((concept) => (
                    <div 
                      key={concept.id} 
                      className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      onClick={() => handleConceptClick(concept.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-base mb-1">{concept.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{concept.description}</p>
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs">
                              {concept.subject}
                            </span>
                            <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                              <Clock className="h-3 w-3" />
                              {concept.estimatedTime} min
                            </span>
                          </div>
                        </div>
                        <div className={`ml-3 ${concept.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-300 dark:text-gray-600'}`}>
                          <CheckCircle className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-6 text-gray-500">No concept cards assigned for today</p>
                )}

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2 w-full flex items-center justify-center text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                  onClick={() => navigate('/dashboard/student/concepts')}
                >
                  View All Concepts <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Side panel with flashcards and assignments */}
          <div className="space-y-4">
            {/* Flashcards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400 text-lg">🔄</span>
                  Flashcards Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {planData.flashcards && planData.flashcards.length > 0 ? (
                    planData.flashcards.map((deck) => (
                      <div 
                        key={deck.id} 
                        className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        onClick={() => navigate(`/dashboard/student/flashcards/${deck.id}`)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-sm mb-1">{deck.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>{deck.count} cards</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {deck.estimatedTime} min
                              </span>
                            </div>
                          </div>
                          <div className={`ml-3 ${deck.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-300 dark:text-gray-600'}`}>
                            <CheckCircle className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4 text-gray-500 text-sm">No flashcards for today</p>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-1 w-full text-green-600 dark:text-green-400 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-900/20"
                    onClick={() => navigate('/dashboard/student/flashcards')}
                  >
                    View All Flashcards <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Assignments */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-amber-600 dark:text-amber-400 text-lg">📝</span>
                  Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {planData.assignments && planData.assignments.length > 0 ? (
                    planData.assignments.map((assignment) => (
                      <div 
                        key={assignment.id} 
                        className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        onClick={() => navigate(`/dashboard/student/assignments/${assignment.id}`)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-sm mb-1">{assignment.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <span className="px-1.5 py-0.5 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full text-xs">
                                Due: {assignment.dueDate}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {assignment.estimatedTime} min
                              </span>
                            </div>
                          </div>
                          <div className={`ml-3 ${assignment.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-300 dark:text-gray-600'}`}>
                            <CheckCircle className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4 text-gray-500 text-sm">No assignments due today</p>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-1 w-full text-amber-600 dark:text-amber-400 hover:text-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                    onClick={() => navigate('/dashboard/student/assignments')}
                  >
                    View All Assignments <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="details">
        {/* Details tab content */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Today's Learning Objectives</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your personalized learning objectives for today focus on mastering key concepts and improving retention through spaced repetition.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-blue-800 dark:text-blue-300">Daily Quote</h4>
                <blockquote className="text-sm italic border-l-4 border-blue-300 dark:border-blue-700 pl-4">
                  "{planData.dailyQuote || "The expert in anything was once a beginner."}"
                </blockquote>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-purple-800 dark:text-purple-300">Priority Focus</h4>
                  <p className="text-sm">{planData.priority || "Concept mastery"}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-green-800 dark:text-green-300">Week Progress</h4>
                  <p className="text-sm">Week {planData.weekNumber} of your study plan</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="schedule">
        {/* Schedule tab content */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Your Study Schedule</h3>
            
            <div className="space-y-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-indigo-800 dark:text-indigo-300">Time Allocation</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Concepts</span>
                    <span className="font-medium">{planData.timeAllocation?.concepts || 60} min</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Practice</span>
                    <span className="font-medium">{planData.timeAllocation?.practice || 45} min</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-violet-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revision</span>
                    <span className="font-medium">{planData.timeAllocation?.revision || 30} min</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Breaks</span>
                    <span className="font-medium">{planData.timeAllocation?.break || 15} min</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600"
                onClick={() => navigate('/dashboard/student/academic')}
              >
                Customize Study Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default NewTodaysPlanView;

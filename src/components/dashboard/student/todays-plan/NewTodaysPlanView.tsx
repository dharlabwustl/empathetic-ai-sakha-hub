
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Brain, FileText, Check, Clock, Calendar } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  progress: number;
  timeEstimate: string;
}

interface FlashcardSet {
  id: string;
  title: string;
  subject: string;
  cardsCount: number;
  progress: number;
  timeEstimate: string;
}

interface PracticeTest {
  id: string;
  title: string;
  subject: string;
  questionsCount: number;
  timeEstimate: string;
}

interface PlanData {
  date: string;
  conceptCards: ConceptCard[];
  flashcardSets: FlashcardSet[];
  practiceTests: PracticeTest[];
  dailyGoals: {
    totalTaskCount: number;
    completedTaskCount: number;
    studyTimeGoal: string;
    studyTimeCompleted: string;
  };
}

interface NewTodaysPlanViewProps {
  planData?: PlanData;
  onConceptClick?: (id: string) => void;
  isMobile?: boolean;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ 
  planData, 
  onConceptClick,
  isMobile = false
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  
  if (!planData) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No study plan available</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          We couldn't find your study plan. Please try again later.
        </p>
      </div>
    );
  }
  
  // Calculate completion percentage for daily goals
  const completionPercentage = planData.dailyGoals
    ? Math.round((planData.dailyGoals.completedTaskCount / planData.dailyGoals.totalTaskCount) * 100)
    : 0;
    
  // Handle viewing a concept
  const handleViewConcept = (id: string) => {
    // Navigate to concept detail page
    navigate(`/dashboard/student/concepts/${id}`);
  };
    
  // Get count for each tab
  const allCount = (planData.conceptCards?.length || 0) + 
                  (planData.flashcardSets?.length || 0) + 
                  (planData.practiceTests?.length || 0);
  const conceptCount = planData.conceptCards?.length || 0;
  const flashcardCount = planData.flashcardSets?.length || 0;
  const testCount = planData.practiceTests?.length || 0;
  
  return (
    <div className="space-y-6">
      {/* Daily goals card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Daily Study Goals
            </div>
            <Badge variant="outline" className="ml-auto">
              {planData.date}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-1 text-primary" />
                  <span>Tasks completed</span>
                </div>
                <span className="font-medium">{planData.dailyGoals?.completedTaskCount} / {planData.dailyGoals?.totalTaskCount}</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-primary" />
                  <span>Study time</span>
                </div>
                <span className="font-medium">{planData.dailyGoals?.studyTimeCompleted} / {planData.dailyGoals?.studyTimeGoal}</span>
              </div>
              <Progress 
                value={parseFloat(planData.dailyGoals?.studyTimeCompleted || "0") / 
                      parseFloat(planData.dailyGoals?.studyTimeGoal || "1") * 100} 
                className="h-2" 
              />
            </div>
          </div>
          
          {/* Donation message */}
          <div className="mt-6 text-sm px-4 py-3 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 rounded-lg">
            <span className="font-medium">Making a difference together:</span> We donate 5% of monthly subscription revenue to fund underprivileged students, providing them free access to our platform.
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs for different content types */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">
                All ({allCount})
              </TabsTrigger>
              <TabsTrigger value="concepts">
                <BookOpen className="h-4 w-4 mr-2 hidden sm:inline-block" /> 
                Concepts ({conceptCount})
              </TabsTrigger>
              <TabsTrigger value="flashcards">
                <Brain className="h-4 w-4 mr-2 hidden sm:inline-block" /> 
                Flashcards ({flashcardCount})
              </TabsTrigger>
              <TabsTrigger value="tests">
                <FileText className="h-4 w-4 mr-2 hidden sm:inline-block" /> 
                Tests ({testCount})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {/* Concepts */}
              {planData.conceptCards && planData.conceptCards.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                    Concept Cards
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {planData.conceptCards.map(concept => (
                      <div 
                        key={concept.id}
                        className="border p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => handleViewConcept(concept.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">{concept.title}</div>
                          <Badge className={
                            concept.difficulty === 'easy'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : concept.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }>
                            {concept.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {concept.description}
                        </p>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{concept.subject}</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {concept.timeEstimate}
                          </span>
                        </div>
                        <Progress value={concept.progress} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Flashcards */}
              {planData.flashcardSets && planData.flashcardSets.length > 0 && (
                <div className="space-y-2 mt-6">
                  <h3 className="text-lg font-medium flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-violet-500" />
                    Flashcards
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {planData.flashcardSets.map(set => (
                      <div 
                        key={set.id}
                        className="border p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <div className="font-medium mb-2">{set.title}</div>
                        <div className="flex justify-between items-center text-sm mb-3">
                          <span>{set.subject}</span>
                          <Badge variant="outline">{set.cardsCount} cards</Badge>
                        </div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{set.progress}% mastered</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {set.timeEstimate}
                          </span>
                        </div>
                        <Progress value={set.progress} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Practice Tests */}
              {planData.practiceTests && planData.practiceTests.length > 0 && (
                <div className="space-y-2 mt-6">
                  <h3 className="text-lg font-medium flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-emerald-500" />
                    Practice Tests
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {planData.practiceTests.map(test => (
                      <div 
                        key={test.id}
                        className="border p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <div className="font-medium mb-2">{test.title}</div>
                        <div className="flex justify-between items-center text-sm mb-3">
                          <span>{test.subject}</span>
                          <Badge variant="outline">{test.questionsCount} questions</Badge>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <Button variant="outline" size="sm" className="w-full mt-2">
                            Start Test
                          </Button>
                          <div className="flex items-center ml-2">
                            <Clock className="h-3 w-3 mr-1" />
                            {test.timeEstimate}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            {/* Concepts tab */}
            <TabsContent value="concepts" className="space-y-4">
              {planData.conceptCards && planData.conceptCards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {planData.conceptCards.map(concept => (
                    <div 
                      key={concept.id}
                      className="border p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleViewConcept(concept.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{concept.title}</div>
                        <Badge className={
                          concept.difficulty === 'easy'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : concept.difficulty === 'medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }>
                          {concept.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {concept.description}
                      </p>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{concept.subject}</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {concept.timeEstimate}
                        </span>
                      </div>
                      <Progress value={concept.progress} className="h-1.5" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No concept cards for today</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    There are no concept cards scheduled in your study plan today.
                  </p>
                </div>
              )}
            </TabsContent>
            
            {/* Flashcards tab */}
            <TabsContent value="flashcards" className="space-y-4">
              {planData.flashcardSets && planData.flashcardSets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {planData.flashcardSets.map(set => (
                    <div 
                      key={set.id}
                      className="border p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="font-medium mb-2">{set.title}</div>
                      <div className="flex justify-between items-center text-sm mb-3">
                        <span>{set.subject}</span>
                        <Badge variant="outline">{set.cardsCount} cards</Badge>
                      </div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{set.progress}% mastered</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {set.timeEstimate}
                        </span>
                      </div>
                      <Progress value={set.progress} className="h-1.5" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Brain className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No flashcards for today</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    There are no flashcards scheduled in your study plan today.
                  </p>
                </div>
              )}
            </TabsContent>
            
            {/* Tests tab */}
            <TabsContent value="tests" className="space-y-4">
              {planData.practiceTests && planData.practiceTests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {planData.practiceTests.map(test => (
                    <div 
                      key={test.id}
                      className="border p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="font-medium mb-2">{test.title}</div>
                      <div className="flex justify-between items-center text-sm mb-3">
                        <span>{test.subject}</span>
                        <Badge variant="outline">{test.questionsCount} questions</Badge>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          Start Test
                        </Button>
                        <div className="flex items-center ml-2">
                          <Clock className="h-3 w-3 mr-1" />
                          {test.timeEstimate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No practice tests for today</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    There are no practice tests scheduled in your study plan today.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTodaysPlanView;

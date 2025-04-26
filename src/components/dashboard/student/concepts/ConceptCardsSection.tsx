
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Check, Clock, Star, Flag, Brain, BarChart } from "lucide-react";
import { SharedPageLayout } from '../SharedPageLayout';

// For demonstration purposes - in a real app, fetch this data from API
const conceptCards = [
  {
    id: "c1",
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Mechanics",
    status: "in-progress",
    difficulty: "medium",
    timeEstimate: 20,
    mastery: 65,
    priority: 1,
    cardCount: 15,
    isRecommended: true
  },
  {
    id: "c2",
    title: "Chemical Bonding",
    subject: "Chemistry",
    chapter: "Chemical Bonds",
    status: "not-started",
    difficulty: "hard",
    timeEstimate: 30,
    mastery: 0,
    priority: 2,
    cardCount: 22,
    isRecommended: false
  },
  {
    id: "c3",
    title: "Quadratic Equations",
    subject: "Mathematics",
    chapter: "Algebra",
    status: "completed",
    difficulty: "medium",
    timeEstimate: 25,
    mastery: 90,
    priority: 0,
    cardCount: 18,
    isRecommended: true
  },
  {
    id: "c4",
    title: "Cell Structure and Function",
    subject: "Biology",
    chapter: "Cell Biology",
    status: "in-progress",
    difficulty: "medium",
    timeEstimate: 25,
    mastery: 45,
    priority: 2,
    cardCount: 20,
    isRecommended: false
  },
  {
    id: "c5",
    title: "Acid-Base Reactions",
    subject: "Chemistry",
    chapter: "Equilibrium",
    status: "not-started",
    difficulty: "hard",
    timeEstimate: 35,
    mastery: 0,
    priority: 3,
    cardCount: 25,
    isRecommended: false
  },
  {
    id: "c6",
    title: "Derivatives and Integration",
    subject: "Mathematics",
    chapter: "Calculus",
    status: "completed",
    difficulty: "hard",
    timeEstimate: 40,
    mastery: 85,
    priority: 0,
    cardCount: 30,
    isRecommended: true
  }
];

// Filter concepts by time period
const filterConceptsByTimePeriod = (period: string) => {
  switch (period) {
    case "today":
      return conceptCards.filter(card => card.priority <= 2);
    case "week":
      return conceptCards.filter(card => card.priority <= 3);
    case "month":
      return conceptCards;
    default:
      return conceptCards;
  }
};

// Get status badge color and text
const getStatusInfo = (status: string) => {
  switch (status) {
    case "completed":
      return { color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: Check, text: "Completed" };
    case "in-progress":
      return { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Clock, text: "In Progress" };
    case "not-started":
      return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: BookOpen, text: "Not Started" };
    default:
      return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: BookOpen, text: "Unknown" };
  }
};

// Get difficulty badge color and text
const getDifficultyInfo = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return { color: "bg-green-100 text-green-800 border-green-200", text: "Easy" };
    case "medium":
      return { color: "bg-yellow-100 text-yellow-800 border-yellow-200", text: "Medium" };
    case "hard":
      return { color: "bg-red-100 text-red-800 border-red-200", text: "Hard" };
    default:
      return { color: "bg-gray-100 text-gray-800 border-gray-200", text: "Unknown" };
  }
};

interface ConceptCardProps {
  concept: typeof conceptCards[0];
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept }) => {
  const statusInfo = getStatusInfo(concept.status);
  const difficultyInfo = getDifficultyInfo(concept.difficulty);
  const StatusIcon = statusInfo.icon;

  return (
    <Card className="h-full flex flex-col transform hover:scale-[1.01] transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{concept.title}</CardTitle>
          {concept.isRecommended && (
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
              <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
              Recommended
            </Badge>
          )}
        </div>
        <CardDescription className="flex flex-wrap gap-2 mt-1">
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            {concept.subject}
          </Badge>
          <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
            {concept.chapter}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className={statusInfo.color}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusInfo.text}
          </Badge>
          <Badge variant="outline" className={difficultyInfo.color}>
            {difficultyInfo.text}
          </Badge>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Mastery</span>
            <span>{concept.mastery}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                concept.mastery >= 80 
                  ? "bg-emerald-500" 
                  : concept.mastery >= 40 
                    ? "bg-yellow-500" 
                    : "bg-red-500"
              }`} 
              style={{ width: `${concept.mastery}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{concept.timeEstimate} min</span>
          <span className="mx-2">•</span>
          <BookOpen className="h-4 w-4" />
          <span>{concept.cardCount} cards</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
          {concept.status === "completed" 
            ? "Review Again" 
            : concept.status === "in-progress" 
              ? "Continue Learning" 
              : "Start Learning"
          }
        </Button>
      </CardFooter>
    </Card>
  );
};

const ConceptCardsSection = () => {
  const [timePeriod, setTimePeriod] = useState("today");
  const filteredConcepts = filterConceptsByTimePeriod(timePeriod);
  
  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master key concepts through interactive cards"
    >
      <Tabs defaultValue="today" value={timePeriod} onValueChange={setTimePeriod} className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="today" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              Today
            </TabsTrigger>
            <TabsTrigger value="week" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              This Week
            </TabsTrigger>
            <TabsTrigger value="month" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              This Month
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Prioritize</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </Button>
          </div>
        </div>
        
        <TabsContent value="today" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConcepts.map(concept => (
              <ConceptCard key={concept.id} concept={concept} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="week" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConcepts.map(concept => (
              <ConceptCard key={concept.id} concept={concept} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="month" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConcepts.map(concept => (
              <ConceptCard key={concept.id} concept={concept} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default ConceptCardsSection;


import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import MicroConcept from "@/components/dashboard/student/MicroConcept";

interface MicroConceptType {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: number;
  content: string;
  resourceType: "Video" | "Text" | "PDF";
  resourceUrl: string;
}

export const MicroConceptView = () => {
  // Example micro concepts data
  const microConcepts: MicroConceptType[] = [
    {
      id: "mc-1",
      title: "Kinetic Energy and Conservation",
      subject: "Physics",
      chapter: "Energy and Work",
      difficulty: "Medium",
      estimatedTime: 20,
      content: "Kinetic energy is the energy possessed by an object due to its motion. The formula for kinetic energy is KE = ½mv², where m is mass and v is velocity. The principle of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another.",
      resourceType: "Video",
      resourceUrl: "#"
    },
    {
      id: "mc-2",
      title: "Chemical Equilibrium Constants",
      subject: "Chemistry",
      chapter: "Chemical Equilibrium",
      difficulty: "Hard",
      estimatedTime: 25,
      content: "Chemical equilibrium is the state where the forward and reverse reactions occur at equal rates, resulting in constant concentrations of reactants and products. The equilibrium constant Kₑ describes the relationship between concentrations of reactants and products at equilibrium. For a reaction aA + bB ⇌ cC + dD, Kₑ = [C]ᶜ[D]ᵈ/[A]ᵃ[B]ᵇ.",
      resourceType: "Text",
      resourceUrl: "#"
    },
    {
      id: "mc-3",
      title: "Limits and Continuity",
      subject: "Mathematics",
      chapter: "Calculus",
      difficulty: "Medium",
      estimatedTime: 30,
      content: "A limit describes the behavior of a function as the input approaches a particular value. A function f is continuous at a point a if lim(x→a) f(x) = f(a). This means the function value equals the limit at that point, with no holes, jumps, or asymptotes.",
      resourceType: "PDF",
      resourceUrl: "#"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-bold gradient-text">Micro Concept Cards</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {microConcepts.map(concept => (
          <MicroConcept 
            key={concept.id}
            id={concept.id}
            title={concept.title}
            subject={concept.subject}
            chapter={concept.chapter}
            difficulty={concept.difficulty}
            estimatedTime={concept.estimatedTime}
            content={concept.content}
            resourceType={concept.resourceType}
            resourceUrl={concept.resourceUrl}
            onComplete={(id) => console.log("Completed:", id)}
            onNeedHelp={(id) => console.log("Needs help with:", id)}
          />
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-violet-50 to-sky-50 dark:from-violet-900/20 dark:to-sky-900/20 p-4 rounded-lg border border-violet-100 dark:border-violet-800/30">
        <div className="flex items-start">
          <div className="p-2 bg-violet-100 dark:bg-violet-800/40 rounded-lg mr-4">
            <Lightbulb className="text-violet-600 dark:text-violet-400" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-violet-800 dark:text-violet-300">Learning Pathway</h3>
            <p className="text-sm text-violet-700/80 dark:text-violet-300/80">
              Master these concepts in order to build a strong foundation for Advanced Calculus topics coming up next week.
            </p>
            <Button variant="link" className="p-0 h-auto text-violet-600 dark:text-violet-400 mt-1">
              View full learning path
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FlashcardsView = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-bold gradient-text">Flashcards & Revision</h2>
        <Button variant="outline" size="sm">Create New</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="relative overflow-hidden card-hover">
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">Physics</Badge>
          </div>
          <CardContent className="pt-6 pb-4">
            <div className="h-32 flex items-center justify-center">
              <h3 className="text-xl font-medium text-center">What is kinetic energy?</h3>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-between">
            <Button variant="ghost" size="sm">See Answer</Button>
            <div className="text-xs text-gray-500">Last reviewed: 2 days ago</div>
          </CardFooter>
        </Card>
        
        <Card className="relative overflow-hidden card-hover">
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">Chemistry</Badge>
          </div>
          <CardContent className="pt-6 pb-4">
            <div className="h-32 flex items-center justify-center">
              <h3 className="text-xl font-medium text-center">Define chemical equilibrium</h3>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-between">
            <Button variant="ghost" size="sm">See Answer</Button>
            <div className="text-xs text-gray-500">Last reviewed: Yesterday</div>
          </CardFooter>
        </Card>
        
        <Card className="relative overflow-hidden card-hover">
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">Mathematics</Badge>
          </div>
          <CardContent className="pt-6 pb-4">
            <div className="h-32 flex items-center justify-center">
              <h3 className="text-xl font-medium text-center">When is a function continuous?</h3>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-between">
            <Button variant="ghost" size="sm">See Answer</Button>
            <div className="text-xs text-gray-500">New card</div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="flex justify-center">
        <Button variant="outline">View All Flashcards</Button>
      </div>
    </div>
  );
};

export const PracticeExamsView = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-bold gradient-text">Practice Tests</h2>
        <Button variant="outline" size="sm">All Tests</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="card-hover">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Physics</Badge>
              <Badge variant="outline">25 questions</Badge>
            </div>
            <CardTitle>Mechanics & Energy Mock Test</CardTitle>
            <CardDescription>Based on your recent micro concepts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <div>Estimated time: 45 mins</div>
              <div>Difficulty: Medium</div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
            <Button className="w-full">Start Test</Button>
          </CardFooter>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Mathematics</Badge>
              <Badge variant="outline">20 questions</Badge>
            </div>
            <CardTitle>Calculus Fundamentals</CardTitle>
            <CardDescription>Cover limits, continuity and derivatives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <div>Estimated time: 40 mins</div>
              <div>Difficulty: Hard</div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
            <Button className="w-full">Start Test</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

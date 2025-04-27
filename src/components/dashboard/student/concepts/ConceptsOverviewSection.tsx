import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, BookOpen, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SharedPageLayout } from '../SharedPageLayout';

const ConceptsOverviewSection = () => {
  // Mock concept cards data
  const conceptCards = [
    {
      id: "c1",
      title: "Newton's Laws of Motion",
      subject: "Physics",
      difficulty: "Medium",
      progress: 80,
      tags: ["mechanics", "forces", "motion"]
    },
    {
      id: "c2",
      title: "Chemical Bonding",
      subject: "Chemistry",
      difficulty: "Hard",
      progress: 60,
      tags: ["ionic", "covalent", "metallic"]
    },
    {
      id: "c3",
      title: "Integration Techniques",
      subject: "Mathematics",
      difficulty: "Hard",
      progress: 40,
      tags: ["calculus", "integration", "formulas"]
    }
  ];

  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master key concepts through interactive learning"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <Button variant="outline">
            <BookOpen className="mr-2 h-4 w-4" />
            View All
          </Button>
          <Button variant="outline">
            <Activity className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </div>
        
        <Button>
          <Brain className="mr-2 h-4 w-4" />
          Create Concept
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Concepts</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          <TabsTrigger value="maths">Mathematics</TabsTrigger>
          <TabsTrigger value="biology">Biology</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conceptCards.map(card => (
            <Card key={card.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    {card.subject}
                  </span>
                  <span className="text-sm font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                    {card.difficulty}
                  </span>
                </div>
                <CardTitle className="text-lg mt-2">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-3">
                  {card.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-blue-600 rounded-full" 
                    style={{ width: `${card.progress}%` }}
                  ></div>
                </div>
                <p className="text-right text-xs mt-1 text-muted-foreground">{card.progress}% mastered</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Study Now</Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        {/* Other tabs content */}
        <TabsContent value="physics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {conceptCards.filter(card => card.subject === "Physics").map(card => (
              // Same card component as above
              <Card key={card.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {card.subject}
                    </span>
                    <span className="text-sm font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                      {card.difficulty}
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-2">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {card.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${card.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-xs mt-1 text-muted-foreground">{card.progress}% mastered</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Study Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Similar structure for other subject tabs */}
        <TabsContent value="chemistry">
          {/* Chemistry concepts would go here */}
          <p className="text-center py-8 text-muted-foreground">Chemistry concepts will appear here.</p>
        </TabsContent>
        
        <TabsContent value="maths">
          {/* Math concepts would go here */}
          <p className="text-center py-8 text-muted-foreground">Mathematics concepts will appear here.</p>
        </TabsContent>
        
        <TabsContent value="biology">
          {/* Biology concepts would go here */}
          <p className="text-center py-8 text-muted-foreground">Biology concepts will appear here.</p>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default ConceptsOverviewSection;

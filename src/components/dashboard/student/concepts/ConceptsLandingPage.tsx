
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/ui/back-button";
import { EnhancedTooltip } from "@/components/ui/enhanced-tooltip";

const ConceptsLandingPage = () => {
  // This would normally come from an API/database
  const conceptCategories = [
    { id: '1', title: 'Physics', count: 42, color: 'bg-blue-100 dark:bg-blue-900/30', icon: '⚛️' },
    { id: '2', title: 'Chemistry', count: 38, color: 'bg-green-100 dark:bg-green-900/30', icon: '🧪' },
    { id: '3', title: 'Biology', count: 45, color: 'bg-red-100 dark:bg-red-900/30', icon: '🧬' },
    { id: '4', title: 'Mathematics', count: 50, color: 'bg-yellow-100 dark:bg-yellow-900/30', icon: '🔢' },
  ];

  const featuredConcepts = [
    { id: '101', title: 'Photosynthesis', subject: 'Biology', difficulty: 'Medium' },
    { id: '102', title: 'Newton\'s Laws of Motion', subject: 'Physics', difficulty: 'Hard' },
    { id: '103', title: 'Periodic Table', subject: 'Chemistry', difficulty: 'Easy' },
    { id: '104', title: 'Quadratic Equations', subject: 'Mathematics', difficulty: 'Medium' },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Back button */}
      <BackButton to="/dashboard/student" label="Back to Dashboard" />
      
      <h1 className="text-3xl font-bold">Concept Cards</h1>
      <p className="text-muted-foreground">Explore and master key concepts across all subjects</p>
      
      {/* Search bar */}
      <div className="relative">
        <EnhancedTooltip content="Search for specific concepts by keywords">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search concepts..."
              className="pl-10 pr-4 w-full md:max-w-md"
            />
          </div>
        </EnhancedTooltip>
      </div>
      
      {/* Subject Categories */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Browse by Subject</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {conceptCategories.map((category) => (
            <EnhancedTooltip 
              key={category.id} 
              content={`Explore ${category.count} concepts in ${category.title}`}
            >
              <Card className={`${category.color} hover:shadow-md transition-shadow cursor-pointer`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p>{category.count} concepts</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="text-xs" asChild>
                    <Link to={`/dashboard/student/concepts/landing?subject=${category.title}`}>
                      View All <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </EnhancedTooltip>
          ))}
        </div>
      </div>
      
      {/* Featured Concepts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Featured Concepts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {featuredConcepts.map((concept) => (
            <EnhancedTooltip
              key={concept.id}
              content={`Learn about ${concept.title} - ${concept.difficulty} difficulty`}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{concept.title}</CardTitle>
                  <CardDescription>{concept.subject}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {concept.difficulty} difficulty
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/dashboard/student/concepts/card/${concept.id}`}>
                      View Concept
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </EnhancedTooltip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConceptsLandingPage;

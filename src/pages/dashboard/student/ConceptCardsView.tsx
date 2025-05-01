
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

// Mock concept categories
const conceptCategories = [
  { title: "Physics", count: 24, progress: 65, color: "blue" },
  { title: "Chemistry", count: 18, progress: 42, color: "green" },
  { title: "Mathematics", count: 32, progress: 78, color: "purple" }
];

// Mock recommended concepts
const recommendedConcepts = [
  { id: "1", title: "Newton's Laws of Motion", subject: "Physics", progress: 45 },
  { id: "2", title: "Organic Chemistry Reactions", subject: "Chemistry", progress: 20 },
  { id: "3", title: "Integration Techniques", subject: "Mathematics", progress: 88 }
];

const ConceptCardsView = () => {
  return (
    <SharedPageLayout 
      title="Concept Cards" 
      subtitle="Master key concepts through interactive learning"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-8">
        {/* Search bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
            placeholder="Search for concepts..."
          />
        </div>
        
        {/* Concept Categories */}
        <div>
          <div className="flex items-center mb-4 gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Concept Categories</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {conceptCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                    <Badge variant="outline">{category.count} cards</Badge>
                  </div>
                  
                  <Progress 
                    value={category.progress} 
                    className={`h-2 mb-2 ${
                      category.color === "blue" ? "bg-blue-100" : 
                      category.color === "green" ? "bg-green-100" : "bg-purple-100"
                    }`}
                  />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{category.progress}% mastered</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/dashboard/student/concepts/${category.title.toLowerCase()}`} className="flex items-center">
                        View <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Recommended Concepts */}
        <div>
          <div className="flex items-center mb-4 gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Recommended for You</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedConcepts.map((concept) => (
              <Card key={concept.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <Badge className="mb-2" variant="outline">{concept.subject}</Badge>
                  <h3 className="font-semibold mb-2">{concept.title}</h3>
                  
                  <Progress value={concept.progress} className="h-2 mb-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{concept.progress}% mastered</span>
                    <Button variant="default" size="sm" asChild>
                      <Link to={`/dashboard/student/concepts/card/${concept.id}`}>
                        Study Now
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardsView;

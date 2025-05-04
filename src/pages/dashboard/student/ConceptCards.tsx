
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Filter, Search, BookOpen, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ConceptCards: React.FC = () => {
  const subjects = [
    { name: 'Physics', color: 'bg-blue-500', count: 42 },
    { name: 'Chemistry', color: 'bg-green-500', count: 36 },
    { name: 'Biology', color: 'bg-purple-500', count: 58 },
    { name: 'Mathematics', color: 'bg-amber-500', count: 45 }
  ];

  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master key concepts through interactive flashcards"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
      backButtonLabel="Back to Dashboard"
      actions={
        <TooltipProvider>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter concept cards by subject or difficulty</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Card
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new concept card</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      }
    >
      {/* Search bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search concept cards..." className="pl-10" />
      </div>
      
      {/* Subject categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {subjects.map(subject => (
          <Card key={subject.name} className="hover:shadow-md transition-shadow">
            <CardHeader className={`${subject.color} text-white p-4 rounded-t-lg`}>
              <CardTitle className="text-lg">{subject.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-2xl font-bold">{subject.count}</p>
              <p className="text-muted-foreground text-sm">concept cards</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="ghost" className="w-full justify-between">
                <span>View Cards</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Recent and recommended cards */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Recent Concept Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs ${i === 1 ? 'bg-blue-100 text-blue-800' : i === 2 ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                    {i === 1 ? 'Physics' : i === 2 ? 'Chemistry' : 'Biology'}
                  </span>
                  <span className="text-xs text-muted-foreground">Last studied: 2d ago</span>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">{
                  i === 1 ? "Newton's Laws of Motion" : 
                  i === 2 ? "Periodic Table Elements" : 
                  "Cell Structure and Function"
                }</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{
                  i === 1 ? "Understanding the three fundamental laws that form the foundation of classical mechanics." : 
                  i === 2 ? "Learn the patterns and properties of elements in the periodic table." : 
                  "Exploring the structure, components and functions of cellular organelles."
                }</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Study Card
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCards;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, LucideIcon, Search, Star, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import AllConceptCards from './AllConceptCards';

interface ConceptCategoryProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

const ConceptCategory: React.FC<ConceptCategoryProps> = ({
  title,
  description,
  icon: Icon,
  color,
  onClick
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className={cn("p-2 rounded-full", color)}>
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0">
        <Button variant="ghost" className="w-full justify-start">Explore</Button>
      </CardFooter>
    </Card>
  );
};

const ConceptsLandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate('/dashboard/student');
  };

  const goToAllConcepts = () => {
    navigate('/dashboard/student/concepts/all');
  };

  const goToBookmarkedConcepts = () => {
    navigate('/dashboard/student/concepts/bookmarked');
  };

  const goToRecentConcepts = () => {
    navigate('/dashboard/student/concepts/recent');
  };

  const goToRecommendedConcepts = () => {
    navigate('/dashboard/student/concepts/recommended');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mb-2 flex gap-2 items-center hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={goBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Return to the dashboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <h1 className="text-3xl font-bold">Concept Cards</h1>
          <p className="text-muted-foreground">
            Browse and learn from our collection of concept cards.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search Concepts
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ConceptCategory
          title="All Concepts"
          description="Browse the complete collection of concept cards"
          icon={BookOpen}
          color="bg-blue-100 text-blue-700"
          onClick={goToAllConcepts}
        />
        <ConceptCategory
          title="Bookmarked"
          description="Access your saved concept cards for quick review"
          icon={Star}
          color="bg-yellow-100 text-yellow-700"
          onClick={goToBookmarkedConcepts}
        />
        <ConceptCategory
          title="Recent"
          description="Continue where you left off with recently viewed cards"
          icon={Timer}
          color="bg-purple-100 text-purple-700"
          onClick={goToRecentConcepts}
        />
        <ConceptCategory
          title="Recommended"
          description="Concept cards suggested based on your study plan"
          icon={BookOpen}
          color="bg-green-100 text-green-700"
          onClick={goToRecommendedConcepts}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Concept Cards</CardTitle>
          <CardDescription>Popular concept cards based on your exam goals</CardDescription>
        </CardHeader>
        <CardContent>
          <AllConceptCards limit={5} />
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={goToAllConcepts}>
            View All Concept Cards
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConceptsLandingPage;

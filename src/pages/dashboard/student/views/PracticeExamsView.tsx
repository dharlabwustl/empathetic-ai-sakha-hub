
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Filter,
  Search,
  Sigma,
  Atom,
  Pill,
  MoveHorizontal,
  Layers,
  Sparkles
} from "lucide-react";

export const PracticeExamsView = () => {
  return (
    <Card className="border border-gray-100 dark:border-gray-700 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-emerald-500" />
            <CardTitle className="text-lg">Practice Tests</CardTitle>
          </div>
          <Badge variant="secondary" className="gap-1 items-center bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 dark:from-emerald-900/40 dark:to-teal-900/40 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 mr-1" /> AI-Generated
          </Badge>
        </div>
        <CardDescription>
          Test your knowledge with personalized exams based on your study plan
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">Ready for a challenge?</h3>
            <p className="text-sm text-muted-foreground">
              Practice tests are generated based on your recent study topics
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1.5" /> 
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-1.5" /> 
              Search
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Sigma className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-medium">Math: Calculus Fundamentals</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    30 questions • 45 minutes • Covers limits, derivatives, and integrals
                  </p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                Start Test
              </Button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-violet-100 dark:bg-violet-900/30">
                  <Atom className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h4 className="font-medium">Physics: Electromagnetics</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    25 questions • 40 minutes • Covers electric fields, magnetic fields, and induction
                  </p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
                Start Test
              </Button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <Pill className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-medium">Chemistry: Organic Reactions</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    35 questions • 50 minutes • Covers reaction mechanisms and functional groups
                  </p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                Start Test
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center px-6 py-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MoveHorizontal className="h-4 w-4" />
          <span>Adjust difficulty based on your performance</span>
        </div>
        <Button variant="outline" size="sm" className="flex gap-1 items-center">
          <Layers className="h-4 w-4" /> 
          All Tests
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PracticeExamsView;


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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Book,
  Monitor,
  ArrowRight,
  CheckCircle,
  Clock,
  FileText
} from "lucide-react";

export const MicroConceptView = () => {
  return (
    <Card className="border border-gray-100 dark:border-gray-700 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-sky-500" />
            <CardTitle className="text-lg">Micro Concepts</CardTitle>
          </div>
          <Badge variant="outline" className="bg-white dark:bg-gray-800">Today's Focus</Badge>
        </div>
        <CardDescription>
          Break down complex topics into easily digestible micro-concepts
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Physics: Electric Fields</h3>
          <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:hover:bg-sky-900/50">
            In Progress
          </Badge>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Coulomb's Law</h4>
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              The mathematical formula and principles governing electric force between charges
            </p>
            <div className="mt-2">
              <Progress value={100} className="h-1.5" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Electric Field Intensity</h4>
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Understanding electric field strength and its vector nature
            </p>
            <div className="mt-2">
              <Progress value={65} className="h-1.5" />
            </div>
            <Button 
              variant="link" 
              size="sm" 
              className="mt-2 p-0 h-auto text-sky-600 dark:text-sky-400 flex items-center"
            >
              Continue Learning <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Electric Field Lines</h4>
              <FileText className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Visualizing electric fields through field lines and their properties
            </p>
            <div className="mt-2">
              <Progress value={0} className="h-1.5" />
            </div>
            <Button 
              variant="link" 
              size="sm" 
              className="mt-2 p-0 h-auto text-sky-600 dark:text-sky-400 flex items-center"
            >
              Start Learning <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center px-6 py-3 border-t border-gray-100 dark:border-gray-800">
        <div className="text-sm text-muted-foreground">
          3 of 8 micro-concepts completed
        </div>
        <Button variant="outline" size="sm">
          View All Micro Concepts
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MicroConceptView;

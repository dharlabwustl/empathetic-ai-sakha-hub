
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Target, TrendingUp, Users, BookOpen, ArrowRight } from "lucide-react";

interface RelatedConcept {
  id: string;
  title: string;
  masteryLevel: number;
}

interface ConceptSidebarProps {
  masteryLevel: number;
  relatedConcepts: RelatedConcept[];
  examReady: boolean;
  onRelatedConceptClick?: (conceptId: string) => void;
}

const ConceptSidebar: React.FC<ConceptSidebarProps> = ({ 
  masteryLevel, 
  relatedConcepts, 
  examReady,
  onRelatedConceptClick 
}) => {
  const handleRelatedConceptClick = (conceptId: string) => {
    if (onRelatedConceptClick) {
      onRelatedConceptClick(conceptId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mastery Progress */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Mastery Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {masteryLevel}%
            </div>
            <Progress value={masteryLevel} className="h-3 mb-3" />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {examReady ? "Exam Ready!" : `${100 - masteryLevel}% to go`}
            </div>
          </div>
          
          {examReady && (
            <div className="flex items-center justify-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Ready for exam questions!
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Related Concepts */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
            Related Concepts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {relatedConcepts.map((concept) => (
            <div
              key={concept.id}
              className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors"
              onClick={() => handleRelatedConceptClick(concept.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{concept.title}</h4>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Mastery</span>
                <span className="font-medium">{concept.masteryLevel}%</span>
              </div>
              <Progress value={concept.masteryLevel} className="h-1.5 mt-1" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Study Stats */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Target className="h-5 w-5 mr-2 text-purple-600" />
            Study Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Time Spent</span>
            </div>
            <span className="font-medium">4.5 hrs</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Problems Solved</span>
            </div>
            <span className="font-medium">23</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Accuracy Rate</span>
            </div>
            <span className="font-medium">78%</span>
          </div>
        </CardContent>
      </Card>

      {/* Study Groups */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Users className="h-5 w-5 mr-2 text-orange-600" />
            Study Groups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Join a study group to learn with peers
            </p>
            <Button variant="outline" className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Find Study Groups
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptSidebar;

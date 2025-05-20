
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FlaskConical, Lightbulb, Target, ArrowRight, BookOpen } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface FormulaTabContentProps {
  conceptId: string;
  conceptTitle: string;
  handleOpenFormulaLab: () => void;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({
  conceptId,
  conceptTitle,
  handleOpenFormulaLab
}) => {
  // Sample formulas for this concept - in a real app, these would come from an API
  const formulas = [
    {
      id: "f1",
      formula: "F = ma",
      description: "The net force equals mass times acceleration",
      application: "Used to calculate the acceleration of an object when forces are applied"
    },
    {
      id: "f2",
      formula: "W = F · d",
      description: "Work equals force times displacement",
      application: "Calculates work done when a force moves an object"
    },
    {
      id: "f3",
      formula: "p = mv",
      description: "Momentum equals mass times velocity",
      application: "Used in analyzing collisions and conservation of momentum"
    }
  ];

  // Interactive formula lab features
  const labFeatures = [
    "Interactive formula visualization",
    "Step-by-step problem solving",
    "Variable manipulation practice",
    "Real-world application examples"
  ];
  
  // Auto-rotate carousel
  const [api, setApi] = useState<any>();
  
  useEffect(() => {
    if (!api) return;
    
    // Set up auto-rotation
    const autoRotateInterval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    
    return () => clearInterval(autoRotateInterval);
  }, [api]);

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center">
          <FlaskConical className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          Key Formulas for {conceptTitle}
        </h2>
        <Button 
          onClick={handleOpenFormulaLab}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Open Formula Lab <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Switched to carousel for auto-rotation */}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {formulas.map((formula) => (
            <CarouselItem key={formula.id} className="md:basis-1/2">
              <Card 
                className="overflow-hidden border border-indigo-100 dark:border-indigo-900/50 bg-gradient-to-br from-white to-indigo-50/30 dark:from-gray-800 dark:to-indigo-950/30"
              >
                <CardContent className="p-6">
                  <div className="text-xl font-mono text-center py-3 my-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                    {formula.formula}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
                    {formula.description}
                  </p>
                  <div className="mt-4 flex items-start gap-2">
                    <Target className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Application:</span> {formula.application}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:flex">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>

      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800/30">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-100 dark:bg-indigo-800/50 rounded-full p-3">
            <Lightbulb className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Formula Lab</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Practice applying these formulas in our interactive Formula Lab. Gain deeper understanding through visualization and problem-solving.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {labFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                  {feature}
                </div>
              ))}
            </div>
            <Button onClick={handleOpenFormulaLab} className="w-full mt-2">
              Launch Formula Lab
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaTabContent;

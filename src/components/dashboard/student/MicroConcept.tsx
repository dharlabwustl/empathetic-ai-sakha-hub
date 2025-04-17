
import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, AlertTriangle, Award, Lightbulb, BrainCog } from "lucide-react";
import { motion } from "framer-motion";
import { ExplanationTab } from "./micro-concept/ExplanationTab";
import { ExampleTab } from "./micro-concept/ExampleTab";
import { MistakesTab } from "./micro-concept/MistakesTab";
import { RelevanceTab } from "./micro-concept/RelevanceTab";
import { MicroConceptProps } from "./micro-concept/types";

export default function MicroConcept({
  title = "Newton's Third Law of Motion",
  subject = "Physics",
  explanation = [
    {
      title: "Simple Explanation",
      content: "For every action, there is an equal and opposite reaction. When you push against a wall, the wall pushes back against you with the same force."
    },
    {
      title: "Detailed Explanation",
      content: "Newton's Third Law states that for every action force, there is an equal and opposite reaction force. These forces always occur in pairs and act on different objects. The mathematical form is F₁₂ = -F₂₁, where F₁₂ is the force exerted by object 1 on object 2, and F₂₁ is the force exerted by object 2 on object 1."
    },
    {
      title: "Visual Explanation",
      content: "Imagine a rocket: the rocket expels gas downward (action force), and the gas exerts an equal force upward on the rocket (reaction force). This propels the rocket upward. Similarly, when you swim, you push water backward, and the water pushes you forward."
    },
    {
      title: "Mathematical Explanation",
      content: "The mathematical expression is F₁₂ = -F₂₁, where:\n- F₁₂ is the force exerted by object 1 on object 2\n- F₂₁ is the force exerted by object 2 on object 1\n- The negative sign indicates that the forces are in opposite directions\n\nThis law applies to all forces and is fundamental to understanding momentum conservation."
    }
  ],
  example = "When a book rests on a table, the book exerts a downward force on the table due to gravity, and the table exerts an equal upward force on the book. This is why the book doesn't fall through the table.",
  commonMistakes = [
    {
      mistake: "Thinking that action and reaction forces cancel each other out",
      correction: "Action and reaction forces act on different objects, so they don't cancel each other. The gravitational force on you and your equal but opposite force on Earth don't cancel because they act on different bodies."
    },
    {
      mistake: "Confusing Newton's Third Law pairs with balanced forces",
      correction: "Balanced forces act on the same object and may cause it to remain at rest. Newton's Third Law pairs always act on different objects."
    }
  ],
  examRelevance = "This concept frequently appears in numerical problems involving rocket propulsion, collisions, and force analysis. Expect 2-3 questions directly testing this concept in competitive exams like JEE.",
  difficulty = "medium",
  id,
  chapter,
  estimatedTime,
  content,
  resourceType,
  resourceUrl,
  onComplete,
  onNeedHelp
}: MicroConceptProps) => {
  const [activeExplanation, setActiveExplanation] = useState<string>("Simple Explanation");

  // Get difficulty color
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-t-4 border-t-violet-500">
        <CardHeader className="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 pb-4">
          <div className="flex flex-wrap gap-2 justify-between items-start">
            <div>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <BrainCog className="mr-2 h-5 w-5 text-violet-600" />
                {title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-violet-100 text-violet-700 border-violet-200">
                  {subject}
                </Badge>
                <Badge variant="outline" className={getDifficultyColor()}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" className="hover:bg-violet-100 hover:text-violet-700">
              Save for Later
            </Button>
          </div>
        </CardHeader>

        <Tabs defaultValue="explanation" className="w-full">
          <div className="px-6 pt-2 border-b">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="explanation" className="data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700">
                <BookOpen className="h-4 w-4 mr-1" /> Explanation
              </TabsTrigger>
              <TabsTrigger value="example" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
                <Lightbulb className="h-4 w-4 mr-1" /> Examples
              </TabsTrigger>
              <TabsTrigger value="mistakes" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-700">
                <AlertTriangle className="h-4 w-4 mr-1" /> Common Mistakes
              </TabsTrigger>
              <TabsTrigger value="relevance" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                <Award className="h-4 w-4 mr-1" /> Exam Relevance
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="explanation" className="p-0 mt-0">
            <CardContent className="p-6">
              <ExplanationTab 
                explanation={explanation}
                activeExplanation={activeExplanation}
                setActiveExplanation={setActiveExplanation}
              />
            </CardContent>
          </TabsContent>

          <TabsContent value="example" className="p-0 mt-0">
            <CardContent className="p-6">
              <ExampleTab example={example} />
            </CardContent>
          </TabsContent>

          <TabsContent value="mistakes" className="p-0 mt-0">
            <CardContent className="p-6">
              <MistakesTab commonMistakes={commonMistakes} />
            </CardContent>
          </TabsContent>

          <TabsContent value="relevance" className="p-0 mt-0">
            <CardContent className="p-6">
              <RelevanceTab examRelevance={examRelevance} />
            </CardContent>
          </TabsContent>
        </Tabs>

        <CardFooter className="bg-gradient-to-r from-violet-50 to-indigo-50 border-t p-3">
          <div className="w-full flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Previous Concept
              </Button>
              <Button variant="outline" size="sm">
                Next Concept
              </Button>
            </div>
            <div>
              <Button variant="default" size="sm" className="bg-violet-600 hover:bg-violet-700">
                Practice Questions
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

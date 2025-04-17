
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardContent } from "@/components/ui/card";
import { BookOpen, AlertTriangle, Award, Lightbulb } from "lucide-react";
import { ExplanationTab } from "./ExplanationTab";
import { ExampleTab } from "./ExampleTab";
import { MistakesTab } from "./MistakesTab";
import { RelevanceTab } from "./RelevanceTab";
import { ExplanationType, CommonMistakeType } from "./types";

interface MicroConceptTabsProps {
  explanation: ExplanationType[];
  example: string;
  commonMistakes: CommonMistakeType[];
  examRelevance: string;
  activeExplanation: string;
  setActiveExplanation: (title: string) => void;
}

export const MicroConceptTabs: React.FC<MicroConceptTabsProps> = ({
  explanation,
  example,
  commonMistakes,
  examRelevance,
  activeExplanation,
  setActiveExplanation
}) => {
  return (
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
  );
};

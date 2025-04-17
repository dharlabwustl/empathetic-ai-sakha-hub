
import { CardContent } from "@/components/ui/card";
import MicroConcept from "@/components/dashboard/student/MicroConcept";
import { Circle, CheckCircle } from "lucide-react";
import { StudyConceptType } from "./types";

interface ConceptsListProps {
  concepts: StudyConceptType[];
  handleCompleteConcept: (id: string) => void;
  handleNeedHelp: (id: string) => void;
}

export const ConceptsList = ({
  concepts,
  handleCompleteConcept,
  handleNeedHelp
}: ConceptsListProps) => {
  return (
    <CardContent className="p-4">
      <div className="space-y-4">
        {concepts.map(concept => (
          <div key={concept.id} className="flex items-start gap-3">
            <div className="mt-1 text-lg">
              {concept.completed ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <Circle className="text-gray-300" />
              )}
            </div>
            <div className="flex-1">
              <MicroConcept 
                id={concept.id}
                title={concept.title}
                subject={concept.subject}
                chapter={concept.chapter}
                difficulty={concept.difficulty.toLowerCase() as "easy" | "medium" | "hard"}
                estimatedTime={concept.estimatedTime}
                content={concept.content}
                resourceType={concept.resourceType}
                resourceUrl={concept.resourceUrl}
                onComplete={handleCompleteConcept}
                onNeedHelp={handleNeedHelp}
                isCompleted={concept.completed}
              />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  );
};

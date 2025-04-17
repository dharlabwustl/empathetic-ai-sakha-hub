
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PlanHeader } from "./study-plan/PlanHeader";
import { ConceptsList } from "./study-plan/ConceptsList";
import { CompletionMessage } from "./study-plan/CompletionMessage";
import { useTodayStudyPlan } from "./study-plan/useTodayStudyPlan";

export default function TodayStudyPlan() {
  const {
    todayPlan,
    progressPercentage,
    handleCompleteConcept,
    handleNeedHelp
  } = useTodayStudyPlan();
  
  return (
    <Card className="shadow-md">
      <PlanHeader 
        date={todayPlan.date}
        completedConcepts={todayPlan.completedConcepts}
        totalConcepts={todayPlan.totalConcepts}
        timeSpent={todayPlan.timeSpent}
        streak={todayPlan.streak}
      />
      
      <ConceptsList
        concepts={todayPlan.concepts}
        handleCompleteConcept={handleCompleteConcept}
        handleNeedHelp={handleNeedHelp}
      />
      
      <CompletionMessage show={progressPercentage === 100} />
    </Card>
  );
}

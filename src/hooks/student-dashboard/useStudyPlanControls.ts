
import { useState } from "react";

export function useStudyPlanControls() {
  const [showStudyPlan, setShowStudyPlan] = useState(false);

  const handleViewStudyPlan = () => setShowStudyPlan(true);
  const handleCloseStudyPlan = () => setShowStudyPlan(false);

  return {
    showStudyPlan,
    handleViewStudyPlan,
    handleCloseStudyPlan
  };
}


import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ListChecks, 
  Star, 
  Lightbulb, 
  BarChart
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import ConceptsSection from '@/components/dashboard/student/ConceptsSection';

interface NewTodaysPlanViewProps {
  planData: any; // Simplified for this example
  onConceptClick?: (conceptId: string) => void;
  isMobile?: boolean;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ 
  planData, 
  onConceptClick,
  isMobile = false
}) => {
  const navigate = useNavigate();
  
  if (!planData) {
    return <div>No plan data available</div>;
  }

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 17) return "afternoon";
    return "evening";
  };
  
  // Handler to navigate to concept study page
  const handleConceptClick = (conceptId: string) => {
    if (onConceptClick) {
      onConceptClick(conceptId);
    } else {
      navigate(`/dashboard/student/concept-study/${conceptId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Cards: Study Time and Focus Areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center">
                <Clock className="mr-2 h-4 w-4 text-blue-500" />
                Today's Study Time
              </CardTitle>
              <span className="text-2xl font-bold">
                {planData.totalStudyHours || 2} hrs
              </span>
            </div>
            <CardDescription>
              Recommended time allocation
            </CardDescription>
          </CardHeader>
          <CardContent>
            {planData.timeAllocation ? (
              <div className="space-y-2">
                {planData.timeAllocation.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span>{item.subject}</span>
                    <span className="font-medium">{item.minutes} min</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Physics</span>
                  <span className="font-medium">45 min</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Chemistry</span>
                  <span className="font-medium">30 min</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Biology</span>
                  <span className="font-medium">45 min</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <ListChecks className="mr-2 h-4 w-4 text-purple-500" />
              Focus Areas
            </CardTitle>
            <CardDescription>
              Based on your recent performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {planData.focusAreas ? planData.focusAreas.map((area: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>{area.name}</span>
                    <span className="text-muted-foreground">{area.progress}%</span>
                  </div>
                  <Progress value={area.progress} className="h-2" />
                </div>
              )) : (
                <>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Organic Chemistry</span>
                      <span className="text-muted-foreground">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Mechanics</span>
                      <span className="text-muted-foreground">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Concept Cards Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
            Today's Concept Cards
          </h3>
          <span className="text-sm text-muted-foreground">
            {planData.conceptCards ? planData.conceptCards.length : 6} cards
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Using ConceptsSection but with our custom click handler */}
          <ConceptsSection onConceptClick={handleConceptClick} />
        </div>
      </div>
      
      {/* Study Tips */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <Lightbulb className="mr-2 h-4 w-4 text-amber-500" />
            Study Tip for {getTimeOfDay()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {getTimeOfDay() === "morning" 
              ? "Start with your most challenging subjects while your mind is fresh. Take short breaks between study sessions to maintain focus."
              : getTimeOfDay() === "afternoon"
              ? "Review your notes from the morning and work on problem-solving to reinforce the concepts. Stay hydrated to maintain cognitive performance."
              : "For evening study, focus on revision rather than new topics. Summarize what you've learned today before going to sleep to improve retention."
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTodaysPlanView;

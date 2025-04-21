
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  CheckCircle, 
  Circle, 
  Clock, 
  Target, 
  Award,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";
import MicroConcept from "./MicroConcept";

// Mock data for today's plan
const mockTodayPlan = {
  date: new Date(),
  totalConcepts: 5,
  completedConcepts: 2,
  timeSpent: 45, // minutes
  targetTime: 120, // minutes
  streak: 7, // days
  concepts: [
    {
      id: "c1",
      title: "Newton's Third Law of Motion",
      subject: "Physics",
      chapter: "Laws of Motion",
      difficulty: "Medium" as const,
      estimatedTime: 15,
      content: "Newton's third law states that for every action, there is an equal and opposite reaction. When one body exerts a force on a second body, the second body exerts a force equal in magnitude and opposite in direction on the first body.",
      completed: true
    },
    {
      id: "c2",
      title: "Acid-Base Reactions",
      subject: "Chemistry",
      chapter: "Chemical Reactions",
      difficulty: "Easy" as const,
      estimatedTime: 20,
      content: "Acid-base reactions involve the transfer of H+ ions (protons) from one substance to another. In these reactions, acids act as proton donors while bases act as proton acceptors.",
      completed: true
    },
    {
      id: "c3",
      title: "Integration by Parts",
      subject: "Mathematics",
      chapter: "Integral Calculus",
      difficulty: "Hard" as const,
      estimatedTime: 25,
      content: "Integration by parts is a technique used to evaluate integrals where the integrand is a product of two functions. The formula is: ∫u(x)v'(x)dx = u(x)v(x) - ∫u'(x)v(x)dx",
      completed: false
    },
    {
      id: "c4",
      title: "DNA Replication",
      subject: "Biology",
      chapter: "Molecular Biology",
      difficulty: "Medium" as const,
      estimatedTime: 30,
      content: "DNA replication is the process by which DNA makes a copy of itself during cell division. The structure of the double helix allows each strand to serve as a template for a new strand of complementary DNA.",
      completed: false
    },
    {
      id: "c5",
      title: "The Indian Constitution",
      subject: "Polity",
      chapter: "Indian Political System",
      difficulty: "Easy" as const,
      estimatedTime: 20,
      content: "The Constitution of India is the supreme law of India. It lays down the framework defining fundamental political principles, establishes the structure, procedures, powers and duties of government institutions.",
      completed: false
    }
  ]
};

export default function TodayStudyPlan() {
  const [todayPlan, setTodayPlan] = useState(mockTodayPlan);
  
  const handleCompleteConcept = (id: string) => {
    setTodayPlan(prev => {
      const updatedConcepts = prev.concepts.map(concept => 
        concept.id === id ? {...concept, completed: true} : concept
      );
      
      return {
        ...prev,
        concepts: updatedConcepts,
        completedConcepts: updatedConcepts.filter(c => c.completed).length
      };
    });
  };
  
  const handleNeedHelp = (id: string) => {
    // In a real app, this would open a chat assistant or help modal
    console.log(`Help requested for concept ${id}`);
  };
  
  // Calculate progress percentage
  const progressPercentage = Math.round((todayPlan.completedConcepts / todayPlan.totalConcepts) * 100);
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-indigo-50 pb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="text-sky-500" size={20} />
              Today's Study Plan
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {todayPlan.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="mt-2 md:mt-0 flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-indigo-500" />
              <span>Time spent: <span className="font-medium">{todayPlan.timeSpent} min</span></span>
            </div>
            <div className="flex items-center gap-1">
              <Flame size={16} className="text-amber-500" />
              <span>Streak: <span className="font-medium">{todayPlan.streak} days</span></span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>Progress: {progressPercentage}%</span>
            <span>{todayPlan.completedConcepts}/{todayPlan.totalConcepts} Concepts</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          {todayPlan.concepts.map(concept => (
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
                  difficulty={concept.difficulty}
                  estimatedTime={concept.estimatedTime}
                  content={concept.content}
                  onComplete={handleCompleteConcept}
                  onNeedHelp={handleNeedHelp}
                />
              </div>
            </div>
          ))}
        </div>
        
        {progressPercentage === 100 && (
          <div className="mt-6 text-center bg-green-50 p-4 rounded-lg">
            <div className="inline-block p-2 bg-green-100 rounded-full mb-2">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-green-800">Amazing job! You've completed today's study plan.</h3>
            <p className="text-sm text-green-600">Check back tomorrow for your next set of concepts.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

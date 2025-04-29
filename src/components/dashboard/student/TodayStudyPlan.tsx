
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  CheckCircle, 
  Circle, 
  Clock, 
  Target, 
  Award,
  Flame,
  BookOpen,
  FileText,
  Brain
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
      resourceType: "Video" as const,
      resourceUrl: "#",
      completed: true,
      type: "concept"
    },
    {
      id: "c2",
      title: "Acid-Base Reactions",
      subject: "Chemistry",
      chapter: "Chemical Reactions",
      difficulty: "Easy" as const,
      estimatedTime: 20,
      content: "Acid-base reactions involve the transfer of H+ ions (protons) from one substance to another. In these reactions, acids act as proton donors while bases act as proton acceptors.",
      resourceType: "Text" as const,
      resourceUrl: "#",
      completed: true,
      type: "concept"
    },
    {
      id: "c3",
      title: "Integration by Parts",
      subject: "Mathematics",
      chapter: "Integral Calculus",
      difficulty: "Hard" as const,
      estimatedTime: 25,
      content: "Integration by parts is a technique used to evaluate integrals where the integrand is a product of two functions. The formula is: ∫u(x)v'(x)dx = u(x)v(x) - ∫u'(x)v(x)dx",
      resourceType: "PDF" as const,
      resourceUrl: "#",
      completed: false,
      type: "concept"
    },
    {
      id: "f1",
      title: "Periodic Table Elements",
      subject: "Chemistry",
      chapter: "Periodic Table",
      difficulty: "Medium" as const,
      estimatedTime: 15,
      content: "Practice recognizing elements, their symbols, and their positions in the periodic table.",
      resourceType: "Flashcards" as const,
      resourceUrl: "#",
      completed: false,
      type: "flashcard"
    },
    {
      id: "e1",
      title: "Physics Mid-Term Practice",
      subject: "Physics",
      chapter: "Multiple Chapters",
      difficulty: "Hard" as const,
      estimatedTime: 60,
      content: "Comprehensive practice test covering mechanics, thermodynamics, and waves.",
      resourceType: "Exam" as const,
      resourceUrl: "#",
      completed: false,
      type: "exam"
    }
  ]
};

export default function TodayStudyPlan() {
  const [todayPlan, setTodayPlan] = useState(mockTodayPlan);
  const [activeTab, setActiveTab] = useState("all");
  
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
  
  // Filter concepts based on active tab
  const filteredItems = todayPlan.concepts.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return !item.completed;
    if (activeTab === "completed") return item.completed;
    return item.type === activeTab;
  });
  
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
            <span>{todayPlan.completedConcepts}/{todayPlan.totalConcepts} Tasks</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid grid-cols-6 w-full mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="concept" className="flex items-center gap-1">
              <BookOpen size={14} /> Concepts
            </TabsTrigger>
            <TabsTrigger value="flashcard" className="flex items-center gap-1">
              <Brain size={14} /> Flashcards
            </TabsTrigger>
            <TabsTrigger value="exam" className="flex items-center gap-1">
              <FileText size={14} /> Exams
            </TabsTrigger>
          </TabsList>
        
          <div className="space-y-4">
            {filteredItems.map(item => (
              <div key={item.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50">
                <div className="mt-1 text-lg">
                  {item.completed ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <Circle className="text-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{item.title}</h3>
                        {item.type === 'concept' && <BookOpen size={16} className="text-blue-500" />}
                        {item.type === 'flashcard' && <Brain size={16} className="text-amber-500" />}
                        {item.type === 'exam' && <FileText size={16} className="text-violet-500" />}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{item.subject}</span>
                        <span>•</span>
                        <span>{item.chapter}</span>
                        <span>•</span>
                        <span>{item.estimatedTime} min</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {item.type === 'concept' && (
                        <Link to={`/dashboard/student/concepts/study/${item.id}`}>
                          <Button size="sm" variant={item.completed ? "outline" : "default"}>
                            {item.completed ? "Review Again" : "Start Learning"}
                          </Button>
                        </Link>
                      )}
                      {item.type === 'flashcard' && (
                        <Link to={`/dashboard/student/flashcards/practice/${item.id}`}>
                          <Button size="sm" variant={item.completed ? "outline" : "default"} 
                            className={item.completed ? "" : "bg-amber-600 hover:bg-amber-700"}>
                            {item.completed ? "Review Again" : "Practice Now"}
                          </Button>
                        </Link>
                      )}
                      {item.type === 'exam' && (
                        <Link to={`/dashboard/student/exams/start/${item.id}`}>
                          <Button size="sm" variant={item.completed ? "outline" : "default"}
                            className={item.completed ? "" : "bg-violet-600 hover:bg-violet-700"}>
                            {item.completed ? "Review Results" : "Start Exam"}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Tabs>
        
        {activeTab === "all" && progressPercentage === 100 && (
          <div className="mt-6 text-center bg-green-50 p-4 rounded-lg">
            <div className="inline-block p-2 bg-green-100 rounded-full mb-2">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-green-800">Amazing job! You've completed today's study plan.</h3>
            <p className="text-sm text-green-600">Check back tomorrow for your next set of concepts.</p>
          </div>
        )}
        
        {filteredItems.length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-muted-foreground">No items found for the selected filter</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

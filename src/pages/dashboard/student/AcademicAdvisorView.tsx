
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, ArrowRight, BookMarked, Clock, Settings, FileText, Plus } from "lucide-react";
import { StudyPlan } from "@/types/studyPlan";
import { Motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/dashboard/student/BackButton";

// Mock study plans
const mockStudyPlans: StudyPlan[] = [
  {
    id: "1",
    title: "NEET 2023 Complete Preparation",
    description: "Comprehensive study plan for NEET 2023 covering Physics, Chemistry and Biology",
    subjects: [
      {
        id: "101",
        name: "Physics",
        progressPercent: 45,
        color: "bg-blue-500"
      },
      {
        id: "102",
        name: "Chemistry",
        progressPercent: 60,
        color: "bg-green-500"
      },
      {
        id: "103",
        name: "Biology",
        progressPercent: 75,
        color: "bg-purple-500"
      }
    ],
    startDate: "2023-01-15",
    endDate: "2023-12-15",
    status: "active",
    progressPercent: 60,
    createdAt: "2023-01-10"
  },
  {
    id: "2",
    title: "Physics Revision Plan",
    description: "Focused revision plan for Physics topics in NEET",
    subjects: [
      {
        id: "201",
        name: "Mechanics",
        progressPercent: 80,
        color: "bg-amber-500"
      },
      {
        id: "202",
        name: "Electromagnetism",
        progressPercent: 50,
        color: "bg-rose-500"
      },
      {
        id: "203",
        name: "Modern Physics",
        progressPercent: 30,
        color: "bg-cyan-500"
      }
    ],
    startDate: "2023-05-01",
    endDate: "2023-07-15",
    status: "active",
    progressPercent: 55,
    createdAt: "2023-04-25"
  },
  {
    id: "3",
    title: "Last Month Biology Sprint",
    description: "Quick revision of key Biology topics before exam",
    subjects: [
      {
        id: "301",
        name: "Human Physiology",
        progressPercent: 100,
        color: "bg-pink-500"
      },
      {
        id: "302",
        name: "Genetics",
        progressPercent: 85,
        color: "bg-emerald-500"
      },
      {
        id: "303",
        name: "Ecology",
        progressPercent: 60,
        color: "bg-violet-500"
      }
    ],
    startDate: "2023-10-01",
    endDate: "2023-10-30",
    status: "completed",
    progressPercent: 85,
    completedAt: "2023-10-28",
    createdAt: "2023-09-25"
  }
];

const AcademicAdvisorView: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active-plans");
  
  const activePlans = mockStudyPlans.filter(plan => plan.status === "active");
  const completedPlans = mockStudyPlans.filter(plan => plan.status === "completed");

  const handleCreatePlan = () => {
    navigate("/dashboard/student/academic/create-plan");
  };

  const handleViewPlan = (planId: string) => {
    // Navigate to the adaptive study plan page for all plan views
    navigate("/dashboard/student/study-plan/adaptive");
  };

  return (
    <div className="container py-6">
      {/* Add Back Button */}
      <BackButton to="/dashboard/student" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Academic Advisor</h1>
          <p className="text-muted-foreground">Manage and track your study plans</p>
        </div>
        
        <Button onClick={handleCreatePlan} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Plan
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Study Progress Overview</CardTitle>
          <CardDescription>Track your progress across all subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Physics", "Chemistry", "Biology"].map(subject => (
              <Card key={subject}>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">{subject}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{subject === "Physics" ? "65" : subject === "Chemistry" ? "78" : "82"}%</span>
                    </div>
                    <Progress 
                      value={subject === "Physics" ? 65 : subject === "Chemistry" ? 78 : 82} 
                      className="h-2" 
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      {subject === "Physics" 
                        ? "Focus on Mechanics and Optics" 
                        : subject === "Chemistry" 
                          ? "Organic Chemistry needs attention" 
                          : "Strong in Botany, work on Zoology"
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab as any} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active-plans">Active Plans</TabsTrigger>
          <TabsTrigger value="completed-plans">Completed Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active-plans">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activePlans.map(plan => (
              <StudyPlanCard 
                key={plan.id} 
                plan={plan} 
                onViewDetails={() => handleViewPlan(plan.id)} 
              />
            ))}
            
            {activePlans.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">You have no active study plans.</p>
                <Button variant="outline" onClick={handleCreatePlan} className="mt-4">
                  Create Your First Plan
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed-plans">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedPlans.map(plan => (
              <StudyPlanCard 
                key={plan.id} 
                plan={plan} 
                onViewDetails={() => handleViewPlan(plan.id)} 
              />
            ))}
            
            {completedPlans.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">You have no completed study plans.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface StudyPlanCardProps {
  plan: StudyPlan;
  onViewDetails: () => void;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({ plan, onViewDetails }) => {
  // Calculate days left for active plans
  const getDaysLeft = () => {
    if (plan.status === "completed") return null;
    
    const endDate = new Date(plan.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };
  
  const daysLeft = getDaysLeft();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg truncate">{plan.title}</CardTitle>
          <Badge variant={plan.status === "active" ? "default" : "outline"}>
            {plan.status === "active" ? "Active" : "Completed"}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{plan.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-3">
          {plan.subjects.map(subject => (
            <div key={subject.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{subject.name}</span>
                <span>{subject.progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${subject.color}`} 
                  style={{ width: `${subject.progressPercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>
            {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
          </span>
        </div>
        
        {daysLeft !== null && (
          <div className="flex items-center gap-2 mt-2 text-sm">
            <Clock className="h-4 w-4" />
            <span className={daysLeft <= 7 ? "text-amber-600" : "text-gray-500"}>
              {daysLeft} {daysLeft === 1 ? "day" : "days"} remaining
            </span>
          </div>
        )}
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Overall Progress</span>
            <span>{plan.progressPercent}%</span>
          </div>
          <Progress value={plan.progressPercent} className="h-2" />
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={onViewDetails} 
          className="w-full"
          variant={plan.status === "active" ? "default" : "outline"}
        >
          {plan.status === "active" ? (
            <>
              <BookMarked className="mr-2 h-4 w-4" />
              View Plan
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              View Details
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AcademicAdvisorView;
